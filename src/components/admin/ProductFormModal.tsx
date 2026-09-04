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
    brand: '' as any,
    category: '' as any,
    model: '',
    storage: '',
    colour: '',
    color: '',
    network: '',
    condition: '',
    grade: '' as any,
    priceGBP: '' as any,
    vatType: '' as any,
    moq: '' as any,
    quantity: '' as any,
    stockQty: '' as any,
    availability: '' as any,
    inStock: true,
    image: '',
    description: '',
    specs: {},
    isHotDeal: false,
    warrantyDays: '' as any
  });

  const [specsList, setSpecsList] = useState<{ key: string; value: string }[]>([]);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        ...editingProduct,
        network: editingProduct.network ?? '',
        condition: editingProduct.condition ?? '',
        warrantyDays: editingProduct.warrantyDays ?? ('' as any),
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
        sku: '',
        name: '',
        brand: '' as any,
        category: '' as any,
        model: '',
        storage: '',
        colour: '',
        color: '',
        network: '',
        condition: '',
        grade: '' as any,
        priceGBP: '' as any,
        vatType: '' as any,
        moq: '' as any,
        quantity: '' as any,
        stockQty: '' as any,
        availability: '' as any,
        inStock: true,
        image: '',
        description: '',
        specs: {},
        isHotDeal: false,
        warrantyDays: '' as any
      });
      setSpecsList([]);
    }
  }, [editingProduct, isOpen]);

  // Prevent background page scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const compressImageFile = (file: File, maxWidth = 600, quality = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            // Process canvas pixels to normalize near-white & off-white background tints to pure white #FFFFFF
            const imgData = ctx.getImageData(0, 0, width, height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              if (r > 180 && g > 180 && b > 180 && Math.abs(r - g) < 20 && Math.abs(g - b) < 20) {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
              }
            }
            ctx.putImageData(imgData, 0, 0);
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(dataUrl);
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploadingImage(true);

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      if (cloudName && uploadPreset) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData
        });

        const data = await res.json();
        if (data.secure_url) {
          setForm(prev => ({ ...prev, image: data.secure_url }));
          setUploadingImage(false);
          return;
        }
      }

      // Fallback: Read & Compress Data URL for client-side storage
      const compressedUrl = await compressImageFile(file);
      setForm(prev => ({ ...prev, image: compressedUrl }));
    } catch (err) {
      try {
        const compressedUrl = await compressImageFile(file);
        setForm(prev => ({ ...prev, image: compressedUrl }));
      } catch (readErr) {
        console.warn('Image processing failed:', readErr);
      }
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

    const priceValue = Number(form.priceGBP ?? form.price ?? 0);

    const payload: Partial<Product> = {
      ...form,
      sku: form.sku?.trim() || '',
      priceGBP: priceValue,
      price: priceValue,
      quantity: Number(form.quantity || 0),
      stockQty: Number(form.quantity || 0),
      moq: Number(form.moq || 1),
      network: form.network?.trim() || '',
      condition: form.condition?.trim() || '',
      warrantyDays: form.warrantyDays !== undefined && form.warrantyDays !== null && form.warrantyDays !== ('' as any) && !isNaN(Number(form.warrantyDays)) ? Number(form.warrantyDays) : ('' as any),
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
    <div className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header - Fixed at Top */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 shrink-0 bg-white z-10">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {editingProduct ? 'Edit Existing Inventory' : 'Add New Trade Inventory'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {editingProduct ? `Edit Item: ${editingProduct.name}` : 'Add New Product to Catalog'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body with GPU Hardware Acceleration */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 overflow-y-auto overscroll-contain scroll-smooth will-change-transform transform-gpu flex-1 space-y-5">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Main Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">SKU Number (Optional)</label>
                <input
                  type="text"
                  placeholder="Optional SKU (e.g. MW-APL-128)"
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
                  value={form.brand || ''}
                  onChange={(e) => setForm({ ...form, brand: e.target.value as Brand })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">-- Select Brand --</option>
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
                  value={form.category || ''}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">-- Select Category --</option>
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
                <label className="block text-xs font-bold text-slate-800 mb-1">Grade</label>
                <select
                  value={form.grade || ''}
                  onChange={(e) => setForm({ ...form, grade: e.target.value as DeviceGrade })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">-- Select Grade --</option>
                  <option value="Brand New Sealed">Brand New Sealed</option>
                  <option value="Refurbished Grade A+">Refurbished Grade A+</option>
                  <option value="Grade A">Grade A</option>
                  <option value="Grade B">Grade B</option>
                  <option value="Grade C">Grade C</option>
                  <option value="Clearance / As Is">Clearance / As Is</option>
                  <option value="Mixed Grades">Mixed Grades</option>
                  <option value="N/A">N/A</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">VAT Scheme</label>
                <select
                  value={form.vatType || ''}
                  onChange={(e) => setForm({ ...form, vatType: e.target.value as VATType })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">-- Select VAT Scheme --</option>
                  <option value="Margin VAT">Margin VAT</option>
                  <option value="Standard 20% VAT">Standard 20% VAT</option>
                  <option value="Zero Rated (Export)">Zero Rated (Export)</option>
                  <option value="N/A">N/A</option>
                </select>
              </div>
            </div>

            {/* Quantities & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Stock Quantity *</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={form.quantity ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    const q = val === '' ? ('' as any) : Math.max(0, parseInt(val) || 0);
                    setForm({
                      ...form,
                      quantity: q,
                      stockQty: q,
                      availability: q === 0 ? 'Out of Stock' : (typeof q === 'number' && q < 5 ? 'Low Stock' : 'In Stock')
                    });
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Availability Status *</label>
                <select
                  value={form.availability || ''}
                  onChange={(e) => setForm({ ...form, availability: e.target.value as AvailabilityStatus })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">-- Select Availability --</option>
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
                  value={form.moq ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm({ ...form, moq: (val === '' ? '' : (parseInt(val) || 0)) as any });
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Model, Storage, Color, Network, Warranty */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
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
                <label className="block text-xs font-bold text-slate-800 mb-1">Network Status</label>
                <input
                  type="text"
                  placeholder="e.g. Unlocked"
                  value={form.network}
                  onChange={(e) => setForm({ ...form, network: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Warranty (Days)</label>
                <input
                  type="number"
                  value={form.warrantyDays ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm({ ...form, warrantyDays: (val === '' ? '' : (parseInt(val) || 0)) as any });
                  }}
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
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageFileUpload} />
                </label>
              </div>
              {form.image && (
                <div className="mt-2 flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 w-fit">
                  <img src={form.image} alt="Preview" className="w-10 h-10 rounded object-contain border border-slate-200 bg-white mix-blend-multiply" />
                  <span className="text-[11px] text-slate-500 font-mono truncate max-w-xs">{form.image}</span>
                </div>
              )}
            </div>

            {/* Featured Hot Deal Toggle */}
            <div className="flex items-center gap-3 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200">
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
          </div>

          {/* Footer Actions - Fixed at Bottom */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0 bg-slate-50 z-10">
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
