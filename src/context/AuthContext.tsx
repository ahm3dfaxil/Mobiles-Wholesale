import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { app } from '../config/firebase';

const auth = getAuth(app);
const ADMIN_UID = import.meta.env.VITE_ADMIN_UID || 'GxyHU3vPr3VkmpZt0ivPmEgIhOc2';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser && fbUser.uid === ADMIN_UID) {
        try {
          const idToken = await fbUser.getIdToken();
          const adminUser: AdminUser = {
            id: fbUser.uid,
            email: fbUser.email || 'regenerateglobal@gmail.com',
            name: 'Regenerate Global Admin',
            role: 'SUPER_ADMIN'
          };
          setUser(adminUser);
          setToken(idToken);
          setLoading(false);
          return;
        } catch (e) {
          console.warn('Failed to get ID token for admin:', e);
        }
      }

      // If user is logged in as non-admin or null UID, enforce logout
      if (fbUser && fbUser.uid !== ADMIN_UID) {
        await signOut(auth).catch(() => {});
      }
      setUser(null);
      setToken(null);
      localStorage.removeItem('mw_admin_token');
      localStorage.removeItem('mw_admin_user');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      // Pass entered credentials directly to Firebase Authentication
      const userCred = await signInWithEmailAndPassword(auth, email.trim(), pass);
      
      // Strict authorization check against designated Admin UID
      if (userCred.user.uid !== ADMIN_UID) {
        await signOut(auth);
        setUser(null);
        setToken(null);
        localStorage.removeItem('mw_admin_token');
        localStorage.removeItem('mw_admin_user');
        return { success: false, error: 'Access Denied: Account is not authorized for Admin Console.' };
      }

      const idToken = await userCred.user.getIdToken();
      const adminUser: AdminUser = {
        id: userCred.user.uid,
        email: userCred.user.email || email.trim(),
        name: 'Regenerate Global Admin',
        role: 'SUPER_ADMIN'
      };
      setUser(adminUser);
      setToken(idToken);
      localStorage.setItem('mw_admin_token', idToken);
      localStorage.setItem('mw_admin_user', JSON.stringify(adminUser));
      return { success: true };
    } catch (fbErr: any) {
      setUser(null);
      setToken(null);
      return { success: false, error: fbErr.message || 'Invalid admin credentials.' };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {}
    setToken(null);
    setUser(null);
    localStorage.removeItem('mw_admin_token');
    localStorage.removeItem('mw_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user && user.id === ADMIN_UID,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
