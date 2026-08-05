import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs 
} from 'firebase/firestore';
import { auth, db, configureAuthPersistence } from '../lib/firebase';
import { UserProfile, UserRole, UserStatus } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, pass: string, rememberMe?: boolean) => Promise<boolean>;
  signup: (email: string, pass: string, fullName: string, role?: UserRole) => Promise<boolean>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (oobCode: string, newPass: string) => Promise<boolean>;
  clearError: () => void;
  quickLoginDemo: (role: UserRole) => Promise<boolean>;
  allUsers: UserProfile[];
  fetchUsers: () => Promise<void>;
  updateUserRoleOrStatus: (targetUid: string, updates: { role?: UserRole; status?: UserStatus; fullName?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);

  // Sync user profile from Firestore or create initial doc
  const syncUserProfile = async (firebaseUser: FirebaseUser): Promise<UserProfile | null> => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const docSnap = await getDoc(userRef);

      const now = new Date().toISOString();

      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        
        if (data.status === 'Inactive') {
          await signOut(auth);
          setError('Account has been deactivated. Contact a Super Admin.');
          setUserProfile(null);
          setCurrentUser(null);
          return null;
        }

        // Update last login timestamp
        const updatedProfile: UserProfile = {
          ...data,
          lastLogin: now,
          updatedAt: now,
          name: data.fullName || data.name || firebaseUser.displayName || 'Ginosko Admin',
          id: data.uid,
          avatar: data.photoURL || data.avatar || DEFAULT_AVATAR,
        };

        await updateDoc(userRef, {
          lastLogin: now,
          updatedAt: now,
        }).catch(() => {});

        setUserProfile(updatedProfile);
        return updatedProfile;
      } else {
        // Create initial profile in Firestore
        const newProfile: UserProfile = {
          uid: firebaseUser.uid,
          fullName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Ginosko Executive',
          email: firebaseUser.email || '',
          photoURL: firebaseUser.photoURL || DEFAULT_AVATAR,
          role: 'Super Admin',
          status: 'Active',
          lastLogin: now,
          createdAt: now,
          updatedAt: now,
          // compatibility aliases
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Ginosko Executive',
          avatar: firebaseUser.photoURL || DEFAULT_AVATAR,
          department: 'Executive Leadership',
        };

        await setDoc(userRef, newProfile);
        setUserProfile(newProfile);
        return newProfile;
      }
    } catch (err: any) {
      console.error('Error syncing user profile:', err);
      // Fallback local profile if Firestore write network delay occurs
      const fallback: UserProfile = {
        uid: firebaseUser.uid,
        fullName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Executive User',
        email: firebaseUser.email || '',
        photoURL: firebaseUser.photoURL || DEFAULT_AVATAR,
        role: 'Super Admin',
        status: 'Active',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Executive User',
        avatar: firebaseUser.photoURL || DEFAULT_AVATAR,
        department: 'Operations',
      };
      setUserProfile(fallback);
      return fallback;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setCurrentUser(user);
        await syncUserProfile(user);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string, rememberMe = true): Promise<boolean> => {
    setError(null);
    setLoading(true);
    try {
      await configureAuthPersistence(rememberMe);
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const profile = await syncUserProfile(cred.user);
      setLoading(false);
      return profile !== null;
    } catch (err: any) {
      setLoading(false);
      let msg = 'Authentication failed. Please check your credentials.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        msg = 'Invalid email address or password.';
      } else if (err.code === 'auth/too-many-requests') {
        msg = 'Access temporarily locked due to multiple failed login attempts. Try again later.';
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
      return false;
    }
  };

  const signup = async (email: string, pass: string, fullName: string, role: UserRole = 'Admin'): Promise<boolean> => {
    setError(null);
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      const now = new Date().toISOString();
      const profile: UserProfile = {
        uid: cred.user.uid,
        fullName,
        email,
        photoURL: DEFAULT_AVATAR,
        role,
        status: 'Active',
        lastLogin: now,
        createdAt: now,
        updatedAt: now,
        id: cred.user.uid,
        name: fullName,
        avatar: DEFAULT_AVATAR,
        department: 'Corporate CMS',
      };

      await setDoc(doc(db, 'users', cred.user.uid), profile);
      setUserProfile(profile);
      setCurrentUser(cred.user);
      setLoading(false);
      return true;
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Signup failed.');
      return false;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserProfile(null);
    } catch (err: any) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email.');
      return false;
    }
  };

  const resetPassword = async (oobCode: string, newPass: string): Promise<boolean> => {
    setError(null);
    try {
      await confirmPasswordReset(auth, oobCode, newPass);
      return true;
    } catch (err: any) {
      setError(err.message || 'Password reset failed.');
      return false;
    }
  };

  const clearError = () => setError(null);

  // Quick preset login for reviewers & testing demo personas
  const quickLoginDemo = async (targetRole: UserRole): Promise<boolean> => {
    setError(null);
    setLoading(true);
    const emailMap: Record<UserRole, string> = {
      'Super Admin': 'superadmin@ginosko.com',
      'Admin': 'admin@ginosko.com',
      'Editor': 'editor@ginosko.com',
    };
    const pass = 'Ginosko2026!';
    const email = emailMap[targetRole];

    try {
      await configureAuthPersistence(true);
      try {
        const cred = await signInWithEmailAndPassword(auth, email, pass);
        // Force update user profile role to targetRole
        const userRef = doc(db, 'users', cred.user.uid);
        await setDoc(userRef, {
          uid: cred.user.uid,
          fullName: `${targetRole} User`,
          email,
          photoURL: DEFAULT_AVATAR,
          role: targetRole,
          status: 'Active',
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          id: cred.user.uid,
          name: `${targetRole} User`,
          avatar: DEFAULT_AVATAR,
          department: targetRole === 'Super Admin' ? 'Executive Leadership' : targetRole === 'Admin' ? 'Operations' : 'Content Editorial',
        }, { merge: true });
        
        await syncUserProfile(cred.user);
        setLoading(false);
        return true;
      } catch (signInErr: any) {
        // Account doesn't exist yet, create it on demand
        if (signInErr.code === 'auth/user-not-found' || signInErr.code === 'auth/invalid-credential') {
          return await signup(email, pass, `${targetRole} User`, targetRole);
        }
        throw signInErr;
      }
    } catch (err: any) {
      setLoading(false);
      setError(`Failed demo login: ${err.message}`);
      return false;
    }
  };

  const fetchUsers = async () => {
    try {
      const snap = await getDocs(collection(db, 'users'));
      const list: UserProfile[] = [];
      snap.forEach(d => {
        list.push(d.data() as UserProfile);
      });
      if (list.length > 0) {
        setAllUsers(list);
      } else if (userProfile) {
        setAllUsers([userProfile]);
      }
    } catch (err) {
      console.warn('Could not fetch all users from Firestore:', err);
      if (userProfile) setAllUsers([userProfile]);
    }
  };

  const updateUserRoleOrStatus = async (
    targetUid: string, 
    updates: { role?: UserRole; status?: UserStatus; fullName?: string }
  ) => {
    try {
      const userRef = doc(db, 'users', targetUid);
      const now = new Date().toISOString();
      await updateDoc(userRef, {
        ...updates,
        updatedAt: now,
      });

      setAllUsers(prev => prev.map(u => u.uid === targetUid ? { ...u, ...updates, updatedAt: now } : u));
      
      if (userProfile && userProfile.uid === targetUid) {
        setUserProfile(prev => prev ? { ...prev, ...updates, updatedAt: now } : null);
      }
    } catch (err: any) {
      console.error('Failed to update user role/status:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        userRole: userProfile?.role || null,
        isAuthenticated: !!currentUser && userProfile?.status === 'Active',
        loading,
        error,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        clearError,
        quickLoginDemo,
        allUsers,
        fetchUsers,
        updateUserRoleOrStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
