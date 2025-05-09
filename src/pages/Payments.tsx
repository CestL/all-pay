import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, ArrowUpDown, Search } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { mockPayments } from '../data/mockData';
import { formatCurrency, formatDate } from '../utils/formatters';

type FilterStatus = 'all' | 'completed' | 'pending' | 'failed';
type SortOption = 'newest' | 'oldest' | 'amount_high' | 'amount_low';

const Payments: React.FC = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter and sort payments
  const filteredPayments = mockPayments.filter(payment => {
    // Apply status filter
    if (filterStatus !== 'all' && payment.status !== filterStatus) {
      return false;
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        payment.serviceName.toLowerCase().includes(query) ||
        payment.category.toLowerCase().includes(query) ||
        payment.reference?.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Sort payments
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'amount_high':
        return b.amount - a.amount;
      case 'amount_low':
        return a.amount - b.amount;
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
  
  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'warning';
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 md:text-3xl">
            Payment History
          </h1>
          <p className="text-neutral-600 mt-1">
            View and manage all your payments
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary"
            icon={<Plus size={18} />}
            onClick={() => navigate('/payments/new')}
          >
            New Payment
          </Button>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col md:flex-row md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-neutral-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="inline-flex rounded-lg border border-neutral-200 bg-white">
            <button
              className={`px-3 py-1.5 text-sm ${filterStatus === 'all' ? 'bg-primary-500 text-neutral-900' : 'text-neutral-600'}`}
              onClick={() => setFilterStatus('all')}
            >
              All
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${filterStatus === 'completed' ? 'bg-primary-500 text-neutral-900' : 'text-neutral-600'}`}
              onClick={() => setFilterStatus('completed')}
            >
              Completed
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${filterStatus === 'pending' ? 'bg-primary-500 text-neutral-900' : 'text-neutral-600'}`}
              onClick={() => setFilterStatus('pending')}
            >
              Pending
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${filterStatus === 'failed' ? 'bg-primary-500 text-neutral-900' : 'text-neutral-600'}`}
              onClick={() => setFilterStatus('failed')}
            >
              Failed
            </button>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            icon={<Filter size={16} />}
            className="hidden md:flex"
          >
            Filter
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowUpDown size={16} />}
            className="hidden md:flex"
          >
            Sort
          </Button>
        </div>
      </div>
      
      {/* Payments table */}
      <Card className="overflow-hidden">
        {sortedPayments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {sortedPayments.map((payment) => (
                  <tr 
                    key={payment.id}
                    className="hover:bg-neutral-50 cursor-pointer"
                    onClick={() => navigate(`/payments/${payment.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-primary-700">
                            {payment.serviceName.substring(0, 2)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-neutral-900">
                            {payment.serviceName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {formatDate(payment.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-neutral-900 capitalize">
                        {payment.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(payment.status)} size="sm">
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {payment.reference || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-16 w-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">No payments found</h3>
            <p className="text-neutral-500 text-sm mb-4">
              {searchQuery
                ? `No payments matching "${searchQuery}"`
                : 'No payments with the selected filters'}
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setFilterStatus('all');
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Payments;