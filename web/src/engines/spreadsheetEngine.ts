import * as XLSX from 'xlsx';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { ConvertedFile } from '../types';

export interface SpreadsheetPreview {
  sheetNames: string[];
  activeSheet: string;
  headers: string[];
  rows: (string | number)[][];
  totalRows: number;
}

export async function parseSpreadsheetPreview(file: File): Promise<SpreadsheetPreview> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheetNames = workbook.SheetNames;
  const activeSheet = sheetNames[0] || 'Sheet1';
  const worksheet = workbook.Sheets[activeSheet];

  const jsonData: (string | number)[][] = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: ''
  });

  const headers = (jsonData[0] || []).map((h) => String(h || ''));
  const rows = jsonData.slice(1, 11);

  return {
    sheetNames,
    activeSheet,
    headers,
    rows,
    totalRows: Math.max(0, jsonData.length - 1)
  };
}

export async function convertCsvToXlsx(file: File): Promise<ConvertedFile> {
  const text = await file.text();
  const workbook = XLSX.read(text, { type: 'string', raw: true });
  const outBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([outBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}.xlsx`,
    size: blob.size,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    url,
    blob,
    extraInfo: `Generated Excel Workbook (.xlsx) with ${workbook.SheetNames.length} sheet(s)`
  };
}

export async function convertXlsxToCsv(
  file: File,
  sheetName?: string,
  delimiter: string = ','
): Promise<ConvertedFile> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const targetSheet = sheetName || workbook.SheetNames[0];
  const worksheet = workbook.Sheets[targetSheet];

  if (!worksheet) {
    throw new Error(`Sheet "${targetSheet}" not found in workbook.`);
  }

  const csvText = XLSX.utils.sheet_to_csv(worksheet, { FS: delimiter, RS: '\n' });
  const bom = '\uFEFF';
  const blob = new Blob([bom + csvText], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  const ext = delimiter === '\t' ? 'tsv' : 'csv';

  return {
    name: `${baseName}_${targetSheet}.${ext}`,
    size: blob.size,
    type: ext === 'tsv' ? 'text/tab-separated-values' : 'text/csv',
    url,
    blob,
    previewText: csvText.slice(0, 800),
    extraInfo: `Exported worksheet "${targetSheet}" to UTF-8 ${ext.toUpperCase()}`
  };
}

export async function convertCsvToTsv(file: File): Promise<ConvertedFile> {
  const text = await file.text();
  const workbook = XLSX.read(text, { type: 'string', raw: true });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const tsvText = XLSX.utils.sheet_to_csv(sheet, { FS: '\t', RS: '\n' });

  const blob = new Blob(['\uFEFF' + tsvText], { type: 'text/tab-separated-values;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}.tsv`,
    size: blob.size,
    type: 'text/tab-separated-values',
    url,
    blob,
    previewText: tsvText.slice(0, 800),
    extraInfo: `Converted comma delimiters to tab-separated values (TSV)`
  };
}

export async function convertXlsxToJson(file: File, sheetName?: string): Promise<ConvertedFile> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const targetSheet = sheetName || workbook.SheetNames[0];
  const worksheet = workbook.Sheets[targetSheet];

  if (!worksheet) {
    throw new Error(`Sheet "${targetSheet}" not found.`);
  }

  const json = XLSX.utils.sheet_to_json(worksheet);
  const jsonStr = JSON.stringify(json, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}_${targetSheet}.json`,
    size: blob.size,
    type: 'application/json',
    url,
    blob,
    previewText: jsonStr.slice(0, 800),
    extraInfo: `Exported ${json.length} records as JSON array`
  };
}

export async function convertJsonToXlsx(file: File): Promise<ConvertedFile> {
  const text = await file.text();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('Invalid JSON format. Please upload a valid JSON array or object.');
  }

  const records = Array.isArray(parsed) ? parsed : [parsed];
  const worksheet = XLSX.utils.json_to_sheet(records);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

  const outBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([outBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}.xlsx`,
    size: blob.size,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    url,
    blob,
    extraInfo: `Created Excel workbook containing ${records.length} row(s)`
  };
}

