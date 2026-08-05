import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  MapPin, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  ExternalLink 
} from 'lucide-react';

export const ProjectsMapShowcase: React.FC = () => {
  const { projects, setPublicView } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Solar Energy', 'Wind Infrastructure', 'Grid Modernization'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section className="py-16 bg-zinc-950 border-b border-zinc-800/80 font-sans text-zinc-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0c0c0e] border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
              <Globe className="w-3.5 h-3.5" />
              <span>GLOBAL PORTFOLIO & CASE STUDIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
              Utility & Institutional Infrastructure Projects
            </h2>
            <p className="mt-1 text-xs text-zinc-400 max-w-2xl font-sans">
              Delivering grid resilience, institutional project returns, and measurable Scope 1-3 carbon reduction across continents.
            </p>
          </div>

          {/* Filter Pills */}
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

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              className="group rounded-xl bg-[#0c0c0e] border border-zinc-800 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image & Capacity Badge */}
                <div className="relative h-48 overflow-hidden border-b border-zinc-800">
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/40 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>{proj.capacityMW} MW Capacity</span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-zinc-900/90 text-white text-[10px] font-mono border border-zinc-700">
                    {proj.investmentAmount} Investment
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 font-sans">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{proj.region}</span>
                    <span>•</span>
                    <span className="text-zinc-300 font-bold">{proj.client}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 font-mono line-clamp-2">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  {/* Outcomes list */}
                  <div className="space-y-1 pt-3 border-t border-zinc-800/80 font-mono text-xs">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                      Verified Impact Outcomes
                    </span>
                    {proj.keyOutcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-zinc-300 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3 px-5 bg-zinc-900/60 border-t border-zinc-800 flex items-center justify-between font-mono text-xs">
                <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{proj.co2OffsetTonsYear.toLocaleString()} Tons CO2/Yr</span>
                </div>
                <button
                  onClick={() => setPublicView('contact')}
                  className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 font-bold"
                >
                  <span>Inquire</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
