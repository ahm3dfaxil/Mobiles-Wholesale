import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  PackageCheck, 
  Send, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Watch,
  Award,
  Zap,
  Users,
  Truck,
  FileSpreadsheet,
  Globe,
  AlertCircle
} from 'lucide-react';
import { SEOHead, BreadcrumbItem } from '../common/SEOHead';
import { Button } from '../common/Button';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { useLanguage } from '../../context/LanguageContext';
import { createWhatsAppGeneralUrl } from '../../utils/whatsapp';
import { EnquiryModal } from '../product/EnquiryModal';
import { sendFormEmail, EMAILJS_CONFIG, EmailParams } from '../../services/emailService';

export interface StepGuideItem {
  step: number;
  title: string;
  description: string;
}

export interface WholesaleFeatureItem {
  title: string;
  description: string;
}

export interface WholesaleLandingPageProps {
  title: string;
  subtitle: string;
  badge?: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  breadcrumbs: BreadcrumbItem[];
  overview: string[];
  features?: WholesaleFeatureItem[];
  steps?: StepGuideItem[];
  showQuoteForm?: boolean;
  showTradeApplicationCTA?: boolean;
  relatedWholesaleLinks?: { title: string; path: string; description: string }[];
}

export const WholesaleLandingPage: React.FC<WholesaleLandingPageProps> = ({
  title,
  subtitle,
  badge = 'UK Wholesale Trade Supplier',
  metaTitle,
  metaDescription,
  canonicalPath,
  breadcrumbs,
  overview,
  features = [],
  steps = [],
  showQuoteForm = false,
  showTradeApplicationCTA = true,
  relatedWholesaleLinks = []
}) => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Quote form state for /wholesale/get-a-quote/
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    productsRequired: '',
    quantity: '',
    message: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteErrorMessage, setQuoteErrorMessage] = useState<string | null>(null);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quoteLoading) return;
    setQuoteLoading(true);
    setQuoteErrorMessage(null);

    if (!quoteForm.name.trim() || !quoteForm.companyName.trim() || !quoteForm.email.trim() || !quoteForm.phone.trim() || !quoteForm.productsRequired.trim() || !quoteForm.quantity.trim()) {
      setQuoteErrorMessage('Please complete all required fields marked with *');
      setQuoteLoading(false);
      return;
    }

    try {
      await sendFormEmail({
        form_type: 'Wholesale Quote Request',
        from_name: quoteForm.name,
        company_name: quoteForm.companyName,
        from_email: quoteForm.email,
        phone: quoteForm.phone,
        quantity_notes: `${quoteForm.quantity} (Products: ${quoteForm.productsRequired})`,
        comments: quoteForm.message
      });

      // Async backend notify
      fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: quoteForm.name,
          companyName: quoteForm.companyName,
          email: quoteForm.email,
          phone: quoteForm.phone,
          productCategory: quoteForm.productsRequired || 'Wholesale Stock Enquiry',
          quantity: Number(quoteForm.quantity) || 1,
          message: quoteForm.message
        })
      }).catch(err => console.warn('API notification fallback:', err));

      setQuoteSubmitted(true);
      // Reset quote form
      setQuoteForm({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        productsRequired: '',
        quantity: '',
        message: ''
      });
    } catch (err: any) {
      console.error('EmailJS submission error:', err);
      setQuoteErrorMessage(err.message || 'Failed to submit quote request. Please check your details and try again.');
    } finally {
      setQuoteLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        canonicalPath={canonicalPath}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-[#FAF8F2]">
        {/* Hero Banner */}
        <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              <Building2 className="w-3.5 h-3.5 text-[#00A88F]" /> {badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
              {title}
            </h1>
            <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Link to="/stock-list">
                <Button variant="primary" size="lg" icon={<PackageCheck className="w-5 h-5" />}>
                  {t('common.viewLiveStock', 'View Live Stock Catalog')}
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="dark"
                  size="lg"
                  icon={<FileText className="w-5 h-5" />}
                >
                  {t('common.requestQuote', 'Request a Quote')}
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

        {/* Overview Section */}
        <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-10 b2b-card-shadow space-y-4">
          <div className="border-b border-[#D8E2DE] pb-3">
            <span className="text-xs font-bold text-[#00A88F] uppercase tracking-wider">Wholesale Information</span>
            <h2 className="text-2xl font-black text-[#071715] mt-1">UK B2B Supply & Distribution</h2>
          </div>
          <div className="space-y-4 text-sm text-[#596662] leading-relaxed">
            {overview.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Quote Form if applicable (/wholesale/get-a-quote/) */}
        {showQuoteForm && (
          <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-10 b2b-card-shadow space-y-6">
            <div className="border-b border-[#D8E2DE] pb-4">
              <span className="text-xs font-bold text-[#00A88F] uppercase tracking-wider">Quote Generation</span>
              <h2 className="text-2xl font-black text-[#071715] mt-1">Request a Wholesale Quote</h2>
              <p className="text-xs text-[#596662] mt-1">Submit your required products and quantities to receive an immediate trade quote.</p>
            </div>

            {quoteSubmitted ? (
              <div className="py-8 text-center space-y-3 bg-[#E5F3EF] rounded-xl border border-[#D8E2DE]">
                <CheckCircle2 className="w-10 h-10 text-[#00A88F] mx-auto" />
                <h3 className="text-xl font-bold text-[#071715]">Quote Request Submitted!</h3>
                <p className="text-xs text-[#596662]">Thank you, {quoteForm.name}. Our sales desk will contact you with pricing within 24 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                {quoteErrorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{quoteErrorMessage}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#101A18] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John Smith"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#101A18] mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Business Name Ltd"
                      value={quoteForm.companyName}
                      onChange={(e) => setQuoteForm({ ...quoteForm, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#101A18] mb-1">Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="trade@company.co.uk"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#101A18] mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="020 1234 5678"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#101A18] mb-1">Products Required *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. iPhones, Samsung Galaxy, iPads"
                      value={quoteForm.productsRequired}
                      onChange={(e) => setQuoteForm({ ...quoteForm, productsRequired: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#101A18] mb-1">Quantity Required *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 10, 50, 100+ units"
                      value={quoteForm.quantity}
                      onChange={(e) => setQuoteForm({ ...quoteForm, quantity: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101A18] mb-1">Message / Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Specify target models, grades, or delivery requirements..."
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715]"
                  />
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" size="lg" type="submit" disabled={quoteLoading} icon={<Send className="w-4 h-4" />}>
                    {quoteLoading ? 'Sending Quote Request...' : 'Request a Quote'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Feature Highlights Grid */}
        {features.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-[#D8E2DE] pb-3">
              <span className="text-xs font-bold text-[#071715] uppercase tracking-wider">Wholesale Advantages</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#071715] mt-1">Why Source From Mobiles Wholesale</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-[#D8E2DE] b2b-card-shadow space-y-3 hover:border-[#D4AF62] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#E5F3EF] border border-[#D8E2DE] flex items-center justify-center text-[#007A68]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-[#071715] text-lg">{feat.title}</h3>
                  <p className="text-xs text-[#596662] leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step-by-Step Purchasing Guide if provided (/wholesale/how-to-buy/) */}
        {steps.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-10 b2b-card-shadow space-y-6">
            <div className="border-b border-[#D8E2DE] pb-3">
              <span className="text-xs font-bold text-[#00A88F] uppercase tracking-wider">Step-by-Step Purchasing Guide</span>
              <h2 className="text-2xl font-black text-[#071715] mt-1">How To Buy Wholesale Stock</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((st) => (
                <div key={st.step} className="bg-[#FAF8F2] p-5 rounded-xl border border-[#D8E2DE] space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#071715] text-white font-black flex items-center justify-center text-sm shadow-xs">
                    {st.step}
                  </div>
                  <h4 className="font-extrabold text-[#101A18] text-base">{st.title}</h4>
                  <p className="text-xs text-[#596662] leading-relaxed">{st.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trade Application CTA */}
        {showTradeApplicationCTA && (
          <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-8 b2b-card-shadow flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#00A88F] uppercase tracking-wider">B2B Account Benefits</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#071715]">Open a Trade Account Today</h3>
              <p className="text-xs text-[#596662]">Access volume trade pricing, pro-forma invoicing, and live CSV inventory stock feeds.</p>
            </div>
            <Link to="/wholesale/open-account">
              <Button variant="primary" size="lg" icon={<Users className="w-4 h-4" />}>
                Open a Trade Account
              </Button>
            </Link>
          </div>
        )}

        {/* Related Wholesale Navigation Links */}
        {relatedWholesaleLinks.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-[#071715]">Wholesale Navigation & Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedWholesaleLinks.map((rel, idx) => (
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
