import { ConversionTool } from '../types';

export const TOOLS_DATA: ConversionTool[] = [
  // ==================== 1. PDF TOOLS ====================
  {
    id: 'pdf-to-img',
    nameKey: 'tool_pdf_to_img',
    descKey: 'tool_pdf_to_img_desc',
    category: 'pdf',
    iconName: 'FileImage',
    inputExtensions: ['.pdf'],
    outputExtensions: ['.png', '.jpg', '.webp', '.bmp', '.zip'],
    maxFileSizeMB: 100,
    popular: true,
    engine: 'pdf'
  },
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
    inputExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.gif'],
    outputExtensions: ['.pdf'],
    maxFileSizeMB: 100,
    popular: true,
    engine: 'pdf'
  },
  {
    id: 'pdf-watermark',
    nameKey: 'tool_pdf_watermark',
    descKey: 'tool_pdf_watermark_desc',
    category: 'pdf',
    iconName: 'Stamp',
    inputExtensions: ['.pdf'],
    outputExtensions: ['.pdf'],
    maxFileSizeMB: 100,
    popular: true,
    engine: 'pdf'
  },
  {
    id: 'pdf-page-numbers',
    nameKey: 'tool_pdf_page_numbers',
    descKey: 'tool_pdf_page_numbers_desc',
    category: 'pdf',
    iconName: 'Hash',
    inputExtensions: ['.pdf'],
    outputExtensions: ['.pdf'],
    maxFileSizeMB: 100,
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
  {
    id: 'pdf-metadata',
    nameKey: 'tool_pdf_metadata',
    descKey: 'tool_pdf_metadata_desc',
    category: 'pdf',
    iconName: 'FileEdit',
    inputExtensions: ['.pdf'],
    outputExtensions: ['.pdf'],
    maxFileSizeMB: 100,
    engine: 'pdf'
  },
  {
    id: 'ocr-tool',
    nameKey: 'tool_ocr',
    descKey: 'tool_ocr_desc',
    category: 'pdf',
    iconName: 'ScanText',
    inputExtensions: ['.png', '.jpg', '.jpeg', '.webp', '.bmp', '.pdf'],
    outputExtensions: ['.txt'],
    maxFileSizeMB: 50,
    popular: true,
    engine: 'ocr'
  },

  // ==================== 2. IMAGE TOOLS ====================
  {
    id: 'img-convert',
    nameKey: 'tool_img_convert',
    descKey: 'tool_img_convert_desc',
    category: 'image',
    iconName: 'Image',
    inputExtensions: ['.png', '.jpg', '.jpeg', '.webp', '.bmp', '.gif'],
    outputExtensions: ['.webp', '.png', '.jpg', '.bmp', '.ico'],
    maxFileSizeMB: 50,
    popular: true,
    engine: 'image'
  },
  {
    id: 'img-to-ico',
    nameKey: 'tool_img_to_ico',
    descKey: 'tool_img_to_ico_desc',
    category: 'image',
    iconName: 'AppWindow',
    inputExtensions: ['.png', '.jpg', '.jpeg', '.webp', '.svg'],
    outputExtensions: ['.ico'],
    maxFileSizeMB: 30,
    popular: true,
    engine: 'image'
  },
  {
    id: 'img-to-svg',
    nameKey: 'tool_img_to_svg',
    descKey: 'tool_img_to_svg_desc',
    category: 'image',
    iconName: 'Vector',
    inputExtensions: ['.png', '.jpg', '.jpeg', '.webp'],
    outputExtensions: ['.svg'],
    maxFileSizeMB: 20,
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
    inputExtensions: ['.png', '.jpg', '.jpeg', '.webp', '.bmp'],
    outputExtensions: ['.png', '.jpg', '.webp', '.bmp'],
    maxFileSizeMB: 50,
    engine: 'image'
  },

  // ==================== 3. DOCUMENT & WORD TOOLS ====================
  {
    id: 'txt-to-docx',
    nameKey: 'tool_txt_to_docx',
    descKey: 'tool_txt_to_docx_desc',
    category: 'document',
    iconName: 'FileWord',
    inputExtensions: ['.txt'],
    outputExtensions: ['.docx'],
    maxFileSizeMB: 20,
    popular: true,
    engine: 'document'
  },
  {
    id: 'md-to-docx',
    nameKey: 'tool_md_to_docx',
    descKey: 'tool_md_to_docx_desc',
    category: 'document',
    iconName: 'FileWord',
    inputExtensions: ['.md', '.markdown'],
    outputExtensions: ['.docx', '.html', '.pdf'],
    maxFileSizeMB: 20,
    popular: true,
    engine: 'document'
  },
  {
    id: 'html-to-docx',
    nameKey: 'tool_html_to_docx',
    descKey: 'tool_html_to_docx_desc',
    category: 'document',
    iconName: 'FileWord',
    inputExtensions: ['.html', '.htm'],
    outputExtensions: ['.docx'],
    maxFileSizeMB: 20,
    engine: 'document'
  },
  {
    id: 'docx-to-html',
    nameKey: 'tool_docx_to_html',
    descKey: 'tool_docx_to_html_desc',
    category: 'document',
    iconName: 'FileCode',
    inputExtensions: ['.docx'],
    outputExtensions: ['.html'],
    maxFileSizeMB: 50,
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

  // ==================== 4. SPREADSHEET & DATA TOOLS ====================
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
    id: 'csv-to-tsv',
    nameKey: 'tool_csv_to_tsv',
    descKey: 'tool_csv_to_tsv_desc',
    category: 'spreadsheet',
    iconName: 'Columns',
    inputExtensions: ['.csv'],
    outputExtensions: ['.tsv'],
    maxFileSizeMB: 50,
    engine: 'spreadsheet'
  },
  {
    id: 'sheet-to-pdf',
    nameKey: 'tool_sheet_to_pdf',
    descKey: 'tool_sheet_to_pdf_desc',
    category: 'spreadsheet',
    iconName: 'FileSpreadsheet',
    inputExtensions: ['.xlsx', '.xls', '.csv'],
    outputExtensions: ['.pdf'],
    maxFileSizeMB: 50,
    popular: true,
    engine: 'spreadsheet'
  },
  {
    id: 'sheet-to-html',
    nameKey: 'tool_sheet_to_html',
    descKey: 'tool_sheet_to_html_desc',
    category: 'spreadsheet',
    iconName: 'FileCode',
    inputExtensions: ['.xlsx', '.xls', '.csv'],
    outputExtensions: ['.html'],
    maxFileSizeMB: 50,
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
  {
    id: 'json-to-csv',
    nameKey: 'tool_json_to_csv',
    descKey: 'tool_json_to_csv_desc',
    category: 'spreadsheet',
    iconName: 'Table',
    inputExtensions: ['.json'],
    outputExtensions: ['.csv'],
    maxFileSizeMB: 20,
    engine: 'spreadsheet'
  },
  {
    id: 'xml-to-json',
    nameKey: 'tool_xml_to_json',
    descKey: 'tool_xml_to_json_desc',
    category: 'spreadsheet',
    iconName: 'CodeXml',
    inputExtensions: ['.xml'],
    outputExtensions: ['.json'],
    maxFileSizeMB: 30,
    engine: 'spreadsheet'
  },
  {
    id: 'json-to-xml',
    nameKey: 'tool_json_to_xml',
    descKey: 'tool_json_to_xml_desc',
    category: 'spreadsheet',
    iconName: 'CodeXml',
    inputExtensions: ['.json'],
    outputExtensions: ['.xml'],
    maxFileSizeMB: 30,
    engine: 'spreadsheet'
  },

  // ==================== 5. PRESENTATION TOOLS ====================
  {
    id: 'pptx-to-pdf',
    nameKey: 'tool_pptx_to_pdf',
    descKey: 'tool_pptx_to_pdf_desc',
    category: 'presentation',
    iconName: 'Presentation',
    inputExtensions: ['.pptx'],
    outputExtensions: ['.pdf'],
    maxFileSizeMB: 60,
    popular: true,
    engine: 'presentation'
  },
  {
    id: 'pptx-to-images',
    nameKey: 'tool_pptx_to_images',
    descKey: 'tool_pptx_to_images_desc',
    category: 'presentation',
    iconName: 'Images',
    inputExtensions: ['.pptx'],
    outputExtensions: ['.zip'],
    maxFileSizeMB: 60,
    popular: true,
    engine: 'presentation'
  },

  // ==================== 6. AUDIO TOOLS ====================
  {
    id: 'audio-convert',
    nameKey: 'tool_audio_convert',
    descKey: 'tool_audio_convert_desc',
    category: 'audio',
    iconName: 'AudioWaveform',
    inputExtensions: ['.wav', '.mp3', '.ogg', '.m4a', '.aac', '.flac'],
    outputExtensions: ['.wav', '.mp3', '.ogg', '.flac'],
    maxFileSizeMB: 100,
    popular: true,
    engine: 'audio'
  },

  // ==================== 7. VIDEO TOOLS ====================
  {
    id: 'video-audio-extract',
    nameKey: 'tool_video_audio_extract',
    descKey: 'tool_video_audio_extract_desc',
    category: 'video',
    iconName: 'Music',
    inputExtensions: ['.mp4', '.webm', '.mov', '.mkv', '.avi'],
    outputExtensions: ['.wav', '.mp3'],
    maxFileSizeMB: 100,
    popular: true,
    engine: 'video'
  },
  {
    id: 'video-to-frames',
    nameKey: 'tool_video_to_frames',
    descKey: 'tool_video_to_frames_desc',
    category: 'video',
    iconName: 'Film',
    inputExtensions: ['.mp4', '.webm', '.mov'],
    outputExtensions: ['.zip'],
    maxFileSizeMB: 100,
    engine: 'video'
  },
  {
    id: 'video-to-gif',
    nameKey: 'tool_video_to_gif',
    descKey: 'tool_video_to_gif_desc',
    category: 'video',
    iconName: 'Sparkles',
    inputExtensions: ['.mp4', '.webm', '.mov'],
    outputExtensions: ['.zip'],
    maxFileSizeMB: 60,
    engine: 'video'
  },

  // ==================== 8. ARCHIVE TOOLS ====================
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
    popular: true,
    engine: 'archive'
  },

  // ==================== 9. UTILITY TOOLS ====================
  {
    id: 'file-checksum',
    nameKey: 'tool_checksum',
    descKey: 'tool_checksum_desc',
    category: 'utility',
    iconName: 'ShieldCheck',
    inputExtensions: ['*'],
    outputExtensions: ['.txt'],
    maxFileSizeMB: 200,
    popular: true,
    engine: 'utility'
  },
  {
    id: 'file-metadata',
    nameKey: 'tool_metadata',
    descKey: 'tool_metadata_desc',
    category: 'utility',
    iconName: 'Info',
    inputExtensions: ['*'],
    outputExtensions: ['.txt'],
    maxFileSizeMB: 200,
    engine: 'utility'
  }
];
