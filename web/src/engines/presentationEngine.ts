import JSZip from 'jszip';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { ConvertedFile } from '../types';

export async function convertPptxToPdf(file: File): Promise<ConvertedFile> {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);

  // Find slide files ppt/slides/slide*.xml
  const slideEntries = Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => {
      const numA = parseInt(a.replace(/[^0-9]/g, ''), 10) || 0;
      const numB = parseInt(b.replace(/[^0-9]/g, ''), 10) || 0;
      return numA - numB;
    });

  if (slideEntries.length === 0) {
    throw new Error('No slide contents found in this PowerPoint presentation.');
  }

  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Standard 16:9 Presentation Page: 960 x 540 points
  const slideWidth = 960;
  const slideHeight = 540;

  for (let idx = 0; idx < slideEntries.length; idx++) {
    const entryName = slideEntries[idx];
    const xmlText = await zip.files[entryName].async('text');
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    // Extract text runs <a:t>
    const textNodes = xmlDoc.getElementsByTagName('a:t');
    const slideTexts: string[] = [];
    for (let i = 0; i < textNodes.length; i++) {
      const t = textNodes[i].textContent?.trim();
      if (t) slideTexts.push(t);
    }

    const title = slideTexts[0] || `Slide ${idx + 1}`;
    const bodyItems = slideTexts.slice(1);

    const page = pdfDoc.addPage([slideWidth, slideHeight]);

    // Draw background
    page.drawRectangle({
      x: 0,
      y: 0,
      width: slideWidth,
      height: slideHeight,
      color: rgb(0.97, 0.98, 0.99)
    });

    // Draw top accent bar
    page.drawRectangle({
      x: 0,
      y: slideHeight - 12,
      width: slideWidth,
      height: 12,
      color: rgb(0.01, 0.52, 0.78)
    });

    // Draw Slide Title
    page.drawText(title, {
      x: 60,
      y: slideHeight - 70,
      size: 26,
      font: fontBold,
      color: rgb(0.06, 0.09, 0.16)
    });

    // Draw divider line
    page.drawLine({
      start: { x: 60, y: slideHeight - 85 },
      end: { x: slideWidth - 60, y: slideHeight - 85 },
      thickness: 1.5,
      color: rgb(0.85, 0.88, 0.92)
    });

    // Draw Body text lines
    let y = slideHeight - 130;
    for (const item of bodyItems.slice(0, 10)) {
      page.drawText(`•  ${item}`, {
        x: 70,
        y,
        size: 16,
        font: fontRegular,
        color: rgb(0.2, 0.25, 0.3)
      });
      y -= 30;
      if (y < 80) break;
    }

    // Draw slide footer with number
    page.drawText(`Slide ${idx + 1} of ${slideEntries.length}`, {
      x: slideWidth - 140,
      y: 30,
      size: 11,
      font: fontRegular,
      color: rgb(0.4, 0.45, 0.5)
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}_presentation.pdf`,
    size: blob.size,
    type: 'application/pdf',
    url,
    blob,
    extraInfo: `Generated 16:9 PDF with ${slideEntries.length} slides`
  };
}

export async function extractPptxSlidesToZip(file: File): Promise<ConvertedFile> {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);

  const outZip = new JSZip();

  // Extract embedded media images (ppt/media/image*.*)
  const mediaFiles = Object.keys(zip.files).filter((name) => /^ppt\/media\//.test(name));
  for (const mName of mediaFiles) {
    const data = await zip.files[mName].async('uint8array');
    const cleanName = mName.replace('ppt/media/', '');
    outZip.file(`images/${cleanName}`, data);
  }

  // Also export text manifest of slides
  const slideEntries = Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort();

  const manifestLines: string[] = [`PowerPoint Presentation Slide Outline`, `File: ${file.name}`, `----------------------------------------`];

  for (let i = 0; i < slideEntries.length; i++) {
    const xml = await zip.files[slideEntries[i]].async('text');
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    const texts = Array.from(doc.getElementsByTagName('a:t')).map((n) => n.textContent || '');
    manifestLines.push(`Slide ${i + 1}: ${texts.join(' | ')}`);
  }

  outZip.file('slides_outline.txt', manifestLines.join('\n'));

  const zipBlob = await outZip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}_slides_bundle.zip`,
    size: zipBlob.size,
    type: 'application/zip',
    url,
    blob: zipBlob,
    extraInfo: `Extracted ${slideEntries.length} slides outline and ${mediaFiles.length} media assets`
  };
}
