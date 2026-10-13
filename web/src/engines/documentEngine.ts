import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import JSZip from 'jszip';
import { ConvertedFile } from '../types';

export async function convertTxtToPdf(file: File): Promise<ConvertedFile> {
  const text = await file.text();
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const fontSize = 11;
  const lineHeight = 16;
  const margin = 50;
  const pageWidth = 595.28; // Standard A4 width
  const pageHeight = 841.89; // Standard A4 height
  const printableWidth = pageWidth - margin * 2;
  const printableHeight = pageHeight - margin * 2;
  const linesPerPage = Math.floor(printableHeight / lineHeight);

  // Simple text wrapping helper
  const rawLines = text.split(/\r?\n/);
  const wrappedLines: string[] = [];

  for (const rawLine of rawLines) {
    if (rawLine.trim() === '') {
      wrappedLines.push('');
      continue;
    }

    const words = rawLine.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const textWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (textWidth <= printableWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) wrappedLines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) wrappedLines.push(currentLine);
  }

  // Paginate lines
  let currentLineIndex = 0;
  while (currentLineIndex < wrappedLines.length || wrappedLines.length === 0) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin;

    const pageLines = wrappedLines.slice(currentLineIndex, currentLineIndex + linesPerPage);
    for (const line of pageLines) {
      page.drawText(line, {
        x: margin,
        y: y - fontSize,
        size: fontSize,
        font,
        color: rgb(0.1, 0.1, 0.1)
      });
      y -= lineHeight;
    }

    currentLineIndex += linesPerPage;
    if (wrappedLines.length === 0) break;
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}.pdf`,
    size: blob.size,
    type: 'application/pdf',
    url,
    blob,
    extraInfo: `Generated ${pdfDoc.getPageCount()} A4 page(s) with clean typesetting`
  };
}

export async function convertHtmlToPdf(file: File): Promise<ConvertedFile> {
  const htmlContent = await file.text();
  // Strip script tags and extract readable document text
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const bodyText = doc.body.innerText || doc.body.textContent || '';

  const virtualTextFile = new File([bodyText], file.name.replace(/\.html?$/i, '.txt'), {
    type: 'text/plain'
  });

  const pdfResult = await convertTxtToPdf(virtualTextFile);
  pdfResult.extraInfo = `Parsed HTML structure and rendered to ${pdfResult.name}`;
  return pdfResult;
}

export async function extractDocxText(file: File): Promise<ConvertedFile> {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  const docXmlEntry = zip.file('word/document.xml');

  if (!docXmlEntry) {
    throw new Error('Invalid DOCX format: word/document.xml missing.');
  }

  const xmlText = await docXmlEntry.async('text');
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

  // Extract paragraphs <w:p> and runs <w:t>
  const paragraphs: string[] = [];
  const pNodes = xmlDoc.getElementsByTagName('w:p');

  for (let i = 0; i < pNodes.length; i++) {
    const p = pNodes[i];
    const tNodes = p.getElementsByTagName('w:t');
    let pText = '';
    for (let j = 0; j < tNodes.length; j++) {
      pText += tNodes[j].textContent || '';
    }
    if (pText.trim().length > 0) {
      paragraphs.push(pText.trim());
    }
  }

  const extracted = paragraphs.join('\n\n');
  const blob = new Blob([extracted], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.docx$/i, '');

  return {
    name: `${baseName}_extracted.txt`,
    size: blob.size,
    type: 'text/plain',
    url,
    blob,
    extraInfo: `Extracted ${paragraphs.length} paragraphs from Word DOCX archive`
  };
}
