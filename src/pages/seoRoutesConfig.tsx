import React from 'react';
import { ServicePage, ServicePageProps } from '../components/templates/ServicePage';
import { WholesaleLandingPage, WholesaleLandingPageProps } from '../components/templates/WholesaleLandingPage';
import { WholesaleCategoryPage, WholesaleCategoryPageProps } from '../components/templates/WholesaleCategoryPage';
import { BrandPage, BrandPageProps } from '../components/templates/BrandPage';

// --- SERVICE PAGES CONFIG ---

export const buyBackServiceConfig: ServicePageProps = {
  title: 'Sell To Us — Device Purchasing & Trade-In',
  subtitle: 'Sell surplus mobile phone inventory, customer trade-ins, or corporate mobile fleets to Mobiles Wholesale UK.',
  badge: 'Sell To Us & Trade Valuation',
  metaTitle: 'Sell To Us | Device Purchasing & Trade-In | Mobiles Wholesale UK',
  metaDescription: 'Sell surplus mobile phones, tablets, and corporate device fleets to Mobiles Wholesale UK. Get competitive trade valuations and fast payments.',
  canonicalPath: '/sell-to-us',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/sell-to-us' },
    { name: 'Sell To Us', url: '/sell-to-us' }
  ],
  overview: [
    'Mobiles Wholesale offers a streamlined B2B device buy-back service for UK retailers, e-commerce power sellers, corporate fleet operators, and IT asset managers looking to monetize surplus mobile inventory.',
    'We accept bulk quantities of Apple iPhones, Samsung Galaxy smartphones, iPads, MacBooks, and Android devices across all condition tiers.'
  ],
  features: [
    { title: 'Competitive Trade Valuations', description: 'Real-time market valuation based on current UK wholesale demand and live stock pricing.' },
    { title: 'Bulk Volume Purchasing', description: 'Accepting trade lots from 10 to 1,000+ units with rapid evaluation.' },
    { title: 'Data Destruction Assurance', description: 'Factory resetting and data sanitization for corporate devices prior to resale.' }
  ],
  processSteps: [
    { step: 1, title: 'Submit Stock Manifest', description: 'Provide list of models, quantities, and cosmetic conditions.' },
    { step: 2, title: 'Receive Valuation', description: 'Receive a formal trade buy-back offer within 24 business hours.' },
    { step: 3, title: 'Insured Delivery', description: 'Ship your inventory lot to our London warehouse via insured courier.' },
    { step: 4, title: 'Testing & Payment', description: 'Prompt payment upon physical inspection and diagnostic verification.' }
  ],
  targetClients: [
    'Physical Mobile Phone Retail Shops',
    'E-Commerce Trade Sellers & Resellers',
    'Corporate Fleet IT Managers',
    'Education & Public Sector IT Departments'
  ],
  relatedServices: [
    { title: 'Diagnostics', path: '/services/diagnostics', description: 'Device testing and pre-sale inspection.' },
    { title: 'Recycling', path: '/services/recycling', description: 'Responsible IT asset disposal.' },
    { title: 'Repair', path: '/services/repair', description: 'Hardware maintenance and screen repair.' }
  ]
};

