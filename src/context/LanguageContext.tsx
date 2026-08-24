import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { translateKey, LanguageCode, TranslateOptions } from '../i18n';

export interface Language {
  code: LanguageCode;
  shortName: string;
  name: string;
  dir?: 'ltr';
}

export const LANGUAGES: Language[] = [
  { code: 'en', shortName: 'EN', name: 'EN' },
  { code: 'ar', shortName: 'AR', name: 'Arabic' },
  { code: 'zh-CN', shortName: 'ZH', name: 'Chinese (Simplified)' },
  { code: 'nl', shortName: 'NL', name: 'Dutch' },
  { code: 'fr', shortName: 'FR', name: 'French' },
  { code: 'de', shortName: 'DE', name: 'German' },
  { code: 'it', shortName: 'IT', name: 'Italian' },
  { code: 'pt', shortName: 'PT', name: 'Portuguese' },
  { code: 'ru', shortName: 'RU', name: 'Russian' },
  { code: 'es', shortName: 'ES', name: 'Spanish' },
];

interface LanguageContextType {
  language: LanguageCode;
  currentLanguage: Language;
  setLanguage: (code: string) => void;
  changeLanguage: (code: string) => void;
  t: (keyPath: string, fallback?: string, options?: TranslateOptions) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const normalizeCode = (code: string): LanguageCode => {
  if (!code) return 'en';
  const c = code.trim();
  if (c === 'zh' || c === 'zh-cn' || c === 'zh-CN') return 'zh-CN';
  const found = LANGUAGES.find((l) => l.code === c);
  return found ? found.code : 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('mw_user_language');
    return saved ? normalizeCode(saved) : 'en';
  });

  const setLanguage = useCallback((code: string) => {
    const valid = normalizeCode(code);
    setLanguageState(valid);
  }, []);

  const changeLanguage = useCallback((code: string) => {
    setLanguage(code);
  }, [setLanguage]);

  useEffect(() => {
    // 1. Persist in localStorage
    localStorage.setItem('mw_user_language', language);

    // 2. Clear legacy googtrans cookies
    const hostname = window.location.hostname;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname}`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

    // 3. Keep Global Document Direction strictly Left-To-Right (LTR) for all languages
    document.documentElement.setAttribute('dir', 'ltr');
    
    // 4. Set ISO Lang attribute
    const htmlLang = language === 'zh-CN' ? 'zh' : language;
    document.documentElement.setAttribute('lang', htmlLang);
  }, [language]);

  const currentLanguage = useMemo(() => {
    return LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  }, [language]);

  const t = useCallback(
    (keyPath: string, fallback?: string, options?: TranslateOptions): string => {
      try {
        return translateKey(language, keyPath, fallback, options);
      } catch {
        return fallback || keyPath || '';
      }
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      currentLanguage,
      setLanguage,
      changeLanguage,
      t,
    }),
    [language, currentLanguage, setLanguage, changeLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
