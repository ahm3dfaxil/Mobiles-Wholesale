import React, { useState, useEffect } from 'react';
import { X, Upload, Sparkles, Plus, Trash2, Image as ImageIcon, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product, Brand, Category, DeviceGrade, VATType, AvailabilityStatus } from '../../types';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: Partial<Product>) => Promise<void>;
  editingProduct?: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingProduct
}) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Product>>({
    sku: '',
    name: '',
    brand: 'Apple',
    category: 'mobile-phones',
    model: '',
    storage: '128GB',
    colour: 'Black',
    color: 'Black',
    network: 'Unlocked to all networks',
    condition: 'PhoneCheck Certified',
    grade: 'Grade A',
    priceGBP: 500,
    vatType: 'Margin VAT',
    moq: 5,
    quantity: 20,
    stockQty: 20,
    availability: 'In Stock',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    description: '',
    specs: { 'Display': '6.1-inch OLED', 'Processor': 'Bionic Chip' },
    isHotDeal: false,
    warrantyDays: 90
  });

  const [specsList, setSpecsList] = useState<{ key: string; value: string }[]>([]);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        ...editingProduct,
        colour: editingProduct.colour || editingProduct.color || '',
        color: editingProduct.color || editingProduct.colour || ''
      });
      if (editingProduct.specs) {
        setSpecsList(
          Object.entries(editingProduct.specs).map(([key, value]) => ({ key, value }))
        );
      } else {
        setSpecsList([]);
      }
    } else {
      setForm({
        sku: `MW-${Date.now().toString().slice(-6)}`,
        name: '',
        brand: 'Apple',
        category: 'mobile-phones',
        model: '',
        storage: '128GB',
        colour: 'Black',
        color: 'Black',
        network: 'Unlocked',
        condition: 'PhoneCheck Certified 60-Point Passed',
        grade: 'Grade A',
        priceGBP: 450,
        vatType: 'Margin VAT',
        moq: 5,
        quantity: 25,
        stockQty: 25,
        availability: 'In Stock',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
        description: 'Pristine wholesale stock tested with PhoneCheck 60-point automated software diagnostic.',
        specs: { 'Display': 'Super Retina OLED', 'Battery Health': '88%+ Guaranteed' },
        isHotDeal: false,
        warrantyDays: 90
      });
      setSpecsList([
        { key: 'Display', value: 'Super Retina OLED' },
        { key: 'Battery Health', value: '88%+ Guaranteed' }
      ]);
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers,
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.success && data.imageUrl) {
        setForm(prev => ({ ...prev, image: data.imageUrl }));
      } else {
        // Fallback: Read Data URL for client side display
        const reader = new FileReader();
        reader.onload = (event) => {
          setForm(prev => ({ ...prev, image: event.target?.result as string }));
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm(prev => ({ ...prev, image: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddSpecRow = () => {
    setSpecsList(prev => [...prev, { key: '', value: '' }]);
  };

  const handleRemoveSpecRow = (index: number) => {
    setSpecsList(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', text: string) => {
    setSpecsList(prev => prev.map((item, idx) => idx === index ? { ...item, [field]: text } : item));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Reconstruct specs object
    const specsObj: Record<string, string> = {};
    specsList.forEach(item => {
      if (item.key.trim()) {
        specsObj[item.key.trim()] = item.value.trim();
      }
    });

    const payload: Partial<Product> = {
      ...form,
      priceGBP: Number(form.priceGBP || 0),
      price: Number(form.priceGBP || 0),
      quantity: Number(form.quantity || 0),
      stockQty: Number(form.quantity || 0),
      moq: Number(form.moq || 1),
      warrantyDays: Number(form.warrantyDays || 90),
      inStock: form.availability !== 'Out of Stock' && Number(form.quantity || 0) > 0,
      specs: specsObj
    };

    try {
      await onSubmit(payload);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error saving product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {editingProduct ? 'Edit Existing Inventory' : 'Add New Trade Inventory'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {editingProduct ? `Edit SKU: ${editingProduct.sku}` : 'Add New Product to Catalog'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">SKU Number *</label>
              <input
                type="text"
                required
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-800 mb-1">Full Product Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Apple iPhone 15 Pro Max 256GB - Natural Titanium"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Brand *</label>
              <select
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value as Brand })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Google">Google</option>
                <option value="Sony">Sony</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Dell">Dell</option>
                <option value="Lenovo">Lenovo</option>
                <option value="Nintendo">Nintendo</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="mobile-phones">Mobile Phones</option>
                <option value="tablets">Tablets & iPads</option>
                <option value="macbooks">MacBooks</option>
                <option value="laptops">Laptops</option>
                <option value="smartwatches">Smartwatches</option>
                <option value="gaming-consoles">Gaming Consoles</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Grade *</label>
              <select
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value as DeviceGrade })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Brand New Sealed">Brand New Sealed</option>
                <option value="Refurbished Grade A+">Refurbished Grade A+</option>
                <option value="Grade A">Grade A</option>
                <option value="Grade B">Grade B</option>
                <option value="Grade C">Grade C</option>
                <option value="Clearance / As Is">Clearance / As Is</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">VAT Scheme *</label>
              <select
                value={form.vatType}
                onChange={(e) => setForm({ ...form, vatType: e.target.value as VATType })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Margin VAT">Margin VAT</option>
                <option value="Standard 20% VAT">Standard 20% VAT</option>
                <option value="Zero Rated (Export)">Zero Rated (Export)</option>
              </select>
            </div>
          </div>

          {/* Pricing & Quantities */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Trade Price (£) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={form.priceGBP}
                onChange={(e) => setForm({ ...form, priceGBP: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Stock Quantity *</label>
              <input
                type="number"
                min="0"
                required
                value={form.quantity}
                onChange={(e) => {
                  const q = parseInt(e.target.value) || 0;
                  setForm({
                    ...form,
                    quantity: q,
                    stockQty: q,
                    availability: q === 0 ? 'Out of Stock' : (q < 5 ? 'Low Stock' : 'In Stock')
                  });
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Availability Status *</label>
              <select
                value={form.availability}
                onChange={(e) => setForm({ ...form, availability: e.target.value as AvailabilityStatus })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Pre-Order">Pre-Order</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">MOQ (Min Order Qty)</label>
              <input
                type="number"
                min="1"
                value={form.moq}
                onChange={(e) => setForm({ ...form, moq: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Model, Storage, Color, Warranty, Hot Deal */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Model Name</label>
              <input
                type="text"
                placeholder="e.g. iPhone 15 Pro Max"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Storage Capacity</label>
              <input
                type="text"
                placeholder="e.g. 256GB"
                value={form.storage}
                onChange={(e) => setForm({ ...form, storage: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Colour</label>
              <input
                type="text"
                placeholder="e.g. Natural Titanium"
                value={form.colour}
                onChange={(e) => setForm({ ...form, colour: e.target.value, color: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Warranty (Days)</label>
              <input
                type="number"
                value={form.warrantyDays}
                onChange={(e) => setForm({ ...form, warrantyDays: parseInt(e.target.value) || 90 })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Image URL & Image File Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Product Image URL or File Upload</label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
              />
              <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-300 flex items-center gap-1.5 shrink-0 transition-colors">
                <Upload className="w-4 h-4" />
                <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageFileUpload} />
              </label>
            </div>
            {form.image && (
              <div className="mt-2 flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200 w-fit">
                <img src={form.image} alt="Preview" className="w-10 h-10 rounded object-cover border border-slate-200" />
                <span className="text-[11px] text-slate-500 font-mono truncate max-w-xs">{form.image}</span>
              </div>
            )}
          </div>

          {/* Featured Hot Deal Toggle */}
          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              id="isHotDeal"
              checked={form.isHotDeal || false}
              onChange={(e) => setForm({ ...form, isHotDeal: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <label htmlFor="isHotDeal" className="text-xs font-bold text-slate-900 flex items-center gap-1.5 cursor-pointer">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Feature as Hot Deal on Homepage & Stock Catalog
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Product Description</label>
            <textarea
              rows={3}
              placeholder="Detailed wholesale product description..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Key-Value Specifications Editor */}
          <div className="space-y-2 border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800">Key Specifications</label>
              <button
                type="button"
                onClick={handleAddSpecRow}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Spec Line
              </button>
            </div>

            {specsList.map((spec, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Feature (e.g. Display)"
                  value={spec.key}
                  onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                  className="w-1/3 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold"
                />
                <input
                  type="text"
                  placeholder="Detail (e.g. 6.7 OLED 120Hz)"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpecRow(idx)}
                  className="p-1 text-slate-400 hover:text-red-600 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <Button variant="outline" size="md" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" disabled={loading} icon={<Save className="w-4 h-4" />}>
              {loading ? 'Saving Inventory...' : (editingProduct ? 'Update Product' : 'Add Product to Inventory')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