export const diagnosticsServiceConfig: ServicePageProps = {
  title: 'Device Diagnostics & Quality Inspection',
  subtitle: 'Comprehensive functional testing, fault identification, and pre-sale quality inspection for mobile devices.',
  badge: 'B2B Quality Inspection',
  metaTitle: 'Device Diagnostics & Quality Inspection | Mobiles Wholesale',
  metaDescription: 'Professional mobile phone diagnostics and pre-sale testing services. Complete functional hardware checks and quality inspection.',
  canonicalPath: '/services/diagnostics',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services/diagnostics' },
    { name: 'Diagnostics', url: '/services/diagnostics' }
  ],
  overview: [
    'Our technical diagnostic workflow evaluates pre-owned smartphones, tablets, and laptops across all hardware components before inventory release.',
    'Every device undergoes systematic functional testing covering touchscreens, cameras, speakers, microphones, wireless radios, and physical buttons.'
  ],
  features: [
    { title: 'Functional Hardware Checks', description: 'Inspection covering displays, cameras, sensors, microphones, and charging ports.' },
    { title: 'Fault Identification', description: 'Detecting subtle hardware errors prior to wholesale listing.' },
    { title: 'Quality Inspection Audit', description: 'Visual and functional checks ensuring full transparency for trade buyers.' }
  ],
  processSteps: [
    { step: 1, title: 'Receiving & Serial Verification', description: 'Verifying device details and serial credentials.' },
    { step: 2, title: 'Hardware Functional Test', description: 'Testing display response, cameras, audio, and wireless radios.' },
    { step: 3, title: 'Battery Evaluation', description: 'Checking charge retention and battery health standard.' },
    { step: 4, title: 'Grading Classification', description: 'Assigning tier status and lot barcode labels.' }
  ],
  targetClients: [
    'High-Street Phone Retailers',
    'Online Marketplace Sellers',
    'Corporate IT Asset Managers',
    'Insurance & Trade Resellers'
  ],
  relatedServices: [
    { title: 'Sell To Us', path: '/sell-to-us', description: 'Sell surplus mobile stock.' },
    { title: 'Recycling', path: '/services/recycling', description: 'Responsible electronics recycling.' },
    { title: 'Repair', path: '/services/repair', description: 'Hardware repair services.' }
  ]
};

export const recyclingServiceConfig: ServicePageProps = {
  title: 'Responsible Electronics & Mobile Recycling',
  subtitle: 'Compliant mobile phone recycling, device disposal, and environmental IT asset management.',
  badge: 'Sustainable IT Disposal',
  metaTitle: 'Mobile Phone & Electronics Recycling | Mobiles Wholesale',
  metaDescription: 'Responsible B2B mobile phone recycling and electronics disposal services in the UK. Compliant IT asset recycling for businesses.',
  canonicalPath: '/services/recycling',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services/recycling' },
    { name: 'Recycling', url: '/services/recycling' }
  ],
  overview: [
    'Mobiles Wholesale provides UK businesses with responsible electronics recycling solutions for end-of-life mobile phones, tablets, and IT hardware.',
    'We assist corporate fleets, schools, and trade partners in adhering to environmental standards through safe device disposal and component recovery.'
  ],
  features: [
    { title: 'Environmental Responsibility', description: 'Supporting electronic waste reduction through component re-use and recycling.' },
    { title: 'Business Enquiries', description: 'Custom recycling arrangements for corporate fleets and public sector bodies.' },
    { title: 'Data Sanitization', description: 'Ensuring user account locks and data storage components are wiped prior to processing.' }
  ],
  processSteps: [
    { step: 1, title: 'Enquiry & Consultation', description: 'Submit hardware details and recycling requirements.' },
    { step: 2, title: 'Secure Transport', description: 'Insured courier transport to our facility.' },
    { step: 3, title: 'Data Reset Verification', description: 'Full data wiping and security check.' },
    { step: 4, title: 'Responsible Processing', description: 'Sorting, component recovery, and compliant disposal.' }
  ],
  targetClients: [
    'Corporate Fleets & IT Departments',
    'Educational Institutions & Colleges',
    'Local Authorities & Public Sector',
    'Telecom Retailers'
  ],
  relatedServices: [
    { title: 'Sell To Us', path: '/sell-to-us', description: 'Monetize working surplus devices.' },
    { title: 'Diagnostics', path: '/services/diagnostics', description: 'Hardware testing.' },
    { title: 'Repair', path: '/services/repair', description: 'Extend device lifecycle.' }
  ]
};

