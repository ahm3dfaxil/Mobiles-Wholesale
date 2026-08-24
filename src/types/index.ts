export type Category = 
  | 'mobile-phones'
  | 'tablets'
  | 'macbooks'
  | 'laptops'
  | 'smartwatches'
  | 'gaming-consoles'
  | 'accessories';

export type Brand = 
  | 'Apple'
  | 'Samsung'
  | 'Sony'
  | 'Google'
  | 'Microsoft'
  | 'Xiaomi'
  | 'Dell'
  | 'Lenovo'
  | 'Nintendo'
  | 'Other';

export type DeviceGrade = 
  | 'Brand New Sealed'
  | 'Refurbished Grade A+'
  | 'Grade A'
  | 'Grade B'
  | 'Grade C'
  | 'Clearance / As Is';

export type VATType = 'Margin VAT' | 'Standard 20% VAT' | 'Zero Rated (Export)';

export type AvailabilityStatus = 'In Stock' | 'Low Stock' | 'Pre-Order' | 'Out of Stock';

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: Brand;
  category: Category;
  model: string;
  storage?: string;
  colour?: string;
  color?: string; // alias
  network?: string;
  condition?: string;
  grade: DeviceGrade;
  priceGBP: number;
  price?: number; // alias for priceGBP
  vatType: VATType;
  moq: number; // Minimum Order Quantity
  quantity: number; // stockQty alias
  stockQty: number;
  availability: AvailabilityStatus;
  inStock: boolean;
  image: string;
  description: string;
  specs: Record<string, string>;
  isHotDeal?: boolean;
  warrantyDays: number;
}

export interface StockFilterState {
  search: string;
  category: Category | 'all';
  brand: Brand | 'all';
  grade: DeviceGrade | 'all';
  availability: AvailabilityStatus | 'all';
  vatType: VATType | 'all';
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'stock-desc';
}

export interface WholesaleEnquiryForm {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  vatNumber?: string;
  productId?: string;
  productName?: string;
  quantityRequired: number;
  targetPriceGBP?: number;
  deliveryPostcode: string;
  comments: string;
}

export interface SellToUsForm {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  productType: string;
  brand: string;
  quantity: number;
  condition: string;
  description: string;
  stockListFileName?: string;
  uploadedFiles?: { name: string; size: number; type: string; dataUrl?: string }[];
  message: string;
  askingPriceGBP?: number;
}

