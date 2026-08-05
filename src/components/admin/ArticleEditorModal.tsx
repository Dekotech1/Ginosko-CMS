import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Eye, 
  FileText
} from 'lucide-react';
import { Article, ContentCategory, ContentStatus } from '../../types';
import { AIAssistantDrawer } from './AIAssistantDrawer';

export const ArticleEditorModal: React.FC = () => {
  const { 
    activeArticleId, 
    articles, 
    addArticle, 
    updateArticle, 
    setAdminView,
    currentUser,
    showToast
  } = useCMS();

  const existingArticle = articles.find(a => a.id === activeArticleId);

  const [form, setForm] = useState<Partial<Article>>({
    title: '',
    subtitle: '',
    slug: '',
    category: 'Solar Energy',
    status: 'draft',
    tags: ['Solar', 'BESS', 'Grid'],
    summary: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 5,
    author: {
      name: currentUser.name,
      role: currentUser.department,
      avatar: currentUser.avatar,
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      focusKeywords: ['Solar', 'Grid Modernization'],
    },
  });

  const [activeTab, setActiveTab] = useState<'write' | 'preview' | 'seo'>('write');
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);

  useEffect(() => {
    if (existingArticle) {
      setForm(existingArticle);
    }
  }, [existingArticle?.id]);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setForm(prev => ({
      ...prev,
      title: val,
      slug: prev.slug ? prev.slug : slug,
      seo: {
        ...prev.seo!,
        metaTitle: val.length <= 60 ? `${val} | Ginosko` : prev.seo?.metaTitle || '',
      },
    }));
  };

  const handleSave = () => {
    if (!form.title || !form.content) {
      showToast('Please provide a title and article content', 'error');
      return;
    }

    if (existingArticle) {
      updateArticle(existingArticle.id, form);
    } else {
      addArticle({
        title: form.title || 'Untitled Report',
        slug: form.slug || 'untitled-report',
        subtitle: form.subtitle || '',
        category: form.category as ContentCategory || 'Solar Energy',
        status: form.status as ContentStatus || 'draft',
        tags: form.tags || ['Renewables'],
        summary: form.summary || form.content?.substring(0, 140) || '',
        content: form.content || '',
        coverImage: form.coverImage || '',
        featured: false,
        readTimeMinutes: Math.max(2, Math.round((form.content?.length || 0) / 800)),
        author: form.author || {
          name: currentUser.name,
          role: currentUser.department,
          avatar: currentUser.avatar,
        },
        seo: form.seo || {
          metaTitle: form.title || '',
          metaDescription: form.summary || '',
          focusKeywords: ['Grid', 'Energy'],
        },
      });
    }

    setAdminView('content');
  };

  return (
    <div className="p-6 lg:p-8 bg-zinc-950 min-h-screen text-zinc-100 font-sans transition-colors">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800 font-mono">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAdminView('content')}
            className="p-1.5 rounded-lg border border-zinc-800 bg-[#0c0c0e] text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              {existingArticle ? 'Edit Executive Article' : 'Create Executive Article'}
            </h1>
            <span className="text-[10px] text-zinc-500 uppercase">
              STATUS: <span className="text-emerald-400 font-bold">{form.status?.toUpperCase()}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAiDrawerOpen(true)}
            id="editor-open-ai-drawer-btn"
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Copilot Assistant</span>
          </button>

          <button
            onClick={handleSave}
            id="editor-save-btn"
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form Left, Settings/SEO Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6">
        
        {/* Left Form / Content */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="p-5 rounded-xl bg-[#0c0c0e] border border-zinc-800 space-y-4">
            
            {/* Title */}
            <div>
              <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase block mb-1">
                Report Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="e.g. Utility Scale BESS Integration Mandate 2026"
                className="w-full px-3 py-2 text-sm font-bold font-mono rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase block mb-1">
                Subtitle / Executive Deck
              </label>
              <input
                type="text"
                value={form.subtitle}
                onChange={e => setForm({ ...form, subtitle: e.target.value })}
                placeholder="Brief high-level positioning deck..."
                className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Content Tabs (Write vs Preview) */}
            <div className="pt-2">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-3 font-mono">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('write')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      activeTab === 'write' ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40' : 'text-zinc-500'
                    }`}
                  >
                    Write Markdown
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      activeTab === 'preview' ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40' : 'text-zinc-500'
                    }`}
                  >
                    Live Preview
                  </button>
                  <button
                    onClick={() => setActiveTab('seo')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      activeTab === 'seo' ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40' : 'text-zinc-500'
                    }`}
                  >
                    SEO & Metadata
                  </button>
                </div>

                <span className="text-[10px] text-zinc-500">
                  {form.content?.length || 0} chars
                </span>
              </div>

              {activeTab === 'write' && (
                <textarea
                  rows={14}
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  placeholder="Write full article in Markdown format..."
                  className="w-full p-3 font-mono text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 leading-relaxed focus:outline-none focus:border-emerald-500"
                />
              )}

              {activeTab === 'preview' && (
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 min-h-[350px] space-y-3 text-xs leading-relaxed font-sans">
                  <h2 className="text-lg font-bold text-white font-mono">{form.title || 'Untitled'}</h2>
                  <p className="text-emerald-400 font-medium font-mono text-xs">{form.subtitle}</p>
                  <div className="whitespace-pre-wrap text-zinc-300">
                    {form.content || 'Start typing markdown content to preview here.'}
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-3 text-xs font-mono">
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase block mb-1">SEO Meta Title</label>
                    <input
                      type="text"
                      value={form.seo?.metaTitle}
                      onChange={e => setForm({ ...form, seo: { ...form.seo!, metaTitle: e.target.value } })}
                      className="w-full p-2 rounded bg-black border border-zinc-800 text-zinc-100"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase block mb-1">SEO Meta Description</label>
                    <textarea
                      rows={2}
                      value={form.seo?.metaDescription}
                      onChange={e => setForm({ ...form, seo: { ...form.seo!, metaDescription: e.target.value } })}
                      className="w-full p-2 rounded bg-black border border-zinc-800 text-zinc-100"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Executive Summary Input */}
            <div>
              <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase block mb-1">
                Executive Takeaways & Key Summary
              </label>
              <textarea
                rows={3}
                value={form.summary}
                onChange={e => setForm({ ...form, summary: e.target.value })}
                placeholder="2-sentence executive overview for cards and public feed..."
                className="w-full p-3 text-xs font-mono rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

          </div>

        </div>

        {/* Right Settings Sidebar */}
        <div className="lg:col-span-4 space-y-6 font-mono text-xs">
          
          <div className="p-5 rounded-xl bg-[#0c0c0e] border border-zinc-800 space-y-4">
            <h3 className="font-bold text-white pb-2 border-b border-zinc-800/80 uppercase tracking-wider text-[11px]">
              Publishing Settings
            </h3>

            {/* Status Select */}
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase block">Workflow Status</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value as ContentStatus })}
                className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none"
              >
                <option value="draft">Draft (Internal)</option>
                <option value="in_review">In Review (Editorial)</option>
                <option value="published">Published (Live Public)</option>
              </select>
            </div>

            {/* Category Select */}
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase block">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value as ContentCategory })}
                className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none"
              >
                <option value="Solar Energy">Solar Energy</option>
                <option value="Wind Infrastructure">Wind Infrastructure</option>
                <option value="ESG & Sustainability">ESG & Sustainability</option>
                <option value="Grid Modernization">Grid Modernization</option>
                <option value="Energy Trading">Energy Trading</option>
              </select>
            </div>

            {/* URL Slug */}
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase block">URL Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
                className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200"
              />
            </div>

            {/* Cover Image URL */}
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase block">Cover Image CDN URL</label>
              <input
                type="text"
                value={form.coverImage}
                onChange={e => setForm({ ...form, coverImage: e.target.value })}
                className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200"
              />
              {form.coverImage && (
                <div className="h-24 rounded-lg overflow-hidden border border-zinc-800 mt-2">
                  <img src={form.coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* AI Copilot Drawer */}
      <AIAssistantDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        currentTitle={form.title || ''}
        currentContent={form.content || ''}
        onApplyDraft={(draft) => setForm(prev => ({ ...prev, content: draft }))}
        onApplySEO={(seoData) => setForm(prev => ({
          ...prev,
          seo: {
            metaTitle: seoData.metaTitle,
            metaDescription: seoData.metaDescription,
            focusKeywords: seoData.focusKeywords,
          },
          slug: seoData.slug,
        }))}
        onApplySummary={(sum) => setForm(prev => ({ ...prev, summary: sum }))}
      />

    </div>
  );
};
