import React, { useState } from 'react';
import { sendFormEmail, EMAILJS_CONFIG, EmailParams } from '../services/emailService';
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Coins, 
  FileText, 
  Package,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { FileUploader, UploadedFileItem } from '../components/common/FileUploader';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';
import { SellToUsForm } from '../types';
import { createWhatsAppSellToUsUrl } from '../utils/whatsapp';
import { UK_COMPANY_INFO } from '../data/mockData';

export const SellToUs: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<SellToUsForm>({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    productType: 'Smartphones & Mobile Phones',
    brand: 'Apple',
    quantity: 25,
    condition: 'Grade A / Grade B Mixed Lot',
    description: '',
    message: '',
    askingPriceGBP: undefined
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referenceNum, setReferenceNum] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const productTypes = [
    'Smartphones & Mobile Phones',
    'Tablets & iPads',
    'MacBooks & Laptops',
    'Smartwatches & Wearables',
    'Gaming Consoles & Handhelds',
    'Audio & Accessories',
    'Mixed Lot / Multi-Category Overstock'
  ];

  const brands = [
    'Apple',
    'Samsung',
    'Google',
    'Sony',
    'Xiaomi',
    'Dell',
    'Lenovo',
    'Nintendo',
    'Multiple Brands / Mixed Inventory'
  ];

  const conditions = [
    'Brand New Factory Sealed',
    'Grade A / Mint Tested',
    'Grade A / Grade B Mixed Lot',
    'Grade C / Heavy Cosmetic Wear',
    'Customer Returns / Untested',
    'Faulty / Spares & Repair'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.productType.trim() || !formData.brand.trim()) {
      setErrorMessage('Please complete all required fields marked with *');
      setLoading(false);
      return;
    }

    const fileListText = uploadedFiles.map(f => f.name).join(', ');
    const fullComments = [
      formData.message,
      fileListText ? `Uploaded Stock Lists: ${fileListText}` : ''
    ].filter(Boolean).join('\n\n');

    try {
      await sendFormEmail({
        form_type: 'Sell To Us / Device Purchasing',
        from_name: formData.name,
        company_name: formData.companyName,
        from_email: formData.email,
        phone: formData.phone,
        device_specs: `${formData.brand} ${formData.productType}${formData.description ? ` — ${formData.description}` : ''}`,
        estimated_quantity: String(formData.quantity),
        condition_grade: formData.condition,
        target_price: formData.askingPriceGBP ? `£${formData.askingPriceGBP}` : 'Open Valuation',
        comments: fullComments
      });

      // Async notification to local backend if running
      fetch('/api/sell-to-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          productType: formData.productType,
          brand: formData.brand,
          quantity: formData.quantity,
          condition: formData.condition,
          description: formData.description,
          askingPriceGBP: formData.askingPriceGBP,
          stockListFileName: fileListText || undefined
        })
      }).catch(err => console.warn('API notification fallback:', err));

      const refNum = `VAL-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceNum(refNum);
      setSubmitted(true);

      // Reset form fields after successful submission
      setFormData({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        productType: 'Smartphones (iPhones & Android)',
        brand: 'Apple',
        quantity: 10,
        condition: 'Grade A / Mint Condition',
        description: '',
        askingPriceGBP: undefined,
        message: ''
      });
      setUploadedFiles([]);
    } catch (err: any) {
      console.error('EmailJS submission error:', err);
      setErrorMessage(err.message || 'Failed to submit valuation request. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-[#FAF8F2]">
      {/* Header Banner */}
      <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
            <Sparkles className="w-3.5 h-3.5 text-[#00A88F]" /> Direct Stock Purchasing & Liquidation
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
            {t('sellToUs.title', 'Sell Your Surplus Stock & Devices To Us')}
          </h1>
          <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
            {t('sellToUs.subtitle', 'We purchase bulk smartphones, tablets, MacBooks, and tech stock directly from liquidators, corporate fleets, and trade suppliers.')}
          </p>
        </div>
      </div>

      {/* Trust & Value Proposition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#D8E2DE] b2b-card-shadow space-y-3 hover:border-[#D4AF62] transition-all">
          <div className="w-12 h-12 bg-[#E5F3EF] text-[#007A68] rounded-xl flex items-center justify-center border border-[#D8E2DE]">
            <Coins className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-[#071715] text-lg">Instant Same-Day Payouts</h3>
          <p className="text-xs text-[#596662] leading-relaxed">
            Immediate BACS / CHAPS UK bank transfer disbursed as soon as software diagnostic testing completes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#D8E2DE] b2b-card-shadow space-y-3 hover:border-[#D4AF62] transition-all">
          <div className="w-12 h-12 bg-[#E5F3EF] text-[#007A68] rounded-xl flex items-center justify-center border border-[#D8E2DE]">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-[#071715] text-lg">Insured UK Courier Pickup</h3>
          <p className="text-xs text-[#596662] leading-relaxed">
            We arrange fully insured DPD or pallet freight courier collection direct from your store, warehouse, or office.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#D8E2DE] b2b-card-shadow space-y-3 hover:border-[#D4AF62] transition-all">
          <div className="w-12 h-12 bg-[#E5F3EF] text-[#007A68] rounded-xl flex items-center justify-center border border-[#D8E2DE]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-[#071715] text-lg">GDPR Data Erasure Certificate</h3>
          <p className="text-xs text-[#596662] leading-relaxed">
            Certified Blancco / PhoneCheck software sanitization guaranteeing complete GDPR data destruction on all devices.
          </p>
        </div>
      </div>

      {/* Main Valuation Submission Form */}
      <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-10 b2b-card-shadow">
        <div className="border-b border-[#D8E2DE] pb-6 mb-6">
          <span className="text-xs font-bold text-[#071715] uppercase tracking-wider">Fast Stock Valuation</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#071715] mt-1">Bulk Stock Valuation & Offer Form</h2>
          <p className="text-[#596662] text-sm mt-1">
            Fill in your stock lot details below. Our purchasing desk will review your submission and issue a competitive valuation within 2 business hours.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-20 h-20 bg-[#E5F3EF] text-[#00A88F] rounded-full flex items-center justify-center mx-auto shadow-inner border border-[#D8E2DE]">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-[#071715]">Valuation Submission Received!</h3>
              <p className="text-sm text-[#596662] max-w-lg mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-[#101A18]">{formData.name}</span>. Your stock offer for{' '}
                <span className="font-bold text-[#101A18]">{formData.quantity} units</span> of{' '}
                <span className="font-bold text-[#101A18]">{formData.brand} {formData.productType}</span> has been routed directly to our buying desk.
              </p>
            </div>

            <div className="bg-[#FAF8F2] p-6 rounded-2xl text-xs text-[#101A18] max-w-md mx-auto border border-[#D8E2DE] text-left space-y-2 font-mono">
              <div className="flex justify-between border-b border-[#D8E2DE] pb-2">
                <span className="font-bold text-[#596662] uppercase">Reference:</span>
                <span className="font-bold text-[#00A88F]">{referenceNum}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#596662]">Company:</span>
                <span className="font-semibold text-[#101A18]">{formData.companyName || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#596662]">Email:</span>
                <span className="font-semibold text-[#101A18]">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#596662]">Target Email Desk:</span>
                <span className="font-semibold text-[#101A18]">{UK_COMPANY_INFO.salesEmail}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={createWhatsAppSellToUsUrl(`${formData.quantity}x ${formData.brand} ${formData.productType}`, formData.quantity)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="lg" icon={<WhatsAppIcon className="w-5 h-5" />}>
                  Speed Up Offer on WhatsApp
                </Button>
              </a>
              <Button variant="dark" size="lg" onClick={() => setSubmitted(false)}>
                Submit Another Inventory Lot
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Seller Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Company / Seller Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Tech Trade Ltd"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Business Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="seller@company.co.uk"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1 flex items-center gap-1.5">
                  <span>Phone / WhatsApp Number *</span>
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#00A88F]" />
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+44 7123 456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
                />
              </div>
            </div>

            {/* Product Type & Brand Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Product Type *</label>
                <select
                  value={formData.productType}
                  onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715]"
                >
                  {productTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Brand *</label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715]"
                >
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Quantity (Units) *</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Stock Condition *</label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715]"
                >
                  {conditions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description Breakdown */}
            <div>
              <label className="block text-xs font-bold text-[#101A18] mb-1">
                Description / Device Models Breakdown *
              </label>
              <textarea
                rows={3}
                required
                placeholder="List exact models, capacities, and specs (e.g. 10x iPhone 14 128GB, 5x Galaxy S23 256GB, 10x iPad 9th Gen)..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
              />
            </div>

            {/* File Upload Section */}
            <div>
              <label className="block text-xs font-bold text-[#101A18] mb-1">
                Upload Stock List / Images (Optional)
              </label>
              <FileUploader
                files={uploadedFiles}
                onChange={setUploadedFiles}
                maxFiles={5}
              />
            </div>

            {/* Additional Message / Notes */}
            <div>
              <label className="block text-xs font-bold text-[#101A18] mb-1">Additional Message / Target Price (Optional)</label>
              <textarea
                rows={3}
                placeholder="Mention target price (£ per lot or per unit), urgent sale deadlines, VAT status (Margin vs Standard), or pickup address details..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
              />
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#D8E2DE]">
              <p className="text-xs text-[#596662]">
                Enquiry will be emailed directly to <span className="font-semibold text-[#101A18]">{UK_COMPANY_INFO.salesEmail}</span>
              </p>
              <Button variant="whatsapp" size="lg" type="submit" disabled={loading} icon={<Send className="w-5 h-5" />}>
                {loading ? 'Submitting Valuation...' : 'Submit Valuation Enquiry'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
