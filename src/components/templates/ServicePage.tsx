import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  Layers, 
  ShieldCheck, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { SEOHead, BreadcrumbItem } from '../common/SEOHead';
import { Button } from '../common/Button';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { useLanguage } from '../../context/LanguageContext';
import { createWhatsAppGeneralUrl } from '../../utils/whatsapp';
import { EnquiryModal } from '../product/EnquiryModal';

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceStep {
  step: number;
  title: string;
  description: string;
}

export interface RelatedServiceLink {
  title: string;
  path: string;
  description: string;
}

export interface ServicePageProps {
  title: string;
  subtitle: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  breadcrumbs: BreadcrumbItem[];
  overview: string[];
  features: ServiceFeature[];
  processSteps: ServiceStep[];
  targetClients: string[];
  relatedServices: RelatedServiceLink[];
}

export const ServicePage: React.FC<ServicePageProps> = ({
  title,
  subtitle,
  badge,
  metaTitle,
  metaDescription,
  canonicalPath,
  breadcrumbs,
  overview,
  features,
  processSteps,
  targetClients,
  relatedServices
}) => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        canonicalPath={canonicalPath}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-[#FAF8F2]">
        {/* Hero Banner Section */}
        <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              <Building2 className="w-3.5 h-3.5 text-[#00A88F]" /> {badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
              {title}
            </h1>
            <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Link to="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<FileText className="w-5 h-5" />}
                >
                  {t('common.requestQuote', 'Request a Quote')}
                </Button>
              </Link>
              <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" icon={<WhatsAppIcon className="w-5 h-5" />}>
                  {t('common.whatsappSalesDesk', 'WhatsApp Sales Desk')}
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-10 b2b-card-shadow space-y-4">
          <div className="border-b border-[#D8E2DE] pb-3">
            <span className="text-xs font-bold text-[#00A88F] uppercase tracking-wider">Service Overview</span>
            <h2 className="text-2xl font-black text-[#071715] mt-1">Professional B2B Solutions</h2>
          </div>
          <div className="space-y-4 text-sm text-[#596662] leading-relaxed font-normal">
            {overview.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Features / Capabilities Grid */}
        {features.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-[#D8E2DE] pb-3">
              <span className="text-xs font-bold text-[#071715] uppercase tracking-wider">Key Capabilities</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#071715] mt-1">Service Specifications & Benefits</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-[#D8E2DE] b2b-card-shadow space-y-3 hover:border-[#D4AF62] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#E5F3EF] border border-[#D8E2DE] flex items-center justify-center text-[#007A68]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-[#071715] text-lg">{feat.title}</h3>
                  <p className="text-xs text-[#596662] leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workflow / Evaluation Process Steps */}
        {processSteps.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-10 b2b-card-shadow space-y-6">
            <div className="border-b border-[#D8E2DE] pb-3">
              <span className="text-xs font-bold text-[#00A88F] uppercase tracking-wider">Process Workflow</span>
              <h2 className="text-2xl font-black text-[#071715] mt-1">How Our Process Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {processSteps.map((stepItem) => (
                <div key={stepItem.step} className="bg-[#FAF8F2] p-5 rounded-xl border border-[#D8E2DE] space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#071715] text-white font-black flex items-center justify-center text-sm shadow-xs">
                    {stepItem.step}
                  </div>
                  <h4 className="font-extrabold text-[#101A18] text-sm">{stepItem.title}</h4>
                  <p className="text-xs text-[#596662] leading-relaxed">{stepItem.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suitable Client Profiles */}
        {targetClients.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-8 b2b-card-shadow space-y-4">
            <h3 className="text-xl font-extrabold text-[#071715]">Who Can Benefit From This Service?</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#101A18] font-medium">
              {targetClients.map((client, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-[#FAF8F2] p-3 rounded-xl border border-[#D8E2DE]">
                  <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0" />
                  <span>{client}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Banner */}
        <div className="dark-gradient-bg text-white rounded-2xl p-8 sm:p-10 text-center space-y-4 shadow-xl border border-[#D4AF62]/40">
          <h3 className="text-2xl sm:text-3xl font-black">Need Further Information or Custom Support?</h3>
          <p className="text-[#DCE8E4] text-sm max-w-xl mx-auto leading-relaxed">
            Contact our trade team today to discuss your business requirements, request volume pricing, or book an appointment.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/contact">
              <Button variant="primary" size="lg" icon={<FileText className="w-4 h-4" />}>
                Submit Service Enquiry
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="dark" size="lg" icon={<PhoneCall className="w-4 h-4" />}>
                Contact Sales Desk
              </Button>
            </Link>
          </div>
        </div>

        {/* Related Services Internal Links */}
        {relatedServices.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-[#071715]">Explore Related Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedServices.map((rel, idx) => (
                <Link
                  key={idx}
                  to={rel.path}
                  className="bg-white p-4 rounded-xl border border-[#D8E2DE] hover:border-[#00A88F] transition-all b2b-card-shadow group"
                >
                  <h4 className="font-bold text-[#071715] text-sm group-hover:text-[#00A88F] flex items-center justify-between">
                    <span>{rel.title}</span>
                    <ArrowRight className="w-4 h-4 text-[#00A88F]" />
                  </h4>
                  <p className="text-xs text-[#596662] mt-1">{rel.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
