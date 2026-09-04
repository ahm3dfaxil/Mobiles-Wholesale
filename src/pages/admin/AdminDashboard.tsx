import React, { useState } from 'react';
import { 
  ShieldCheck, 
  LogOut, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Package, 
  Coins, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  BarChart3, 
  RefreshCw, 
  Eye, 
  X, 
  Filter, 
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  Building2,
  Tag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProducts, CategoryItem } from '../../context/ProductContext';
import { Product, DeviceGrade, AvailabilityStatus, Category } from '../../types';
import { Button } from '../../components/common/Button';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { CategoryFormModal } from '../../components/admin/CategoryFormModal';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { 
    products, 
    categories, 
    loading, 
    refreshProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    addCategory, 
    updateCategory, 
    deleteCategory 
  } = useProducts();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'batch'>('products');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);

  // Delete Confirmation State
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [deletingCatId, setDeletingCatId] = useState<string | null>(null);

  // Search & Filter State for Inventory
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');

  // Overview Stats
  const totalProducts = products.length;
  const totalStockUnits = products.reduce((acc, p) => acc + (p.quantity || p.stockQty || 0), 0);
  const totalInventoryValueGBP = products.reduce((acc, p) => acc + ((p.priceGBP || p.price || 0) * (p.quantity || p.stockQty || 0)), 0);
  const outOfStockCount = products.filter(p => !p.inStock || p.availability === 'Out of Stock' || (p.quantity || p.stockQty || 0) === 0).length;
  const hotDealsCount = products.filter(p => p.isHotDeal).length;

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = search === '' || 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.sku.toLowerCase().includes(search.toLowerCase()) || 
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.model?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesGrade = selectedGrade === 'all' || p.grade === selectedGrade;
    const matchesAvailability = selectedAvailability === 'all' || p.availability === selectedAvailability;

    return matchesSearch && matchesCategory && matchesGrade && matchesAvailability;
  });

  // Action Handlers
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (data: Partial<Product>) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
    } else {
      await addProduct(data);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setDeletingProductId(null);
    deleteProduct(id);
  };

  const handleQuickQtyChange = async (product: Product, delta: number) => {
    const current = product.quantity || product.stockQty || 0;
    const nextQty = Math.max(0, current + delta);
    const nextAvailability: AvailabilityStatus = nextQty === 0 ? 'Out of Stock' : (nextQty < 5 ? 'Low Stock' : 'In Stock');
    await updateProduct(product.id, {
      quantity: nextQty,
      stockQty: nextQty,
      availability: nextAvailability,
      inStock: nextQty > 0 && nextAvailability !== 'Out of Stock'
    });
  };

  const handleToggleOutOfStock = async (product: Product) => {
    const isOut = product.availability === 'Out of Stock' || !product.inStock;
    if (isOut) {
      await updateProduct(product.id, {
        availability: 'In Stock',
        inStock: true,
        quantity: product.quantity > 0 ? product.quantity : 10,
        stockQty: product.quantity > 0 ? product.quantity : 10
      });
    } else {
      await updateProduct(product.id, {
        availability: 'Out of Stock',
        inStock: false
      });
    }
  };

  const handleToggleHotDeal = async (product: Product) => {
    await updateProduct(product.id, {
      isHotDeal: !product.isHotDeal
    });
  };

  // Category Action Handlers
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (category: CategoryItem) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (data: Partial<CategoryItem>) => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, data);
    } else {
      await addCategory(data);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id);
    setDeletingCatId(null);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-900 font-sans pb-16">
      {/* Top Admin Navigation Bar */}
      <div className="bg-white border-b border-[#e6dfd1] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0a4d3c] rounded-xl flex items-center justify-center shadow shadow-[#0a4d3c]/20 text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#0a4d3c] uppercase tracking-widest block">
                Mobiles Wholesale UK
              </span>
              <h1 className="text-sm font-black text-stone-900 tracking-tight leading-none">
                Stock & Inventory Admin Console
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs bg-[#f4efe4] px-3 py-1.5 rounded-full border border-[#e6dfd1]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-stone-700 font-semibold">{user?.email || 'regenerateglobal@gmail.com'}</span>
              <span className="bg-[#f8f3e8] text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                {user?.role || 'SUPER_ADMIN'}
              </span>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-[#f4efe4] transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd1] pb-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-[#0a4d3c] text-white shadow-md shadow-[#0a4d3c]/20'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-[#f4efe4] border border-[#e6dfd1]'
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Overview Dashboard
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeTab === 'products'
                  ? 'bg-[#0a4d3c] text-white shadow-md shadow-[#0a4d3c]/20'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-[#f4efe4] border border-[#e6dfd1]'
              }`}
            >
              <Package className="w-4 h-4" /> Stock Inventory ({products.length})
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeTab === 'categories'
                  ? 'bg-[#0a4d3c] text-white shadow-md shadow-[#0a4d3c]/20'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-[#f4efe4] border border-[#e6dfd1]'
              }`}
            >
              <Layers className="w-4 h-4" /> Categories ({categories.length})
            </button>

            <button
              onClick={() => setActiveTab('batch')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeTab === 'batch'
                  ? 'bg-[#0a4d3c] text-white shadow-md shadow-[#0a4d3c]/20'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-[#f4efe4] border border-[#e6dfd1]'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" /> Quick Batch Updates
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => refreshProducts()}
              className="p-2 bg-white hover:bg-[#f4efe4] border border-[#e6dfd1] rounded-xl text-stone-700 font-bold flex items-center gap-1.5 transition-colors text-xs"
              title="Refresh inventory"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenAddProduct}
              icon={<Plus className="w-4 h-4" />}
              className="!bg-[#0a4d3c] hover:!bg-[#07382c] !text-white"
            >
              Add Product
            </Button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#e6dfd1] shadow-sm space-y-1">
                <div className="text-xs text-stone-500 font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>Unique SKUs</span>
                  <Package className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-stone-900">{totalProducts}</div>
                <div className="text-[11px] text-stone-500">Active catalog items</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#e6dfd1] shadow-sm space-y-1">
                <div className="text-xs text-stone-500 font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>Physical Units</span>
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-[#0a4d3c]">{totalStockUnits.toLocaleString()}</div>
                <div className="text-[11px] text-stone-500">Units in UK warehouse</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#e6dfd1] shadow-sm space-y-1">
                <div className="text-xs text-stone-500 font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>Pricing Mode</span>
                  <Coins className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-xl font-black text-[#0a4d3c]">WhatsApp Quote</div>
                <div className="text-[11px] text-stone-500">Price on Application (POA)</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#e6dfd1] shadow-sm space-y-1">
                <div className="text-xs text-stone-500 font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>Out of Stock</span>
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <div className="text-3xl font-black text-red-600">{outOfStockCount}</div>
                <div className="text-[11px] text-stone-500">Items requiring restock</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#e6dfd1] shadow-sm space-y-1">
                <div className="text-xs text-stone-500 font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>Featured Deals</span>
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-3xl font-black text-purple-700">{hotDealsCount}</div>
                <div className="text-[11px] text-stone-500">Featured on homepage</div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white rounded-2xl border border-[#e6dfd1] p-6 space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-stone-900">Quick Admin Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md" onClick={handleOpenAddProduct} icon={<Plus className="w-4 h-4" />} className="!bg-[#0a4d3c] hover:!bg-[#07382c] !text-white">
                  Add New Product SKU
                </Button>
                <Button variant="dark" size="md" onClick={handleOpenAddCategory} icon={<Layers className="w-4 h-4" />} className="!bg-slate-800 hover:!bg-slate-900 !text-white">
                  Create New Category
                </Button>
                <Button variant="outline" size="md" onClick={() => setActiveTab('products')} icon={<Package className="w-4 h-4" />}>
                  View All Products Table
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS INVENTORY TABLE */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Search & Filter Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-[#e6dfd1] space-y-3 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Search Bar */}
                <div className="relative sm:col-span-2">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search by SKU, Product Name, Brand, or Model..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#faf7f2] border border-[#d8cebe] rounded-xl text-xs text-stone-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} className="absolute right-3 top-2.5 text-slate-400 hover:text-stone-600">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#faf7f2] border border-[#d8cebe] rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">All Categories ({categories.length})</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.title}</option>
                    ))}
                  </select>
                </div>

                {/* Grade Filter */}
                <div>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full px-3 py-2 bg-[#faf7f2] border border-[#d8cebe] rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">All Grades</option>
                    <option value="Brand New Sealed">Brand New Sealed</option>
                    <option value="Refurbished Grade A+">Refurbished Grade A+</option>
                    <option value="Grade A">Grade A</option>
                    <option value="Grade B">Grade B</option>
                    <option value="Grade C">Grade C</option>
                    <option value="Clearance / As Is">Clearance / As Is</option>
                    <option value="Mixed Grades">Mixed Grades</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                <span>Showing <strong className="text-stone-900">{filteredProducts.length}</strong> of <strong className="text-stone-900">{products.length}</strong> products</span>
                {(search || selectedCategory !== 'all' || selectedGrade !== 'all' || selectedAvailability !== 'all') && (
                  <button
                    onClick={() => {
                      setSearch('');
                      setSelectedCategory('all');
                      setSelectedGrade('all');
                      setSelectedAvailability('all');
                    }}
                    className="text-[#0a4d3c] hover:underline font-semibold"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-2xl border border-[#e6dfd1] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-[#f4efe4] text-stone-700 uppercase text-[10px] font-extrabold tracking-wider border-b border-[#e6dfd1]">
                    <tr>
                      <th className="p-3.5">SKU & Item</th>
                      <th className="p-3.5">Brand / Category</th>
                      <th className="p-3.5">Grade / VAT</th>
                      <th className="p-3.5">Pricing</th>
                      <th className="p-3.5">Qty / Status</th>
                      <th className="p-3.5">Featured</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-medium">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-stone-500">
                          No inventory items match your current filter selection.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-[#faf7f2] transition-colors">
                          {/* SKU & Item Name */}
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-10 h-10 rounded-lg object-contain p-0.5 bg-[#f4efe4] border border-[#e6dfd1] shrink-0"
                              />
                              <div className="space-y-0.5 max-w-xs">
                                <span className="font-mono text-[10px] text-[#0a4d3c] font-bold block">{prod.sku}</span>
                                <span className="font-bold text-stone-900 leading-snug line-clamp-1" title={prod.name}>
                                  {prod.name}
                                </span>
                                {(prod.storage || prod.colour) && (
                                  <span className="text-[10px] text-stone-500 block">
                                    {prod.storage} • {prod.colour || prod.color}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Brand & Category */}
                          <td className="p-3.5">
                            <div className="space-y-0.5">
                              <span className="font-bold text-stone-900 block">{prod.brand}</span>
                              <span className="text-[11px] text-stone-500 capitalize">{prod.category.replace('-', ' ')}</span>
                            </div>
                          </td>

                          {/* Grade & VAT Scheme */}
                          <td className="p-3.5">
                            <div className="space-y-1">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold inline-block ${
                                prod.grade === 'Brand New Sealed' ? 'bg-[#f8f3e8] text-emerald-800 border border-[#d8c7a1]' :
                                prod.grade === 'Grade A' || prod.grade === 'Refurbished Grade A+' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                prod.grade === 'Grade B' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                                prod.grade === 'Mixed Grades' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                                'bg-orange-100 text-orange-800 border border-orange-200'
                              }`}>
                                {prod.grade}
                              </span>
                              <span className="text-[10px] text-stone-500 block">{prod.vatType}</span>
                            </div>
                          </td>

                          {/* Trade Price Column */}
                          <td className="p-3.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 whitespace-nowrap">
                              WhatsApp Quote
                            </span>
                          </td>

                          {/* Qty & Status with Quick Controls */}
                          <td className="p-3.5">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleQuickQtyChange(prod, -1)}
                                  className="w-5 h-5 bg-[#f4efe4] hover:bg-slate-200 border border-[#d8cebe] rounded text-stone-700 font-bold flex items-center justify-center text-xs"
                                  title="Decrease quantity"
                                >
                                  -
                                </button>
                                <span className="font-mono font-bold text-stone-900 px-1.5 text-xs">
                                  {prod.quantity || prod.stockQty || 0}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleQuickQtyChange(prod, 1)}
                                  className="w-5 h-5 bg-[#f4efe4] hover:bg-slate-200 border border-[#d8cebe] rounded text-stone-700 font-bold flex items-center justify-center text-xs"
                                  title="Increase quantity"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleToggleOutOfStock(prod)}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                                  prod.availability === 'Out of Stock' || !prod.inStock
                                    ? 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200'
                                    : 'bg-[#f8f3e8] text-emerald-800 border-[#d8c7a1] hover:bg-emerald-200'
                                }`}
                              >
                                {prod.availability === 'Out of Stock' || !prod.inStock ? 'Out of Stock' : prod.availability}
                              </button>
                            </div>
                          </td>

                          {/* Featured Hot Deal Toggle */}
                          <td className="p-3.5">
                            <button
                              type="button"
                              onClick={() => handleToggleHotDeal(prod)}
                              className={`p-1.5 rounded-lg border transition-all ${
                                prod.isHotDeal
                                  ? 'bg-amber-100 border-amber-300 text-amber-700'
                                  : 'bg-[#f4efe4] border-[#e6dfd1] text-slate-400 hover:text-stone-700'
                              }`}
                              title={prod.isHotDeal ? 'Featured as Hot Deal' : 'Click to feature on homepage'}
                            >
                              <Sparkles className="w-4 h-4" />
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEditProduct(prod)}
                                className="p-1.5 bg-[#f4efe4] hover:bg-blue-100 text-stone-600 hover:text-blue-700 rounded-lg border border-[#e6dfd1] transition-colors"
                                title="Edit Product"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => setDeletingProductId(prod.id)}
                                className="p-1.5 bg-[#f4efe4] hover:bg-red-100 text-stone-600 hover:text-red-700 rounded-lg border border-[#e6dfd1] transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#e6dfd1] shadow-sm">
              <div>
                <h3 className="text-base font-bold text-stone-900">Stock Categories ({categories.length})</h3>
                <p className="text-xs text-stone-500">Manage categories displayed on the public catalog and filter navigation.</p>
              </div>
              <Button variant="primary" size="sm" onClick={handleOpenAddCategory} icon={<Plus className="w-4 h-4" />} className="!bg-[#0a4d3c] hover:!bg-[#07382c] !text-white">
                Add Category
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-2xl border border-[#e6dfd1] p-4 flex flex-col justify-between space-y-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img src={cat.image} alt={cat.title} className="w-12 h-12 rounded-xl object-cover border border-[#e6dfd1]" />
                    <div>
                      <h4 className="font-extrabold text-stone-900 text-base">{cat.title}</h4>
                      <span className="text-[11px] font-mono text-[#0a4d3c]">Slug: {cat.slug}</span>
                      <p className="text-xs text-stone-500 mt-1">{cat.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#e6dfd1] text-xs text-stone-500">
                    <span>{cat.count} Items</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditCategory(cat)}
                        className="p-1.5 bg-[#f4efe4] hover:bg-blue-100 text-stone-600 hover:text-blue-700 rounded-lg border border-[#e6dfd1]"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingCatId(cat.id)}
                        className="p-1.5 bg-[#f4efe4] hover:bg-red-100 text-stone-600 hover:text-red-700 rounded-lg border border-[#e6dfd1]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: QUICK BATCH UPDATE GRID */}
        {activeTab === 'batch' && (
          <div className="bg-white rounded-2xl border border-[#e6dfd1] p-6 space-y-4 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-stone-900">Batch Stock & Pricing Editor</h3>
              <p className="text-xs text-stone-500">Quickly adjust prices, quantities, and availability for multiple items.</p>
            </div>

            <div className="space-y-3">
              {products.map((prod) => (
                <div key={prod.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#faf7f2] rounded-xl border border-[#e6dfd1] text-xs">
                  <div className="flex items-center gap-3">
                    <img src={prod.image} alt={prod.name} className="w-8 h-8 rounded object-cover border border-[#e6dfd1]" />
                    <div>
                      <span className="font-bold text-stone-900 block">{prod.name}</span>
                      <span className="font-mono text-[10px] text-[#0a4d3c]">{prod.sku} • {prod.grade}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-[10px] text-stone-500 block">Price (£)</span>
                      <input
                        type="number"
                        value={prod.priceGBP || prod.price || 0}
                        onChange={(e) => updateProduct(prod.id, { priceGBP: parseFloat(e.target.value) || 0 })}
                        className="w-20 px-2 py-1 bg-white border border-[#d8cebe] rounded text-xs font-bold text-stone-900"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 block">Quantity</span>
                      <input
                        type="number"
                        value={prod.quantity || prod.stockQty || 0}
                        onChange={(e) => {
                          const q = parseInt(e.target.value) || 0;
                          updateProduct(prod.id, {
                            quantity: q,
                            stockQty: q,
                            availability: q === 0 ? 'Out of Stock' : (q < 5 ? 'Low Stock' : 'In Stock')
                          });
                        }}
                        className="w-16 px-2 py-1 bg-white border border-[#d8cebe] rounded text-xs font-bold text-stone-900"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 block">Status</span>
                      <select
                        value={prod.availability}
                        onChange={(e) => updateProduct(prod.id, { availability: e.target.value as AvailabilityStatus })}
                        className="px-2 py-1 bg-white border border-[#d8cebe] rounded text-xs text-stone-900"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSubmit={handleSaveProduct}
        editingProduct={editingProduct}
      />

      {/* Category Form Modal */}
      <CategoryFormModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSubmit={handleSaveCategory}
        editingCategory={editingCategory}
      />

      {/* Product Delete Confirmation Modal */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#e6dfd1] max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-stone-900">Delete Product Item?</h4>
            <p className="text-xs text-stone-600">
              Are you sure you want to delete this product? This action will remove it permanently from the inventory database.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setDeletingProductId(null)}>
                Cancel
              </Button>
              <button
                onClick={() => handleDeleteProduct(deletingProductId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Delete Confirmation Modal */}
      {deletingCatId && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#e6dfd1] max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-stone-900">Delete Category?</h4>
            <p className="text-xs text-stone-600">
              Are you sure you want to delete this stock category?
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setDeletingCatId(null)}>
                Cancel
              </Button>
              <button
                onClick={() => handleDeleteCategory(deletingCatId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
