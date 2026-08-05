import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Image as ImageIcon, 
  FileText, 
  Search, 
  Trash2, 
  Copy, 
  Upload, 
  Grid, 
  List
} from 'lucide-react';
import { MediaAsset } from '../../types';

export const MediaLibrary: React.FC = () => {
  const { mediaAssets, addMediaAsset, deleteMediaAsset, showToast } = useCMS();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [newAssetForm, setNewAssetForm] = useState({
    name: '',
    url: '',
    type: 'image' as 'image' | 'document' | 'video',
    tags: 'solar, bess, infrastructure',
  });

  const [isUploading, setIsUploading] = useState(false);

  const filteredAssets = mediaAssets.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Media URL copied to clipboard!', 'info');
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetForm.name || !newAssetForm.url) return;

    addMediaAsset({
      name: newAssetForm.name,
      url: newAssetForm.url,
      type: newAssetForm.type,
      sizeBytes: 2500000,
      dimensions: newAssetForm.type === 'image' ? '3840x2160' : undefined,
      tags: newAssetForm.tags.split(',').map(t => t.trim()),
    });

    setNewAssetForm({
      name: '',
      url: '',
      type: 'image',
      tags: 'solar, bess, infrastructure',
    });
    setIsUploading(false);
  };

  return (
    <div className="p-6 lg:p-8 bg-zinc-950 min-h-screen space-y-6 text-zinc-100 font-sans transition-colors">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>CDN MEDIA ASSET MANAGEMENT</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-mono">Media & Asset Library</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Central repository for high-res imagery, PDF research reports, and technical schematics.
          </p>
        </div>

        <button
          onClick={() => setIsUploading(true)}
          id="media-upload-trigger-btn"
          className="px-4 py-2 rounded-lg font-mono font-bold text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-2 shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Asset</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl bg-[#0c0c0e] border border-zinc-800">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search media assets..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1 rounded transition-colors ${viewMode === 'grid' ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-500'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1 rounded transition-colors ${viewMode === 'list' ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-500'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Upload Modal Drawer */}
      {isUploading && (
        <div className="p-5 rounded-xl bg-[#0c0c0e] border border-emerald-500/40 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="font-bold text-white">Upload Asset to Cloud CDN</h3>
            <button onClick={() => setIsUploading(false)} className="text-zinc-500 hover:text-zinc-300">Cancel</button>
          </div>

          <form onSubmit={handleAddAsset} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-zinc-500 uppercase block mb-1">Asset Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Solar_BESS_Array.jpg"
                value={newAssetForm.name}
                onChange={e => setNewAssetForm({ ...newAssetForm, name: e.target.value })}
                className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 uppercase block mb-1">Asset CDN URL</label>
              <input
                type="text"
                required
                placeholder="https://images.unsplash.com/..."
                value={newAssetForm.url}
                onChange={e => setNewAssetForm({ ...newAssetForm, url: e.target.value })}
                className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 uppercase block mb-1">Asset Type</label>
              <select
                value={newAssetForm.type}
                onChange={e => setNewAssetForm({ ...newAssetForm, type: e.target.value as any })}
                className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none"
              >
                <option value="image">Image Asset</option>
                <option value="document">PDF / Research Document</option>
                <option value="video">Video Asset</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 uppercase block mb-1">Tags (Comma separated)</label>
              <input
                type="text"
                value={newAssetForm.tags}
                onChange={e => setNewAssetForm({ ...newAssetForm, tags: e.target.value })}
                className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2 pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-lg font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                Save Asset
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Assets Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map(asset => (
            <div
              key={asset.id}
              className="rounded-xl bg-[#0c0c0e] border border-zinc-800 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 bg-zinc-900 overflow-hidden">
                  {asset.type === 'image' ? (
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">
                      <FileText className="w-10 h-10" />
                    </div>
                  )}
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[9px] text-zinc-300 font-mono border border-zinc-700 uppercase">
                    {asset.type}
                  </span>
                </div>

                <div className="p-3 space-y-1">
                  <h4 className="text-xs font-bold text-white truncate font-mono" title={asset.name}>
                    {asset.name}
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-mono">
                    By {asset.uploadedBy} • {asset.uploadedAt}
                  </p>
                </div>
              </div>

              <div className="p-2.5 px-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => handleCopyLink(asset.url)}
                  className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px]"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy URL</span>
                </button>
                <button
                  onClick={() => deleteMediaAsset(asset.id)}
                  className="text-zinc-500 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* List Mode */
        <div className="rounded-xl bg-[#0c0c0e] border border-zinc-800 overflow-hidden">
          <table className="w-full text-left text-xs font-mono text-zinc-300">
            <thead className="text-[10px] font-bold uppercase bg-zinc-900 text-zinc-500 border-b border-zinc-800">
              <tr>
                <th className="p-3">Asset Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Uploaded By</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredAssets.map(asset => (
                <tr key={asset.id} className="hover:bg-zinc-900/40">
                  <td className="p-3 font-bold text-white">{asset.name}</td>
                  <td className="p-3 uppercase text-[10px] text-emerald-400">{asset.type}</td>
                  <td className="p-3">{asset.uploadedBy}</td>
                  <td className="p-3 text-zinc-500 text-[10px]">{asset.uploadedAt}</td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => handleCopyLink(asset.url)} className="text-emerald-400 font-bold">Copy URL</button>
                    <button onClick={() => deleteMediaAsset(asset.id)} className="text-rose-400">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