export async function convertJsonToCsv(file: File): Promise<ConvertedFile> {
  const text = await file.text();
  const parsed = JSON.parse(text);
  const records = Array.isArray(parsed) ? parsed : [parsed];
  const worksheet = XLSX.utils.json_to_sheet(records);
  const csvText = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob(['\uFEFF' + csvText], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}.csv`,
    size: blob.size,
    type: 'text/csv',
    url,
    blob,
    previewText: csvText.slice(0, 800),
    extraInfo: `Converted JSON dataset into CSV rows`
  };
}

export async function convertSpreadsheetToPdf(file: File): Promise<ConvertedFile> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const data: (string | number)[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  if (data.length === 0) throw new Error('Spreadsheet has no rows.');

  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Landscape A4: 841.89 x 595.28 points
  const pageWidth = 841.89;
  const pageHeight = 595.28;
  const margin = 40;
  const colWidth = Math.min(120, (pageWidth - margin * 2) / Math.max(1, data[0].length));
  const rowHeight = 22;
  const rowsPerPage = Math.floor((pageHeight - margin * 2 - 30) / rowHeight);

  let curRow = 0;
  while (curRow < data.length) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin - 20;

    // Header
    const isFirstPage = curRow === 0;
    if (isFirstPage) {
      page.drawText(`${file.name} - Spreadsheet Export`, {
        x: margin,
        y: pageHeight - margin,
        size: 14,
        font: fontBold,
        color: rgb(0.06, 0.09, 0.16)
      });
    }

    const pageRows = data.slice(curRow, curRow + rowsPerPage);
    for (let rIdx = 0; rIdx < pageRows.length; rIdx++) {
      const row = pageRows[rIdx];
      const isHeaderRow = curRow + rIdx === 0;

      // Draw background stripe for headers
      if (isHeaderRow) {
        page.drawRectangle({
          x: margin,
          y: y - 4,
          width: pageWidth - margin * 2,
          height: rowHeight,
          color: rgb(0.9, 0.94, 0.98)
        });
      }

      for (let cIdx = 0; cIdx < Math.min(row.length, 10); cIdx++) {
        const text = String(row[cIdx] ?? '').slice(0, 18);
        page.drawText(text, {
          x: margin + cIdx * colWidth + 4,
          y: y + 2,
          size: 9,
          font: isHeaderRow ? fontBold : fontRegular,
          color: rgb(0.15, 0.2, 0.25)
        });
      }
      y -= rowHeight;
    }

    curRow += rowsPerPage;
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}_table.pdf`,
    size: blob.size,
    type: 'application/pdf',
    url,
    blob,
    extraInfo: `Generated ${pdfDoc.getPageCount()} landscape PDF page(s) from spreadsheet`
  };
}

export async function convertSpreadsheetToHtml(file: File): Promise<ConvertedFile> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const htmlTable = XLSX.utils.sheet_to_html(worksheet);

  const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${file.name} - Spreadsheet</title>
  <style>
    body { font-family: -apple-system, sans-serif; padding: 30px; background: #f8fafc; color: #1e293b; }
    table { border-collapse: collapse; width: 100%; background: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
    td, th { border: 1px solid #e2e8f0; padding: 10px 14px; text-align: left; font-size: 13px; }
    tr:first-child { background: #0284c7; color: #ffffff; font-weight: bold; }
    tr:nth-child(even) { background: #f1f5f9; }
  </style>
</head>
<body>
  <h2>${file.name}</h2>
  ${htmlTable}
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}_table.html`,
    size: blob.size,
    type: 'text/html',
    url,
    blob,
    previewText: fullHtml.slice(0, 1000),
    extraInfo: `Generated standalone HTML table view with responsive styling`
  };
}

export async function convertXmlToJson(file: File): Promise<ConvertedFile> {
  const xml = await file.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'application/xml');

  const xmlToJsonObj = (node: Node): unknown => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue?.trim() || undefined;
    }
    const obj: Record<string, unknown> = {};
    if (node.childNodes && node.childNodes.length > 0) {
      for (let i = 0; i < node.childNodes.length; i++) {
        const item = node.childNodes[i];
        const nodeName = item.nodeName;
        if (item.nodeType === Node.TEXT_NODE && item.nodeValue?.trim()) {
          return item.nodeValue.trim();
        }
        if (item.nodeType === Node.ELEMENT_NODE) {
          const val = xmlToJsonObj(item);
          if (obj[nodeName] !== undefined) {
            if (!Array.isArray(obj[nodeName])) {
              obj[nodeName] = [obj[nodeName]];
            }
            (obj[nodeName] as unknown[]).push(val);
          } else {
            obj[nodeName] = val;
          }
        }
      }
    }
    return obj;
  };

  const jsonRes = xmlToJsonObj(xmlDoc.documentElement);
  const jsonStr = JSON.stringify({ [xmlDoc.documentElement.nodeName]: jsonRes }, null, 2);

  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}.json`,
    size: blob.size,
    type: 'application/json',
    url,
    blob,
    previewText: jsonStr.slice(0, 800),
    extraInfo: `Parsed XML hierarchy into structured JSON`
  };
}

export async function convertJsonToXml(file: File): Promise<ConvertedFile> {
  const json = JSON.parse(await file.text());

  const jsonToXmlStr = (obj: unknown, rootName: string = 'root'): string => {
    if (typeof obj !== 'object' || obj === null) {
      return `<${rootName}>${obj}</${rootName}>`;
    }
    let xml = `<${rootName}>`;
    if (Array.isArray(obj)) {
      xml = obj.map((item) => jsonToXmlStr(item, 'item')).join('');
      return `<${rootName}>${xml}</${rootName}>`;
    }
    for (const prop in obj as Record<string, unknown>) {
      const val = (obj as Record<string, unknown>)[prop];
      if (Array.isArray(val)) {
        for (const item of val) {
          xml += jsonToXmlStr(item, prop);
        }
      } else if (typeof val === 'object' && val !== null) {
        xml += jsonToXmlStr(val, prop);
      } else {
        xml += `<${prop}>${val ?? ''}</${prop}>`;
      }
    }
    xml += `</${rootName}>`;
    return xml;
  };

  const xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>\n` + jsonToXmlStr(json);
  const blob = new Blob([xmlOutput], { type: 'application/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}.xml`,
    size: blob.size,
    type: 'application/xml',
    url,
    blob,
    previewText: xmlOutput.slice(0, 800),
    extraInfo: `Serialized JSON object into valid XML document`
  };
}
