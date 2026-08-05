import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  FileText, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Star,
  Filter,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ContentStatus, ContentCategory } from '../../types';

export const ContentManager: React.FC = () => {
  const { 
    articles, 
    setAdminView, 
    setActiveArticleId, 
    deleteArticle, 
    togglePublishStatus, 
    toggleFeatured 
  } = useCMS();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredArticles = articles.filter(art => {
    const matchesQuery = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || art.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    return matchesQuery && matchesStatus && matchesCategory;
  });

  const handleCreateNew = () => {
    setActiveArticleId(null);
    setAdminView('editor');
  };

  const handleEdit = (id: string) => {
    setActiveArticleId(id);
    setAdminView('editor');
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredArticles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredArticles.map(a => a.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 lg:p-8 bg-zinc-950 min-h-screen space-y-6 text-zinc-100 font-sans transition-colors">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>EXECUTIVE ARTICLE REPOSITORY</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-mono">Content Manager & Database</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage research reports, case studies, publishing workflows, and SEO metadata.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          id="cm-create-article-btn"
          className="px-4 py-2 rounded-lg font-mono font-bold text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Article</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-xl bg-[#0c0c0e] border border-zinc-800">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search title, keywords..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        {/* Status & Category Selects */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="in_review">In Review</option>
            </select>
          </div>

          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Solar Energy">Solar Energy</option>
            <option value="Wind Infrastructure">Wind Infrastructure</option>
            <option value="ESG & Sustainability">ESG & Sustainability</option>
            <option value="Grid Modernization">Grid Modernization</option>
            <option value="Energy Trading">Energy Trading</option>
          </select>

        </div>

      </div>

      {/* Content Table */}
      <div className="rounded-xl bg-[#0c0c0e] border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono text-zinc-300">
            <thead className="text-[10px] font-bold uppercase bg-zinc-900/80 text-zinc-500 border-b border-zinc-800">
              <tr>
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredArticles.length && filteredArticles.length > 0}
                    onChange={handleSelectAll}
                    className="rounded accent-emerald-500"
                  />
                </th>
                <th className="p-3">Title & Category</th>
                <th className="p-3">Author</th>
                <th className="p-3">Status</th>
                <th className="p-3">Views</th>
                <th className="p-3">Updated</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-zinc-500">
                    No articles found matching filters.
                  </td>
                </tr>
              ) : (
                filteredArticles.map(art => (
                  <tr key={art.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(art.id)}
                        onChange={() => handleToggleSelect(art.id)}
                        className="rounded accent-emerald-500"
                      />
                    </td>
                    
                    {/* Title */}
                    <td className="p-3 max-w-sm">
                      <div className="flex items-start gap-2">
                        {art.featured && (
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <button
                            onClick={() => handleEdit(art.id)}
                            className="font-bold text-white hover:text-emerald-400 text-left line-clamp-1 font-sans"
                          >
                            {art.title}
                          </button>
                          <span className="text-[10px] text-zinc-500 block">
                            /{art.slug} • <span className="text-emerald-400">{art.category}</span>
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Author */}
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={art.author.avatar}
                          alt={art.author.name}
                          className="w-5 h-5 rounded-full object-cover border border-zinc-700"
                        />
                        <span className="text-zinc-300">{art.author.name}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="p-3">
                      <button
                        onClick={() => togglePublishStatus(art.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-transform hover:scale-105 ${
                          art.status === 'published'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {art.status.replace('_', ' ')}
                      </button>
                    </td>

                    {/* Views */}
                    <td className="p-3 text-emerald-400 font-bold">
                      {art.views.toLocaleString()}
                    </td>

                    {/* Updated */}
                    <td className="p-3 text-zinc-500 text-[10px]">
                      {art.updatedAt}
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => toggleFeatured(art.id)}
                        className={`p-1.5 rounded border transition-colors ${
                          art.featured
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                            : 'text-zinc-500 border-zinc-800 hover:text-amber-400'
                        }`}
                        title={art.featured ? 'Unmark featured' : 'Feature on homepage'}
                      >
                        <Star className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleEdit(art.id)}
                        className="p-1.5 rounded text-zinc-300 hover:text-emerald-400 border border-zinc-800 hover:border-emerald-500/50 transition-colors"
                        title="Edit article"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => deleteArticle(art.id)}
                        className="p-1.5 rounded text-zinc-500 hover:text-rose-400 border border-zinc-800 hover:border-rose-500/50 transition-colors"
                        title="Delete article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
