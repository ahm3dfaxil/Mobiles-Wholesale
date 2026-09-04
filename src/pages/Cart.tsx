import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowLeft, 
  Minus, 
  Plus, 
  AlertTriangle, 
  HardDrive, 
  CheckCircle2, 
  ShieldCheck, 
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';
import { createWhatsAppCartUrl } from '../utils/whatsapp';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalUnits } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Validate items against latest live products from context
  const itemsWithValidation = cart.map((item) => {
    const liveProduct = products.find((p) => p.id === item.product.id);
    if (!liveProduct) {
      return {
        ...item,
        isMissing: true,
        staleStock: null,
        validationError: 'Product no longer available in inventory.'
      };
    }

    const currentStock = liveProduct.stockQty;
    const currentMoq = liveProduct.moq || 1;

    let validationError: string | null = null;
    if (item.quantity > currentStock) {
      validationError = `Stock updated — only ${currentStock} units currently available.`;
    } else if (item.quantity < currentMoq) {
      validationError = `Quantity below minimum order quantity (MOQ: ${currentMoq}).`;
    }

    return {
      ...item,
      product: liveProduct, // use latest live product details
      isMissing: false,
      staleStock: currentStock < item.quantity ? currentStock : null,
      validationError
    };
  });

  const hasValidationErrors = itemsWithValidation.some((item) => item.isMissing || item.validationError !== null);

  const handleWhatsAppQuotation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cart.length === 0) {
      e.preventDefault();
      alert('Your cart is empty. Please add wholesale products first.');
      return;
    }
    if (hasValidationErrors) {
      e.preventDefault();
      alert('Please resolve inventory warnings before requesting a quotation.');
      return;
    }
  };

  const validCartItems = itemsWithValidation.filter((item) => !item.isMissing);
  const whatsappUrl = createWhatsAppCartUrl(validCartItems);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#FAF8F2] min-h-[60vh] flex flex-col justify-center items-center text-center">
        <div className="w-20 h-20 bg-white rounded-full border border-[#D8E2DE] shadow-md flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-[#00A88F]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#071715] mb-2">
          Your Quotation Cart is Empty
        </h1>
        <p className="text-sm text-[#596662] max-w-md mb-8 leading-relaxed">
          Add products from our wholesale stock list to prepare a bulk price quotation request.
        </p>
        <Link to="/stock">
          <Button
            variant="primary"
            size="lg"
            icon={<ShoppingBag className="w-5 h-5" />}
            className="px-8 py-3.5 shadow-md"
          >
            Browse Wholesale Stock
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#FAF8F2] min-h-[75vh]">
      {/* Header & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8E2DE] pb-6">
        <div>
          <button
            onClick={() => navigate('/stock')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#596662] hover:text-[#071715] mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t('productDetail.backToStock', 'Continue Browsing Stock')}
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-[#071715] tracking-tight">
            Wholesale Quotation Basket
          </h1>
          <p className="text-xs sm:text-sm text-[#596662] mt-1">
            Review your selected products and request live wholesale pricing on WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#596662] hover:text-red-600 bg-white border border-[#D8E2DE] px-3.5 py-2 rounded-xl hover:border-red-300 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Cart</span>
          </button>
        </div>
      </div>

      {/* Global Validation Alert Banner if issues present */}
      {hasValidationErrors && (
        <div className="bg-amber-50 border border-amber-300 text-amber-900 px-4 py-3 rounded-2xl flex items-start gap-3 text-xs leading-relaxed">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-sm mb-0.5">Inventory Update Required</span>
            Some items in your cart have updated availability or stock limits. Please review the items flagged below before sending your quotation request.
          </div>
        </div>
      )}

      {/* Main Grid: Cart Items List (8 Cols) & Summary (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Product List */}
        <div className="lg:col-span-8 space-y-4">
          {itemsWithValidation.map((item) => {
            const p = item.product;
            const moq = p.moq || 1;
            const maxStock = p.stockQty || 1;

            return (
              <div
                key={p.id}
                className={`bg-white rounded-2xl border p-4 sm:p-5 b2b-card-shadow transition-all ${
                  item.validationError ? 'border-amber-400 bg-amber-50/20' : 'border-[#D8E2DE] hover:border-[#D4AF62]'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl border border-[#D8E2DE] overflow-hidden shrink-0 flex items-center justify-center p-2">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain mix-blend-multiply filter contrast-[1.12] brightness-[1.02]"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 space-y-1.5 w-full sm:w-auto">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black text-[#071715] uppercase tracking-wider">
                        {p.brand}
                      </span>
                      {p.sku && (
                        <span className="font-mono text-[10px] text-[#596662] bg-[#FAF8F2] border border-[#D8E2DE] px-1.5 py-0.5 rounded">
                          SKU: {p.sku}
                        </span>
                      )}
                    </div>

                    <Link to={`/product/${p.id}`} className="hover:text-[#007A68] transition-colors block">
                      <h3 className="font-bold text-[#101A18] text-sm sm:text-base leading-snug line-clamp-2">
                        {p.name}
                      </h3>
                    </Link>

                    {/* Meta Specifications Row */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#596662] pt-0.5">
                      <Badge type="grade" grade={p.grade} />
                      {p.storage && (
                        <span className="inline-flex items-center gap-1 font-semibold text-[#101A18] bg-[#E5F3EF] px-2 py-0.5 rounded text-[11px]">
                          <HardDrive className="w-3 h-3 text-[#596662]" /> {p.storage}
                        </span>
                      )}
                      {p.colour && (
                        <span className="text-[11px] font-medium bg-[#FAF8F2] border border-[#D8E2DE] px-2 py-0.5 rounded">
                          {p.colour}
                        </span>
                      )}
                    </div>

                    {/* Stock & MOQ Labels */}
                    <div className="flex items-center gap-3 text-[11px] text-[#596662] pt-1">
                      <span>MOQ: <strong className="text-[#101A18]">{moq}u</strong></span>
                      <span>•</span>
                      <span>Stock Available: <strong className="text-[#00A88F]">{maxStock}u</strong></span>
                    </div>

                    {/* Item Validation Warning */}
                    {item.validationError && (
                      <div className="text-xs font-semibold text-amber-700 bg-amber-100/80 border border-amber-300 px-2.5 py-1 rounded-lg mt-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{item.validationError}</span>
                      </div>
                    )}
                  </div>

                  {/* Quantity Controls & Remove Action */}
                  <div className="flex sm:flex-col items-center justify-between sm:items-end gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#D8E2DE]">
                    <div className="flex items-center gap-2 bg-[#FAF8F2] p-1.5 rounded-xl border border-[#D8E2DE]">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(p.id, Math.max(moq, item.quantity - 1))}
                        disabled={item.quantity <= moq}
                        className="w-7 h-7 rounded-lg bg-white border border-[#D8E2DE] font-black text-[#101A18] disabled:opacity-40 flex items-center justify-center hover:bg-[#E5F3EF] transition-colors cursor-pointer"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <input
                        type="number"
                        min={moq}
                        max={maxStock}
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val)) {
                            updateQuantity(p.id, val);
                          }
                        }}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value);
                          if (isNaN(val) || val < moq) {
                            updateQuantity(p.id, moq);
                          } else if (val > maxStock) {
                            updateQuantity(p.id, maxStock);
                          }
                        }}
                        className="w-14 text-center font-extrabold text-[#101A18] bg-white border border-[#D8E2DE] rounded-md py-1 text-xs focus:ring-1 focus:ring-[#071715]"
                        aria-label={`Quantity for ${p.name}`}
                      />

                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(p.id, Math.min(maxStock, item.quantity + 1))}
                        disabled={item.quantity >= maxStock}
                        className="w-7 h-7 rounded-lg bg-white border border-[#D8E2DE] font-black text-[#101A18] disabled:opacity-40 flex items-center justify-center hover:bg-[#E5F3EF] transition-colors cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => removeFromCart(p.id)}
                      className="text-xs font-semibold text-stone-500 hover:text-red-600 flex items-center gap-1 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Summary Sidebar (4 Cols) */}
        <div className="lg:col-span-4 sticky top-28 space-y-4">
          <div className="bg-white rounded-2xl border border-[#D8E2DE] b2b-card-shadow p-6 space-y-6">
            <h2 className="text-lg font-black text-[#071715] border-b border-[#D8E2DE] pb-3">
              Quotation Summary
            </h2>

            {/* Summary Metrics */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-[#596662]">
                <span>Total Product Lines:</span>
                <span className="font-extrabold text-[#101A18] text-sm">{totalItems}</span>
              </div>
              <div className="flex justify-between items-center text-[#596662]">
                <span>Total Wholesale Units:</span>
                <span className="font-extrabold text-[#00A88F] text-base">{totalUnits} units</span>
              </div>
            </div>

            <div className="bg-[#E5F3EF] border border-[#D8E2DE] rounded-xl p-3.5 text-xs text-[#596662] space-y-1.5">
              <div className="font-bold text-[#071715] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#007A68]" />
                <span>No Payment Required Now</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Wholesale prices fluctuate daily based on market volume. Send your request to receive guaranteed pricing & invoice details directly on WhatsApp.
              </p>
            </div>

            {/* Main WhatsApp Quotation CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppQuotation}
              className="block w-full"
            >
              <Button
                variant="whatsapp"
                size="lg"
                fullWidth
                disabled={hasValidationErrors}
                icon={<WhatsAppIcon className="w-5 h-5" />}
                className="py-4 text-sm font-black shadow-md glow-emerald disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Request Price Quotation on WhatsApp
              </Button>
            </a>

            <div className="text-center pt-1">
              <span className="text-[11px] text-[#596662] flex items-center justify-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#00A88F]" />
                <span>Next-Day UK Delivery Available</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
