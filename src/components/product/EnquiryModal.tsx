import React, { useState } from 'react';
import { Product } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { CheckCircle2, Send, Building, Mail, Phone, Package, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { createWhatsAppGeneralUrl } from '../../utils/whatsapp';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  product
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<{
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    productCategory: string;
    quantity: number;
    grade: string;
    message: string;
    honeypot: string;
  }>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    productCategory: product ? product.name : 'Mobile Phones',
    quantity: product ? product.moq : 10,
    grade: product ? product.grade : 'Grade A',
    message: '',
    honeypot: '' // Spam protection
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referenceNum, setReferenceNum] = useState<string>('');

  const validateFrontend = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[\d\s\+\-\(\)]{7,25}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone or WhatsApp number';
    }

    if (!formData.productCategory.trim()) {
      errors.productCategory = 'Product / Category selection is required';
    }

    if (!formData.quantity || formData.quantity < 1) {
      errors.quantity = 'Quantity must be at least 1';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide details about your enquiry';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateFrontend()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.fields) {
          setFieldErrors(data.fields);
        }
        setServerError(data.error || 'Failed to submit enquiry. Please check your entries.');
        setLoading(false);
        return;
      }

      setLoading(false);
      setReferenceNum(data.referenceNumber || `ENQ-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
    } catch (err) {
      console.error('Enquiry API Error:', err);
      setLoading(false);
      setServerError('Unable to connect to backend server. Please try again or order on WhatsApp.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setServerError(null);
    setFieldErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={product ? `${t('common.requestPricing', 'Get a Wholesale Quote')} — ${product.name}` : t('common.requestPricing', 'Get a Wholesale Quote')}
      subtitle="UK Sales Desk • Official B2B Trade Response within 1 Business Hour"
      maxWidth="xl"
    >
      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-slate-900">{t('forms.successAlert', 'Enquiry Received Successfully!')}</h4>
          
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm font-semibold max-w-md mx-auto leading-relaxed">
            {t('forms.successAlert', 'Thank you for your wholesale enquiry. Our team will review your request and get back to you shortly.')}
          </div>

          <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 max-w-md mx-auto border border-slate-200 text-left space-y-1.5 font-sans">
            <div><span className="font-bold text-slate-900">Reference:</span> <span className="font-mono text-emerald-600 font-bold">{referenceNum}</span></div>
            <div><span className="font-bold text-slate-900">{t('forms.fullNameLabel', 'Customer')}:</span> {formData.fullName} ({formData.companyName || 'Trade'})</div>
            <div><span className="font-bold text-slate-900">{t('common.email', 'Email')}:</span> {formData.email}</div>
            <div><span className="font-bold text-slate-900">{t('forms.interestedProductsLabel', 'Product / Category')}:</span> {formData.productCategory}</div>
            <div><span className="font-bold text-slate-900">Quantity:</span> {formData.quantity} {t('common.units', 'units')}</div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="md" icon={<WhatsAppIcon className="w-4 h-4" />}>
                {t('common.whatsappTradeDesk', 'WhatsApp Sales Line')}
              </Button>
            </a>
            <Button variant="dark" size="md" onClick={handleReset}>
              {t('common.close', 'Close')}
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Global Server Error Alert */}
          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Hidden Honeypot Spam Protection Field */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {product && (
            <div className="bg-emerald-50 text-slate-900 p-3.5 rounded-xl flex items-center justify-between border border-emerald-200">
              <div className="flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg bg-white border border-slate-200" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{product.name}</h4>
                  <span className="text-[10px] text-slate-600">SKU: {product.sku} • Grade: {product.grade}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#0a4d3c] text-xs block">{t('common.askPrice', 'Request Price')}</span>
                <span className="text-[10px] text-emerald-700 font-bold block">{t('common.moq', 'MOQ')}: {product.moq}u</span>
              </div>
            </div>
          )}

          {/* Field 1 & 2: Full Name * and Company Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('forms.fullNameLabel', 'Full Name')} *</label>
              <input
                type="text"
                required
                placeholder="e.g. David Smith"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 ${
                  fieldErrors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500'
                }`}
              />
              {fieldErrors.fullName && <p className="text-[11px] text-red-600 mt-1">{fieldErrors.fullName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('forms.companyNameLabel', 'Company Name')}</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. Apex Mobile Retail Ltd"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Field 3 & 4: Email * and Phone / WhatsApp * */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('forms.emailLabel', 'Email')} *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="purchasing@company.co.uk"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 ${
                    fieldErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500'
                  }`}
                />
              </div>
              {fieldErrors.email && <p className="text-[11px] text-red-600 mt-1">{fieldErrors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <span>{t('forms.phoneLabel', 'Phone / WhatsApp')} *</span>
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#00A88F]" />
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  required
                  placeholder="+44 7123 456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 ${
                    fieldErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500'
                  }`}
                />
              </div>
              {fieldErrors.phone && <p className="text-[11px] text-red-600 mt-1">{fieldErrors.phone}</p>}
            </div>
          </div>

          {/* Field 5, 6, & 7: Product / Category *, Quantity *, Grade Required */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('forms.interestedProductsLabel', 'Product / Category')} *</label>
              <input
                type="text"
                required
                placeholder="e.g. iPhone 15 Pro, MacBooks, PS5"
                value={formData.productCategory}
                onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 ${
                  fieldErrors.productCategory ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500'
                }`}
              />
              {fieldErrors.productCategory && <p className="text-[11px] text-red-600 mt-1">{fieldErrors.productCategory}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity *</label>
              <div className="relative">
                <Package className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                  className={`w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 ${
                    fieldErrors.quantity ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500'
                  }`}
                />
              </div>
              {fieldErrors.quantity && <p className="text-[11px] text-red-600 mt-1">{fieldErrors.quantity}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('productDetail.gradeLabel', 'Grade Required')}</label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Brand New Sealed">{t('common.brandNewSealed', 'Brand New Sealed')}</option>
                <option value="Refurbished Grade A+">{t('grading.gradeA', 'Grade A+')}</option>
                <option value="Grade A">{t('grading.gradeA', 'Grade A')}</option>
                <option value="Grade B">{t('grading.gradeB', 'Grade B')}</option>
                <option value="Grade C">{t('grading.gradeC', 'Grade C')}</option>
              </select>
            </div>
          </div>

          {/* Field 8: Message * */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('forms.notesLabel', 'Message')} *</label>
            <textarea
              rows={4}
              required
              placeholder="Provide target price preferences, specific grade notes, delivery postcodes, or urgent delivery deadlines..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 ${
                fieldErrors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500'
              }`}
            />
            {fieldErrors.message && <p className="text-[11px] text-red-600 mt-1">{fieldErrors.message}</p>}
          </div>

          {/* Form Controls */}
          <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={onClose}>
              {t('common.cancel', 'Cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={loading} icon={<Send className="w-4 h-4" />} className="!bg-emerald-600 hover:!bg-emerald-500">
              {loading ? t('forms.submitting', 'Submitting...') : t('forms.submitRequestBtn', 'Submit Wholesale Enquiry')}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
