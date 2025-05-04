import React from 'react';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {isAuthenticated && <Header />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {isAuthenticated && (
        <footer className="bg-white border-t border-neutral-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <p className="text-sm text-neutral-500">
                © {new Date().getFullYear()} AllPay. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900">Privacy</a>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900">Terms</a>
                <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;