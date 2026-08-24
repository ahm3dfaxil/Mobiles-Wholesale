import { en } from './locales/en';
import { ar } from './locales/ar';
import { zh } from './locales/zh';
import { nl } from './locales/nl';
import { fr } from './locales/fr';
import { de } from './locales/de';
import { it } from './locales/it';
import { pt } from './locales/pt';
import { ru } from './locales/ru';
import { es } from './locales/es';

export type LanguageCode = 'en' | 'ar' | 'zh-CN' | 'nl' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'es';

export const LOCALES: Record<string, any> = {
  en,
  ar,
  zh,
  'zh-CN': zh,
  'zh-cn': zh,
  nl,
  fr,
  de,
  it,
  pt,
  ru,
  es
};

export type TranslateOptions = Record<string, string | number | boolean>;

const getNestedValue = (obj: any, path: string): string | undefined => {
  if (!obj || !path) return undefined;
  const parts = path.split('.');
  let curr = obj;
  for (const part of parts) {
    if (curr && typeof curr === 'object' && part in curr) {
      curr = curr[part];
    } else {
      return undefined;
    }
  }
  return typeof curr === 'string' ? curr : undefined;
};

const interpolate = (template: string, options?: TranslateOptions): string => {
  if (!template || !options) return template;
  return Object.keys(options).reduce((acc, key) => {
    const val = options[key];
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    return acc.replace(regex, String(val));
  }, template);
};

export const translateKey = (
  langCode: string,
  keyPath: string,
  fallback?: string,
  options?: TranslateOptions
): string => {
  if (!keyPath) return fallback || '';

  const normCode = (langCode || 'en').toLowerCase().startsWith('zh') ? 'zh-CN' : langCode;
  const currentDict = LOCALES[normCode] || LOCALES[langCode] || LOCALES['en'];

  let rawResult = getNestedValue(currentDict, keyPath);

  // Development missing key warning logging
  const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development' ||
                (typeof import.meta !== 'undefined' && (import.meta as any).env?.DEV);

  if (rawResult === undefined && normCode !== 'en') {
    if (isDev) {
      console.warn(`[i18n] Missing translation:\n  language: ${normCode}\n  key: ${keyPath}`);
    }
    const fallbackDict = LOCALES['en'];
    rawResult = getNestedValue(fallbackDict, keyPath);
  }

  const finalStr = rawResult !== undefined ? rawResult : (fallback || keyPath);
  return interpolate(finalStr, options);
};
