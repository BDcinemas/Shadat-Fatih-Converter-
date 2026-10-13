# SFC Shadat Fatih Converter — Ultimate All-in-One File Converter

[![GitHub Pages Deployment](https://img.shields.io/badge/Deploy-GitHub%20Pages-2563eb?logo=github)](https://pages.github.com/)
[![Built with React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![100% Client-Side Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-10b981)](#privacy--security)

**SFC Shadat Fatih Converter** (abbreviated as **SFC**) is a comprehensive, production-quality, all-in-one file transformation platform and Android app created by **Shadat Fatih**. It provides high-speed conversions across PDF, Word & Documents, Images, Excel & Spreadsheets, PowerPoint presentations, Audio, Video, Archives, and Utilities entirely inside the user's web browser without uploading files to external cloud servers.

---

## 🌟 Upgraded Conversion Suites & Engines

### 1. 📄 Comprehensive PDF Suite
- **PDF to Images (PNG, JPG, WebP, BMP):** High-resolution page rendering via `PDF.js` (`pdfjs-dist`). Single pages output directly as images; multi-page documents export as structured ZIP archives.
- **Merge & Split PDF:** Combine multiple PDF documents in custom sequence, or extract selected page ranges (`1-3, 5`) into separate files or a ZIP.
- **Images to PDF:** Convert JPG, PNG, WebP, BMP, and GIF collections into multi-page PDF documents.
- **PDF Watermark:** Apply angled text watermarks with custom opacity and text across all pages.
- **PDF Page Numbers:** Automatically stamp page numbers ("Page X of Y") at bottom-center, bottom-right, or top-right.
- **PDF Metadata Editor:** View and update document Title, Author, and Subject.
- **PDF Text Extractor:** Extract selectable text streams from text-based PDFs.
- **Optical Character Recognition (OCR):** In-browser OCR using `Tesseract.js` WebAssembly engine for scanned PDFs and photo documents.

### 2. 📝 Word & Document Suite
- **TXT to Word (DOCX):** Generates genuine Microsoft Word OpenXML `.docx` files using the `docx` library.
- **Markdown to DOCX / HTML / PDF:** Parses Markdown headings, bullet points, and paragraphs into Word (.docx), clean HTML, or structured A4 PDFs.
- **HTML to DOCX:** Parses DOM tags into native Microsoft Word paragraphs and headings.
- **DOCX to HTML:** Translates Word OpenXML structures into clean, styled web pages.
- **DOCX Text Extraction:** Inspects and extracts formatted paragraphs and tables from Word documents without MS Office.
- **TXT & HTML to PDF:** Typesets text and web source code into structured A4 PDF pages with page margins.

### 3. 🖼️ Image Conversion & Vectorization Suite
- **Multi-Format Image Converter:** Convert between PNG, JPG, WebP, BMP, and ICO.
- **Image to Windows Icon (ICO):** Creates genuine Windows `.ico` binaries with standard headers and color bitmaps.
- **Image to Vector (SVG):** Traces raster pixel contours into scalable vector SVG `<path>` elements.
- **Image Compressor:** Adjustable quality slider (10% to 100%) with real-time file size savings calculation.
- **Image Resizer:** Custom width and height dimensions with aspect ratio lock/unlock and horizontal/vertical flipping.

### 4. 📊 Excel, CSV & Data Suite
- **CSV <-> XLSX:** Transform delimited CSV files into formatted Excel spreadsheets and vice-versa.
- **CSV <-> TSV:** Switch between comma-separated and tab-separated formats.
- **XLSX <-> JSON & JSON <-> CSV:** Transform spreadsheet rows into structured JSON arrays and back.
- **Spreadsheet to PDF:** Renders spreadsheet workbooks into landscape tabular PDF pages.
- **Spreadsheet to HTML:** Converts workbooks into interactive, styled HTML tables.
- **XML <-> JSON:** Parses XML tags into JSON objects and serializes JSON datasets into well-formed XML documents.
- **Unicode & Bengali UTF-8 BOM:** Fully preserves Bengali, special characters, and diacritics.

### 5. 📽️ PowerPoint & Presentation Suite
- **PPTX to PDF:** Converts presentation slides into high-resolution 16:9 PDF documents with slide titles and bullet points.
- **PPTX to Images (ZIP):** Extracts all embedded presentation slide media assets and slide text outline into a ZIP archive.

### 6. 🎵 Audio & Video Suite
- **Audio Converter:** Transcodes audio tracks between WAV, MP3, OGG, and FLAC using the browser Web Audio API.
- **Video to Audio Extraction:** Extracts lossless audio tracks from MP4, WebM, and MOV videos into WAV or MP3.
- **Video to Frames (ZIP):** Captures high-resolution still frames across video timelines into a ZIP archive.
- **Video to Animated Sequence:** Samples video frames at custom FPS and exports an animated frame sequence in ZIP.

### 7. 🗜️ Archive & Utility Suite
- **Create ZIP Archives:** Bundles multiple files and folders into compressed ZIP files with custom compression levels.
- **Extract ZIP Archives:** Safely unpacks files from ZIP archives with protection against path traversal (Zip Slip).
- **Cryptographic Checksum Calculator:** Calculates SHA-256, SHA-1, and SHA-512 hashes using `crypto.subtle.digest`.
- **File Metadata & Magic Bytes Inspector:** Inspects declared MIME types, magic byte signatures, and file headers.

---

## 🌐 Complete Bilingual Support (English & বাংলা)
- Default language: **English** with an instant one-click toggle to **বাংলা** (`English / বাংলা`).
- Every heading, category, button, option, error message, and validation notice is translated.
- Bengali typography is styled with Google Font **Hind Siliguri**.
- Language and theme preferences (Light / Dark mode) persist in local storage.

---

## 🚀 How to Run Locally

```bash
# 1. Navigate to the web folder
cd web

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

---

## 🌐 Deploying to GitHub Pages

1. Push this repository to your GitHub account (e.g. `sfc-converter`).
2. Go to repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your website.
5. Your live website will be available at:
   ```
   https://<your-username>.github.io/<repository-name>/
   ```

---

## 📱 Android App Integration
The project is configured for Android:
- **Offline WebView:** The compiled web bundle is included in `app/src/main/assets/web/index.html`.
- **Native File Chooser:** `WebChromeClient.onShowFileChooser` connects HTML file inputs to Android's native file picker and gallery.
- **Share & Save Integration:** Converted files pass through the Android Share Sheet via `FileProvider`.
- **Adaptive Launcher Icon:** Custom Material You adaptive icon with deep navy and electric cyan/violet branding.

---

## 👨‍💻 Author & Credits
Developed with precision by **Shadat Fatih**.  
All rights reserved © 2026 SFC Shadat Fatih Converter.
