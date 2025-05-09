export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type PaymentCategory = 
  | 'mobile'
  | 'utility'
  | 'debt'
  | 'subscription'
  | 'internet'
  | 'insurance'
  | 'other';

export interface Service {
  id: string;
  name: string;
  category: PaymentCategory;
  logo?: string;
  description?: string;
}

export interface Payment {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  category: PaymentCategory;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  reference?: string;
}

export interface MonthlySpending {
  month: string;
  mobile: number;
  utility: number;
  debt: number;
  subscription: number;
  internet: number;
  insurance: number;
  other: number;
  total: number;
}

export interface CategoryTotal {
  category: PaymentCategory;
  total: number;
  percentage: number;
}