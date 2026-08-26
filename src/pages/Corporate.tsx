import React, { useState } from 'react';
import { Building2, FileSpreadsheet } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { createWhatsAppGeneralUrl } from '../utils/whatsapp';
import { EnquiryModal } from '../components/product/EnquiryModal';
import { QualityProductsSection } from '../components/common/QualityProductsSection';

// Custom Green SVG Icons matching Reference Image 2
const AcademiesIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="14" y="10" width="30" height="44" rx="4" />
    <path d="M22 20h14M22 28h14M22 36h8" />
    <path d="M40 22l10-10 4 4-10 10v4h-4v-4z" />
    <path d="M30 44l3-3 3 3-3 3z" />
  </svg>
);

const RetailHospitalityIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="32" cy="20" r="7" fill="#E5F3EF" />
    <path d="M18 44c0-7 6-12 14-12s14 5 14 12v6H18v-6z" />
    <path d="M24 24c2 2 6 2 8 0M38 18l4-2M20 18l-4-2" />
    <circle cx="44" cy="18" r="1.5" fill="#00A88F" />
  </svg>
);

const ManufacturingIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="28" cy="24" r="8" fill="#E5F3EF" />
    <path d="M28 14v4M28 30v4M18 24h4M34 24h4M21 17l3 3M32 28l3 3M21 31l3-3M32 20l3-3" />
    <rect x="10" y="40" width="44" height="8" rx="2" />
    <circle cx="18" cy="44" r="2" fill="#00A88F" />
    <circle cx="28" cy="44" r="2" fill="#00A88F" />
    <circle cx="38" cy="44" r="2" fill="#00A88F" />
    <circle cx="48" cy="44" r="2" fill="#00A88F" />
  </svg>
);

const LegalIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 26l12-12 10 10-12 12z" fill="#E5F3EF" />
    <path d="M26 24l18 18M10 48h24" />
    <path d="M30 10l8 8M10 30l8 8" />
  </svg>
);

const EngineeringIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 22a6 6 0 0 1 12 0v4H20v-4z" fill="#E5F3EF" />
    <circle cx="26" cy="30" r="4" />
    <path d="M14 46c0-6 5-10 12-10s12 4 12 10" />
    <path d="M40 22a6 6 0 0 1 12 0v4H40v-4z" />
    <circle cx="46" cy="30" r="4" />
    <path d="M40 46c0-6 3-8 8-8" />
    <path d="M26 12v4M46 12v4" />
  </svg>
);

const CollegesIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 14L8 26l24 12 24-12L32 14z" fill="#E5F3EF" />
    <path d="M18 31v12c0 4 6 7 14 7s14-3 14-7V31" />
    <path d="M48 26v16" />
  </svg>
);

const UniversitiesIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 26h52M12 26v24M24 26v24M40 26v24M52 26v24M8 50h48" />
    <path d="M32 6L6 22h52L32 6z" />
    <circle cx="32" cy="16" r="3" fill="#00A88F" />
  </svg>
);

const EstateAgentsIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 10L10 26h44L32 10z" fill="#E5F3EF" />
    <rect x="16" y="26" width="32" height="24" rx="2" />
    <path d="M22 38l6-6 4 4 10-10" />
    <path d="M36 26v6M22 42h20" />
  </svg>
);

