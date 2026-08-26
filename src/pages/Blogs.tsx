import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Calendar, User } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const Blogs: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blogs', url: '/blogs' }
  ];

  const blogPosts = [
    {
      slug: 'how-to-know-if-a-phone-is-refurbished-expert-tips',
      title: 'How to Know if a Phone Is Refurbished: Expert Tips',
      snippet: 'Discover how to spot refurbished phones with simple checks on warranty, serial numbers, and condition to make smart mobile buying decisions.',
      date: 'Aug 20, 2026',
      author: 'Mobile Wholesale Expert Team',
      category: 'Guide & Tips'
    },
    {
      slug: 'wholesale-vs-retail-mobile-phones-whats-the-real-difference',
      title: 'Wholesale vs Retail Mobile Phones: What’s the Real Difference?',
      snippet: 'Discover the real differences between wholesale and retail mobile phone markets pricing, margins, and volume insights for smart purchasing decisions.',
      date: 'Aug 18, 2026',
      author: 'Mobile Wholesale Market Analysts',
      category: 'Industry Insights'
    }
  ];

  return (
    <>
      <SEOHead
        title="Blogs - Mobile Wholesale"
        description="Read the latest blogs on wholesale mobile phones, retail strategies, industry trends, and tips for growing your mobile business."
        canonicalPath="/blogs/"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#FAF8F2]">
        <div className="bg-white text-[#101A18] rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              <FileText className="w-3.5 h-3.5 text-[#00A88F]" /> Industry News & Guides
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#071715]">
              Mobile Wholesale Blog & Insights
            </h1>
            <p className="text-[#596662] text-base sm:text-lg">
              Expert advice, device testing guides, retail margin tips, and mobile industry news.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl border border-[#D8E2DE] p-6 sm:p-8 b2b-card-shadow space-y-4 flex flex-col justify-between hover:border-[#00A88F] transition-all">
              <div className="space-y-3">
                <span className="text-xs font-black text-[#007A68] bg-[#E5F3EF] px-3 py-1 rounded-full border border-[#D8E2DE]">
                  {post.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#071715]">
                  <Link to={`/${post.slug}/`} className="hover:text-[#00A88F] transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-xs text-[#596662] leading-relaxed">
                  {post.snippet}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8E2DE] flex items-center justify-between text-xs text-[#596662]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                </div>
                <Link to={`/${post.slug}/`} className="font-bold text-[#007A68] flex items-center gap-1 hover:underline">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};
export default Blogs;
