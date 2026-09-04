import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  getDocs
} from 'firebase/firestore';
import { db } from '../config/firebase';
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
  const [products, setProducts] = useState<Product[]>([]);
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

  // Real-time Firestore Sync for Products
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        if (!snapshot.empty) {
          const firestoreProducts: Product[] = snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...(docSnap.data() as Omit<Product, 'id'>)
          }));
          setProducts(firestoreProducts);
        } else {
          setProducts(MOCK_PRODUCTS);
        }
        setLoading(false);
      },
      (err) => {
        console.warn('Firestore real-time listener error:', err);
        setProducts(MOCK_PRODUCTS);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Real-time Firestore Sync for Categories
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'categories'),
      (snapshot) => {
        if (!snapshot.empty) {
          const firestoreCategories: CategoryItem[] = snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...(docSnap.data() as Omit<CategoryItem, 'id'>)
          }));
          setCategories(firestoreCategories);
        }
      },
      (err) => {
        console.warn('Firestore categories listener error:', err);
      }
    );

    return () => unsubscribe();
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, 'products'));
      const firestoreProducts: Product[] = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Product, 'id'>)
      }));
      setProducts(firestoreProducts);
    } catch (err: any) {
      console.warn('Fetch products failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Product CRUD - Firestore Source of Truth
  const addProduct = async (productData: Partial<Product>) => {
    const docId = `prod-${Date.now()}`;
    const newProd: Product = {
      id: docId,
      sku: productData.sku || '',
      name: productData.name || 'New Wholesale Item',
      brand: (productData.brand as any) || 'Apple',
      category: (productData.category as any) || 'mobile-phones',
      model: productData.model || productData.name || 'Model',
      storage: productData.storage || '',
      colour: productData.colour || productData.color || '',
      color: productData.color || productData.colour || '',
      network: productData.network ?? '',
      condition: productData.condition ?? '',
      grade: (productData.grade as any) || 'Grade A',
      priceGBP: Number(productData.priceGBP ?? productData.price ?? 0),
      price: Number(productData.price ?? productData.priceGBP ?? 0),
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
      warrantyDays: productData.warrantyDays !== undefined && productData.warrantyDays !== null && productData.warrantyDays !== ('' as any) && !isNaN(Number(productData.warrantyDays)) ? Number(productData.warrantyDays) : ('' as any)
    };

    // Await setDoc to confirm document creation directly in Firestore database!
    await setDoc(doc(db, 'products', docId), newProd);

    return { success: true, data: newProd };
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const qty = updates.quantity !== undefined ? Number(updates.quantity) : (updates.stockQty !== undefined ? Number(updates.stockQty) : undefined);
    const price = updates.priceGBP !== undefined ? Number(updates.priceGBP) : (updates.price !== undefined ? Number(updates.price) : undefined);

    const cleanUpdates: Record<string, any> = { ...updates };
    if (price !== undefined) {
      cleanUpdates.priceGBP = price;
      cleanUpdates.price = price;
    }
    if (qty !== undefined) {
      cleanUpdates.quantity = qty;
      cleanUpdates.stockQty = qty;
      cleanUpdates.inStock = updates.inStock !== undefined ? updates.inStock : (qty > 0 && updates.availability !== 'Out of Stock');
    }

    await updateDoc(doc(db, 'products', id), cleanUpdates);
    return { success: true };
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    return { success: true };
  };

  // Category CRUD
  const addCategory = async (catData: Partial<CategoryItem>) => {
    const catId = catData.id || catData.title?.toLowerCase().replace(/\s+/g, '-') || `cat-${Date.now()}`;
    const newCat: CategoryItem = {
      id: catId,
      slug: catId,
      title: catData.title || 'New Category',
      count: Number(catData.count || 0),
      image: catData.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      description: catData.description || ''
    };

    setCategories(prev => [...prev.filter(c => c.id !== catId), newCat]);

    setDoc(doc(db, 'categories', catId), newCat).catch(err => {
      console.warn('Firestore setDoc category failed:', err);
    });

    return { success: true, data: newCat };
  };

  const updateCategory = async (id: string, updates: Partial<CategoryItem>) => {
    setCategories(prev => prev.map(c => c.id === id || c.slug === id ? { ...c, ...updates } : c));

    updateDoc(doc(db, 'categories', id), updates as any).catch(err => {
      console.warn('Firestore updateCategory failed:', err);
    });

    return { success: true };
  };

  const deleteCategory = async (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id && c.slug !== id));

    deleteDoc(doc(db, 'categories', id)).catch(err => {
      console.warn('Firestore deleteCategory failed:', err);
    });

    return { success: true };
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
