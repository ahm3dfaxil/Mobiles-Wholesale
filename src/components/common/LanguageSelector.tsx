import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage, LANGUAGES, Language } from '../../context/LanguageContext';
import { FlagIcon } from './FlagIcon';

interface LanguageSelectorProps {
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ compact = false }) => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang: Language) => {
    changeLanguage(lang.code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left notranslate z-[100]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-bold transition-all cursor-pointer select-none border ${
          isOpen 
            ? 'bg-white text-stone-900 border-stone-300 shadow-2xs' 
            : 'text-stone-800 border-transparent hover:bg-stone-200/70'
        }`}
        aria-expanded={isOpen}
      >
        <FlagIcon code={currentLanguage.code} className="w-5 h-3.5 rounded-2xs object-cover shadow-2xs shrink-0" />
        <span className="font-extrabold tracking-wide uppercase">{currentLanguage.shortName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-2xl border border-stone-200 py-1.5 z-[999] max-h-80 overflow-y-auto ring-1 ring-black/5">
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLanguage.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className={`w-full px-4 py-2.5 flex items-center gap-3 text-xs font-medium transition-colors text-left cursor-pointer ${
                  isSelected
                    ? 'bg-[#5c6e97] text-white font-semibold'
                    : 'text-stone-700 hover:bg-[#5c6e97] hover:text-white'
                }`}
              >
                <FlagIcon code={lang.code} className="w-5 h-3.5 rounded-2xs shrink-0 object-cover shadow-2xs" />
                <span className="flex-1 truncate">{lang.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
