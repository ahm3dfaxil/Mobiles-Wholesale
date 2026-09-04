import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [];

export const CATEGORY_INFO: Record<string, { title: string; count: number; image: string; description: string }> = {
  'mobile-phones': {
    title: 'Mobile Phones',
    count: 0,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    description: 'iPhones, Samsung Galaxy, Google Pixel, and Xiaomi. Sealed, Grade A, B, and C.'
  },
  'tablets': {
    title: 'Tablets & iPads',
    count: 0,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    description: 'Apple iPads, iPad Pro, iPad Air, and Samsung Galaxy Tabs.'
  },
  'macbooks': {
    title: 'MacBooks',
    count: 0,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    description: 'MacBook Pro M1/M2/M3 & MacBook Air. Factory Sealed and Certified Grade A/B.'
  },
  'laptops': {
    title: 'Laptops',
    count: 0,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    description: 'Dell XPS, Lenovo ThinkPad, HP Spectre, and Asus gaming laptops.'
  },
  'smartwatches': {
    title: 'Smartwatches',
    count: 0,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    description: 'Apple Watch Series & Ultra, Samsung Galaxy Watches. Inspected glass & housing.'
  },
  'gaming-consoles': {
    title: 'Gaming Consoles',
    count: 0,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    description: 'PlayStation 5, Xbox Series X/S, Nintendo Switch. Sealed UK stock.'
  },
  'accessories': {
    title: 'Accessories',
    count: 0,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    description: 'AirPods, OEM fast chargers, cables, and bulk trade accessory bundles.'
  }
};

export const UK_WHATSAPP_NUMBER = '447400055536';
export const UK_COMPANY_INFO = {
  name: 'Mobile Wholesale',
  tradingNotice: "Mobile Wholesale Is A Trading Name Of Regenerate Global Limited And It's Registered In England And Wales.",
  registrationNumber: 'UK Registered In England And Wales',
  vatNumber: 'GB VAT Registered',
  address: 'By Appointments Only',
  phone: '+44 20 8004 4421',
  mobileWhatsapp: '+44 7400055536',
  salesEmail: 'sales@mobileswholesale.co.uk',
  infoEmail: 'info@mobileswholesale.co.uk',
  tradeHours: 'Mon - Fri: 8:30 AM - 5:30 PM GMT'
};
