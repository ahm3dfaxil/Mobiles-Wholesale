import { Product } from '../types';
import { WHATSAPP_CONFIG } from '../config/env';

export const createWhatsAppProductUrl = (product: Product, quantity?: number): string => {
  const qty = quantity || product.moq || 1;
  const storageText = product.storage ? `${product.storage}\n` : '';
  
  const message = `Hi, I'm interested in ordering:\n\n${product.name}\n${storageText}Grade: ${product.grade}\nQuantity: ${qty}\n\nPlease confirm the latest wholesale price and availability.`;
  
  return `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(message)}`;
};

export const createWhatsAppGeneralUrl = (customMessage?: string): string => {
  const message = customMessage || `Hi, I am interested in wholesale stock lists and trading terms with Mobiles Wholesale. Please confirm availability.`;
  
  return `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(message)}`;
};

export const createWhatsAppSellToUsUrl = (deviceDetails: string, qty: number): string => {
  const message = `Hi, I have bulk stock for sale/trade-in:\n\n*Devices:* ${deviceDetails}\n*Quantity:* ${qty} units\n\nPlease confirm your buyback valuation and testing requirements.`;
  
  return `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(message)}`;
};
