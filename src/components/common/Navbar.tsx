import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ThemeToggle } from './ThemeToggle';
import { 
  Zap, 
  Search, 
  LayoutDashboard, 
  Globe, 
  Calculator, 
  Send,
  Sparkles,
  FileText,
  Sliders,
  Terminal
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    section, 
    setSection, 
    publicView, 
    setPublicView, 
    adminView, 
    setAdminView,
    setIsCmdPaletteOpen,
    articles,
    leads
  } = useCMS();

  const draftCount = articles.filter(a => a.status === 'draft' || a.status === 'in_review').length;
  const newLeadsCount = leads.filter(l => l.status === 'new').length;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#09090b] border-b border-zinc-800 text-zinc-100 font-mono select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-4">
          
          {/* Brand Logo & Path */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSection('public');
                setPublicView('home');
              }}
              className="flex items-center gap-2 group text-left focus:outline-none"
              id="brand-logo-btn"
            >
              <div className="w-7 h-7 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
                <Zap className="w-4 h-4 fill-emerald-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-tight text-sm">
                  GINOSKO
                </span>
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  CMS
                </span>
              </div>
            </button>

            {/* Mode Switcher Pill */}
            <div className="hidden md:flex items-center ml-2 p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
              <button
                onClick={() => setSection('public')}
                id="mode-switch-public"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-all ${
                  section === 'public'
                    ? 'bg-zinc-800 text-white font-bold border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Public Site</span>
              </button>
              <button
                onClick={() => setSection('admin')}
                id="mode-switch-admin"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-all ${
                  section === 'admin'
                    ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin Console</span>
                {(draftCount > 0 || newLeadsCount > 0) && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs">
            {section === 'public' ? (
              <>
                <NavPublicButton
                  label="Overview"
                  active={publicView === 'home'}
                  onClick={() => setPublicView('home')}
                  id="nav-public-home"
                />
                <NavPublicButton
                  label="Solutions"
                  active={publicView === 'services'}
                  onClick={() => setPublicView('services')}
                  id="nav-public-services"
                />
                <NavPublicButton
                  label="Global Map"
                  active={publicView === 'projects'}
                  onClick={() => setPublicView('projects')}
                  id="nav-public-projects"
                />
                <NavPublicButton
                  label="Energy Calculator"
                  active={publicView === 'calculator'}
                  onClick={() => setPublicView('calculator')}
                  icon={<Calculator className="w-3.5 h-3.5 text-emerald-400" />}
                  id="nav-public-calculator"
                />
                <NavPublicButton
                  label="Research Hub"
                  active={publicView === 'insights' || publicView === 'article-detail'}
                  onClick={() => setPublicView('insights')}
                  id="nav-public-insights"
                />
                <NavPublicButton
                  label="Enterprise RFP"
                  active={publicView === 'contact'}
                  onClick={() => setPublicView('contact')}
                  icon={<Send className="w-3.5 h-3.5 text-teal-400" />}
                  id="nav-public-contact"
                />
              </>
            ) : (
              <>
                <NavAdminButton
                  label="Overview"
                  active={adminView === 'overview'}
                  onClick={() => setAdminView('overview')}
                  id="nav-admin-overview"
                />
                <NavAdminButton
                  label="Content"
                  active={adminView === 'content' || adminView === 'editor'}
                  onClick={() => setAdminView('content')}
                  badge={draftCount > 0 ? `${draftCount}` : undefined}
                  id="nav-admin-content"
                />
                <NavAdminButton
                  label="Media Assets"
                  active={adminView === 'media'}
                  onClick={() => setAdminView('media')}
                  id="nav-admin-media"
                />
                <NavAdminButton
                  label="Leads & RFP"
                  active={adminView === 'leads'}
                  onClick={() => setAdminView('leads')}
                  badge={newLeadsCount > 0 ? `${newLeadsCount}` : undefined}
                  id="nav-admin-leads"
                />
                <NavAdminButton
                  label="Telemetry"
                  active={adminView === 'analytics'}
                  onClick={() => setAdminView('analytics')}
                  id="nav-admin-analytics"
                />
                <NavAdminButton
                  label="Settings"
                  active={adminView === 'settings'}
                  onClick={() => setAdminView('settings')}
                  id="nav-admin-settings"
                />
              </>
            )}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            
            {/* Cmd+K Quick Trigger */}
            <button
              onClick={() => setIsCmdPaletteOpen(true)}
              id="cmd-k-trigger"
              className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg border border-zinc-800 bg-zinc-900 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
              <kbd className="px-1 py-0.2 text-[9px] font-mono bg-black border border-zinc-800 rounded text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Mode Switch */}
            <button
              onClick={() => setSection(section === 'public' ? 'admin' : 'public')}
              className="md:hidden flex items-center gap-1 px-2 py-1 rounded text-xs bg-zinc-900 border border-zinc-800 text-zinc-200"
              id="mobile-mode-switch-btn"
            >
              {section === 'public' ? (
                <>
                  <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Admin</span>
                </>
              ) : (
                <>
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Public</span>
                </>
              )}
            </button>

            {/* AI Assistant Quick Trigger */}
            <button
              onClick={() => {
                setSection('admin');
                setAdminView('editor');
              }}
              id="quick-ai-btn"
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Copilot</span>
            </button>

            <ThemeToggle />
          </div>

        </div>
      </div>
    </header>
  );
};

const NavPublicButton: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  id?: string;
}> = ({ label, active, onClick, icon, id }) => (
  <button
    onClick={onClick}
    id={id}
    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-colors ${
      active
        ? 'bg-zinc-800 text-emerald-400 font-bold border border-zinc-700'
        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const NavAdminButton: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
  id?: string;
}> = ({ label, active, onClick, badge, id }) => (
  <button
    onClick={onClick}
    id={id}
    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-colors relative ${
      active
        ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40'
        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
    }`}
  >
    <span>{label}</span>
    {badge && (
      <span className="text-[9px] px-1 py-0.2 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
        {badge}
      </span>
    )}
  </button>
);