export const repairServiceConfig: ServicePageProps = {
  title: 'Device Repair Expertise & Maintenance',
  subtitle: 'Professional B2B mobile phone repair support, diagnostics, screen, battery, and charging maintenance.',
  badge: 'Technical Repair Support',
  metaTitle: 'Mobile Phone Repair Services & Maintenance | Mobiles Wholesale',
  metaDescription: 'B2B mobile phone repair services in the UK. Professional diagnostic, screen, battery, and charging port repair support for trade clients.',
  canonicalPath: '/services/repair',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services/repair' },
    { name: 'Repair', url: '/services/repair' }
  ],
  overview: [
    'Our technical team provides trade clients with mobile phone repair support, component maintenance, display replacements, and battery servicing.',
    'We help phone shops and fleet managers restore damaged devices to pristine working condition with fast turnaround times.'
  ],
  features: [
    { title: 'Common Repair Services', description: 'Screen glass replacement, battery servicing, and charging port repairs.' },
    { title: 'Pre-Distribution Prep', description: 'Refurbishing trade inventory to clean retail standards.' },
    { title: 'Business Repair Enquiries', description: 'Handling volume repair batches for retailers and corporate accounts.' }
  ],
  processSteps: [
    { step: 1, title: 'Diagnostic Assessment', description: 'Evaluating hardware components to pinpoint required repairs.' },
    { step: 2, title: 'Quality Parts Replacement', description: 'Installing replacement displays, batteries, or charging assemblies.' },
    { step: 3, title: 'Post-Repair Re-Test', description: 'Full diagnostic testing to confirm complete functionality.' },
    { step: 4, title: 'Dispatch & Return', description: 'Returning repaired hardware via secure courier.' }
  ],
  targetClients: [
    'Mobile Phone Retail Shops',
    'Corporate Fleet IT Managers',
    'Insurance Repair Vendors',
    'Educational Institutions'
  ],
  relatedServices: [
    { title: 'Diagnostics', path: '/services/diagnostics', description: 'Hardware diagnostics.' },
    { title: 'Sell To Us', path: '/sell-to-us', description: 'Sell surplus device inventory.' },
    { title: 'Recycling', path: '/services/recycling', description: 'End-of-life recycling.' }
  ]
};

// --- WHOLESALE LANDING PAGES CONFIG ---

export const wholesaleMainConfig: WholesaleLandingPageProps = {
  title: 'Wholesale Mobile Phones & Electronics UK',
  subtitle: 'The UK’s trusted B2B trade supplier of iPhones, Samsung Galaxy, iPads, MacBooks, laptops, and consumer tech.',
  badge: 'UK B2B Trade Distributor',
  metaTitle: 'Wholesale Mobile Phones UK | Refurbished & Sealed Tech | Mobiles Wholesale',
  metaDescription: 'Buy wholesale mobile phones, iPhones, Samsung Galaxy, tablets, and laptops in the UK. Competitive trade pricing, Margin Scheme VAT, and next-day DPD delivery.',
  canonicalPath: '/wholesale',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Wholesale', url: '/wholesale' }
  ],
  overview: [
    'Mobiles Wholesale is a premier UK trade supplier serving mobile phone shop owners, e-commerce sellers, corporate fleet buyers, and bulk exporters.',
    'We stock a wide range of brand new sealed and certified pre-owned devices with transparent grading, margin scheme VAT invoicing, and next-day DPD courier delivery.'
  ],
  features: [
    { title: 'Live Inventory Feed', description: 'Daily CSV stock feeds and real-time availability updates for trade accounts.' },
    { title: 'Margin Scheme VAT', description: 'Save 20% on pre-owned smartphones with official Margin Scheme VAT invoices.' },
    { title: 'Next-Day Delivery', description: 'Orders confirmed before 2 PM GMT are shipped same-day via insured courier.' }
  ],
  showTradeApplicationCTA: true,
  relatedWholesaleLinks: [
    { title: 'Bulk Buy', path: '/wholesale/bulk-buy', description: 'Large volume purchasing options.' },
    { title: 'Buy Stock', path: '/wholesale/buy-stock', description: 'Ordering process and device categories.' },
    { title: 'Get a Quote', path: '/wholesale/get-a-quote', description: 'Custom trade pricing enquiries.' },
    { title: 'How to Buy', path: '/wholesale/how-to-buy', description: 'Step-by-step purchasing guide.' },
    { title: 'Open Account', path: '/wholesale/open-account', description: 'Apply for a trade account.' },
    { title: 'Tablets Wholesale', path: '/wholesale/tablets-wholesale', description: 'Wholesale iPads & Android tablets.' },
    { title: 'Laptops Wholesale', path: '/wholesale/laptops-wholesale', description: 'Wholesale MacBooks & Windows laptops.' },
    { title: 'Wearables Wholesale', path: '/wholesale/wearables-wholesale', description: 'Wholesale Apple Watch & smartwatches.' }
  ]
};

