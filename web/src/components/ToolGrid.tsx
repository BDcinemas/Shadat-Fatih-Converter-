import React from 'react';
import { ConversionTool, Language } from '../types';
import { translations } from '../i18n/translations';
import {
  Files,
  Scissors,
  FileImage,
  RotateCw,
  Trash2,
  FileText,
  Image,
  Minimize2,
  Maximize2,
  FileCode,
  Code,
  BookOpen,
  Sheet,
  Table,
  Columns,
  FileSpreadsheet,
  Braces,
  Presentation,
  Images,
  AudioWaveform,
  Music,
  Film,
  Sparkles,
  Archive,
  FolderArchive,
  ShieldCheck,
  Info,
  ArrowRight,
  Flame,
  FileEdit,
  ScanText,
  AppWindow
} from 'lucide-react';

interface ToolGridProps {
  tools: ConversionTool[];
  language: Language;
  onSelectTool: (tool: ConversionTool) => void;
}

export const ToolGrid: React.FC<ToolGridProps> = ({ tools, language, onSelectTool }) => {
  const t = translations[language];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Files': return <Files className="w-6 h-6 text-red-500" />;
      case 'Scissors': return <Scissors className="w-6 h-6 text-red-400" />;
      case 'FileImage': return <FileImage className="w-6 h-6 text-orange-500" />;
      case 'Stamp': return <FileText className="w-6 h-6 text-indigo-500" />;
      case 'Hash': return <FileCode className="w-6 h-6 text-sky-500" />;
      case 'RotateCw': return <RotateCw className="w-6 h-6 text-rose-500" />;
      case 'Trash2': return <Trash2 className="w-6 h-6 text-red-600" />;
      case 'FileText': return <FileText className="w-6 h-6 text-amber-500" />;
      case 'FileEdit': return <FileEdit className="w-6 h-6 text-purple-500" />;
      case 'ScanText': return <ScanText className="w-6 h-6 text-emerald-500" />;
      case 'Image': return <Image className="w-6 h-6 text-sky-500" />;
      case 'AppWindow': return <AppWindow className="w-6 h-6 text-blue-500" />;
      case 'Vector': return <Sparkles className="w-6 h-6 text-fuchsia-500" />;
      case 'Minimize2': return <Minimize2 className="w-6 h-6 text-cyan-500" />;
      case 'Maximize2': return <Maximize2 className="w-6 h-6 text-teal-500" />;
      case 'FileWord': return <FileText className="w-6 h-6 text-blue-600" />;
      case 'FileCode': return <FileCode className="w-6 h-6 text-blue-500" />;
      case 'Code': return <Code className="w-6 h-6 text-indigo-500" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-violet-500" />;
      case 'Sheet': return <Sheet className="w-6 h-6 text-emerald-500" />;
      case 'Table': return <Table className="w-6 h-6 text-green-500" />;
      case 'Columns': return <Columns className="w-6 h-6 text-teal-500" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-6 h-6 text-emerald-600" />;
      case 'Braces': return <Braces className="w-6 h-6 text-lime-500" />;
      case 'CodeXml': return <Code className="w-6 h-6 text-orange-500" />;
      case 'Presentation': return <Presentation className="w-6 h-6 text-amber-600" />;
      case 'Images': return <Images className="w-6 h-6 text-rose-500" />;
      case 'AudioWaveform': return <AudioWaveform className="w-6 h-6 text-pink-500" />;
      case 'Music': return <Music className="w-6 h-6 text-pink-500" />;
      case 'Film': return <Film className="w-6 h-6 text-violet-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'Archive': return <Archive className="w-6 h-6 text-purple-500" />;
      case 'FolderArchive': return <FolderArchive className="w-6 h-6 text-fuchsia-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-500" />;
      case 'Info': return <Info className="w-6 h-6 text-sky-500" />;
      default: return <Files className="w-6 h-6 text-sky-500" />;
    }
  };

  if (tools.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-[#1E293B]/60 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg mx-auto">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          No tools matched your search. Try different keywords or clear the filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {tools.map((tool) => {
        const title = t[tool.nameKey] || tool.id;
        const desc = t[tool.descKey] || '';

        return (
          <div
            key={tool.id}
            onClick={() => onSelectTool(tool)}
            className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-700/70 hover:border-sky-500/50 dark:hover:border-sky-500/50 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform">
                  {getIcon(tool.iconName)}
                </div>
                {tool.popular && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {t.popularBadge}
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                {title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {desc}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                {tool.outputExtensions.slice(0, 3).map((ext) => (
                  <span
                    key={ext}
                    className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    {ext.replace('.', '')}
                  </span>
                ))}
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
