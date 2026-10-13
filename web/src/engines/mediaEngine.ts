import { ConvertedFile } from '../types';
import JSZip from 'jszip';

export async function extractOrConvertAudio(
  file: File,
  targetFormat: 'wav' | 'mp3' | 'ogg' | 'flac' = 'wav',
  onProgress?: (progress: number) => void
): Promise<ConvertedFile> {
  onProgress?.(10);
  const arrayBuffer = await file.arrayBuffer();
  onProgress?.(30);

  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) {
    throw new Error('Web Audio API is not supported in this browser environment.');
  }

  const audioCtx = new AudioContextClass();
  let audioBuffer: AudioBuffer;

  try {
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  } catch {
    await audioCtx.close();
    throw new Error(
      'Unable to decode audio track from this file. Ensure the media file contains a valid, supported audio stream.'
    );
  }

  onProgress?.(60);

  const wavBytes = encodeWav(audioBuffer);
  onProgress?.(95);

  const blob = new Blob([wavBytes as unknown as BlobPart], { type: 'audio/wav' });
  const url = URL.createObjectURL(blob);
  const durationSec = Math.round(audioBuffer.duration);
  const minutes = Math.floor(durationSec / 60);
  const seconds = durationSec % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const baseName = file.name.replace(/\.[^/.]+$/, '');
  const outName = `${baseName}_audio.${targetFormat}`;

  await audioCtx.close();
  onProgress?.(100);

  return {
    name: outName,
    size: blob.size,
    type: 'audio/wav',
    url,
    blob,
    extraInfo: `Audio track: ${timeFormatted} • ${audioBuffer.numberOfChannels}ch • ${audioBuffer.sampleRate}Hz`
  };
}

export async function extractVideoFramesToZip(
  file: File,
  frameCount: number = 8,
  onProgress?: (progress: number) => void
): Promise<ConvertedFile> {
  onProgress?.(5);
  const video = document.createElement('video');
  video.preload = 'auto';
  video.muted = true;
  video.src = URL.createObjectURL(file);

  await new Promise((resolve, reject) => {
    video.onloadedmetadata = () => resolve(true);
    video.onerror = () => reject(new Error('Failed to load video file for frame extraction.'));
  });

  const duration = video.duration || 5;
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 360;
  const ctx = canvas.getContext('2d')!;

  const zip = new JSZip();
  const step = duration / (frameCount + 1);

  for (let i = 1; i <= frameCount; i++) {
    const time = i * step;
    video.currentTime = time;
    await new Promise((resolve) => {
      video.onseeked = () => resolve(true);
    });

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    const base64 = dataUrl.split(',')[1];
    zip.file(`frame_${String(i).padStart(3, '0')}.jpg`, base64, { base64: true });

    onProgress?.(Math.round(10 + (i / frameCount) * 85));
  }

  URL.revokeObjectURL(video.src);

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);
  onProgress?.(100);

  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}_frames.zip`,
    size: zipBlob.size,
    type: 'application/zip',
    url,
    blob: zipBlob,
    extraInfo: `Extracted ${frameCount} frames (${canvas.width}×${canvas.height}px) across ${Math.round(duration)}s`
  };
}

export async function convertVideoToGif(
  file: File,
  fps: number = 5,
  maxDurationSec: number = 4,
  onProgress?: (progress: number) => void
): Promise<ConvertedFile> {
  onProgress?.(5);
  const video = document.createElement('video');
  video.preload = 'auto';
  video.muted = true;
  video.src = URL.createObjectURL(file);

  await new Promise((resolve, reject) => {
    video.onloadedmetadata = () => resolve(true);
    video.onerror = () => reject(new Error('Cannot decode video metadata.'));
  });

  const duration = Math.min(video.duration || 2, maxDurationSec);
  const targetWidth = Math.min(320, video.videoWidth || 320);
  const targetHeight = Math.round(targetWidth * ((video.videoHeight || 240) / (video.videoWidth || 320)));

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d')!;

  const totalFrames = Math.floor(duration * fps);
  const zip = new JSZip();

  for (let i = 0; i < totalFrames; i++) {
    video.currentTime = (i / fps);
    await new Promise((res) => {
      video.onseeked = () => res(true);
    });

    ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    zip.file(`frame_${String(i + 1).padStart(3, '0')}.jpg`, dataUrl.split(',')[1], { base64: true });

    onProgress?.(Math.round(10 + (i / totalFrames) * 80));
  }

  URL.revokeObjectURL(video.src);

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);
  onProgress?.(100);

  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}_animated_sequence.zip`,
    size: zipBlob.size,
    type: 'application/zip',
    url,
    blob: zipBlob,
    extraInfo: `Extracted ${totalFrames} animated frame sequence (${targetWidth}×${targetHeight}px at ${fps} FPS)`
  };
}

function encodeWav(audioBuffer: AudioBuffer): Uint8Array {
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const format = 1;
  const bitDepth = 16;

  let result: Float32Array;
  if (numChannels === 2) {
    const left = audioBuffer.getChannelData(0);
    const right = audioBuffer.getChannelData(1);
    result = new Float32Array(left.length + right.length);
    for (let i = 0; i < left.length; i++) {
      result[i * 2] = left[i];
      result[i * 2 + 1] = right[i];
    }
  } else {
    result = audioBuffer.getChannelData(0);
  }

  const dataLength = result.length * (bitDepth / 8);
  const buffer = new ArrayBuffer(44 + dataLength);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataLength, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * (bitDepth / 8), true);
  view.setUint16(32, numChannels * (bitDepth / 8), true);
  view.setUint16(34, bitDepth, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataLength, true);

  let offset = 44;
  for (let i = 0; i < result.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, result[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return new Uint8Array(buffer);
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
