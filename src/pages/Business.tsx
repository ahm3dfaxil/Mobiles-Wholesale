import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendFormEmail, EMAILJS_CONFIG, EmailParams } from '../services/emailService';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  CheckCircle2, 
  FileText, 
  Zap, 
  Clock, 
  CreditCard,
  ShoppingBag,
  Globe,
  GraduationCap,
  PackageCheck,
  ChevronRight,
  Send,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';
import { createWhatsAppGeneralUrl } from '../utils/whatsapp';
import { EnquiryModal } from '../components/product/EnquiryModal';
import { SEOHead } from '../components/common/SEOHead';

export const Business: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    companyName: '',
    companyRegNumber: '',
    vatNumber: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: 'Physical Retail Shop',
    monthlyVolume: '£10,000 - £25,000',
    comments: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);

    if (!form.contactName.trim() || !form.companyName.trim() || !form.email.trim() || !form.phone.trim()) {
      setErrorMessage('Please fill in all required fields marked with *');
      setLoading(false);
      return;
    }

    try {
      await sendFormEmail({
        form_type: 'B2B Trade Application',
        from_name: form.contactName,
        company_name: form.companyName,
        from_email: form.email,
        phone: form.phone,
        company_reg_number: form.companyRegNumber,
        vat_number: form.vatNumber,
        business_type: form.businessType,
        monthly_purchasing_volume: form.monthlyVolume,
        comments: form.comments
      });

      // Async backend notify
      fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.contactName,
          companyName: form.companyName,
          email: form.email,
          phone: form.phone,
          productCategory: `B2B Trade Application (${form.businessType})`,
          quantity: 1,
          grade: `Monthly Volume: ${form.monthlyVolume}`,
          message: `Company Reg: ${form.companyRegNumber || 'N/A'} | VAT: ${form.vatNumber || 'N/A'}\n\nNotes: ${form.comments}`
        })
      }).catch(err => console.warn('API notification fallback:', err));

      setSubmitted(true);
      // Reset form on success
      setForm({
        companyName: '',
        companyRegNumber: '',
        vatNumber: '',
        contactName: '',
        email: '',
        phone: '',
        businessType: 'Physical Retail Shop',
        monthlyVolume: '£10,000 - £25,000',
        comments: ''
      });
    } catch (err: any) {
      console.error('EmailJS submission error:', err);
      setErrorMessage(err.message || 'Failed to submit trade application. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const solutions = [
    {
      id: 'retailers',
      title: 'For Phone & Tech Retailers',
      icon: <ShoppingBag className="w-6 h-6 text-[#0a4d3c]" />,
      badge: 'High Resale Margins',
      description: 'High street mobile phone shops and independent electronics retailers require reliable, quick-turning inventory with zero hassle.',
      features: [
        'Margin Scheme VAT invoices (save 20% on pre-owned stock)',
        'Consistently high cosmetic yield (Grade A and Refurbished A+)',
        'Neutral retail trade packaging ready for immediate shop shelves',
        'Next-day UK DPD dispatch on all orders placed before 2 PM'
      ]
    },
    {
      id: 'resellers',
      title: 'For E-Commerce & Resellers',
      icon: <Globe className="w-6 h-6 text-[#0a4d3c]" />,
      badge: 'Live Stock Feeds',
      description: 'Online power sellers on eBay, Amazon, Back Market, and Shopify need precise grading, reliable supply chains, and fast CSV integration.',
      features: [
        'Daily CSV / Excel live stock feed updates via email or API',
        '60-Point PhoneCheck automated test reports for zero return rate',
        'Bulk stock reservation holds for top-rated online power sellers',
        'Blind drop-shipping option direct to end customers'
      ]
    },
    {
      id: 'corporate',
      title: 'For Corporate & Enterprises',
      icon: <Building2 className="w-6 h-6 text-purple-600" />,
      badge: 'Standard 20% VAT',
      description: 'Corporate fleets, IT equipment managers, and enterprise organizations seeking cost-effective smartphones, iPads, and MacBooks.',
      features: [
        'Standard 20% VAT invoices for tax deductible corporate assets',
        'Brand new sealed & pristine grade A business laptops & iPhones',
        'Custom pro-forma invoicing & corporate payment terms (upon approval)',
        'IT asset disposal & trade-in buyback for staff upgrades'
      ]
    },
    {
      id: 'education',
      title: 'For Education & Public Sector',
      icon: <GraduationCap className="w-6 h-6 text-amber-600" />,
      badge: 'Educational Discounts',
      description: 'Schools, academies, colleges, and university departments equipping students and staff with iPads, Chromebooks, and laptops.',
      features: [
        'Special educational bulk pricing discounts',
        'Official Purchase Order (PO) processing',
        'Bulk device MDM deployment prep & protective case bundles',
        '365-Day Extended Trade Warranty on educational hardware'
      ]
    },
    {
      id: 'bulk-buyers',
      title: 'For Bulk Buyers & Exporters',
      icon: <PackageCheck className="w-6 h-6 text-rose-600" />,
      badge: 'Pallet & Volume Pricing',
      description: 'Master distributors, international exporters, and high-volume trade buyers taking 100+ to 1,000+ units per transaction.',
      features: [
        'Pallet & box-lot container pricing models',
        'Zero-rated VAT invoices for valid international export buyers',
        'Priority allocation on raw tested & sealed hot releases',
        'Dedicated UK account desk & custom freight logistics support'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-[#FAF8F2]">
      <SEOHead 
        title="Trade Application - Mobile Wholesale"
        description="Apply for a trade account to access wholesale pricing, bulk mobile phone deals, and exclusive offers for retailers and resellers."
        canonicalPath="/trade-application/"
      />
      {/* Header Banner */}
      <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
        <div className="max-w-3xl space-y-5">
          <span className="text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
            Tailored B2B Trade Solutions
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
            {t('businessPage.title', 'Trade Account Application')}
          </h1>
          <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
            {t('businessPage.subtitle', 'Unlock wholesale trade pricing, pro-forma invoicing, live CSV stock feeds, and dedicated account support.')}
          </p>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap gap-4">
            <Link to="/contact">
              <Button
                variant="primary"
                size="lg"
                icon={<Zap className="w-5 h-5" />}
              >
                Get a Wholesale Quote
              </Button>
            </Link>
            <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
              <Button
                variant="whatsapp"
                size="lg"
                icon={<WhatsAppIcon className="w-5 h-5" />}
              >
                Speak to Us on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Trade Application Form Card */}
      <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-10 b2b-card-shadow">
        <div className="border-b border-[#D8E2DE] pb-6 mb-6">
          <span className="text-xs font-bold text-[#071715] uppercase tracking-wider">VIP Trade Access</span>
          <h2 className="text-2xl font-black text-[#071715] mt-1">Submit Trade Application</h2>
          <p className="text-[#596662] text-sm mt-1">
            Submit your business details and stock requirements below to request invoice approval and unlock trade pricing tiers.
          </p>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 bg-[#E5F3EF] text-[#00A88F] rounded-full flex items-center justify-center mx-auto border border-[#D8E2DE]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-[#071715]">Trade Application Submitted!</h3>
            <p className="text-sm text-[#596662] max-w-lg mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-[#101A18]">{form.contactName}</span>. We have received your application for{' '}
              <span className="font-semibold text-[#101A18]">{form.companyName}</span>. Your dedicated account manager will contact you within 24 business hours.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="md" icon={<WhatsAppIcon className="w-4 h-4" />}>
                  Connect Live on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Company / Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Apex Communications Ltd"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Company Reg Number (Optional)</label>
                <input
                  type="text"
                  placeholder="12345678"
                  value={form.companyRegNumber}
                  onChange={(e) => setForm({ ...form, companyRegNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">UK VAT Number (Optional)</label>
                <input
                  type="text"
                  placeholder="GB123456789"
                  value={form.vatNumber}
                  onChange={(e) => setForm({ ...form, vatNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Primary Contact Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Smith"
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Business Email *</label>
                <input
                  type="email"
                  required
                  placeholder="trade@company.co.uk"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Mobile / Direct Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+44 7123 456789"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Business Type *</label>
                <select
                  value={form.businessType}
                  onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715]"
                >
                  <option value="Physical Retail Shop">Physical Retail Phone Shop</option>
                  <option value="E-Commerce Seller">Online / E-Commerce Seller (eBay, Amazon, Web)</option>
                  <option value="Corporate Fleet / Enterprise">Corporate Fleet / Enterprise Buyer</option>
                  <option value="Education / Public Sector">Educational Institution / Public Sector</option>
                  <option value="Bulk Buyer / Exporter">Master Distributor / Exporter</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Estimated Monthly Purchasing Volume *</label>
                <select
                  value={form.monthlyVolume}
                  onChange={(e) => setForm({ ...form, monthlyVolume: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715]"
                >
                  <option value="Under £5,000">Under £5,000 / month</option>
                  <option value="£5,000 - £15,000">£5,000 - £15,000 / month</option>
                  <option value="£15,000 - £50,000">£15,000 - £50,000 / month</option>
                  <option value="£50,000+">£50,000+ / month (VIP Enterprise)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#101A18] mb-1">Stock Preferences / Requirements</label>
              <textarea
                rows={3}
                placeholder="Mention target SKUs, preferred grades, or specific stock requests (e.g. Sealed iPhones, Grade A MacBooks, Margin VAT)..."
                value={form.comments}
                onChange={(e) => setForm({ ...form, comments: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" size="lg" type="submit" disabled={loading} icon={<Send className="w-4 h-4" />}>
                {loading ? 'Submitting Application...' : 'Submit Trade Application'}
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Structured Solutions for 5 Buyer Segments */}
      <div className="space-y-6">
        <div className="border-b border-[#D8E2DE] pb-4">
          <span className="text-xs font-bold text-[#071715] uppercase tracking-wider">Targeted B2B Programs</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#071715] mt-1">Our Dedicated Wholesale Solutions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-[#D8E2DE] p-6 b2b-card-shadow flex flex-col justify-between space-y-4 hover:border-[#D4AF62] transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-[#E5F3EF] rounded-xl border border-[#D8E2DE] text-[#007A68]">{item.icon}</div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wide bg-[#FAF8F2] text-[#071715] px-2.5 py-1 rounded-full border border-[#D4AF62]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-extrabold text-[#071715] text-xl">{item.title}</h3>
                <p className="text-[#596662] text-xs leading-relaxed">{item.description}</p>

                <ul className="space-y-2 pt-2 border-t border-[#D8E2DE]">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#101A18]">
                      <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#D8E2DE] flex items-center justify-between">
                <Link
                  to="/contact"
                  className="text-xs font-bold text-[#00A88F] hover:underline flex items-center gap-1"
                >
                  Request Category Quote <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Wholesale Quote Modal */}
      <EnquiryModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
};
