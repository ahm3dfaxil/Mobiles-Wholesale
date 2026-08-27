import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  FileSpreadsheet,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Store,
  Coins,
  CheckCircle2,
  Package,
  Award,
  Users,
  ArrowRight,
  Globe,
  GraduationCap,
  ChevronRight,
  Warehouse,
  TrendingUp,
  Headphones,
  RotateCcw,
  Sparkles,
  Play,
  PhoneCall
} from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORY_INFO } from '../data/mockData';
import { ProductCard } from '../components/product/ProductCard';
import { EnquiryModal } from '../components/product/EnquiryModal';
import { BrandsWeDealWith } from '../components/common/BrandsWeDealWith';
import { PartnerTrustNetwork } from '../components/common/PartnerTrustNetwork';
import { ScrollStack, ScrollStackItem } from '../components/common/ScrollStack';
import { DriftWall, HERO_ELECTRONICS, HERO_ELECTRONICS_LEFT } from '../components/common/DriftWall';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { AccordionGallery, AccordionItem } from '../components/common/AccordionGallery';
import { ElectricBorder } from '../components/common/ElectricBorder';
import { SEOHead } from '../components/common/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { createWhatsAppGeneralUrl, createWhatsAppProductUrl } from '../utils/whatsapp';
import { Product } from '../types';

