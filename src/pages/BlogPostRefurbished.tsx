import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, MessageSquare } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const BlogPostRefurbished: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blogs', url: '/blogs' },
    { name: 'How to Know if a Phone Is Refurbished', url: '/how-to-know-if-a-phone-is-refurbished-expert-tips' }
  ];

  return (
    <>
      <SEOHead
        title="How to Know if a Phone Is Refurbished: Expert Tips - Mobile Wholesale UK"
        description="Discover how to spot refurbished phones with simple checks on warranty, serial numbers, and condition to make smart mobile buying decisions."
        canonicalPath="/how-to-know-if-a-phone-is-refurbished-expert-tips/"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 bg-[#FAF8F2]">
        {/* Back Link */}
        <Link to="/blogs" className="inline-flex items-center gap-2 text-xs font-bold text-[#00A88F] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>

        {/* Hero Header Banner Image with Overlay */}
        <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden shadow-xl border border-[#D8E2DE]">
          <img 
            src="/how-to-know-if-a-phone-is-refurbished-expert-tips.webp" 
            alt="How to Know if a Phone Is Refurbished: Expert Tips" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Banner Text Content */}
          <div className="relative z-10 h-full p-6 sm:p-10 flex flex-col justify-end space-y-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
              How to Know if a Phone Is Refurbished: Expert Tips
            </h1>

            {/* Metadata Line */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200 font-semibold pt-1 border-t border-white/20">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#00A88F]" /> Sep 30, 2025
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#00A88F]" /> By Achyut
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#00A88F]" /> Wholesale Mobile
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#00A88F]" /> 0 Comment
              </span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <article className="bg-white rounded-2xl p-6 sm:p-12 border border-[#D8E2DE] shadow-sm space-y-8">
          {/* Intro Paragraph */}
          <div className="space-y-4 text-sm sm:text-base text-[#334155] leading-relaxed">
            <p>
              Buying a smartphone can be exciting, but it can also be tricky, especially when considering refurbished devices. A refurbished phone is one that has been returned, repaired, or restored to working condition by a manufacturer or certified refurbished. While these phones can offer excellent value, some may have hidden issues if not carefully inspected. Here are expert tips on how to know if a phone is refurbished before making a purchase.
            </p>
          </div>

          {/* Point 1 */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#071715]">
              1. Inspect the Packaging
            </h2>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              The packaging is often the first indicator of a refurbished phone. New phones come in sealed boxes with all original accessories, manuals, and warranty cards. If the box looks resealed, has generic labels, or is missing documentation, there’s a chance the device has been refurbished. Even subtle differences in packaging design can give important clues.
            </p>
          </div>

          {/* Point 2 */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#071715]">
              2. Examine the Exterior Carefully
            </h2>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              Physical condition can reveal a lot about a phone’s history. Look for scratches, dents, or unusual marks on the body. Check the buttons, camera lens, and ports for inconsistencies. Refurbished phones may have replacement parts that differ slightly in colour or texture. These minor differences can indicate that the phone has been repaired or restored.
            </p>
          </div>

          {/* Point 3 */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#071715]">
              3. Verify the IMEI and Serial Number
            </h2>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              Every phone has a unique IMEI and serial number, usually found in the settings or by dialling <code className="bg-[#E5F3EF] px-2 py-0.5 rounded font-mono font-bold text-[#071715]">*#06#</code>. Cross-checking this information with the manufacturer’s database can reveal if the device is listed as refurbished or previously registered. This is one of the most reliable methods to confirm whether a phone is new or refurbished.
            </p>
          </div>

          {/* Point 4 */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#071715]">
              4. Check Battery Health
            </h2>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              Battery performance can provide essential clues. Refurbished phones may have replacement batteries or show signs of wear. Look for rapid battery drain, overheating, or slow charging. Using the original charger is the best way to test the battery’s efficiency and ensure the device functions properly.
            </p>
          </div>

          {/* Point 5 */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#071715]">
              5. Inspect Software and Performance
            </h2>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              Refurbished phones sometimes have older software or modifications. Navigate through apps and settings, checking for unusual behavior or glitches. Test performance, responsiveness, and features like cameras, speakers, and Wi-Fi connectivity. Any irregularities may indicate prior usage and refurbishment.
            </p>
          </div>

          {/* Point 6 */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#071715]">
              6. Look for Warranty and Seller Transparency
            </h2>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              Always buy from a trusted seller who discloses refurbishment clearly. For example, Mobiles Wholesale labels refurbished phones properly and provides warranty information. Asking for refurbishment certificates or repair receipts can help verify that the phone was professionally serviced.
            </p>
          </div>

          {/* Point 7 */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#071715]">
              7. Trust Your Instincts
            </h2>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              Finally, trust your instincts. If a deal seems too good to be true or the phone shows multiple signs of prior use, it’s better to be cautious. Careful observation and asking the right questions can save you from potential problems.
            </p>
          </div>

          {/* Conclusion */}
          <div className="space-y-4 pt-4 border-t border-[#D8E2DE]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#071715]">
              Conclusion
            </h2>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              Identifying a refurbished phone is crucial for making an informed purchase. From checking packaging and physical condition to verifying IMEI numbers and testing performance, several steps can help ensure you buy a reliable device. By following these expert tips, you can confidently purchase a smartphone without compromising on quality or value.
            </p>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              At <Link to="/wholesale" className="text-[#00A88F] font-bold hover:underline">Mobiles Wholesale</Link>, we pride ourselves on being a trusted distributor for businesses across the UK. Our wide product selection, competitive prices, and reliable support make us the go-to choice for mobile phone retailers, resellers, and enterprises. Contact us today at <a href="tel:+447400055536" className="text-[#00A88F] font-bold hover:underline">+44 7400 055536</a>, Landline: <a href="tel:+4420800044421" className="text-[#00A88F] font-bold hover:underline">0208 000 44421</a>, or email <a href="mailto:sales@mobileswholesale.co.uk" className="text-[#00A88F] font-bold hover:underline">sales@mobileswholesale.co.uk</a>.
            </p>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogPostRefurbished;
