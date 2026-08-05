import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RoleGuard } from './RoleGuard';
import { 
  Users, 
  ShieldCheck, 
  UserPlus, 
  RefreshCw, 
  Search, 
  CheckCircle2, 
  XCircle,
  Clock,
  Sparkles,
  Key
} from 'lucide-react';
import { UserRole, UserStatus } from '../../types';

export const AdminUsersView: React.FC = () => {
  const { allUsers, fetchUsers, updateUserRoleOrStatus, userRole, userProfile } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchUsers();
    setIsRefreshing(false);
  };

  const filteredUsers = allUsers.filter(u => {
    const matchesSearch = u.fullName.toLowerCase().includes(search.toLowerCase()) || 
      u.email.toLowerCase().includes(search.toLowerCase()) || 
      u.uid.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRoleFilter === 'All' || u.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <RoleGuard allowedRoles={['Super Admin', 'Admin']}>
      <div className="space-y-6 font-sans">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4 font-mono">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>FIRESTORE IAM & GOVERNANCE</span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              User Management & Access Rights
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              Manage executive roles, deactivate credentials, and audit last login timestamps in the Firestore <code className="text-emerald-400">users</code> collection.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-3 py-1.5 rounded-lg bg-[#0c0c0e] border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
              id="users-refresh-btn"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Sync Firestore</span>
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by name, email, or UID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[#0c0c0e] border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['All', 'Super Admin', 'Admin', 'Editor'].map(r => (
              <button
                key={r}
                onClick={() => setSelectedRoleFilter(r)}
                className={`px-3 py-1 rounded text-xs shrink-0 transition-all ${
                  selectedRoleFilter === r
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                    : 'bg-[#0c0c0e] text-zinc-400 border border-zinc-800 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* User Table */}
        <div className="rounded-xl bg-[#0c0c0e] border border-zinc-800 overflow-hidden font-mono text-xs shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/80 border-b border-zinc-800 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  <th className="p-3 pl-4">User Profile</th>
                  <th className="p-3">UID</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Last Active</th>
                  <th className="p-3 text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-zinc-500 font-sans">
                      No matching users found in Firestore <code className="text-emerald-400">users</code> collection.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.uid} className="hover:bg-zinc-900/40 transition-colors">
                      
                      {/* User Info */}
                      <td className="p-3 pl-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={user.photoURL || user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                            alt={user.fullName}
                            className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                          />
                          <div>
                            <span className="font-bold text-white block text-xs">
                              {user.fullName || user.name || 'Anonymous User'}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-sans block">{user.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* UID */}
                      <td className="p-3 text-[10px] text-zinc-400 font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                          {user.uid.slice(0, 10)}...
                        </span>
                      </td>

                      {/* Role Selector */}
                      <td className="p-3">
                        <select
                          value={user.role}
                          onChange={e => updateUserRoleOrStatus(user.uid, { role: e.target.value as UserRole })}
                          disabled={userRole !== 'Super Admin' && user.uid !== userProfile?.uid}
                          className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs text-emerald-400 font-bold focus:outline-none disabled:opacity-70 cursor-pointer"
                        >
                          <option value="Super Admin">Super Admin</option>
                          <option value="Admin">Admin</option>
                          <option value="Editor">Editor</option>
                        </select>
                      </td>

                      {/* Status Toggle */}
                      <td className="p-3">
                        <button
                          onClick={() => updateUserRoleOrStatus(user.uid, { status: user.status === 'Active' ? 'Inactive' : 'Active' })}
                          disabled={userRole !== 'Super Admin'}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${
                            user.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-red-500/10 text-red-400 border-red-500/30'
                          }`}
                        >
                          {user.status === 'Active' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              <span>Inactive</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Last Login */}
                      <td className="p-3 text-[10px] text-zinc-400">
                        <div className="flex items-center gap-1 font-sans">
                          <Clock className="w-3 h-3 text-emerald-400" />
                          <span>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right pr-4 font-sans">
                        <span className="text-[10px] text-zinc-500">
                          {user.uid === userProfile?.uid ? '(You)' : 'Managed'}
                        </span>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </RoleGuard>
  );
};
