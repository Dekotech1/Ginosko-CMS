import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Award 
} from 'lucide-react';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  const { setPublicView, setSection, setAdminView } = useCMS();

  return (
    <div className="relative overflow-hidden bg-zinc-950 text-zinc-100 border-b border-zinc-800/80 font-sans">
      
      {/* Background Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        
        {/* Top Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0c0c0e] border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold tracking-widest uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>GINOSKO CMS v2.5 ENTERPRISE STUDIO</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </motion.div>

        {/* Main Hero Headline */}
        <div className="max-w-4xl space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-mono"
          >
            Powering Utility <br />
            <span className="text-emerald-400">
              Infrastructure & ESG
            </span>
            {" "} Intelligence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-300 max-w-2xl font-sans leading-relaxed"
          >
            Ginosko Consulting bridges grid-scale solar, floating wind engineering, and AI-driven content governance for multinational utilities, energy funds, and C-suite sustainability leaders.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs"
        >
          <button
            onClick={() => setPublicView('calculator')}
            id="hero-calculator-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all"
          >
            <span>Run Solar BESS Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setPublicView('services')}
            id="hero-services-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-colors"
          >
            <span>Solutions Matrix</span>
          </button>

          <button
            onClick={() => {
              setSection('admin');
              setAdminView('overview');
            }}
            id="hero-admin-portal-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold bg-[#0c0c0e] hover:bg-zinc-900 text-emerald-400 border border-zinc-800 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin Console</span>
          </button>
        </motion.div>

        {/* Key Metrics Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 p-3 rounded-xl bg-[#0c0c0e] border border-zinc-800 font-mono"
        >
          <MetricBadge
            value="8.4 GW"
            label="Grid Capacity Advisory"
            trend="+24% YoY"
            icon={<Zap className="w-3.5 h-3.5 text-emerald-400" />}
          />
          <MetricBadge
            value="1.8M Tons"
            label="Annual CO2 Abatement"
            trend="100% Verified"
            icon={<ShieldCheck className="w-3.5 h-3.5 text-teal-400" />}
          />
          <MetricBadge
            value="$2.4B"
            label="Corporate PPAs Structured"
            trend="Tier 1 Capital"
            icon={<TrendingUp className="w-3.5 h-3.5 text-cyan-400" />}
          />
          <MetricBadge
            value="99.99%"
            label="CMS Telemetry SLA"
            trend="Zero Downtime"
            icon={<Award className="w-3.5 h-3.5 text-indigo-400" />}
          />
        </motion.div>

      </div>
    </div>
  );
};

const MetricBadge: React.FC<{
  value: string;
  label: string;
  trend: string;
  icon: React.ReactNode;
}> = ({ value, label, trend, icon }) => (
  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-1">
    <div className="flex items-center justify-between">
      <div className="p-1 rounded bg-zinc-800 shrink-0">{icon}</div>
      <span className="text-[9px] font-bold text-emerald-400 px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20 uppercase">
        {trend}
      </span>
    </div>
    <div className="text-xl font-bold text-white tracking-tight pt-1">{value}</div>
    <div className="text-[10px] text-zinc-400 font-sans">{label}</div>
  </div>
);
