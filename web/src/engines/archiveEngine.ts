import JSZip from 'jszip';
import { ConvertedFile } from '../types';

export interface ExtractedArchiveFile {
  name: string;
  size: number;
  url: string;
  blob: Blob;
}

export async function createZipArchive(
  files: File[],
  compressionLevel: 1 | 5 | 9 = 5
): Promise<ConvertedFile> {
  if (files.length === 0) {
    throw new Error('Please select at least one file to archive.');
  }

  const zip = new JSZip();
  let totalOriginalSize = 0;

  for (const file of files) {
    totalOriginalSize += file.size;
    const arrayBuffer = await file.arrayBuffer();
    zip.file(file.name, arrayBuffer);
  }

  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: compressionLevel }
  });

  const url = URL.createObjectURL(zipBlob);
  const ratio =
    totalOriginalSize > 0
      ? Math.round(((totalOriginalSize - zipBlob.size) / totalOriginalSize) * 100)
      : 0;

  const ratioText =
    ratio >= 0
      ? `Compressed by ${ratio}% (${formatBytes(totalOriginalSize)} → ${formatBytes(zipBlob.size)})`
      : `Archive overhead added ${Math.abs(ratio)}% (${formatBytes(totalOriginalSize)} → ${formatBytes(zipBlob.size)})`;

  return {
    name: `archive_${Date.now()}.zip`,
    size: zipBlob.size,
    type: 'application/zip',
    url,
    blob: zipBlob,
    extraInfo: `${files.length} file(s) bundled • ${ratioText}`
  };
}

export async function extractZipArchive(file: File): Promise<{
  files: ExtractedArchiveFile[];
  summary: ConvertedFile;
}> {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  const extractedList: ExtractedArchiveFile[] = [];

  const entries = Object.keys(zip.files);
  for (const filename of entries) {
    const entry = zip.files[filename];

    // Security: guard against path traversal attacks (Zip Slip)
    if (entry.dir || filename.includes('..') || filename.startsWith('/') || filename.startsWith('\\')) {
      continue;
    }

    const safeName = filename.replace(/^(\.\.(\/|\\|$))+/, '');
    const blob = await entry.async('blob');
    const url = URL.createObjectURL(blob);

    extractedList.push({
      name: safeName,
      size: blob.size,
      url,
      blob
    });
  }

  if (extractedList.length === 0) {
    throw new Error('No valid, safe files could be extracted from this ZIP archive.');
  }

  // Summary object representing the extraction task
  const summaryBlob = new Blob(
    [
      `Extracted ${extractedList.length} files:\n` +
        extractedList.map((f) => `- ${f.name} (${formatBytes(f.size)})`).join('\n')
    ],
    { type: 'text/plain' }
  );

  return {
    files: extractedList,
    summary: {
      name: `${file.name.replace(/\.zip$/i, '')}_extracted_manifest.txt`,
      size: summaryBlob.size,
      type: 'text/plain',
      url: URL.createObjectURL(summaryBlob),
      blob: summaryBlob,
      extraInfo: `Successfully extracted ${extractedList.length} files from archive`
    }
  };
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
