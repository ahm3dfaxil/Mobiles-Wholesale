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
      {/* Our Story Section with Mobile Phone Grid Background */}
      <div 
        className="relative rounded-3xl p-6 sm:p-12 overflow-hidden shadow-lg border border-[#D8E2DE] bg-cover bg-center"
        style={{ backgroundImage: `url('/our_story_bg_grid.jpg')` }}
      >
        {/* Subtle dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Foreground Content Card */}
        <div className="relative z-10 max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-white/60 shadow-xl space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#00A88F] tracking-tight">
              Our Story
            </h2>
            <p className="text-[#596662] text-sm sm:text-base leading-relaxed font-medium">
              Mobiles Wholesale is a wholesaler and distributor of brand new, 14-day return, used, and non-working mobile phones. With one of the largest networks of clients, ranging from retail shops to blue chip organizations worldwide, we proudly hold the title of the UK’s leading mobile phone wholesaler and distributor. Mobiles Wholesale specializes in the following:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl mx-auto pt-2 bg-[#FAF8F2] p-6 rounded-2xl border border-[#D8E2DE]">
            {[
              'Mobile Devices',
              'Tablets & iPads',
              '14-day return mobiles',
              'Electronics Pallets',
              'Used mobiles (A, B, C Grade)',
              'Network Stock',
              'BER mobiles (Beyond Economical Repair)',
              'International Export of Electronics',
              'Accessories',
              'Containers',
              'Smartwatches'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-[#101A18]">
                <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Vision Section */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 flex justify-center">
          <img 
            src="/our_vision_iphone_mockup.jpg" 
            alt="Mobiles Wholesale Industry Vision Devices" 
            className="w-full max-w-sm rounded-2xl shadow-lg border border-[#D8E2DE] object-cover"
          />
        </div>
        <div className="md:col-span-7 space-y-5">
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#00A88F] tracking-tight">
              Our Vision
            </h2>
            <h3 className="text-xl font-bold text-[#7E22CE]">
              Insight the Industry
            </h3>
          </div>

          <div className="space-y-4 text-[#596662] text-sm sm:text-base leading-relaxed font-medium">
            <p>
              Our clientele spans across various sectors including corporate entities, exporters, distributors, businesses, retail outlets, independent mobile dealers, and large mobile distributors, both nationally and internationally.
            </p>
            <p>
              Given the dynamic and price-sensitive nature of the telecommunications industry in the UK, delivering products at the right price point is paramount. With our wholesale process streamlined from start to finish, you can count on us to fulfill orders promptly and efficiently.
            </p>
            <p>
              Our sales platform is tailored to meet the unique needs and specifications of individual clients.
            </p>
            <p>
              Whether you require a handful of handsets or a bulk order of thousands, we ensure that our distribution channels are swift and effective.
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);
};
