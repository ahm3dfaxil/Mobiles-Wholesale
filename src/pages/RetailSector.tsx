import React, { useState } from 'react';
import { ShieldCheck, FileSpreadsheet, Building2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { createWhatsAppGeneralUrl } from '../utils/whatsapp';
import { EnquiryModal } from '../components/product/EnquiryModal';
import { QualityProductsSection } from '../components/common/QualityProductsSection';

// Custom Green SVG Icons matching Reference Image 2
const HealthcareIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 34c-3 0-8 3-8 8s5 10 12 10h24c7 0 12-5 12-10s-5-8-8-8" />
    <path d="M32 12c-4.5-4.5-11-2-11 3.5 0 6.5 11 14.5 11 14.5s11-8 11-14.5c0-5.5-6.5-8-11-3.5z" fill="#E5F3EF" />
    <path d="M32 18v6M29 21h6" stroke="#00A88F" strokeWidth="2.5" />
  </svg>
);

const EmergencyServicesIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="14" y="24" width="36" height="20" rx="3" />
    <path d="M14 30h36M24 30v-8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8" />
    <circle cx="22" cy="44" r="4" fill="#00A88F" />
    <circle cx="42" cy="44" r="4" fill="#00A88F" />
    <path d="M42 12a4 4 0 0 0-4-4h-4a4 4 0 0 0 0 8h4" />
  </svg>
);

const LawEnforcementIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 26l12-12 10 10-12 12z" fill="#E5F3EF" />
    <path d="M26 24l18 18M10 48h24" />
    <path d="M30 10l8 8M10 30l8 8" />
  </svg>
);

const WastageManagementIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 20h28l-3 28H21L18 20z" />
    <path d="M14 20h36M26 14h12" />
    <path d="M32 28l4 6h-8l4-6zM26 40l-2-4h8l-2 4z" />
  </svg>
);

const SocialCareIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="32" cy="20" r="5" fill="#00A88F" />
    <circle cx="20" cy="24" r="4" />
    <circle cx="44" cy="24" r="4" />
    <path d="M24 38c0-4 3.5-7 8-7s8 3 8 7" />
    <path d="M10 46c0-5 6-8 12-8M54 46c0-5-6-8-12-8" />
  </svg>
);

const LocalGovernmentIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="12" y="28" width="40" height="22" rx="2" />
    <path d="M32 10L10 24h44L32 10z" />
    <path d="M18 28v22M27 28v22M37 28v22M46 28v22M8 50h48" />
    <rect x="22" y="16" width="20" height="7" rx="1" fill="#FAF8F2" />
    <text x="32" y="22" fontSize="5.5" fontWeight="900" textAnchor="middle" fill="#00A88F" stroke="none">GOV</text>
  </svg>
);

const CentralGovernmentIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 10c-7 0-12 5-12 12h24c0-7-5-12-12-12z" fill="#E5F3EF" />
    <path d="M12 28h40M16 28v20M24 28v20M32 28v20M40 28v20M48 28v20M10 48h44" />
    <path d="M32 6v4" />
  </svg>
);

const CharitiesIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 38c-3 0-8 3-8 8s5 8 12 8h24c7 0 12-3 12-8s-5-8-8-8" />
    <circle cx="32" cy="24" r="7" fill="#E5F3EF" />
    <text x="32" y="28" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#00A88F" stroke="none">£</text>
  </svg>
);

const LocalAuthoritiesIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="16" y="12" width="32" height="42" rx="4" />
    <path d="M22 22l3 3 5-5M22 32l3 3 5-5M22 42h16" />
    <path d="M38 34l8-8 3 3-8 8h-3v-3z" />
  </svg>
);

const ArmedForcesDefenceIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 10L14 18v16c0 12 18 20 18 20s18-8 18-20V18L32 10z" fill="#E5F3EF" />
    <path d="M32 20l4 8 8 2-6 6 2 8-8-4-8 4 2-8-6-6 8-2 4-8z" fill="#00A88F" stroke="none" />
  </svg>
);

const ForestryIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 14l-6 10h4l-5 10h14V14zM42 14l-6 10h4l-5 10h14V14z" fill="#E5F3EF" />
    <circle cx="12" cy="20" r="3" />
    <path d="M12 26v18M8 50h8" />
  </svg>
);

const TransportationIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="26" width="28" height="18" rx="2" />
    <path d="M38 32h10l6 6v6H38V32z" />
    <circle cx="20" cy="46" r="4" fill="#00A88F" />
    <circle cx="46" cy="46" r="4" fill="#00A88F" />
    <path d="M16 16a3 3 0 1 0 6 0 3 3 0 1 0-6 0M42 16a3 3 0 1 0 6 0 3 3 0 1 0-6 0M22 16h20" strokeDasharray="3 3" />
  </svg>
);

const EducationSectorIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 12L6 26l26 14 26-14L32 12z" fill="#E5F3EF" />
    <path d="M16 31.5V44c0 4 7 8 16 8s16-4 16-8V31.5" />
    <path d="M52 26v18" />
  </svg>
);

// Public Sector Hand & Smartphone Illustration Component (Matching Reference Image 1)
const PublicSectorImageIllustration = () => (
  <div className="relative w-full h-full min-h-[360px] sm:min-h-[440px] bg-slate-950 rounded-xl lg:rounded-l-2xl lg:rounded-r-none overflow-hidden flex items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-slate-800 shadow-inner">
    {/* Dark Tech Background Image */}
    <img 
      src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80" 
      alt="Hand holding modern smartphone" 
      className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-110"
    />
    
    {/* Subtle Gradient & Glow Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

    {/* Glassmorphic Overlay Badge */}
    <div className="relative z-10 h-full w-full p-6 flex flex-col justify-between">
      <div className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/20 text-[#00A88F] font-extrabold text-xs shadow-lg">
        <span className="w-2 h-2 rounded-full bg-[#00A88F] animate-pulse" />
        <span>Public Sector Solutions</span>
      </div>

      <div className="bg-slate-900/90 backdrop-blur-lg p-4 rounded-2xl border border-white/15 shadow-2xl space-y-1 max-w-xs text-white">
        <div className="text-xs font-black text-white">Customized Public Quotes</div>
        <div className="text-[11px] font-semibold text-[#00A88F]">OEM & Cost-Effective Protective Cases</div>
      </div>
    </div>
  </div>
);

export const RetailSector: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Sectors', url: '/retail' },
    { name: 'Public Sector', url: '/retail' }
  ];

  const publicSectorsList = [
    { title: 'Healthcare', icon: <HealthcareIcon /> },
    { title: 'Emergency Services', icon: <EmergencyServicesIcon /> },
    { title: 'Law Enforcement', icon: <LawEnforcementIcon /> },
    { title: 'Wastage Management', icon: <WastageManagementIcon /> },
    { title: 'Social Care', icon: <SocialCareIcon /> },
    { title: 'Local Government', icon: <LocalGovernmentIcon /> },
    { title: 'Central Government', icon: <CentralGovernmentIcon /> },
    { title: 'Charities', icon: <CharitiesIcon /> },
    { title: 'Local Authorities', icon: <LocalAuthoritiesIcon /> },
    { title: 'Armed Forces and Defence (MOD)', icon: <ArmedForcesDefenceIcon /> },
    { title: 'Forestry', icon: <ForestryIcon /> },
    { title: 'Transportation', icon: <TransportationIcon /> },
    { title: 'Education', icon: <EducationSectorIcon /> }
  ];

  return (
    <>
      <SEOHead
        title="RETAIL - Mobile Wholesale"
        description="Discover wholesale mobile solutions designed for retailers looking to source smartphones in bulk with reliable supply and competitive pricing."
        canonicalPath="/retail/"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 bg-[#FAF8F2]">
        {/* Top Header Hero Banner */}
        <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              <Building2 className="w-3.5 h-3.5 text-[#00A88F]" /> Public Sector Solutions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
              Mobile Supply & Protection for Public Sector
            </h1>
            <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
              Supporting UK government, NHS healthcare, emergency services, and local authorities with reliable mobile hardware, OEM protective cases, and cost-effective accessories.
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Button onClick={() => setIsModalOpen(true)} variant="primary" size="lg" icon={<FileSpreadsheet className="w-5 h-5" />}>
                Request Public Sector Quote
              </Button>
              <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" icon={<WhatsAppIcon className="w-5 h-5" />}>
                  Public Sector Account Desk
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 1: Public Sector Feature Card (Matching Reference Image 1) */}
        <div className="bg-[#FAF8F2] rounded-2xl border border-[#D8E2DE] shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Side Illustration */}
          <div className="lg:col-span-5">
            <PublicSectorImageIllustration />
          </div>

          {/* Right Side Content */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-4 bg-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00A88F] tracking-tight">
              Public Sector
            </h2>
            <p className="text-[#334155] text-sm sm:text-base leading-relaxed font-normal">
              Organizations face ongoing pressure to minimize expenses while maintaining excellence in service delivery. At Mobiles Wholesale, we recognize these challenges and are committed to providing customized quotes that align with our clients' specific requirements. As technology adoption continues to rise, particularly in mobile devices and tablets, these valuable assets require adequate protection. The increasing importance of protective cases reflects the significant investment these devices represent. Our extensive experience collaborating with public sector entities has given us deep insight into the daily hurdles posed by budget limitations and time constraints. This understanding allows us to craft bespoke solutions that effectively address the unique challenges encountered in each public sector domain.
            </p>
          </div>
        </div>

        {/* SECTION 2: Corporate sectors we work with (Matching Reference Image 2) */}
        <div className="space-y-8 pt-4">
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00A88F] tracking-tight">
              Corporate sectors we work with
            </h2>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed px-2">
              Our seasoned public sector team has gained an in-depth understanding of the unique needs within the public sector. Utilizing this expertise, we customize packages to suit any requirement or environment. We provide both OEM and cost-effective cases, accessories, and parts to ensure compliance with all funding limitations.
            </p>
          </div>

          {/* 13 Public Sector Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {publicSectorsList.map((sector, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-xl border border-[#D8E2DE] p-6 shadow-2xs hover:shadow-md hover:border-[#00A88F]/50 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-4 min-h-[140px] ${
                  idx === 12 ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''
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

export default RetailSector;
