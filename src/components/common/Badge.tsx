import React from 'react';
import { Sparkles, Flame, CheckCircle2, AlertTriangle, XCircle, Tag, ShieldCheck } from 'lucide-react';
import { DeviceGrade, VATType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface BadgeProps {
  type: 'grade' | 'vat' | 'stock' | 'deal' | 'custom';
  grade?: DeviceGrade;
  vatType?: VATType;
  inStock?: boolean;
  stockQty?: number;
  label?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  type,
  grade,
  vatType,
  inStock,
  stockQty,
  label,
  className = ''
}) => {
  const { t } = useLanguage();

  if (type === 'grade' && grade) {
    let style = 'bg-[#FAF8F2] text-[#101A18] border-[#D8E2DE]';
    let icon: React.ReactNode = <ShieldCheck className="w-3 h-3 mr-1 shrink-0" />;
    let displayGrade: string = grade;
    
    if (grade === 'Brand New Sealed') {
      style = 'bg-[#E5F3EF] text-[#071715] border-[#D4AF62]/50 font-extrabold';
      icon = <Sparkles className="w-3 h-3 mr-1 text-[#00A88F] shrink-0" />;
      displayGrade = t('common.brandNewSealed', 'Brand New Sealed');
    }
    if (grade === 'Refurbished Grade A+') {
      style = 'bg-[#E5F3EF] text-[#071715] border-[#D8E2DE] font-bold';
      icon = <Sparkles className="w-3 h-3 mr-1 text-[#D4AF62] shrink-0" />;
      displayGrade = 'Grade A+';
    }
    if (grade === 'Grade A') {
      style = 'bg-[#FAF8F2] text-[#101A18] border-[#D8E2DE] font-bold';
      displayGrade = 'Grade A';
    }
    if (grade === 'Grade B') {
      style = 'bg-[#FAF8F2] text-[#596662] border-[#D4AF62] font-bold';
      displayGrade = 'Grade B';
    }
    if (grade === 'Grade C') {
      style = 'bg-[#FAF8F2] text-[#596662] border-[#D8E2DE] font-bold';
      displayGrade = 'Grade C';
    }
    if (grade === 'Clearance / As Is') {
      style = 'bg-[#FAF8F2] text-[#854d0e] border-[#fde047] font-bold';
      displayGrade = 'Clearance / As Is';
    }
    if (grade === 'Mixed Grades') {
      style = 'bg-[#FAF8F2] text-[#6b21a8] border-[#c084fc] font-bold';
      displayGrade = 'Mixed Grades';
    }
    if (grade === 'N/A') {
      style = 'bg-stone-100 text-stone-600 border-stone-300 font-medium';
      icon = null;
      displayGrade = 'N/A';
    }

    return (
      <span className={`inline-flex items-center max-w-full px-2 py-0.5 rounded-md text-[11px] font-bold border shadow-2xs ${style} ${className}`}>
        {icon}
        <span className="truncate">{displayGrade}</span>
      </span>
    );
  }

  if (type === 'vat' && vatType) {
    let style = 'bg-[#FAF8F2] text-[#D4AF62] border-[#D4AF62] font-bold';
    let displayVat: string = vatType;
    if (vatType === 'Margin VAT') {
      style = 'bg-[#E5F3EF] text-[#071715] border-[#D8E2DE] font-bold';
      displayVat = t('common.marginVat', 'Margin VAT');
    } else if (vatType === 'N/A') {
      style = 'bg-stone-100 text-stone-600 border-stone-300 font-medium';
      displayVat = 'N/A';
    } else {
      displayVat = t('common.standardVat', '20% Standard VAT');
    }

    return (
      <span className={`inline-flex items-center max-w-full px-2 py-0.5 rounded-md text-[11px] font-bold border shadow-2xs ${style} ${className}`}>
        <Tag className="w-3 h-3 mr-1 opacity-70 shrink-0" />
        <span className="truncate">{displayVat}</span>
      </span>
    );
  }

  if (type === 'stock') {
    if (!inStock || (stockQty !== undefined && stockQty <= 0)) {
      return (
        <span className={`inline-flex items-center max-w-full px-2 py-0.5 rounded-md text-xs font-bold bg-red-50 text-red-800 border border-red-200 ${className}`}>
          <XCircle className="w-3 h-3 mr-1 text-red-600 shrink-0" />
          <span className="truncate">{t('productDetail.outOfStock', 'Out of Stock')}</span>
        </span>
      );
    }
    if (stockQty !== undefined && stockQty < 10) {
      return (
        <span className={`inline-flex items-center max-w-full px-2 py-0.5 rounded-md text-xs font-bold bg-[#FAF8F2] text-[#B98B38] border border-[#D4AF62] ${className}`}>
          <AlertTriangle className="w-3 h-3 mr-1 text-[#B98B38] shrink-0" />
          <span className="truncate">{t('productDetail.lowStock', 'Low Stock')} ({stockQty} {t('common.units', 'units')})</span>
        </span>
      );
    }
    return (
      <span className={`inline-flex items-center max-w-full px-2 py-0.5 rounded-md text-xs font-bold bg-[#E5F3EF] text-[#071715] border border-[#D8E2DE] ${className}`}>
        <CheckCircle2 className="w-3 h-3 mr-1 text-[#00A88F] shrink-0" />
        <span className="truncate">{t('common.inStock', 'In Stock')} ({stockQty ? `${stockQty} ${t('common.units', 'units')}` : t('productDetail.available', 'Available')})</span>
      </span>
    );
  }

  if (type === 'deal') {
    return (
      <span className={`inline-flex items-center max-w-full px-2 py-0.5 rounded-md text-[10px] font-black bg-[#071715] text-white uppercase tracking-wider shadow-2xs border border-[#D4AF62]/40 ${className}`}>
        <Flame className="w-3 h-3 mr-1 text-[#D4AF62] shrink-0" />
        <span className="truncate">{t('deals.badge', 'Hot Deal')}</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center max-w-full px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#FAF8F2] text-[#101A18] border border-[#D8E2DE] ${className}`}>
      <span className="truncate">{label}</span>
    </span>
  );
};
