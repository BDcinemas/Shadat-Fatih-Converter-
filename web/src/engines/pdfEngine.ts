import { PDFDocument, degrees } from 'pdf-lib';
import JSZip from 'jszip';
import { ConvertedFile } from '../types';

export async function mergePdfs(files: File[]): Promise<ConvertedFile> {
  if (files.length < 2) {
    throw new Error('Please select at least 2 PDF files to merge.');
  }

  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const pdfBytes = await mergedPdf.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  return {
    name: `merged_${Date.now()}.pdf`,
    size: blob.size,
    type: 'application/pdf',
    url,
    blob,
    extraInfo: `Merged ${files.length} documents into ${mergedPdf.getPageCount()} pages`
  };
}

export async function splitPdf(file: File, pageRangesStr?: string): Promise<ConvertedFile> {
  const arrayBuffer = await file.arrayBuffer();
  const srcPdf = await PDFDocument.load(arrayBuffer);
  const totalPages = srcPdf.getPageCount();

  if (totalPages === 0) {
    throw new Error('PDF has no pages.');
  }

  // Parse page ranges if provided (e.g. "1-2, 4") or extract all pages into a ZIP
  if (pageRangesStr && pageRangesStr.trim().length > 0) {
    const targetPages: number[] = [];
    const parts = pageRangesStr.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map((n) => parseInt(n.trim(), 10));
        if (!isNaN(start) && !isNaN(end)) {
          for (let p = Math.max(1, start); p <= Math.min(totalPages, end); p++) {
            targetPages.push(p - 1);
          }
        }
      } else {
        const p = parseInt(trimmed, 10);
        if (!isNaN(p) && p >= 1 && p <= totalPages) {
          targetPages.push(p - 1);
        }
      }
    }

    if (targetPages.length === 0) {
      throw new Error('Invalid page ranges. Example: 1-3, 5');
    }

    const uniquePages = Array.from(new Set(targetPages)).sort((a, b) => a - b);
    const newPdf = await PDFDocument.create();
    const copied = await newPdf.copyPages(srcPdf, uniquePages);
    copied.forEach((page) => newPdf.addPage(page));

    const pdfBytes = await newPdf.save();
    const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    return {
      name: `${file.name.replace(/\.pdf$/i, '')}_extracted.pdf`,
      size: blob.size,
      type: 'application/pdf',
      url,
      blob,
      extraInfo: `Extracted ${newPdf.getPageCount()} pages (${pageRangesStr})`
    };
  }

  // If no range specified, split each page into a ZIP archive of single-page PDFs
  const zip = new JSZip();
  for (let i = 0; i < totalPages; i++) {
    const singlePdf = await PDFDocument.create();
    const [copied] = await singlePdf.copyPages(srcPdf, [i]);
    singlePdf.addPage(copied);
    const bytes = await singlePdf.save();
    const pageNum = String(i + 1).padStart(3, '0');
    zip.file(`page_${pageNum}.pdf`, bytes);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);

  return {
    name: `${file.name.replace(/\.pdf$/i, '')}_split_pages.zip`,
    size: zipBlob.size,
    type: 'application/zip',
    url,
    blob: zipBlob,
    extraInfo: `Split into ${totalPages} individual PDF page files in a ZIP`
  };
}

export async function rotatePdf(file: File, angle: number = 90): Promise<ConvertedFile> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();

  pages.forEach((page) => {
    const currentAngle = page.getRotation().angle;
    page.setRotation(degrees((currentAngle + angle) % 360));
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  return {
    name: `${file.name.replace(/\.pdf$/i, '')}_rotated_${angle}deg.pdf`,
    size: blob.size,
    type: 'application/pdf',
    url,
    blob,
    extraInfo: `Rotated ${pages.length} pages by ${angle}°`
  };
}

export async function deletePdfPages(file: File, pagesToDeleteStr: string): Promise<ConvertedFile> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const total = pdfDoc.getPageCount();

  const toDelete = new Set<number>();
  pagesToDeleteStr.split(',').forEach((p) => {
    const num = parseInt(p.trim(), 10);
    if (!isNaN(num) && num >= 1 && num <= total) {
      toDelete.add(num - 1);
    }
  });

  if (toDelete.size === 0) {
    throw new Error('Please specify valid page numbers to delete (e.g. 1, 3).');
  }

  if (toDelete.size >= total) {
    throw new Error('Cannot delete all pages in the PDF.');
  }

  const newDoc = await PDFDocument.create();
  const keepIndices = Array.from({ length: total }, (_, i) => i).filter((i) => !toDelete.has(i));
  const copied = await newDoc.copyPages(pdfDoc, keepIndices);
  copied.forEach((p) => newDoc.addPage(p));

  const bytes = await newDoc.save();
  const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  return {
    name: `${file.name.replace(/\.pdf$/i, '')}_pages_removed.pdf`,
    size: blob.size,
    type: 'application/pdf',
    url,
    blob,
    extraInfo: `Deleted ${toDelete.size} pages. New page count: ${newDoc.getPageCount()}`
  };
}