export const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleOpenEnquiry = (product?: Product) => {
    setSelectedProduct(product ?? null);
    setIsEnquiryModalOpen(true);
  };

  const trustValues = [
    {
      icon: <Coins className="w-6 h-6 text-[#0a4d3c]" />,
      title: t('trustValues.pricingTitle', 'Competitive Trade Pricing'),
      description: t('trustValues.pricingDesc', 'Direct UK warehouse trade rates maximizing resale margins for retailers.')
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#0a4d3c]" />,
      title: t('trustValues.phonecheckTitle', 'PhoneCheck Certified Stock'),
      description: t('trustValues.phonecheckDesc', 'Automated 60-point software diagnostics ensuring zero return rates.')
    },
    {
      icon: <Package className="w-6 h-6 text-[#0a4d3c]" />,
      title: t('trustValues.bulkTitle', 'Bulk & Pallet Quantities'),
      description: t('trustValues.bulkDesc', 'Volume allocation from single box lots to 1,000+ unit containers.')
    },
    {
      icon: <Building2 className="w-6 h-6 text-[#0a4d3c]" />,
      title: t('trustValues.ukVatTitle', 'UK Registered & VAT Ready'),
      description: t('trustValues.ukVatDesc', 'Full UK HMRC compliance with Margin Scheme and 20% Standard VAT invoices.')
    },
    {
      icon: <Truck className="w-6 h-6 text-[#0a4d3c]" />,
      title: t('trustValues.insuredTitle', 'Insured Next-Day Dispatch'),
      description: t('trustValues.insuredDesc', 'DPD and Royal Mail Special Delivery insured to full invoice value.')
    },
    {
      icon: <Users className="w-6 h-6 text-[#0a4d3c]" />,
      title: t('trustValues.accountManagerTitle', 'Dedicated Account Manager'),
      description: t('trustValues.accountManagerDesc', 'UK trade desk support for custom pricing, reserve holds, and CSV feeds.')
    }
  ];

  const edgeStats = [
    { label: t('edge.stat1Label', 'London Stock Hub'), value: t('edge.stat1Value', '15,000+'), sub: t('edge.stat1Sub', 'Units Ready') },
    { label: t('edge.stat2Label', 'Diagnostic Check'), value: t('edge.stat2Value', '60-Point'), sub: t('edge.stat2Sub', 'PhoneCheck Verified') },
    { label: t('edge.stat3Label', 'Express Dispatch'), value: t('edge.stat3Value', '2:00 PM'), sub: t('edge.stat3Sub', 'Same-Day Cut-off') },
    { label: t('edge.stat4Label', 'B2B Trade Backing'), value: t('edge.stat4Value', '14 - 28 Days'), sub: t('edge.stat4Sub', 'Warranty Coverage') },
  ];

  const whyChoosePoints = [
    {
      icon: <Warehouse className="w-6 h-6" />,
      title: t('edge.point1Title', 'Reliable UK Physical Stock'),
      desc: t('edge.point1Desc', '100% physical inventory stored in our secure London warehouse. Instant availability with live CSV automated stock feed sync for your e-commerce platform.'),
      badges: [t('edge.point1Badge1', 'London Warehouse'), t('edge.point1Badge2', 'Live CSV Feed'), t('edge.point1Badge3', '15,000+ Units Ready')]
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: t('edge.point2Title', 'Transparent Studio Grading'),
      desc: t('edge.point2Desc', 'Rigorous studio lighting inspection combined with PhoneCheck software diagnostics assigning exact Brand New, Grade A, Grade B, or Grade C standards.'),
      badges: [t('edge.point2Badge1', '60-Point Diagnostic'), t('edge.point2Badge2', 'PhoneCheck Certified'), t('edge.point2Badge3', '0% Surprises')]
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t('edge.point3Title', 'Competitive Trade Pricing'),
      desc: t('edge.point3Desc', 'Tiered wholesale rates engineered specifically for phone shop owners, online power sellers, and exporters to maximize your retail profit margins.'),
      badges: [t('edge.point3Badge1', 'Margin & 20% Standard VAT'), t('edge.point3Badge2', 'Volume Discounts'), t('edge.point3Badge3', 'Tiered Rates')]
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: t('edge.point4Title', 'Fast UK Express Delivery'),
      desc: t('edge.point4Desc', 'Same-day dispatch on orders confirmed before 2:00 PM GMT via fully insured Royal Mail Special Delivery and DPD express couriers.'),
      badges: [t('edge.point4Badge1', '2 PM GMT Cut-off'), t('edge.point4Badge2', '100% Insured Transit'), t('edge.point4Badge3', 'Next-Day UK')]
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: t('edge.point5Title', 'Business-Focused Support'),
      desc: t('edge.point5Desc', 'Tailored B2B assistance with dedicated UK account management, official pro-forma invoicing, reserve holds, and custom volume desk support.'),
      badges: [t('edge.point5Badge1', '1-on-1 Account Mgr'), t('edge.point5Badge2', 'Pro-Forma Invoices'), t('edge.point5Badge3', 'WhatsApp Desk')]
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: t('edge.point6Title', '14 - 28 Day B2B Trade Warranty'),
      desc: t('edge.point6Desc', 'Hassle-free trade warranty backing every unit (1 Year on Brand New, 14-28 Days on all grades). Rapid RMA resolution with direct swaps or instant credits to keep your store operating seamlessly.'),
      badges: [t('edge.point6Badge1', '14 - 28 Day Protection'), t('edge.point6Badge2', 'Instant RMA Swaps'), t('edge.point6Badge3', 'Full Trade Backing')]
    }
  ];

  const gradingHighlights = [
    {
      badge: t('grading.gradeNew', 'Brand New'),
      title: t('grading.gradeNew', 'Brand New Factory Sealed'),
      desc: t('grading.gradeNewDesc', 'Official factory sealed or pristine unactivated devices with original manufacturer boxes and full accessories.'),
      color: 'bg-[#f8f3e8] border-[#d8c7a1] text-[#0a4d3c]'
    },
    {
      badge: t('grading.gradeA', 'Grade A'),
      title: t('grading.gradeA', 'Grade A / Mint Condition'),
      desc: t('grading.gradeADesc', 'Near-flawless cosmetic condition showing minimal to zero signs of prior use. Fully PhoneCheck software tested.'),
      color: 'bg-[#f4efe4] border-[#e6dfd1] text-stone-900'
    },
    {
      badge: t('grading.gradeB', 'Grade B'),
      title: t('grading.gradeB', 'Grade B / Good Condition'),
      desc: t('grading.gradeBDesc', 'Good working order with light cosmetic wear or minor surface scratches. 100% fully functional hardware.'),
      color: 'bg-[#f5ebd9] border-[#e2d5c0] text-amber-900'
    },
    {
      badge: t('grading.gradeC', 'Grade C'),
      title: t('grading.gradeC', 'Grade C / Heavily Graded'),
      desc: t('grading.gradeCDesc', 'Fully functional hardware with heavier cosmetic scratches or casing wear. Ideal for budget resale options.'),
      color: 'bg-[#f6e5d8] border-[#e5cdbc] text-orange-950'
    }
  ];

  const businessSolutions = [
    { title: t('businessSolutions.retailersTitle', 'Independent Retailers'), desc: t('businessSolutions.retailersDesc', 'Margin VAT pre-owned iPhones & Samsung stock ready for shop shelves.'), icon: <Store className="w-5 h-5 text-[#0a4d3c]" /> },
    { title: t('businessSolutions.ecomTitle', 'E-Commerce Power Sellers'), desc: t('businessSolutions.ecomDesc', 'Daily CSV live stock feeds, blind drop-shipping, and fast turnarounds.'), icon: <Globe className="w-5 h-5 text-[#0a4d3c]" /> },
    { title: t('businessSolutions.corporateTitle', 'Corporate IT Fleets'), desc: t('businessSolutions.corporateDesc', 'Standard 20% VAT invoices for tax deductible business laptops & phones.'), icon: <Building2 className="w-5 h-5 text-[#0a4d3c]" /> },
    { title: t('businessSolutions.educationTitle', 'Education & Public Sector'), desc: t('businessSolutions.educationDesc', 'Official Purchase Order (PO) processing for schools and universities.'), icon: <GraduationCap className="w-5 h-5 text-[#0a4d3c]" /> },
    { title: t('businessSolutions.exportersTitle', 'Bulk Buyers & Exporters'), desc: t('businessSolutions.exportersDesc', 'Container pallet pricing models with zero-rated international export VAT.'), icon: <Package className="w-5 h-5 text-[#0a4d3c]" /> }
  ];

  const categoryItems: AccordionItem[] = [
    {
      id: 'mobile-phones',
      label: t('categories.mobile-phones', CATEGORY_INFO['mobile-phones']?.title || 'Mobile Phones'),
      count: `350+ ${t('common.liveStock', 'Live Stock')}`,
      image: CATEGORY_INFO['mobile-phones']?.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      link: '/stock?category=mobile-phones'
    },
    {
      id: 'tablets',
      label: t('categories.tablets', CATEGORY_INFO['tablets']?.title || 'Tablets & iPads'),
      count: `120+ ${t('common.liveStock', 'Live Stock')}`,
      image: CATEGORY_INFO['tablets']?.image || 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
      link: '/stock?category=tablets'
    },
    {
      id: 'macbooks',
      label: t('categories.macbooks', CATEGORY_INFO['macbooks']?.title || 'MacBooks & Laptops'),
      count: `65+ ${t('common.liveStock', 'Live Stock')}`,
      image: CATEGORY_INFO['macbooks']?.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      link: '/stock?category=macbooks'
    },
    {
      id: 'laptops',
      label: t('categories.laptops', CATEGORY_INFO['laptops']?.title || 'Laptops'),
      count: `90+ ${t('common.liveStock', 'Live Stock')}`,
      image: CATEGORY_INFO['laptops']?.image || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
      link: '/stock?category=laptops'
    },
    {
      id: 'smartwatches',
      label: t('categories.smartwatches', CATEGORY_INFO['smartwatches']?.title || 'Smartwatches'),
      count: `95+ ${t('common.liveStock', 'Live Stock')}`,
      image: CATEGORY_INFO['smartwatches']?.image || 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      link: '/stock?category=smartwatches'
    },
    {
      id: 'gaming-consoles',
      label: t('categories.gaming-consoles', CATEGORY_INFO['gaming-consoles']?.title || 'Gaming Consoles'),
      count: `60+ ${t('common.liveStock', 'Live Stock')}`,
      image: CATEGORY_INFO['gaming-consoles']?.image || 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
      link: '/stock?category=gaming-consoles'
    },
    {
      id: 'accessories',
      label: t('categories.accessories', CATEGORY_INFO['accessories']?.title || 'Accessories'),
      count: `450+ ${t('common.liveStock', 'Live Stock')}`,
      image: CATEGORY_INFO['accessories']?.image || 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
      link: '/stock?category=accessories'
    }
  ];

  return (
    <div className="space-y-16 pb-16 font-sans bg-[#FAF8F2] text-[#101A18]">
      <SEOHead 
        title="Mobile Wholesale UK"
        description="UK’s leading wholesale mobile phone supplier — bulk new & graded devices at unbeatable prices. Trusted B2B/B2C exporter. Fast delivery, top brands"
        canonicalPath="/"
      />
      {/* 1. HERO SECTION WITH DRIFTWALL BACKGROUND */}
      <section className="premium-hero relative overflow-hidden border-b border-[#D8E2DE] pt-12 sm:pt-16 pb-20 sm:pb-24 bg-[#FAF8F2]">
        {/* Background Radial Pattern & Glow */}
        <div className="absolute inset-0 opacity-[.06] bg-[radial-gradient(#063F35_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none z-0" />
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_85%_45%,rgba(0,168,143,0.14),transparent_50%)] pointer-events-none z-0" />

        {/* DriftWall Background Layer (Dual Left & Right Running Walls) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-between">
          {/* Left Running Wall */}
          <div className="w-[45%] h-full absolute left-0 top-0 overflow-hidden">
            <DriftWall
              items={HERO_ELECTRONICS_LEFT}
              columns={3}
              tileWidth={170}
              tileHeight={118}
              gap={16}
              radius={14}
              tilt={0}
              turn={0}
              roll={0}
              perspective={0}
              depth={0}
              speed={14}
              direction="down"
              variance={0.2}
              align="left"
            />
          </div>

          {/* Right Running Wall */}
          <div className="w-[45%] h-full absolute right-0 top-0 overflow-hidden">
            <DriftWall
              items={HERO_ELECTRONICS}
              columns={3}
              tileWidth={170}
              tileHeight={118}
              gap={16}
              radius={14}
              tilt={0}
              turn={0}
              roll={0}
              perspective={0}
              depth={0}
              speed={12}
              direction="up"
              variance={0.2}
              align="right"
            />
          </div>

          {/* Soft Center Gradient Mask for high text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F2]/30 via-[#FAF8F2]/95 via-50% to-[#FAF8F2]/30 pointer-events-none z-10" />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-6 sm:space-y-7">
          <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-black tracking-[-.055em] text-[#071715] leading-[1.06]">
            {t('hero.titlePhones', 'Mobile Wholesale UK')}
          </h1>

          <p className="text-[#596662] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-medium">
            {t('hero.description', 'Mobiles Wholesale is a premier supplier of brand new and graded mobile phones and other electronics in the UK. We specialize in B2B, B2C, D2C, wholesale, retail, corporate, public, and education sectors. Whether you’re looking for the latest models or reliable graded devices in bulk, we have you covered.')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/stock">
              <Button size="lg" variant="primary" icon={<FileSpreadsheet className="w-5 h-5" />}>
                {t('hero.browseLiveStock', 'Browse Live Stock')}
              </Button>
            </Link>
            <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noreferrer">
              <Button variant="whatsapp" size="lg" icon={<WhatsAppIcon className="w-5 h-5" />}>
                {t('hero.orderOnWhatsapp', 'Order on WhatsApp')}
              </Button>
            </a>
          </div>

          <div className="pt-6 border-t border-[#D8E2DE] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs max-w-3xl mx-auto text-left">
            <div className="flex gap-2.5 items-start bg-white/70 p-3.5 rounded-xl border border-[#D8E2DE]">
              <Truck className="w-4 h-4 shrink-0 text-[#007A68] mt-0.5" />
              <div>
                <b className="block text-[#101A18] font-bold">{t('common.nextDayDispatch', 'Next-day dispatch')}</b>
                <span className="text-[#596662]">{t('common.nextDayDispatchSub', 'Insured UK courier')}</span>
              </div>
            </div>

            <div className="flex gap-2.5 items-start bg-white/70 p-3.5 rounded-xl border border-[#D8E2DE]">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#007A68] mt-0.5" />
              <div>
                <b className="block text-[#101A18] font-bold">{t('common.phoneCheckTested', 'PhoneCheck tested')}</b>
                <span className="text-[#596662]">{t('common.phoneCheckTestedSub', '60-point diagnostics')}</span>
              </div>
            </div>

            <div className="flex gap-2.5 items-start bg-white/70 p-3.5 rounded-xl border border-[#D8E2DE]">
              <Building2 className="w-4 h-4 shrink-0 text-[#007A68] mt-0.5" />
              <div>
                <b className="block text-[#101A18] font-bold">{t('common.ukRegistered', 'UK registered')}</b>
                <span className="text-[#596662]">{t('common.ukRegisteredSub', 'VAT-ready invoicing')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VIDEO SHOWCASE SECTION BELOW HERO */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#071715] bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
            <Play className="w-3.5 h-3.5 text-[#00A88F] fill-[#00A88F]" />
            <span>{t('videoSection.tag', 'Wholesale Operations Video')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#071715] tracking-tight">
            {t('videoSection.title', 'See Mobiles Wholesale In Action')}
          </h2>
          <p className="text-[#596662] text-sm sm:text-base max-w-2xl mx-auto font-medium">
            {t('videoSection.subtitle', 'Take a look inside our UK trade operations, device grading procedures, and physical inventory facility.')}
          </p>
        </div>

        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#D4AF62]/50 bg-[#071715] p-2 sm:p-3 shadow-[0_25px_65px_rgba(7,23,21,0.25)] group hover:border-[#00A88F] transition-all duration-300">
          <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            <video
              src="/mobile wholesale revv.mp4"
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain rounded-xl sm:rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* 3. THE MOBILES WHOLESALE EDGE (TONAL PANELS) */}
      <ScrollStack>
        {/* Stack Panel 1 — Soft Ivory Tonal Surface */}
        <ScrollStackItem className="bg-[#F3F0E8]">
          <div className="relative z-10 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#071715] bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#00A88F]" />
                <span>{t('edge.tag', 'The Mobiles Wholesale Edge')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#071715] tracking-tight leading-tight">
                {t('edge.titlePrefix', 'Why Choose')} <span className="text-[#00A88F]">{t('edge.titleHighlight', 'Mobiles Wholesale?')}</span>
              </h2>
              <div className="w-20 h-1 bg-[#063F35] rounded-full" />

              <p className="text-[#596662] text-xs sm:text-sm lg:text-base leading-relaxed font-medium pt-1">
                {t('edge.description', 'Mobiles Wholesale is a premier supplier of brand new and graded mobile phones and other electronics in the UK. We specialize in B2B, B2C, D2C, wholesale, retail, corporate, public, and education sectors. Whether you’re looking for the latest models or reliable graded devices in bulk, we have you covered.')}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {edgeStats.map((stat, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-[#D8E2DE] b2b-card-shadow flex flex-col justify-between hover:border-[#D4AF62] transition-all">
                  <span className="text-[10px] font-extrabold text-[#596662] uppercase tracking-wider">{stat.label}</span>
                  <div className="mt-1">
                    <span className="text-xl sm:text-2xl font-black text-[#071715] tracking-tight block">{stat.value}</span>
                    <span className="text-[11px] font-bold text-[#101A18] block">{stat.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-[#D8E2DE] p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 b2b-card-shadow hover:border-[#D4AF62] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#E5F3EF] border border-[#D8E2DE] flex items-center justify-center text-[#063F35] shrink-0 shadow-xs">
                <Warehouse className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-extrabold text-[#071715] text-base sm:text-lg">{whyChoosePoints[0].title}</h3>
                </div>
                <p className="text-[#596662] text-xs sm:text-sm leading-relaxed">{whyChoosePoints[0].desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {whyChoosePoints[0].badges.map((b, bIdx) => (
                    <span key={bIdx} className="text-[11px] font-bold text-[#071715] bg-[#E5F3EF] border border-[#D8E2DE] px-2.5 py-0.5 rounded-lg">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollStackItem>

        {/* Stack Panel 2 — Pure White Surface */}
        <ScrollStackItem className="bg-white">
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D8E2DE] pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-black text-[#071715] bg-[#E5F3EF] px-3 py-1 rounded-full border border-[#D4AF62]">
                  {t('edge.panel2Tag', 'Quality Assurance & Testing')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#071715] mt-2 tracking-tight">
                  {t('edge.panel2Title', 'Transparent Studio Grading & Diagnostic Check')}
                </h2>
              </div>
            </div>

            <div className="bg-[#FAF8F2] rounded-2xl border border-[#D8E2DE] p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 b2b-card-shadow hover:border-[#D4AF62] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#E5F3EF] border border-[#D8E2DE] flex items-center justify-center text-[#063F35] shrink-0 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-extrabold text-[#071715] text-base sm:text-lg">{whyChoosePoints[1].title}</h3>
                </div>
                <p className="text-[#596662] text-xs sm:text-sm leading-relaxed">{whyChoosePoints[1].desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {whyChoosePoints[1].badges.map((b, bIdx) => (
                    <span key={bIdx} className="text-[11px] font-bold text-[#071715] bg-[#E5F3EF] border border-[#D8E2DE] px-2.5 py-0.5 rounded-lg">{b}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { title: t('edge.diag1Title', 'PhoneCheck Software Diagnostics'), desc: t('edge.diag1Desc', 'Full automated hardware & software test suite run on 100% of devices.'), icon: <ShieldCheck className="w-4 h-4 text-[#007A68]" /> },
                { title: t('edge.diag2Title', 'Multi-Angle Studio Lighting'), desc: t('edge.diag2Desc', 'Inspected under high-density studio lamps to identify cosmetic micro-scratches.'), icon: <Sparkles className="w-4 h-4 text-[#00A88F]" /> },
                { title: t('edge.diag3Title', 'Battery Health & Performance'), desc: t('edge.diag3Desc', 'Minimum 80%+ OEM battery capacity verified on all grades (100% on Brand New).'), icon: <CheckCircle2 className="w-4 h-4 text-[#007A68]" /> },
                { title: t('edge.diag4Title', 'IMEI & Blacklist Verification'), desc: t('edge.diag4Desc', 'Cross-checked with GSMA global databases for clean history.'), icon: <CheckCircle2 className="w-4 h-4 text-[#007A68]" /> },
                { title: t('edge.diag5Title', 'Biometric & Display Calibration'), desc: t('edge.diag5Desc', 'Face ID, Touch ID, true tone, and OLED touch responsiveness tested.'), icon: <CheckCircle2 className="w-4 h-4 text-[#007A68]" /> },
                { title: t('edge.diag6Title', 'Data Erasure Compliance'), desc: t('edge.diag6Desc', 'ADISA-certified cryptographic wipe ensuring total data security.'), icon: <CheckCircle2 className="w-4 h-4 text-[#007A68]" /> },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#D8E2DE] b2b-card-shadow space-y-1 hover:border-[#D4AF62] transition-colors">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h4 className="font-extrabold text-[#071715] text-xs sm:text-sm">{item.title}</h4>
                  </div>
                  <p className="text-[11px] text-[#596662] leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollStackItem>

        {/* Stack Panel 3 — Light Emerald Tinted Panel */}
        <ScrollStackItem className="bg-[#E5F3EF]">
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D8E2DE] pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-black text-[#D4AF62] bg-[#071715] px-3.5 py-1.5 rounded-full border border-[#D4AF62]/40">
                  {t('edge.panel3Tag', 'TRADE ADVANTAGES & SUPPORT')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#071715] mt-2 tracking-tight">
                  {t('edge.panel3Title', 'Pricing, Express Delivery, Support & Warranty')}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whyChoosePoints.slice(2).map((point, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-[#D8E2DE] b2b-card-shadow space-y-2 flex flex-col justify-between hover:border-[#D4AF62] transition-all group">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-[#E5F3EF] group-hover:bg-[#063F35] border border-[#D8E2DE] text-[#063F35] group-hover:text-white transition-colors shadow-2xs">
                          {point.icon}
                        </div>
                        <h4 className="font-extrabold text-[#071715] text-sm sm:text-base">{point.title}</h4>
                      </div>
                    </div>
                    <p className="text-[#596662] text-xs leading-relaxed">{point.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#D8E2DE]">
                    {point.badges.map((b, bIdx) => (
                      <span key={bIdx} className="text-[10px] font-bold text-[#071715] bg-[#E5F3EF] border border-[#D8E2DE] px-2 py-0.5 rounded-md">{b}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* MAIN PREMIUM CTA BANNER */}
            <div className="p-5 sm:p-6 rounded-2xl dark-gradient-bg text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl border border-[#D4AF62]/40">
              <div className="flex items-center gap-3.5 text-center md:text-left">
                <div className="w-10 h-10 rounded-xl bg-[#071715] flex items-center justify-center shrink-0 hidden sm:flex border border-[#D4AF62]/40 text-[#00A88F]">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-white tracking-tight">{t('edge.ctaTitle', 'Need Custom Stock Allocations or CSV Feed Integration?')}</h4>
                  <p className="text-xs text-[#DCE8E4] mt-0.5">{t('edge.ctaSub', 'Our London Trade Desk provides real-time pricing, stock reservation, and instant WhatsApp support.')}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-center">
                <Link to="/contact">
                  <Button variant="primary" size="sm" icon={<PhoneCall className="w-4 h-4" />}>
                    {t('navigation.contact', 'Contact Us')}
                  </Button>
                </Link>
                <Link to="/stock">
                  <Button variant="secondary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                    {t('common.viewDetails', 'Explore Stock')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </ScrollStackItem>
      </ScrollStack>

      {/* 4. BRAND & LOGISTICS MARQUEES (DARK & SOFT PANELS) */}
      <div className="space-y-4 sm:space-y-5">
        <BrandsWeDealWith />
        <PartnerTrustNetwork />
      </div>

      {/* 5. TRADE ADVANTAGES & BUSINESS SOLUTIONS */}
      <ScrollStack>
        {/* Stack Card 1 — Cosmetic Grading Preview (Warm Ivory) */}
        <ScrollStackItem className="bg-[#FAF8F2]">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D8E2DE] pb-6">
              <div>
                <span className="text-xs uppercase tracking-[.16em] font-black text-[#071715] bg-[#E5F3EF] px-3 py-1 rounded-full border border-[#D4AF62]">{t('grading.badge', 'Transparent Classification')}</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#071715] mt-2">{t('grading.title', 'Cosmetic Grading Preview')}</h2>
              </div>
              <Link to="/grading">
                <Button variant="outline" size="sm" icon={<Award className="w-4 h-4" />}>
                  {t('grading.viewFullGuideBtn', 'View Full Grading Guide')}
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {gradingHighlights.map((g, idx) => (
                <div key={idx} className="p-5 rounded-2xl border bg-white space-y-3 b2b-card-shadow border-[#D8E2DE] hover:border-[#D4AF62] transition-all">
                  <span className={`inline-block px-3 py-1 rounded-md text-xs font-black border ${g.color}`}>
                    {g.badge}
                  </span>
                  <h4 className="font-extrabold text-[#071715] text-base">{g.title}</h4>
                  <p className="text-xs text-[#596662] leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollStackItem>

        {/* Stack Card 2 — Built for Businesses (White) */}
        <ScrollStackItem className="bg-white">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D8E2DE] pb-6">
              <div>
                <span className="text-xs uppercase tracking-[.16em] font-black text-[#071715] bg-[#E5F3EF] px-3 py-1 rounded-full border border-[#D4AF62]">{t('businessSolutions.badge', 'Tailored Trade Programs')}</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#071715] mt-2">{t('businessSolutions.title', 'Built for Businesses')}</h2>
              </div>
              <Link to="/trade-application">
                <Button variant="primary" size="sm" icon={<Building2 className="w-4 h-4" />}>
                  {t('businessSolutions.submitBtn', 'Submit Trade Application')}
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {businessSolutions.map((b, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#D8E2DE] b2b-card-shadow space-y-2.5 flex flex-col justify-between hover:border-[#D4AF62] transition-all">
                  <div className="space-y-2">
                    <div className="p-2.5 bg-[#E5F3EF] rounded-xl border border-[#D8E2DE] w-fit shadow-xs text-[#063F35]">
                      {b.icon}
                    </div>
                    <h4 className="font-extrabold text-[#071715] text-sm">{b.title}</h4>
                    <p className="text-xs text-[#596662] leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollStackItem>

        {/* Stack Card 3 — Why Trade Buyers Trust Us (Soft Ivory) */}
        <ScrollStackItem className="bg-[#F3F0E8]">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D8E2DE] pb-6">
              <div>
                <span className="text-xs uppercase tracking-[.16em] font-black text-[#071715] bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
                  {t('trustValues.badge', 'Trade Advantages')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#071715] mt-2 tracking-tight">
                  {t('trustValues.title', 'Why Trade Buyers Trust Us')}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {trustValues.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-[#D8E2DE] b2b-card-shadow space-y-2.5 hover:border-[#D4AF62] transition-all">
                  <div className="p-3 rounded-xl bg-[#E5F3EF] border border-[#D8E2DE] w-fit shadow-xs text-[#063F35]">
                    {item.icon}
                  </div>
                  <h4 className="font-extrabold text-[#071715] text-base">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-[#596662] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollStackItem>
      </ScrollStack>

      {/* 6. SHOP BY CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 pb-3 border-b border-[#D8E2DE]">
          <div>
            <span className="text-xs uppercase tracking-[.16em] font-black text-[#071715] bg-[#E5F3EF] px-3 py-1 rounded-full border border-[#D4AF62]">{t('categories.badge', 'Curated Catalog')}</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#071715] mt-2">{t('categories.title', 'Shop by Category')}</h2>
          </div>
          <Link to="/stock" className="text-xs font-extrabold text-[#00A88F] hover:underline flex items-center gap-1 mt-2 sm:mt-0">
            {t('categories.viewAll', 'View All Stock')} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <AccordionGallery
          items={categoryItems}
          defaultIndex={0}
          expandRatio={0.42}
          trigger="hover"
          duration={0.55}
          ease="power3.out"
          gap={10}
          radius={18}
          height={400}
          grayscale={false}
          showLabels={true}
        />
      </section>

      {/* 7. LIQUIDATION & WHOLESALE ENQUIRY BANNERS */}
      <ScrollStack>
        {/* Stack Item 1 — Have Stock to Sell? (Warm Ivory / White Surface) */}
        <ScrollStackItem className="bg-[#FAF8F2]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-2">
            <div className="space-y-3 max-w-2xl text-left">
              <span className="inline-block text-xs font-black uppercase tracking-widest bg-[#E5F3EF] text-[#071715] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
                {t('sellBanner.badge', 'Direct Liquidation & Purchasing')}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#071715]">
                {t('sellBanner.title', 'Have Stock to Sell?')}
              </h2>
              <p className="text-[#596662] text-xs sm:text-sm lg:text-base leading-relaxed font-medium">
                {t('sellBanner.desc', 'We buy mobile phones and electronics from businesses, liquidators, and suppliers. Submit your stock details and our purchasing team will issue a competitive valuation within 2 business hours.')}
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto flex justify-start md:justify-end">
              <Link to="/sell-to-us" className="w-full md:w-auto">
                <Button variant="whatsapp" size="lg" icon={<ArrowRight className="w-5 h-5" />} className="!bg-[#00A88F] hover:!bg-[#007A68] !text-white font-black border border-emerald-400/30 glow-emerald w-full md:w-auto">
                  {t('sellBanner.btn', 'Sell To Us')}
                </Button>
              </Link>
            </div>
          </div>
        </ScrollStackItem>

        {/* Stack Item 2 — Wholesale Enquiry / Custom Trade Support (Pure White Surface) */}
        <ScrollStackItem className="bg-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-2">
            <div className="space-y-3 max-w-2xl text-left">
              <span className="inline-block text-xs font-black uppercase tracking-widest bg-[#E5F3EF] text-[#071715] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
                {t('common.tradeApplication', 'Custom Trade Support')}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#071715] tracking-tight">
                {t('common.requestPricing', 'Looking for wholesale stock?')}
              </h2>
              <p className="text-[#596662] text-xs sm:text-sm lg:text-base leading-relaxed font-medium">
                {t('hero.description', 'Tell us what you are looking for and our UK trade team can help with live availability, custom pro-forma pricing, and volume lot requirements.')}
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <Link to="/contact">
                <Button variant="primary" size="lg" icon={<PhoneCall className="w-5 h-5" />} className="whitespace-nowrap">
                  {t('navigation.contact', 'Contact Us')}
                </Button>
              </Link>
            </div>
          </div>
        </ScrollStackItem>

        {/* Stack Item 3 — What We Do (Pure White Surface) */}
        <ScrollStackItem className="bg-white">
          <div className="space-y-4 max-w-4xl mx-auto text-center py-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#071715] tracking-tight">
              What We Do
            </h2>
            <p className="text-[#596662] text-xs sm:text-sm lg:text-base leading-relaxed text-center font-medium">
              Mobiles Wholesale is a leading distributor of mobile phones in the UK, specializing in the wholesale trade of brand new, SIM-free, locked, and unlocked handsets. With expertise in selling large quantities of devices to retail and corporate clients, we prioritize service and pricing to remain competitive in the Telecommunications Industry.
            </p>
          </div>
        </ScrollStackItem>
      </ScrollStack>

      <EnquiryModal isOpen={isEnquiryModalOpen} onClose={() => setIsEnquiryModalOpen(false)} product={selectedProduct} />
    </div>
  );
};
