import React, { useEffect, useRef, useState } from 'react';

export interface ScrollStackProps {
  children: React.ReactNode;
  useWindowScroll?: boolean;
  itemDistance?: number;
  itemStackDistance?: number;
  itemScale?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  className?: string;
}

export interface ScrollStackItemProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
}) => {
  const childArray = React.Children.toArray(children);

  return (
    <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 my-8 ${className}`}>
      {childArray.map((child, index) => (
        <div key={index} className="w-full">
          {child}
        </div>
      ))}
    </div>
  );
};

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, className = '' }) => {
  const hasCustomBg = className.includes('bg-');
  const bgClass = hasCustomBg ? '' : 'bg-white';
  
  return (
    <div className={`scroll-stack-card ${bgClass} rounded-3xl border border-[#D8E2DE]/70 p-6 sm:p-10 b2b-card-shadow overflow-hidden min-h-[16rem] h-auto transition-all ${className}`}>
      {children}
    </div>
  );
};
