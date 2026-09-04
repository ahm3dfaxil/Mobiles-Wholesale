import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, Phone, Truck, X, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useLanguage } from '../../context/LanguageContext';
import { createWhatsAppGeneralUrl } from '../../utils/whatsapp';
import { useCart } from '../../context/CartContext';

interface HeaderProps { 
  onRequestStockList?: () => void; 
}

export const Header: React.FC<HeaderProps> = ({ onRequestStockList }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordions, setMobileAccordions] = useState<{ [key: string]: boolean }>({
    liveStock: false,
    wholesale: false,
    services: false,
    resources: false
  });
  
  const location = useLocation();
  const { t } = useLanguage();
  const { totalItems } = useCart();
  const headerRef = useRef<HTMLElement>(null);


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

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileAccordion = (key: string) => {
    setMobileAccordions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const liveStockLinks = [
    { label: t('navigation.viewLiveStock', 'View Live Stock'), path: '/stock' },
    { label: t('navigation.stockList', 'Stock List Catalog'), path: '/stock-list' },
    { label: t('navigation.stockOffers', 'Stock Offers'), path: '/stock-offers' }
  ];

  const buyingWholesaleLinks = [
    { label: t('navigation.bulkBuy', 'Bulk Buy'), path: '/wholesale/bulk-buy' },
    { label: t('navigation.buyStock', 'Buy Stock'), path: '/wholesale/buy-stock' },
    { label: t('navigation.getAQuote', 'Get a Quote'), path: '/wholesale/get-a-quote' },
    { label: t('navigation.howToBuy', 'How to Buy'), path: '/wholesale/how-to-buy' },
    { label: t('navigation.openAccount', 'Open Trade Account'), path: '/wholesale/open-account' }
  ];

  const shopByCategoryLinks = [
    { label: t('navigation.tabletsWholesale', 'Tablets Wholesale'), path: '/wholesale/tablets-wholesale' },
    { label: t('navigation.laptopsWholesale', 'Laptops Wholesale'), path: '/wholesale/laptops-wholesale' },
    { label: t('navigation.wearablesWholesale', 'Wearables Wholesale'), path: '/wholesale/wearables-wholesale' }
  ];

  const shopByBrandLinks = [
    { label: 'iPhones Wholesale', path: '/iphones' },
    { label: 'Samsung Wholesale', path: '/samsungs' },
    { label: 'Google Pixel Wholesale', path: '/google-pixel' }
  ];

  const servicesLinks = [
    { label: t('navigation.sellToUs', 'Sell to Us'), path: '/sell-to-us' },
    { label: t('navigation.diagnostics', 'Diagnostics'), path: '/services/diagnostics' },
    { label: t('navigation.repair', 'Repair'), path: '/services/repair' },
    { label: t('navigation.recycling', 'Recycling'), path: '/services/recycling' }
  ];

  const sectorsLinks = [
    { label: 'Public', path: '/retail' },
    { label: 'Education', path: '/education' },
    { label: 'Corporate', path: '/corporate' }
  ];

  const resourcesLinks = [
    { label: t('navigation.howWeGrade', 'How We Grade'), path: '/grading' },
    { label: t('navigation.warrantyAndReturns', 'Warranty & Returns'), path: '/warranty-and-returns' },
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
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full text-white header-glass-dark border-b border-[#063F35]/70 transition-all duration-200 ${
          scrolled ? 'shadow-xl shadow-black/30' : 'shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[5.25rem] sm:h-[5.75rem] gap-1 sm:gap-2 lg:gap-3">
            {/* Logo - Shifted left */}
            <Link to="/" className="flex items-center py-1 shrink-0 -ml-2 sm:-ml-4 lg:-ml-6 transition-all">
              <img 
                src="/mobiles-wholesale-logo.1-removebg-preview.png" 
                alt="Mobiles Wholesale" 
                className="h-16 sm:h-20 lg:h-22 w-auto object-contain transition-transform hover:scale-105 brightness-110 drop-shadow-md origin-left" 
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
              {/* 1. Home */}
              <Link
                to="/"
                className={`px-2 xl:px-2.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  location.pathname === '/'
                    ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                    : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                }`}
              >
                {t('navigation.home', 'Home')}
              </Link>

              {/* 2. Live Stock Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('liveStock')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center">
                  <Link
                    to="/stock"
                    className={`px-2 xl:px-2.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all whitespace-nowrap ${
                      location.pathname === '/stock' || location.pathname === '/stock-list' || location.pathname === '/stock-offers'
                        ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                        : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{t('navigation.liveStock', 'Live Stock')}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                  </Link>
                </div>

                {activeDropdown === 'liveStock' && (
                  <div className="absolute left-0 top-full pt-1 w-56 z-50">
                    <div className="bg-[#071715] border border-[#063F35] rounded-xl shadow-2xl p-2 grid gap-0.5">
                      {liveStockLinks.map((item) => (
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

              {/* 3. Wholesale Mega-Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('wholesale')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to="/wholesale"
                  className={`px-2 xl:px-2.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all whitespace-nowrap ${
                    location.pathname.startsWith('/wholesale') || location.pathname === '/iphones' || location.pathname === '/samsungs' || location.pathname === '/google-pixel'
                      ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                      : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{t('navigation.wholesaleDropdown', 'Wholesale')}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </Link>

                {activeDropdown === 'wholesale' && (
                  <div className="absolute -left-12 xl:left-0 top-full pt-1.5 w-[680px] max-w-[90vw] z-50">
                    <div className="bg-[#071715] border border-[#063F35] rounded-2xl shadow-2xl p-5 grid grid-cols-3 gap-5 backdrop-blur-xl">
                      {/* Column 1: Main Link & Buying Wholesale */}
                      <div className="space-y-4">
                        <div>
                          <Link
                            to="/wholesale"
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black text-[#D4AF62] bg-[#D4AF62]/10 border border-[#D4AF62]/30 hover:bg-[#D4AF62]/20 transition-all w-full"
                          >
                            <span>Wholesale Overview</span>
                          </Link>
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-[#D4AF62] uppercase tracking-wider mb-2 border-b border-[#063F35] pb-1 cursor-default select-none">
                            Buying Wholesale
                          </div>
                          <div className="grid gap-0.5">
                            {buyingWholesaleLinks.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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
                      </div>

                      {/* Column 2: Shop by Category */}
                      <div>
                        <div className="text-[10px] font-black text-[#00A88F] uppercase tracking-wider mb-2 border-b border-[#063F35] pb-1 cursor-default select-none">
                          Shop by Category
                        </div>
                        <div className="grid gap-0.5">
                          {shopByCategoryLinks.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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

                      {/* Column 3: Shop by Brand */}
                      <div>
                        <div className="text-[10px] font-black text-[#D4AF62] uppercase tracking-wider mb-2 border-b border-[#063F35] pb-1 cursor-default select-none">
                          Shop by Brand
                        </div>
                        <div className="grid gap-0.5">
                          {shopByBrandLinks.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`px-2 xl:px-2.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all whitespace-nowrap ${
                    location.pathname.startsWith('/services') || location.pathname === '/sell-to-us'
                      ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                      : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{t('navigation.servicesDropdown', 'Services')}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
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

              {/* 5. Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`px-2 xl:px-2.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all whitespace-nowrap ${
                    location.pathname === '/grading' || location.pathname === '/how-we-grade' || location.pathname === '/warranty-and-returns' || location.pathname === '/faqs' || location.pathname === '/about'
                      ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                      : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{t('navigation.resourcesDropdown', 'Resources')}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
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

              {/* 5. Sectors Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('sectors')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`px-2 xl:px-2.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all whitespace-nowrap ${
                    location.pathname === '/corporate' || location.pathname === '/education' || location.pathname === '/retail'
                      ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                      : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Sectors</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80 text-[#00A88F]" />
                </button>

                {activeDropdown === 'sectors' && (
                  <div className="absolute left-0 top-full pt-1 w-48 z-50">
                    <div className="bg-[#071715] border border-[#063F35] rounded-xl shadow-2xl p-2 grid gap-0.5">
                      {sectorsLinks.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                            location.pathname === item.path
                              ? 'text-[#00A88F] bg-[#00A88F]/10 font-bold'
                              : 'text-[#DCE8E4] hover:text-[#00A88F] hover:bg-white/5'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Trade Application */}
              <Link
                to="/trade-application"
                className={`px-2 xl:px-2.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  location.pathname === '/trade-application' || location.pathname === '/business'
                    ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                    : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                }`}
              >
                {t('navigation.tradeApplication', 'Trade Application')}
              </Link>

              {/* 7. Contact */}
              <Link
                to="/contact"
                className={`px-2 xl:px-2.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  location.pathname === '/contact'
                    ? 'text-[#D4AF62] bg-[#D4AF62]/10 border-b-2 border-[#D4AF62] font-black'
                    : 'text-[#DCE8E4] hover:text-white hover:bg-white/5'
                }`}
              >
                {t('navigation.contact', 'Contact')}
              </Link>
            </nav>

            {/* Header Action CTAs */}
            <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">
              {/* Cart Badge Button */}
              <Link
                to="/cart"
                aria-label="View Quotation Cart"
                className="relative p-2 rounded-xl text-[#DCE8E4] hover:text-white bg-white/5 border border-[#063F35] hover:border-[#D4AF62] transition-all flex items-center justify-center mr-1"
                title="View Quotation Cart"
              >
                <ShoppingBag className="w-5 h-5 text-[#D4AF62]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#00A88F] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#071715] shadow-md animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>

              <div className="hidden sm:flex items-center gap-2 xl:gap-2.5">
                <Link to="/contact">
                  <button
                    className="inline-flex items-center justify-center gap-1.5 px-3 xl:px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[rgba(255,255,255,0.06)] border border-[#D4AF62]/55 hover:bg-[#D4AF62]/15 hover:border-[#D4AF62] transition-all shadow-2xs cursor-pointer whitespace-nowrap"
                  >
                    <FileText className="w-4 h-4 text-[#D4AF62]" />
                    <span>{t('common.requestPricing', 'Request Pricing')}</span>
                  </button>
                </Link>
                <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noreferrer">
                  <button className="inline-flex items-center justify-center gap-1.5 px-3 xl:px-3.5 py-2 rounded-xl text-xs font-black text-white bg-[#00A88F] hover:bg-[#007A68] transition-all glow-emerald shadow-md cursor-pointer whitespace-nowrap">
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>{t('common.whatsappTradeDesk', 'WhatsApp Trade Desk')}</span>
                  </button>
                </a>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-[#DCE8E4] rounded-lg hover:bg-white/10 shrink-0">
              {open ? <X /> : <Menu />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <nav className="lg:hidden p-4 bg-[#071715] border-t border-[#063F35] grid gap-2 shadow-2xl max-h-[80vh] overflow-y-auto">
            {/* Home */}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                location.pathname === '/' ? 'text-[#D4AF62] bg-[#D4AF62]/10' : 'text-[#DCE8E4] hover:bg-white/5'
              }`}
            >
              {t('navigation.home', 'Home')}
            </Link>

            {/* Live Stock Accordion */}
            <div className="border-t border-[#063F35] pt-2">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('liveStock')}
                className="w-full px-4 py-2 flex items-center justify-between text-xs font-bold text-[#DCE8E4] hover:text-white"
              >
                <span>Live Stock</span>
                {mobileAccordions.liveStock ? <ChevronUp className="w-4 h-4 text-[#D4AF62]" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {mobileAccordions.liveStock && (
                <div className="pl-4 pt-1 grid gap-1">
                  {liveStockLinks.map((item) => (
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
              )}
            </div>

            {/* Wholesale Accordion */}
            <div className="border-t border-[#063F35] pt-2">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('wholesale')}
                className="w-full px-4 py-2 flex items-center justify-between text-xs font-bold text-[#DCE8E4] hover:text-white"
              >
                <span>Wholesale</span>
                {mobileAccordions.wholesale ? <ChevronUp className="w-4 h-4 text-[#D4AF62]" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {mobileAccordions.wholesale && (
                <div className="pl-4 pt-1.5 grid gap-3">
                  <Link
                    to="/wholesale"
                    onClick={() => setOpen(false)}
                    className="px-4 py-1.5 block text-xs font-black text-[#D4AF62]"
                  >
                    Wholesale Overview
                  </Link>

                  <div>
                    <div className="px-4 text-[10px] font-black text-[#D4AF62] uppercase tracking-wider mb-1">Buying Wholesale</div>
                    {buyingWholesaleLinks.map((item) => (
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

                  <div>
                    <div className="px-4 text-[10px] font-black text-[#00A88F] uppercase tracking-wider mb-1">Shop by Category</div>
                    {shopByCategoryLinks.map((item) => (
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

                  <div>
                    <div className="px-4 text-[10px] font-black text-[#D4AF62] uppercase tracking-wider mb-1">Shop by Brand</div>
                    {shopByBrandLinks.map((item) => (
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
                </div>
              )}
            </div>

            {/* Services Accordion */}
            <div className="border-t border-[#063F35] pt-2">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('services')}
                className="w-full px-4 py-2 flex items-center justify-between text-xs font-bold text-[#DCE8E4] hover:text-white"
              >
                <span>Services</span>
                {mobileAccordions.services ? <ChevronUp className="w-4 h-4 text-[#D4AF62]" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {mobileAccordions.services && (
                <div className="pl-4 pt-1 grid gap-1">
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
              )}
            </div>

            {/* Resources Accordion */}
            <div className="border-t border-[#063F35] pt-2">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('resources')}
                className="w-full px-4 py-2 flex items-center justify-between text-xs font-bold text-[#DCE8E4] hover:text-white"
              >
                <span>Resources</span>
                {mobileAccordions.resources ? <ChevronUp className="w-4 h-4 text-[#D4AF62]" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {mobileAccordions.resources && (
                <div className="pl-4 pt-1 grid gap-1">
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
              )}
            </div>

            {/* Trade Application */}
            <Link
              to="/trade-application"
              onClick={() => setOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border-t border-[#063F35] mt-1 ${
                location.pathname === '/trade-application' || location.pathname === '/business' ? 'text-[#D4AF62] bg-[#D4AF62]/10' : 'text-[#DCE8E4] hover:bg-white/5'
              }`}
            >
              {t('navigation.tradeApplication', 'Trade Application')}
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                location.pathname === '/contact' ? 'text-[#D4AF62] bg-[#D4AF62]/10' : 'text-[#DCE8E4] hover:bg-white/5'
              }`}
            >
              {t('navigation.contact', 'Contact')}
            </Link>

            {/* Mobile CTAs */}
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