export const bulkBuyConfig: WholesaleLandingPageProps = {
  title: 'Bulk Mobile Phone Purchasing & Volume Orders',
  subtitle: 'Tailored bulk purchasing solutions for large volume buyers, master distributors, retailers, and international exporters.',
  badge: 'Volume B2B Purchasing',
  metaTitle: 'Bulk Buy Mobile Phones UK | Large Volume Orders | Mobiles Wholesale',
  metaDescription: 'Bulk purchasing of mobile phones, iPhones, and electronics for UK trade customers. High volume lot allocations, pallet pricing, and export support.',
  canonicalPath: '/wholesale/bulk-buy',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Wholesale', url: '/wholesale' },
    { name: 'Bulk Buy', url: '/wholesale/bulk-buy' }
  ],
  overview: [
    'Our bulk purchasing program caters to high-volume trade clients purchasing 50 to 1,000+ units per transaction. We provide priority stock allocation and dedicated logistics support.',
    'Whether you run multiple high-street retail stores or export internationally, our volume supply chain ensures consistent inventory availability.'
  ],
  features: [
    { title: 'Volume Tier Pricing', description: 'Competitive tiered pricing models for 50+, 100+, and 500+ unit transactions.' },
    { title: 'Container & Pallet Lots', description: 'Boxed pallet lots ready for rapid commercial freight dispatch.' },
    { title: 'Export Customs Support', description: 'Zero-rated VAT invoicing for valid international export businesses.' }
  ],
  showTradeApplicationCTA: true,
  relatedWholesaleLinks: [
    { title: 'Get a Quote', path: '/wholesale/get-a-quote', description: 'Request bulk pricing.' },
    { title: 'How to Buy', path: '/wholesale/how-to-buy', description: 'Step-by-step guide.' },
    { title: 'Open Account', path: '/wholesale/open-account', description: 'Apply for a trade account.' }
  ]
};

export const buyStockConfig: WholesaleLandingPageProps = {
  title: 'How to Purchase Wholesale Mobile Stock',
  subtitle: 'Explore available device categories, grade tiers, stock availability, and our easy ordering process.',
  badge: 'Stock Purchasing Overview',
  metaTitle: 'Buy Wholesale Stock | Mobile Phones & Tech | Mobiles Wholesale',
  metaDescription: 'Learn how to purchase wholesale stock from Mobiles Wholesale. Browse available categories, device grades, stock availability, and ordering steps.',
  canonicalPath: '/wholesale/buy-stock',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Wholesale', url: '/wholesale' },
    { name: 'Buy Stock', url: '/wholesale/buy-stock' }
  ],
  overview: [
    'Purchasing wholesale stock from Mobiles Wholesale is straightforward. Browse our live stock catalog, select your required models, grades, and quantities, and place your order.',
    'We supply iPhones, Samsung Galaxy phones, iPads, MacBooks, laptops, and smartwatches across Brand New Sealed, Grade A, Grade B, and Grade C tiers.'
  ],
  features: [
    { title: 'Available Categories', description: 'Mobile phones, tablets, laptops, MacBooks, smartwatches, consoles, and OEM accessories.' },
    { title: 'Grade Transparency', description: 'Every item is clearly labeled by grade with exact cosmetic descriptions.' },
    { title: 'Rapid Stock Ordering', description: 'Order via WhatsApp, web inquiry, or through your dedicated account manager.' }
  ],
  showTradeApplicationCTA: true,
  relatedWholesaleLinks: [
    { title: 'Stock List Catalog', path: '/stock-list', description: 'Browse live UK catalog.' },
    { title: 'How We Grade', path: '/how-we-grade', description: 'Read grading guide.' },
    { title: 'Warranty Policy', path: '/warranty-and-returns', description: 'Review warranty coverage.' }
  ]
};

