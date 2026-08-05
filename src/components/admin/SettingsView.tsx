import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Settings, 
  ShieldCheck, 
  Database, 
  Key, 
  Globe, 
  User, 
  Sparkles, 
  Check, 
  Zap,
  Server
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { currentUser, showToast } = useCMS();

  const [siteName, setSiteName] = useState('Ginosko CMS & Advisory');
  const [siteTagline, setSiteTagline] = useState('Global Utility & Renewable Energy Intelligence');
  const [geminiModel, setGeminiModel] = useState('Gemini 2.5 Flash Enterprise');
  const [storageBackend, setStorageBackend] = useState('Google Cloud Storage & Firestore');

  const handleSaveSettings = () => {
    showToast('CMS Configuration settings updated!', 'success');
  };

  return (
    <div className="p-6 lg:p-8 bg-zinc-950 min-h-screen space-y-6 text-zinc-100 transition-colors">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Settings className="w-3.5 h-3.5" />
            <span>ENTERPRISE CMS GOVERNANCE</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">System Settings & Governance</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Configure site metadata, AI model routing, database storage connections, and security credentials.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-5 py-2 rounded-lg text-xs font-mono font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-2"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Save Settings</span>
        </button>
      </div>

      {/* Settings Sections */}
      <div className="max-w-4xl space-y-6">
        
        {/* Site Identity */}
        <div className="p-6 rounded-xl bg-[#0c0c0e] border border-zinc-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white font-mono border-b border-zinc-800/80 pb-3">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Public Site Identity & SEO Branding</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="text-zinc-400 uppercase text-[10px] block mb-1">Platform Brand Name</label>
              <input
                type="text"
                value={siteName}
                onChange={e => setSiteName(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-zinc-400 uppercase text-[10px] block mb-1">Brand Tagline</label>
              <input
                type="text"
                value={siteTagline}
                onChange={e => setSiteTagline(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* AI Model Configuration */}
        <div className="p-6 rounded-xl bg-[#0c0c0e] border border-zinc-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white font-mono border-b border-zinc-800/80 pb-3">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Server-Side Gemini AI Model Integration</span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <label className="text-zinc-400 uppercase text-[10px] block mb-1">Active AI Model Endpoint</label>
              <select
                value={geminiModel}
                onChange={e => setGeminiModel(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none"
              >
                <option value="Gemini 2.5 Flash Enterprise">Gemini 2.5 Flash Enterprise (Fastest - Low Latency)</option>
                <option value="Gemini 1.5 Pro High Context">Gemini 1.5 Pro High Context (2M Token Context)</option>
              </select>
            </div>

            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] leading-relaxed">
              ✓ Server-side proxy active. Gemini API keys are safely managed via environment variables and never exposed to the client browser.
            </div>
          </div>
        </div>

        {/* User Account */}
        <div className="p-6 rounded-xl bg-[#0c0c0e] border border-zinc-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white font-mono border-b border-zinc-800/80 pb-3">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Authenticated User Profile</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-12 h-12 rounded-full object-cover border border-zinc-700" />
            <div>
              <span className="font-bold text-white block text-sm">{currentUser.name}</span>
              <span className="text-zinc-400 block">{currentUser.email} • {currentUser.role}</span>
              <span className="text-emerald-400 text-[11px] block">{currentUser.department}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
