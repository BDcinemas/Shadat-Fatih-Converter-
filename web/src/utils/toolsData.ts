import { ConversionTool } from '../types';

export const TOOLS_DATA: ConversionTool[] = [
  // PDF Tools
  {
    id: 'pdf-merge',
    nameKey: 'tool_pdf_merge',
    descKey: 'tool_pdf_merge_desc',
    category: 'pdf',
    iconName: 'Files',
    inputExtensions: ['.pdf'],
    outputExtensions: ['.pdf'],
    maxFileSizeMB: 100,
    popular: true,
    engine: 'pdf'
  },
  {
    id: 'pdf-split',
    nameKey: 'tool_pdf_split',
    descKey: 'tool_pdf_split_desc',
    category: 'pdf',
    iconName: 'Scissors',
    inputExtensions: ['.pdf'],
    outputExtensions: ['.pdf', '.zip'],
    maxFileSizeMB: 100,
    popular: true,
    engine: 'pdf'
  },
  {
    id: 'img-to-pdf',
    nameKey: 'tool_img_to_pdf',
    descKey: 'tool_img_to_pdf_desc',
    category: 'pdf',
    iconName: 'FileImage',
    inputExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
    outputExtensions: ['.pdf'],
    maxFileSizeMB: 100,
    popular: true,
    engine: 'pdf'
  },
  {
    id: 'pdf-rotate',
    nameKey: 'tool_pdf_rotate',
    descKey: 'tool_pdf_rotate_desc',
    category: 'pdf',
    iconName: 'RotateCw',
    inputExtensions: ['.pdf'],
    outputExtensions: ['.pdf'],
    maxFileSizeMB: 100,
    engine: 'pdf'
  },
  {
    id: 'pdf-delete-pages',
    nameKey: 'tool_pdf_delete_pages',
    descKey: 'tool_pdf_delete_pages_desc',
    category: 'pdf',
    iconName: 'Trash2',
    inputExtensions: ['.pdf'],
    outputExtensions: ['.pdf'],
    maxFileSizeMB: 100,
    engine: 'pdf'
  },
  {
    id: 'pdf-to-text',
    nameKey: 'tool_pdf_to_text',
    descKey: 'tool_pdf_to_text_desc',
    category: 'pdf',
    iconName: 'FileText',
    inputExtensions: ['.pdf'],
    outputExtensions: ['.txt'],
    maxFileSizeMB: 100,
    engine: 'pdf'
  },

  // Image Tools
  {
    id: 'img-convert',
    nameKey: 'tool_img_convert',
    descKey: 'tool_img_convert_desc',
    category: 'image',
    iconName: 'Image',
    inputExtensions: ['.png', '.jpg', '.jpeg', '.webp'],
    outputExtensions: ['.webp', '.png', '.jpg'],
    maxFileSizeMB: 50,
    popular: true,
    engine: 'image'
  },
  {
    id: 'img-compress',
    nameKey: 'tool_img_compress',
    descKey: 'tool_img_compress_desc',
    category: 'image',
    iconName: 'Minimize2',
    inputExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
    outputExtensions: ['.jpg', '.webp'],
    maxFileSizeMB: 50,
    popular: true,
    engine: 'image'
  },
  {
    id: 'img-resize',
    nameKey: 'tool_img_resize',
    descKey: 'tool_img_resize_desc',
    category: 'image',
    iconName: 'Maximize2',
    inputExtensions: ['.png', '.jpg', '.jpeg', '.webp'],
    outputExtensions: ['.png', '.jpg', '.webp'],
    maxFileSizeMB: 50,
    engine: 'image'
  },

  // Document Tools
  {
    id: 'txt-to-pdf',
    nameKey: 'tool_txt_to_pdf',
    descKey: 'tool_txt_to_pdf_desc',
    category: 'document',
    iconName: 'FileCode',
    inputExtensions: ['.txt', '.md'],
    outputExtensions: ['.pdf'],
    maxFileSizeMB: 20,
    popular: true,
    engine: 'document'
  },
  {
    id: 'html-to-pdf',
    nameKey: 'tool_html_to_pdf',
    descKey: 'tool_html_to_pdf_desc',
    category: 'document',
    iconName: 'Code',
    inputExtensions: ['.html', '.htm'],
    outputExtensions: ['.pdf'],
    maxFileSizeMB: 20,
    engine: 'document'
  },
  {
    id: 'docx-extract',
    nameKey: 'tool_docx_extract',
    descKey: 'tool_docx_extract_desc',
    category: 'document',
    iconName: 'BookOpen',
    inputExtensions: ['.docx'],
    outputExtensions: ['.txt'],
    maxFileSizeMB: 50,
    engine: 'document'
  },

  // Spreadsheet Tools
  {
    id: 'csv-to-xlsx',
    nameKey: 'tool_csv_to_xlsx',
    descKey: 'tool_csv_to_xlsx_desc',
    category: 'spreadsheet',
    iconName: 'Sheet',
    inputExtensions: ['.csv'],
    outputExtensions: ['.xlsx'],
    maxFileSizeMB: 50,
    popular: true,
    engine: 'spreadsheet'
  },
  {
    id: 'xlsx-to-csv',
    nameKey: 'tool_xlsx_to_csv',
    descKey: 'tool_xlsx_to_csv_desc',
    category: 'spreadsheet',
    iconName: 'Table',
    inputExtensions: ['.xlsx', '.xls'],
    outputExtensions: ['.csv'],
    maxFileSizeMB: 50,
    popular: true,
    engine: 'spreadsheet'
  },
  {
    id: 'xlsx-to-json',
    nameKey: 'tool_xlsx_to_json',
    descKey: 'tool_xlsx_to_json_desc',
    category: 'spreadsheet',
    iconName: 'Braces',
    inputExtensions: ['.xlsx', '.xls'],
    outputExtensions: ['.json'],
    maxFileSizeMB: 50,
    engine: 'spreadsheet'
  },
  {
    id: 'json-to-xlsx',
    nameKey: 'tool_json_to_xlsx',
    descKey: 'tool_json_to_xlsx_desc',
    category: 'spreadsheet',
    iconName: 'FileSpreadsheet',
    inputExtensions: ['.json'],
    outputExtensions: ['.xlsx'],
    maxFileSizeMB: 20,
    engine: 'spreadsheet'
  },

  // Archive Tools
  {
    id: 'zip-create',
    nameKey: 'tool_zip_create',
    descKey: 'tool_zip_create_desc',
    category: 'archive',
    iconName: 'Archive',
    inputExtensions: ['*'],
    outputExtensions: ['.zip'],
    maxFileSizeMB: 100,
    popular: true,
    engine: 'archive'
  },
  {
    id: 'zip-extract',
    nameKey: 'tool_zip_extract',
    descKey: 'tool_zip_extract_desc',
    category: 'archive',
    iconName: 'FolderArchive',
    inputExtensions: ['.zip'],
    outputExtensions: ['multiple'],
    maxFileSizeMB: 100,
    engine: 'archive'
  },

  // Audio & Video
  {
    id: 'audio-extract',
    nameKey: 'tool_audio_extract',
    descKey: 'tool_audio_extract_desc',
    category: 'media',
    iconName: 'Music',
    inputExtensions: ['.mp4', '.webm', '.mov', '.mkv', '.avi'],
    outputExtensions: ['.wav', '.mp3'],
    maxFileSizeMB: 100,
    popular: true,
    engine: 'media'
  },
  {
    id: 'audio-convert',
    nameKey: 'tool_audio_convert',
    descKey: 'tool_audio_convert_desc',
    category: 'media',
    iconName: 'AudioWaveform',
    inputExtensions: ['.wav', '.mp3', '.ogg', '.m4a', '.aac', '.flac'],
    outputExtensions: ['.wav', '.mp3'],
    maxFileSizeMB: 100,
    engine: 'media'
  }
];
