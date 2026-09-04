import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, CheckCircle2, Wifi, HardDrive, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { useLanguage } from '../../context/LanguageContext';
import { createWhatsAppProductUrl } from '../../utils/whatsapp';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onEnquire?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(product.moq || 1);
  const [added, setAdded] = useState<boolean>(false);
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <Card className="flex flex-col h-full group bg-white border border-[#D8E2DE] hover:border-[#D4AF62] rounded-2xl b2b-card-shadow b2b-card-hover overflow-hidden" padding="none">
      {/* Product Image Container */}
      <div className="relative aspect-4/3 bg-white overflow-hidden border-b border-[#D8E2DE]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-2 object-center mix-blend-multiply filter contrast-[1.12] brightness-[1.02] group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 z-10 pointer-events-none">
          {/* Top Left Stack: Grade Badge + Hot Deal Badge */}
          <div className="flex flex-col items-start gap-1 max-w-[calc(100%-105px)]">
            <Badge type="grade" grade={product.grade} />
            {product.isHotDeal && <Badge type="deal" />}
          </div>

          {/* Top Right: VAT Badge */}
          <div className="absolute top-0 right-0">
            <Badge type="vat" vatType={product.vatType} />
          </div>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-1 bg-white">
        {/* Brand & SKU Header */}
        <div className="flex items-center justify-between text-xs text-[#596662] mb-1.5">
          <span className="font-extrabold text-[#071715] uppercase tracking-wider">{product.brand}</span>
          <span className="font-mono text-[11px] text-[#596662] bg-[#FAF8F2] border border-[#D8E2DE] px-1.5 py-0.5 rounded">{product.sku}</span>
        </div>

        {/* Title */}
        <Link to={`/product/${product.id}`} className="group-hover:text-[#007A68] transition-colors">
          <h3 className="font-bold text-[#101A18] text-base leading-snug line-clamp-2 min-h-[2.75rem] mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Storage, Colour, & Network Specs Bar */}
        <div className="text-xs text-[#101A18] space-y-1 mb-4 bg-[#E5F3EF] p-2.5 rounded-xl border border-[#D8E2DE]">
          {product.storage && (
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#596662] font-medium flex items-center gap-1">
                <HardDrive className="w-3 h-3 text-[#596662]" /> {t('productDetail.storage', 'Storage')}:
              </span>
              <span className="font-semibold text-[#101A18]">{product.storage}</span>
            </div>
          )}
          {product.colour && (
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#596662] font-medium">{t('productDetail.colour', 'Colour')}:</span>
              <span className="font-semibold text-[#101A18]">{product.colour}</span>
            </div>
          )}
          {product.network && product.network !== 'N/A' && (
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#596662] font-medium flex items-center gap-1">
                <Wifi className="w-3 h-3 text-[#596662]" /> {t('productDetail.network', 'Network')}:
              </span>
              <span className="font-semibold text-[#101A18] truncate max-w-[55%]">{product.network}</span>
            </div>
          )}
        </div>

        {/* Price & MOQ Box */}
        <div className="mt-auto pt-3 border-t border-[#D8E2DE] mb-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#596662] uppercase font-bold tracking-wider">{t('productDetail.wholesalePricing', 'Wholesale Pricing')}</div>
              <a 
                href={createWhatsAppProductUrl(product, quantity)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#00A88F] hover:underline mt-0.5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                {t('common.askPrice', 'Ask Price')} ({quantity}u)
              </a>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-[#596662] uppercase font-bold tracking-wider">{t('productDetail.minOrder', 'Min Order')}</div>
              <span className="inline-flex items-center text-xs font-bold text-[#101A18] bg-[#FAF8F2] border border-[#D8E2DE] px-2 py-0.5 rounded-lg">
                {t('common.moq', 'MOQ')}: {product.moq}u
              </span>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between gap-1.5 text-xs">
            <div className="min-w-0 flex-1">
              <Badge type="stock" inStock={product.inStock} stockQty={product.stockQty} />
            </div>
            {Boolean(product.warrantyDays && Number(product.warrantyDays) > 0) && (
              <span className="text-[11px] text-[#596662] flex items-center gap-1 font-medium shrink-0">
                <CheckCircle2 className="w-3 h-3 text-[#007A68] shrink-0" />
                {t('productDetail.warrantyDays', '{{days}}d Warranty', { days: product.warrantyDays })}
              </span>
            )}
          </div>
        </div>

        {/* Quantity Customizer Controls */}
        <div className="flex items-center justify-between bg-[#FAF8F2] px-3 py-1.5 rounded-xl border border-[#D8E2DE] mb-3 text-xs">
          <span className="font-bold text-[#071715] text-[11px]">{t('productDetail.desiredQty', 'Desired Quantity:')}</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(product.moq || 1, quantity - 1))}
              disabled={quantity <= (product.moq || 1)}
              className="w-6 h-6 rounded bg-white border border-[#D8E2DE] font-extrabold text-[#101A18] disabled:opacity-40 flex items-center justify-center hover:bg-[#E5F3EF]"
              title="Decrease quantity"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <input
              type="number"
              min={product.moq || 1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(product.moq || 1, parseInt(e.target.value) || (product.moq || 1)))}
              className="w-12 text-center font-black text-[#101A18] bg-white border border-[#D8E2DE] rounded py-0.5 text-xs focus:ring-1 focus:ring-[#071715]"
              aria-label={`Desired quantity for ${product.name}`}
            />
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-6 h-6 rounded bg-white border border-[#D8E2DE] font-extrabold text-[#101A18] flex items-center justify-center hover:bg-[#E5F3EF]"
              title="Increase quantity"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Action Buttons: View Details, Add to Cart & Order on WhatsApp */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <Link to={`/product/${product.id}`} className="w-full">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                icon={<Eye className="w-3.5 h-3.5" />}
                className="!border-[#D8E2DE] !text-[#101A18] hover:!bg-[#FAF8F2] hover:!border-[#D4AF62]"
              >
                {t('common.viewDetails', 'View Details')}
              </Button>
            </Link>

            <Button
              type="button"
              variant="outline"
              size="sm"
              fullWidth
              aria-label="Add to cart"
              onClick={handleAddToCart}
              icon={added ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ShoppingBag className="w-3.5 h-3.5 text-[#00A88F]" />}
              className={`transition-all ${
                added 
                  ? '!bg-emerald-50 !border-emerald-500 !text-emerald-700 font-bold' 
                  : '!border-[#D8E2DE] !text-[#071715] hover:!bg-[#E5F3EF] hover:!border-[#00A88F] font-bold'
              }`}
            >
              {added ? '✓ Added' : 'Add to Cart'}
            </Button>
          </div>

          <a
            href={createWhatsAppProductUrl(product, quantity)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block"
          >
            <Button
              variant="whatsapp"
              size="sm"
              fullWidth
              icon={<WhatsAppIcon className="w-3.5 h-3.5" />}
              className="!bg-[#00A88F] hover:!bg-[#007A68] !text-white glow-emerald font-bold"
            >
              {t('common.askPrice', 'Ask Price')} ({quantity}u)
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
};

