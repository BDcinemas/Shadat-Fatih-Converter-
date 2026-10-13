import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  language: Language;
  onOpenLegal: (type: 'privacy' | 'terms' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenLegal }) => {
  const t = translations[language];

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F172A] border border-sky-500/40 flex items-center justify-center font-black text-xs text-sky-400">
                SFC
              </div>
              <span className="font-extrabold text-base text-slate-900 dark:text-white">
                SFC Shadat Fatih Converter
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              {t.footerDesc}
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.privacyHeroNotice}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-sky-500 transition"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('all-tools-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-sky-500 transition"
                >
                  {t.navAllTools}
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('about')} className="hover:text-sky-500 transition">
                  {t.navAbout}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              {t.footerLegal}
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button onClick={() => onOpenLegal('privacy')} className="hover:text-sky-500 transition">
                  {t.navPrivacy}
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('terms')} className="hover:text-sky-500 transition">
                  {t.navTerms}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} SFC Shadat Fatih Converter. {t.allRights}</p>
          <p className="flex items-center gap-1">
            <span>{t.developedBy}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
