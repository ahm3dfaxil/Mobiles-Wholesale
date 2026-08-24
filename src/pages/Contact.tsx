import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Building2, 
  Send, 
  CheckCircle2, 
  Globe,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';
import { UK_COMPANY_INFO } from '../data/mockData';
import { createWhatsAppGeneralUrl } from '../utils/whatsapp';

import { SEOHead } from '../components/common/SEOHead';

import { sendFormEmail, EMAILJS_CONFIG, EmailParams } from '../services/emailService';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const breadcrumbs = [
    { name: t('navigation.home', 'Home'), url: '/' },
    { name: t('navigation.contact', 'Contact Us'), url: '/contact' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: 'General Wholesale Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent duplicate submissions
    setLoading(true);
    setErrorMessage(null);

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields marked with *');
      setLoading(false);
      return;
    }

    try {
      await sendFormEmail({
        form_type: 'Contact & Wholesale Enquiry',
        from_name: formData.name,
        company_name: formData.company,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });

      // Async notification to local API if server is running
      fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          companyName: formData.company,
          email: formData.email,
          phone: formData.phone,
          productCategory: formData.subject,
          quantity: 1,
          grade: 'Contact Page Inquiry',
          message: formData.message
        })
      }).catch(err => console.warn('API notification fallback:', err));

      setSubmitted(true);
      // Reset form fields after successful send
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: 'General Wholesale Inquiry',
        message: ''
      });
    } catch (err: any) {
      console.error('EmailJS submission error:', err);
      setErrorMessage(err.message || 'Failed to deliver your message. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Us | Mobiles Wholesale UK"
        description="Contact our team for wholesale mobile phone inquiries, product information, pricing details, or business partnership opportunities."
        canonicalPath="/contact"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-[#FAF8F2]">
      {/* Header Banner */}
      <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
            {t('contactPage.title', 'Contact Our UK Trade Team')}
          </h1>
          <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
            {t('contactPage.subtitle', 'Have a custom stock inquiry or need assistance? Contact our London trade desk today.')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Configured Contact Info Card */}
          <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-8 b2b-card-shadow space-y-5 hover:border-[#D4AF62] transition-all">
            <h3 className="text-lg font-extrabold text-[#071715] flex items-center gap-2 border-b border-[#D8E2DE] pb-3">
              <Building2 className="w-5 h-5 text-[#007A68]" />
              UK Central Trade Desk & Warehouse
            </h3>

            <div className="space-y-4 text-xs text-[#101A18]">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#E5F3EF] text-[#007A68] rounded-lg shrink-0 mt-0.5 border border-[#D8E2DE]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#101A18] block text-xs">Phone Hotline:</span>
                  <a href={`tel:${UK_COMPANY_INFO.phone}`} className="hover:text-[#00A88F] font-mono font-bold text-sm">
                    {UK_COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Sales Email */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#E5F3EF] text-[#007A68] rounded-lg shrink-0 mt-0.5 border border-[#D8E2DE]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#101A18] block text-xs">Sales & Trade Email:</span>
                  <a href={`mailto:${UK_COMPANY_INFO.salesEmail}`} className="hover:text-[#00A88F] font-semibold text-xs text-[#007A68]">
                    {UK_COMPANY_INFO.salesEmail}
                  </a>
                </div>
              </div>

              {/* Purchasing / Finance Email */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#E5F3EF] text-[#007A68] rounded-lg shrink-0 mt-0.5 border border-[#D8E2DE]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#101A18] block text-xs">Purchasing / Finance:</span>
                  <a href={`mailto:${UK_COMPANY_INFO.infoEmail}`} className="hover:text-[#00A88F] font-semibold text-xs text-[#007A68]">
                    {UK_COMPANY_INFO.infoEmail}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#E5F3EF] text-[#007A68] rounded-lg shrink-0 mt-0.5 border border-[#D8E2DE]">
                  <WhatsAppIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#101A18] block text-xs">WhatsApp Direct Line:</span>
                  <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer" className="hover:underline font-bold font-mono text-sm text-[#00A88F]">
                    {UK_COMPANY_INFO.mobileWhatsapp}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#E5F3EF] text-[#007A68] rounded-lg shrink-0 mt-0.5 border border-[#D8E2DE]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#101A18] block text-xs">Business Address:</span>
                  <span className="leading-relaxed font-medium text-[#596662]">{UK_COMPANY_INFO.address}</span>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#E5F3EF] text-[#D4AF62] rounded-lg shrink-0 mt-0.5 border border-[#D8E2DE]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#101A18] block text-xs">Trading & Dispatch Hours:</span>
                  <span className="font-semibold text-[#596662]">{UK_COMPANY_INFO.tradeHours}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D8E2DE]">
              <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="whatsapp" size="md" fullWidth icon={<WhatsAppIcon className="w-4 h-4" />}>
                  Chat Live on WhatsApp Now
                </Button>
              </a>
            </div>
          </div>

          {/* Configured Legal Credentials Box */}
          <div className="bg-[#FAF8F2] border border-[#D8E2DE] rounded-2xl p-6 space-y-3">
            <h4 className="font-bold text-sm text-[#071715] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#007A68]" />
              UK Business Registration Details
            </h4>
            <div className="text-xs text-[#596662] space-y-1.5 font-mono">
              <div>Company Name: <span className="font-semibold text-[#101A18]">{UK_COMPANY_INFO.name}</span></div>
              <div>Trading Notice: <span>{UK_COMPANY_INFO.tradingNotice}</span></div>
              <div>UK Registration: <span>{UK_COMPANY_INFO.registrationNumber}</span></div>
              <div>HMRC VAT Status: <span>{UK_COMPANY_INFO.vatNumber}</span></div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-8 b2b-card-shadow">
          <h3 className="text-xl font-extrabold text-[#071715] border-b border-[#D8E2DE] pb-4 mb-6">
            Send a Wholesale Message / Enquiry
          </h3>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#E5F3EF] text-[#00A88F] rounded-full flex items-center justify-center mx-auto shadow-inner border border-[#D8E2DE]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-[#071715]">Message Delivered!</h4>
              <p className="text-sm text-[#596662] max-w-md mx-auto leading-relaxed">
                Thank you for contacting Mobiles Wholesale UK. Our trade team will respond to your message shortly at <span className="font-semibold text-[#101A18]">{formData.email}</span>.
              </p>
              <Button variant="dark" size="md" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#101A18] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101A18] mb-1">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Mobile Shop"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#101A18] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@company.co.uk"
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

              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Enquiry Subject *</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715]"
                >
                  <option value="General Wholesale Inquiry">General Wholesale Inquiry</option>
                  <option value="Request Pro-Forma Price Quote">Request Pro-Forma Price Quote</option>
                  <option value="Daily Stock List CSV Feed Request">Daily Stock List CSV Feed Request</option>
                  <option value="Sell To Us / Device Buy Back Enquiry">Sell To Us / Device Buy Back Enquiry</option>
                  <option value="Trade Application Request">Trade Application Request</option>
                  <option value="Warehouse Appointment Request">Warehouse Appointment Request</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101A18] mb-1">Your Message *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Detail your inquiry, requested device models, quantities, VAT scheme preference, or delivery timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#D8E2DE] bg-[#FAF8F2] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-[#596662]">
                  Target email: <span className="font-semibold text-[#101A18]">{UK_COMPANY_INFO.salesEmail}</span>
                </span>
                <Button variant="primary" size="lg" type="submit" disabled={loading} icon={<Send className="w-4 h-4" />}>
                  {loading ? 'Sending Message...' : 'Send Wholesale Enquiry'}
                </Button>
              </div>
            </form>
          )}

          {/* Sell To Us / Device Buy Back Dedicated Quick Box */}
          <div className="mt-8 pt-6 border-t border-[#D8E2DE] bg-[#FAF8F2] rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#071715] bg-[#E5F3EF] px-2.5 py-1 rounded border border-[#D4AF62]">
                Sell To Us — Device Purchasing
              </span>
              <span className="text-xs text-[#00A88F] font-bold">2-Hour Valuation</span>
            </div>
            <h4 className="font-extrabold text-[#071715] text-base">Have Mobile Phones or Tech Stock to Sell?</h4>
            <p className="text-xs text-[#596662] leading-relaxed">
              We buy brand new, clearance, customer returns, and excess mobile inventory directly from businesses, liquidators, and trade sellers. Select <span className="font-bold text-[#071715]">"Sell To Us / Device Buy Back Enquiry"</span> in the form above or visit our dedicated trading page.
            </p>
            <div className="pt-1 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, subject: 'Sell To Us / Device Buy Back Enquiry' })}
                className="px-3.5 py-2 text-xs font-bold text-white bg-[#071715] hover:bg-[#063F35] rounded-lg transition-colors cursor-pointer"
              >
                Pre-fill Form for Buy Back
              </button>
              <a
                href="/sell-to-us"
                className="text-xs font-bold text-[#00A88F] hover:underline"
              >
                Visit Sell To Us Page →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
};
