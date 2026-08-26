import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  FileSpreadsheet, 
  Award,
  Sparkles,
  Smartphone,
  Battery,
  Layers,
  HelpCircle,
  ChevronDown,
  Eye
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';
import { createWhatsAppGeneralUrl } from '../utils/whatsapp';
import { SEOHead } from '../components/common/SEOHead';

export const Grading: React.FC = () => {
  const [selectedGradeTab, setSelectedGradeTab] = useState<string>('all');
  const { t } = useLanguage();

  const gradingTiers = [
    {
      id: 'brand-new',
      grade: 'Brand New',
      fullTitle: t('grading.gradeNew', 'Brand New Sealed (Factory Sealed)'),
      badgeColor: 'bg-[#f8f3e8] text-emerald-700 border-emerald-300',
      heroBorder: 'border-l-4 border-emerald-500',
      cosmeticScore: '10/10',
      cosmeticRating: 'Pristine Factory Sealed',
      batteryHealth: '100% (Original Factory Battery)',
      batteryPercentage: 100,
      warranty: '1 Year Official Manufacturer Warranty',
      screenCondition: 'Flawless untouched display in original factory film wrapper',
      housingCondition: 'Untouched pristine casing with intact security seals',
      accessories: 'Original retail box with all inbox accessories (Cable, SIM Pin, Manuals)',
      idealFor: 'Premium retailers, telco trade-in partners, export sealed stock buyers',
      description: 'Factory sealed UK stock direct from official supply chains. Never opened, activated, or refurbished. Includes full official 1 Year OEM manufacturer warranty.'
    },
    {
      id: 'grade-a',
      grade: 'Grade A',
      fullTitle: t('grading.gradeA', 'Refurbished Grade A / Mint Tested'),
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-300',
      heroBorder: 'border-l-4 border-blue-500',
      cosmeticScore: '9/10 to 9.9/10',
      cosmeticRating: 'Mint / Imperceptible Scratches',
      batteryHealth: 'Minimum 80% Guaranteed (PhoneCheck Certified)',
      batteryPercentage: 80,
      warranty: '14 - 28 Days UK Trade Warranty',
      screenCondition: 'Inspected under studio light. Micro-hairlines invisible when display is lit',
      housingCondition: 'Imperceptible cosmetic wear around charging port or bezels. Like-new feel',
      accessories: 'Supplied in clean neutral trade box with anti-static protective sleeve',
      idealFor: 'High-street retail stores, top-rated eBay/Amazon sellers, insurance replacements',
      description: 'Our most popular B2B wholesale tier. Pristine condition with maximum retail resale appeal and minimum 80% battery health.'
    },
    {
      id: 'grade-b',
      grade: 'Grade B',
      fullTitle: 'Grade B / Good Condition',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-300',
      heroBorder: 'border-l-4 border-amber-500',
      cosmeticScore: '7.5/10 to 8.5/10',
      cosmeticRating: 'Light Cosmetic Scuffs & Wear',
      batteryHealth: 'Minimum 80% Guaranteed',
      batteryPercentage: 80,
      warranty: '14 - 28 Days UK Trade Warranty',
      screenCondition: 'Light surface scratches visible under direct light. Display 100% functional without dead pixels',
      housingCondition: 'Minor cosmetic scratches, subtle edge scuffs or minor corner nicks',
      accessories: 'Supplied in neutral trade packaging with barcode tracking labels',
      idealFor: 'Margin-focused retailers, trade-in shops, budget-conscious consumers',
      description: 'The highest margin opportunity for mobile phone shops. Minimum 80% battery health guaranteed.'
    },
    {
      id: 'grade-c',
      grade: 'Grade C',
      fullTitle: 'Grade C / Cosmetic Heavy Wear',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-300',
      heroBorder: 'border-l-4 border-orange-500',
      cosmeticScore: '6/10 to 7/10',
      cosmeticRating: 'Noticeable Heavy Wear / Functional 100%',
      batteryHealth: 'Minimum 80% Guaranteed',
      batteryPercentage: 80,
      warranty: '14 - 28 Days UK Trade Warranty',
      screenCondition: 'Noticeable scratches or scuffs, but 100% touch functional with zero glass cracks',
      housingCondition: 'Dents, deep scratches, or color wear on aluminum/glass housing',
      accessories: 'Supplied in bulk anti-static bubble sleeves',
      idealFor: 'Repair centers, refurbishment facilities, ultra-budget phone sellers',
      description: '100% mechanically tested via PhoneCheck 60-point software diagnostics with minimum 80% battery capacity.'
    }
  ];

  const filteredTiers = selectedGradeTab === 'all' 
    ? gradingTiers 
    : gradingTiers.filter(g => g.id === selectedGradeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-[#FAF8F2]">
      <SEOHead 
        title="Grading - Mobile Wholesale"
        description="Understand our mobile phone grading system for used and refurbished devices to ensure quality, transparency, and reliable wholesale purchases."
        canonicalPath="/grading/"
      />
      {/* Header Banner */}
      <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3 py-1 rounded-full border border-[#D4AF62]">
            <Award className="w-3.5 h-3.5 text-[#00A88F]" /> {t('grading.badge', 'B2B Quality Standard Specification')}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
            {t('grading.fullGuideTitle', 'Mobile Phone & Electronics Visual Grading Guide')}
          </h1>
          <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
            {t('grading.fullGuideSubtitle', 'Every device tested with 60-point PhoneCheck diagnostics. Zero functional defects guaranteed.')}
          </p>
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

        <div className="text-xs text-[#596662] flex items-center gap-1 font-medium">
          <Eye className="w-4 h-4 text-[#00A88F]" />
          <span>PhoneCheck 60-Point Diagnostic Passed</span>
        </div>
      </div>

      {/* Main Visual Grading Cards */}
      <div className="space-y-8">
        {filteredTiers.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-8 b2b-card-shadow ${item.heroBorder} space-y-6 hover:border-[#D4AF62] transition-all`}
          >
            {/* Top Bar Header */}
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

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-bold text-[#071715] bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62] flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#007A68]" /> {item.warranty}
                </span>
              </div>
            </div>

            {/* Description Text */}
            <p className="text-[#596662] text-sm leading-relaxed font-medium">
              {item.description}
            </p>

            {/* Visual Criteria Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* 1. Screen Condition */}
              <div className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] space-y-2">
                <div className="flex items-center gap-2 text-[#596662] font-bold uppercase text-[10px]">
                  <Smartphone className="w-4 h-4 text-[#007A68]" /> Screen & Glass
                </div>
                <p className="font-semibold text-[#101A18] leading-snug">{item.screenCondition}</p>
              </div>

              {/* 2. Housing & Bezel */}
              <div className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] space-y-2">
                <div className="flex items-center gap-2 text-[#596662] font-bold uppercase text-[10px]">
                  <Layers className="w-4 h-4 text-[#007A68]" /> Casing & Bezels
                </div>
                <p className="font-semibold text-[#101A18] leading-snug">{item.housingCondition}</p>
              </div>

              {/* 3. Battery Health Meter */}
              <div className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] space-y-2">
                <div className="flex items-center justify-between text-[#596662] font-bold uppercase text-[10px]">
                  <span className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-[#007A68]" /> Battery Health
                  </span>
                  <span className="text-[#00A88F] font-extrabold">{item.batteryPercentage}%+</span>
                </div>
                
                {/* Visual Bar Gauge */}
                <div className="w-full h-2.5 bg-[#D8E2DE] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00A88F] rounded-full"
                    style={{ width: `${item.batteryPercentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#596662] font-medium">{item.batteryHealth}</p>
              </div>

              {/* 4. Target Retailer */}
              <div className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] space-y-2">
                <div className="flex items-center gap-2 text-[#596662] font-bold uppercase text-[10px]">
                  <Award className="w-4 h-4 text-[#D4AF62]" /> Best Suited For
                </div>
                <p className="font-semibold text-[#101A18] leading-snug">{item.idealFor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Side-by-Side Visual Comparison Table */}
      <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-8 b2b-card-shadow space-y-6">
        <div className="border-b border-[#D8E2DE] pb-4">
          <span className="text-xs font-bold text-[#00A88F] uppercase tracking-wider">Quick Reference</span>
          <h2 className="text-2xl font-black text-[#071715] mt-1">Wholesale Grading Comparison Matrix</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-[#E5F3EF] text-[#071715] border-b border-[#D8E2DE] font-bold">
                <th className="p-3.5 rounded-l-xl">Grade Tier</th>
                <th className="p-3.5">Cosmetic Score</th>
                <th className="p-3.5">Screen Glass</th>
                <th className="p-3.5">Housing Wear</th>
                <th className="p-3.5">Battery Guarantee</th>
                <th className="p-3.5 rounded-r-xl">Trade Warranty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8E2DE] font-medium text-[#101A18]">
              <tr className="hover:bg-[#FAF8F2]">
                <td className="p-3.5 font-black text-[#007A68]">Brand New Sealed</td>
                <td className="p-3.5">10/10</td>
                <td className="p-3.5">Factory Sealed Wrap</td>
                <td className="p-3.5">Pristine Unopened</td>
                <td className="p-3.5 font-bold text-[#101A18]">100%</td>
                <td className="p-3.5 text-[#596662]">1 Year OEM</td>
              </tr>
              <tr className="hover:bg-[#FAF8F2]">
                <td className="p-3.5 font-black text-[#007A68]">Grade A</td>
                <td className="p-3.5">9/10 - 9.9/10</td>
                <td className="p-3.5">Micro hairline invisible lit</td>
                <td className="p-3.5">Imperceptible marks</td>
                <td className="p-3.5 font-bold text-[#101A18]">Minimum 80%</td>
                <td className="p-3.5 text-[#596662]">14 - 28 Days UK</td>
              </tr>
              <tr className="hover:bg-[#FAF8F2]">
                <td className="p-3.5 font-black text-[#D4AF62]">Grade B</td>
                <td className="p-3.5">7.5/10 - 8.5/10</td>
                <td className="p-3.5">Light surface scratches</td>
                <td className="p-3.5">Subtle scuffs / small nick</td>
                <td className="p-3.5 font-bold text-[#101A18]">Minimum 80%</td>
                <td className="p-3.5 text-[#596662]">14 - 28 Days UK</td>
              </tr>
              <tr className="hover:bg-[#FAF8F2]">
                <td className="p-3.5 font-black text-[#D4AF62]">Grade C</td>
                <td className="p-3.5">6/10 - 7/10</td>
                <td className="p-3.5">Noticeable scratches (100% touch)</td>
                <td className="p-3.5">Deep wear / small dent</td>
                <td className="p-3.5 font-bold text-[#101A18]">Minimum 80%</td>
                <td className="p-3.5 text-[#596662]">14 - 28 Days UK</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="dark-gradient-bg text-white rounded-2xl p-8 sm:p-10 text-center space-y-4 shadow-xl border border-[#D4AF62]/40">
        <h3 className="text-2xl sm:text-3xl font-black">Ready to Order Graded Inventory?</h3>
        <p className="text-[#DCE8E4] text-sm max-w-xl mx-auto leading-relaxed">
          Filter our live UK stock list by Grade A, Grade B, or Brand New Sealed devices. Same-day DPD dispatch available.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link to="/stock">
            <Button variant="primary" size="lg" icon={<FileSpreadsheet className="w-4 h-4" />}>
              View Live Graded Stock Catalog
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
  );
};
