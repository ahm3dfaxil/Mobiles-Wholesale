import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, Phone, Truck, X, ChevronDown } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useLanguage } from '../../context/LanguageContext';
import { createWhatsAppGeneralUrl } from '../../utils/whatsapp';

interface HeaderProps { 
  onRequestStockList?: () => void; 
}

export const Header: React.FC<HeaderProps> = ({ onRequestStockList }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setOpen(false);
  }, [location.pathname]);

  const wholesaleLinks = [
    { label: t('navigation.wholesale', 'Wholesale Overview'), path: '/wholesale' },
    { label: t('navigation.bulkBuy', 'Bulk Buy'), path: '/wholesale/bulk-buy' },
    { label: t('navigation.buyStock', 'Buy Stock'), path: '/wholesale/buy-stock' },
    { label: t('navigation.getAQuote', 'Get a Quote'), path: '/wholesale/get-a-quote' },
    { label: t('navigation.howToBuy', 'How to Buy'), path: '/wholesale/how-to-buy' },
    { label: t('navigation.openAccount', 'Open Trade Account'), path: '/wholesale/open-account' },
    { label: t('navigation.tabletsWholesale', 'Tablets Wholesale'), path: '/wholesale/tablets-wholesale' },
    { label: t('navigation.laptopsWholesale', 'Laptops Wholesale'), path: '/wholesale/laptops-wholesale' },
    { label: t('navigation.wearablesWholesale', 'Wearables Wholesale'), path: '/wholesale/wearables-wholesale' },
    { label: 'iPhones Wholesale', path: '/iphones' },
    { label: 'Samsung Wholesale', path: '/samsungs' },
    { label: 'Google Pixel Wholesale', path: '/google-pixel' }
  ];

  const servicesLinks = [
    { label: t('navigation.sellToUs', 'Sell To Us'), path: '/sell-to-us' },
    { label: t('navigation.diagnostics', 'Diagnostics'), path: '/services/diagnostics' },
    { label: t('navigation.recycling', 'Recycling'), path: '/services/recycling' },
    { label: t('navigation.repair', 'Repair'), path: '/services/repair' }
  ];

  const resourcesLinks = [
    { label: t('navigation.howWeGrade', 'How We Grade'), path: '/how-we-grade' },
    { label: t('navigation.warrantyAndReturns', 'Warranty & Returns'), path: '/warranty-and-returns' },
    { label: t('navigation.stockList', 'Stock List Catalog'), path: '/stock-list' },
    { label: t('navigation.stockOffers', 'Stock Offers'), path: '/stock-offers' },
    { label: t('navigation.faqs', 'FAQs'), path: '/faqs' },
    { label: t('navigation.aboutUs', 'About Us'), path: '/about' }
  ];

  return (
    <>
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#063F35] border-b border-[#071715] text-xs py-2 relative z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 text-[#DCE8E4]">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-2 font-bold text-white tracking-wide uppercase text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#00A88F] animate-pulse" /> 
              <span>{t('navigation.topLiveUkStock', 'LIVE UK STOCK UPDATED TODAY')}</span>
            </span>
            <span className="hidden md:inline text-[#D4AF62] select-none">│</span>
            <span className="hidden md:flex items-center gap-1.5 font-medium text-[#DCE8E4]">
              <Truck className="w-3.5 h-3.5 text-[#00A88F]" /> 
              <span>{t('navigation.topInsuredDelivery', 'Insured UK Next-Day Courier')}</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-4 relative z-[100]">
            <LanguageSelector />
            <span className="text-[#D4AF62]/50 select-none">│</span>
            <a 
              href="tel:+442080044421" 
              className="flex items-center gap-1.5 font-mono font-bold text-[#DCE8E4] hover:text-[#00A88F] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#00A88F]" /> 
              <span>+44 20 8004 4421</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <header className={`sticky top-0 z-50 w-full text-white header-glass-dark border-b border-[#063F35]/70 transition-all duration-200 ${
        scrolled ? 'shadow-xl shadow-black/30' : 'shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[5.25rem] sm:h-[5.75rem] gap-2 lg:gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center py-1 shrink-0">
              <img 
                src="/mobiles-wholesale-logo.1-removebg-preview.png" 
                alt="Mobiles Wholesale" 
                className="h-16 sm:h-20 lg:h-22 w-auto object-contain transition-transform hover:scale-110 brightness-110 drop-shadow-md origin-left" 
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Home */}
              <Link
                to="/"
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  location.pathname === '/'
                    ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                    : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                }`}
              >
                {t('navigation.home', 'Home')}
              </Link>

              {/* Live Stock */}
              <Link
                to="/stock"
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  location.pathname === '/stock' || location.pathname === '/stock-list'
                    ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                    : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                }`}
              >
                {t('navigation.liveStock', 'Live Stock')}
              </Link>

              {/* Wholesale Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('wholesale')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all whitespace-nowrap ${
                    location.pathname.startsWith('/wholesale') || location.pathname === '/iphones' || location.pathname === '/samsungs' || location.pathname === '/google-pixel'
                      ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                      : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{t('navigation.wholesaleDropdown', 'Wholesale')}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {activeDropdown === 'wholesale' && (
                  <div className="absolute left-0 top-full pt-1 w-64 z-50">
                    <div className="bg-[#071715] border border-[#063F35] rounded-xl shadow-2xl p-2 grid gap-0.5">
                      {wholesaleLinks.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                            location.pathname === item.path
                              ? 'text-[#D4AF62] bg-[#D4AF62]/10 font-bold'
                              : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all whitespace-nowrap ${
                    location.pathname.startsWith('/services')
                      ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                      : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{t('navigation.servicesDropdown', 'Services')}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {activeDropdown === 'services' && (
                  <div className="absolute left-0 top-full pt-1 w-56 z-50">
                    <div className="bg-[#071715] border border-[#063F35] rounded-xl shadow-2xl p-2 grid gap-0.5">
                      {servicesLinks.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                            location.pathname === item.path
                              ? 'text-[#D4AF62] bg-[#D4AF62]/10 font-bold'
                              : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all whitespace-nowrap ${
                    location.pathname === '/how-we-grade' || location.pathname === '/warranty-and-returns' || location.pathname === '/faqs' || location.pathname === '/grading' || location.pathname === '/about'
                      ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                      : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{t('navigation.resourcesDropdown', 'Resources')}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {activeDropdown === 'resources' && (
                  <div className="absolute left-0 top-full pt-1 w-56 z-50">
                    <div className="bg-[#071715] border border-[#063F35] rounded-xl shadow-2xl p-2 grid gap-0.5">
                      {resourcesLinks.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                            location.pathname === item.path
                              ? 'text-[#D4AF62] bg-[#D4AF62]/10 font-bold'
                              : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Trade Application */}
              <Link
                to="/business"
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  location.pathname === '/business'
                    ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                    : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                }`}
              >
                {t('navigation.tradeApplication', 'Trade Application')}
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  location.pathname === '/contact'
                    ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                    : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                }`}
              >
                {t('navigation.contact', 'Contact')}
              </Link>
            </nav>

            {/* Header Action CTAs */}
            <div className="hidden sm:flex items-center gap-2.5 xl:gap-3 shrink-0">
              <Link to="/contact">
                <button
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-xl text-xs font-bold text-white bg-[rgba(255,255,255,0.06)] border border-[#D4AF62]/55 hover:bg-[#D4AF62]/15 hover:border-[#D4AF62] transition-all shadow-2xs cursor-pointer whitespace-nowrap"
                >
                  <FileText className="w-4 h-4 text-[#D4AF62]" />
                  <span>{t('common.requestPricing', 'Request Pricing')}</span>
                </button>
              </Link>
              <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noreferrer">
                <button className="inline-flex items-center justify-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-xl text-xs font-black text-white bg-[#00A88F] hover:bg-[#007A68] transition-all glow-emerald shadow-md cursor-pointer whitespace-nowrap">
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{t('common.whatsappTradeDesk', 'WhatsApp Trade Desk')}</span>
                </button>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-[#DCE8E4] rounded-lg hover:bg-white/10 shrink-0">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <nav className="lg:hidden p-4 bg-[#071715] border-t border-[#063F35] grid gap-1 shadow-2xl max-h-[80vh] overflow-y-auto">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                location.pathname === '/' ? 'text-[#D4AF62] bg-[#D4AF62]/10' : 'text-[#DCE8E4] hover:bg-white/5'
              }`}
            >
              {t('navigation.home', 'Home')}
            </Link>

            <Link
              to="/stock"
              onClick={() => setOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                location.pathname === '/stock' || location.pathname === '/stock-list' ? 'text-[#D4AF62] bg-[#D4AF62]/10' : 'text-[#DCE8E4] hover:bg-white/5'
              }`}
            >
              {t('navigation.liveStock', 'Live Stock')}
            </Link>

            <div className="pt-2 border-t border-[#063F35]">
              <div className="px-4 text-[10px] font-black text-[#D4AF62] uppercase tracking-wider mb-1">Wholesale</div>
              {wholesaleLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="px-4 py-1.5 block text-xs font-semibold text-[#DCE8E4] hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-[#063F35]">
              <div className="px-4 text-[10px] font-black text-[#D4AF62] uppercase tracking-wider mb-1">Services</div>
              {servicesLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="px-4 py-1.5 block text-xs font-semibold text-[#DCE8E4] hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-[#063F35]">
              <div className="px-4 text-[10px] font-black text-[#D4AF62] uppercase tracking-wider mb-1">Resources</div>
              {resourcesLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="px-4 py-1.5 block text-xs font-semibold text-[#DCE8E4] hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              to="/business"
              onClick={() => setOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border-t border-[#063F35] mt-1 ${
                location.pathname === '/business' ? 'text-[#D4AF62] bg-[#D4AF62]/10' : 'text-[#DCE8E4] hover:bg-white/5'
              }`}
            >
              {t('navigation.tradeApplication', 'Trade Application')}
            </Link>

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                location.pathname === '/contact' ? 'text-[#D4AF62] bg-[#D4AF62]/10' : 'text-[#DCE8E4] hover:bg-white/5'
              }`}
            >
              {t('navigation.contact', 'Contact')}
            </Link>

            <div className="pt-3 border-t border-[#063F35] flex flex-col gap-2">
              <Link to="/contact" onClick={() => setOpen(false)}>
                <button
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[rgba(255,255,255,0.06)] border border-[#D4AF62]/55 flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#D4AF62]" />
                  <span>{t('common.requestPricing', 'Request Pricing')}</span>
                </button>
              </Link>
              <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noreferrer">
                <button className="w-full py-2.5 rounded-xl text-xs font-black text-white bg-[#00A88F] flex items-center justify-center gap-2 glow-emerald">
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{t('common.whatsappTradeDesk', 'WhatsApp Trade Desk')}</span>
                </button>
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};
