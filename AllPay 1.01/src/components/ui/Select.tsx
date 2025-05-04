import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  error,
  required = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  
  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const selectedOption = options.find(option => option.value === value);
  
  return (
    <div className={`mb-4 ${className}`} ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label} {required && <span className="text-error-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div
          className={`
            w-full px-3 py-2 rounded-lg border bg-white
            flex items-center justify-between cursor-pointer
            ${error ? 'border-error-500' : 'border-neutral-300'}
          `}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? (
            <div className="flex items-center">
              {selectedOption.icon && (
                <span className="mr-2">{selectedOption.icon}</span>
              )}
              <span>{selectedOption.label}</span>
            </div>
          ) : (
            <span className="text-neutral-400">{placeholder}</span>
          )}
          
          <ChevronDown 
            size={18} 
            className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
          />
        </div>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-dropdown max-h-60 overflow-auto animate-slideDown">
            {options.map((option) => (
              <div
                key={option.value}
                className={`
                  px-3 py-2 cursor-pointer flex items-center
                  ${option.value === value ? 'bg-primary-50 text-neutral-900' : 'text-neutral-700'}
                  hover:bg-neutral-50
                `}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.icon && (
                  <span className="mr-2">{option.icon}</span>
                )}
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error-500">{error}</p>
      )}
    </div>
  );
};

export default Select;