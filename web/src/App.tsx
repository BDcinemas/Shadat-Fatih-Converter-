import React, { useState, useEffect, useMemo } from 'react';
import { Language, Theme, ToolCategory, ConversionTool } from './types';
import { TOOLS_DATA } from './utils/toolsData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ToolGrid } from './components/ToolGrid';
import { ToolWorkspace } from './components/ToolWorkspace';
import { RecentlyUsed } from './components/RecentlyUsed';
import { PrivacyNotice } from './components/PrivacyNotice';
import { LegalModal } from './components/LegalModal';
import { Footer } from './components/Footer';

export function App() {
  // Local storage persisted state
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('sfc_lang') as Language) || 'en';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('sfc_theme') as Theme) || 'dark';
  });

  const [recentToolIds, setRecentToolIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sfc_recent_tools');
      return saved ? JSON.parse(saved) : ['pdf-merge', 'img-convert', 'csv-to-xlsx'];
    } catch {
      return ['pdf-merge', 'img-convert'];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTool, setActiveTool] = useState<ConversionTool | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'about' | null>(null);

  // Sync theme to <html> tag
  useEffect(() => {
    localStorage.setItem('sfc_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync language
  useEffect(() => {
    localStorage.setItem('sfc_lang', language);
    if (language === 'bn') {
      document.documentElement.classList.add('font-bengali');
    } else {
      document.documentElement.classList.remove('font-bengali');
    }
  }, [language]);

  const handleToolUsed = (toolId: string) => {
    setRecentToolIds((prev) => {
      const updated = [toolId, ...prev.filter((id) => id !== toolId)].slice(0, 8);
      localStorage.setItem('sfc_recent_tools', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    setRecentToolIds([]);
    localStorage.removeItem('sfc_recent_tools');
  };

  // Filter tools based on category & search query
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      // Category match
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = tool.nameKey.toLowerCase().includes(query) || tool.id.includes(query);
        const matchesExtensions =
          tool.inputExtensions.some((ext) => ext.toLowerCase().includes(query)) ||
          tool.outputExtensions.some((ext) => ext.toLowerCase().includes(query));
        return matchesName || matchesExtensions;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className={`min-h-screen flex flex-col ${language === 'bn' ? 'font-bengali' : 'font-sans'}`}>
      {/* Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenLegal={setLegalModalType}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <Hero
          language={language}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Recently Used Tools */}
        <RecentlyUsed
          recentToolIds={recentToolIds}
          allTools={TOOLS_DATA}
          language={language}
          onSelectTool={setActiveTool}
          onClearHistory={handleClearHistory}
        />

        {/* Tool Directory Grid */}
        <section id="all-tools-section" className="py-6">
          <ToolGrid
            tools={filteredTools}
            language={language}
            onSelectTool={setActiveTool}
          />
        </section>

        {/* Privacy & Security Feature Section */}
        <PrivacyNotice language={language} />
      </main>

      {/* Footer */}
      <Footer language={language} onOpenLegal={setLegalModalType} />

      {/* Active Tool Conversion Workspace Modal */}
      {activeTool && (
        <ToolWorkspace
          tool={activeTool}
          language={language}
          onClose={() => setActiveTool(null)}
          onToolUsed={handleToolUsed}
        />
      )}

      {/* Legal & About Modal */}
      <LegalModal
        type={legalModalType}
        language={language}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
export default App;
