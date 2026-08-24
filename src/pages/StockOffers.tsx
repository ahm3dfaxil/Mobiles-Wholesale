import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Sparkles, FileText, Zap, PackageCheck } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/product/ProductCard';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../context/ProductContext';
import { createWhatsAppGeneralUrl } from '../utils/whatsapp';
import { EnquiryModal } from '../components/product/EnquiryModal';

export const StockOffers: React.FC = () => {
  const { t } = useLanguage();
  const { products, loading } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumbs = [
    { name: t('navigation.home', 'Home'), url: '/' },
    { name: t('navigation.liveStock', 'Live Stock'), url: '/stock-list' },
    { name: 'Stock Offers', url: '/stock-offers' }
  ];

  // Filter real catalog items flagged with isHotDeal
  const hotDeals = useMemo(() => {
    return products.filter((p) => Boolean(p.isHotDeal));
  }, [products]);

  return (
    <>
      <SEOHead
        title="Wholesale Stock Offers & Clearance Deals | Mobiles Wholesale"
        description="Browse current wholesale stock offers, hot deal items, and clearance lots at Mobiles Wholesale UK. Contact our sales desk for volume trade pricing."
        canonicalPath="/stock-offers"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-[#FAF8F2]">
        {/* Hero Header */}
        <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              <Tag className="w-3.5 h-3.5 text-[#00A88F]" /> B2B Trade Stock Offers
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
              Wholesale Stock Offers & Deals
            </h1>
            <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
              Explore highlighted trade deals, featured volume stock, and clearance releases directly from our London warehouse.
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Link to="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<FileText className="w-5 h-5" />}
                >
                  Request Special Volume Pricing
                </Button>
              </Link>
              <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" icon={<WhatsAppIcon className="w-5 h-5" />}>
                  WhatsApp Sales Desk
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Current Featured Offers / Hot Deals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#071715]">
              Featured Trade Deals ({hotDeals.length})
            </h2>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-[#596662]">Loading trade offers...</div>
          ) : hotDeals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {hotDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#D8E2DE] p-8 text-center space-y-4 b2b-card-shadow">
              <Sparkles className="w-8 h-8 text-[#00A88F] mx-auto" />
              <h3 className="text-xl font-bold text-[#071715]">No Specific Promotional Lots Active Today</h3>
              <p className="text-xs text-[#596662] max-w-lg mx-auto leading-relaxed">
                Special promotional deals and volume clearance lots are updated weekly. You can browse our main live stock catalog or contact our trade desk directly for upcoming unlisted stock arrivals.
              </p>
              <div className="pt-2 flex justify-center gap-4">
                <Link to="/stock-list">
                  <Button variant="primary" size="md" icon={<PackageCheck className="w-4 h-4" />}>
                    View Main Live Stock Catalog
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="dark" size="md" icon={<FileText className="w-4 h-4" />}>
                    Request Trade Stock CSV
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
