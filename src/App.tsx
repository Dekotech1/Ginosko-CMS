import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CMSProvider, useCMS } from './context/CMSContext';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { ToastContainer } from './components/common/ToastContainer';

// Public views
import { HeroSection } from './components/public/HeroSection';
import { SolutionsGrid } from './components/public/SolutionsGrid';
import { ProjectsMapShowcase } from './components/public/ProjectsMapShowcase';
import { EnergyCalculator } from './components/public/EnergyCalculator';
import { InsightsBlog } from './components/public/InsightsBlog';
import { ArticleView } from './components/public/ArticleView';
import { ContactLeadForm } from './components/public/ContactLeadForm';

// Admin views & Auth
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminDashboardOverview } from './components/admin/AdminDashboardOverview';
import { ContentManager } from './components/admin/ContentManager';
import { ArticleEditorModal } from './components/admin/ArticleEditorModal';
import { MediaLibrary } from './components/admin/MediaLibrary';
import { LeadCRMManager } from './components/admin/LeadCRMManager';
import { AdminUsersView } from './components/admin/AdminUsersView';
import { AnalyticsDashboard } from './components/admin/AnalyticsDashboard';
import { SettingsView } from './components/admin/SettingsView';
import { AIAssistantDrawer } from './components/admin/AIAssistantDrawer';
import { LoginPage } from './components/auth/LoginPage';

const MainLayout: React.FC = () => {
  const { section, publicView, adminView } = useCMS();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-black transition-colors">
      <Navbar />

      <main className="flex-1 flex flex-col">
        {section === 'public' ? (
          <div className="flex-1">
            {publicView === 'home' && (
              <>
                <HeroSection />
                <SolutionsGrid />
                <ProjectsMapShowcase />
                <EnergyCalculator />
                <InsightsBlog />
                <ContactLeadForm />
              </>
            )}
            {publicView === 'services' && <SolutionsGrid />}
            {publicView === 'projects' && <ProjectsMapShowcase />}
            {publicView === 'calculator' && <EnergyCalculator />}
            {publicView === 'insights' && <InsightsBlog />}
            {publicView === 'article-detail' && <ArticleView />}
            {publicView === 'contact' && <ContactLeadForm />}
          </div>
        ) : (
          <ProtectedRoute>
            <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
              <AdminSidebar />
              <div className="flex-1 bg-zinc-950 overflow-y-auto">
                {adminView === 'overview' && <AdminDashboardOverview />}
                {adminView === 'content' && <ContentManager />}
                {adminView === 'editor' && <ArticleEditorModal />}
                {adminView === 'media' && <MediaLibrary />}
                {adminView === 'leads' && <LeadCRMManager />}
                {adminView === 'users' && <AdminUsersView />}
                {adminView === 'analytics' && <AnalyticsDashboard />}
                {adminView === 'settings' && <SettingsView />}
              </div>
            </div>
          </ProtectedRoute>
        )}
      </main>

      <Footer />
      <CommandPalette />
      <ToastContainer />
      <AIAssistantDrawer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <MainLayout />
      </CMSProvider>
    </AuthProvider>
  );
}