export async function imagesToPdf(imageFiles: File[]): Promise<ConvertedFile> {
  if (imageFiles.length === 0) {
    throw new Error('Please select at least one image.');
  }

  const pdfDoc = await PDFDocument.create();

  for (const imgFile of imageFiles) {
    const buffer = await imgFile.arrayBuffer();
    let embeddedImage;

    // Check if jpeg or png
    if (imgFile.type === 'image/jpeg' || imgFile.name.match(/\.(jpg|jpeg)$/i)) {
      embeddedImage = await pdfDoc.embedJpg(buffer);
    } else if (imgFile.type === 'image/png' || imgFile.name.match(/\.png$/i)) {
      embeddedImage = await pdfDoc.embedPng(buffer);
    } else {
      // For webp, render to a canvas and convert to PNG first
      const bitmap = await createImageBitmap(imgFile);
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(bitmap, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        const res = await fetch(dataUrl);
        const pngBuf = await res.arrayBuffer();
        embeddedImage = await pdfDoc.embedPng(pngBuf);
      }
    }

    if (embeddedImage) {
      const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
      page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: embeddedImage.width,
        height: embeddedImage.height
      });
    }
  }

  const bytes = await pdfDoc.save();
  const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  return {
    name: `images_${Date.now()}.pdf`,
    size: blob.size,
    type: 'application/pdf',
    url,
    blob,
    extraInfo: `Converted ${imageFiles.length} image(s) into a multi-page PDF`
  };
}

export async function extractPdfText(file: File): Promise<ConvertedFile> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const textDecoder = new TextDecoder('utf-8', { fatal: false });
  const rawContent = textDecoder.decode(bytes);

  // Extract stream blocks containing text tokens (Tj / TJ / etc)
  const textTokens: string[] = [];
  const streamRegex = /\(([^)]+)\)\s*(?:Tj|'|")/g;
  let match;
  while ((match = streamRegex.exec(rawContent)) !== null) {
    if (match[1]) {
      // Clean up basic octal escapes & parenthesis
      const decoded = match[1]
        .replace(/\\([0-7]{3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)))
        .replace(/\\[()\\]/g, (m) => m[1]);
      textTokens.push(decoded);
    }
  }

  // Also check TJ array format
  const tjRegex = /\[(.*?)\]\s*TJ/g;
  while ((match = tjRegex.exec(rawContent)) !== null) {
    const inner = match[1];
    const subMatches = inner.match(/\(([^)]*)\)/g);
    if (subMatches) {
      subMatches.forEach((s) => {
        textTokens.push(s.slice(1, -1));
      });
    }
  }

  let extracted = textTokens.join(' ').replace(/\s+/g, ' ').trim();

  if (extracted.length === 0) {
    extracted = `[Notice: No selectable text streams were detected in this PDF file.\n\nThis commonly occurs if the PDF was scanned from physical paper or contains rasterized images of text. Scanned image-only PDFs require Optical Character Recognition (OCR), which is not available in offline client-side extraction. If this document contains selectable text in Adobe Acrobat or Chrome, it may use custom Type3 font encodings.]`;
  }

  const blob = new Blob([extracted], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  return {
    name: `${file.name.replace(/\.pdf$/i, '')}_extracted_text.txt`,
    size: blob.size,
    type: 'text/plain',
    url,
    blob,
    extraInfo: `Extracted ${extracted.length} characters of text content`
  };
}
