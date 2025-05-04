/**
 * Format a number as currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a date string (YYYY-MM-DD) to a more readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Convert a month string (YYYY-MM) to a readable month and year
 */
export const formatMonth = (monthString: string): string => {
  const [year, month] = monthString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(date);
};

/**
 * Get a color for a payment category
 */
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    mobile: '#3B82F6',
    utility: '#10B981',
    debt: '#EF4444',
    subscription: '#8B5CF6',
    internet: '#EC4899',
    insurance: '#F59E0B',
    other: '#6B7280',
  };
  
  return colors[category] || colors.other;
};

/**
 * Get a display name for a payment category
 */
export const getCategoryDisplayName = (category: string): string => {
  const displayNames: Record<string, string> = {
    mobile: 'Mobile',
    utility: 'Utilities',
    debt: 'Debt',
    subscription: 'Subscriptions',
    internet: 'Internet',
    insurance: 'Insurance',
    other: 'Other',
  };
  
  return displayNames[category] || category;
};