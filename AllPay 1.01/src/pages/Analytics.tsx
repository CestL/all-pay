import React, { useState } from 'react';
import { Calendar, Filter, Download } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SpendingChart from '../components/analytics/SpendingChart';
import CategoryBreakdown from '../components/analytics/CategoryBreakdown';
import { formatCurrency, formatMonth } from '../utils/formatters';
import { mockMonthlySpending, mockCategoryTotals } from '../data/mockData';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6m'); // 1m, 3m, 6m, 1y
  
  // Get total spending amount
  const totalSpent = mockCategoryTotals.reduce((sum, category) => sum + category.total, 0);
  
  // Most expensive category
  const topCategory = mockCategoryTotals[0];
  
  // Month with highest spending
  const monthWithHighestSpending = [...mockMonthlySpending]
    .sort((a, b) => b.total - a.total)[0];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 md:text-3xl">
            Analytics
          </h1>
          <p className="text-neutral-600 mt-1">
            Track and analyze your payment patterns
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button 
            variant="outline"
            size="sm"
            icon={<Filter size={16} />}
          >
            Filter
          </Button>
          <Button 
            variant="outline"
            size="sm"
            icon={<Download size={16} />}
          >
            Export
          </Button>
        </div>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-neutral-600 text-sm">Total Spent</p>
              <h3 className="text-2xl font-bold text-neutral-900 mt-1">
                {formatCurrency(totalSpent)}
              </h3>
              <p className="text-neutral-500 text-sm mt-1">
                Last 6 months
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <Calendar size={20} className="text-primary-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-neutral-600 text-sm">Highest Category</p>
              <h3 className="text-2xl font-bold text-neutral-900 mt-1">
                {formatCurrency(topCategory.total)}
              </h3>
              <p className="text-neutral-500 text-sm mt-1 capitalize">
                {topCategory.category} ({topCategory.percentage}%)
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="font-medium text-primary-600 capitalize">
                {topCategory.category.substring(0, 2)}
              </span>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-neutral-600 text-sm">Highest Month</p>
              <h3 className="text-2xl font-bold text-neutral-900 mt-1">
                {formatCurrency(monthWithHighestSpending.total)}
              </h3>
              <p className="text-neutral-500 text-sm mt-1">
                {formatMonth(monthWithHighestSpending.month)}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <Calendar size={20} className="text-primary-600" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Period selector */}
      <div className="mb-4 flex justify-end">
        <div className="inline-flex rounded-lg border border-neutral-200 bg-white">
          <button
            className={`px-3 py-1 text-sm ${selectedPeriod === '1m' ? 'bg-primary-500 text-neutral-900' : 'text-neutral-600'}`}
            onClick={() => setSelectedPeriod('1m')}
          >
            1M
          </button>
          <button
            className={`px-3 py-1 text-sm ${selectedPeriod === '3m' ? 'bg-primary-500 text-neutral-900' : 'text-neutral-600'}`}
            onClick={() => setSelectedPeriod('3m')}
          >
            3M
          </button>
          <button
            className={`px-3 py-1 text-sm ${selectedPeriod === '6m' ? 'bg-primary-500 text-neutral-900' : 'text-neutral-600'}`}
            onClick={() => setSelectedPeriod('6m')}
          >
            6M
          </button>
          <button
            className={`px-3 py-1 text-sm ${selectedPeriod === '1y' ? 'bg-primary-500 text-neutral-900' : 'text-neutral-600'}`}
            onClick={() => setSelectedPeriod('1y')}
          >
            1Y
          </button>
        </div>
      </div>
      
      {/* Monthly spending chart */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Monthly Spending</h2>
        <SpendingChart data={mockMonthlySpending} />
      </Card>
      
      {/* Category breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 lg:col-span-1">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Expense Breakdown</h2>
          <CategoryBreakdown data={mockCategoryTotals} />
        </Card>
        
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Expense by Category</h2>
          <div className="mt-4 space-y-4">
            {mockCategoryTotals.map((category) => (
              <div key={category.category} className="flex items-center">
                <div className="w-32 capitalize text-sm">
                  {category.category}
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-neutral-100 rounded-full">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${category.percentage}%`,
                        backgroundColor: category.category === 'mobile' ? '#3B82F6' :
                                        category.category === 'utility' ? '#10B981' :
                                        category.category === 'debt' ? '#EF4444' :
                                        category.category === 'subscription' ? '#8B5CF6' :
                                        category.category === 'internet' ? '#EC4899' :
                                        category.category === 'insurance' ? '#F59E0B' : '#6B7280',
                      }}
                    />
                  </div>
                </div>
                <div className="w-24 text-right">
                  <span className="font-medium">{formatCurrency(category.total)}</span>
                </div>
                <div className="w-16 text-right">
                  <span className="text-neutral-500 text-sm">{category.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Insights */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Insights & Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-50 p-4 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-2">Spending Patterns</h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-2 flex-shrink-0">
                  1
                </span>
                <span>Your {topCategory.category} expenses account for {topCategory.percentage}% of your total spending.</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-2 flex-shrink-0">
                  2
                </span>
                <span>Your highest spending month was {formatMonth(monthWithHighestSpending.month)} with {formatCurrency(monthWithHighestSpending.total)}.</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-2 flex-shrink-0">
                  3
                </span>
                <span>You consistently spend more on utilities during winter months.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-neutral-50 p-4 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-2">Recommendations</h3>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-2 flex-shrink-0">
                  1
                </span>
                <span>Consider bundling your mobile and internet services to save up to 15%.</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-2 flex-shrink-0">
                  2
                </span>
                <span>Review your subscription services - you could save {formatCurrency(totalSpent * 0.08)} annually.</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-2 flex-shrink-0">
                  3
                </span>
                <span>Set up automatic payments to avoid late fees and improve your credit score.</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;