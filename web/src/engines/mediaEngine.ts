import { ConvertedFile } from '../types';

export async function extractOrConvertAudio(
  file: File,
  targetFormat: 'wav' | 'mp3' = 'wav',
  onProgress?: (progress: number) => void
): Promise<ConvertedFile> {
  onProgress?.(10);
  const arrayBuffer = await file.arrayBuffer();
  onProgress?.(30);

  // Use AudioContext to decode audio data from the container (video or audio)
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
      'Unable to decode audio track from this file. Ensure the media container contains a valid, non-DRM audio stream.'
    );
  }

  onProgress?.(60);

  // Encode the decoded AudioBuffer to universal WAV PCM
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
    extraInfo: `Extracted audio (${timeFormatted} • ${audioBuffer.numberOfChannels}ch • ${audioBuffer.sampleRate}Hz)`
  };
}

// Universal 16-bit PCM WAV encoder
function encodeWav(audioBuffer: AudioBuffer): Uint8Array {
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const format = 1; // PCM
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

  // Write RIFF header
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

  // Write PCM audio samples
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
