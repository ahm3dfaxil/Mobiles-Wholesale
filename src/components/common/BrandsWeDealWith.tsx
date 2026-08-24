import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface Brand {
  id: string;
  name: string;
  logo: React.ReactNode;
}

export const BrandsWeDealWith: React.FC = () => {
  const { t } = useLanguage();
  const brands: Brand[] = [
    {
      id: 'google-pixel',
      name: 'Google Pixel',
      logo: (
        <svg 
          viewBox="0 0 105 36" 
          className="w-auto h-10 sm:h-12 max-w-[160px] sm:max-w-[190px] object-contain mx-auto transition-transform duration-300 group-hover:scale-105" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Authentic 4-Color Google G */}
          <g transform="translate(1, 5)">
            <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" fill="#4285F4"/>
            <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z" fill="#34A853"/>
            <path d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z" fill="#FBBC05"/>
            <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z" fill="#EA4335"/>
          </g>
          {/* Pixel Wordmark */}
          <text x="35" y="25" fontFamily="system-ui, -apple-system, Roboto, sans-serif" fontWeight="700" fontSize="23" fill="#0f172a" letterSpacing="-0.5">
            Pixel
          </text>
        </svg>
      ),
    },
    {
      id: 'apple-iphone',
      name: 'iPhone / Apple',
      logo: (
        <svg 
          viewBox="0 0 115 36" 
          className="w-auto h-10 sm:h-12 max-w-[170px] sm:max-w-[200px] object-contain mx-auto transition-transform duration-300 group-hover:scale-105" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Official Apple Logo Path */}
          <g transform="translate(1, 4) scale(1.1)" fill="#0f172a">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.18c.68-.83 1.14-1.98.99-3.18-1.03.04-2.3.69-3.02 1.53-.64.74-1.2 1.93-1.04 3.1 1.15.09 2.37-.62 3.07-1.45z"/>
          </g>
          {/* iPhone text */}
          <text x="34" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="23" fill="#0f172a" letterSpacing="-0.5">
            iPhone
          </text>
        </svg>
      ),
    },
    {
      id: 'alcatel',
      name: 'Alcatel',
      logo: (
        <img 
          src="/Alcatel-logo.wine.png" 
          alt="Alcatel" 
          className="w-auto h-12 sm:h-15 max-w-[170px] sm:max-w-[200px] object-contain scale-110 sm:scale-125 transition-transform duration-300 group-hover:scale-135"
        />
      ),
    },
    {
      id: 'oppo',
      name: 'OPPO',
      logo: (
        <img 
          src="/Oppo-Logo.wine.svg" 
          alt="OPPO" 
          className="w-auto h-12 sm:h-15 max-w-[180px] sm:max-w-[210px] scale-115 sm:scale-130 transition-transform duration-300 group-hover:scale-140"
        />
      ),
    },
    {
      id: 'samsung',
      name: 'Samsung',
      logo: (
        <img 
          src="/Samsung-Logo.jpg" 
          alt="Samsung" 
          className="w-auto h-11 sm:h-14 max-w-[170px] sm:max-w-[200px] object-contain mix-blend-multiply scale-110 sm:scale-120 transition-transform duration-300 group-hover:scale-130"
        />
      ),
    },
    {
      id: 'lg',
      name: 'LG',
      logo: (
        <img 
          src="/LG logo.svg" 
          alt="LG" 
          className="w-auto h-12 sm:h-15 max-w-[160px] sm:max-w-[190px] object-contain scale-115 sm:scale-130 transition-transform duration-300 group-hover:scale-140"
        />
      ),
    },
    {
      id: 'sony-xperia',
      name: 'Sony Xperia',
      logo: (
        <img 
          src="/Sony.png" 
          alt="Sony Xperia" 
          className="w-auto h-12 sm:h-15 max-w-[180px] sm:max-w-[210px] object-contain scale-115 sm:scale-130 transition-transform duration-300 group-hover:scale-140"
        />
      ),
    },
    {
      id: 'xiaomi',
      name: 'Xiaomi',
      logo: (
        <img 
          src="/Xiaomi-Logo-2014.png" 
          alt="Xiaomi" 
          className="w-auto h-11 sm:h-14 max-w-[160px] sm:max-w-[190px] object-contain scale-110 sm:scale-125 transition-transform duration-300 group-hover:scale-135"
        />
      ),
    },
    {
      id: 'motorola',
      name: 'Motorola',
      logo: (
        <img 
          src="/Motorola.png" 
          alt="Motorola" 
          className="w-auto h-12 sm:h-15 max-w-[180px] sm:max-w-[210px] object-contain scale-115 sm:scale-130 transition-transform duration-300 group-hover:scale-140"
        />
      ),
    },
    {
      id: 'huawei',
      name: 'Huawei',
      logo: (
        <img 
          src="/huawei-.png" 
          alt="Huawei" 
          className="w-auto h-13 sm:h-16 max-w-[190px] sm:max-w-[220px] object-contain scale-115 sm:scale-130 transition-transform duration-300 group-hover:scale-140"
        />
      ),
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white text-[#071715] rounded-2xl sm:rounded-3xl border border-[#D8E2DE] p-6 sm:p-8 b2b-card-shadow overflow-hidden relative marquee-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 px-2 relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-xs font-black text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              {t('brandsNetwork.badge', 'Brand Supply Network')}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#071715] tracking-tight">
              {t('brandsNetwork.title', 'Brands We Deal With')}
            </h2>
          </div>
          <span className="text-xs text-[#596662] font-medium hidden md:block">
            {t('brandsNetwork.subtitle', 'Official & Refurbished Wholesale Stock')}
          </span>
        </div>

        {/* Marquee Strip Container */}
        <div className="relative overflow-hidden py-3">
          {/* Gradient Edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Marquee Track */}
          <div
            className="animate-marquee flex gap-5 sm:gap-7 items-center"
            style={{ animationDuration: '18s' }}
          >
            {/* First Copy */}
            <div className="flex gap-5 sm:gap-7 items-center shrink-0">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="h-22 sm:h-28 px-8 sm:px-11 bg-white hover:bg-[#FAF8F2] rounded-2xl border border-[#D8E2DE] hover:border-[#D4AF62] transition-all duration-300 flex items-center justify-center shrink-0 shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer group overflow-hidden"
                  title={`${brand.name} Wholesale Stock`}
                >
                  {brand.logo}
                </div>
              ))}
            </div>

            {/* Second Copy (Seamless Loop Duplicate) */}
            <div className="flex gap-5 sm:gap-7 items-center shrink-0" aria-hidden="true">
              {brands.map((brand) => (
                <div
                  key={`${brand.id}-dup`}
                  className="h-22 sm:h-28 px-8 sm:px-11 bg-white hover:bg-[#FAF8F2] rounded-2xl border border-[#D8E2DE] hover:border-[#D4AF62] transition-all duration-300 flex items-center justify-center shrink-0 shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer group overflow-hidden"
                  title={`${brand.name} Wholesale Stock`}
                >
                  {brand.logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

