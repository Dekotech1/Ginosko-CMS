import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  NavigationSection, 
  PublicView, 
  AdminView, 
  Article, 
  ProjectCaseStudy, 
  MediaAsset, 
  EnterpriseLead, 
  UserProfile, 
  ActivityLogItem,
  ServiceSolution 
} from '../types';
import { 
  INITIAL_ARTICLES, 
  INITIAL_PROJECTS, 
  INITIAL_SERVICES,
  INITIAL_MEDIA, 
  INITIAL_LEADS, 
  CURRENT_USER, 
  INITIAL_ACTIVITY_LOGS 
} from '../data/initialData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error' | 'warning';
}

interface CMSContextType {
  // Navigation
  section: NavigationSection;
  setSection: (section: NavigationSection) => void;
  publicView: PublicView;
  setPublicView: (view: PublicView) => void;
  adminView: AdminView;
  setAdminView: (view: AdminView) => void;
  activeArticleId: string | null;
  setActiveArticleId: (id: string | null) => void;
  
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Data Collections
  articles: Article[];
  projects: ProjectCaseStudy[];
  services: ServiceSolution[];
  mediaAssets: MediaAsset[];
  leads: EnterpriseLead[];
  activityLogs: ActivityLogItem[];
  currentUser: UserProfile;
  
  // Command Palette
  isCmdPaletteOpen: boolean;
  setIsCmdPaletteOpen: (open: boolean) => void;
  
  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
  
  // Article CRUD
  addArticle: (article: Omit<Article, 'id' | 'views' | 'publishedAt' | 'updatedAt'>) => Article;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  togglePublishStatus: (id: string) => void;
  toggleFeatured: (id: string) => void;
  
  // Lead Operations
  addLead: (lead: Omit<EnterpriseLead, 'id' | 'submittedAt' | 'status' | 'score'>) => void;
  updateLeadStatus: (id: string, status: EnterpriseLead['status']) => void;
  updateLeadNotes: (id: string, notes: string) => void;
  
  // Media Operations
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt' | 'uploadedBy'>) => void;
  deleteMediaAsset: (id: string) => void;
  
  // AI Helper API Trigger
  generateAIContent: (params: {
    mode: 'draft' | 'seo' | 'summarize' | 'translate' | 'calculator_analysis';
    prompt?: string;
    topic?: string;
    contentType?: string;
    targetAudience?: string;
    language?: string;
  }) => Promise<{ success: boolean; text: string; isFallback?: boolean }>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [section, setSectionState] = useState<NavigationSection>('public');
  const [publicView, setPublicView] = useState<PublicView>('home');
  const [adminView, setAdminView] = useState<AdminView>('overview');
  const [activeArticleId, setActiveArticleId] = useState<string | null>('art-001');
  
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('ginosko_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [projects, setProjects] = useState<ProjectCaseStudy[]>(() => {
    const saved = localStorage.getItem('ginosko_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    const saved = localStorage.getItem('ginosko_media');
    return saved ? JSON.parse(saved) : INITIAL_MEDIA;
  });

