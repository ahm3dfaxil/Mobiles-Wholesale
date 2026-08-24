import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Truck, 
  Award, 
  Users, 
  CheckCircle2, 
  MapPin, 
  FileSpreadsheet,
  Sparkles,
  Layers,
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Gamepad2,
  Headphones,
  PhoneCall
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { UK_COMPANY_INFO, CATEGORY_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { createWhatsAppGeneralUrl } from '../utils/whatsapp';

import { SEOHead } from '../components/common/SEOHead';

export const About: React.FC = () => {
  const { t } = useLanguage();

  const breadcrumbs = [
    { name: t('navigation.home', 'Home'), url: '/' },
    { name: t('navigation.aboutUs', 'About Us'), url: '/about-us' }
  ];

  const categoriesList = [
    { name: t('categories.smartphones', 'Mobile Phones & iPhones'), icon: <Smartphone className="w-5 h-5 text-[#0a4d3c]" />, desc: 'Apple iPhones, Samsung Galaxy, Google Pixel, Xiaomi.' },
    { name: t('categories.tablets', 'Tablets & iPads'), icon: <Tablet className="w-5 h-5 text-[#0a4d3c]" />, desc: 'Apple iPads, iPad Pro, iPad Air, Samsung Galaxy Tabs.' },
    { name: t('categories.macbooks', 'MacBooks & Laptops'), icon: <Laptop className="w-5 h-5 text-purple-600" />, desc: 'MacBook Pro, MacBook Air, Dell XPS, Lenovo ThinkPads.' },
    { name: 'Smartwatches & Wearables', icon: <Watch className="w-5 h-5 text-amber-600" />, desc: 'Apple Watch Ultra & Series, Samsung Galaxy Watches.' },
    { name: t('categories.consoles', 'Gaming Consoles'), icon: <Gamepad2 className="w-5 h-5 text-rose-600" />, desc: 'Sony PlayStation 5, Nintendo Switch, Xbox Series X/S.' },
    { name: t('categories.audio', 'OEM Accessories'), icon: <Headphones className="w-5 h-5 text-sky-600" />, desc: 'AirPods, 20W OEM fast chargers, Lightning/USB-C cables.' }
  ];

  return (
    <>
      <SEOHead
        title="About Us | Mobiles Wholesale UK"
        description="Learn more about our company, our mission, and how we support retailers with reliable wholesale mobile phones and competitive supply solutions."
        canonicalPath="/about-us"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-[#FAF8F2]">
      {/* Header Banner */}
      <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
            <Building2 className="w-3.5 h-3.5 text-[#00A88F]" /> Premier UK B2B Trade Supplier
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
            {t('about.title', 'About Us')}
          </h1>
          <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
            {t('about.subtitle', 'Mobiles Wholesale is a leading UK B2B trade distributor of mobile phones, tablets, laptops, and consumer electronics.')}
          </p>
        </div>
      </div>

      {/* What We Do Banner */}
      <div className="dark-gradient-bg text-white rounded-3xl p-8 sm:p-12 border border-[#D4AF62]/40 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="relative z-10 space-y-5 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white text-center tracking-tight leading-tight">
            What We Do
          </h2>

          <div className="space-y-4 text-[#DCE8E4] text-sm sm:text-base leading-relaxed text-center font-normal pt-2">
            <p>
              Mobiles Wholesale is a leading distributor of mobile phones in the UK, specializing in the wholesale trade of brand new, SIM-free, locked, and unlocked handsets. With expertise in selling large quantities of devices to retail and corporate clients, we prioritize service and pricing to remain competitive in the Telecommunications Industry.
            </p>
          </div>
        </div>
      </div>

      {/* Core Wholesale Expertise Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-[#D8E2DE] text-center b2b-card-shadow space-y-1 hover:border-[#D4AF62] transition-all">
          <div className="text-3xl sm:text-4xl font-black text-[#071715]">15,000+</div>
          <div className="text-xs text-[#596662] font-bold uppercase tracking-wider">Units Processed Monthly</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#D8E2DE] text-center b2b-card-shadow space-y-1 hover:border-[#D4AF62] transition-all">
          <div className="text-3xl sm:text-4xl font-black text-[#071715]">500+</div>
          <div className="text-xs text-[#596662] font-bold uppercase tracking-wider">Active UK Trade Clients</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#D8E2DE] text-center b2b-card-shadow space-y-1 hover:border-[#D4AF62] transition-all">
          <div className="text-3xl sm:text-4xl font-black text-[#071715]">60-Point</div>
          <div className="text-xs text-[#596662] font-bold uppercase tracking-wider">PhoneCheck Diagnostic Test</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#D8E2DE] text-center b2b-card-shadow space-y-1 hover:border-[#D4AF62] transition-all">
          <div className="text-3xl sm:text-4xl font-black text-[#00A88F]">24 Hours</div>
          <div className="text-xs text-[#596662] font-bold uppercase tracking-wider">UK Next-Day Courier Delivery</div>
        </div>
      </div>

      {/* Product Categories Breakdown */}
      <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-10 b2b-card-shadow space-y-6">
        <div className="border-b border-[#D8E2DE] pb-4">
          <span className="text-xs font-bold text-[#071715] uppercase tracking-wider">Product Inventory Range</span>
          <h2 className="text-2xl font-black text-[#071715] mt-1">Product Categories We Supply</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoriesList.map((cat, idx) => (
            <div key={idx} className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] flex items-start gap-3">
              <div className="p-2.5 bg-white rounded-lg border border-[#D8E2DE] shadow-xs shrink-0">{cat.icon}</div>
              <div>
                <h4 className="font-extrabold text-[#101A18] text-sm">{cat.name}</h4>
                <p className="text-xs text-[#596662] mt-0.5">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Process & Inspection Workflow */}
      <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-10 b2b-card-shadow space-y-8">
        <div>
          <span className="text-xs font-bold text-[#071715] uppercase tracking-wider">Quality Process</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#071715] mt-1">Our 5-Stage Quality & Testing Process</h2>
          <p className="text-[#596662] text-sm mt-1">
            Every lot entering our London warehouse undergoes rigorous multi-step inspection before joining our live trade catalog.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-[#FAF8F2] p-4.5 rounded-xl border border-[#D8E2DE] space-y-2 text-xs">
            <div className="w-8 h-8 rounded-full bg-[#071715] text-white font-bold flex items-center justify-center text-sm shadow-xs">1</div>
            <h4 className="font-extrabold text-[#101A18] text-sm">IMEI Verification</h4>
            <p className="text-[#596662] text-[11px] leading-relaxed">CheckMEND database verification ensuring clean IMEI status with zero blacklist or insurance claims.</p>
          </div>

          <div className="bg-[#FAF8F2] p-4.5 rounded-xl border border-[#D8E2DE] space-y-2 text-xs">
            <div className="w-8 h-8 rounded-full bg-[#071715] text-white font-bold flex items-center justify-center text-sm shadow-xs">2</div>
            <h4 className="font-extrabold text-[#101A18] text-sm">PhoneCheck Software</h4>
            <p className="text-[#596662] text-[11px] leading-relaxed">Automated 60-point hardware testing across screens, cameras, sensors, speakers, and ports.</p>
          </div>

          <div className="bg-[#FAF8F2] p-4.5 rounded-xl border border-[#D8E2DE] space-y-2 text-xs">
            <div className="w-8 h-8 rounded-full bg-[#071715] text-white font-bold flex items-center justify-center text-sm shadow-xs">3</div>
            <h4 className="font-extrabold text-[#101A18] text-sm">Battery Stress Test</h4>
            <p className="text-[#596662] text-[11px] leading-relaxed">Full charge/discharge stress test guaranteeing minimum 85%+ battery health standard on graded units.</p>
          </div>

          <div className="bg-[#FAF8F2] p-4.5 rounded-xl border border-[#D8E2DE] space-y-2 text-xs">
            <div className="w-8 h-8 rounded-full bg-[#071715] text-white font-bold flex items-center justify-center text-sm shadow-xs">4</div>
            <h4 className="font-extrabold text-[#101A18] text-sm">Cosmetic Grading</h4>
            <p className="text-[#596662] text-[11px] leading-relaxed">Studio lighting visual audit assigning exact Brand New, Grade A, Grade B, or Grade C classification.</p>
          </div>

          <div className="bg-[#FAF8F2] p-4.5 rounded-xl border border-[#D8E2DE] space-y-2 text-xs">
            <div className="w-8 h-8 rounded-full bg-[#007A68] text-white font-bold flex items-center justify-center text-sm shadow-xs">5</div>
            <h4 className="font-extrabold text-[#101A18] text-sm">Secure Packaging</h4>
            <p className="text-[#596662] text-[11px] leading-relaxed">Individual anti-static bubble sleeves with barcode lot labels ready for rapid UK next-day dispatch.</p>
          </div>
        </div>
      </div>

      {/* UK-Based Service & Legal Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-[#D8E2DE] p-8 b2b-card-shadow space-y-4 hover:border-[#D4AF62] transition-all">
          <div className="w-12 h-12 bg-[#E5F3EF] text-[#007A68] rounded-xl flex items-center justify-center border border-[#D8E2DE]">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#071715]">UK Registered & HMRC VAT Compliant</h3>
          <p className="text-[#596662] text-sm leading-relaxed">
            We operate in full compliance with UK HM Revenue & Customs regulations. We issue both Margin Scheme VAT invoices (ideal for pre-owned phone shops) and Standard 20% VAT invoices for tax-registered entities and export.
          </p>
          <div className="bg-[#FAF8F2] p-4 rounded-xl text-xs text-[#101A18] space-y-1 font-mono border border-[#D8E2DE]">
            <div>Company Legal Notice: {UK_COMPANY_INFO.tradingNotice}</div>
            <div>UK Reg Status: {UK_COMPANY_INFO.registrationNumber}</div>
            <div>VAT Registration: {UK_COMPANY_INFO.vatNumber}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#D8E2DE] p-8 b2b-card-shadow space-y-4 hover:border-[#D4AF62] transition-all">
          <div className="w-12 h-12 bg-[#E5F3EF] text-[#007A68] rounded-xl flex items-center justify-center border border-[#D8E2DE]">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#071715]">UK Warehouse & Same-Day Dispatch</h3>
          <p className="text-[#596662] text-sm leading-relaxed">
            Orders confirmed before 2:00 PM GMT are dispatched same-day via DPD Next Day or Royal Mail Special Delivery Guaranteed by 1:00 PM. Every order is fully insured up to its full trade invoice value.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/stock">
              <Button variant="primary" size="md" icon={<FileSpreadsheet className="w-4 h-4" />}>
                Browse Live Stock List
              </Button>
            </Link>
            <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="md" icon={<WhatsAppIcon className="w-4 h-4" />}>
                WhatsApp Desk
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="dark" size="md" icon={<PhoneCall className="w-4 h-4" />}>
                Contact Sales Desk
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
);
};
