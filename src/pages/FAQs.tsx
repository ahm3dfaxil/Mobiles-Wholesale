import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, FileText, PhoneCall, ShieldCheck } from 'lucide-react';
import { SEOHead, FAQItemSchema } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';
import { createWhatsAppGeneralUrl } from '../utils/whatsapp';
import { EnquiryModal } from '../components/product/EnquiryModal';

interface FAQGroup {
  categoryTitle: string;
  items: {
    question: string;
    answer: string;
  }[];
}

export const FAQs: React.FC = () => {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumbs = [
    { name: t('navigation.home', 'Home'), url: '/' },
    { name: t('navigation.faqs', 'FAQs'), url: '/faqs' }
  ];

  const faqGroups: FAQGroup[] = [
    {
      categoryTitle: 'Wholesale Purchasing & Orders',
      items: [
        {
          question: 'What is the Minimum Order Quantity (MOQ)?',
          answer: 'MOQ varies by product line. Typically, mobile phones have an MOQ of 3 to 5 units, while accessories and cables may have an MOQ of 10 units. Exact MOQs are displayed on each product card.'
        },
        {
          question: 'How can I request a custom price quote for large orders?',
          answer: 'You can request a quote by clicking "Request Pricing" on any product page, filling out our "/wholesale/get-a-quote/" page form, or contacting our sales desk directly via WhatsApp.'
        },
        {
          question: 'What payment methods do you accept for trade orders?',
          answer: 'We accept UK Bank Transfers (BACS / Faster Payments), credit/debit card payments, and pro-forma invoice payments for approved trade account holders.'
        }
      ]
    },
    {
      categoryTitle: 'Trade Accounts & Verification',
      items: [
        {
          question: 'Who can apply for a B2B trade account?',
          answer: 'Trade accounts are open to physical mobile phone shop owners, online e-commerce sellers (eBay, Amazon, web), corporate buyers, educational institutions, and international bulk exporters.'
        },
        {
          question: 'How do I open a wholesale trade account?',
          answer: 'Visit our "/wholesale/open-account/" or "/business" page, fill in your business name, contact details, and stock requirements. Our account team reviews and approves applications within 24 business hours.'
        },
        {
          question: 'Do you offer Margin Scheme VAT invoices?',
          answer: 'Yes. We issue both Margin Scheme VAT invoices (which save pre-owned phone retailers 20% VAT) and Standard 20% VAT invoices for tax deductible assets and corporate buyers.'
        }
      ]
    },
    {
      categoryTitle: 'Device Grading & Quality Assurance',
      items: [
        {
          question: 'How are devices graded?',
          answer: 'Our inventory is categorized into Brand New Sealed, Refurbished Grade A+, Grade A, Grade B, and Grade C. Every pre-owned unit undergoes full technical inspection and visual grading.'
        },
        {
          question: 'Are all devices tested before dispatch?',
          answer: 'Yes. All pre-owned devices undergo functional testing covering touchscreens, Wi-Fi, Bluetooth, cameras, speakers, microphones, and charging ports before joining live stock.'
        },
        {
          question: 'What should I expect from Grade A vs Grade B?',
          answer: 'Grade A units are in mint condition with imperceptible micro-wear. Grade B units feature minor cosmetic scuffs or light edge wear while remaining 100% mechanically functional.'
        }
      ]
    },
    {
      categoryTitle: 'Warranty & RMA Returns',
      items: [
        {
          question: 'What trade warranty is included with purchases?',
          answer: 'Brand New Sealed stock includes 1 Year official manufacturer warranty with 100% factory battery. All graded stock (Grade A, Grade B, Grade C) includes 14 to 28 Days UK trade warranty with minimum 80% battery health guaranteed.'
        },
        {
          question: 'What is covered under the warranty?',
          answer: 'Our warranty covers internal component hardware defects, display hardware failure uncaused by drops, earpiece/speaker failure, and charging port defects.'
        },
        {
          question: 'How do I return a faulty device?',
          answer: 'Contact sales@mobileswholesale.co.uk with your trade invoice number and device IMEI. Once approved, you will receive an RMA number for return dispatch and technical inspection.'
        }
      ]
    },
    {
      categoryTitle: 'Shipping & Delivery',
      items: [
        {
          question: 'What shipping methods do you use?',
          answer: 'UK orders confirmed before 2:00 PM GMT are dispatched same-day via DPD Next Day or Royal Mail Special Delivery Guaranteed by 1:00 PM. Every shipment is fully insured.'
        },
        {
          question: 'Do you offer international shipping?',
          answer: 'Yes, we cater to valid international trade buyers and exporters with zero-rated VAT invoicing where applicable. Contact our sales desk for freight shipping quotes.'
        }
      ]
    }
  ];

  // Flatten all FAQ items to build JSON-LD schema for SEOHead
  const allFaqSchemas: FAQItemSchema[] = faqGroups.flatMap(group =>
    group.items.map(item => ({
      question: item.question,
      answer: item.answer
    }))
  );

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <SEOHead
        title="Faq - Mobile Wholesale"
        description="Find answers to frequently asked questions about wholesale mobile phones, orders, shipping, warranty, and business services."
        canonicalPath="/faqs"
        breadcrumbs={breadcrumbs}
        faqs={allFaqSchemas}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-[#FAF8F2]">
        {/* Hero Header */}
        <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              <HelpCircle className="w-3.5 h-3.5 text-[#00A88F]" /> Frequently Asked Questions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071715] leading-tight">
              FAQ QUESTIONS
            </h1>
            <p className="text-[#596662] text-base sm:text-lg leading-relaxed">
              Find instant answers to questions regarding wholesale purchasing, trade accounts, grading standards, warranty claims, and shipping policies.
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Link to="/contact">
                <Button variant="primary" size="lg" icon={<FileText className="w-5 h-5" />}>
                  Ask a Question
                </Button>
              </Link>
              <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" icon={<WhatsAppIcon className="w-5 h-5" />}>
                  WhatsApp Help Desk
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Accordion FAQ Groups */}
        <div className="space-y-8">
          {faqGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-8 b2b-card-shadow space-y-4">
              <h2 className="text-xl font-extrabold text-[#071715] border-b border-[#D8E2DE] pb-3">
                {group.categoryTitle}
              </h2>

              <div className="space-y-3">
                {group.items.map((item, itemIdx) => {
                  const itemKey = `${groupIdx}-${itemIdx}`;
                  const isOpen = Boolean(openItems[itemKey]);

                  return (
                    <div
                      key={itemIdx}
                      className="border border-[#D8E2DE] rounded-xl overflow-hidden bg-[#FAF8F2]"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(itemKey)}
                        className="w-full p-4 text-left font-bold text-sm text-[#071715] flex items-center justify-between gap-3 hover:bg-white transition-colors cursor-pointer"
                      >
                        <span>{item.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#00A88F] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#596662] shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="p-4 pt-0 text-xs text-[#596662] leading-relaxed border-t border-[#D8E2DE] bg-white font-normal">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Assistance Banner */}
        <div className="dark-gradient-bg text-white rounded-2xl p-8 sm:p-10 text-center space-y-4 shadow-xl border border-[#D4AF62]/40">
          <h3 className="text-2xl sm:text-3xl font-black">Still Have Questions?</h3>
          <p className="text-[#DCE8E4] text-sm max-w-xl mx-auto leading-relaxed">
            Our trade desk is available Monday through Friday from 8:30 AM to 5:30 PM GMT to answer your stock and account questions.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/contact">
              <Button variant="primary" size="lg" icon={<PhoneCall className="w-4 h-4" />}>
                Contact Customer Support
              </Button>
            </Link>
            <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg" icon={<WhatsAppIcon className="w-4 h-4" />}>
                WhatsApp Desk
              </Button>
            </a>
          </div>
        </div>
      </div>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
