import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  icon
}) => {
  const baseClasses = 'flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-neutral-900 focus:ring-primary-500',
    secondary: 'bg-neutral-900 hover:bg-neutral-800 text-white focus:ring-neutral-900',
    outline: 'border border-neutral-300 hover:bg-neutral-50 text-neutral-900 focus:ring-neutral-900',
    text: 'text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-900',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
  };
  
  const disabledClasses = disabled || isLoading
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';
  
  const widthClasses = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${widthClasses}
        ${className}
      `}
    >
      {isLoading ? (
        <span className="animate-spin mr-2">
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;