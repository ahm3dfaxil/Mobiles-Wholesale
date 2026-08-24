import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  padding = 'md'
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyle = hoverEffect ? 'b2b-card-hover' : '';

  return (
    <div className={`bg-white rounded-2xl border border-[#DDE5E0] b2b-card-shadow overflow-hidden ${hoverStyle} ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
};
