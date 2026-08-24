import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, AlertCircle, FileText, PhoneCall, RefreshCw, Mail, Phone } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';
import { createWhatsAppGeneralUrl } from '../utils/whatsapp';
import { UK_COMPANY_INFO } from '../data/mockData';
import { EnquiryModal } from '../components/product/EnquiryModal';

export const WarrantyAndReturns: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumbs = [
    { name: t('navigation.home', 'Home'), url: '/' },
    { name: t('navigation.buyFromUs', 'Buy From Us'), url: '/buy-from-us' },
    { name: t('navigation.warrantyAndReturns', 'Warranty & Returns'), url: '/warranty-and-returns' }
  ];

  return (
    <>
      <SEOHead
        title="Warranty & Returns Policy | Mobiles Wholesale UK"
        description="Learn about Mobiles Wholesale UK trade warranty coverage, returns process, RMA faulty device procedures, covered & excluded items, and how to contact customer support."
        canonicalPath="/warranty-and-returns"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-[#FAF8F2]">
        {/* Hero Header */}
        <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00A88F]" /> Trade Warranty & RMA Policy
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
              Warranty & Returns Policy
            </h1>
            <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
              Transparent UK trade warranty terms, clear returns workflows, and dedicated support for all B2B customer accounts.
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Link to="/contact">
                <Button variant="primary" size="lg" icon={<PhoneCall className="w-5 h-5" />}>
                  Contact Returns Desk
                </Button>
              </Link>
              <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" icon={<WhatsAppIcon className="w-5 h-5" />}>
                  WhatsApp Support Desk
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Warranty Coverage & Durations Grid */}
        <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-10 b2b-card-shadow space-y-6">
          <div className="border-b border-[#D8E2DE] pb-3">
            <span className="text-xs font-bold text-[#00A88F] uppercase tracking-wider">Coverage Overview</span>
            <h2 className="text-2xl font-black text-[#071715] mt-1">Warranty Coverage & Durations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#101A18]">
            <div className="bg-[#FAF8F2] p-5 rounded-xl border border-[#D8E2DE] space-y-2">
              <span className="text-xs font-black text-[#007A68] bg-[#E5F3EF] px-2.5 py-1 rounded border border-[#D8E2DE]">Brand New Sealed</span>
              <h4 className="font-extrabold text-sm text-[#071715] pt-1">1 Year Manufacturer Warranty</h4>
              <p className="text-[#596662] leading-relaxed">Factory sealed items carry 1 Year official manufacturer warranty support directly serviced through official brand repair channels (e.g. Apple, Samsung, Sony) with 100% factory battery.</p>
            </div>

            <div className="bg-[#FAF8F2] p-5 rounded-xl border border-[#D8E2DE] space-y-2">
              <span className="text-xs font-black text-[#007A68] bg-[#E5F3EF] px-2.5 py-1 rounded border border-[#D8E2DE]">All Graded Stock (Grade A, B & C)</span>
              <h4 className="font-extrabold text-sm text-[#071715] pt-1">14 - 28 Days UK Trade Warranty</h4>
              <p className="text-[#596662] leading-relaxed">Covered by Mobiles Wholesale 14 - 28 Days UK trade warranty against hardware defects, component failure, and operational issues. Minimum 80% battery health guaranteed across all grades.</p>
            </div>
          </div>
        </div>

        {/* Covered vs Excluded Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What Is Covered */}
          <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-8 b2b-card-shadow space-y-4">
            <div className="flex items-center gap-2 text-[#007A68]">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-xl font-bold text-[#071715]">What Is Covered Under Warranty</h3>
            </div>
            <ul className="space-y-2 text-xs text-[#101A18]">
              <li className="flex items-start gap-2 bg-[#FAF8F2] p-3 rounded-xl border border-[#D8E2DE]">
                <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5" />
                <span>Internal hardware defects (motherboard, logic board, chipset failure)</span>
              </li>
              <li className="flex items-start gap-2 bg-[#FAF8F2] p-3 rounded-xl border border-[#D8E2DE]">
                <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5" />
                <span>Display hardware defects (touchscreen unresponsiveness, dead pixels uncaused by impact)</span>
              </li>
              <li className="flex items-start gap-2 bg-[#FAF8F2] p-3 rounded-xl border border-[#D8E2DE]">
                <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5" />
                <span>Audio component failure (earpiece, microphone, loudspeaker hardware failure)</span>
              </li>
              <li className="flex items-start gap-2 bg-[#FAF8F2] p-3 rounded-xl border border-[#D8E2DE]">
                <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5" />
                <span>Charging port hardware defects preventing normal battery charging</span>
              </li>
            </ul>
          </div>

          {/* What Is Excluded */}
          <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-8 b2b-card-shadow space-y-4">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertCircle className="w-5 h-5" />
              <h3 className="text-xl font-bold text-[#071715]">What Is Not Covered</h3>
            </div>
            <ul className="space-y-2 text-xs text-[#101A18]">
              <li className="flex items-start gap-2 bg-[#FAF8F2] p-3 rounded-xl border border-[#D8E2DE]">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>Accidental physical damage, drops, cracked glass, or bent housing after delivery</span>
              </li>
              <li className="flex items-start gap-2 bg-[#FAF8F2] p-3 rounded-xl border border-[#D8E2DE]">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>Liquid or water ingress damage</span>
              </li>
              <li className="flex items-start gap-2 bg-[#FAF8F2] p-3 rounded-xl border border-[#D8E2DE]">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>Unauthorized third-party repair attempts, opened housing, or missing security seals</span>
              </li>
              <li className="flex items-start gap-2 bg-[#FAF8F2] p-3 rounded-xl border border-[#D8E2DE]">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>Software modifications, jailbreaking, or account lockouts (iCloud / Google lock)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Faulty Device & RMA Returns Process */}
        <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-10 b2b-card-shadow space-y-6">
          <div className="border-b border-[#D8E2DE] pb-3">
            <span className="text-xs font-bold text-[#00A88F] uppercase tracking-wider">Returns Procedure</span>
            <h2 className="text-2xl font-black text-[#071715] mt-1">Faulty Device Returns Process (RMA)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-[#101A18]">
            <div className="bg-[#FAF8F2] p-5 rounded-xl border border-[#D8E2DE] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#071715] text-white font-bold flex items-center justify-center text-sm">1</div>
              <h4 className="font-extrabold text-sm text-[#071715]">Submit RMA Request</h4>
              <p className="text-[#596662] leading-relaxed">Contact your account manager or email sales@mobileswholesale.co.uk with serial/IMEI number and fault details.</p>
            </div>

            <div className="bg-[#FAF8F2] p-5 rounded-xl border border-[#D8E2DE] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#071715] text-white font-bold flex items-center justify-center text-sm">2</div>
              <h4 className="font-extrabold text-sm text-[#071715]">RMA Approval & Shipping</h4>
              <p className="text-[#596662] leading-relaxed">Receive your RMA number and return instructions. Securely package the device ensuring user accounts are removed.</p>
            </div>

            <div className="bg-[#FAF8F2] p-5 rounded-xl border border-[#D8E2DE] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#071715] text-white font-bold flex items-center justify-center text-sm">3</div>
              <h4 className="font-extrabold text-sm text-[#071715]">Technical Inspection</h4>
              <p className="text-[#596662] leading-relaxed">Our technicians inspect the returned unit to verify the reported hardware issue and serial number match.</p>
            </div>

            <div className="bg-[#FAF8F2] p-5 rounded-xl border border-[#D8E2DE] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#007A68] text-white font-bold flex items-center justify-center text-sm">4</div>
              <h4 className="font-extrabold text-sm text-[#071715]">Replacement or Refund</h4>
              <p className="text-[#596662] leading-relaxed">Upon verification, a replacement unit is dispatched or credit note / refund applied to your trade account.</p>
            </div>
          </div>
        </div>

        {/* Contact Information & Support Desk */}
        <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-8 b2b-card-shadow space-y-4">
          <h3 className="text-xl font-bold text-[#071715]">Need Assistance With a Return?</h3>
          <p className="text-xs text-[#596662]">Contact our dedicated customer support team directly with your trade invoice number and IMEI.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-2">
            <a href="mailto:sales@mobileswholesale.co.uk" className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] hover:border-[#00A88F] transition-all flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#00A88F] shrink-0" />
              <div>
                <div className="font-bold text-[#071715]">Sales & Returns Desk</div>
                <div className="text-[#596662]">sales@mobileswholesale.co.uk</div>
              </div>
            </a>

            <a href="mailto:info@mobileswholesale.co.uk" className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] hover:border-[#00A88F] transition-all flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#00A88F] shrink-0" />
              <div>
                <div className="font-bold text-[#071715]">Purchasing / Finance</div>
                <div className="text-[#596662]">info@mobileswholesale.co.uk</div>
              </div>
            </a>

            <a href="tel:+442080044421" className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] hover:border-[#00A88F] transition-all flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#00A88F] shrink-0" />
              <div>
                <div className="font-bold text-[#071715]">Call Phone Desk</div>
                <div className="text-[#596662]">+44 20 8004 4421</div>
              </div>
            </a>

            <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer" className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] hover:border-[#00A88F] transition-all flex items-center gap-3">
              <WhatsAppIcon className="w-5 h-5 text-[#00A88F] shrink-0" />
              <div>
                <div className="font-bold text-[#071715]">WhatsApp Support</div>
                <div className="text-[#596662]">+44 7400055536</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
