import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Lock } from 'lucide-react';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  allowedRoles, 
  children, 
  fallback 
}) => {
  const { userRole } = useAuth();

  const isAllowed = userRole && allowedRoles.includes(userRole);

  if (!isAllowed) {
    if (fallback) return <>{fallback}</>;

    return (
      <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center gap-2">
        <Lock className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          Requires <strong className="text-zinc-200">{allowedRoles.join(' or ')}</strong> privileges. Current role: <strong className="text-amber-400">{userRole || 'None'}</strong>.
        </span>
      </div>
    );
  }

  return <>{children}</>;
};
