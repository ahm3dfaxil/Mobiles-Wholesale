import React, { useState } from 'react';
import { ShieldCheck, RotateCcw, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { createWhatsAppGeneralUrl } from '../utils/whatsapp';
import { EnquiryModal } from '../components/product/EnquiryModal';

export const BusinessITRecycling: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services/recycling' },
    { name: 'Business IT Recycling', url: '/business-it-recycling' }
  ];

  return (
    <>
      <SEOHead
        title="Business IT Recycling - Mobile Wholesale"
        description="Discover our business IT recycling services designed to help companies safely recycle mobile devices and electronics responsibly."
        canonicalPath="/business-it-recycling/"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-[#FAF8F2]">
        <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              <RotateCcw className="w-3.5 h-3.5 text-[#00A88F]" /> Sustainable Corporate IT Disposal
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
              Business & Corporate IT Asset Recycling
            </h1>
            <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
              Safe, secure, and environmentally compliant recycling of end-of-life mobile phones, tablets, laptops, and IT hardware for UK businesses and public sector organizations.
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Button onClick={() => setIsModalOpen(true)} variant="primary" size="lg" icon={<FileSpreadsheet className="w-5 h-5" />}>
                Request IT Collection Audit
              </Button>
              <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" icon={<WhatsAppIcon className="w-5 h-5" />}>
                  Recycling Help Desk
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* The 3 Step Process */}
        <div className="bg-white rounded-2xl border border-[#D8E2DE] p-8 sm:p-10 b2b-card-shadow space-y-6">
          <h2 className="text-2xl font-black text-[#071715]">Our 3-Step Recycling Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF8F2] p-6 rounded-xl border border-[#D8E2DE] space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#071715] text-white font-bold flex items-center justify-center text-sm">1</span>
              <h3 className="font-extrabold text-lg text-[#071715]">Evaluate & Quote</h3>
              <p className="text-xs text-[#596662]">Send us your hardware inventory manifest to receive a preliminary valuation and recycling audit.</p>
            </div>
            <div className="bg-[#FAF8F2] p-6 rounded-xl border border-[#D8E2DE] space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#071715] text-white font-bold flex items-center justify-center text-sm">2</span>
              <h3 className="font-extrabold text-lg text-[#071715]">Free Insured Logistics</h3>
              <p className="text-xs text-[#596662]">We arrange free nationwide courier or secure pallet collection from your premises.</p>
            </div>
            <div className="bg-[#FAF8F2] p-6 rounded-xl border border-[#D8E2DE] space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#071715] text-white font-bold flex items-center justify-center text-sm">3</span>
              <h3 className="font-extrabold text-lg text-[#071715]">Sanitization & Payment</h3>
              <p className="text-xs text-[#596662]">Certified data erasure (ADISA standard) followed by prompt payment or asset disposal certificate.</p>
            </div>
          </div>
        </div>
      </div>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
export default BusinessITRecycling;
