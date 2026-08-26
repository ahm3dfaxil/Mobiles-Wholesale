import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#071715] text-[#DCE8E4] text-sm border-t border-[#D4AF62]/30 mt-auto pt-14 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12">
          
          {/* Brand & Contact Info Column */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center">
              <img 
                src="/mobiles-wholesale-logo.1-removebg-preview.png" 
                alt="Mobiles Wholesale" 
                className="h-16 sm:h-20 w-auto object-contain transition-transform hover:scale-105 drop-shadow-md" 
              />
            </Link>

            {/* Registered Trading Notice */}
            <p className="text-[#DCE8E4]/90 text-xs sm:text-sm leading-relaxed max-w-sm">
              {t('footer.tradingNotice', "Mobile Wholesale Is A Trading Name Of Regenerate Global Limited And It's Registered In England And Wales.")}
            </p>

            {/* Contact Items */}
            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-center gap-2.5 text-[#DCE8E4]">
                <div className="w-5 h-5 rounded-full bg-[#0B1720] border border-[#D4AF62]/30 flex items-center justify-center text-[#D4AF62] shrink-0">
                  <Mail className="w-3 h-3" />
                </div>
                <a href="mailto:sales@mobileswholesale.co.uk" className="hover:text-[#00A88F] transition-colors">
                  sales@mobileswholesale.co.uk
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-[#DCE8E4]">
                <div className="w-5 h-5 rounded-full bg-[#0B1720] border border-[#D4AF62]/30 flex items-center justify-center text-[#D4AF62] shrink-0">
                  <Mail className="w-3 h-3" />
                </div>
                <a href="mailto:info@mobileswholesale.co.uk" className="hover:text-[#00A88F] transition-colors">
                  info@mobileswholesale.co.uk
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-[#DCE8E4]">
                <div className="w-5 h-5 rounded-full bg-[#0B1720] border border-[#D4AF62]/30 flex items-center justify-center text-[#D4AF62] shrink-0">
                  <Phone className="w-3 h-3" />
                </div>
                <a href="tel:+442080044421" className="hover:text-[#00A88F] transition-colors font-mono font-bold text-white">
                  +44 20 8004 4421
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-[#DCE8E4]">
                <div className="w-5 h-5 rounded-full bg-[#0B1720] border border-[#D4AF62]/30 flex items-center justify-center text-[#D4AF62] shrink-0">
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                </div>
                <a href="https://wa.me/447400055536" target="_blank" rel="noopener noreferrer" className="hover:text-[#00A88F] transition-colors font-mono font-bold text-white flex items-center gap-1.5">
                  +44 7400055536
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-[#DCE8E4]">
                <div className="w-5 h-5 rounded-full bg-[#0B1720] border border-[#D4AF62]/30 flex items-center justify-center text-[#D4AF62] shrink-0">
                  <MapPin className="w-3 h-3" />
                </div>
                <span>{t('footer.byAppointment', 'By Appointments Only')}</span>
              </div>
            </div>
          </div>

          {/* Wholesale Hub Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[#D4AF62] font-black text-xs tracking-wider uppercase">WHOLESALE HUB</h4>
            <ul className="space-y-1.5 text-xs text-[#DCE8E4]">
              <li><Link to="/wholesale" className="hover:text-[#00A88F] transition-colors">Wholesale Overview</Link></li>
              <li><Link to="/wholesale/bulk-buy" className="hover:text-[#00A88F] transition-colors">Bulk Buy Mobile Phones</Link></li>
              <li><Link to="/wholesale/buy-stock" className="hover:text-[#00A88F] transition-colors">Buy Wholesale Stock</Link></li>
              <li><Link to="/wholesale/get-a-quote" className="hover:text-[#00A88F] transition-colors">Get a Trade Quote</Link></li>
              <li><Link to="/wholesale/how-to-buy" className="hover:text-[#00A88F] transition-colors">How to Buy Guide</Link></li>
              <li><Link to="/wholesale/open-account" className="hover:text-[#00A88F] transition-colors">Open Trade Account</Link></li>
              <li><Link to="/wholesale/tablets-wholesale" className="hover:text-[#00A88F] transition-colors">Tablets Wholesale</Link></li>
              <li><Link to="/wholesale/laptops-wholesale" className="hover:text-[#00A88F] transition-colors">Laptops Wholesale</Link></li>
              <li><Link to="/wholesale/wearables-wholesale" className="hover:text-[#00A88F] transition-colors">Wearables Wholesale</Link></li>
              <li><Link to="/iphones" className="hover:text-[#00A88F] transition-colors">iPhones Wholesale UK</Link></li>
              <li><Link to="/samsungs" className="hover:text-[#00A88F] transition-colors">Samsung Wholesale UK</Link></li>
              <li><Link to="/google-pixel" className="hover:text-[#00A88F] transition-colors">Google Pixel Wholesale UK</Link></li>
            </ul>
          </div>

          {/* Services & Resources Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[#D4AF62] font-black text-xs tracking-wider uppercase">SERVICES & SECTORS</h4>
            <ul className="space-y-1.5 text-xs text-[#DCE8E4]">
              <li><Link to="/sell-to-us" className="hover:text-[#00A88F] transition-colors">Sell To Us</Link></li>
              <li><Link to="/buy-from-us" className="hover:text-[#00A88F] transition-colors">Buy From Us</Link></li>
              <li><Link to="/corporate" className="hover:text-[#00A88F] transition-colors">Corporate Solutions</Link></li>
              <li><Link to="/education" className="hover:text-[#00A88F] transition-colors">Education Sector</Link></li>
              <li><Link to="/retail" className="hover:text-[#00A88F] transition-colors">Retail Sector</Link></li>
              <li><Link to="/business-it-recycling" className="hover:text-[#00A88F] transition-colors">Business IT Recycling</Link></li>
              <li><Link to="/services/diagnostics" className="hover:text-[#00A88F] transition-colors">Diagnostics</Link></li>
              <li><Link to="/services/repair" className="hover:text-[#00A88F] transition-colors">Repair Support</Link></li>
            </ul>

            <h4 className="text-[#D4AF62] font-black text-xs tracking-wider uppercase pt-3">RESOURCES</h4>
            <ul className="space-y-1.5 text-xs text-[#DCE8E4]">
              <li><Link to="/about" className="hover:text-[#00A88F] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#00A88F] transition-colors">Contact Us</Link></li>
              <li><Link to="/grading" className="hover:text-[#00A88F] transition-colors">Grading Standards</Link></li>
              <li><Link to="/warranty-and-returns" className="hover:text-[#00A88F] transition-colors">Warranty & Returns</Link></li>
              <li><Link to="/stock-list" className="hover:text-[#00A88F] transition-colors">Stock List Catalog</Link></li>
              <li><Link to="/stock-offers" className="hover:text-[#00A88F] transition-colors">Stock Offers</Link></li>
              <li><Link to="/faqs" className="hover:text-[#00A88F] transition-colors">FAQs</Link></li>
              <li><Link to="/blogs" className="hover:text-[#00A88F] transition-colors">Blogs & Insights</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-[#00A88F] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-black text-sm tracking-wider">{t('footer.newsletterSignup', 'NewsLetter Signup')}</h4>
            
            {newsletterSubmitted ? (
              <div className="p-3 bg-[rgba(255,255,255,0.04)] border border-[#D4AF62]/40 text-[#DCE8E4] rounded-lg text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#D4AF62]" />
                <span>{t('forms.newsletterSuccess', 'Thank you for subscribing to stock alerts!')}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder={t('common.email', 'Email')}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.04)] text-white text-sm border border-[rgba(255,255,255,0.12)] focus:border-[#00A88F] focus:outline-none rounded-lg placeholder:text-[#596662] font-sans transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#00A88F] hover:bg-[#007A68] text-white font-bold text-sm transition-colors uppercase tracking-wider rounded-lg cursor-pointer shadow-md glow-emerald border border-emerald-400/30"
                >
                  {t('common.send', 'Send')}
                </button>
              </form>
            )}

            {/* Follow Us Social Media */}
            <div className="pt-4 space-y-2.5">
              <h4 className="text-[#D4AF62] font-black text-xs tracking-wider uppercase">{t('footer.followUs', 'Follow Us')}</h4>
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                {[
                  { name: 'Facebook', url: 'https://www.facebook.com/mobileswholesale/', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { name: 'YouTube', url: 'https://www.youtube.com/@mobileswholesale928', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                  { name: 'Instagram', url: 'https://www.instagram.com/mobiles_wholesale/', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/mobiles-wholesale/posts/?feedView=all&viewAsMember=true', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                  { name: 'Pinterest', url: 'https://uk.pinterest.com/mobileswholesale/_created/', path: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z' },
                  { name: 'X', url: 'https://x.com/MobilesWholesa1', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    title={item.name}
                    className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.04)] border border-white/10 text-[#D4AF62] hover:bg-[#D4AF62] hover:text-[#071715] hover:scale-105 transition-all duration-200 flex items-center justify-center shrink-0"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d={item.path}/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section Divider Line & Copyright */}
        <div className="border-t border-white/10 pt-6 text-center text-xs text-[#DCE8E4]/70">
          <p>{t('footer.rightsReserved', 'Copyright © 2024 Mobile Wholesale. All Rights Reserved.')}</p>
        </div>
      </div>
    </footer>
  );
};
