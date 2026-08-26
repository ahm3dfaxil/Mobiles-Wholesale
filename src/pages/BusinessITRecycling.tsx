import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Smartphone, FileText, MessageSquare, CheckCircle2, Phone, Mail, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';

// SVG Graphics for visual excellence matching screenshot references

// Circular Economy Graphic (Mobile inside circular motion swooshes)
const CircularEconomyGraphic: React.FC = () => (
  <div className="relative w-full h-full min-h-[280px] bg-[#E2E8F0] rounded-2xl flex items-center justify-center p-6 overflow-hidden shadow-inner border border-[#CBD5E1]">
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Outer circular swooshes */}
      <svg className="absolute inset-0 w-full h-full text-white/90 animate-spin-slow" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="8">
        <circle cx="100" cy="100" r="80" strokeDasharray="360 100" strokeLinecap="round" />
        <circle cx="100" cy="100" r="60" strokeDasharray="250 80" strokeLinecap="round" opacity="0.6" />
      </svg>
      {/* Phone graphic in center */}
      <div className="relative z-10 w-24 h-44 bg-[#00A88F] rounded-2xl border-4 border-white shadow-2xl flex flex-col items-center justify-between p-2">
        <div className="w-8 h-1.5 bg-white/60 rounded-full" />
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white">
          <RefreshCw className="w-6 h-6 animate-spin-slow" />
        </div>
        <div className="w-5 h-5 rounded-full border-2 border-white/80" />
      </div>
    </div>
  </div>
);

// Mobile Device Security & Protection Graphic (3D Shield + Smartphone)
const MobileSecurityGraphic: React.FC = () => (
  <div className="relative w-full h-full min-h-[300px] flex items-center justify-center p-4">
    <div className="relative w-full max-w-sm h-72 flex items-center justify-center">
      {/* Background Phone */}
      <div className="w-40 h-64 bg-slate-200 border-4 border-slate-300 rounded-3xl shadow-xl flex flex-col items-center justify-between p-3 relative">
        <div className="w-10 h-2 bg-slate-400 rounded-full" />
        <div className="w-full h-24 bg-orange-400/20 rounded-xl border border-orange-400/40 p-2 space-y-1">
          <div className="w-12 h-2 bg-orange-500 rounded" />
          <div className="w-20 h-2 bg-orange-400 rounded" />
        </div>
        <div className="w-12 h-3 bg-amber-400 rounded-full flex justify-center items-center gap-1">
          <span className="w-1 h-1 bg-white rounded-full" />
          <span className="w-1 h-1 bg-white rounded-full" />
          <span className="w-1 h-1 bg-white rounded-full" />
        </div>
      </div>
      {/* Foreground 3D Shield */}
      <div className="absolute right-2 bottom-4 w-44 h-48 bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl border-4 border-white shadow-2xl p-4 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
        <div className="w-32 h-36 bg-gradient-to-br from-amber-300 to-amber-400 rounded-2xl border-2 border-amber-200 flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-20 h-20 text-white drop-shadow-md" strokeWidth={3} />
        </div>
      </div>
    </div>
  </div>
);

// Modern Purple Smartphone Graphic
const ITDeviceGraphic: React.FC = () => (
  <div className="relative w-full h-full min-h-[300px] flex items-center justify-center p-4">
    <div className="w-52 h-80 bg-gradient-to-br from-indigo-200 via-indigo-300 to-purple-400 rounded-[2.5rem] p-3 shadow-2xl border-4 border-white flex flex-col justify-between">
      {/* Camera Module */}
      <div className="w-16 h-8 bg-slate-800/20 backdrop-blur-sm rounded-full self-start flex items-center justify-around px-2">
        <div className="w-4 h-4 bg-slate-900 rounded-full border border-slate-700" />
        <div className="w-4 h-4 bg-slate-900 rounded-full border border-slate-700" />
      </div>
      {/* Screen Display */}
      <div className="w-full h-60 bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-400 rounded-[2rem] border border-white/40 flex items-center justify-center p-4 text-white shadow-inner">
        <div className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center">
          <ShieldCheck className="w-12 h-12 text-white" />
        </div>
      </div>
    </div>
  </div>
);

