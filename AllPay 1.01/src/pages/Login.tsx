import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, CreditCard } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-primary-500 rounded-xl flex items-center justify-center">
            <CreditCard size={24} className="text-neutral-900" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-neutral-900">
          Sign in to AllPay
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Your centralized payment platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-error-500 bg-opacity-10 text-error-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              icon={<Mail size={18} />}
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              icon={<Lock size={18} />}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-500 rounded border-neutral-300 focus:ring-primary-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-700">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              fullWidth
              size="lg"
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" fullWidth>
                Google
              </Button>
              <Button variant="outline" fullWidth>
                Apple
              </Button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-primary-600 hover:text-primary-700">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;