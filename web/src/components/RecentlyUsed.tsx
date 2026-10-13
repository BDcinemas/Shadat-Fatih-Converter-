import React from 'react';
import { ConversionTool, Language } from '../types';
import { translations } from '../i18n/translations';
import { History, ArrowRight } from 'lucide-react';

interface RecentlyUsedProps {
  recentToolIds: string[];
  allTools: ConversionTool[];
  language: Language;
  onSelectTool: (tool: ConversionTool) => void;
  onClearHistory: () => void;
}

export const RecentlyUsed: React.FC<RecentlyUsedProps> = ({
  recentToolIds,
  allTools,
  language,
  onSelectTool,
  onClearHistory
}) => {
  const t = translations[language];

  const recentTools = recentToolIds
    .map((id) => allTools.find((tool) => tool.id === id))
    .filter((t): t is ConversionTool => Boolean(t));

  if (recentTools.length === 0) return null;

  return (
    <div className="mb-10 p-5 rounded-2xl bg-white/70 dark:bg-[#1E293B]/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-sky-500" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {t.recentToolsTitle}
          </h3>
        </div>
        <button
          onClick={onClearHistory}
          className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
        >
          {t.clearRecent}
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
        {recentTools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 hover:border-sky-500/50 hover:bg-white dark:hover:bg-slate-700/80 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200 shrink-0"
          >
            <span>{t[tool.nameKey] || tool.id}</span>
            <ArrowRight className="w-3 h-3 text-sky-500" />
          </button>
        ))}
      </div>
    </div>
  );
};
