import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  FileText, 
  Users, 
  Zap, 
  Sparkles, 
  Clock, 
  Plus,
  Eye,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const AdminDashboardOverview: React.FC = () => {
  const { 
    articles, 
    leads, 
    activityLogs, 
    setAdminView, 
    setActiveArticleId,
    togglePublishStatus
  } = useCMS();

  const publishedCount = articles.filter(a => a.status === 'published').length;
  const draftArticles = articles.filter(a => a.status === 'draft' || a.status === 'in_review');
  const newLeads = leads.filter(l => l.status === 'new');
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);

  const handleEditArticle = (id: string) => {
    setActiveArticleId(id);
    setAdminView('editor');
  };

  return (
    <div className="p-6 lg:p-8 bg-zinc-950 min-h-screen space-y-6 text-zinc-100 font-sans transition-colors">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GINOSKO CMS ENTERPRISE DASHBOARD</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-mono">
            System Overview & Content Hub
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Monitor article production, inbound enterprise RFPs, and reader telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveArticleId(null);
              setAdminView('editor');
            }}
            id="overview-new-article-btn"
            className="px-4 py-2 rounded-lg font-mono font-bold text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Research Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl border border-zinc-800 bg-[#0c0c0e] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider">Published Articles</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">{publishedCount}</div>
          <div className="flex items-center justify-between mt-2 text-[10px] font-mono">
            <span className="text-zinc-500">{articles.length} total in CMS</span>
            <span className="text-emerald-400 font-bold">+3 this week</span>
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex flex-col justify-between ${
          newLeads.length > 0 ? 'bg-[#0c0c0e] border-amber-500/40' : 'bg-[#0c0c0e] border-zinc-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider">Inbound RFPs</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">{leads.length}</div>
          <div className="flex items-center justify-between mt-2 text-[10px] font-mono">
            <span className="text-amber-400 font-bold">{newLeads.length} Unreviewed Submissions</span>
            <span className="text-zinc-500">Pipeline $35M</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-zinc-800 bg-[#0c0c0e] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider">Research Telemetry</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">{totalViews.toLocaleString()}</div>
          <div className="flex items-center justify-between mt-2 text-[10px] font-mono">
            <span className="text-zinc-500">Global readership</span>
            <span className="text-emerald-400 font-bold">+18.4%</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-zinc-800 bg-[#0c0c0e] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider">Active Advisory GW</span>
            <Zap className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">8.4 GW</div>
          <div className="flex items-center justify-between mt-2 text-[10px] font-mono">
            <span className="text-zinc-500">Global clean power</span>
            <span className="text-teal-400 font-bold">Grid Ready</span>
          </div>
        </div>

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Draft Articles & Inbound Leads Table */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Drafts Workflow Box */}
          <div className="p-5 rounded-xl bg-[#0c0c0e] border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Pending Articles & Drafts ({draftArticles.length})</span>
              </div>
              <button
                onClick={() => setAdminView('content')}
                className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Content Manager</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {draftArticles.length === 0 ? (
              <div className="p-4 text-center text-xs font-mono text-zinc-500">
                All articles published and live on public site.
              </div>
            ) : (
              <div className="space-y-2.5">
                {draftArticles.map(art => (
                  <div
                    key={art.id}
                    className="p-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between gap-4"
                  >
                    <div className="overflow-hidden">
                      <span className="text-xs font-bold text-white truncate block font-mono">
                        {art.title}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {art.category} • Updated {art.updatedAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 font-mono">
                      <button
                        onClick={() => togglePublishStatus(art.id)}
                        className="px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                      >
                        Publish
                      </button>
                      <button
                        onClick={() => handleEditArticle(art.id)}
                        className="px-2.5 py-1 rounded text-[11px] font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inbound Enterprise Leads */}
          <div className="p-5 rounded-xl bg-[#0c0c0e] border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Inbound Enterprise RFP Submissions</span>
              </div>
              <button
                onClick={() => setAdminView('leads')}
                className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Lead CRM</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono text-zinc-300">
                <thead className="text-[10px] uppercase bg-zinc-900 text-zinc-500">
                  <tr>
                    <th className="p-2.5">Company</th>
                    <th className="p-2.5">Scope</th>
                    <th className="p-2.5">Budget</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {leads.slice(0, 4).map(lead => (
                    <tr key={lead.id} className="hover:bg-zinc-900/40">
                      <td className="p-2.5 font-bold text-white">{lead.companyName}</td>
                      <td className="p-2.5 truncate max-w-[130px]">{lead.projectType}</td>
                      <td className="p-2.5 text-emerald-400 font-bold">{lead.estimatedBudget}</td>
                      <td className="p-2.5">
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                          lead.status === 'new'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {lead.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: AI Assistant Promotion & Audit Stream */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AI Copilot Card */}
          <div className="p-5 rounded-xl bg-gradient-to-b from-zinc-900 to-[#0c0c0e] border border-zinc-800 space-y-3 font-mono">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>SERVER-SIDE GEMINI AI COPILOT</span>
            </div>
            <h3 className="text-sm font-bold text-white">Automated Article & SEO Generation</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Accelerate executive advisory research with server-side AI. Generate structured drafts, summary abstracts, and keyword meta tags instantly.
            </p>
            <button
              onClick={() => {
                setActiveArticleId(null);
                setAdminView('editor');
              }}
              id="overview-copilot-btn"
              className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch AI Content Assistant</span>
            </button>
          </div>

          {/* Audit Stream */}
          <div className="p-5 rounded-xl bg-[#0c0c0e] border border-zinc-800 space-y-4">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              System Audit Stream
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {activityLogs.map(log => (
                <div key={log.id} className="flex items-start gap-2.5 pb-2.5 border-b border-zinc-800/60 last:border-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-zinc-300">
                      <span className="font-bold text-white">{log.user}</span> {log.action}: <span className="text-emerald-400">{log.target}</span>
                    </p>
                    <span className="text-[10px] text-zinc-500 block">{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
