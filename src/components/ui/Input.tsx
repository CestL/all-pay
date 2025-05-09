import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  name?: string;
  id?: string;
  autoComplete?: string;
  className?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  name,
  id,
  autoComplete,
  className = '',
  icon
}) => {
  const inputId = id || name || Math.random().toString(36).substring(2, 9);
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          {label} {required && <span className="text-error-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
            {icon}
          </div>
        )}
        
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`
            w-full px-3 py-2 rounded-lg border
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-error-500' : 'border-neutral-300'}
          `}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error-500">{error}</p>
      )}
    </div>
  );
};

export default Input;