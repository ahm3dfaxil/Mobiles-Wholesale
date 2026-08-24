import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-lg';
  
  const variantStyles = {
    primary: 'bg-[#063F35] hover:bg-[#007A68] text-white shadow-xs focus:ring-[#063F35] border border-transparent font-bold',
    secondary: 'bg-[#FAF8F2] hover:bg-[#E5F3EF] text-[#071715] focus:ring-[#D4AF62] border border-[#D4AF62] font-bold',
    whatsapp: 'bg-[#00A88F] hover:bg-[#007A68] text-white shadow-md glow-emerald focus:ring-[#00A88F] border border-transparent font-bold',
    outline: 'border border-[#D8E2DE] bg-white hover:bg-[#FAF8F2] hover:border-[#D4AF62] text-[#101A18] focus:ring-[#D4AF62] font-bold',
    ghost: 'text-[#596662] hover:text-[#071715] hover:bg-[#E5F3EF] focus:ring-[#D8E2DE]',
    dark: 'bg-[#071715] hover:bg-[#063F35] text-white shadow-xs focus:ring-[#071715] border border-[#D4AF62]/40 font-bold',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