export const getAQuoteConfig: WholesaleLandingPageProps = {
  title: 'Request a Wholesale Price Quote',
  subtitle: 'Submit your required products and stock quantities to receive an immediate trade quote from our sales desk.',
  badge: 'Trade Quote Generator',
  metaTitle: 'Get a Wholesale Quote | Trade Pricing Enquiry | Mobiles Wholesale',
  metaDescription: 'Request a custom wholesale quote for mobile phones, tablets, and laptops. Fast trade pricing estimates from Mobiles Wholesale UK.',
  canonicalPath: '/wholesale/get-a-quote',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Wholesale', url: '/wholesale' },
    { name: 'Get a Quote', url: '/wholesale/get-a-quote' }
  ],
  overview: [
    'Need custom volume pricing or specific device specifications? Fill out our quote enquiry form below to receive a formal pricing offer within 24 business hours.'
  ],
  showQuoteForm: true,
  showTradeApplicationCTA: false,
  relatedWholesaleLinks: [
    { title: 'Bulk Buy', path: '/wholesale/bulk-buy', description: 'Volume order options.' },
    { title: 'Open Account', path: '/wholesale/open-account', description: 'Trade account setup.' }
  ]
};

export const howToBuyConfig: WholesaleLandingPageProps = {
  title: 'Simple Step-by-Step Purchasing Guide',
  subtitle: 'Learn how to order wholesale mobile phones and tech stock in 6 easy steps.',
  badge: 'Buying Guide',
  metaTitle: 'How to Buy Wholesale Mobile Phones | Step-by-Step Guide | Mobiles Wholesale',
  metaDescription: 'Follow our step-by-step guide to buy wholesale mobile phones and tech in the UK. Browse stock, confirm availability, complete payment, and receive next-day delivery.',
  canonicalPath: '/wholesale/how-to-buy',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Wholesale', url: '/wholesale' },
    { name: 'How to Buy', url: '/wholesale/how-to-buy' }
  ],
  overview: [
    'Ordering wholesale stock from Mobiles Wholesale is designed to be simple, fast, and secure for business customers. Follow our 6-step ordering process below.'
  ],
  steps: [
    { step: 1, title: 'Browse Wholesale Stock', description: 'Explore our live catalog at /stock-list or view specialized category pages.' },
    { step: 2, title: 'Select Products & Quantity', description: 'Choose your desired models, storage capacities, colors, and grade tiers.' },
    { step: 3, title: 'Submit Enquiry or Order', description: 'Submit an enquiry via web form, email, or direct WhatsApp trade desk.' },
    { step: 4, title: 'Confirm Pricing & Stock', description: 'Our team confirms live inventory reservation and issues a pro-forma trade invoice.' },
    { step: 5, title: 'Complete Payment', description: 'Pay securely via UK Bank Transfer (BACS) or card payment.' },
    { step: 6, title: 'Insured Delivery / Collection', description: 'Orders confirmed by 2 PM GMT are dispatched same-day via DPD Next Day.' }
  ],
  showTradeApplicationCTA: true,
  relatedWholesaleLinks: [
    { title: 'Stock List Catalog', path: '/stock-list', description: 'Browse live catalog.' },
    { title: 'Open Account', path: '/wholesale/open-account', description: 'Open trade account.' }
  ]
};

