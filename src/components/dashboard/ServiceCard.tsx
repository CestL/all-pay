import React from 'react';
import { Service } from '../../types';
import Card from '../ui/Card';
import { CreditCard } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      className="flex items-center p-4 h-full"
    >
      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
        {service.logo ? (
          <img
            src={service.logo}
            alt={service.name}
            className="h-10 w-10 rounded-full object-cover"
            onError={(e) => {
              // Fallback to icon if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = `<div class="flex items-center justify-center h-full w-full"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg></div>`;
            }}
          />
        ) : (
          <CreditCard size={20} className="text-primary-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-neutral-900 truncate">
          {service.name}
        </h3>
        <p className="text-xs text-neutral-500 capitalize">
          {service.category}
        </p>
      </div>
    </Card>
  );
};

export default ServiceCard;