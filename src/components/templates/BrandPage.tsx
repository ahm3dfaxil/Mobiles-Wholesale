import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Search, Filter, ArrowRight, FileText, Users, ShieldCheck } from 'lucide-react';
import { SEOHead, BreadcrumbItem } from '../common/SEOHead';
import { Button } from '../common/Button';
import { ProductCard } from '../product/ProductCard';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { useLanguage } from '../../context/LanguageContext';
import { useProducts } from '../../context/ProductContext';
import { Brand } from '../../types';
import { createWhatsAppGeneralUrl } from '../../utils/whatsapp';
import { EnquiryModal } from '../product/EnquiryModal';

export interface BrandPageProps {
  h1: string;
  subtitle: string;
  badge?: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  breadcrumbs: BreadcrumbItem[];
  targetBrand: Brand;
  modelFilterKey?: string; // e.g. 'iPhone' for Apple iPhones
  introParagraphs: string[];
  relatedBrandLinks?: { title: string; path: string; description: string }[];
}

export const BrandPage: React.FC<BrandPageProps> = ({
  h1,
  subtitle,
  badge = 'UK Wholesale Brand Landing',
  metaTitle,
  metaDescription,
  canonicalPath,
  breadcrumbs,
  targetBrand,
  modelFilterKey,
  introParagraphs,
  relatedBrandLinks = []
}) => {
  const { t } = useLanguage();
  const { products, loading } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');

  // Filter products by brand and optional model filter key
  const brandProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesBrand = p.brand === targetBrand;
      const matchesModel = !modelFilterKey || p.name.toLowerCase().includes(modelFilterKey.toLowerCase()) || p.model.toLowerCase().includes(modelFilterKey.toLowerCase());
      return matchesBrand && matchesModel;
    });
  }, [products, targetBrand, modelFilterKey]);

  // Apply sub-filters
  const filteredProducts = useMemo(() => {
    return brandProducts.filter((p) => {
      const matchesSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.colour?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.storage?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGrade = selectedGrade === 'all' || p.grade === selectedGrade;

      return matchesSearch && matchesGrade;
    });
  }, [brandProducts, searchQuery, selectedGrade]);

  return (
    <>
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        canonicalPath={canonicalPath}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-[#FAF8F2]">
        {/* Hero Header */}
        <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              <Building2 className="w-3.5 h-3.5 text-[#00A88F]" /> {badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
              {h1}
            </h1>
            <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Link to="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<FileText className="w-5 h-5" />}
                >
                  {t('common.requestQuote', 'Request a Quote')}
                </Button>
              </Link>
              <Link to="/wholesale/open-account">
                <Button variant="dark" size="lg" icon={<Users className="w-5 h-5" />}>
                  {t('common.openTradeAccount', 'Open Trade Account')}
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

        {/* Intro SEO Content */}
        <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-10 b2b-card-shadow space-y-4">
          <div className="border-b border-[#D8E2DE] pb-3">
            <span className="text-xs font-bold text-[#00A88F] uppercase tracking-wider">Brand Information</span>
            <h2 className="text-2xl font-black text-[#071715] mt-1">{h1} Overview</h2>
          </div>
          <div className="space-y-4 text-sm text-[#596662] leading-relaxed font-normal">
            {introParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white p-5 rounded-2xl border border-[#D8E2DE] b2b-card-shadow flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#596662] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${targetBrand} models...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-xs focus:ring-2 focus:ring-[#071715]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-[#596662]" />
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-2 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-xs font-bold text-[#101A18] focus:ring-2 focus:ring-[#071715]"
            >
              <option value="all">All Device Grades</option>
              <option value="Brand New Sealed">Brand New Sealed</option>
              <option value="Refurbished Grade A+">Refurbished Grade A+</option>
              <option value="Grade A">Grade A</option>
              <option value="Grade B">Grade B</option>
              <option value="Grade C">Grade C</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-[#071715]">
              Available Brand Stock ({filteredProducts.length})
            </h3>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-[#596662]">Loading live brand stock...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#D8E2DE] p-8 text-center space-y-3 b2b-card-shadow">
              <p className="text-sm font-semibold text-[#596662]">
                No specific models matched your current search filters.
              </p>
              <p className="text-xs text-[#596662]">
                Contact our trade desk for unlisted stock availability and daily CSV arrivals.
              </p>
              <Link to="/contact">
                <Button variant="primary" size="md" icon={<FileText className="w-4 h-4" />}>
                  Submit Wholesale Enquiry
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Related Brand & Wholesale Links */}
        {relatedBrandLinks.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-[#071715]">Explore Other Brand & Category Hubs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedBrandLinks.map((rel, idx) => (
                <Link
                  key={idx}
                  to={rel.path}
                  className="bg-white p-4 rounded-xl border border-[#D8E2DE] hover:border-[#00A88F] transition-all b2b-card-shadow group"
                >
                  <h4 className="font-bold text-[#071715] text-sm group-hover:text-[#00A88F] flex items-center justify-between">
                    <span>{rel.title}</span>
                    <ArrowRight className="w-4 h-4 text-[#00A88F]" />
                  </h4>
                  <p className="text-xs text-[#596662] mt-1">{rel.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
