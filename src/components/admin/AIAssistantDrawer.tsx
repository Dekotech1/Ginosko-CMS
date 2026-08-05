import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Sparkles, 
  X, 
  Loader2, 
  Check, 
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTitle: string;
  currentContent: string;
  onApplyDraft: (text: string) => void;
  onApplySEO: (seoData: { metaTitle: string; metaDescription: string; focusKeywords: string[]; slug: string }) => void;
  onApplySummary: (summary: string) => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  currentTitle,
  currentContent,
  onApplyDraft,
  onApplySEO,
  onApplySummary,
}) => {
  const { generateAIContent, showToast } = useCMS();

  const [activeTab, setActiveTab] = useState<'draft' | 'seo' | 'summarize' | 'translate'>('draft');
  const [topic, setTopic] = useState(currentTitle || '');
  const [targetAudience, setTargetAudience] = useState('Executive C-Suite & Utility Developers');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    setAiResult(null);

    const res = await generateAIContent({
      mode: activeTab,
      prompt: currentContent || topic,
      topic: topic || currentTitle || 'Renewable Infrastructure Integration',
      targetAudience,
      language: targetLanguage,
    });

    setIsLoading(false);
    if (res.success) {
      setAiResult(res.text);
      showToast('AI content generated successfully!', 'success');
    }
  };

  const handleApply = () => {
    if (!aiResult) return;

    if (activeTab === 'draft') {
      onApplyDraft(aiResult);
    } else if (activeTab === 'summarize') {
      onApplySummary(aiResult);
    } else if (activeTab === 'seo') {
      try {
        const parsed = JSON.parse(aiResult);
        onApplySEO(parsed);
      } catch (e) {
        onApplySEO({
          metaTitle: currentTitle.substring(0, 55),
          metaDescription: aiResult.substring(0, 150),
          focusKeywords: ['Renewable Energy', 'ESG', 'Ginosko'],
          slug: currentTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        });
      }
    } else if (activeTab === 'translate') {
      onApplyDraft(aiResult);
    }

    showToast('Applied AI content to article!', 'success');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end font-mono">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-lg bg-[#0c0c0e] text-zinc-100 border-l border-zinc-800 h-full flex flex-col justify-between shadow-2xl"
        >
          {/* Top Bar */}
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white leading-none">Gemini 2.5 AI Copilot</h3>
                <span className="text-[9px] text-emerald-400">Server-Side Proxy</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 overflow-y-auto space-y-5 flex-1 text-xs">
            
            {/* Mode Select Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-lg bg-zinc-900 border border-zinc-800">
              <button
                onClick={() => { setActiveTab('draft'); setAiResult(null); }}
                className={`py-1 rounded text-[11px] font-bold transition-colors ${
                  activeTab === 'draft' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-zinc-500'
                }`}
              >
                Draft
              </button>
              <button
                onClick={() => { setActiveTab('seo'); setAiResult(null); }}
                className={`py-1 rounded text-[11px] font-bold transition-colors ${
                  activeTab === 'seo' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-zinc-500'
                }`}
              >
                SEO
              </button>
              <button
                onClick={() => { setActiveTab('summarize'); setAiResult(null); }}
                className={`py-1 rounded text-[11px] font-bold transition-colors ${
                  activeTab === 'summarize' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-zinc-500'
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => { setActiveTab('translate'); setAiResult(null); }}
                className={`py-1 rounded text-[11px] font-bold transition-colors ${
                  activeTab === 'translate' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-zinc-500'
                }`}
              >
                Translate
              </button>
            </div>

            {/* Inputs based on tab */}
            <div className="space-y-3">
              
              {activeTab === 'draft' && (
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase block mb-1">Topic Prompt</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={e => setTopic(e.target.value)}
                      placeholder="e.g. Floating Offshore Wind Deployment..."
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase block mb-1">Target Persona</label>
                    <select
                      value={targetAudience}
                      onChange={e => setTargetAudience(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none"
                    >
                      <option value="Executive C-Suite & Utility Developers">Executive C-Suite & Utility Developers</option>
                      <option value="ESG Investors & Asset Managers">ESG Investors & Asset Managers</option>
                      <option value="Technical Grid Engineers">Technical Grid Engineers</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <p className="text-[11px] text-zinc-400 font-sans">
                  Analyze article body to auto-generate optimized meta title, meta description, and keywords.
                </p>
              )}

              {activeTab === 'summarize' && (
                <p className="text-[11px] text-zinc-400 font-sans">
                  Generate executive key takeaways and a 2-sentence summary card for fast reading.
                </p>
              )}

              {activeTab === 'translate' && (
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-500 uppercase block">Target Language</label>
                  <select
                    value={targetLanguage}
                    onChange={e => setTargetLanguage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none"
                  >
                    <option value="Spanish">Spanish (Español)</option>
                    <option value="French">French (Français)</option>
                    <option value="German">German (Deutsch)</option>
                    <option value="Portuguese">Portuguese (Português)</option>
                  </select>
                </div>
              )}

              {/* Generate Trigger */}
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full py-2.5 px-3 rounded-lg font-bold text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gemini API Calling...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Output</span>
                  </>
                )}
              </button>

            </div>

            {/* AI Result Box */}
            {aiResult && (
              <div className="space-y-2 pt-3 border-t border-zinc-800">
                <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold">
                  <span>Generated Output</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(aiResult);
                      showToast('Copied to clipboard', 'info');
                    }}
                    className="text-zinc-500 hover:text-white flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-black border border-zinc-800 text-[11px] font-mono text-zinc-300 max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {aiResult}
                </div>

                <button
                  onClick={handleApply}
                  className="w-full py-2 px-3 rounded-lg font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Insert into Article</span>
                </button>
              </div>
            )}

          </div>

          {/* Footer note */}
          <div className="p-3 border-t border-zinc-800 text-[10px] text-zinc-500 text-center">
            Ginosko AI Copilot • Google Gemini 2.5 Flash
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
