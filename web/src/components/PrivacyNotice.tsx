import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { ShieldCheck, HardDrive, Cpu, CheckCircle } from 'lucide-react';

interface PrivacyNoticeProps {
  language: Language;
}

export const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({ language }) => {
  const t = translations[language];

  return (
    <section className="my-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-[#0F172A] text-white border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient glow circles */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Security & Privacy Commitment</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {t.privacyTitle}
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-100">{t.privacyPoint1Title}</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              {t.privacyPoint1Desc}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-100">{t.privacyPoint2Title}</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              {t.privacyPoint2Desc}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-100">{t.privacyPoint3Title}</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              {t.privacyPoint3Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
