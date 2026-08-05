import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Eye, 
  Users, 
  Zap, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  Download
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { articles, projects, leads } = useCMS();

  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
  const totalCapacity = projects.reduce((sum, p) => sum + p.capacityMW, 0);

  return (
    <div className="p-6 lg:p-8 bg-zinc-950 min-h-screen space-y-6 text-zinc-100 transition-colors">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>REAL-TIME TELEMETRY & ESG ANALYTICS</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Impact & Reader Engagement Analytics</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Monitor article reader demographics, RFP conversion rates, and total global MW advisory footprint.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Analytics CSV Report...')}
          className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-colors flex items-center gap-2 shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span>Export Executive PDF</span>
        </button>
      </div>

      {/* Top BESS & Audience Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl border border-zinc-800 bg-[#0c0c0e] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase mb-1">
              <span>Total Article Views</span>
              <Eye className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">{totalViews.toLocaleString()}</div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-emerald-400">
            <ArrowUpRight className="w-3 h-3" />
            <span>+24.8% vs previous month</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-zinc-800 bg-[#0c0c0e] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase mb-1">
              <span>Advisory Capacity</span>
              <Zap className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">{totalCapacity.toLocaleString()} MW</div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-emerald-400">
            <ArrowUpRight className="w-3 h-3" />
            <span>Active Grid Deployments</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-zinc-800 bg-[#0c0c0e] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase mb-1">
              <span>Inbound RFP Pipeline</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">${leads.length * 8.2}M</div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-amber-400">
            <span>{leads.length} Active RFP Inquiries</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-zinc-800 bg-[#0c0c0e] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase mb-1">
              <span>Avg Read Time</span>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight">4m 42s</div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-emerald-400">
            <span>High C-Suite Engagement</span>
          </div>
        </div>

      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Most Read Research Articles */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-[#0c0c0e] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono">Top Performing Executive Research</h3>
            <span className="text-[10px] font-mono text-zinc-500">Sorted by Readership</span>
          </div>

          <div className="space-y-3">
            {articles.slice(0, 5).map((art, idx) => (
              <div key={art.id} className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="w-6 h-6 rounded bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                    0{idx + 1}
                  </span>
                  <div className="overflow-hidden">
                    <span className="font-bold text-white truncate block">{art.title}</span>
                    <span className="text-[10px] text-zinc-500">{art.category} • {art.publishedAt}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold text-emerald-400 block">{art.views.toLocaleString()} views</span>
                  <span className="text-[10px] text-zinc-500">{art.readTimeMinutes} min read</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Distribution & Category Share */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-[#0c0c0e] border border-zinc-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-mono">Reader Geographic Distribution</h3>
          
          <div className="space-y-3 text-xs font-mono">
            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>North America (ERCOT / PJM / CAISO)</span>
                <span className="text-emerald-400 font-bold">48%</span>
              </div>
              <div className="w-full h-2 rounded bg-zinc-900 overflow-hidden">
                <div className="h-full bg-emerald-500 w-[48%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Europe (ENTSO-E Grid)</span>
                <span className="text-teal-400 font-bold">32%</span>
              </div>
              <div className="w-full h-2 rounded bg-zinc-900 overflow-hidden">
                <div className="h-full bg-teal-500 w-[32%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Asia-Pacific & Middle East</span>
                <span className="text-cyan-400 font-bold">20%</span>
              </div>
              <div className="w-full h-2 rounded bg-zinc-900 overflow-hidden">
                <div className="h-full bg-cyan-500 w-[20%]" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 text-xs font-mono text-zinc-400 leading-relaxed mt-6">
            <span className="text-emerald-400 font-bold block mb-1">⚡ Telemetry Insights</span>
            ESG investors and utility project developers account for 74% of total article downloads in Q3 2026.
          </div>
        </div>

      </div>

    </div>
  );
};
