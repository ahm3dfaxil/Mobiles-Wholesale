import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft, 
  Minus, 
  Plus, 
  Wifi, 
  HardDrive, 
  Tag, 
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  HelpCircle,
  Truck
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { useProducts } from '../context/ProductContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { ProductCard } from '../components/product/ProductCard';
import { EnquiryModal } from '../components/product/EnquiryModal';
import { useLanguage } from '../context/LanguageContext';
import { createWhatsAppProductUrl } from '../utils/whatsapp';
import { WHATSAPP_CONFIG } from '../config/env';

export const ProductDetail: React.FC = () => {
  const { products } = useProducts();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const product = products.find(p => p.id === id) || products[0];
  const [selectedQty, setSelectedQty] = useState<number>(product ? product.moq : 5);

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900">Product Not Found</h2>
        <Button onClick={() => navigate('/stock')} className="mt-4">
          {t('productDetail.backToStock', 'Return to Stock Catalogue')}
        </Button>
      </div>
    );
  }

  // Related products logic (same category or brand, excluding current product)
  const relatedProducts = MOCK_PRODUCTS
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const handleDecreaseQty = () => {
    if (selectedQty > 1) {
      setSelectedQty(selectedQty - 1);
    }
  };

  const handleIncreaseQty = () => {
    setSelectedQty(selectedQty + 1);
  };

  const whatsAppUrl = createWhatsAppProductUrl(product, selectedQty);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24 sm:pb-12 bg-[#FAF8F2]">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#596662] overflow-x-auto py-1">
        <Link to="/" className="hover:text-[#00A88F] font-medium">{t('navigation.home', 'Home')}</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link to="/stock" className="hover:text-[#00A88F] font-medium">{t('navigation.liveStock', 'Stock Catalogue')}</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link to={`/stock?category=${product.category}`} className="hover:text-[#00A88F] font-medium capitalize">
          {product.category.replace('-', ' ')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-[#101A18] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Back to Inventory Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101A18] hover:text-[#071715] bg-white px-3 py-1.5 rounded-lg border border-[#D8E2DE] shadow-2xs hover:border-[#D4AF62] transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> {t('productDetail.backToStock', 'Back to Inventory')}
        </button>
      </div>

      {/* Main Product Showcase Card */}
      <div className="bg-white rounded-2xl border border-[#D8E2DE] b2b-card-shadow p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Product Image & Badges */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-square bg-[#FAF8F2] rounded-2xl overflow-hidden border border-[#D8E2DE]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
                <div className="flex flex-col items-start gap-1.5 max-w-[calc(100%-110px)]">
                  <Badge type="grade" grade={product.grade} />
                  {product.isHotDeal && <Badge type="deal" />}
                </div>
                <div className="absolute top-0 right-0">
                  <Badge type="vat" vatType={product.vatType} />
                </div>
              </div>
            </div>

            {/* Quality Testing Guarantee Box */}
            <div className="bg-[#E5F3EF] border border-[#D8E2DE] rounded-xl p-4 text-xs space-y-2">
              <div className="font-bold text-[#071715] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#007A68]" />
                <span>PhoneCheck Certified Inspection</span>
              </div>
              <p className="text-[#596662] text-[11px] leading-relaxed">
                Clean IMEI guaranteed. Passed 60-point automated hardware diagnostics for screen digitizer, camera focus, speaker audio, biometrics, and battery retention.
              </p>
            </div>
          </div>

          {/* Right Column: Full Product Specs & Dynamic WhatsApp Order Box */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#007A68] uppercase tracking-wider mb-1.5">
                <span>{product.brand}</span>
                <span>•</span>
                <span className="font-mono text-[#596662]">SKU: {product.sku}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#071715] leading-tight">
                {product.name}
              </h1>
              <p className="text-[#596662] text-sm mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Prompt Required Product Attribute Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#E5F3EF] p-4 rounded-xl border border-[#D8E2DE] text-xs">
              <div>
                <span className="text-[#596662] font-bold uppercase text-[10px] block">Brand</span>
                <span className="font-bold text-[#101A18]">{product.brand}</span>
              </div>

              <div>
                <span className="text-[#596662] font-bold uppercase text-[10px] block">Grade</span>
                <Badge type="grade" grade={product.grade} />
              </div>

              <div>
                <span className="text-[#596662] font-bold uppercase text-[10px] block">Storage</span>
                <span className="font-bold text-[#101A18]">{product.storage || 'N/A'}</span>
              </div>

              <div>
                <span className="text-[#596662] font-bold uppercase text-[10px] block">Colour</span>
                <span className="font-bold text-[#101A18]">{product.colour || product.color || 'N/A'}</span>
              </div>

              <div>
                <span className="text-[#596662] font-bold uppercase text-[10px] block">Network</span>
                <span className="font-bold text-[#101A18]">{product.network || 'Unlocked'}</span>
              </div>

              <div>
                <span className="text-[#596662] font-bold uppercase text-[10px] block">Condition</span>
                <span className="font-bold text-[#101A18]">{product.condition || 'Tested 100% Functional'}</span>
              </div>
            </div>

            {/* Pricing & Stock Availability Box */}
            <div className="bg-[#E5F3EF] text-[#101A18] p-5 rounded-2xl border border-[#D4AF62] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#596662] uppercase font-medium">Wholesale Trade Price</span>
                <div className="flex items-center gap-2 mt-1">
                  <a 
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xl sm:text-2xl font-black text-[#00A88F] hover:underline"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    Ask Price on WhatsApp
                  </a>
                </div>
                <div className="text-xs text-[#596662] mt-1.5">
                  Tax Scheme: <span className="font-bold text-[#101A18]">{product.vatType}</span>
                </div>
              </div>

              <div className="space-y-1.5 sm:text-right">
                <div className="flex items-center sm:justify-end gap-2">
                  <Badge type="stock" inStock={product.inStock} stockQty={product.stockQty} />
                </div>
                <div className="text-xs font-semibold text-[#101A18]">
                  Minimum Order (MOQ): <span className="font-extrabold text-[#00A88F]">{product.moq} units</span>
                </div>
                <div className="text-xs text-[#596662]">
                  Stock Qty Available: <span className="font-bold text-[#101A18]">{product.stockQty} units</span>
                </div>
              </div>
            </div>

            {/* Interactive Quantity Selector */}
            <div className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label className="block text-xs font-bold text-[#071715] uppercase">Select Order Quantity</label>
                <span className="text-[11px] text-[#596662]">MOQ is {product.moq} units for wholesale pricing</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecreaseQty}
                  className="w-9 h-9 rounded-lg bg-white border border-[#D8E2DE] font-bold text-[#101A18] flex items-center justify-center hover:bg-[#E5F3EF]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-base font-black text-[#101A18]">{selectedQty}</span>
                <button
                  onClick={handleIncreaseQty}
                  className="w-9 h-9 rounded-lg bg-white border border-[#D8E2DE] font-bold text-[#101A18] flex items-center justify-center hover:bg-[#E5F3EF]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Order on WhatsApp & Request Quote */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* PROMINENT ORDER ON WHATSAPP BUTTON */}
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    variant="whatsapp"
                    size="lg"
                    fullWidth
                    icon={<WhatsAppIcon className="w-5 h-5" />}
                    className="py-3.5 font-bold"
                  >
                    {t('common.askPrice', 'Ask Price')} ({selectedQty}u)
                  </Button>
                </a>

                <Link to="/contact" className="w-full">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={<FileText className="w-5 h-5" />}
                    className="py-3.5"
                  >
                    {t('productDetail.requestQuoteBtn', 'Request Formal Quote')}
                  </Button>
                </Link>
              </div>

              <p className="text-center text-xs text-[#596662] flex items-center justify-center gap-1.5">
                <Truck className="w-4 h-4 text-[#00A88F]" />
                <span>Next-Day UK Dispatch via insured DPD Courier. Orders cutoff 2:00 PM GMT.</span>
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Full Technical Specifications Breakdown */}
      <div className="bg-white rounded-2xl border border-[#D8E2DE] b2b-card-shadow p-6 sm:p-8 space-y-6">
        <h3 className="text-xl font-bold text-[#071715] border-b border-[#D8E2DE] pb-3">
          Detailed Device Specifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <table className="w-full text-xs text-left">
            <tbody className="divide-y divide-[#D8E2DE]">
              <tr className="py-2.5">
                <td className="py-2.5 font-bold text-[#596662] w-1/3">Brand & Manufacturer</td>
                <td className="py-2.5 font-semibold text-[#101A18]">{product.brand}</td>
              </tr>
              <tr className="py-2.5">
                <td className="py-2.5 font-bold text-[#596662]">Model Name</td>
                <td className="py-2.5 font-semibold text-[#101A18]">{product.model}</td>
              </tr>
              <tr className="py-2.5">
                <td className="py-2.5 font-bold text-[#596662]">Storage / Capacity</td>
                <td className="py-2.5 font-semibold text-[#101A18]">{product.storage || 'N/A'}</td>
              </tr>
              <tr className="py-2.5">
                <td className="py-2.5 font-bold text-[#596662]">Colour / Finish</td>
                <td className="py-2.5 font-semibold text-[#101A18]">{product.colour || product.color || 'N/A'}</td>
              </tr>
              <tr className="py-2.5">
                <td className="py-2.5 font-bold text-[#596662]">Device Condition Grade</td>
                <td className="py-2.5 font-semibold text-[#101A18]"><Badge type="grade" grade={product.grade} /></td>
              </tr>
            </tbody>
          </table>

          <table className="w-full text-xs text-left">
            <tbody className="divide-y divide-[#D8E2DE]">
              {Object.entries(product.specs).map(([key, value]) => (
                <tr key={key} className="py-2.5">
                  <td className="py-2.5 font-bold text-[#596662] w-1/3">{key}</td>
                  <td className="py-2.5 font-semibold text-[#101A18]">{value}</td>
                </tr>
              ))}
              <tr className="py-2.5">
                <td className="py-2.5 font-bold text-[#596662]">UK Warranty Period</td>
                <td className="py-2.5 font-semibold text-[#007A68]">{product.warrantyDays} Days Trade Warranty</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* RELATED PRODUCTS SECTION */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#D8E2DE] pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-[#071715]">Related Wholesale Stock</h3>
              <p className="text-xs text-[#596662] mt-0.5">Similar items available in our UK inventory</p>
            </div>
            <Link to="/stock" className="text-xs font-bold text-[#00A88F] hover:underline">
              View All Stock
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relProduct => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
              />
            ))}
          </div>
        </div>
      )}

      {/* PROMINENT STICKY WHATSAPP CTA FOR MOBILE VIEWPORT */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white text-[#101A18] p-3 border-t border-[#D8E2DE] sm:hidden flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <div className="text-[10px] text-[#00A88F] font-semibold uppercase">Quick Mobile Order</div>
          <div className="text-xs font-bold text-[#071715] truncate max-w-[170px]">{product.name}</div>
        </div>
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <button className="px-4 py-2 bg-[#00A88F] hover:bg-[#007A68] text-white text-xs font-extrabold rounded-lg flex items-center gap-1.5 shadow-md cursor-pointer">
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
        </a>
      </div>

      {/* Wholesale Enquiry Quote Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        product={product}
      />
    </div>
  );
};
