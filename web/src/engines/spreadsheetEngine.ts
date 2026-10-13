import * as XLSX from 'xlsx';
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
  const rows = jsonData.slice(1, 11); // first 10 rows for preview

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
    extraInfo: `Generated Excel Workbook with ${workbook.SheetNames.length} sheet(s)`
  };
}

export async function convertXlsxToCsv(
  file: File,
  sheetName?: string
): Promise<ConvertedFile> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const targetSheet = sheetName || workbook.SheetNames[0];
  const worksheet = workbook.Sheets[targetSheet];

  if (!worksheet) {
    throw new Error(`Sheet "${targetSheet}" not found in workbook.`);
  }

  // Prepend UTF-8 BOM so Excel and other tools properly display Bengali and Unicode characters
  const csvText = XLSX.utils.sheet_to_csv(worksheet, { FS: ',', RS: '\n' });
  const bom = '\uFEFF';
  const blob = new Blob([bom + csvText], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return {
    name: `${baseName}_${targetSheet}.csv`,
    size: blob.size,
    type: 'text/csv',
    url,
    blob,
    extraInfo: `Exported worksheet "${targetSheet}" to UTF-8 CSV with Unicode support`
  };
}

export async function convertXlsxToJson(
  file: File,
  sheetName?: string
): Promise<ConvertedFile> {
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
