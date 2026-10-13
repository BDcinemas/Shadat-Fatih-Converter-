import { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Brand
    brandName: 'SFC Shadat Fatih Converter',
    brandInitials: 'SFC',
    tagline: 'Convert Files. Simplify Your Work.',
    subTagline: 'Fast, secure, and privacy-first online file converter. Process files entirely in your browser with zero data leaks.',

    // Navigation
    navHome: 'Home',
    navAllTools: 'All Tools',
    navPdfTools: 'PDF Tools',
    navImageTools: 'Image',
    navDocTools: 'Document',
    navSpreadsheetTools: 'Spreadsheet',
    navMediaTools: 'Audio & Video',
    navArchiveTools: 'Archive',
    navAbout: 'About',
    navPrivacy: 'Privacy Policy',
    navTerms: 'Terms of Service',

    // Hero & Search
    searchPlaceholder: 'Search tools (e.g., PDF to Word, PNG to WebP, CSV to Excel)...',
    popularBadge: 'Popular',
    exploreTools: 'Explore All Tools',
    allToolsTitle: 'Complete Conversion Tool Suite',
    privacyHeroNotice: '100% Client-Side Processing • Files Never Leave Your Device',

    // Categories
    catAll: 'All Tools',
    catPdf: 'PDF Tools',
    catImage: 'Image Converter',
    catDoc: 'Document & Word',
    catSpreadsheet: 'Excel & CSV',
    catMedia: 'Audio & Video',
    catArchive: 'Compress & Archive',

    // General Tool Labels & Actions
    dropTitle: 'Drag & drop your files here',
    dropSubtitle: 'or click to browse from device',
    selectFiles: 'Select Files',
    maxSizeNotice: 'Max file size: 100 MB per file',
    convertBtn: 'Convert Now',
    converting: 'Processing...',
    downloadBtn: 'Download Converted File',
    downloadAllBtn: 'Download All (ZIP)',
    convertAnother: 'Convert Another File',
    cancelBtn: 'Cancel',
    resetBtn: 'Reset',
    previewOriginal: 'Original File',
    previewConverted: 'Converted Result',
    originalSize: 'Original Size',
    convertedSize: 'Converted Size',
    reduction: 'Saved',
    increase: 'Larger by',
    settings: 'Conversion Settings',

    // Tool Names & Descriptions
    tool_pdf_merge: 'Merge PDF',
    tool_pdf_merge_desc: 'Combine multiple PDF documents into a single unified file in custom order.',
    tool_pdf_split: 'Split PDF',
    tool_pdf_split_desc: 'Extract individual pages or custom page ranges into separate PDF documents.',
    tool_pdf_rotate: 'Rotate PDF',
    tool_pdf_rotate_desc: 'Rotate PDF pages by 90, 180, or 270 degrees clockwise.',
    tool_img_to_pdf: 'Image to PDF',
    tool_img_to_pdf_desc: 'Convert JPG, PNG, and WebP images into a high-quality multi-page PDF.',
    tool_pdf_to_text: 'Extract Text from PDF',
    tool_pdf_to_text_desc: 'Extract selectable text content from text-based PDF documents.',
    tool_pdf_delete_pages: 'Delete PDF Pages',
    tool_pdf_delete_pages_desc: 'Remove unwanted pages from your PDF and save the updated file.',
    
    tool_img_convert: 'Image Converter',
    tool_img_convert_desc: 'Convert images between PNG, JPG, and WebP with zero quality degradation.',
    tool_img_compress: 'Compress Image',
    tool_img_compress_desc: 'Reduce image file size with custom quality slider and real-time preview.',
    tool_img_resize: 'Resize Image',
    tool_img_resize_desc: 'Change image dimensions by width and height with aspect ratio lock.',

    tool_txt_to_pdf: 'Text to PDF',
    tool_txt_to_pdf_desc: 'Format plain text documents into beautifully structured PDF files.',
    tool_html_to_pdf: 'HTML to PDF',
    tool_html_to_pdf_desc: 'Convert HTML code or web pages into printable PDF documents.',
    tool_docx_extract: 'DOCX Text Extractor',
    tool_docx_extract_desc: 'Inspect DOCX archives and extract text without Microsoft Word.',

    tool_csv_to_xlsx: 'CSV to Excel (XLSX)',
    tool_csv_to_xlsx_desc: 'Convert delimited CSV files into formatted Excel spreadsheets.',
    tool_xlsx_to_csv: 'Excel (XLSX) to CSV',
    tool_xlsx_to_csv_desc: 'Export Excel worksheets to standard UTF-8 comma-separated CSV files.',
    tool_xlsx_to_json: 'Excel to JSON',
    tool_xlsx_to_json_desc: 'Convert Excel spreadsheet data into structured JSON objects.',
    tool_json_to_xlsx: 'JSON to Excel',
    tool_json_to_xlsx_desc: 'Transform raw JSON arrays into downloadable Excel spreadsheets.',

    tool_zip_create: 'Create ZIP Archive',
    tool_zip_create_desc: 'Bundle multiple files and folders into a compressed ZIP file.',
    tool_zip_extract: 'Extract ZIP Archive',
    tool_zip_extract_desc: 'Unpack files safely from ZIP archives directly inside your browser.',

    tool_audio_extract: 'Extract Audio from Video',
    tool_audio_extract_desc: 'Extract audio tracks from MP4, WebM, or MOV files into WAV or MP3.',
    tool_audio_convert: 'Audio Converter',
    tool_audio_convert_desc: 'Convert audio files between WAV, MP3, and WebM audio formats.',

    // Settings & Options
    formatLabel: 'Target Format',
    qualityLabel: 'Quality',
    qualityNote: 'Lower quality produces smaller file sizes',
    widthLabel: 'Width (px)',
    heightLabel: 'Height (px)',
    lockAspect: 'Maintain Aspect Ratio',
    rotationAngle: 'Rotation Angle',
    selectPages: 'Page Range (e.g. 1-3, 5)',
    allPages: 'All Pages',
    compressionLevel: 'Compression Level',
    compFast: 'Fast (Low)',
    compStandard: 'Standard (Recommended)',
    compMax: 'Maximum',
    selectWorksheet: 'Select Worksheet',

    // Statuses & Validation
    statusValidating: 'Validating file format and size...',
    statusProcessing: 'Converting file securely in browser...',
    statusDone: 'Conversion completed successfully!',
    errorUnsupportedFormat: 'Unsupported file format for this tool.',
    errorTooLarge: 'File is too large. Maximum allowed size is 100 MB.',
    errorFailed: 'Conversion failed. Please try a different file or format.',
    errorNoFile: 'Please choose at least one valid file.',
    errorOcrNote: 'Note: Scanned image-only PDFs require OCR which is not supported client-side.',

    // Recently Used
    recentToolsTitle: 'Recently Used Tools',
    clearRecent: 'Clear History',
    noRecent: 'No recently used tools yet. Try one below!',

    // Privacy Section
    privacyTitle: 'Why SFC is 100% Secure & Private',
    privacyPoint1Title: 'Zero Server Uploads',
    privacyPoint1Desc: 'All conversions run directly in your web browser using WebAssembly and HTML5 APIs. Your sensitive files never leave your computer or phone.',
    privacyPoint2Title: 'No Data Retention',
    privacyPoint2Desc: 'We do not store, copy, inspect, or log any of your uploaded files or generated results. Memory is discarded instantly when you close the tab.',
    privacyPoint3Title: 'No Subscription or Limits',
    privacyPoint3Desc: 'No hidden paywalls, no login requirements, no credit card prompts, and no conversion counters.',

    // Footer
    footerDesc: 'SFC Shadat Fatih Converter is a professional, client-side file transformation suite developed by Shadat Fatih.',
    footerQuickLinks: 'Quick Links',
    footerLegal: 'Legal & Privacy',
    allRights: 'All rights reserved.',
    developedBy: 'Crafted with precision by Shadat Fatih'
  },
  bn: {
    // Brand
    brandName: 'এসএফসি শাদাত ফাতিহ কনভার্টার',
    brandInitials: 'এসএফসি',
    tagline: 'সহজেই ফাইল কনভার্ট করুন।',
    subTagline: 'দ্রুত, নিরাপদ এবং শতভাগ সুরক্ষিত অনলাইন ফাইল কনভার্টার। ব্রাউজারের মধ্যেই ফাইল প্রসেস করুন সম্পূর্ণ নিরাপদে।',

    // Navigation
    navHome: 'হোম',
    navAllTools: 'সকল টুলস',
    navPdfTools: 'পিডিএফ টুলস',
    navImageTools: 'ছবি কনভার্টার',
    navDocTools: 'ডকুমেন্ট',
    navSpreadsheetTools: 'স্প্রেডশিট',
    navMediaTools: 'অডিও ও ভিডিও',
    navArchiveTools: 'আর্কাইভ ও জিপ',
    navAbout: 'সম্পর্কে',
    navPrivacy: 'গোপনীয়তা নীতি',
    navTerms: 'ব্যবহারের শর্তাবলী',

    // Hero & Search
    searchPlaceholder: 'টুল খুঁজুন (যেমন: PDF to Word, PNG to WebP, CSV to Excel)...',
    popularBadge: 'জনপ্রিয়',
    exploreTools: 'সব টুলস দেখুন',
    allToolsTitle: 'সম্পূর্ণ ফাইল কনভার্টার সংগ্রহ',
    privacyHeroNotice: '১০০% ক্লায়েন্ট-সাইড প্রসেসিং • আপনার ফাইল ডিভাইস থেকে কোথাও যায় না',

    // Categories
    catAll: 'সকল টুলস',
    catPdf: 'পিডিএফ টুলস',
    catImage: 'ছবি কনভার্টার',
    catDoc: 'ডকুমেন্ট ও ওয়ার্ড',
    catSpreadsheet: 'এক্সেল ও সিএসভি',
    catMedia: 'অডিও ও ভিডিও',
    catArchive: 'কম্প্রেস ও আর্কাইভ',

    // General Tool Labels & Actions
    dropTitle: 'আপনার ফাইল ড্র্যাগ করে এখানে ড্রপ করুন',
    dropSubtitle: 'অথবা ডিভাইস থেকে ফাইল বাছাই করতে ক্লিক করুন',
    selectFiles: 'ফাইল বাছাই করুন',
    maxSizeNotice: 'সর্বোচ্চ ফাইলের আকার: ১০০ মেগাবাইট',
    convertBtn: 'এখনই কনভার্ট করুন',
    converting: 'প্রসেসিং হচ্ছে...',
    downloadBtn: 'কনভার্ট করা ফাইল ডাউনলোড করুন',
    downloadAllBtn: 'সব ডাউনলোড করুন (ZIP)',
    convertAnother: 'অন্য ফাইল কনভার্ট করুন',
    cancelBtn: 'বাতিল',
    resetBtn: 'রিসেট',
    previewOriginal: 'মূল ফাইল',
    previewConverted: 'কনভার্ট করা ফলাফল',
    originalSize: 'আসল সাইজ',
    convertedSize: 'নতুন সাইজ',
    reduction: 'সাশ্রয়',
    increase: 'বৃদ্ধি',
    settings: 'কনভার্শন সেটিংস',

    // Tool Names & Descriptions
    tool_pdf_merge: 'পিডিএফ মার্জ করুন',
    tool_pdf_merge_desc: 'একাধিক পিডিএফ ফাইল একসাথে যুক্ত করে একটি ফাইলে রূপান্তর করুন।',
    tool_pdf_split: 'পিডিএফ স্প্লিট / ভাগ করুন',
    tool_pdf_split_desc: 'পিডিএফ থেকে নির্দিষ্ট পাতা আলাদা ফাইলে বের করে নিন।',
    tool_pdf_rotate: 'পিডিএফ রোটেট / ঘোরান',
    tool_pdf_rotate_desc: 'পিডিএফের পাতাগুলো ৯০, ১৮০ বা ২৭০ ডিগ্রিতে ঘোরান।',
    tool_img_to_pdf: 'ছবি থেকে পিডিএফ',
    tool_img_to_pdf_desc: 'JPG, PNG ও WebP ছবিগুলোকে সুন্দর পিডিএফে রূপান্তর করুন।',
    tool_pdf_to_text: 'পিডিএফ থেকে টেক্সট বের করুন',
    tool_pdf_to_text_desc: 'টেক্সটভিত্তিক পিডিএফ ফাইল থেকে লেখা কপি ও টেক্সট ফাইল হিসেবে সংরক্ষণ করুন।',
    tool_pdf_delete_pages: 'পিডিএফের পাতা মুছুন',
    tool_pdf_delete_pages_desc: 'পিডিএফ থেকে অপ্রয়োজনীয় পাতাগুলো মুছে নতুন পিডিএফ তৈরি করুন।',

    tool_img_convert: 'ছবি কনভার্টার',
    tool_img_convert_desc: 'PNG, JPG এবং WebP ফরম্যাটের মধ্যে ছবি সহজেই কনভার্ট করুন।',
    tool_img_compress: 'ছবি কম্প্রেস করুন',
    tool_img_compress_desc: 'ছবির মান ঠিক রেখে ফাইলের সাইজ ছোট করুন।',
    tool_img_resize: 'ছবির সাইজ পরিবর্তন',
    tool_img_resize_desc: 'নির্দিষ্ট প্রস্থ (Width) ও উচ্চতা (Height) নির্ধারণ করে ছবির আকার পরিবর্তন করুন।',

    tool_txt_to_pdf: 'টেক্সট থেকে পিডিএফ',
    tool_txt_to_pdf_desc: 'সাধারণ টেক্সট ফাইলকে ফরম্যাটেড পিডিএফে পরিণত করুন।',
    tool_html_to_pdf: 'এইচটিএমএল থেকে পিডিএফ',
    tool_html_to_pdf_desc: 'এইচটিএমএল কোড বা ওয়েব ফাইলকে পিডিএফে কনভার্ট করুন।',
    tool_docx_extract: 'DOCX টেক্সট এক্সট্রাক্ট',
    tool_docx_extract_desc: 'মাইক্রোসফট ওয়ার্ড ছাড়া ডকএক্স ফাইলের ভেতরের লেখা বের করুন।',

    tool_csv_to_xlsx: 'সিএসভি থেকে এক্সেল (XLSX)',
    tool_csv_to_xlsx_desc: 'CSV ফাইলকে আধুনিক Excel স্প্রেডশিটে কনভার্ট করুন।',
    tool_xlsx_to_csv: 'এক্সেল (XLSX) থেকে সিএসভি',
    tool_xlsx_to_csv_desc: 'Excel শিটকে ইউনিভার্সাল UTF-8 CSV ফাইলে রূপান্তর করুন।',
    tool_xlsx_to_json: 'এক্সেল থেকে JSON',
    tool_xlsx_to_json_desc: 'Excel টেবিলের ডেটাকে সরাসরি JSON অবজেক্টে রূপান্তর করুন।',
    tool_json_to_xlsx: 'JSON থেকে এক্সেল',
    tool_json_to_xlsx_desc: 'JSON ডেটাকে সাজানো Excel ফাইলে পরিণত করুন।',

    tool_zip_create: 'জিপ (ZIP) ফাইল তৈরি',
    tool_zip_create_desc: 'একাধিক ফাইলকে একসাথে কম্প্রেস করে একটি ZIP আর্カイভ তৈরি করুন।',
    tool_zip_extract: 'জিপ (ZIP) আনপ্যাক করুন',
    tool_zip_extract_desc: 'ব্রাউজারেই নিরাপদে ZIP ফাইলের উপাদানগুলো আনপ্যাক করে নিন।',

    tool_audio_extract: 'ভিডিও থেকে অডিও বের করুন',
    tool_audio_extract_desc: 'MP4, WebM বা MOV ভিডিও থেকে অডিও সাউন্ড বের করে WAV বা MP3 তে নিন।',
    tool_audio_convert: 'অডিও কনভার্টার',
    tool_audio_convert_desc: 'অডিও ফাইলকে WAV, MP3 এবং WebM ফরম্যাটে রূপান্তর করুন।',

    // Settings & Options
    formatLabel: 'টার্গেট ফরম্যাট',
    qualityLabel: 'গুণমান (Quality)',
    qualityNote: 'মান কম রাখলে ফাইলের সাইজ ছোট হবে',
    widthLabel: 'প্রস্থ (px)',
    heightLabel: 'উচ্চতা (px)',
    lockAspect: 'অনুপাত বজায় রাখুন',
    rotationAngle: 'ঘোরানোর কোণ',
    selectPages: 'পাতার নম্বর (যেমন: 1-3, 5)',
    allPages: 'সব পাতা',
    compressionLevel: 'কম্প্রেশন লেভেল',
    compFast: 'দ্রুত (কম)',
    compStandard: 'স্ট্যান্ডার্ড (সুপারিশকৃত)',
    compMax: 'সর্বোচ্চ',
    selectWorksheet: 'ওয়ার্কশিট বাছাই করুন',

    // Statuses & Validation
    statusValidating: 'ফাইলের ধরন এবং আকার যাচাই করা হচ্ছে...',
    statusProcessing: 'ব্রাউজারে নিরাপদে কনভার্ট করা হচ্ছে...',
    statusDone: 'কনভার্শন সফলভাবে সম্পন্ন হয়েছে!',
    errorUnsupportedFormat: 'এই টুলের জন্য ফরম্যাটটি সমর্থিত নয়।',
    errorTooLarge: 'ফাইলের আকার খুব বড়। সর্বোচ্চ ১০০ মেগাবাইট অনুমোদিত।',
    errorFailed: 'কনভার্শন ব্যর্থ হয়েছে। অনুগ্রহ করে অন্য ফাইল দিয়ে চেষ্টা করুন।',
    errorNoFile: 'অনুগ্রহ করে অন্তত একটি ফাইল নির্বাচন করুন।',
    errorOcrNote: 'নোট: স্ক্যান করা ছবির পিডিএফের জন্য ওসিআর প্রয়োজন যা ব্রাউজারে অফলাইনে সম্ভব নয়।',

    // Recently Used
    recentToolsTitle: 'সম্প্রতি ব্যবহৃত টুলস',
    clearRecent: 'হিস্ট্রি মুছুন',
    noRecent: 'এখনও কোনো টুল ব্যবহার করা হয়নি। নিচে থেকে একটি চেষ্টা করুন!',

    // Privacy Section
    privacyTitle: 'কেন এসএফসি শতভাগ নিরাপদ এবং গোপনীয়?',
    privacyPoint1Title: 'সার্ভারে কোনো ফাইল আপলোড হয় না',
    privacyPoint1Desc: 'সকল কনভার্শন সরাসরি আপনার ব্রাউজারের মেমোরিতে সম্পন্ন হয়। আপনার কোনো ব্যক্তিগত ফাইল ইন্টারনেট সার্ভারে যায় না।',
    privacyPoint2Title: 'কোনো ডেটা সংরক্ষণ করা হয় না',
    privacyPoint2Desc: 'আমরা কোনো ফাইল সেভ বা লগ করি না। ট্যাব বন্ধ করার সাথে সাথে ফাইল মেমোরি থেকে মুছে যায়।',
    privacyPoint3Title: 'সম্পূর্ণ ফ্রি ও সীমাহীন',
    privacyPoint3Desc: 'কোনো সাবস্ক্রিপশন ফি নেই, কোনো অ্যাকাউন্ট খোলার ঝামেলা নেই, এবং কনভার্ট করার কোনো দৈনিক সীমা নেই।',

    // Footer
    footerDesc: 'এসএফসি শাদাত ফাতিহ কনভার্টার হলো শাদাত ফাতিহ কর্তৃক তৈরিকৃত একটি নিরাপদ, পেশাদার ফাইল রূপান্তর প্ল্যাটফর্ম।',
    footerQuickLinks: 'প্রয়োজনীয় লিংক',
    footerLegal: 'আইনি ও নীতিমালা',
    allRights: 'সর্বস্বত্ব সংরক্ষিত।',
    developedBy: 'শাদাত ফাতিহ কর্তৃক যত্নসহকারে তৈরি'
  }
};
