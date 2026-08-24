import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Award, ShieldCheck, FileSpreadsheet, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';
import { createWhatsAppGeneralUrl } from '../utils/whatsapp';
import { EnquiryModal } from '../components/product/EnquiryModal';

export const BuyFromUs: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumbs = [
    { name: t('navigation.home', 'Home'), url: '/' },
    { name: t('navigation.buyFromUs', 'Buy From Us'), url: '/buy-from-us' }
  ];

  const sections = [
    {
      title: t('buyFromUs.gradingTitle', 'How We Grade'),
      path: '/how-we-grade',
      description: t('buyFromUs.gradingDesc', 'Learn about our testing process, functional inspection, cosmetic grading (Grade A, B, C, Brand New Sealed), and quality control standards.'),
      icon: <Award className="w-6 h-6 text-[#00A88F]" />,
      ctaText: t('buyFromUs.viewGradingGuide', 'View Full Grading Guide')
    },
    {
      title: t('buyFromUs.warrantyTitle', 'Warranty & Returns Policy'),
      path: '/warranty-and-returns',
      description: t('buyFromUs.warrantyDesc', 'Detailed overview of UK trade warranty durations, what is covered and excluded, RMA faulty device returns process, and replacement guidelines.'),
      icon: <ShieldCheck className="w-6 h-6 text-[#007A68]" />,
      ctaText: t('buyFromUs.viewWarrantyPolicy', 'Read Warranty & Returns Policy')
    },
    {
      title: t('buyFromUs.liveStockTitle', 'Live UK Wholesale Stock Catalog'),
      path: '/stock-list',
      description: t('buyFromUs.liveStockDesc', 'Browse our live inventory catalog of smartphones, iPads, MacBooks, laptops, and smartwatches. Filter by grade, brand, and availability.'),
      icon: <FileSpreadsheet className="w-6 h-6 text-[#D4AF62]" />,
      ctaText: t('buyFromUs.browseLiveStock', 'Browse Live Stock Catalog')
    },
    {
      title: t('buyFromUs.bulkBuyTitle', 'Bulk Purchasing & Volume Orders'),
      path: '/wholesale/bulk-buy',
      description: t('buyFromUs.bulkBuyDesc', 'Tailored volume solutions for high-quantity business buyers, retailers, power sellers, and international exporters taking large quantity lots.'),
      icon: <Truck className="w-6 h-6 text-purple-600" />,
      ctaText: t('buyFromUs.exploreBulkBuy', 'Explore Bulk Purchasing')
    }
  ];

  return (
    <>
      <SEOHead
        title={t('buyFromUs.metaTitle', 'Buy From Us | UK B2B Wholesale Mobile Phones & Electronics')}
        description={t('buyFromUs.metaDesc', 'Overview of buying wholesale mobile phones and electronics from Mobiles Wholesale. Learn about grading, warranties, bulk stock purchasing, and trade accounts.')}
        canonicalPath="/buy-from-us"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-[#FAF8F2]">
        {/* Hero Banner */}
        <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              <Building2 className="w-3.5 h-3.5 text-[#00A88F]" /> B2B Trade Overview
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
              {t('buyFromUs.h1', 'Buy Wholesale Mobile Phones & Electronics From Us')}
            </h1>
            <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
              {t('buyFromUs.subtitle', 'Your trusted UK B2B trade partner for iPhones, Samsung Galaxy, iPads, MacBooks, laptops, and consumer electronics.')}
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Link to="/stock-list">
                <Button variant="primary" size="lg" icon={<FileSpreadsheet className="w-5 h-5" />}>
                  {t('common.viewLiveStock', 'View Live Stock Catalog')}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="dark" size="lg">
                  {t('common.requestPricing', 'Request Pricing')}
                </Button>
              </Link>
              <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" icon={<WhatsAppIcon className="w-5 h-5" />}>
                  {t('common.whatsappSalesDesk', 'WhatsApp Sales Desk')}
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Key Information Hub Cards */}
        <div className="space-y-6">
          <div className="border-b border-[#D8E2DE] pb-3">
            <span className="text-xs font-bold text-[#071715] uppercase tracking-wider">Wholesale Information Hub</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#071715] mt-1">Dedicated Information & Policies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((sec, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-[#D8E2DE] p-6 b2b-card-shadow flex flex-col justify-between space-y-4 hover:border-[#D4AF62] transition-all">
                <div className="space-y-3">
                  <div className="p-3 bg-[#E5F3EF] rounded-xl border border-[#D8E2DE] w-fit">
                    {sec.icon}
                  </div>
                  <h3 className="font-extrabold text-[#071715] text-xl">{sec.title}</h3>
                  <p className="text-xs text-[#596662] leading-relaxed">{sec.description}</p>
                </div>
                <div className="pt-3 border-t border-[#D8E2DE]">
                  <Link to={sec.path}>
                    <Button variant="outline" size="sm" fullWidth icon={<ArrowRight className="w-4 h-4" />}>
                      {sec.ctaText}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advantage Highlights */}
        <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-10 b2b-card-shadow space-y-6">
          <div className="border-b border-[#D8E2DE] pb-3">
            <span className="text-xs font-bold text-[#00A88F] uppercase tracking-wider">B2B Advantages</span>
            <h2 className="text-2xl font-black text-[#071715] mt-1">Why UK Trade Customers Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#101A18]">
            <div className="bg-[#FAF8F2] p-5 rounded-xl border border-[#D8E2DE] space-y-2">
              <CheckCircle2 className="w-5 h-5 text-[#00A88F]" />
              <h4 className="font-extrabold text-sm text-[#071715]">VAT Compliance Options</h4>
              <p className="text-[#596662] leading-relaxed">Margin Scheme VAT invoices (save 20% on pre-owned stock) and Standard 20% VAT invoices for tax deductible assets.</p>
            </div>

            <div className="bg-[#FAF8F2] p-5 rounded-xl border border-[#D8E2DE] space-y-2">
              <CheckCircle2 className="w-5 h-5 text-[#00A88F]" />
              <h4 className="font-extrabold text-sm text-[#071715]">Next-Day Courier Delivery</h4>
              <p className="text-[#596662] leading-relaxed">Fully insured UK transit via DPD Next Day or Royal Mail Special Delivery Guaranteed by 1:00 PM.</p>
            </div>

            <div className="bg-[#FAF8F2] p-5 rounded-xl border border-[#D8E2DE] space-y-2">
              <CheckCircle2 className="w-5 h-5 text-[#00A88F]" />
              <h4 className="font-extrabold text-sm text-[#071715]">Dedicated Account Manager</h4>
              <p className="text-[#596662] leading-relaxed">Direct communication via WhatsApp or phone with account managers tailored to your trade volume.</p>
            </div>
          </div>
        </div>
      </div>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
