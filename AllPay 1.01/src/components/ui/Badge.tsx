import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}) => {
  const variantClasses = {
    success: 'bg-success-500 bg-opacity-10 text-success-500',
    warning: 'bg-warning-500 bg-opacity-10 text-warning-500',
    error: 'bg-error-500 bg-opacity-10 text-error-500',
    info: 'bg-info-500 bg-opacity-10 text-info-500',
    neutral: 'bg-neutral-200 text-neutral-700',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
  };
  
  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${className}
    `}>
      {children}
    </span>
  );
};

export default Badge;