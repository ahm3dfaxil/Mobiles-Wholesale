import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, FileSpreadsheet, Smartphone, Eye, CheckCircle2, Layers, Camera } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';
import { createWhatsAppGeneralUrl } from '../utils/whatsapp';
import { EnquiryModal } from '../components/product/EnquiryModal';

export const HowWeGrade: React.FC = () => {
  const { t } = useLanguage();
  const [selectedGradeTab, setSelectedGradeTab] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumbs = [
    { name: t('navigation.home', 'Home'), url: '/' },
    { name: t('navigation.buyFromUs', 'Buy From Us'), url: '/buy-from-us' },
    { name: t('navigation.howWeGrade', 'How We Grade'), url: '/grading' }
  ];

  const gradingTiers = [
    {
      id: 'brand-new',
      grade: 'Brand New Sealed',
      fullTitle: 'Brand New Sealed (Factory Sealed)',
      badgeColor: 'bg-[#f8f3e8] text-emerald-700 border-emerald-300',
      heroBorder: 'border-l-4 border-emerald-500',
      cosmeticScore: '10/10',
      cosmeticRating: 'Pristine Factory Sealed',
      warranty: '1 Year Official Manufacturer Warranty',
      screenCondition: 'Flawless untouched display in original factory film wrapper',
      housingCondition: 'Untouched pristine casing with intact security seals',
      accessories: 'Original retail box with all inbox accessories',
      idealFor: 'Premium retailers, telco trade-in partners, export sealed stock buyers',
      description: 'Factory sealed UK stock direct from official supply chains. Never opened, activated, or refurbished. Includes 1 Year official OEM manufacturer warranty and 100% factory battery.',
      keyPoints: [
        'A pristine, factory-sealed handset in its original packaging',
        'Never opened or used',
        'Network unlocked',
        'PIN, Touch ID, and iCloud (FMI) ready for initial setup',
        'Fully functional with all original accessories included',
        'Factory settings intact',
        'Guaranteed to pass all electronic tests for functionality',
        'Eligible for full manufacturer warranty'
      ],
      images: ['/Brand New Phone.webp']
    },
    {
      id: 'grade-a',
      grade: 'Grade A',
      fullTitle: 'Refurbished Grade A / Mint Tested',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-300',
      heroBorder: 'border-l-4 border-blue-500',
      cosmeticScore: '9/10 to 9.9/10',
      cosmeticRating: 'Mint / Imperceptible Scratches',
      warranty: '14 - 28 Days UK Trade Warranty',
      screenCondition: 'Inspected under studio light. Micro-hairlines invisible when display is lit',
      housingCondition: 'Imperceptible cosmetic wear around charging port or bezels. Like-new feel',
      accessories: 'Supplied in clean neutral trade packaging with protective sleeve',
      idealFor: 'High-street retail stores, top-rated online sellers, corporate replacements',
      description: 'Our most popular B2B wholesale tier. Pristine condition with maximum retail resale appeal and minimum 80% battery health.',
      keyPoints: [
        'Show no signs of prior use',
        'No cracks or damage',
        'Unlocked for any network',
        'PIN, Touch ID, and iCloud (Find My iPhone) have been removed',
        'Completely operational',
        'All data has been erased',
        'Successfully passed electronic testing to confirm that internal components are fully operational'
      ],
      images: ['/Grade-A.jpg']
    },
    {
      id: 'grade-b',
      grade: 'Grade B',
      fullTitle: 'Grade B / Good Condition',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-300',
      heroBorder: 'border-l-4 border-amber-500',
      cosmeticScore: '7.5/10 to 8.5/10',
      cosmeticRating: 'Light Cosmetic Scuffs & Wear',
      warranty: '14 - 28 Days UK Trade Warranty',
      screenCondition: 'Light surface scratches visible under direct light. Display 100% functional without dead pixels',
      housingCondition: 'Minor cosmetic scratches, subtle edge scuffs or minor corner nicks',
      accessories: 'Supplied in neutral trade packaging with barcode tracking labels',
      idealFor: 'Margin-focused retailers, trade-in shops, budget-conscious consumers',
      description: 'High margin opportunity for phone shops. Minimum 80% battery health guaranteed.',
      keyPoints: [
        'A Good device with only minor signs of use',
        'No cracks, no damage, and no significant scratches',
        'Unlocked for all networks',
        'PIN, Touch ID, and iCloud (Find My iPhone) have been disabled',
        'In perfect working order',
        'All data has been completely erased',
        'Successfully passed electronic testing to verify that internal components are fully operational'
      ],
      images: ['/Grade-B.jpg']
    },
    {
      id: 'grade-c',
      grade: 'Grade C',
      fullTitle: 'Grade C / Cosmetic Heavy Wear',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-300',
      heroBorder: 'border-l-4 border-orange-500',
      cosmeticScore: '6/10 to 7/10',
      cosmeticRating: 'Noticeable Heavy Wear / Functional 100%',
      warranty: '14 - 28 Days UK Trade Warranty',
      screenCondition: 'Noticeable scratches or scuffs, but 100% touch functional with zero glass cracks',
      housingCondition: 'Dents, deep scratches, or color wear on aluminum/glass housing',
      accessories: 'Supplied in bulk anti-static bubble sleeves',
      idealFor: 'Repair centers, refurbishment facilities, ultra-budget phone sellers',
      description: '100% mechanically tested device inventory with minimum 80% battery health. Purely cosmetic wear at clearance wholesale pricing.',
      keyPoints: [
        'A high-quality device showing moderate to significant signs of wear',
        'No cracks, no damage, and no deep scratches',
        'Unlocked for all networks',
        'PIN, Touch ID, and iCloud (Find My iPhone) have been deactivated',
        'All data has been erased',
        'Essential functions have been tested and are operational',
        'Successfully passed electronic testing to confirm that internal components are fully functional'
      ],
      images: ['/Grade-C.jpeg', '/Grade-C-2.png']
    }
  ];

  const filteredTiers = selectedGradeTab === 'all' 
    ? gradingTiers 
    : gradingTiers.filter(g => g.id === selectedGradeTab);

  return (
    <>
      <SEOHead
        title="Grading - Mobile Wholesale"
        description="Understand our mobile phone grading system for used and refurbished devices to ensure quality, transparency, and reliable wholesale purchases."
        canonicalPath="/grading/"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-[#FAF8F2]">
        {/* Header Banner */}
        <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
              {t('grading.fullGuideTitle', 'Grading Structure')}
            </h1>
            <div className="text-[#596662] text-sm sm:text-base leading-relaxed space-y-3 font-medium">
              <p>
                Mobiles Wholesale has established itself as a premier supplier of mobile phones both domestically and internationally. Through robust partnerships worldwide, we've experienced consistent growth year after year, expanding our network continuously. We extend a warm invitation to all traders and businesses to connect with us.
              </p>
              <p>
                Unlike other mobile distributors, our open-door policy allows us to engage with customers of all sizes.
              </p>
              <p>
                Whether you're looking to purchase a single handset or a bulk order of thousands, we can accommodate any requirements.
              </p>
            </div>

            <div className="pt-3 flex flex-wrap gap-4">
              <Link to="/stock-list">
                <Button variant="primary" size="lg" icon={<FileSpreadsheet className="w-5 h-5" />}>
                  View Live Graded Stock Catalog
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="dark" size="lg">
                  Request Pricing List
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Testing & QC Overview */}
        <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-10 b2b-card-shadow space-y-6">
          <div className="border-b border-[#D8E2DE] pb-3">
            <span className="text-xs font-bold text-[#00A88F] uppercase tracking-wider">Testing & QC Process</span>
            <h2 className="text-2xl font-black text-[#071715] mt-1">Our Device Testing & Quality Control</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#101A18]">
            <div className="bg-[#FAF8F2] p-5 rounded-xl border border-[#D8E2DE] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#071715] text-white font-bold flex items-center justify-center text-sm">1</div>
              <h4 className="font-extrabold text-sm text-[#071715]">Functional Testing</h4>
              <p className="text-[#596662] leading-relaxed">Full technical diagnostic verification covering touchscreens, Wi-Fi, Bluetooth, cellular connectivity, cameras, speakers, microphones, charging ports, and physical buttons.</p>
            </div>

            <div className="bg-[#FAF8F2] p-5 rounded-xl border border-[#D8E2DE] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#071715] text-white font-bold flex items-center justify-center text-sm">2</div>
              <h4 className="font-extrabold text-sm text-[#071715]">Cosmetic Inspection</h4>
              <p className="text-[#596662] leading-relaxed">Detailed visual audit under controlled lighting assigning Grade A, Grade B, Grade C, or Brand New Sealed status based on screen, casing, and bezel condition.</p>
            </div>

            <div className="bg-[#FAF8F2] p-5 rounded-xl border border-[#D8E2DE] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#071715] text-white font-bold flex items-center justify-center text-sm">3</div>
              <h4 className="font-extrabold text-sm text-[#071715]">Data Wiping & Security</h4>
              <p className="text-[#596662] leading-relaxed">Complete factory reset, iCloud / Google Account lock removal verification, and clean IMEI database checks before packaging.</p>
            </div>
          </div>
        </div>

        {/* Grade Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D8E2DE] pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGradeTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                selectedGradeTab === 'all'
                  ? 'bg-[#071715] text-white shadow-xs'
                  : 'bg-white text-[#101A18] hover:bg-[#FAF8F2] border border-[#D8E2DE]'
              }`}
            >
              All Grades Overview
            </button>
            {gradingTiers.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGradeTab(g.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  selectedGradeTab === g.id
                    ? 'bg-[#071715] text-white shadow-xs'
                    : 'bg-white text-[#101A18] hover:bg-[#FAF8F2] border border-[#D8E2DE]'
                }`}
              >
                {g.grade}
              </button>
            ))}
          </div>
        </div>

        {/* Main Visual Grading Cards */}
        <div className="space-y-8">
          {filteredTiers.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-8 b2b-card-shadow ${item.heroBorder} space-y-6 hover:border-[#D4AF62] transition-all`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8E2DE] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className={`px-3.5 py-1 rounded-lg text-sm font-black border ${item.badgeColor}`}>
                      {item.grade}
                    </span>
                    <span className="text-xs font-bold text-[#596662]">Rating: {item.cosmeticScore}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#071715] mt-1">{item.fullTitle}</h3>
                </div>

                <span className="text-xs font-bold text-[#071715] bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62] flex items-center gap-1.5 self-start sm:self-auto">
                  <ShieldCheck className="w-4 h-4 text-[#007A68]" /> {item.warranty}
                </span>
              </div>

              <p className="text-[#596662] text-sm leading-relaxed font-medium">
                {item.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] space-y-2">
                  <div className="flex items-center gap-2 text-[#596662] font-bold uppercase text-[10px]">
                    <Smartphone className="w-4 h-4 text-[#007A68]" /> Screen & Glass
                  </div>
                  <p className="font-semibold text-[#101A18] leading-snug">{item.screenCondition}</p>
                </div>

                <div className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] space-y-2">
                  <div className="flex items-center gap-2 text-[#596662] font-bold uppercase text-[10px]">
                    <Layers className="w-4 h-4 text-[#007A68]" /> Casing & Bezels
                  </div>
                  <p className="font-semibold text-[#101A18] leading-snug">{item.housingCondition}</p>
                </div>

                <div className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] space-y-2">
                  <div className="flex items-center gap-2 text-[#596662] font-bold uppercase text-[10px]">
                    <CheckCircle2 className="w-4 h-4 text-[#007A68]" /> Packaging & Accessories
                  </div>
                  <p className="font-semibold text-[#101A18] leading-snug">{item.accessories}</p>
                </div>

                <div className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] space-y-2">
                  <div className="flex items-center gap-2 text-[#596662] font-bold uppercase text-[10px]">
                    <Award className="w-4 h-4 text-[#D4AF62]" /> Recommended For
                  </div>
                  <p className="font-semibold text-[#101A18] leading-snug">{item.idealFor}</p>
                </div>
              </div>

              {/* Key Specifications / Bullet Points */}
              {item.keyPoints && item.keyPoints.length > 0 && (
                <div className="pt-4 border-t border-[#D8E2DE] space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider text-[#071715] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#007A68]" /> Key Condition & Standards
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#101A18] font-medium">
                    {item.keyPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 bg-[#FAF8F2] p-3 rounded-xl border border-[#D8E2DE]/80">
                        <CheckCircle2 className="w-4 h-4 text-[#007A68] shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Visual Examples / Grade Photos */}
              {item.images && item.images.length > 0 && (
                <div className="pt-4 border-t border-[#D8E2DE] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#071715] flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-[#007A68]" /> Visual Reference Photo{item.images.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className={`grid gap-4 ${item.images.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                    {item.images.map((imgSrc, idx) => (
                      <div key={idx} className="relative group overflow-hidden rounded-xl border border-[#D8E2DE] bg-[#FAF8F2] sm:p-4 p-2 shadow-2xs hover:shadow-md transition-all flex items-center justify-center min-h-[260px]">
                        <img
                          src={imgSrc}
                          alt={`${item.fullTitle} visual reference ${idx + 1}`}
                          className="w-auto max-w-full h-auto max-h-[360px] sm:max-h-[420px] object-contain rounded-lg group-hover:scale-[1.01] transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="dark-gradient-bg text-white rounded-2xl p-8 sm:p-10 text-center space-y-4 shadow-xl border border-[#D4AF62]/40">
          <h3 className="text-2xl sm:text-3xl font-black">Ready to Order Graded Wholesale Stock?</h3>
          <p className="text-[#DCE8E4] text-sm max-w-xl mx-auto leading-relaxed">
            Browse our live UK inventory catalog filtered by Grade A, Grade B, Grade C, or Brand New Sealed devices.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/stock-list">
              <Button variant="primary" size="lg" icon={<FileSpreadsheet className="w-4 h-4" />}>
                View Live Stock Catalog
              </Button>
            </Link>
            <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg" icon={<WhatsAppIcon className="w-4 h-4" />}>
                WhatsApp Sales Desk
              </Button>
            </a>
          </div>
        </div>
      </div>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
