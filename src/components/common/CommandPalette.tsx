import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Search, 
  FileText, 
  Plus, 
  Sparkles, 
  Globe, 
  LayoutDashboard, 
  Calculator, 
  FolderKanban, 
  Image, 
  Users, 
  Settings, 
  X,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CommandPalette: React.FC = () => {
  const { 
    isCmdPaletteOpen, 
    setIsCmdPaletteOpen, 
    setSection, 
    setPublicView, 
    setAdminView, 
    articles, 
    projects,
    leads,
    toggleTheme,
    setActiveArticleId
  } = useCMS();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isCmdPaletteOpen) {
      setQuery('');
    }
  }, [isCmdPaletteOpen]);

  if (!isCmdPaletteOpen) return null;

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) || 
    a.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.region.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredLeads = leads.filter(l => 
    l.companyName.toLowerCase().includes(query.toLowerCase()) || 
    l.projectType.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const handleSelectArticle = (id: string) => {
    setActiveArticleId(id);
    setSection('admin');
    setAdminView('editor');
    setIsCmdPaletteOpen(false);
  };

  const executeAction = (action: () => void) => {
    action();
    setIsCmdPaletteOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-950/40"
        >
          {/* Header Input */}
          <div className="relative flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search articles, projects, leads, or type a command..."
              className="w-full py-4 px-3 text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded">
              ESC
            </kbd>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
            
            {/* Quick Actions */}
            {!query && (
              <div>
                <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Quick Actions & Navigation
                </p>
                <div className="space-y-0.5 mt-1">
                  <CommandItem
                    icon={<Plus className="w-4 h-4 text-emerald-500" />}
                    title="Create New Article"
                    subtitle="Open CMS editor with AI Assistant"
                    onClick={() => executeAction(() => {
                      setSection('admin');
                      setAdminView('editor');
                      setActiveArticleId(null);
                    })}
                  />
                  <CommandItem
                    icon={<Sparkles className="w-4 h-4 text-teal-500" />}
                    title="Open Gemini AI Content Copilot"
                    subtitle="Draft content, auto-SEO, or summary"
                    onClick={() => executeAction(() => {
                      setSection('admin');
                      setAdminView('editor');
                    })}
                  />
                  <CommandItem
                    icon={<Calculator className="w-4 h-4 text-cyan-500" />}
                    title="Renewable Energy ROI Estimator"
                    subtitle="Interactive public calculator"
                    onClick={() => executeAction(() => {
                      setSection('public');
                      setPublicView('calculator');
                    })}
                  />
                  <CommandItem
                    icon={<Globe className="w-4 h-4 text-blue-500" />}
                    title="Switch to Public Website"
                    subtitle="View live public portal"
                    onClick={() => executeAction(() => setSection('public'))}
                  />
                  <CommandItem
                    icon={<LayoutDashboard className="w-4 h-4 text-indigo-500" />}
                    title="Switch to Admin Dashboard"
                    subtitle="View CMS metrics & lead CRM"
                    onClick={() => executeAction(() => setSection('admin'))}
                  />
                </div>
              </div>
            )}

            {/* Articles Matches */}
            {filteredArticles.length > 0 && (
              <div>
                <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  CMS Articles ({filteredArticles.length})
                </p>
                <div className="space-y-0.5 mt-1">
                  {filteredArticles.map(art => (
                    <CommandItem
                      key={art.id}
                      icon={<FileText className="w-4 h-4 text-slate-400" />}
                      title={art.title}
                      subtitle={`${art.category} • ${art.status.toUpperCase()}`}
                      onClick={() => handleSelectArticle(art.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Projects Matches */}
            {filteredProjects.length > 0 && (
              <div>
                <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Renewable Projects ({filteredProjects.length})
                </p>
                <div className="space-y-0.5 mt-1">
                  {filteredProjects.map(proj => (
                    <CommandItem
                      key={proj.id}
                      icon={<FolderKanban className="w-4 h-4 text-emerald-500" />}
                      title={proj.title}
                      subtitle={`${proj.capacityMW}MW • ${proj.region}`}
                      onClick={() => executeAction(() => {
                        setSection('public');
                        setPublicView('projects');
                      })}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Leads Matches */}
            {filteredLeads.length > 0 && (
              <div>
                <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Enterprise Leads ({filteredLeads.length})
                </p>
                <div className="space-y-0.5 mt-1">
                  {filteredLeads.map(lead => (
                    <CommandItem
                      key={lead.id}
                      icon={<Users className="w-4 h-4 text-amber-500" />}
                      title={lead.companyName}
                      subtitle={`${lead.projectType} • Budget: ${lead.estimatedBudget}`}
                      onClick={() => executeAction(() => {
                        setSection('admin');
                        setAdminView('leads');
                      })}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer controls */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Navigation: Click or press Enter to jump</span>
            <button
              onClick={() => setIsCmdPaletteOpen(false)}
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Close Window
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const CommandItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}> = ({ icon, title, subtitle, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
  >
    <div className="flex items-center gap-3 overflow-hidden pr-2">
      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
        {icon}
      </div>
      <div className="truncate">
        <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
          {title}
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
          {subtitle}
        </p>
      </div>
    </div>
    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
  </button>
);
