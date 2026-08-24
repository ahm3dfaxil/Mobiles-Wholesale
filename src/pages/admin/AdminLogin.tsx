import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, KeyRound, AlertCircle, Sparkles, Building2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../../components/common/Button';
import { UK_COMPANY_INFO } from '../../data/mockData';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@mobileswholesale.co.uk');
  const [password, setPassword] = useState('AdminPass123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const from = (location.state as any)?.from?.pathname || '/admin';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await login(email, password);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Authentication failed. Check credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F2] text-[#101A18] relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E5F3EF]/60 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-white border border-[#D8E2DE] p-8 sm:p-10 rounded-3xl b2b-card-shadow relative z-10">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-[#071715] rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-[#071715]/20 text-white">
            <ShieldCheck className="w-8 h-8 text-[#D4AF62]" />
          </div>
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-[#071715] bg-[#E5F3EF] px-3 py-1 rounded-full border border-[#D4AF62]">
            Stock Management Console
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#071715] tracking-tight">
            {t('admin.loginTitle', 'Trade Admin Portal')}
          </h1>
          <p className="text-xs text-[#596662]">
            {t('admin.loginSubtitle', 'Authorized Mobiles Wholesale inventory management desk access only.')}
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#101A18] mb-1.5">
              {t('admin.usernameLabel', 'Admin Business Email')} *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#596662]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mobileswholesale.co.uk"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F2] border border-[#D8E2DE] rounded-xl text-sm text-[#101A18] placeholder-[#596662] focus:outline-none focus:ring-2 focus:ring-[#071715] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#101A18] mb-1.5">
              {t('admin.passwordLabel', 'Password')} *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#596662]">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F2] border border-[#D8E2DE] rounded-xl text-sm text-[#101A18] placeholder-[#596662] focus:outline-none focus:ring-2 focus:ring-[#071715] focus:bg-white"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={loading}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {loading ? t('forms.submitting', 'Authenticating...') : t('admin.loginBtn', 'Sign In to Management Portal')}
          </Button>
        </form>

        {/* Demo Credentials Helper Box */}
        <div className="bg-[#FAF8F2] p-4 rounded-2xl border border-[#D8E2DE] text-xs text-[#596662] space-y-1 font-mono">
          <div className="font-bold text-[#101A18] text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF62]" /> Default Admin Login Credentials:
          </div>
          <div><span className="text-[#596662]">Email:</span> admin@mobileswholesale.co.uk</div>
          <div><span className="text-[#596662]">Password:</span> AdminPass123!</div>
        </div>
      </div>
    </div>
  );
};
