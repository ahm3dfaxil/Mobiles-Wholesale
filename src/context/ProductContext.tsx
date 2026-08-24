import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { MOCK_PRODUCTS, CATEGORY_INFO } from '../data/mockData';
import { useAuth } from './AuthContext';

export interface CategoryItem {
  id: string;
  slug: string;
  title: string;
  count: number;
  image: string;
  description: string;
}

interface ProductContextType {
  products: Product[];
  categories: CategoryItem[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  addProduct: (data: Partial<Product>) => Promise<{ success: boolean; data?: Product; error?: string }>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<{ success: boolean; data?: Product; error?: string }>;
  deleteProduct: (id: string) => Promise<{ success: boolean; error?: string }>;
  addCategory: (data: Partial<CategoryItem>) => Promise<{ success: boolean; data?: CategoryItem; error?: string }>;
  updateCategory: (id: string, data: Partial<CategoryItem>) => Promise<{ success: boolean; data?: CategoryItem; error?: string }>;
  deleteCategory: (id: string) => Promise<{ success: boolean; error?: string }>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [categories, setCategories] = useState<CategoryItem[]>(() =>
    Object.entries(CATEGORY_INFO).map(([slug, val]) => ({
      id: slug,
      slug,
      title: val.title,
      count: val.count,
      image: val.image,
      description: val.description
    }))
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products').catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProducts(json.data);
        }
      }
    } catch {
      // Pure frontend mode: MOCK_PRODUCTS loaded by default
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch('/api/categories').catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setCategories(json.data);
        }
      }
    } catch {
      // Pure frontend mode: default categories loaded
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Product CRUD
  const addProduct = async (productData: Partial<Product>) => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/products', {
        method: 'POST',
        headers,
        body: JSON.stringify(productData)
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setProducts(prev => [json.data, ...prev]);
        return { success: true, data: json.data };
      } else {
        // Fallback for dev mode
        const fallbackId = `prod-${Date.now()}`;
        const newProd: Product = {
          id: fallbackId,
          sku: productData.sku || `MW-${Date.now()}`,
          name: productData.name || 'New Product',
          brand: (productData.brand as any) || 'Apple',
          category: (productData.category as any) || 'mobile-phones',
          model: productData.model || productData.name || 'Model',
          storage: productData.storage || '',
          colour: productData.colour || productData.color || '',
          color: productData.color || productData.colour || '',
          network: productData.network || 'Unlocked',
          condition: productData.condition || 'PhoneCheck Inspected',
          grade: (productData.grade as any) || 'Grade A',
          priceGBP: Number(productData.priceGBP || productData.price || 0),
          price: Number(productData.price || productData.priceGBP || 0),
          vatType: (productData.vatType as any) || 'Margin VAT',
          moq: Number(productData.moq || 1),
          quantity: Number(productData.quantity || productData.stockQty || 1),
          stockQty: Number(productData.stockQty || productData.quantity || 1),
          availability: (productData.availability as any) || 'In Stock',
          inStock: productData.inStock !== undefined ? productData.inStock : true,
          image: productData.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
          description: productData.description || '',
          specs: productData.specs || {},
          isHotDeal: Boolean(productData.isHotDeal),
          warrantyDays: Number(productData.warrantyDays || 90)
        };
        setProducts(prev => [newProd, ...prev]);
        return { success: true, data: newProd };
      }
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updates)
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setProducts(prev => prev.map(p => p.id === id ? json.data : p));
        return { success: true, data: json.data };
      } else {
        // Fallback for dev mode
        setProducts(prev => prev.map(p => {
          if (p.id === id) {
            const qty = updates.quantity !== undefined ? Number(updates.quantity) : (updates.stockQty !== undefined ? Number(updates.stockQty) : p.quantity);
            const price = updates.priceGBP !== undefined ? Number(updates.priceGBP) : (updates.price !== undefined ? Number(updates.price) : p.priceGBP);
            return {
              ...p,
              ...updates,
              priceGBP: price,
              price: price,
              quantity: qty,
              stockQty: qty,
              inStock: updates.inStock !== undefined ? updates.inStock : (qty > 0 && updates.availability !== 'Out of Stock')
            };
          }
          return p;
        }));
        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers
      });

      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
        return { success: true };
      } else {
        setProducts(prev => prev.filter(p => p.id !== id));
        return { success: true };
      }
    } catch (err: any) {
      setProducts(prev => prev.filter(p => p.id !== id));
      return { success: true };
    }
  };

  // Category CRUD
  const addCategory = async (catData: Partial<CategoryItem>) => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/categories', {
        method: 'POST',
        headers,
        body: JSON.stringify(catData)
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setCategories(prev => [...prev, json.data]);
        return { success: true, data: json.data };
      } else {
        const id = catData.id || catData.title?.toLowerCase().replace(/\s+/g, '-') || `cat-${Date.now()}`;
        const newCat: CategoryItem = {
          id,
          slug: id,
          title: catData.title || 'New Category',
          count: Number(catData.count || 0),
          image: catData.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
          description: catData.description || ''
        };
        setCategories(prev => [...prev, newCat]);
        return { success: true, data: newCat };
      }
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updateCategory = async (id: string, updates: Partial<CategoryItem>) => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updates)
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setCategories(prev => prev.map(c => c.id === id || c.slug === id ? json.data : c));
        return { success: true, data: json.data };
      } else {
        setCategories(prev => prev.map(c => c.id === id || c.slug === id ? { ...c, ...updates } : c));
        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers
      });

      setCategories(prev => prev.filter(c => c.id !== id && c.slug !== id));
      return { success: true };
    } catch (err: any) {
      setCategories(prev => prev.filter(c => c.id !== id && c.slug !== id));
      return { success: true };
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        refreshProducts: fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
