import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { LanguageProvider } from './context/LanguageContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { EnquiryModal } from './components/product/EnquiryModal';

// Existing Pages
import { Home } from './pages/Home';
import { Stock } from './pages/Stock';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Grading } from './pages/Grading';
import { SellToUs } from './pages/SellToUs';
import { Business } from './pages/Business';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// SEO Dedicated Pages
import { BuyFromUs } from './pages/BuyFromUs';
import { HowWeGrade } from './pages/HowWeGrade';
import { WarrantyAndReturns } from './pages/WarrantyAndReturns';
import { StockList } from './pages/StockList';
import { StockOffers } from './pages/StockOffers';
import { FAQs } from './pages/FAQs';

// Newly Replicated SEO Pages
import { Corporate } from './pages/Corporate';
import { Education } from './pages/Education';
import { RetailSector } from './pages/RetailSector';
import { BusinessITRecycling } from './pages/BusinessITRecycling';
import { TermsConditions } from './pages/TermsConditions';
import { Blogs } from './pages/Blogs';
import { BlogPostRefurbished } from './pages/BlogPostRefurbished';
import { BlogPostWholesaleVsRetail } from './pages/BlogPostWholesaleVsRetail';

// Templates & Configs
import { ServicePage } from './components/templates/ServicePage';
import { WholesaleLandingPage } from './components/templates/WholesaleLandingPage';
import { WholesaleCategoryPage } from './components/templates/WholesaleCategoryPage';
import { BrandPage } from './components/templates/BrandPage';

import {
  buyBackServiceConfig,
  diagnosticsServiceConfig,
  recyclingServiceConfig,
  repairServiceConfig,
  wholesaleMainConfig,
  bulkBuyConfig,
  buyStockConfig,
  getAQuoteConfig,
  howToBuyConfig,
  openAccountConfig,
  tabletsCategoryConfig,
  laptopsCategoryConfig,
  wearablesCategoryConfig,
  iphonesBrandConfig,
  samsungsBrandConfig,
  googlePixelBrandConfig
} from './pages/seoRoutesConfig';

export const App: React.FC = () => {
  const [isStockListModalOpen, setIsStockListModalOpen] = useState(false);
  return (
    <LanguageProvider>
      <AuthProvider>
        <ProductProvider>
          <Router>
            <ScrollToTop />
            <div className="premium-page flex flex-col min-h-screen text-slate-900 font-sans antialiased">
              <Header onRequestStockList={() => setIsStockListModalOpen(true)} />
              <main className="flex-1">
                <Routes>
                  {/* Legacy / Primary Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/stock" element={<Stock />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/grading" element={<Grading />} />
                  <Route path="/sell-to-us" element={<SellToUs />} />
                  <Route path="/business" element={<Business />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* 1. Buy From Us, Grading & Warranty */}
                  <Route path="/buy-from-us" element={<BuyFromUs />} />
                  <Route path="/how-we-grade" element={<HowWeGrade />} />
                  <Route path="/warranty-and-returns" element={<WarrantyAndReturns />} />

                  {/* 2. Services Section */}
                  <Route path="/services/buy-back" element={<SellToUs />} />
                  <Route path="/services/sell-to-us" element={<SellToUs />} />
                  <Route path="/services/diagnostics" element={<ServicePage {...diagnosticsServiceConfig} />} />
                  <Route path="/services/recycling" element={<ServicePage {...recyclingServiceConfig} />} />
                  <Route path="/services/repair" element={<ServicePage {...repairServiceConfig} />} />

                  {/* 3. Wholesale Section */}
                  <Route path="/wholesale" element={<WholesaleLandingPage {...wholesaleMainConfig} />} />
                  <Route path="/wholesale/bulk-buy" element={<WholesaleLandingPage {...bulkBuyConfig} />} />
                  <Route path="/wholesale/buy-stock" element={<WholesaleLandingPage {...buyStockConfig} />} />
                  <Route path="/wholesale/get-a-quote" element={<WholesaleLandingPage {...getAQuoteConfig} />} />
                  <Route path="/wholesale/how-to-buy" element={<WholesaleLandingPage {...howToBuyConfig} />} />
                  <Route path="/wholesale/open-account" element={<WholesaleLandingPage {...openAccountConfig} />} />

                  {/* 4. Product Category SEO Pages */}
                  <Route path="/wholesale/tablets-wholesale" element={<WholesaleCategoryPage {...tabletsCategoryConfig} />} />
                  <Route path="/wholesale/laptops-wholesale" element={<WholesaleCategoryPage {...laptopsCategoryConfig} />} />
                  <Route path="/wholesale/wearables-wholesale" element={<WholesaleCategoryPage {...wearablesCategoryConfig} />} />

                  {/* 5. Stock Pages */}
                  <Route path="/stock-list" element={<StockList />} />
                  <Route path="/stock-offers" element={<StockOffers />} />

                  {/* 6. FAQ Page */}
                  <Route path="/faqs" element={<FAQs />} />

                  {/* 7. Dedicated Brand Pages */}
                  <Route path="/iphones" element={<BrandPage {...iphonesBrandConfig} />} />
                  <Route path="/samsungs" element={<BrandPage {...samsungsBrandConfig} />} />
                  <Route path="/google-pixel" element={<BrandPage {...googlePixelBrandConfig} />} />

                  {/* 8. Replicated SEO Audit Routes & Aliases */}
                  <Route path="/trade-application" element={<Business />} />
                  <Route path="/corporate" element={<Corporate />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/retail" element={<RetailSector />} />
                  <Route path="/business-it-recycling" element={<BusinessITRecycling />} />
                  <Route path="/terms-conditions" element={<TermsConditions />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/how-to-know-if-a-phone-is-refurbished-expert-tips" element={<BlogPostRefurbished />} />
                  <Route path="/wholesale-vs-retail-mobile-phones-whats-the-real-difference" element={<BlogPostWholesaleVsRetail />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  
                  {/* Fallback */}
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
              <Footer />
              <EnquiryModal isOpen={isStockListModalOpen} onClose={() => setIsStockListModalOpen(false)} />
            </div>
          </Router>
        </ProductProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};
export default App;