export const BusinessITRecycling: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Business IT Recycling', url: '/business-it-recycling' }
  ];

  return (
    <>
      <SEOHead
        title="Business & IT Recycling - Mobile Wholesale"
        description="Safe, secure, and sustainable mobile device recycling and IT recycling solutions for UK businesses, public sector, charities, and education."
        canonicalPath="/business-it-recycling/"
        breadcrumbs={breadcrumbs}
      />

      {/* Main Container */}
      <div className="w-full bg-[#FAF8F2] py-8 sm:py-12 space-y-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Top Hero Banner */}
          <div className="bg-black text-white rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
            <div className="max-w-2xl space-y-4 z-10">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#00A88F] uppercase tracking-widest bg-[#00A88F]/10 px-3.5 py-1.5 rounded-full border border-[#00A88F]/30">
                <RefreshCw className="w-3.5 h-3.5 text-[#00A88F] animate-spin-slow" /> Sustainable Corporate Recycling
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Business & IT Recycling
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Safe, secure, and environmentally compliant recycling solutions for UK businesses, education, charities, and public sector organizations.
              </p>
              <div className="pt-2">
                <Link to="/contact">
                  <Button variant="whatsapp" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    Get In Touch With Our Team
                  </Button>
                </Link>
              </div>
            </div>
            {/* Banner Image Graphic */}
            <div className="w-full md:w-80 h-52 relative rounded-xl overflow-hidden shadow-2xl border border-slate-700 hidden sm:block">
              <img 
                src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80" 
                alt="Business IT Hardware Recycling" 
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </div>

          {/* Section 1: Mobile Wholesale Circular */}
          <div className="bg-black text-white rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl sm:text-4xl font-black text-[#00A88F]">
                  Mobile Wholesale Circular
                </h2>
                <div className="space-y-4 text-slate-200 text-base leading-relaxed">
                  <p>
                    Our corporate team provides a safe, secure, and sustainable mobile device recycling and recommerce service, helping businesses, public sector organizations, charities, and the education sector to quickly and easily manage end-of-service and redundant mobile devices.
                  </p>
                  <p>
                    We champion the circular economy by assessing each device for its reuse potential. Items are then ethically refurbished and resold into the second-use market, serving a variety of customers, including consumers, businesses, and the education sector.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <CircularEconomyGraphic />
              </div>
            </div>
          </div>

          {/* Section 2: The Process */}
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-black text-[#00A88F] text-center">
              The Process
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="bg-[#00A88F] text-white p-6 rounded-2xl shadow-lg border border-[#00A88F]/20 flex flex-col justify-between space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                    <Wifi className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Request a Valuation</h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    Let us know what device you have, and we can provide a pre-testing valuation.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-black text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col justify-between space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00A88F]">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Logistics</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    We’ll arrange to collect your devices free of charge.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-black text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col justify-between space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00A88F]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Testing and Reporting</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    We will test and grade your devices, then send you a final valuation.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-black text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col justify-between space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00A88F]">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Value Release</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    You’ll receive payment for your asset value, data destruction will be completed, and an asset report will be issued.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Mobile Device Recycling */}
          <div className="bg-black text-white rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl sm:text-4xl font-black text-[#00A88F]">
                  Mobile Device Recycling
                </h2>
                <p className="text-slate-200 text-base leading-relaxed">
                  We are committed to providing sustainable and secure solutions for managing your company's technology. Our comprehensive approach to mobile recycling ensures the secure retirement of your assets. We promote a circular economy through sustainable recycling, refurbishment, and resale solutions. By releasing market-leading asset values at the point of recycling, we help boost budgets and improve ROI. Our corporate team provides a safe, secure, and sustainable mobile device recycling and recommerce service, assisting businesses, public sector organizations, charities, and the education sector in efficiently handling end-of-service and redundant mobile devices. Every device we recycle is assessed for its reuse potential, then ethically refurbished and resold into the second-use market. Our customers include consumers, businesses, and the education sector.
                </p>
              </div>
              <div className="lg:col-span-5">
                <MobileSecurityGraphic />
              </div>
            </div>
          </div>

          {/* Section 4: IT Recycling */}
          <div className="bg-black text-white rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <ITDeviceGraphic />
              </div>
              <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-black text-[#00A88F]">
                  IT Recycling
                </h2>
                <div className="space-y-4 text-slate-200 text-base leading-relaxed">
                  <p>
                    It's never been more critical to consider how we dispose of our end-of-life IT equipment. Securely managing sensitive data while reducing the growing amount of e-waste are core issues that need addressing when exiting redundant technology.
                  </p>
                  <p>
                    Our corporate team specializes in eco-friendly IT recycling solutions, partnering with customers to safely and securely manage their redundant IT hardware. Whether you're a small business with a single product to recycle or a large organization with an extensive equipment estate to exit, our secure and accredited service ensures full compliance with WEEE regulations and data security.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Contact Redirect Section (Replacing the form with a button CTA card) */}
          <div className="bg-gradient-to-br from-[#00A88F] to-[#063F35] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-[#00A88F]/40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Buy Green Buy Refurbished
                  </h3>
                  <p className="text-xl sm:text-2xl font-bold text-emerald-100">
                    The Perfect Solution For All Mobile Wholesale
                  </p>
                </div>
                <p className="text-emerald-50/90 text-sm sm:text-base leading-relaxed max-w-2xl">
                  If you need assistance exiting redundant mobile devices or IT hardware, contact our dedicated trade recycling team today for prompt valuations and nationwide collections.
                </p>

                {/* Features list */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {['Wearables', 'Mobile Phone', 'Macbook', 'Controllers & IT'].map((item) => (
                    <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl text-xs font-bold border border-white/20">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Contact numbers */}
                <div className="flex flex-wrap items-center gap-6 pt-2 text-sm font-bold text-white">
                  <a href="tel:+447400055536" className="flex items-center gap-2 hover:text-emerald-200 transition-colors">
                    <Phone className="w-4 h-4 text-emerald-300" />
                    <span>+44 7400055536</span>
                  </a>
                  <a href="tel:02080044421" className="flex items-center gap-2 hover:text-emerald-200 transition-colors">
                    <Phone className="w-4 h-4 text-emerald-300" />
                    <span>020 8004 4421</span>
                  </a>
                  <a href="mailto:sales@mobileswholesale.co.uk" className="flex items-center gap-2 hover:text-emerald-200 transition-colors">
                    <Mail className="w-4 h-4 text-emerald-300" />
                    <span>sales@mobileswholesale.co.uk</span>
                  </a>
                </div>
              </div>

              {/* Redirect Button */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-xl text-center space-y-4">
                <h4 className="text-lg font-black text-[#071715]">
                  Get In Touch
                </h4>
                <p className="text-xs text-slate-600">
                  Ready to request a valuation or book a free device collection? Speak to our team.
                </p>
                <Link to="/contact" className="w-full">
                  <Button variant="whatsapp" size="lg" fullWidth icon={<ArrowRight className="w-5 h-5" />}>
                    Contact Us Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default BusinessITRecycling;

