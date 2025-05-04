import React from 'react';
import { Payment } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ArrowUpRight } from 'lucide-react';

interface PaymentCardProps {
  payment: Payment;
  onClick: () => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ payment, onClick }) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'neutral';
    }
  };

  return (
    <Card 
      hoverable 
      onClick={onClick}
      className="flex items-center justify-between p-4"
    >
      <div className="flex items-center">
        <div className="mr-4">
          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary-600 font-medium">
              {payment.serviceName.substring(0, 2)}
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-neutral-900">{payment.serviceName}</h3>
          <div className="flex items-center mt-1">
            <Badge 
              variant={getStatusVariant(payment.status)} 
              size="sm"
              className="mr-2"
            >
              {payment.status}
            </Badge>
            <span className="text-xs text-neutral-500">{formatDate(payment.date)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="text-right mr-2">
          <div className="font-medium text-neutral-900">{formatCurrency(payment.amount)}</div>
          <div className="text-xs text-neutral-500 capitalize">{payment.category}</div>
        </div>
        <ArrowUpRight size={16} className="text-neutral-400" />
      </div>
    </Card>
  );
};

export default PaymentCard;