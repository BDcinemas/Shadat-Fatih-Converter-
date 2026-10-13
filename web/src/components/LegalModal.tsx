import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { X, Shield, FileText, Info } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'about' | null;
  language: Language;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, language, onClose }) => {
  if (!type) return null;
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1E293B] rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl p-6 sm:p-8 my-auto max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'about' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-4">
              <Info className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              About SFC Shadat Fatih Converter
            </h2>
            <div className="text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
              <p>
                <strong>SFC Shadat Fatih Converter</strong> (abbreviated as SFC) is a modern, high-performance, and privacy-respecting file transformation platform designed and developed by <strong>Shadat Fatih</strong>.
              </p>
              <p>
                Unlike conventional online file converters that transmit your confidential files over the internet to remote cloud servers, SFC performs data conversions <strong>locally inside your web browser</strong> utilizing modern HTML5 APIs, WebAssembly, SheetJS, JSZip, and pdf-lib.
              </p>
              <p>
                Key Principles of SFC:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>Privacy First:</strong> Your documents, photos, audio tracks, and spreadsheets never leave your device.</li>
                <li><strong>Zero Cost:</strong> No subscription paywalls, watermarks, or limitations.</li>
                <li><strong>Universal Accessibility:</strong> Bilingual support in English and Bengali, optimized for mobile phones, tablets, and desktop workstations.</li>
                <li><strong>No False Claims:</strong> Real outputs, actual compression ratios, and genuine processing.</li>
              </ul>
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {t.navPrivacy}
            </h2>
            <div className="text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
              <p>
                At <strong>SFC Shadat Fatih Converter</strong>, safeguarding your privacy is not merely an afterthought—it is the foundation of our architecture.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                1. Local On-Device Processing
              </h4>
              <p className="text-xs">
                When you drag and drop or select files in SFC, they are read exclusively into your web browser's local sandbox memory. No file data is uploaded to any remote server or third-party storage cloud.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                2. No Data Collection or Retention
              </h4>
              <p className="text-xs">
                We do not track, catalog, store, or sell file names, file contents, metadata, or user personal records. As soon as you refresh or close your browser tab, all temporary memory objects are freed.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                3. Local Storage Preferences
              </h4>
              <p className="text-xs">
                We only store your theme preference (Light/Dark), chosen language (English/Bengali), and a list of recently clicked tool IDs on your browser's local storage for your convenience.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {t.navTerms}
            </h2>
            <div className="text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
              <p>
                By accessing and using SFC Shadat Fatih Converter, you agree to these fair usage terms.
              </p>
              <p className="text-xs">
                1. <strong>Free & As-Is Usage:</strong> SFC is provided free of charge for personal, educational, and professional use on an &ldquo;as-is&rdquo; basis without warranties of any kind.
              </p>
              <p className="text-xs">
                2. <strong>Intellectual Property:</strong> You retain complete ownership and rights to all files you convert using SFC. SFC claims zero ownership or rights over your content.
              </p>
              <p className="text-xs">
                3. <strong>File Integrity:</strong> While SFC employs maintained, industry-standard conversion engines (pdf-lib, SheetJS, JSZip, Web Audio), users should keep backups of their original source files.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-bold text-slate-700 dark:text-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
