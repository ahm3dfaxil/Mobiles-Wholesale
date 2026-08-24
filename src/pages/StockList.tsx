import React from 'react';
import { Stock } from './Stock';
import { SEOHead } from '../components/common/SEOHead';
import { useLanguage } from '../context/LanguageContext';

export const StockList: React.FC = () => {
  const { t } = useLanguage();

  const breadcrumbs = [
    { name: t('navigation.home', 'Home'), url: '/' },
    { name: t('navigation.liveStock', 'Live Stock'), url: '/stock-list' }
  ];

  return (
    <>
      <SEOHead
        title="Live UK Wholesale Stock Catalog | Mobiles Wholesale"
        description="Browse the complete live UK wholesale stock catalog at Mobiles Wholesale. Filter iPhones, Samsung Galaxy, iPads, MacBooks, laptops, and smartwatches by grade, brand, and availability."
        canonicalPath="/stock-list"
        breadcrumbs={breadcrumbs}
      />

      <Stock />
    </>
  );
};
