import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Zap, ArrowUpRight, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSection, setPublicView } = useCMS();

  return (
    <footer className="w-full bg-[#09090b] text-zinc-400 border-t border-zinc-800 pt-12 pb-8 font-mono text-xs transition-colors select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-800">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Zap className="w-3.5 h-3.5 fill-emerald-400" />
              </div>
              <span className="font-bold text-white tracking-tight text-sm">GINOSKO CMS</span>
            </div>
            <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">
              Enterprise-grade CMS & strategic advisory platform for global utility infrastructure, corporate decarbonization, and renewable energy markets.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Leaf className="w-3 h-3" />
                100% Net Zero Certified
              </span>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
              Solutions & Advisory
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setSection('public'); setPublicView('services'); }}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>Grid-Scale Solar & Storage</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 text-emerald-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSection('public'); setPublicView('services'); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Corporate Scope 1-3 ESG Advisory
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSection('public'); setPublicView('services'); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Offshore Wind Interconnections
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSection('public'); setPublicView('calculator'); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Renewable ROI Estimator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & CMS */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
              CMS Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setSection('public'); setPublicView('insights'); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Knowledge Hub & Research
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSection('public'); setPublicView('projects'); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Case Studies & Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSection('admin'); }}
                  className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1"
                  id="footer-admin-login-link"
                >
                  <span>Admin Console</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <span className="text-[10px] text-zinc-600">v2.5.0 • Gemini 2.5 Flash Proxy</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
              Energy Briefing
            </h4>
            <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">
              Subscribe to Ginosko's monthly intelligence report on renewable market tariffs and ISO updates.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Ginosko Energy Briefing!'); }} className="flex flex-col gap-1.5 pt-1">
              <input
                type="email"
                placeholder="executive@company.com"
                required
                className="w-full px-2.5 py-1.5 text-xs rounded bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 font-mono"
              />
              <button
                type="submit"
                className="w-full py-1.5 px-2.5 rounded text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-zinc-600 gap-3">
          <p>© {new Date().getFullYear()} Ginosko Consulting & Renewable Energy LLC.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms</span>
            <span className="hover:text-zinc-400 cursor-pointer">ESG Disclosures</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
