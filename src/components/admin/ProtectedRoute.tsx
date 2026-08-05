import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoginPage } from '../auth/LoginPage';
import { Loader2, ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackToLogin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  fallbackToLogin = true 
}) => {
  const { isAuthenticated, loading, userProfile } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-100 font-mono space-y-4">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        <p className="text-xs text-zinc-400">Verifying Ginosko Security Session...</p>
      </div>
    );
  }

  if (!isAuthenticated || !userProfile) {
    if (fallbackToLogin) {
      return <LoginPage />;
    }
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-mono text-zinc-100">
        <div className="max-w-md w-full p-6 rounded-xl bg-[#0c0c0e] border border-red-500/40 text-center space-y-3">
          <ShieldAlert className="w-10 h-10 text-red-400 mx-auto" />
          <h2 className="text-lg font-bold text-white">Access Denied</h2>
          <p className="text-xs text-zinc-400">
            You must be logged in with an active Ginosko CMS account to access the admin workspace.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
