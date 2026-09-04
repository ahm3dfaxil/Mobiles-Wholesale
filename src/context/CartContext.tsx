import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

const STORAGE_KEY = 'mw_wholesale_cart';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => { success: boolean; message?: string; capped?: boolean };
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalUnits: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          return parsed.filter(item => item && item.product && typeof item.quantity === 'number');
        }
      }
    } catch (err) {
      console.warn('Failed to parse cart from localStorage:', err);
    }
    return [];
  });

  // Save cart to localStorage whenever cart state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.warn('Failed to save cart to localStorage:', err);
    }
  }, [cart]);

  const addToCart = (product: Product, quantityRequested?: number) => {
    const moq = Math.max(1, product.moq || 1);
    const maxStock = Math.max(1, product.stockQty || 1);
    const addedQty = quantityRequested && quantityRequested > 0 ? quantityRequested : moq;

    let capped = false;
    let feedbackMessage: string | undefined;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);

      if (existingIndex > -1) {
        const existingItem = prevCart[existingIndex];
        let newQty = existingItem.quantity + addedQty;

        if (newQty > maxStock) {
          newQty = maxStock;
          capped = true;
          feedbackMessage = `Quantity capped at available stock (${maxStock} units).`;
        }

        const updated = [...prevCart];
        updated[existingIndex] = {
          ...existingItem,
          product, // refresh product data reference
          quantity: newQty
        };
        return updated;
      } else {
        let newQty = addedQty;
        if (newQty < moq) {
          newQty = moq;
        }
        if (newQty > maxStock) {
          newQty = maxStock;
          capped = true;
          feedbackMessage = `Quantity capped at available stock (${maxStock} units).`;
        }

        return [
          ...prevCart,
          {
            product,
            quantity: newQty,
            addedAt: Date.now()
          }
        ];
      }
    });

    return { success: true, message: feedbackMessage, capped };
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, requestedQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id !== productId) return item;

        const moq = Math.max(1, item.product.moq || 1);
        const maxStock = Math.max(1, item.product.stockQty || 1);

        let sanitizedQty = requestedQuantity;
        if (isNaN(sanitizedQty) || sanitizedQty < moq) {
          sanitizedQty = moq;
        }
        if (sanitizedQty > maxStock) {
          sanitizedQty = maxStock;
        }

        return {
          ...item,
          quantity: sanitizedQty
        };
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Distinct product lines
  const totalItems = cart.length;

  // Sum of all product quantities
  const totalUnits = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalUnits
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
