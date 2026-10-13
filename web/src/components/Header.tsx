import React, { useState } from 'react';
import { Language, Theme, ToolCategory } from '../types';
import { translations } from '../i18n/translations';
import { Sun, Moon, Globe, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeToggle: () => void;
  selectedCategory: ToolCategory;
  onSelectCategory: (category: ToolCategory) => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'about') => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  selectedCategory,
  onSelectCategory,
  onOpenLegal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const navCategories: { id: ToolCategory; label: string }[] = [
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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-[#0B132B]/85 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* SFC Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => {
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-[#0F172A] p-1 shadow-md shadow-sky-500/10 border border-slate-700/60 group-hover:scale-105 transition-transform flex items-center justify-center">
              <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="10" fill="#0B132B" />
                <path
                  d="M14 14C14 12.8954 14.8954 12 16 12H28L36 20V34C36 35.1046 35.1046 36 34 36H16C14.8954 36 14 35.1046 14 34V14Z"
                  fill="#1E293B"
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                />
                <path d="M28 12V20H36" fill="#38BDF8" fillOpacity="0.3" stroke="#38BDF8" strokeWidth="1.5" />
                <path d="M16 26C16 21 21 18 25 18L25 16L29 19.5L25 23L25 21C22 21 19 23 19 26H16Z" fill="#38BDF8" />
                <path d="M32 24C32 29 27 32 23 32L23 34L19 30.5L23 27L23 29C26 29 29 27 29 24H32Z" fill="#A855F7" />
                <text x="24" y="27" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="8" fill="#FFFFFF" textAnchor="middle">
                  SFC
                </text>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-sky-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  SFC
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-100 text-sm hidden sm:inline">
                  Shadat Fatih Converter
                </span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>100% Client-Side Secure</span>
              </div>
            </div>
          </div>

          {/* Desktop Categories Scrollable Bar */}
          <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1 max-w-2xl">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-400/30 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Controls: Language, Theme, About, Mobile Menu */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Toggle */}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition"
              title="Toggle Language / ভাষা পরিবর্তন"
            >
              <Globe className="w-3.5 h-3.5 text-sky-500" />
              <span>{language === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition"
              title="Toggle Dark/Light Mode"
              aria-label="Theme toggle"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* About Link */}
            <button
              onClick={() => onOpenLegal('about')}
              className="hidden md:inline-flex px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.navAbout}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B132B]/95 px-4 pt-3 pb-6 space-y-2 backdrop-blur-lg animate-fadeIn">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 py-1">
            {t.allToolsTitle}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-xs font-medium rounded-lg transition ${
                  selectedCategory === cat.id
                    ? 'bg-sky-500 text-white font-semibold'
                    : 'text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between text-xs text-slate-500">
            <button onClick={() => { onOpenLegal('about'); setMobileMenuOpen(false); }}>{t.navAbout}</button>
            <button onClick={() => { onOpenLegal('privacy'); setMobileMenuOpen(false); }}>{t.navPrivacy}</button>
            <button onClick={() => { onOpenLegal('terms'); setMobileMenuOpen(false); }}>{t.navTerms}</button>
          </div>
        </div>
      )}
    </header>
  );
};