export const openAccountConfig: WholesaleLandingPageProps = {
  title: 'Open a B2B Wholesale Trade Account',
  subtitle: 'Unlock volume trade pricing, pro-forma invoicing, live CSV stock feeds, and dedicated account management.',
  badge: 'Trade Account Portal',
  metaTitle: 'Open a Wholesale Trade Account | Mobiles Wholesale UK',
  metaDescription: 'Apply for a wholesale trade account with Mobiles Wholesale UK. Enjoy trade pricing tiers, CSV stock feeds, pro-forma invoicing, and dedicated sales support.',
  canonicalPath: '/wholesale/open-account',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Wholesale', url: '/wholesale' },
    { name: 'Open Account', url: '/wholesale/open-account' }
  ],
  overview: [
    'Opening a trade account with Mobiles Wholesale grants your business access to exclusive wholesale pricing tiers, pro-forma invoicing, priority stock reservations, and daily CSV inventory updates.',
    'Account registration is free for verified mobile phone shops, e-commerce power sellers, corporate fleet managers, educational institutions, and bulk exporters.'
  ],
  features: [
    { title: 'Trade Pricing Access', description: 'Unlocking volume trade pricing tiers tailored to your monthly order volume.' },
    { title: 'Pro-Forma Invoicing', description: 'HMRC compliant Margin Scheme and Standard 20% VAT invoices for tax management.' },
    { title: 'Daily Stock Feeds', description: 'Receiving daily CSV stock updates delivered straight to your email inbox.' }
  ],
  showTradeApplicationCTA: false,
  relatedWholesaleLinks: [
    { title: 'Submit Application', path: '/business', description: 'Complete trade application.' },
    { title: 'How to Buy', path: '/wholesale/how-to-buy', description: 'Purchasing steps.' }
  ]
};

// --- CATEGORY PAGES CONFIG ---

export const tabletsCategoryConfig: WholesaleCategoryPageProps = {
  title: 'Wholesale Tablets & iPads',
  h1: 'Wholesale Tablets UK',
  subtitle: 'Buy wholesale Apple iPads, iPad Pro, iPad Air, and Android tablets in the UK. Factory sealed and certified pre-owned grades.',
  badge: 'Wholesale Tablets Hub',
  metaTitle: 'Wholesale Tablets UK | Refurbished & Sealed iPads | Mobiles Wholesale',
  metaDescription: 'Buy wholesale tablets and iPads in the UK from Mobiles Wholesale. Browse Apple iPad Pro, iPad Air, and Android tablet stock for trade buyers.',
  canonicalPath: '/wholesale/tablets-wholesale',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Wholesale', url: '/wholesale' },
    { name: 'Tablets Wholesale', url: '/wholesale/tablets-wholesale' }
  ],
  targetCategories: ['tablets'],
  introParagraphs: [
    'Mobiles Wholesale supplies UK trade customers with high quality wholesale tablets and iPads suitable for retail shops, schools, corporate fleets, and online resellers.',
    'Our tablet inventory includes Apple iPad Pro, iPad Air, standard iPads, and Android tablets across Brand New Sealed, Grade A, and Grade B tiers.'
  ],
  relatedCategoryLinks: [
    { title: 'Laptops Wholesale', path: '/wholesale/laptops-wholesale', description: 'Wholesale MacBooks & Windows laptops.' },
    { title: 'Wearables Wholesale', path: '/wholesale/wearables-wholesale', description: 'Wholesale smartwatches.' },
    { title: 'iPhones Wholesale', path: '/iphones', description: 'Wholesale Apple iPhones.' }
  ]
};

export const laptopsCategoryConfig: WholesaleCategoryPageProps = {
  title: 'Wholesale Laptops & MacBooks',
  h1: 'Wholesale Laptops & MacBooks UK',
  subtitle: 'Buy wholesale Apple MacBooks, Dell XPS, Lenovo ThinkPads, and business laptops in the UK.',
  badge: 'Wholesale Laptops Hub',
  metaTitle: 'Wholesale Laptops & MacBooks UK | Mobiles Wholesale',
  metaDescription: 'Buy wholesale laptops and MacBooks in the UK. Browse Apple MacBook Pro, MacBook Air, Dell XPS, and Lenovo ThinkPad stock for business customers.',
  canonicalPath: '/wholesale/laptops-wholesale',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Wholesale', url: '/wholesale' },
    { name: 'Laptops Wholesale', url: '/wholesale/laptops-wholesale' }
  ],
  targetCategories: ['laptops', 'macbooks'],
  introParagraphs: [
    'Mobiles Wholesale provides UK businesses and retailers with wholesale laptops and MacBooks powered by Intel, AMD, and Apple Silicon chips.',
    'Whether equipping corporate fleets or stocking online computer stores, we supply MacBook Pro, MacBook Air, Dell XPS, and Lenovo ThinkPads with full VAT invoicing.'
  ],
  relatedCategoryLinks: [
    { title: 'Tablets Wholesale', path: '/wholesale/tablets-wholesale', description: 'Wholesale iPads & tablets.' },
    { title: 'Wearables Wholesale', path: '/wholesale/wearables-wholesale', description: 'Wholesale smartwatches.' },
    { title: 'Samsung Wholesale', path: '/samsungs', description: 'Wholesale Samsung devices.' }
  ]
};

export const wearablesCategoryConfig: WholesaleCategoryPageProps = {
  title: 'Wholesale Smartwatches & Wearables',
  h1: 'Wholesale Wearables & Smartwatches UK',
  subtitle: 'Buy wholesale Apple Watch Series, Apple Watch Ultra, and Samsung Galaxy Watches in the UK.',
  badge: 'Wholesale Wearables Hub',
  metaTitle: 'Wholesale Smartwatches & Wearables UK | Mobiles Wholesale',
  metaDescription: 'Buy wholesale smartwatches and Apple Watches in the UK. Browse available Apple Watch Ultra, Series, and Samsung smartwatch stock for trade buyers.',
  canonicalPath: '/wholesale/wearables-wholesale',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Wholesale', url: '/wholesale' },
    { name: 'Wearables Wholesale', url: '/wholesale/wearables-wholesale' }
  ],
  targetCategories: ['smartwatches'],
  introParagraphs: [
    'Mobiles Wholesale supplies trade customers with genuine wholesale smartwatches and fitness wearables.',
    'Our wearable inventory includes Apple Watch Ultra 2, Apple Watch Series, and Samsung Galaxy Watches thoroughly inspected for screen glass and casing quality.'
  ],
  relatedCategoryLinks: [
    { title: 'iPhones Wholesale', path: '/iphones', description: 'Wholesale Apple iPhones.' },
    { title: 'Tablets Wholesale', path: '/wholesale/tablets-wholesale', description: 'Wholesale iPads & tablets.' },
    { title: 'Google Pixel Wholesale', path: '/google-pixel', description: 'Wholesale Pixel phones.' }
  ]
};

// --- BRAND PAGES CONFIG ---

export const iphonesBrandConfig: BrandPageProps = {
  h1: 'iPhones Wholesale UK',
  subtitle: 'Buy wholesale Apple iPhones in the UK. Browse available iPhone 15, 14, 13, and 12 models across Grade A, Grade B, and Brand New Sealed stock.',
  badge: 'Wholesale iPhone Hub',
  metaTitle: 'iPhones Wholesale UK | Refurbished iPhones | Mobiles Wholesale',
  metaDescription: 'Buy wholesale iPhones in the UK from Mobiles Wholesale. Browse available models, grades and stock for trade and business customers.',
  canonicalPath: '/iphones',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Wholesale', url: '/wholesale' },
    { name: 'iPhones Wholesale', url: '/iphones' }
  ],
  targetBrand: 'Apple',
  modelFilterKey: 'iPhone',
  introParagraphs: [
    'Mobiles Wholesale is a leading UK B2B supplier of wholesale Apple iPhones. We cater to high-street mobile phone shops, eBay/Amazon power sellers, and corporate buyers.',
    'Our iPhone stock includes factory sealed brand new units as well as PhoneCheck diagnostic inspected Grade A, Grade B, and Grade C inventory supplied with Margin Scheme VAT invoices.'
  ],
  relatedBrandLinks: [
    { title: 'Samsung Wholesale', path: '/samsungs', description: 'Browse Samsung Galaxy inventory.' },
    { title: 'Google Pixel Wholesale', path: '/google-pixel', description: 'Browse Google Pixel inventory.' },
    { title: 'Tablets Wholesale', path: '/wholesale/tablets-wholesale', description: 'Browse iPads & tablets.' }
  ]
};

export const samsungsBrandConfig: BrandPageProps = {
  h1: 'Samsung Wholesale UK',
  subtitle: 'Buy wholesale Samsung Galaxy smartphones, Z Fold, Z Flip, and Galaxy Tab inventory in the UK.',
  badge: 'Wholesale Samsung Hub',
  metaTitle: 'Samsung Wholesale UK | Galaxy Phones & Tabs | Mobiles Wholesale',
  metaDescription: 'Buy wholesale Samsung Galaxy phones in the UK from Mobiles Wholesale. Browse Galaxy S24 Ultra, Z Fold, and A-series stock for business customers.',
  canonicalPath: '/samsungs',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Wholesale', url: '/wholesale' },
    { name: 'Samsung Wholesale', url: '/samsungs' }
  ],
  targetBrand: 'Samsung',
  introParagraphs: [
    'Mobiles Wholesale supplies UK trade customers with genuine wholesale Samsung Galaxy smartphones and tablets.',
    'From flagship Galaxy S24 Ultra and Z Fold 5 models to cost-effective A-series handsets, our Samsung trade inventory comes fully tested with clean IMEI status.'
  ],
  relatedBrandLinks: [
    { title: 'iPhones Wholesale', path: '/iphones', description: 'Browse Apple iPhone inventory.' },
    { title: 'Google Pixel Wholesale', path: '/google-pixel', description: 'Browse Google Pixel inventory.' },
    { title: 'Laptops Wholesale', path: '/wholesale/laptops-wholesale', description: 'Browse laptops & MacBooks.' }
  ]
};

export const googlePixelBrandConfig: BrandPageProps = {
  h1: 'Google Pixel Wholesale UK',
  subtitle: 'Buy wholesale Google Pixel smartphones in the UK. Browse Pixel 8 Pro, Pixel 8, and Pixel 7 trade stock.',
  badge: 'Wholesale Google Hub',
  metaTitle: 'Google Pixel Wholesale UK | Refurbished Pixel Phones | Mobiles Wholesale',
  metaDescription: 'Buy wholesale Google Pixel phones in the UK from Mobiles Wholesale. Browse available Pixel models, grades, and stock for trade buyers.',
  canonicalPath: '/google-pixel',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Wholesale', url: '/wholesale' },
    { name: 'Google Pixel Wholesale', url: '/google-pixel' }
  ],
  targetBrand: 'Google',
  introParagraphs: [
    'Mobiles Wholesale is your reliable UK source for wholesale Google Pixel smartphones.',
    'We supply unlocked Google Pixel 8 Pro, Pixel 8, and Pixel 7 devices tested for clean IMEI, AI camera functionality, and battery performance.'
  ],
  relatedBrandLinks: [
    { title: 'iPhones Wholesale', path: '/iphones', description: 'Browse Apple iPhone inventory.' },
    { title: 'Samsung Wholesale', path: '/samsungs', description: 'Browse Samsung Galaxy inventory.' },
    { title: 'Wearables Wholesale', path: '/wholesale/wearables-wholesale', description: 'Browse smartwatches.' }
  ]
};
