import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const PRODUCTS_FILE = path.join(DB_DIR, 'products.json');
const CATEGORIES_FILE = path.join(DB_DIR, 'categories.json');
const USERS_FILE = path.join(DB_DIR, 'users.json');

const loadJSON = (filePath, fallback = []) => {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
};

const saveJSON = (filePath, data) => {
  try {
    const tempPath = `${filePath}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, filePath);
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
};

// Initial Seed Products (mirroring initial trade catalog)
const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    sku: 'MW-APL-IP15PM-256-NT',
    name: 'Apple iPhone 15 Pro Max 256GB - Natural Titanium',
    brand: 'Apple',
    category: 'mobile-phones',
    model: 'iPhone 15 Pro Max',
    storage: '256GB',
    colour: 'Natural Titanium',
    color: 'Natural Titanium',
    network: 'Unlocked to all networks',
    condition: '10/10 Factory Sealed',
    grade: 'Brand New Sealed',
    priceGBP: 980,
    price: 980,
    vatType: 'Standard 20% VAT',
    moq: 3,
    quantity: 35,
    stockQty: 35,
    availability: 'In Stock',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    description: 'Brand new UK specification Apple iPhone 15 Pro Max 256GB in Natural Titanium. Factory sealed with 12-month official Apple warranty.',
    specs: {
      'Display': '6.7-inch Super Retina XDR OLED 120Hz',
      'Processor': 'Apple A17 Pro chip',
      'Camera': '48MP Main | 12MP Ultra Wide | 12MP 5x Telephoto',
      'Battery Health': '100% (Sealed)',
      'Network': 'Unlocked'
    },
    isHotDeal: true,
    warrantyDays: 365
  },
  {
    id: 'prod-002',
    sku: 'MW-APL-IP15-128-BK',
    name: 'Apple iPhone 15 128GB - Black',
    brand: 'Apple',
    category: 'mobile-phones',
    model: 'iPhone 15',
    storage: '128GB',
    colour: 'Black',
    color: 'Black',
    network: 'Unlocked to all networks',
    condition: 'PhoneCheck Certified 60-Point Inspection',
    grade: 'Grade A',
    priceGBP: 540,
    price: 540,
    vatType: 'Margin VAT',
    moq: 5,
    quantity: 60,
    stockQty: 60,
    availability: 'In Stock',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    description: 'Pristine Grade A stock with Dynamic Island, 48MP main camera, and USB-C port. Minimum 88%+ battery health guaranteed.',
    specs: {
      'Display': '6.1-inch Super Retina XDR',
      'Processor': 'Apple A16 Bionic',
      'Camera': '48MP + 12MP Dual system',
      'Battery Health': '88%+ Guaranteed',
      'Network': 'Unlocked'
    },
    isHotDeal: true,
    warrantyDays: 90
  },
  {
    id: 'prod-003',
    sku: 'MW-APL-IP14P-128-DP',
    name: 'Apple iPhone 14 Pro 128GB - Deep Purple',
    brand: 'Apple',
    category: 'mobile-phones',
    model: 'iPhone 14 Pro',
    storage: '128GB',
    colour: 'Deep Purple',
    color: 'Deep Purple',
    network: 'Unlocked',
    condition: 'Cosmetic Light Wear',
    grade: 'Grade B',
    priceGBP: 495,
    price: 495,
    vatType: 'Margin VAT',
    moq: 5,
    quantity: 45,
    stockQty: 45,
    availability: 'In Stock',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&w=800&q=80',
    description: 'Grade B wholesale lot. Minor cosmetic scuffs on housing. 100% functional display with no dead pixels. 85%+ battery retention.',
    specs: {
      'Display': '6.1-inch Always-On Super Retina XDR',
      'Processor': 'A16 Bionic chip',
      'Camera': '48MP Triple lens system',
      'Battery Health': '85%+ Guaranteed',
      'Network': 'Unlocked'
    },
    isHotDeal: false,
    warrantyDays: 90
  },
  {
    id: 'prod-005',
    sku: 'MW-SAM-S24U-512-GY',
    name: 'Samsung Galaxy S24 Ultra 512GB - Titanium Gray',
    brand: 'Samsung',
    category: 'mobile-phones',
    model: 'Galaxy S24 Ultra',
    storage: '512GB',
    colour: 'Titanium Gray',
    color: 'Titanium Gray',
    network: 'Dual SIM Unlocked',
    condition: '10/10 Factory Sealed',
    grade: 'Brand New Sealed',
    priceGBP: 920,
    price: 920,
    vatType: 'Standard 20% VAT',
    moq: 3,
    quantity: 18,
    stockQty: 18,
    availability: 'In Stock',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    description: 'Factory sealed UK stock with full S-Pen functionality, Snapdragon 8 Gen 3 for Galaxy, and 200MP camera system.',
    specs: {
      'Display': '6.8-inch Dynamic AMOLED 2X 120Hz',
      'Processor': 'Snapdragon 8 Gen 3',
      'Camera': '200MP + 50MP + 12MP + 10MP',
      'Battery Health': '100% (Sealed)',
      'Network': 'Dual SIM Unlocked'
    },
    isHotDeal: true,
    warrantyDays: 365
  },
  {
    id: 'prod-008',
    sku: 'MW-APL-IPPRO129-M2-256',
    name: 'Apple iPad Pro 12.9" 6th Gen M2 256GB Wi-Fi - Space Grey',
    brand: 'Apple',
    category: 'tablets',
    model: 'iPad Pro 12.9 M2',
    storage: '256GB',
    colour: 'Space Grey',
    color: 'Space Grey',
    network: 'Wi-Fi Only',
    condition: '10/10 Factory Sealed',
    grade: 'Brand New Sealed',
    priceGBP: 890,
    price: 890,
    vatType: 'Standard 20% VAT',
    moq: 2,
    quantity: 16,
    stockQty: 16,
    availability: 'In Stock',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    description: 'Brand new UK stock. Mini-LED Liquid Retina XDR screen powered by the Apple M2 chip.',
    specs: {
      'Display': '12.9-inch Liquid Retina XDR Mini-LED',
      'Processor': 'Apple M2 8-Core CPU / 10-Core GPU',
      'Memory': '8GB RAM',
      'Warranty': '12 Months Apple Official'
    },
    isHotDeal: true,
    warrantyDays: 365
  },
  {
    id: 'prod-010',
    sku: 'MW-APL-MBP14-M3-512',
    name: 'Apple MacBook Pro 14" M3 512GB - Space Black',
    brand: 'Apple',
    category: 'macbooks',
    model: 'MacBook Pro 14 M3',
    storage: '512GB SSD / 8GB RAM',
    colour: 'Space Black',
    color: 'Space Black',
    network: 'N/A',
    condition: '10/10 Factory Sealed',
    grade: 'Brand New Sealed',
    priceGBP: 1390,
    price: 1390,
    vatType: 'Standard 20% VAT',
    moq: 2,
    quantity: 12,
    stockQty: 12,
    availability: 'In Stock',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    description: 'Brand new UK layout Apple MacBook Pro 14" with M3 Chip, Liquid Retina XDR display, and 512GB SSD.',
    specs: {
      'Display': '14.2-inch Liquid Retina XDR',
      'Processor': 'Apple M3 8-Core CPU',
      'Memory': '8GB Unified RAM',
      'Keyboard': 'UK QWERTY Layout'
    },
    isHotDeal: true,
    warrantyDays: 365
  },
  {
    id: 'prod-015',
    sku: 'MW-SNY-PS5-SLM-DIG',
    name: 'Sony PlayStation 5 Slim Digital Edition 1TB',
    brand: 'Sony',
    category: 'gaming-consoles',
    model: 'PS5 Slim Digital',
    storage: '1TB SSD',
    colour: 'White',
    color: 'White',
    network: 'Wi-Fi 6',
    condition: '10/10 Factory Sealed',
    grade: 'Brand New Sealed',
    priceGBP: 340,
    price: 340,
    vatType: 'Standard 20% VAT',
    moq: 5,
    quantity: 50,
    stockQty: 50,
    availability: 'In Stock',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    description: 'Brand new sealed UK retail stock. Includes DualSense Wireless Controller, Astro\'s Playroom pre-installed, and UK plug.',
    specs: {
      'Storage': '1TB Custom SSD',
      'Resolution': 'Up to 4K 120Hz HDR',
      'Controller': 'DualSense Wireless Included',
      'Warranty': '12 Months Sony UK'
    },
    isHotDeal: true,
    warrantyDays: 365
  },
  {
    id: 'prod-017',
    sku: 'MW-APL-AIRPODS-P2',
    name: 'Apple AirPods Pro (2nd Generation) USB-C',
    brand: 'Apple',
    category: 'accessories',
    model: 'AirPods Pro 2',
    storage: 'N/A',
    colour: 'White',
    color: 'White',
    network: 'Bluetooth 5.3',
    condition: '10/10 Factory Sealed',
    grade: 'Brand New Sealed',
    priceGBP: 165,
    price: 165,
    vatType: 'Standard 20% VAT',
    moq: 10,
    quantity: 120,
    stockQty: 120,
    availability: 'In Stock',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    description: 'Genuine UK wholesale stock. MagSafe Charging Case (USB-C) with built-in speaker and lanyard loop. Active Noise Cancellation.',
    specs: {
      'Chip': 'Apple H2 Headphone chip',
      'Charging Case': 'MagSafe USB-C',
      'Noise Cancellation': 'Active Noise Cancellation & Transparency Mode',
      'Battery': 'Up to 6 hours listening time'
    },
    isHotDeal: true,
    warrantyDays: 365
  }
];

const INITIAL_CATEGORIES = [
  {
    id: 'mobile-phones',
    slug: 'mobile-phones',
    title: 'Mobile Phones',
    count: 350,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    description: 'iPhones, Samsung Galaxy, Google Pixel, and Xiaomi. Sealed, Grade A, B, and C.'
  },
  {
    id: 'tablets',
    slug: 'tablets',
    title: 'Tablets & iPads',
    count: 120,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    description: 'Apple iPads, iPad Pro, iPad Air, and Samsung Galaxy Tabs.'
  },
  {
    id: 'macbooks',
    slug: 'macbooks',
    title: 'MacBooks',
    count: 65,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    description: 'MacBook Pro M1/M2/M3 & MacBook Air. Factory Sealed and Certified Grade A/B.'
  },
  {
    id: 'laptops',
    slug: 'laptops',
    title: 'Laptops',
    count: 90,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    description: 'Dell XPS, Lenovo ThinkPad, HP Spectre, and Asus gaming laptops.'
  },
  {
    id: 'smartwatches',
    slug: 'smartwatches',
    title: 'Smartwatches',
    count: 95,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    description: 'Apple Watch Series & Ultra, Samsung Galaxy Watches. Inspected glass & housing.'
  },
  {
    id: 'gaming-consoles',
    slug: 'gaming-consoles',
    title: 'Gaming Consoles',
    count: 60,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    description: 'PlayStation 5, Xbox Series X/S, Nintendo Switch. Sealed UK stock.'
  },
  {
    id: 'accessories',
    slug: 'accessories',
    title: 'Accessories',
    count: 450,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    description: 'AirPods, OEM fast chargers, cables, and bulk trade accessory bundles.'
  }
];

// Initialize DB files
export const initDB = () => {
  if (!fs.existsSync(PRODUCTS_FILE)) {
    saveJSON(PRODUCTS_FILE, INITIAL_PRODUCTS);
  }
  if (!fs.existsSync(CATEGORIES_FILE)) {
    saveJSON(CATEGORIES_FILE, INITIAL_CATEGORIES);
  }
  if (!fs.existsSync(USERS_FILE)) {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'AdminPass123!';
    const passwordHash = bcrypt.hashSync(defaultPassword, 10);
    const defaultAdmin = [
      {
        id: 'user-admin-01',
        email: process.env.ADMIN_EMAIL || 'admin@mobileswholesale.co.uk',
        passwordHash,
        name: 'Mobiles Wholesale Admin',
        role: 'SUPER_ADMIN',
        createdAt: new Date().toISOString()
      }
    ];
    saveJSON(USERS_FILE, defaultAdmin);
  }
};

initDB();

// Database Interface Helpers
export const db = {
  // Products
  getProducts: () => loadJSON(PRODUCTS_FILE, INITIAL_PRODUCTS),
  
  getProductById: (id) => {
    const products = loadJSON(PRODUCTS_FILE, INITIAL_PRODUCTS);
    return products.find((p) => p.id === id);
  },

  addProduct: (productData) => {
    const products = loadJSON(PRODUCTS_FILE, INITIAL_PRODUCTS);
    const id = `prod-${Date.now()}`;
    const newProduct = {
      id,
      sku: productData.sku || `MW-${Date.now()}`,
      name: productData.name,
      brand: productData.brand || 'Other',
      category: productData.category || 'mobile-phones',
      model: productData.model || productData.name,
      storage: productData.storage || '',
      colour: productData.colour || productData.color || '',
      color: productData.color || productData.colour || '',
      network: productData.network || 'Unlocked',
      condition: productData.condition || 'PhoneCheck Inspected',
      grade: productData.grade || 'Grade A',
      priceGBP: parseFloat(productData.priceGBP || productData.price || 0),
      price: parseFloat(productData.price || productData.priceGBP || 0),
      vatType: productData.vatType || 'Margin VAT',
      moq: parseInt(productData.moq || 1, 10),
      quantity: parseInt(productData.quantity || productData.stockQty || 1, 10),
      stockQty: parseInt(productData.stockQty || productData.quantity || 1, 10),
      availability: productData.availability || 'In Stock',
      inStock: productData.inStock !== undefined ? Boolean(productData.inStock) : (parseInt(productData.quantity || 1, 10) > 0),
      image: productData.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      description: productData.description || '',
      specs: productData.specs || {},
      isHotDeal: Boolean(productData.isHotDeal),
      warrantyDays: parseInt(productData.warrantyDays || 90, 10),
      createdAt: new Date().toISOString()
    };

    products.unshift(newProduct);
    saveJSON(PRODUCTS_FILE, products);
    return newProduct;
  },

  updateProduct: (id, updates) => {
    const products = loadJSON(PRODUCTS_FILE, INITIAL_PRODUCTS);
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const existing = products[index];
    const qty = updates.quantity !== undefined ? parseInt(updates.quantity, 10) : (updates.stockQty !== undefined ? parseInt(updates.stockQty, 10) : existing.quantity);
    const price = updates.priceGBP !== undefined ? parseFloat(updates.priceGBP) : (updates.price !== undefined ? parseFloat(updates.price) : existing.priceGBP);

    const updated = {
      ...existing,
      ...updates,
      priceGBP: price,
      price: price,
      quantity: qty,
      stockQty: qty,
      inStock: updates.inStock !== undefined ? Boolean(updates.inStock) : (qty > 0 && updates.availability !== 'Out of Stock'),
      updatedAt: new Date().toISOString()
    };

    products[index] = updated;
    saveJSON(PRODUCTS_FILE, products);
    return updated;
  },

  deleteProduct: (id) => {
    const products = loadJSON(PRODUCTS_FILE, INITIAL_PRODUCTS);
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;
    saveJSON(PRODUCTS_FILE, filtered);
    return true;
  },

  // Categories
  getCategories: () => loadJSON(CATEGORIES_FILE, INITIAL_CATEGORIES),

  addCategory: (catData) => {
    const categories = loadJSON(CATEGORIES_FILE, INITIAL_CATEGORIES);
    const id = catData.id || catData.slug || catData.title.toLowerCase().replace(/\s+/g, '-');
    const newCategory = {
      id,
      slug: id,
      title: catData.title,
      count: parseInt(catData.count || 0, 10),
      image: catData.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      description: catData.description || ''
    };

    categories.push(newCategory);
    saveJSON(CATEGORIES_FILE, categories);
    return newCategory;
  },

  updateCategory: (id, updates) => {
    const categories = loadJSON(CATEGORIES_FILE, INITIAL_CATEGORIES);
    const index = categories.findIndex((c) => c.id === id || c.slug === id);
    if (index === -1) return null;

    const updated = {
      ...categories[index],
      ...updates
    };

    categories[index] = updated;
    saveJSON(CATEGORIES_FILE, categories);
    return updated;
  },

  deleteCategory: (id) => {
    const categories = loadJSON(CATEGORIES_FILE, INITIAL_CATEGORIES);
    const filtered = categories.filter((c) => c.id !== id && c.slug !== id);
    if (filtered.length === categories.length) return false;
    saveJSON(CATEGORIES_FILE, filtered);
    return true;
  },

  // Users
  findUserByEmail: (email) => {
    const users = loadJSON(USERS_FILE, []);
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }
};
