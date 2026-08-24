import React, { createContext, useContext, useState, useEffect } from 'react';

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
    const savedToken = localStorage.getItem('mw_admin_token');
    const savedUser = localStorage.getItem('mw_admin_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('mw_admin_token');
        localStorage.removeItem('mw_admin_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('mw_admin_token', data.token);
        localStorage.setItem('mw_admin_user', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Invalid credentials' };
      }
    } catch (err) {
      // Dev mode fallback login when backend Express is offline
      if (email === 'admin@mobileswholesale.co.uk' && pass === 'AdminPass123!') {
        const mockUser: AdminUser = {
          id: 'user-dev-admin',
          email: 'admin@mobileswholesale.co.uk',
          name: 'Mobiles Wholesale Admin (Dev)',
          role: 'SUPER_ADMIN'
        };
        const mockToken = 'dev_mock_jwt_token_2026';
        setToken(mockToken);
        setUser(mockUser);
        localStorage.setItem('mw_admin_token', mockToken);
        localStorage.setItem('mw_admin_user', JSON.stringify(mockUser));
        return { success: true };
      }

      return { success: false, error: 'Network error or backend offline. Use default admin@mobileswholesale.co.uk / AdminPass123! in dev mode.' };
    }
  };

  const logout = () => {
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
        isAuthenticated: !!token && !!user,
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
