import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, Calendar, DollarSign, Building, Check } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { mockServices } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

const NewPayment: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceIdFromUrl = searchParams.get('service');
  
  const [selectedService, setSelectedService] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [reference, setReference] = useState('');
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    // Set selected service if provided in URL
    if (serviceIdFromUrl) {
      setSelectedService(serviceIdFromUrl);
    }
  }, [serviceIdFromUrl]);
  
  const getServiceOptions = () => {
    return mockServices.map(service => ({
      value: service.id,
      label: service.name,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate first step
      if (!selectedService || !amount) {
        // Show error (would be better with form validation)
        return;
      }
      setStep(2);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call to process payment
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success 
      setIsSuccess(true);
      
      // Reset form
      setTimeout(() => {
        navigate('/payments');
      }, 2000);
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const selectedServiceObj = mockServices.find(s => s.id === selectedService);
  
  // Render success screen
  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="h-16 w-16 bg-success-500 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-success-500" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">
              Payment Successful
            </h1>
            <p className="text-neutral-600">
              Your payment has been processed successfully
            </p>
          </div>
          
          <Card className="mb-6">
            <div className="p-4 border-b border-neutral-100">
              <h2 className="font-medium text-neutral-900">Payment Details</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-neutral-500">Service</span>
                <span className="font-medium text-neutral-900">{selectedServiceObj?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Amount</span>
                <span className="font-medium text-neutral-900">{formatCurrency(parseFloat(amount))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Date</span>
                <span className="font-medium text-neutral-900">{new Date(date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Reference</span>
                <span className="font-medium text-neutral-900">{reference || 'N/A'}</span>
              </div>
            </div>
          </Card>
          
          <div className="flex space-x-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate('/payments/new')}
            >
              Make Another Payment
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate('/payments')}
            >
              View Payments
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 md:text-3xl">
            New Payment
          </h1>
          <p className="text-neutral-600 mt-1">
            Make a new payment to a service
          </p>
        </div>
      </div>
      
      <div className="max-w-md mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-500 text-neutral-900' : 'bg-neutral-200 text-neutral-500'}`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-primary-500' : 'bg-neutral-200'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-500 text-neutral-900' : 'bg-neutral-200 text-neutral-500'}`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium text-neutral-900">Service &amp; Amount</span>
            <span className="text-sm font-medium text-neutral-900">Review &amp; Pay</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <Card className="mb-6">
              <div className="p-6 space-y-6">
                <Select
                  label="Select Service"
                  options={getServiceOptions()}
                  value={selectedService}
                  onChange={setSelectedService}
                  required
                />
                
                <Input
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  icon={<DollarSign size={18} />}
                />
                
                <Input
                  label="Payment Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  icon={<Calendar size={18} />}
                />
                
                <Input
                  label="Reference (Optional)"
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g., Invoice #12345"
                  icon={<Building size={18} />}
                />
                
                <div className="flex items-center">
                  <input
                    id="save-template"
                    type="checkbox"
                    checked={saveAsTemplate}
                    onChange={(e) => setSaveAsTemplate(e.target.checked)}
                    className="h-4 w-4 text-primary-500 rounded border-neutral-300 focus:ring-primary-500"
                  />
                  <label htmlFor="save-template" className="ml-2 block text-sm text-neutral-700">
                    Save as payment template
                  </label>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="mb-6">
              <div className="p-4 border-b border-neutral-100">
                <h2 className="font-medium text-neutral-900">Review Payment</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                  <div>
                    <p className="text-sm text-neutral-500">Service</p>
                    <p className="font-medium text-neutral-900">{selectedServiceObj?.name}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <CreditCard size={20} className="text-primary-600" />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-500">Amount</span>
                  <span className="font-medium text-neutral-900">{formatCurrency(parseFloat(amount))}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-500">Date</span>
                  <span className="font-medium text-neutral-900">{new Date(date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-500">Reference</span>
                  <span className="font-medium text-neutral-900">{reference || 'N/A'}</span>
                </div>
                
                <div className="border-t border-neutral-100 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-900">Total</span>
                    <span className="font-bold text-neutral-900">{formatCurrency(parseFloat(amount))}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          <div className="flex space-x-4">
            {step === 1 ? (
              <>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  type="submit"
                >
                  Continue
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Confirm Payment
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPayment;