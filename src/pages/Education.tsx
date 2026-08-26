import React, { useState } from 'react';
import { GraduationCap, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { createWhatsAppGeneralUrl } from '../utils/whatsapp';
import { EnquiryModal } from '../components/product/EnquiryModal';
import { QualityProductsSection } from '../components/common/QualityProductsSection';

// Custom Green SVG Icons matching the reference design
const UniversityIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 26h52M12 26v24M24 26v24M40 26v24M52 26v24M8 50h48" />
    <path d="M32 6L6 22h52L32 6z" />
    <circle cx="32" cy="16" r="3" fill="#00A88F" />
  </svg>
);

const AcademiesIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="14" y="10" width="30" height="44" rx="4" />
    <path d="M22 20h14M22 28h14M22 36h8" />
    <path d="M40 22l10-10 4 4-10 10v4h-4v-4z" />
    <path d="M30 44l3-3 3 3-3 3z" />
  </svg>
);

const NurseriesIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="26" width="18" height="18" rx="3" />
    <rect x="38" y="26" width="18" height="18" rx="3" />
    <rect x="23" y="8" width="18" height="18" rx="3" />
    <text x="17" y="40" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#00A88F" stroke="none">A</text>
    <text x="32" y="22" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#00A88F" stroke="none">B</text>
    <text x="47" y="40" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#00A88F" stroke="none">C</text>
  </svg>
);

const InfantSchoolsIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="32" cy="18" r="7" />
    <path d="M22 38c0-5.5 4.5-10 10-10s10 4.5 10 10v10a3 3 0 0 1-3 3H25a3 3 0 0 1-3-3V38z" />
    <path d="M16 44a5 5 0 0 1 6-5M48 44a5 5 0 0 0-6-5" />
    <circle cx="28" cy="17" r="1" fill="#00A88F" />
    <circle cx="36" cy="17" r="1" fill="#00A88F" />
    <path d="M30 21c1 1 3 1 4 0" />
  </svg>
);

const SecondarySchoolsIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 28h40M16 28v22M28 28v22M36 28v22M48 28v22M10 50h44" />
    <path d="M32 8L10 24h44L32 8z" />
    <rect x="20" y="34" width="24" height="10" rx="2" fill="#FAF8F2" stroke="#00A88F" strokeWidth="1.5" />
    <text x="32" y="41" fontSize="6" fontWeight="900" textAnchor="middle" fill="#00A88F" stroke="none">SECONDARY</text>
  </svg>
);

const ComprehensiveSchoolsIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="26" cy="16" r="6" />
    <path d="M20 30c0-4 3-7 6-7h2c3 0 6 3 6 7v16M20 52v-10M32 52v-10" />
    <path d="M36 24l8 2v14l-8-3V24z" fill="#E5F3EF" />
    <path d="M42 16a3.5 3.5 0 1 0 7 0 3.5 3.5 0 1 0-7 0" />
    <path d="M44 24c0-2.5 2-4.5 5-4.5s5 2 5 4.5v12" />
  </svg>
);

const PrivatePublicSchoolsIcon = () => (
  <svg className="w-12 h-12 text-[#00A88F]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="24" width="44" height="28" rx="3" />
    <path d="M32 10L10 24h44L32 10z" />
    <circle cx="32" cy="32" r="5" fill="#E5F3EF" />
    <path d="M32 29v3h2" />
    <rect x="18" y="38" width="7" height="14" />
    <rect x="39" y="38" width="7" height="14" />
  </svg>
);

// Education Technology Photography Graphic Component
const EducationImageIllustration = () => (
  <div className="relative w-full h-full min-h-[360px] sm:min-h-[440px] rounded-xl lg:rounded-l-2xl lg:rounded-r-none overflow-hidden group shadow-md border-b lg:border-b-0 lg:border-r border-[#D8E2DE]">
    {/* Background Image - Real Education & Digital Learning Photography */}
    <img 
      src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1000&q=80" 
      alt="Students using digital tablets and technology in classroom" 
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
    />
    
    {/* Soft Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#071715]/85 via-[#071715]/25 to-transparent" />

    {/* Glassmorphic Overlay Badges */}
    <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between">
      {/* Top Badge */}
      <div className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[#00A88F] font-extrabold text-xs shadow-md">
        <span className="w-2 h-2 rounded-full bg-[#00A88F] animate-pulse" />
        <span>Digital Learning Technology</span>
      </div>

      {/* Bottom Floating Feature Card */}
      <div className="bg-white/95 backdrop-blur-lg p-4 rounded-2xl border border-white/70 shadow-xl space-y-1.5 max-w-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#00A88F] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
            🎓
          </div>
          <div>
            <div className="text-xs font-black text-[#071715]">School & University Supply</div>
            <div className="text-[11px] font-semibold text-[#00A88F]">Tablets, iPads & Logo Cases</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Education: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Sectors', url: '/education' },
    { name: 'Education Sector', url: '/education' }
  ];

  const sectorsList = [
    { title: 'Universities', icon: <UniversityIcon /> },
    { title: 'Academies', icon: <AcademiesIcon /> },
    { title: 'Nurseries', icon: <NurseriesIcon /> },
    { title: 'Infant Schools', icon: <InfantSchoolsIcon /> },
    { title: 'Secondary Schools', icon: <SecondarySchoolsIcon /> },
    { title: 'Comprehensive Schools', icon: <ComprehensiveSchoolsIcon /> },
    { title: 'Private and Public Schools', icon: <PrivatePublicSchoolsIcon /> }
  ];

  return (
    <>
      <SEOHead
        title="Education Sector - Mobile & Tablet Wholesale"
        description="Providing UK nurseries, schools, academies, and universities with customized mobile & tablet solutions, cases, and accessories."
        canonicalPath="/education/"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 bg-[#FAF8F2]">
        {/* Top Header Hero Banner */}
        <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              <GraduationCap className="w-3.5 h-3.5 text-[#00A88F]" /> Education Sector Solutions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
              Mobile & Tablet Supply for Education
            </h1>
            <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
              Supporting UK schools, academies, colleges, and universities with affordable iPads, Android tablets, smartphones, cases, and custom accessories for digital learning programs.
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Button onClick={() => setIsModalOpen(true)} variant="primary" size="lg" icon={<FileSpreadsheet className="w-5 h-5" />}>
                Request Education Pricing
              </Button>
              <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" icon={<WhatsAppIcon className="w-5 h-5" />}>
                  WhatsApp Sales Desk
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 1: Education Sector Feature Card (Matching Reference Image 1) */}
        <div className="bg-[#FAF8F2] rounded-2xl border border-[#D8E2DE] shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Side Illustration */}
          <div className="lg:col-span-5">
            <EducationImageIllustration />
          </div>

          {/* Right Side Content */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-4 bg-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00A88F] tracking-tight">
              Education Sector
            </h2>
            <p className="text-[#334155] text-sm sm:text-base leading-relaxed font-normal">
              As the education sector increasingly adopts technology and faces rising demands, our experienced and knowledgeable team delivers customized packages and solutions to meet all needs. With extensive expertise in the education field, we offer a wide array of products to support this environment. Whether for nurseries, schools, or universities, you can consolidate all your purchases in one place. We recognize the crucial role of technology in education and the challenges posed by funding limitations. Our expert account managers provide tailored solutions to make your purchasing process as seamless as possible. We can fulfill both small and large orders, including cases, bags, and sleeves, which can be customized with educational logos.
            </p>
          </div>
        </div>

        {/* SECTION 2: Sectors We Work With (Matching Reference Image 2) */}
        <div className="space-y-8 pt-4">
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00A88F] tracking-tight">
              Sectors We Work With
            </h2>
            <p className="text-[#475569] text-xs sm:text-sm leading-relaxed px-2">
              Our seasoned public sector team has gained an in-depth understanding of the unique needs within the public sector. Utilizing this expertise, we customize packages to suit any requirement or environment. We provide both OEM and cost-effective cases, accessories, and parts to ensure compliance with all funding limitations.
            </p>
          </div>

          {/* 7 Sectors Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectorsList.map((sector, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-xl border border-[#D8E2DE] p-6 shadow-2xs hover:shadow-md hover:border-[#00A88F]/50 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-4 min-h-[140px] ${
                  idx === 6 ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''
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

export default Education;
