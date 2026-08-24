import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Grid, 
  List, 
  X,
  SlidersHorizontal,
  Download,
  Filter,
  CheckCircle2,
  Package,
  FileSpreadsheet
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/product/ProductCard';
import { EnquiryModal } from '../components/product/EnquiryModal';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';
import { Product, StockFilterState, Category, Brand, DeviceGrade, AvailabilityStatus, VATType } from '../types';
import { createWhatsAppProductUrl, createWhatsAppGeneralUrl } from '../utils/whatsapp';

export const Stock: React.FC = () => {
  const { products } = useProducts();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = (searchParams.get('category') as Category) || 'all';

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [rowQuantities, setRowQuantities] = useState<Record<string, number>>({});

  const getRowQty = (productId: string, defaultMoq: number) => rowQuantities[productId] ?? defaultMoq;
  const setRowQty = (productId: string, qty: number, minMoq: number) => {
    setRowQuantities(prev => ({ ...prev, [productId]: Math.max(minMoq, qty) }));
  };

  const [filters, setFilters] = useState<StockFilterState>({
    search: '',
    category: initialCategory,
    brand: 'all',
    grade: 'all',
    availability: 'all',
    vatType: 'all',
    minPrice: 0,
    maxPrice: 2000,
    inStockOnly: false,
    sortBy: 'price-asc'
  });

  const categories: { label: string; value: Category | 'all' }[] = [
    { label: t('stockPage.allCategories', 'All Categories'), value: 'all' },
    { label: t('categories.smartphones', 'Mobile Phones'), value: 'mobile-phones' },
    { label: t('categories.tablets', 'Tablets & iPads'), value: 'tablets' },
    { label: t('categories.macbooks', 'MacBooks'), value: 'macbooks' },
    { label: 'Laptops', value: 'laptops' },
    { label: 'Smartwatches', value: 'smartwatches' },
    { label: t('categories.consoles', 'Gaming Consoles'), value: 'gaming-consoles' },
    { label: 'Accessories', value: 'accessories' },
  ];

  const brands: { label: string; value: Brand | 'all' }[] = [
    { label: t('stockPage.allBrands', 'All Brands'), value: 'all' },
    { label: 'Apple', value: 'Apple' },
    { label: 'Samsung', value: 'Samsung' },
    { label: 'Google', value: 'Google' },
    { label: 'Sony', value: 'Sony' },
    { label: 'Dell', value: 'Dell' },
    { label: 'Lenovo', value: 'Lenovo' },
    { label: 'Nintendo', value: 'Nintendo' },
  ];

  const grades: { label: string; value: DeviceGrade | 'all' }[] = [
    { label: t('stockPage.allGrades', 'All Grades'), value: 'all' },
    { label: t('grading.gradeNew', 'Brand New Sealed'), value: 'Brand New Sealed' },
    { label: t('grading.gradeA', 'Refurbished Grade A+'), value: 'Refurbished Grade A+' },
    { label: t('grading.gradeA', 'Grade A'), value: 'Grade A' },
    { label: t('grading.gradeB', 'Grade B'), value: 'Grade B' },
    { label: t('grading.gradeC', 'Grade C'), value: 'Grade C' },
  ];

  const availabilityOptions: { label: string; value: AvailabilityStatus | 'all' }[] = [
    { label: 'All Availability', value: 'all' },
    { label: 'In Stock', value: 'In Stock' },
    { label: 'Low Stock', value: 'Low Stock' },
    { label: 'Pre-Order', value: 'Pre-Order' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search term filter
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesModel = product.model.toLowerCase().includes(query);
        const matchesStorage = product.storage?.toLowerCase().includes(query) || false;
        const matchesNetwork = product.network?.toLowerCase().includes(query) || false;
        if (!matchesName && !matchesSku && !matchesBrand && !matchesModel && !matchesStorage && !matchesNetwork) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) return false;

      // Brand filter
      if (filters.brand !== 'all' && product.brand !== filters.brand) return false;

      // Grade filter
      if (filters.grade !== 'all' && product.grade !== filters.grade) return false;

      // Availability filter
      if (filters.availability !== 'all' && product.availability !== filters.availability) return false;

      // VAT Type filter
      if (filters.vatType !== 'all' && product.vatType !== filters.vatType) return false;

      // In Stock filter
      if (filters.inStockOnly && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.priceGBP - b.priceGBP;
      if (filters.sortBy === 'price-desc') return b.priceGBP - a.priceGBP;
      if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (filters.sortBy === 'stock-desc') return b.stockQty - a.stockQty;
      return 0;
    });
  }, [filters]);

  const handleEnquire = (product: Product) => {
    setSelectedProduct(product);
    setIsEnquiryOpen(true);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      brand: 'all',
      grade: 'all',
      availability: 'all',
      vatType: 'all',
      minPrice: 0,
      maxPrice: 2000,
      inStockOnly: false,
      sortBy: 'price-asc'
    });
    setSearchParams({});
  };

  const handleExportCSV = () => {
    const headers = ['SKU', 'Name', 'Brand', 'Category', 'Grade', 'Storage', 'Colour', 'Network', 'Trade Price (GBP)', 'VAT Scheme', 'MOQ', 'Stock Level', 'Availability'];
    const rows = filteredProducts.map(p => [
      `"${p.sku}"`,
      `"${p.name}"`,
      `"${p.brand}"`,
      `"${p.category}"`,
      `"${p.grade}"`,
      `"${p.storage || 'N/A'}"`,
      `"${p.colour || 'N/A'}"`,
      `"${p.network || 'N/A'}"`,
      p.priceGBP,
      `"${p.vatType}"`,
      p.moq,
      p.stockQty,
      `"${p.availability}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mobiles_wholesale_stock_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeFiltersCount = [
    filters.search,
    filters.category !== 'all',
    filters.brand !== 'all',
    filters.grade !== 'all',
    filters.availability !== 'all',
    filters.vatType !== 'all'
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. PAGE HEADER */}
      {/* 1. HERO STOCK HEADER */}
      <div className="bg-white text-[#101A18] rounded-2xl p-6 sm:p-8 border border-[#D8E2DE] shadow-md relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#E5F3EF] text-[#071715] text-xs font-mono font-bold px-2.5 py-1 rounded border border-[#D4AF62]">
                UK WAREHOUSE LIVE INVENTORY
              </span>
              <span className="bg-[#FAF8F2] text-[#596662] text-xs font-semibold px-2.5 py-1 rounded border border-[#D8E2DE]">
                {filteredProducts.length} {t('common.units', 'Lots')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#071715]">
              {t('stockPage.title', 'Wholesale Stock Catalogue')}
            </h1>
            <p className="text-[#596662] text-xs sm:text-sm mt-1 max-w-2xl">
              {t('stockPage.subtitle', 'Real-time UK wholesale inventory of mobile phones, tablets, MacBooks, laptops, smartwatches, consoles, and accessories.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={<Download className="w-4 h-4 text-[#007A68]" />}
              onClick={handleExportCSV}
            >
              {t('stockPage.exportCSV', 'Export CSV Stock List')}
            </Button>

            <a href={createWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
              <Button
                variant="whatsapp"
                size="sm"
                icon={<WhatsAppIcon className="w-4 h-4" />}
              >
                {t('common.whatsappTradeDesk', 'Order on WhatsApp')}
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* 2. FILTER & SEARCH CONTROL TOOLBAR */}
      <div className="bg-white rounded-2xl border border-[#D8E2DE] p-5 b2b-card-shadow space-y-4">
        {/* Row 1: Search Bar + Sort + View Toggles */}
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#596662] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={t('stockPage.searchPlaceholder', 'Search by SKU, Model (e.g. iPhone 15, S24 Ultra, MacBook, PS5, Pixel)...')}
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F2] border border-[#D8E2DE] rounded-xl text-sm focus:ring-2 focus:ring-[#071715] focus:bg-white focus:outline-none"
            />
            {filters.search && (
              <button
                onClick={() => setFilters({ ...filters, search: '' })}
                className="absolute right-3 top-3 text-[#596662] hover:text-[#071715]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <span className="text-xs font-semibold text-[#596662] whitespace-nowrap">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="px-3 py-2 bg-[#FAF8F2] border border-[#D8E2DE] rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#071715]"
            >
              <option value="price-asc">Trade Price: Low to High</option>
              <option value="price-desc">Trade Price: High to Low</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
              <option value="stock-desc">Highest Stock Quantity</option>
            </select>

            {/* View Mode Toggle (Grid vs Table) */}
            <div className="flex items-center bg-[#FAF8F2] p-1 rounded-xl border border-[#D8E2DE] ml-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-[#071715] shadow-xs font-bold border border-[#D4AF62]' : 'text-[#596662] hover:text-[#071715]'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                  viewMode === 'table' ? 'bg-white text-[#071715] shadow-xs font-bold border border-[#D4AF62]' : 'text-[#596662] hover:text-[#071715]'
                }`}
                title="Table View (Bulk Scanning)"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden p-2 bg-[#071715] text-white rounded-xl flex items-center gap-1.5 text-xs font-bold"
            >
              <Filter className="w-4 h-4 text-[#D4AF62]" />
              <span>Filter {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>
          </div>
        </div>

        {/* Row 2: Desktop Filter Select Dropdowns */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-3 pt-2 border-t border-[#D8E2DE] text-xs">
          {/* Category Filter */}
          <div>
            <label className="block text-[#596662] font-semibold mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value as any })}
              className="w-full px-2.5 py-1.5 bg-[#FAF8F2] border border-[#D8E2DE] rounded-lg focus:ring-2 focus:ring-[#071715]"
            >
              {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-[#596662] font-semibold mb-1">Brand</label>
            <select
              value={filters.brand}
              onChange={(e) => setFilters({ ...filters, brand: e.target.value as any })}
              className="w-full px-2.5 py-1.5 bg-[#FAF8F2] border border-[#D8E2DE] rounded-lg focus:ring-2 focus:ring-[#071715]"
            >
              {brands.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>

          {/* Device Grade Filter */}
          <div>
            <label className="block text-[#596662] font-semibold mb-1">Device Grade</label>
            <select
              value={filters.grade}
              onChange={(e) => setFilters({ ...filters, grade: e.target.value as any })}
              className="w-full px-2.5 py-1.5 bg-[#FAF8F2] border border-[#D8E2DE] rounded-lg focus:ring-2 focus:ring-[#071715]"
            >
              {grades.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-[#596662] font-semibold mb-1">Availability</label>
            <select
              value={filters.availability}
              onChange={(e) => setFilters({ ...filters, availability: e.target.value as any })}
              className="w-full px-2.5 py-1.5 bg-[#FAF8F2] border border-[#D8E2DE] rounded-lg focus:ring-2 focus:ring-[#071715]"
            >
              {availabilityOptions.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </div>

          {/* VAT Scheme Filter */}
          <div>
            <label className="block text-[#596662] font-semibold mb-1">VAT Scheme</label>
            <select
              value={filters.vatType}
              onChange={(e) => setFilters({ ...filters, vatType: e.target.value as any })}
              className="w-full px-2.5 py-1.5 bg-[#FAF8F2] border border-[#D8E2DE] rounded-lg focus:ring-2 focus:ring-[#071715]"
            >
              <option value="all">All VAT Schemes</option>
              <option value="Margin VAT">Margin Scheme VAT</option>
              <option value="Standard 20% VAT">Standard 20% VAT</option>
            </select>
          </div>
        </div>

        {/* Mobile Expandable Filter Drawer */}
        {mobileFiltersOpen && (
          <div className="lg:hidden pt-3 border-t border-[#D8E2DE] grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[#596662] font-semibold mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value as any })}
                className="w-full px-2.5 py-1.5 bg-[#FAF8F2] border border-[#D8E2DE] rounded-lg"
              >
                {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[#596662] font-semibold mb-1">Brand</label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value as any })}
                className="w-full px-2.5 py-1.5 bg-[#FAF8F2] border border-[#D8E2DE] rounded-lg"
              >
                {brands.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[#596662] font-semibold mb-1">Grade</label>
              <select
                value={filters.grade}
                onChange={(e) => setFilters({ ...filters, grade: e.target.value as any })}
                className="w-full px-2.5 py-1.5 bg-[#FAF8F2] border border-[#D8E2DE] rounded-lg"
              >
                {grades.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[#596662] font-semibold mb-1">Availability</label>
              <select
                value={filters.availability}
                onChange={(e) => setFilters({ ...filters, availability: e.target.value as any })}
                className="w-full px-2.5 py-1.5 bg-[#FAF8F2] border border-[#D8E2DE] rounded-lg"
              >
                {availabilityOptions.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Clear Filters Indicator Bar */}
        {activeFiltersCount > 0 && (
          <div className="pt-2 flex items-center justify-between text-xs text-[#596662] border-t border-[#D8E2DE]">
            <span>Showing filtered results ({filteredProducts.length} lots found)</span>
            <button
              onClick={handleResetFilters}
              className="text-[#071715] hover:underline font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5 text-[#00A88F]" /> Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* 3. PRODUCT CATALOGUE DISPLAY */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#D8E2DE] p-12 text-center space-y-4 b2b-card-shadow">
          <div className="w-12 h-12 bg-[#FAF8F2] text-[#596662] rounded-full flex items-center justify-center mx-auto">
            <Search className="w-6 h-6 text-[#00A88F]" />
          </div>
          <h3 className="text-lg font-bold text-[#071715]">{t('stockPage.noResultsTitle', 'No Stock Items Found')}</h3>
          <p className="text-sm text-[#596662] max-w-md mx-auto">
            {t('stockPage.noResultsDesc', 'Try adjusting your search criteria or filters to see more live warehouse inventory.')}
          </p>
          <Button variant="outline" size="sm" onClick={handleResetFilters}>
            {t('buttons.clearFilters', 'Clear Filters')}
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        /* RESPONSIVE GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEnquire={handleEnquire}
            />
          ))}
        </div>
      ) : (
        /* TABLE VIEW FOR BULK LOT SCANNING */
        <div className="bg-white rounded-2xl border border-[#D8E2DE] overflow-hidden b2b-card-shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#E5F3EF] text-[#071715] border-b border-[#D8E2DE] uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Item & Model</th>
                  <th className="py-3.5 px-4">SKU</th>
                  <th className="py-3.5 px-4">Grade</th>
                  <th className="py-3.5 px-4">Spec / Storage</th>
                  <th className="py-3.5 px-4">Network</th>
                  <th className="py-3.5 px-4">Availability</th>
                  <th className="py-3.5 px-4 text-center">Desired Qty</th>
                  <th className="py-3.5 px-4 text-center">Trade Quote</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8E2DE] text-[#101A18] font-medium">
                {filteredProducts.map((p) => {
                  const currentQty = getRowQty(p.id, p.moq || 1);
                  return (
                    <tr key={p.id} className="hover:bg-[#FAF8F2] transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-9 h-9 object-cover rounded bg-[#FAF8F2] shrink-0" />
                        <div>
                          <Link to={`/product/${p.id}`} className="font-bold text-[#101A18] hover:text-[#071715] line-clamp-1">
                            {p.name}
                          </Link>
                          <span className="text-[10px] text-[#596662]">{p.brand}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-[#596662]">{p.sku}</td>
                      <td className="py-3 px-4"><Badge type="grade" grade={p.grade} /></td>
                      <td className="py-3 px-4 font-semibold">{p.storage || 'N/A'}</td>
                      <td className="py-3 px-4 text-[11px] text-[#596662]">{p.network || 'Unlocked'}</td>
                      <td className="py-3 px-4"><Badge type="stock" inStock={p.inStock} stockQty={p.stockQty} /></td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => setRowQty(p.id, currentQty - 1, p.moq || 1)}
                            disabled={currentQty <= (p.moq || 1)}
                            className="w-5 h-5 rounded bg-[#FAF8F2] border border-[#D8E2DE] text-[#101A18] font-bold disabled:opacity-30 text-[10px] flex items-center justify-center"
                            title="Decrease quantity"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min={p.moq || 1}
                            value={currentQty}
                            onChange={(e) => setRowQty(p.id, parseInt(e.target.value) || (p.moq || 1), p.moq || 1)}
                            className="w-10 text-center font-bold text-[#101A18] bg-white border border-[#D8E2DE] rounded py-0.5 text-[11px]"
                          />
                          <button
                            type="button"
                            onClick={() => setRowQty(p.id, currentQty + 1, p.moq || 1)}
                            className="w-5 h-5 rounded bg-[#FAF8F2] border border-[#D8E2DE] text-[#101A18] font-bold text-[10px] flex items-center justify-center"
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <a
                          href={createWhatsAppProductUrl(p, currentQty)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00A88F] hover:underline"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                          Ask Price ({currentQty}u)
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <Link
                            to={`/product/${p.id}`}
                            className="px-2.5 py-1 rounded border border-[#D8E2DE] hover:bg-[#FAF8F2] text-[#101A18] font-semibold text-[11px]"
                          >
                            View Details
                          </Link>
                          <a
                            href={createWhatsAppProductUrl(p, currentQty)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded bg-[#071715] hover:bg-[#063F35] text-white font-semibold flex items-center gap-1 text-[11px]"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 text-[#00A88F]" /> WhatsApp ({currentQty}u)
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enquiry Quote Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};
