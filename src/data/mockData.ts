import { Payment, Service, MonthlySpending, CategoryTotal } from '../types';
import { format, subMonths } from 'date-fns';

export const mockServices: Service[] = [
  {
    id: 'service-1',
    name: 'Verizon Wireless',
    category: 'mobile',
    logo: 'https://logo.clearbit.com/verizon.com',
    description: 'Mobile phone service provider'
  },
  {
    id: 'service-2',
    name: 'AT&T',
    category: 'mobile',
    logo: 'https://logo.clearbit.com/att.com',
    description: 'Mobile phone service provider'
  },
  {
    id: 'service-3',
    name: 'Comcast',
    category: 'internet',
    logo: 'https://logo.clearbit.com/comcast.com',
    description: 'Internet service provider'
  },
  {
    id: 'service-4',
    name: 'PG&E',
    category: 'utility',
    logo: 'https://logo.clearbit.com/pge.com',
    description: 'Electricity and gas provider'
  },
  {
    id: 'service-5',
    name: 'Water Company',
    category: 'utility',
    logo: 'https://via.placeholder.com/40',
    description: 'Water service provider'
  },
  {
    id: 'service-6',
    name: 'Chase Credit Card',
    category: 'debt',
    logo: 'https://logo.clearbit.com/chase.com',
    description: 'Credit card payment'
  },
  {
    id: 'service-7',
    name: 'Student Loan',
    category: 'debt',
    logo: 'https://via.placeholder.com/40',
    description: 'Student loan payment'
  },
  {
    id: 'service-8',
    name: 'Netflix',
    category: 'subscription',
    logo: 'https://logo.clearbit.com/netflix.com',
    description: 'Streaming service'
  },
  {
    id: 'service-9',
    name: 'Spotify',
    category: 'subscription',
    logo: 'https://logo.clearbit.com/spotify.com',
    description: 'Music streaming service'
  },
  {
    id: 'service-10',
    name: 'Geico',
    category: 'insurance',
    logo: 'https://logo.clearbit.com/geico.com',
    description: 'Auto insurance'
  }
];

// Generate 6 months of payment history
const now = new Date();
export const mockPayments: Payment[] = [];

// Generate some realistic payment data for the last 6 months
for (let i = 0; i < 6; i++) {
  const month = subMonths(now, i);
  
  // Add payments for each service for this month
  mockServices.forEach(service => {
    // Some randomness to make the data more realistic
    const shouldAdd = Math.random() > 0.2; // 80% chance of having a payment for this service this month
    
    if (shouldAdd) {
      // Generate a realistic amount based on the category
      let amount = 0;
      switch (service.category) {
        case 'mobile':
          amount = Math.round((50 + Math.random() * 100) * 100) / 100;
          break;
        case 'utility':
          amount = Math.round((80 + Math.random() * 120) * 100) / 100;
          break;
        case 'debt':
          amount = Math.round((200 + Math.random() * 500) * 100) / 100;
          break;
        case 'subscription':
          amount = Math.round((10 + Math.random() * 20) * 100) / 100;
          break;
        case 'internet':
          amount = Math.round((60 + Math.random() * 80) * 100) / 100;
          break;
        case 'insurance':
          amount = Math.round((100 + Math.random() * 200) * 100) / 100;
          break;
        default:
          amount = Math.round((20 + Math.random() * 100) * 100) / 100;
      }
      
      mockPayments.push({
        id: `payment-${mockPayments.length + 1}`,
        userId: 'user-1',
        serviceId: service.id,
        serviceName: service.name,
        category: service.category,
        amount,
        date: format(month, 'yyyy-MM-dd'),
        status: 'completed',
        reference: `REF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      });
    }
  });
}

// Add a few pending payments for the current month
mockPayments.push({
  id: `payment-${mockPayments.length + 1}`,
  userId: 'user-1',
  serviceId: 'service-4',
  serviceName: 'PG&E',
  category: 'utility',
  amount: 94.56,
  date: format(now, 'yyyy-MM-dd'),
  status: 'pending',
  reference: `REF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
});

mockPayments.push({
  id: `payment-${mockPayments.length + 1}`,
  userId: 'user-1',
  serviceId: 'service-6',
  serviceName: 'Chase Credit Card',
  category: 'debt',
  amount: 342.19,
  date: format(now, 'yyyy-MM-dd'),
  status: 'pending',
  reference: `REF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
});

// Create monthly spending data for analytics
export const generateMonthlySpending = (): MonthlySpending[] => {
  const monthlySpending: MonthlySpending[] = [];
  
  // Group payments by month
  const months = [...new Set(mockPayments.map(p => p.date.substring(0, 7)))];
  
  months.forEach(month => {
    const monthPayments = mockPayments.filter(p => p.date.startsWith(month) && p.status === 'completed');
    
    const spending: MonthlySpending = {
      month: month,
      mobile: 0,
      utility: 0,
      debt: 0,
      subscription: 0,
      internet: 0,
      insurance: 0,
      other: 0,
      total: 0
    };
    
    monthPayments.forEach(payment => {
      spending[payment.category] += payment.amount;
      spending.total += payment.amount;
    });
    
    // Round all values to 2 decimal places
    Object.keys(spending).forEach(key => {
      if (key !== 'month') {
        spending[key as keyof Omit<MonthlySpending, 'month'>] = 
          Math.round(spending[key as keyof Omit<MonthlySpending, 'month'>] * 100) / 100;
      }
    });
    
    monthlySpending.push(spending);
  });
  
  // Sort by month (newest first)
  return monthlySpending.sort((a, b) => b.month.localeCompare(a.month));
};

export const mockMonthlySpending = generateMonthlySpending();

// Create category totals for analytics
export const generateCategoryTotals = (): CategoryTotal[] => {
  const completedPayments = mockPayments.filter(p => p.status === 'completed');
  const totalSpent = completedPayments.reduce((sum, p) => sum + p.amount, 0);
  
  const categoryTotals: Record<string, number> = {};
  
  completedPayments.forEach(payment => {
    if (!categoryTotals[payment.category]) {
      categoryTotals[payment.category] = 0;
    }
    categoryTotals[payment.category] += payment.amount;
  });
  
  return Object.entries(categoryTotals).map(([category, total]) => ({
    category: category as any,
    total: Math.round(total * 100) / 100,
    percentage: Math.round((total / totalSpent) * 1000) / 10
  })).sort((a, b) => b.total - a.total);
};

export const mockCategoryTotals = generateCategoryTotals();