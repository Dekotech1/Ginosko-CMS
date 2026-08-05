import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  Image, 
  Users, 
  BarChart3, 
  Settings, 
  Sparkles, 
  Globe,
  Zap,
  Folder,
  FileCode,
  Shield,
  Server,
  Database,
  Cpu,
  ChevronDown,
  LogOut,
  UserCheck
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const { 
    adminView, 
    setAdminView, 
    setSection, 
    articles, 
    leads, 
    setActiveArticleId
  } = useCMS();

  const { userProfile, userRole, logout } = useAuth();

  const draftCount = articles.filter(a => a.status === 'draft' || a.status === 'in_review').length;
  const newLeadsCount = leads.filter(l => l.status === 'new').length;

  const handleCreateNewArticle = () => {
    setActiveArticleId(null);
    setAdminView('editor');
  };

  return (
    <aside className="w-full lg:w-64 bg-[#09090b] text-zinc-300 border-r border-zinc-800/80 p-3 flex flex-col justify-between shrink-0 transition-colors font-mono select-none">
      
      {/* Top Header & Quick Action */}
      <div className="space-y-4">
        
        {/* Workspace Brand Badge */}
        <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-[#0c0c0e] border border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-white text-xs tracking-tight block leading-none">GINOSKO CMS</span>
              <span className="text-[9px] text-zinc-500 block mt-0.5">v2.5 Enterprise Studio</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Quick Article Trigger Button */}
        <button
          onClick={handleCreateNewArticle}
          id="admin-sidebar-create-btn"
          className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Executive Article</span>
        </button>

        {/* Primary Navigation Tree */}
        <nav className="space-y-0.5 text-xs">
          
          <div className="px-2 py-1.5 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <span>WORKSPACE VIEWS</span>
            <ChevronDown className="w-3 h-3 text-zinc-600" />
          </div>

          <SidebarNavItem
            label="01_overview.ts"
            icon={<LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />}
            active={adminView === 'overview'}
            onClick={() => setAdminView('overview')}
            id="admin-nav-overview"
          />

          <SidebarNavItem
            label="02_content_manager.tsx"
            icon={<FileText className="w-3.5 h-3.5 text-amber-400" />}
            active={adminView === 'content' || adminView === 'editor'}
            onClick={() => setAdminView('content')}
            badge={draftCount > 0 ? `${draftCount} draft` : undefined}
            id="admin-nav-content"
          />

          <SidebarNavItem
            label="03_media_assets.cdn"
            icon={<Image className="w-3.5 h-3.5 text-teal-400" />}
            active={adminView === 'media'}
            onClick={() => setAdminView('media')}
            id="admin-nav-media"
          />

          <SidebarNavItem
            label="04_inbound_rfp.crm"
            icon={<Users className="w-3.5 h-3.5 text-purple-400" />}
            active={adminView === 'leads'}
            onClick={() => setAdminView('leads')}
            badge={newLeadsCount > 0 ? `${newLeadsCount} new` : undefined}
            badgeColor="bg-amber-500/20 text-amber-300 border border-amber-500/40"
            id="admin-nav-leads"
          />

          {(userRole === 'Super Admin' || userRole === 'Admin') && (
            <SidebarNavItem
              label="05_user_access.iam"
              icon={<UserCheck className="w-3.5 h-3.5 text-emerald-400" />}
              active={adminView === 'users'}
              onClick={() => setAdminView('users')}
              badge="Firestore"
              badgeColor="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              id="admin-nav-users"
            />
          )}

          <div className="px-2 py-1.5 pt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <span>SYSTEM & AI PIPELINE</span>
          </div>

          <SidebarNavItem
            label="06_telemetry_metrics.log"
            icon={<BarChart3 className="w-3.5 h-3.5 text-emerald-400" />}
            active={adminView === 'analytics'}
            onClick={() => setAdminView('analytics')}
            id="admin-nav-analytics"
          />

          <SidebarNavItem
            label="07_cms_settings.config"
            icon={<Settings className="w-3.5 h-3.5 text-zinc-400" />}
            active={adminView === 'settings'}
            onClick={() => setAdminView('settings')}
            id="admin-nav-settings"
          />
        </nav>

        {/* Tech Stack Specs Box */}
        <div className="p-2.5 rounded-lg bg-[#0c0c0e] border border-zinc-800/80 space-y-1.5 text-[10px] text-zinc-400">
          <div className="flex items-center justify-between font-bold text-zinc-300">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-emerald-400" />
              <span>Stack Telemetry</span>
            </span>
            <span className="text-emerald-400">AUTHENTICATED</span>
          </div>
          <div className="space-y-0.5 text-zinc-500 text-[9px]">
            <div>• Next.js 15 App Router</div>
            <div>• Firebase Auth & Firestore</div>
            <div>• Role: {userRole || 'Admin'}</div>
            <div>• Cloud Storage Engine</div>
          </div>
        </div>

      </div>

      {/* Footer User Badge & Exit / Log Out */}
      <div className="pt-3 border-t border-zinc-800/80 space-y-2">
        
        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#0c0c0e] border border-zinc-800">
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src={userProfile?.photoURL || userProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
              alt={userProfile?.fullName || 'User'}
              className="w-7 h-7 rounded-full object-cover shrink-0 border border-zinc-700"
            />
            <div className="overflow-hidden leading-tight">
              <span className="text-xs font-bold text-white truncate block">
                {userProfile?.fullName || userProfile?.name || 'Executive Staff'}
              </span>
              <span className="text-[9px] text-emerald-400 block truncate">
                {userRole || 'Admin'}
              </span>
            </div>
          </div>

          <button
            onClick={() => logout()}
            title="Log Out of Session"
            id="admin-sidebar-logout-btn"
            className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={() => setSection('public')}
          id="admin-sidebar-exit-public-btn"
          className="w-full py-1.5 px-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 transition-colors flex items-center justify-between"
        >
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Public Website</span>
          </span>
          <span className="text-[9px] text-zinc-500">Preview ↗</span>
        </button>

      </div>

    </aside>
  );
};

const SidebarNavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  badge?: string;
  badgeColor?: string;
  id?: string;
}> = ({ label, icon, active, onClick, badge, badgeColor, id }) => (
  <button
    onClick={onClick}
    id={id}
    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-mono transition-all ${
      active
        ? 'bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20'
        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
    }`}
  >
    <div className="flex items-center gap-2 truncate">
      {icon}
      <span className="truncate">{label}</span>
    </div>
    {badge && (
      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${badgeColor || 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'}`}>
        {badge}
      </span>
    )}
  </button>
);
