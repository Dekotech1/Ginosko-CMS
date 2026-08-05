import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Zap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  ShieldCheck, 
  UserCheck, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { UserRole } from '../../types';

interface LoginPageProps {
  onSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  const { login, quickLoginDemo, forgotPassword, loading, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [viewMode, setViewMode] = useState<'login' | 'forgot' | 'signup'>('login');

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('Admin');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password, rememberMe);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  const handleQuickDemo = async (role: UserRole) => {
    const success = await quickLoginDemo(role);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await forgotPassword(forgotEmail);
    if (ok) {
      setForgotSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Logo & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mb-1 shadow-lg shadow-emerald-500/10">
            <Zap className="w-6 h-6 fill-emerald-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
            GINOSKO CMS
          </h1>
          <p className="text-xs text-zinc-400 font-sans">
            {viewMode === 'login' && 'Enterprise Energy Infrastructure & Governance Portal'}
            {viewMode === 'forgot' && 'Account Recovery & Credential Reset'}
            {viewMode === 'signup' && 'Create New Executive Staff Credentials'}
          </p>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 font-mono flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">{error}</div>
            <button 
              onClick={clearError}
              className="text-red-400 hover:text-red-200 text-xs font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* LOGIN VIEW */}
        {viewMode === 'login' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c0e] border border-zinc-800 space-y-5 font-mono shadow-2xl">
            
            <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                Executive Authentication
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-normal">
                <ShieldCheck className="w-3.5 h-3.5" />
                256-Bit Encrypted
              </span>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-zinc-400 block">
                  Corporate Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="executive@ginosko.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    id="login-email-input"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 block">
                    Security Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { clearError(); setViewMode('forgot'); }}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors font-sans"
                    id="login-forgot-password-link"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    id="login-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    id="login-toggle-password-btn"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between text-xs font-sans">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-zinc-200">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded border-zinc-700 bg-zinc-900 cursor-pointer"
                    id="login-remember-me-checkbox"
                  />
                  <span>Remember session on this device</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-60 cursor-pointer"
                id="login-submit-btn"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Quick One-Click Demo Personas */}
            <div className="pt-4 border-t border-zinc-800 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Demo Access (1-Click)</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Super Admin')}
                  disabled={loading}
                  className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all font-mono font-bold text-center"
                  id="demo-login-superadmin-btn"
                >
                  Super Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Admin')}
                  disabled={loading}
                  className="p-2 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 transition-all font-mono font-bold text-center"
                  id="demo-login-admin-btn"
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Editor')}
                  disabled={loading}
                  className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all font-mono font-bold text-center"
                  id="demo-login-editor-btn"
                >
                  Editor
                </button>
              </div>
            </div>

            {/* Toggle to Signup */}
            <div className="pt-2 text-center font-sans text-xs text-zinc-500">
              Need a new account?{' '}
              <button
                onClick={() => { clearError(); setViewMode('signup'); }}
                className="text-emerald-400 font-bold hover:underline"
              >
                Register Staff Member
              </button>
            </div>

          </div>
        )}

        {/* FORGOT PASSWORD VIEW */}
        {viewMode === 'forgot' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c0e] border border-zinc-800 space-y-5 font-mono shadow-2xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-3">
              Reset Security Credentials
            </h2>

            {forgotSent ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 font-sans">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-sm font-bold text-white font-mono">Password Reset Instructions Sent</h3>
                <p className="text-xs text-zinc-300">
                  We sent a reset link to <strong className="text-emerald-400">{forgotEmail}</strong>. Check your inbox to set a new password.
                </p>
                <button
                  onClick={() => { setForgotSent(false); setViewMode('login'); }}
                  className="px-4 py-2 rounded-lg bg-zinc-900 text-white font-bold text-xs border border-zinc-800 hover:bg-zinc-800"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Enter your registered corporate email address and we will send you a secure link to reset your CMS password.
                </p>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="executive@ginosko.com"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setViewMode('login')}
                    className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* SIGNUP VIEW */}
        {viewMode === 'signup' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c0e] border border-zinc-800 space-y-5 font-mono shadow-2xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-3">
              Register New Executive User
            </h2>

            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const { signup } = useAuth();
                const ok = await signup(signupEmail, signupPassword, signupName, signupRole);
                if (ok && onSuccess) onSuccess();
              }} 
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-zinc-400 block">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Aris Thorne"
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-zinc-400 block">Corporate Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@ginosko.com"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-zinc-400 block">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-zinc-400 block">Assigned Role</label>
                <select
                  value={signupRole}
                  onChange={e => setSignupRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                >
                  <option value="Super Admin">Super Admin (Full Rights)</option>
                  <option value="Admin">Admin (Content & System Governance)</option>
                  <option value="Editor">Editor (Content Authoring)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setViewMode('login')}
                  className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800"
                >
                  Back to Login
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
