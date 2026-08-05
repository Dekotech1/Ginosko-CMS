import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

export const SolutionsGrid: React.FC = () => {
  const { services, setPublicView } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Solar Energy', 'ESG & Sustainability', 'Grid Modernization', 'Energy Trading'];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-teal-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-indigo-400" />;
      default: return <Zap className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section className="py-16 bg-zinc-950 border-b border-zinc-800/80 font-sans text-zinc-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0c0c0e] border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SOLUTIONS MATRIX & SERVICES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
              Enterprise Advisory & Infrastructure Solutions
            </h2>
            <p className="mt-1 text-xs text-zinc-400 max-w-2xl font-sans">
              Turnkey engineering, regulatory compliance, corporate PPAs, and digital energy asset management.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded text-xs transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                    : 'bg-[#0c0c0e] text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="p-6 rounded-xl bg-[#0c0c0e] border border-zinc-800 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 font-mono">
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                    {service.metricsHighlighted}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-mono mb-1">
                  {service.title}
                </h3>
                <p className="text-xs font-mono text-emerald-400 mb-2">
                  {service.tagline}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features checklist */}
                <div className="space-y-1.5 mb-6 pt-3 border-t border-zinc-800 font-mono text-xs">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => setPublicView('contact')}
                className="w-full py-2 px-3 rounded-lg text-xs font-mono font-bold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Solution RFP</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
