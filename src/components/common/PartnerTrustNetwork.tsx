import React from 'react';
import { Truck, Globe, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Partner {
  id: string;
  name: string;
  category?: string;
  logo: React.ReactNode;
}

export const PartnerTrustNetwork: React.FC = () => {
  const { t } = useLanguage();
  const logisticsPartners: Partner[] = [
    {
      id: 'dhl',
      name: 'DHL Express',
      logo: (
        <div className="flex items-center gap-3">
          <div className="bg-[#FFCC00] text-[#D40511] font-black italic text-lg sm:text-xl tracking-tighter px-3.5 py-1 rounded shadow-2xs border border-[#e5b800]">
            DHL
          </div>
          <span className="text-base sm:text-lg font-black text-stone-800 tracking-tight">Express</span>
        </div>
      ),
    },
    {
      id: 'royal-mail',
      name: 'Royal Mail',
      logo: (
        <div className="flex items-center gap-3">
          <div className="bg-[#D00000] text-white font-black text-sm sm:text-base px-3.5 py-1 rounded flex items-center gap-1.5 shadow-2xs">
            <span className="text-[#FFD700] text-base sm:text-lg">👑</span> Royal Mail
          </div>
          <span className="text-xs sm:text-sm font-extrabold text-stone-700 hidden sm:inline bg-[#f4efe4] px-3 py-1 rounded border border-[#e6dfd1]">Tracked 24</span>
        </div>
      ),
    },
    {
      id: 'fedex',
      name: 'FedEx',
      logo: (
        <div className="flex items-center text-2xl sm:text-3xl font-black tracking-tighter">
          <span className="text-[#4D148C]">Fed</span>
          <span className="text-[#FF6600]">Ex</span>
        </div>
      ),
    },
    {
      id: 'transglobal-express',
      name: 'Transglobal Express',
      logo: (
        <div className="flex items-center gap-2.5">
          <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-[#0a4d3c]" />
          <span className="text-base sm:text-lg font-black text-stone-900 tracking-tight">Transglobal <span className="text-[#0a4d3c]">Express</span></span>
        </div>
      ),
    },
    {
      id: 'palletways',
      name: 'Palletways',
      logo: (
        <div className="flex items-center gap-2.5">
          <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-[#a38038]" />
          <span className="text-base sm:text-lg font-black uppercase text-stone-900 tracking-wider">Palletways</span>
        </div>
      ),
    },
  ];

  const businessPartners: Partner[] = [
    {
      id: 'gsm-exchange',
      name: 'GSM Exchange',
      category: 'B2B Trading Network',
      logo: (
        <div className="flex items-center gap-2.5">
          <span className="text-lg sm:text-xl font-black text-[#0a4d3c] tracking-tight">GSM</span>
          <span className="text-base sm:text-lg font-extrabold text-stone-800">Exchange</span>
        </div>
      ),
    },
    {
      id: 'esources',
      name: 'eSources',
      category: 'UK Wholesale Directory',
      logo: (
        <div className="flex items-center gap-1">
          <span className="text-lg sm:text-xl font-black text-stone-900">e</span>
          <span className="text-lg sm:text-xl font-black text-[#0a4d3c]">Sources</span>
          <span className="text-xs text-stone-500 font-extrabold">.co.uk</span>
        </div>
      ),
    },
    {
      id: 'amazon-business',
      name: 'Amazon Business',
      category: 'B2B Marketplace',
      logo: (
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl font-black text-stone-900">amazon</span>
          <span className="text-xs sm:text-sm font-extrabold text-[#a38038] uppercase tracking-wide">business</span>
        </div>
      ),
    },
    {
      id: 'onbuy',
      name: 'OnBuy',
      category: 'UK Marketplace',
      logo: (
        <div className="flex items-center">
          <span className="text-2xl sm:text-3xl font-black text-[#0a4d3c] tracking-tighter">On</span>
          <span className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tighter">Buy</span>
          <span className="text-xs text-[#a38038] font-extrabold ml-0.5">.com</span>
        </div>
      ),
    },
    {
      id: 'back-market',
      name: 'Back Market',
      category: 'Refurbished Platform',
      logo: (
        <div className="flex items-center gap-1">
          <span className="text-base sm:text-lg font-black text-stone-900 bg-[#f4efe4] px-3.5 py-1.5 rounded-xl border border-[#e6dfd1]">
            Back<span className="text-[#0a4d3c]">Market</span>
          </span>
        </div>
      ),
    },
    {
      id: 'ebay-business',
      name: 'eBay Business',
      category: 'Global Marketplace',
      logo: (
        <div className="flex items-center text-lg sm:text-xl font-black tracking-tight">
          <span className="text-[#E53238]">e</span>
          <span className="text-[#0064D2]">b</span>
          <span className="text-[#F5AF02]">a</span>
          <span className="text-[#86B817]">y</span>
          <span className="text-base sm:text-lg text-stone-800 font-black ml-2">Business</span>
        </div>
      ),
    },
    {
      id: 'a1-tech-deals',
      name: 'A1 Tech Deals',
      category: 'Electronics Trade',
      logo: (
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black text-white bg-[#0a4d3c] px-3 py-1 rounded-md">A1</span>
          <span className="text-sm sm:text-base font-extrabold text-stone-800">Tech Deals</span>
        </div>
      ),
    },
    {
      id: 'wowcher',
      name: 'Wowcher',
      category: 'Promotional Deals',
      logo: (
        <div className="flex items-center">
          <span className="text-lg sm:text-xl font-black text-[#FF0055] tracking-tight">WOWCHER</span>
        </div>
      ),
    },
    {
      id: 'gogroopie',
      name: 'GoGroopie',
      category: 'Retail Network',
      logo: (
        <div className="flex items-center">
          <span className="text-base sm:text-lg font-black text-purple-700">Go</span>
          <span className="text-base sm:text-lg font-black text-stone-900">Groopie</span>
        </div>
      ),
    },
    {
      id: 'temu',
      name: 'Temu',
      category: 'Global Platform',
      logo: (
        <div className="flex items-center">
          <span className="text-xs sm:text-sm font-black text-[#FB7701] uppercase tracking-wider bg-[#FFF2E6] px-3.5 py-1.5 rounded-lg border border-[#FFD8B3]">
            TEMU
          </span>
        </div>
      ),
    },
    {
      id: 'walmart',
      name: 'Walmart',
      category: 'Retail Partner',
      logo: (
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl font-black text-[#0071DC] tracking-tight">Walmart</span>
          <span className="text-[#FFC220] text-base sm:text-lg">☀️</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 2. TRUSTED LOGISTICS PARTNERS */}
      <section className="bg-white rounded-2xl sm:rounded-3xl border border-[#D8E2DE] p-5 sm:p-7 b2b-card-shadow overflow-hidden relative marquee-container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 px-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              <Truck className="w-3.5 h-3.5 text-[#007A68]" /> {t('brandsNetwork.logisticsBadge', 'Logistics Network')}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#071715] tracking-tight">
              {t('brandsNetwork.logisticsTitle', 'Trusted Logistics Partners')}
            </h3>
          </div>
          <span className="text-xs text-[#596662] font-medium hidden md:block">
            {t('brandsNetwork.logisticsSubtitle', 'Fast UK & Worldwide Courier Delivery')}
          </span>
        </div>

        <div className="relative overflow-hidden py-3">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <div
            className="animate-marquee flex gap-5 sm:gap-7 items-center"
            style={{ animationDuration: '16s' }}
          >
            <div className="flex gap-5 sm:gap-7 items-center shrink-0">
              {logisticsPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="h-22 sm:h-28 px-8 sm:px-11 bg-white hover:bg-[#FAF8F2] rounded-2xl border border-[#D8E2DE] hover:border-[#D4AF62] transition-all duration-300 flex items-center justify-center shrink-0 shadow-2xs hover:shadow-md cursor-default group overflow-hidden"
                  title={`${partner.name} Logistics Partner`}
                >
                  {partner.logo}
                </div>
              ))}
            </div>

            <div className="flex gap-5 sm:gap-7 items-center shrink-0" aria-hidden="true">
              {logisticsPartners.map((partner) => (
                <div
                  key={`${partner.id}-dup`}
                  className="h-22 sm:h-28 px-8 sm:px-11 bg-white hover:bg-[#FAF8F2] rounded-2xl border border-[#D8E2DE] hover:border-[#D4AF62] transition-all duration-300 flex items-center justify-center shrink-0 shadow-2xs hover:shadow-md cursor-default group overflow-hidden"
                  title={`${partner.name} Logistics Partner`}
                >
                  {partner.logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUSTED PARTNERS */}
      <section className="bg-white rounded-2xl sm:rounded-3xl border border-[#D8E2DE] p-5 sm:p-7 b2b-card-shadow overflow-hidden relative marquee-container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 px-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D8E2DE]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#007A68]" /> {t('brandsNetwork.ecosystemBadge', 'Industry Ecosystem')}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#101A18] tracking-tight">
              {t('brandsNetwork.ecosystemTitle', 'Trusted Partners')}
            </h3>
          </div>
          <span className="text-xs text-[#596662] font-medium hidden md:block">
            {t('brandsNetwork.ecosystemSubtitle', 'Connected Marketplaces & Business Platforms')}
          </span>
        </div>

        <div className="relative overflow-hidden py-3">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <div
            className="animate-marquee flex gap-5 sm:gap-7 items-center"
            style={{ animationDuration: '20s' }}
          >
            <div className="flex gap-5 sm:gap-7 items-center shrink-0">
              {businessPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="h-22 sm:h-28 px-8 sm:px-11 bg-white hover:bg-[#FAF8F2] rounded-2xl border border-[#D8E2DE] hover:border-[#007A68] transition-all duration-300 flex items-center justify-center shrink-0 shadow-2xs hover:shadow-md cursor-default group overflow-hidden"
                  title={`${partner.name} - ${partner.category}`}
                >
                  {partner.logo}
                </div>
              ))}
            </div>

            <div className="flex gap-5 sm:gap-7 items-center shrink-0" aria-hidden="true">
              {businessPartners.map((partner) => (
                <div
                  key={`${partner.id}-dup`}
                  className="h-22 sm:h-28 px-8 sm:px-11 bg-white hover:bg-[#FAF8F2] rounded-2xl border border-[#D8E2DE] hover:border-[#007A68] transition-all duration-300 flex items-center justify-center shrink-0 shadow-2xs hover:shadow-md cursor-default group overflow-hidden"
                  title={`${partner.name} - ${partner.category}`}
                >
                  {partner.logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

