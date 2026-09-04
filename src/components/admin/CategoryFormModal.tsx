import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { CategoryItem } from '../../context/ProductContext';
import { Button } from '../common/Button';

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (catData: Partial<CategoryItem>) => Promise<void>;
  editingCategory?: CategoryItem | null;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingCategory
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<CategoryItem>>({
    title: '',
    slug: '',
    count: '' as any,
    image: '',
    description: ''
  });

  useEffect(() => {
    if (editingCategory) {
      setForm(editingCategory);
    } else {
      setForm({
        title: '',
        slug: '',
        count: '' as any,
        image: '',
        description: ''
      });
    }
  }, [editingCategory, isOpen]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const slug = form.slug || form.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || `cat-${Date.now()}`;

    try {
      await onSubmit({
        ...form,
        id: editingCategory ? editingCategory.id : slug,
        slug,
        count: Number(form.count || 0)
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header - Fixed at Top */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 shrink-0 bg-white z-10">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {editingCategory ? 'Edit Stock Category' : 'Create New Category'}
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-0.5">
              {editingCategory ? `Edit: ${editingCategory.title}` : 'Add New Category'}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 overflow-y-auto overscroll-contain scroll-smooth flex-1 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Category Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Audio & Headphones"
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                  setForm({ ...form, title, slug: editingCategory ? form.slug : slug });
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Category Slug / ID</label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Estimated Unit Count</label>
              <input
                type="number"
                min="0"
                value={form.count ?? ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setForm({ ...form, count: (val === '' ? '' : (parseInt(val) || 0)) as any });
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Banner Image URL</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Category Description</label>
              <textarea
                rows={3}
                placeholder="Short description of products in this category..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Footer Actions - Fixed at Bottom */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0 bg-slate-50 z-10">
            <Button variant="outline" size="md" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" disabled={loading} icon={<Save className="w-4 h-4" />}>
              {loading ? 'Saving...' : (editingCategory ? 'Update Category' : 'Create Category')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
