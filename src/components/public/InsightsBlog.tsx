import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Search, 
  Clock, 
  Eye, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

export const InsightsBlog: React.FC = () => {
  const { articles, setActiveArticleId, setPublicView } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Only show published articles on public site
  const publishedArticles = articles.filter(a => a.status === 'published');

  const categories = ['All', 'Solar Energy', 'ESG & Sustainability', 'Wind Infrastructure', 'Grid Modernization'];

  const filtered = publishedArticles.filter(art => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesQuery = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const featured = publishedArticles.find(a => a.featured) || publishedArticles[0];

  const handleOpenArticle = (id: string) => {
    setActiveArticleId(id);
    setPublicView('article-detail');
  };

  return (
    <div className="py-16 bg-zinc-950 border-b border-zinc-800/80 font-sans text-zinc-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0c0c0e] border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GINOSKO KNOWLEDGE & RESEARCH HUB</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
              Executive Energy Insights & Research
            </h2>
            <p className="mt-1 text-xs text-zinc-400 max-w-2xl font-sans">
              In-depth research on power markets, regulatory directives, BESS telemetry, and corporate decarbonization.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 font-mono text-xs">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search research topics..."
              className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-[#0c0c0e] border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Featured Banner */}
        {featured && !searchQuery && selectedCategory === 'All' && (
          <div
            onClick={() => handleOpenArticle(featured.id)}
            className="mb-10 cursor-pointer group rounded-xl bg-[#0c0c0e] text-white overflow-hidden border border-zinc-800 grid grid-cols-1 lg:grid-cols-12 transition-all hover:border-emerald-500/50"
          >
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between font-sans">
              <div>
                <div className="flex items-center gap-2 mb-3 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase">
                    Featured Insight
                  </span>
                  <span className="text-zinc-500 text-[10px]">{featured.publishedAt}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors mb-3 font-mono">
                  {featured.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-5 line-clamp-3">
                  {featured.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={featured.author.avatar}
                    alt={featured.author.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-bold text-white block text-xs">{featured.author.name}</span>
                    <span className="text-zinc-500 text-[10px]">{featured.author.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-400 font-bold group-hover:translate-x-1 transition-transform text-xs">
                  <span>Read Executive Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full border-l border-zinc-800">
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        )}

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 pb-4 mb-6 border-b border-zinc-800 overflow-x-auto font-mono text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded text-xs shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                  : 'bg-[#0c0c0e] text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(art => (
            <div
              key={art.id}
              onClick={() => handleOpenArticle(art.id)}
              className="group cursor-pointer rounded-xl bg-[#0c0c0e] border border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="relative h-44 overflow-hidden border-b border-zinc-800">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-zinc-200 text-[10px] font-mono border border-zinc-800">
                    {art.category}
                  </div>
                </div>

                <div className="p-5 font-sans">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      {art.readTimeMinutes} min
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-emerald-400" />
                      {art.views.toLocaleString()} views
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors font-mono">
                    {art.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-3">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-3 px-5 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <img
                    src={art.author.avatar}
                    alt={art.author.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-[11px] text-zinc-300">{art.author.name}</span>
                </div>
                <span className="text-emerald-400 font-bold text-[11px] group-hover:translate-x-1 transition-transform">
                  Read →
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