// Corporate Sector iPhone Photography Graphic Component (Matching Reference Image 1)
const CorporateImageIllustration = () => (
  <div className="relative w-full h-full min-h-[360px] sm:min-h-[440px] bg-slate-950 rounded-xl lg:rounded-l-2xl lg:rounded-r-none overflow-hidden flex items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-slate-800 shadow-inner">
    {/* Background Image - Titanium iPhone 15 Pro Close-up */}
    <img 
      src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=80" 
      alt="Titanium iPhone flagship smartphone" 
      className="absolute inset-0 w-full h-full object-cover brightness-100 contrast-105"
    />
    
    {/* Subtle Gradient & Glow Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

    {/* Glassmorphic Overlay Badge */}
    <div className="relative z-10 h-full w-full p-6 flex flex-col justify-between">
      <div className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/20 text-[#00A88F] font-extrabold text-xs shadow-lg">
        <span className="w-2 h-2 rounded-full bg-[#00A88F] animate-pulse" />
        <span>Enterprise Mobile Hardware</span>
      </div>

      <div className="bg-slate-900/90 backdrop-blur-lg p-4 rounded-2xl border border-white/15 shadow-2xl space-y-1 max-w-xs text-white">
        <div className="text-xs font-black text-white">FTSE 100 & SME Fleet Supply</div>
        <div className="text-[11px] font-semibold text-[#00A88F]">Custom Procurement & Bulk Pricing</div>
      </div>
    </div>
  </div>
);

export const Corporate: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Sectors', url: '/corporate' },
    { name: 'Corporate Sector', url: '/corporate' }
  ];

  const corporateSectorsList = [
    { title: 'Academies', icon: <AcademiesIcon /> },
    { title: 'Retail and Hospitality', icon: <RetailHospitalityIcon /> },
    { title: 'Manufacturing', icon: <ManufacturingIcon /> },
    { title: 'Legal', icon: <LegalIcon /> },
    { title: 'Engineering', icon: <EngineeringIcon /> },
    { title: 'Colleges', icon: <CollegesIcon /> },
    { title: 'Universities', icon: <UniversitiesIcon /> },
    { title: 'Estate Agents', icon: <EstateAgentsIcon /> }
  ];

  return (
    <>
      <SEOHead
        title="Corporate Sector - Mobile Fleet & Tablet Supply"
        description="Equip your corporate fleet with cost-effective, PhoneCheck certified smartphones, iPads, and MacBooks for enterprise teams."
        canonicalPath="/corporate/"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 bg-[#FAF8F2]">
        {/* Top Header Hero Banner */}
        <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              <Building2 className="w-3.5 h-3.5 text-[#00A88F]" /> Corporate Sector Solutions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
              Corporate & Business Mobile Supply
            </h1>
            <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
              Equip your corporate fleet with cost-effective, PhoneCheck certified smartphones, iPads, and MacBooks. Full 20% Standard VAT invoices and extended warranty support.
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Button onClick={() => setIsModalOpen(true)} variant="primary" size="lg" icon={<FileSpreadsheet className="w-5 h-5" />}>
                Request Corporate Quote
              </Button>
              <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" icon={<WhatsAppIcon className="w-5 h-5" />}>
                  Corporate Sales WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 1: Corporate Sector Feature Card (Matching Reference Image 1) */}
        <div className="bg-[#FAF8F2] rounded-2xl border border-[#D8E2DE] shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Side Illustration */}
          <div className="lg:col-span-5">
            <CorporateImageIllustration />
          </div>

          {/* Right Side Content */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-4 bg-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00A88F] tracking-tight">
              Corporate Sector
            </h2>
            <p className="text-[#334155] text-sm sm:text-base leading-relaxed font-normal">
              In our rapidly evolving and highly interconnected market environment, businesses are confronted with elevated customer expectations and employee demands. Through our network of resellers, we've collaborated with a diverse range of companies, from FTSE 100 and FTSE 250 corporations to SMEs, for many years. This experience has given us a deep understanding of the challenges posed by large-scale orders, tight deadlines, and inventory management. The use of devices and technology is becoming increasingly prevalent in employee training, customer engagement, and enhancing business efficiency. Our expert team is ready to support all your customers' procurement needs, offering solutions tailored to any scenario. Whether your requirements involve devices, hardware, cases, or custom items not in our standard catalogue, we're committed to helping you uncover innovative ideas and solutions for your clientele.
            </p>
          </div>
        </div>

        {/* SECTION 2: Sectors We Support (Matching Reference Image 2) */}
        <div className="space-y-8 pt-4">
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00A88F] tracking-tight">
              Sectors We Support
            </h2>
          </div>

          {/* 8 Corporate Sector Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {corporateSectorsList.map((sector, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-xl border border-[#D8E2DE] p-6 shadow-2xs hover:shadow-md hover:border-[#00A88F]/50 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-4 min-h-[140px] ${
                  idx >= 6 ? 'sm:col-span-1' : ''
                }`}
              >
                <div className="flex items-center justify-center text-[#00A88F]">
                  {sector.icon}
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-[#071715]">
                  {sector.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Quality & Affordable Products & Solutions Section */}
        <QualityProductsSection />
      </div>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Corporate;