  const [leads, setLeads] = useState<EnterpriseLead[]>(() => {
    const saved = localStorage.getItem('ginosko_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(INITIAL_ACTIVITY_LOGS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync state to local storage for persistence across refreshes
  useEffect(() => {
    localStorage.setItem('ginosko_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('ginosko_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('ginosko_media', JSON.stringify(mediaAssets));
  }, [mediaAssets]);

  // Handle global dark class on document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Global Keyboard Shortcuts (Cmd+K for command palette, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const logActivity = (action: string, target: string, type: ActivityLogItem['type'] = 'update') => {
    const newItem: ActivityLogItem = {
      id: `act-${Date.now()}`,
      user: CURRENT_USER.name,
      action,
      target,
      timestamp: 'Just now',
      type,
    };
    setActivityLogs(prev => [newItem, ...prev.slice(0, 19)]);
  };

  const setSection = (sec: NavigationSection) => {
    setSectionState(sec);
    if (sec === 'admin' && adminView === 'editor' && !activeArticleId) {
      setActiveArticleId(articles[0]?.id || null);
    }
  };

  // Articles CRUD
  const addArticle = (data: Omit<Article, 'id' | 'views' | 'publishedAt' | 'updatedAt'>): Article => {
    const now = new Date().toISOString().split('T')[0];
    const newArticle: Article = {
      ...data,
      id: `art-${Date.now()}`,
      views: 0,
      publishedAt: now,
      updatedAt: now,
    };

    setArticles(prev => [newArticle, ...prev]);
    logActivity('created new article', newArticle.title, 'create');
    showToast(`Article "${newArticle.title.substring(0, 30)}..." created!`, 'success');
    return newArticle;
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    const now = new Date().toISOString().split('T')[0];
    setArticles(prev =>
      prev.map(art => {
        if (art.id === id) {
          const updated = { ...art, ...updates, updatedAt: now };
          logActivity('updated article', updated.title, 'update');
          return updated;
        }
        return art;
      })
    );
    showToast('Article saved successfully', 'success');
  };

  const deleteArticle = (id: string) => {
    const target = articles.find(a => a.id === id);
    if (!target) return;
    setArticles(prev => prev.filter(a => a.id !== id));
    logActivity('deleted article', target.title, 'delete');
    showToast(`Article "${target.title.substring(0, 25)}" deleted`, 'info');
  };

  const togglePublishStatus = (id: string) => {
    setArticles(prev =>
      prev.map(art => {
        if (art.id === id) {
          const nextStatus = art.status === 'published' ? 'draft' : 'published';
          logActivity(`${nextStatus === 'published' ? 'published' : 'unpublished'} article`, art.title, 'publish');
          showToast(`Article status changed to ${nextStatus}`, 'info');
          return { ...art, status: nextStatus };
        }
        return art;
      })
    );
  };

  const toggleFeatured = (id: string) => {
    setArticles(prev =>
      prev.map(art => {
        if (art.id === id) {
          const nextFeatured = !art.featured;
          showToast(nextFeatured ? 'Article featured on homepage' : 'Article unfeatured', 'info');
          return { ...art, featured: nextFeatured };
        }
        return art;
      })
    );
  };

  // Lead Operations
  const addLead = (leadData: Omit<EnterpriseLead, 'id' | 'submittedAt' | 'status' | 'score'>) => {
    const nowStr = new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
    const newLead: EnterpriseLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      submittedAt: nowStr,
      status: 'new',
      score: leadData.estimatedBudget.includes('10M') || leadData.estimatedBudget.includes('20M') ? 'High' : 'Medium',
    };
    setLeads(prev => [newLead, ...prev]);
    logActivity('received enterprise inquiry', `${newLead.companyName} (${newLead.projectType})`, 'lead');
    showToast('Inquiry submitted successfully! Our enterprise team will contact you.', 'success');
  };

  const updateLeadStatus = (id: string, status: EnterpriseLead['status']) => {
    setLeads(prev =>
      prev.map(lead => (lead.id === id ? { ...lead, status } : lead))
    );
    showToast(`Lead status updated to ${status.replace('_', ' ')}`, 'info');
  };

  const updateLeadNotes = (id: string, notes: string) => {
    setLeads(prev =>
      prev.map(lead => (lead.id === id ? { ...lead, notes } : lead))
    );
    showToast('Lead note updated', 'success');
  };

  // Media Operations
  const addMediaAsset = (assetData: Omit<MediaAsset, 'id' | 'uploadedAt' | 'uploadedBy'>) => {
    const newAsset: MediaAsset = {
      ...assetData,
      id: `med-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
      uploadedBy: CURRENT_USER.name,
    };
    setMediaAssets(prev => [newAsset, ...prev]);
    logActivity('uploaded media asset', newAsset.name, 'create');
    showToast(`Asset "${newAsset.name}" uploaded to Media Library`, 'success');
  };

  const deleteMediaAsset = (id: string) => {
    const target = mediaAssets.find(m => m.id === id);
    if (!target) return;
    setMediaAssets(prev => prev.filter(m => m.id !== id));
    logActivity('deleted media asset', target.name, 'delete');
    showToast(`Asset "${target.name}" removed`, 'info');
  };

  // AI Content Generator Call
  const generateAIContent = async (params: {
    mode: 'draft' | 'seo' | 'summarize' | 'translate' | 'calculator_analysis';
    prompt?: string;
    topic?: string;
    contentType?: string;
    targetAudience?: string;
    language?: string;
  }) => {
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (data.success) {
        return { success: true, text: data.text, isFallback: data.isFallback };
      }
      throw new Error('AI Generation failed');
    } catch (err) {
      console.warn('AI endpoint warning, returning fallback', err);
      return {
        success: true,
        isFallback: true,
        text: `### AI Content Generator Result\n\nGenerated strategic summary for topic: "${params.topic || params.prompt || 'Renewable Infrastructure'}".\n\n- Key Point 1: Optimized grid integration reduces peak strain.\n- Key Point 2: Corporate ESG compliance accelerates investment interest.`,
      };
    }
  };

  return (
    <CMSContext.Provider
      value={{
        section,
        setSection,
        publicView,
        setPublicView,
        adminView,
        setAdminView,
        activeArticleId,
        setActiveArticleId,
        theme,
        toggleTheme,
        articles,
        projects,
        services: INITIAL_SERVICES,
        mediaAssets,
        leads,
        activityLogs,
        currentUser: CURRENT_USER,
        isCmdPaletteOpen,
        setIsCmdPaletteOpen,
        toasts,
        showToast,
        dismissToast,
        addArticle,
        updateArticle,
        deleteArticle,
        togglePublishStatus,
        toggleFeatured,
        addLead,
        updateLeadStatus,
        updateLeadNotes,
        addMediaAsset,
        deleteMediaAsset,
        generateAIContent,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
