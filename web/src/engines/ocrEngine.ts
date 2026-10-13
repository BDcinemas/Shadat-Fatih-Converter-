import { createWorker } from 'tesseract.js';
import { ConvertedFile } from '../types';

export async function performOcr(
  file: File,
  language: string = 'eng',
  onProgress?: (progress: number) => void
): Promise<ConvertedFile> {
  onProgress?.(5);

  const worker = await createWorker(language, 1, {
    logger: (m) => {
      if (m.status === 'recognizing text' && typeof m.progress === 'number') {
        const pct = Math.round(15 + m.progress * 80);
        onProgress?.(Math.min(95, pct));
      }
    }
  });

  onProgress?.(15);

  const ret = await worker.recognize(file);
  await worker.terminate();

  onProgress?.(100);

  const text = ret.data.text.trim();
  const confidence = Math.round(ret.data.confidence);

  const finalContent = [
    `--- OCR Text Extraction Report ---`,
    `File: ${file.name}`,
    `Recognition Engine: Tesseract.js (Client-side WASM)`,
    `Average Confidence: ${confidence}%`,
    `----------------------------------`,
    ``,
    text.length > 0 ? text : `[No text was detected in this image.]`
  ].join('\n');

  const blob = new Blob([finalContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}_ocr.txt`,
    size: blob.size,
    type: 'text/plain',
    url,
    blob,
    previewText: finalContent,
    extraInfo: `Extracted ${text.length} chars • Confidence ${confidence}%`
  };
}
