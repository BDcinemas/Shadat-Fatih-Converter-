import React from 'react';
import { Language, ToolCategory } from '../types';
import { translations } from '../i18n/translations';
import { Search, Shield, Zap, Sparkles, Lock } from 'lucide-react';

interface HeroProps {
  language: Language;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ToolCategory;
  onSelectCategory: (cat: ToolCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory
}) => {
  const t = translations[language];

  const categories: { id: ToolCategory; label: string }[] = [
    { id: 'all', label: t.catAll },
    { id: 'pdf', label: t.catPdf },
    { id: 'image', label: t.catImage },
    { id: 'document', label: t.catDoc },
    { id: 'spreadsheet', label: t.catSpreadsheet },
    { id: 'presentation', label: t.catPresentation },
    { id: 'audio', label: t.catAudio },
    { id: 'video', label: t.catVideo },
    { id: 'archive', label: t.catArchive },
    { id: 'utility', label: t.catUtility }
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 bg-gradient-to-b from-white via-slate-50/50 to-transparent dark:from-[#0B132B] dark:via-[#0F172A]/70 dark:to-transparent">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Security & Privacy Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-400/30 text-xs font-semibold mb-6 shadow-sm">
          <Lock className="w-3.5 h-3.5 text-sky-500" />
          <span>{t.privacyHeroNotice}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          <span className="bg-gradient-to-r from-slate-900 via-sky-800 to-indigo-900 dark:from-white dark:via-sky-200 dark:to-indigo-300 bg-clip-text text-transparent">
            {t.tagline}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {t.subTagline}
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-35 transition duration-300" />
          <div className="relative flex items-center bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-lg px-4 py-3">
            <Search className="w-5 h-5 text-slate-400 dark:text-slate-400 mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-105'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Quick Highlights Row */}
        <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-6 max-w-xl mx-auto text-center border-t border-slate-200/60 dark:border-slate-800/80 pt-6">
          <div className="flex flex-col items-center">
            <Shield className="w-5 h-5 text-sky-500 mb-1" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">100% Private</span>
            <span className="text-[10px] text-slate-500">Zero Server Uploads</span>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="w-5 h-5 text-amber-500 mb-1" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">WASM Speed</span>
            <span className="text-[10px] text-slate-500">In-Browser Memory</span>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-5 h-5 text-purple-500 mb-1" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">30+ Converters</span>
            <span className="text-[10px] text-slate-500">No Paywalls or Limits</span>
          </div>
        </div>
      </div>
    </section>
  );
};
