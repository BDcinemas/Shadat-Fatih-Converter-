import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import JSZip from 'jszip';
import { ConvertedFile } from '../types';

export async function convertTxtToDocx(file: File): Promise<ConvertedFile> {
  const text = await file.text();
  const lines = text.split(/\r?\n/);

  const paragraphs = lines.map((line) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: line,
          size: 24, // 12pt in half-points
          font: 'Calibri'
        })
      ],
      spacing: { after: 120 }
    });
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}.docx`,
    size: blob.size,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    url,
    blob,
    extraInfo: `Generated genuine Word document with ${paragraphs.length} paragraphs`
  };
}

export async function convertMarkdownToDocx(file: File): Promise<ConvertedFile> {
  const md = await file.text();
  const lines = md.split(/\r?\n/);

  const paragraphs: Paragraph[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      paragraphs.push(
        new Paragraph({
          text: trimmed.slice(2),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 120 }
        })
      );
    } else if (trimmed.startsWith('## ')) {
      paragraphs.push(
        new Paragraph({
          text: trimmed.slice(3),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        })
      );
    } else if (trimmed.startsWith('### ')) {
      paragraphs.push(
        new Paragraph({
          text: trimmed.slice(4),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 160, after: 80 }
        })
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: '• ' + trimmed.slice(2),
              size: 24
            })
          ],
          indent: { left: 720 },
          spacing: { after: 80 }
        })
      );
    } else if (trimmed.length > 0) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: trimmed, size: 24 })],
          spacing: { after: 120 }
        })
      );
    }
  }

  const doc = new Document({
    sections: [{ properties: {}, children: paragraphs }]
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}.docx`,
    size: blob.size,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    url,
    blob,
    extraInfo: `Generated Word document from Markdown formatting`
  };
}

export async function convertMarkdownToHtml(file: File): Promise<ConvertedFile> {
  const md = await file.text();
  const lines = md.split(/\r?\n/);
  const htmlParts: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      htmlParts.push(`<h1>${escapeHtml(trimmed.slice(2))}</h1>`);
    } else if (trimmed.startsWith('## ')) {
      htmlParts.push(`<h2>${escapeHtml(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith('### ')) {
      htmlParts.push(`<h3>${escapeHtml(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      htmlParts.push(`<li>${escapeHtml(trimmed.slice(2))}</li>`);
    } else if (trimmed.length > 0) {
      htmlParts.push(`<p>${escapeHtml(trimmed)}</p>`);
    }
  }

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(file.name)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1e293b; }
    h1 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
    h2 { color: #0284c7; margin-top: 24px; }
    p { margin: 12px 0; }
    li { margin: 6px 0; }
  </style>
</head>
<body>
  ${htmlParts.join('\n  ')}
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}.html`,
    size: blob.size,
    type: 'text/html',
    url,
    blob,
    previewText: fullHtml.slice(0, 1000),
    extraInfo: `Generated standalone HTML document`
  };
}

export async function convertMarkdownToPdf(file: File): Promise<ConvertedFile> {
  const md = await file.text();
  const textWithoutFormatting = md
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1');

  const virtualFile = new File([textWithoutFormatting], file.name.replace(/\.md$/i, '.txt'), {
    type: 'text/plain'
  });
  const pdfRes = await convertTxtToPdf(virtualFile);
  pdfRes.extraInfo = `Converted Markdown structure to formatted PDF`;
  return pdfRes;
}

export async function convertHtmlToDocx(file: File): Promise<ConvertedFile> {
  const html = await file.text();
  const parser = new DOMParser();
  const docHtml = parser.parseFromString(html, 'text/html');

  const textNodes = Array.from(docHtml.body.querySelectorAll('h1, h2, h3, p, li'));
  const paragraphs: Paragraph[] = [];

  for (const el of textNodes) {
    const text = el.textContent?.trim() || '';
    if (!text) continue;

    if (el.tagName === 'H1') {
      paragraphs.push(new Paragraph({ text, heading: HeadingLevel.HEADING_1 }));
    } else if (el.tagName === 'H2') {
      paragraphs.push(new Paragraph({ text, heading: HeadingLevel.HEADING_2 }));
    } else if (el.tagName === 'LI') {
      paragraphs.push(new Paragraph({ children: [new TextRun({ text: '• ' + text })], indent: { left: 720 } }));
    } else {
      paragraphs.push(new Paragraph({ text, spacing: { after: 120 } }));
    }
  }

  const docxFile = new Document({
    sections: [{ properties: {}, children: paragraphs }]
  });

  const blob = await Packer.toBlob(docxFile);
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}.docx`,
    size: blob.size,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    url,
    blob,
    extraInfo: `Parsed HTML DOM elements into Microsoft Word DOCX`
  };
}

export async function convertTxtToPdf(file: File): Promise<ConvertedFile> {
  const text = await file.text();
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const fontSize = 11;
  const lineHeight = 16;
  const margin = 50;
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const printableWidth = pageWidth - margin * 2;
  const printableHeight = pageHeight - margin * 2;
  const linesPerPage = Math.floor(printableHeight / lineHeight);

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
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const bodyText = doc.body.innerText || doc.body.textContent || '';

  const virtualTextFile = new File([bodyText], file.name.replace(/\.html?$/i, '.txt'), {
    type: 'text/plain'
  });

  const pdfResult = await convertTxtToPdf(virtualTextFile);
  pdfResult.extraInfo = `Parsed HTML structure and rendered to PDF`;
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
    previewText: extracted.slice(0, 1000),
    extraInfo: `Extracted ${paragraphs.length} paragraphs from Word DOCX archive`
  };
}

export async function convertDocxToHtml(file: File): Promise<ConvertedFile> {
  const txtResult = await extractDocxText(file);
  const text = await txtResult.blob.text();
  const paragraphs = text.split('\n\n');

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(file.name)}</title>
  <style>body { font-family: Calibri, sans-serif; max-width: 800px; margin: 40px auto; line-height: 1.6; } p { margin: 12px 0; }</style>
</head>
<body>
  ${paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n  ')}
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.docx$/i, '');

  return {
    name: `${baseName}.html`,
    size: blob.size,
    type: 'text/html',
    url,
    blob,
    previewText: html.slice(0, 1000),
    extraInfo: `Converted Word document structure to clean HTML`
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
