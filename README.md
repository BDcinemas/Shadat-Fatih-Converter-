# SFC Shadat Fatih Converter (SFC)

[![GitHub Pages Deployment](https://img.shields.io/badge/Deploy-GitHub%20Pages-2563eb?logo=github)](https://pages.github.com/)
[![Built with React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![100% Client-Side Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-10b981)](#privacy--security)

**SFC Shadat Fatih Converter** (abbreviated as **SFC**) is a complete, production-ready, professional file conversion platform and Android app designed by **Shadat Fatih**. It provides high-speed conversions across PDF, Images, Word & Documents, Excel & CSV spreadsheets, Audio, and Compressed Archives without uploading any files to external cloud servers.

---

## 🌟 Key Features

### 1. 🛡️ 100% Client-Side Processing & Privacy
- **Zero Server Uploads:** Conversions are executed directly inside the user's browser memory via WebAssembly, HTML5 Canvas, Web Audio API, `pdf-lib`, `SheetJS`, and `JSZip`.
- **Zero Data Leakage:** Files are never transferred across networks, stored in third-party clouds, or logged.

### 2. 🌐 Complete Bilingual Support (English & বাংলা)
- Default language: **English** with instant one-click toggle to **বাংলা**.
- Complete translation across navigation, headings, descriptions, validation alerts, conversion settings, and success dialogs.
- Native typography styling with Google Font `Hind Siliguri` for crisp Bengali rendering.

### 3. 📄 PDF Tools Suite
- **Merge PDF:** Combine multiple PDF documents into a single unified file.
- **Split PDF:** Extract custom page ranges (e.g. `1-3, 5`) or split into individual pages in a ZIP.
- **Rotate PDF:** Rotate pages by 90°, 180°, or 270°.
- **Delete Pages:** Remove unwanted pages and output a clean PDF.
- **Images to PDF:** Convert JPG, PNG, and WebP collections into high-resolution multi-page PDFs.
- **Extract Text:** Extract selectable text streams from text-based PDFs.

### 4. 🖼️ Image Converter & Optimizer
- Convert between **PNG**, **JPG**, and **WebP**.
- Quality slider (10% to 100%) for adjustable compression.
- Resize dimensions with aspect-ratio lock/unlock.
- Rotate (90°, 180°, 270°) with transparent canvas preservation for WebP/PNG and clean background for JPEG.
- Real-time size comparison with percentage savings.

### 5. 📊 Excel & CSV Spreadsheet Tools
- **CSV to XLSX:** Convert delimiter-separated files into formatted Excel spreadsheets.
- **XLSX to CSV:** Export worksheets to universal UTF-8 CSV with Bengali & Unicode characters preserved.
- **XLSX to JSON:** Convert spreadsheet tables into structured JSON arrays.
- **JSON to XLSX:** Transform raw JSON arrays into downloadable Excel sheets.
- Interactive table preview displaying the first 10 rows and sheet selection.

### 6. 📝 Document & Word Tools
- **TXT to PDF:** Convert plain text files into formatted A4 PDFs with word wrapping.
- **HTML to PDF:** Parse clean HTML documents into printable PDF pages.
- **DOCX Text Extractor:** Inspect Word archives (`word/document.xml`) and extract paragraphs without MS Word.

### 7. 🎵 Audio & Video Tools
- **Audio Extraction:** Extract lossless WAV PCM audio from MP4, WebM, or MOV video files using the browser's Web Audio API.
- **Audio Converter:** Transcode between audio formats directly in memory.

### 8. 🗜️ Archive & Compression Tools
- **Create ZIP:** Bundle multiple files with configurable compression levels.
- **Extract ZIP:** Safely extract ZIP contents with protection against path traversal (Zip Slip).

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Commands
```bash
# Navigate to the web folder
cd web

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Deploying to GitHub Pages

1. **Create a GitHub Repository** named `sfc-converter` (or any repository name).
2. **Push the project source code** to your repository's `main` branch.
3. In your GitHub repository settings:
   - Navigate to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The included workflow `.github/workflows/deploy.yml` will automatically build and publish your website!
5. Your live website will be accessible at:
   `https://<your-username>.github.io/<repository-name>/`

---

## 📱 Android App Integration

The repository also includes an Android project configured with:
- **Jetpack Compose** edge-to-edge Material 3 UI shell.
- Full offline WebView loading the pre-built SFC web bundle directly from `app/src/main/assets/web/index.html`.
- Native Android file chooser support (`WebChromeClient.onShowFileChooser`), camera/gallery upload, and download management.
- Custom adaptive launcher icons with deep navy & electric cyan/violet branding.

To build the Android app:
```bash
gradle assembleDebug
```

---

## 👨‍💻 Author
Developed with precision by **Shadat Fatih**.
All rights reserved © 2026 SFC Shadat Fatih Converter.
