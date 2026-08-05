import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Share2, 
  Edit3, 
  Sparkles, 
  Tag
} from 'lucide-react';

export const ArticleView: React.FC = () => {
  const { 
    activeArticleId, 
    articles, 
    setPublicView, 
    setSection, 
    setAdminView,
    setActiveArticleId,
    showToast,
    updateArticle
  } = useCMS();

  const article = articles.find(a => a.id === activeArticleId) || articles[0];

  useEffect(() => {
    if (article) {
      updateArticle(article.id, { views: article.views + 1 });
    }
  }, [article?.id]);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Article link copied to clipboard!', 'info');
  };

  return (
    <article className="py-12 bg-zinc-950 min-h-screen text-zinc-100 font-sans transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800 font-mono text-xs">
          <button
            onClick={() => setPublicView('insights')}
            className="flex items-center gap-1.5 font-bold text-zinc-400 hover:text-white transition-colors"
            id="article-back-to-insights-btn"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Knowledge Hub</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-2.5 py-1 rounded-lg border border-zinc-800 bg-[#0c0c0e] text-zinc-300 hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
              id="article-share-btn"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Report</span>
            </button>

            <button
              onClick={() => {
                setActiveArticleId(article.id);
                setSection('admin');
                setAdminView('editor');
              }}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors flex items-center gap-1.5"
              id="article-open-in-cms-btn"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit in CMS</span>
            </button>
          </div>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase">
              {article.category}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500 text-[11px]">Published {article.publishedAt}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.15] font-mono">
            {article.title}
          </h1>

          <p className="text-base text-zinc-300 leading-relaxed font-sans">
            {article.subtitle}
          </p>

          {/* Author Details Card */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0c0c0e] border border-zinc-800 font-mono text-xs">
            <div className="flex items-center gap-2.5">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <span className="font-bold text-white block">
                  {article.author.name}
                </span>
                <span className="text-[10px] text-zinc-500">
                  {article.author.role} • Ginosko Advisory
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {article.readTimeMinutes} min read
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                {article.views.toLocaleString()} views
              </span>
            </div>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="my-6 rounded-xl overflow-hidden border border-zinc-800 max-h-[420px]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Executive Takeaways Card */}
        <div className="my-6 p-4 rounded-xl bg-[#0c0c0e] border border-emerald-500/30 space-y-2 font-mono">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Summary</span>
          </div>
          <p className="text-xs text-zinc-200 leading-relaxed font-sans">
            {article.summary}
          </p>
        </div>

        {/* Markdown Rendered Content Body */}
        <div className="prose prose-invert max-w-none text-zinc-200 leading-relaxed space-y-5 text-sm font-sans">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('# ')) {
              return null;
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-xl font-bold text-white pt-4 pb-1 border-b border-zinc-800 font-mono">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-base font-bold text-white pt-2 font-mono">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={idx} className="p-3 rounded-lg bg-[#0c0c0e] border-l-2 border-emerald-400 text-xs font-mono italic text-zinc-300">
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            if (paragraph.startsWith('```')) {
              return (
                <pre key={idx} className="p-3 rounded-lg bg-black text-zinc-200 font-mono text-xs overflow-x-auto border border-zinc-800">
                  <code>{paragraph.replace(/```/g, '')}</code>
                </pre>
              );
            }
            return (
              <p key={idx} className="text-zinc-300 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags Footer */}
        <div className="mt-10 pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-1 mr-1">
            <Tag className="w-3 h-3" />
            Tags:
          </span>
          {article.tags.map(t => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded text-[11px] bg-[#0c0c0e] text-zinc-300 border border-zinc-800"
            >
              #{t}
            </span>
          ))}
        </div>

      </div>
    </article>
  );
};
