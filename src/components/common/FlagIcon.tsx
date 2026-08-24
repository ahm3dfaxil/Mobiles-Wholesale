import React from 'react';

interface FlagIconProps {
  code: string;
  className?: string;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ code, className = "w-6 h-4 rounded-xs shadow-2xs inline-block" }) => {
  switch (code) {
    case 'en': // UK / English Flag
      return (
        <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="uk-clip"><rect width="60" height="40" rx="2" /></clipPath>
          <g clipPath="url(#uk-clip)">
            <rect width="60" height="40" fill="#012169" />
            <path d="M0 0L60 40M60 0L0 40" stroke="#FFFFFF" strokeWidth="8" />
            <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4" />
            <path d="M30 0V40M0 20H60" stroke="#FFFFFF" strokeWidth="12" />
            <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="7" />
          </g>
        </svg>
      );

    case 'ar': // Arabic / Green Flag with emblem
      return (
        <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="ar-clip"><rect width="60" height="40" rx="2" /></clipPath>
          <g clipPath="url(#ar-clip)">
            <rect width="60" height="40" fill="#006C35" />
            <circle cx="30" cy="20" r="9" fill="#005228" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M25 20C25 17.5 27 15.5 29.5 15.5C30.5 15.5 31.5 15.9 32.2 16.6C31.5 16 30.5 15.5 29.5 15.5C27 15.5 25 17.5 25 20Z" fill="#FFFFFF" />
            <circle cx="30" cy="20" r="4" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            <path d="M26 23L34 23M30 16L30 24" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'zh-CN': // Chinese (Simplified) Flag
      return (
        <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="cn-clip"><rect width="60" height="40" rx="2" /></clipPath>
          <g clipPath="url(#cn-clip)">
            <rect width="60" height="40" fill="#DE2910" />
            {/* Big star */}
            <polygon points="12,6 14.2,12.5 20.8,12.5 15.5,16.5 17.5,23 12,19 6.5,23 8.5,16.5 3.2,12.5 9.8,12.5" fill="#FFDE00" />
            {/* 4 small stars */}
            <polygon points="23,5 24,7 26,7 24.5,8.5 25,10.5 23,9 21,10.5 21.5,8.5 20,7 22,7" fill="#FFDE00" />
            <polygon points="26,10 27,12 29,12 27.5,13.5 28,15.5 26,14 24,15.5 24.5,13.5 23,12 25,12" fill="#FFDE00" />
            <polygon points="26,17 27,19 29,19 27.5,20.5 28,22.5 26,21 24,22.5 24.5,20.5 23,19 25,19" fill="#FFDE00" />
            <polygon points="23,22 24,24 26,24 24.5,25.5 25,27.5 23,26 21,27.5 21.5,25.5 20,24 22,24" fill="#FFDE00" />
          </g>
        </svg>
      );

    case 'nl': // Dutch Flag
      return (
        <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="nl-clip"><rect width="60" height="40" rx="2" /></clipPath>
          <g clipPath="url(#nl-clip)">
            <rect width="60" height="13.33" fill="#AE1C28" />
            <rect y="13.33" width="60" height="13.33" fill="#FFFFFF" />
            <rect y="26.66" width="60" height="13.34" fill="#21468B" />
          </g>
        </svg>
      );

    case 'fr': // French Flag
      return (
        <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="fr-clip"><rect width="60" height="40" rx="2" /></clipPath>
          <g clipPath="url(#fr-clip)">
            <rect width="20" height="40" fill="#002395" />
            <rect x="20" width="20" height="40" fill="#FFFFFF" />
            <rect x="40" width="20" height="40" fill="#ED2939" />
          </g>
        </svg>
      );

    case 'de': // German Flag
      return (
        <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="de-clip"><rect width="60" height="40" rx="2" /></clipPath>
          <g clipPath="url(#de-clip)">
            <rect width="60" height="13.33" fill="#000000" />
            <rect y="13.33" width="60" height="13.33" fill="#DD0000" />
            <rect y="26.66" width="60" height="13.34" fill="#FFCE00" />
          </g>
        </svg>
      );

    case 'it': // Italian Flag
      return (
        <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="it-clip"><rect width="60" height="40" rx="2" /></clipPath>
          <g clipPath="url(#it-clip)">
            <rect width="20" height="40" fill="#009246" />
            <rect x="20" width="20" height="40" fill="#F1F2F1" />
            <rect x="40" width="20" height="40" fill="#CE2B37" />
          </g>
        </svg>
      );

    case 'pt': // Portuguese Flag
      return (
        <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="pt-clip"><rect width="60" height="40" rx="2" /></clipPath>
          <g clipPath="url(#pt-clip)">
            <rect width="24" height="40" fill="#006600" />
            <rect x="24" width="36" height="40" fill="#FF0000" />
            <circle cx="24" cy="20" r="7" fill="#FFCC00" stroke="#000000" strokeWidth="0.5" />
            <rect x="21" y="17" width="6" height="6" fill="#FFFFFF" stroke="#000000" strokeWidth="0.5" />
            <rect x="22.5" y="18.5" width="3" height="3" fill="#000099" />
          </g>
        </svg>
      );

    case 'ru': // Russian Flag
      return (
        <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="ru-clip"><rect width="60" height="40" rx="2" /></clipPath>
          <g clipPath="url(#ru-clip)">
            <rect width="60" height="13.33" fill="#FFFFFF" />
            <rect y="13.33" width="60" height="13.33" fill="#0039A6" />
            <rect y="26.66" width="60" height="13.34" fill="#D52B1E" />
          </g>
        </svg>
      );

    case 'es': // Spanish Flag
      return (
        <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="es-clip"><rect width="60" height="40" rx="2" /></clipPath>
          <g clipPath="url(#es-clip)">
            <rect width="60" height="10" fill="#AA151B" />
            <rect y="10" width="60" height="20" fill="#F1BF00" />
            <rect y="30" width="60" height="10" fill="#AA151B" />
            <rect x="14" y="15" width="7" height="10" fill="#AA151B" rx="1" />
            <circle cx="17.5" cy="13" r="2.5" fill="#AA151B" />
          </g>
        </svg>
      );

    default:
      return null;
  }
};
