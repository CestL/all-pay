import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronRight, Wallet, Sparkles, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ServiceCard from '../components/dashboard/ServiceCard';
import PaymentCard from '../components/dashboard/PaymentCard';
import { mockServices, mockPayments } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Get pending payments
  const pendingPayments = mockPayments
    .filter(p => p.status === 'pending')
    .slice(0, 3);
  
  // Get recent payments
  const recentPayments = mockPayments
    .filter(p => p.status === 'completed')
    .slice(0, 5);
  
  // Calculate total spent this month
  const currentMonth = new Date().toISOString().substring(0, 7);
  const thisMonthPayments = mockPayments.filter(p => 
    p.date.startsWith(currentMonth) && p.status === 'completed'
  );
  const totalThisMonth = thisMonthPayments.reduce(
    (sum, payment) => sum + payment.amount, 
    0
  );
  
  // Calculate pending amount
  const pendingAmount = pendingPayments.reduce(
    (sum, payment) => sum + payment.amount, 
    0
  );
  
  const handlePaymentClick = (paymentId: string) => {
    // In a real app, navigate to payment details
    console.log('View payment details:', paymentId);
  };
  
  const handleServiceClick = (serviceId: string) => {
    // In a real app, navigate to make payment for this service
    navigate(`/payments/new?service=${serviceId}`);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 md:text-3xl">
            Welcome back, {user?.name.split(' ')[0]}
          </h1>
          <p className="text-neutral-600 mt-1">
            Here's an overview of your payments
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
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-neutral-600 text-sm">This Month</p>
              <h3 className="text-2xl font-bold text-neutral-900 mt-1">
                {formatCurrency(totalThisMonth)}
              </h3>
              <p className="text-neutral-500 text-sm mt-1">
                Total payments
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <Wallet size={20} className="text-primary-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-neutral-600 text-sm">Pending</p>
              <h3 className="text-2xl font-bold text-neutral-900 mt-1">
                {formatCurrency(pendingAmount)}
              </h3>
              <p className="text-neutral-500 text-sm mt-1">
                {pendingPayments.length} upcoming payments
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <CreditCard size={20} className="text-primary-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-neutral-600 text-sm">Potential Savings</p>
              <h3 className="text-2xl font-bold text-neutral-900 mt-1">
                {formatCurrency(totalThisMonth * 0.08)}
              </h3>
              <p className="text-neutral-500 text-sm mt-1">
                With recommended services
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <Sparkles size={20} className="text-primary-600" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Pending payments */}
      {pendingPayments.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-neutral-900">Pending Payments</h2>
            <Button
              variant="text"
              size="sm"
              icon={<ChevronRight size={16} />}
              onClick={() => navigate('/payments')}
              className="text-neutral-600"
            >
              View all
            </Button>
          </div>
          
          <div className="space-y-3">
            {pendingPayments.map((payment) => (
              <PaymentCard
                key={payment.id}
                payment={payment}
                onClick={() => handlePaymentClick(payment.id)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Services */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-neutral-900">Services</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mockServices.slice(0, 10).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => handleServiceClick(service.id)}
            />
          ))}
          <Card
            hoverable
            onClick={() => navigate('/services')}
            className="flex flex-col items-center justify-center p-4 h-full"
          >
            <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center mb-2">
              <Plus size={20} className="text-neutral-600" />
            </div>
            <span className="text-sm text-neutral-600">Add new</span>
          </Card>
        </div>
      </div>
      
      {/* Recent activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-neutral-900">Recent Activity</h2>
          <Button
            variant="text"
            size="sm"
            icon={<ChevronRight size={16} />}
            onClick={() => navigate('/payments/history')}
            className="text-neutral-600"
          >
            View all
          </Button>
        </div>
        
        <Card className="overflow-hidden">
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {recentPayments.map((payment) => (
                  <tr 
                    key={payment.id}
                    className="hover:bg-neutral-50 cursor-pointer"
                    onClick={() => handlePaymentClick(payment.id)}
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
                          <div className="text-xs text-neutral-500">
                            {payment.reference}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {new Date(payment.date).toLocaleDateString()}
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
                      <span className={`
                        px-2 py-1 text-xs rounded-full
                        ${payment.status === 'completed' 
                          ? 'bg-success-500 bg-opacity-10 text-success-500' 
                          : payment.status === 'pending'
                          ? 'bg-warning-500 bg-opacity-10 text-warning-500'
                          : 'bg-error-500 bg-opacity-10 text-error-500'
                        }
                      `}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;