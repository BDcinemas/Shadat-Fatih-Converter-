export type Language = 'en' | 'bn';
export type Theme = 'light' | 'dark';

export type ToolCategory =
  | 'all'
  | 'pdf'
  | 'image'
  | 'document'
  | 'spreadsheet'
  | 'media'
  | 'archive';

export interface ConversionTool {
  id: string;
  nameKey: string;
  descKey: string;
  category: ToolCategory;
  iconName: string;
  inputExtensions: string[];
  outputExtensions: string[];
  maxFileSizeMB: number;
  popular?: boolean;
  engine: 'pdf' | 'image' | 'document' | 'spreadsheet' | 'archive' | 'media';
  requiresBackend?: boolean;
}

export type ConversionStatus = 'idle' | 'validating' | 'processing' | 'success' | 'error';

export interface ConvertedFile {
  name: string;
  size: number;
  type: string;
  url: string;
  blob: Blob;
  previewUrl?: string;
  extraInfo?: string;
}

export interface ImageConversionSettings {
  targetFormat: 'image/png' | 'image/jpeg' | 'image/webp';
  quality: number; // 0.1 to 1.0
  resizeEnabled: boolean;
  targetWidth?: number;
  targetHeight?: number;
  maintainAspectRatio: boolean;
  rotation: number; // 0, 90, 180, 270
}

export interface PdfConversionSettings {
  mergeOrder?: number[];
  splitPages?: string; // e.g. "1-3, 5"
  rotateAngle?: number;
  deletePages?: string;
  compressionQuality?: 'low' | 'medium' | 'high';
}

export interface SpreadsheetSettings {
  targetFormat: 'xlsx' | 'csv' | 'json';
  selectedSheet?: string;
}

export interface ArchiveSettings {
  compressionLevel: 1 | 5 | 9; // fast, normal, max
}
