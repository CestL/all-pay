import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, CreditCard, Home, BarChart3, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Account', href: '/account', icon: User },
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-2">
                  <CreditCard size={18} className="text-neutral-900" />
                </div>
                <span className="text-xl font-bold text-neutral-900">AllPay</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg
                    ${isActive 
                      ? 'text-neutral-900 bg-primary-100' 
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'}
                  `}
                >
                  <item.icon size={18} className="mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          {/* User section */}
          <div className="flex items-center">
            {/* Notifications */}
            <button className="p-2 rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100">
              <Bell size={20} />
            </button>
            
            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={toggleMenu}
                  className="flex items-center focus:outline-none"
                >
                  <Avatar src={user?.avatar} alt={user?.name || 'User'} size="sm" />
                </button>
              </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden ml-2">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
              
              {/* Dropdown menu */}
              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-dropdown bg-white ring-1 ring-black ring-opacity-5 animate-fadeIn">
                  <div className="py-1">
                    {/* User info (desktop only) */}
                    <div className="hidden md:block px-4 py-2 border-b border-neutral-100">
                      <div className="font-medium text-neutral-900">{user?.name}</div>
                      <div className="text-sm text-neutral-500">{user?.email}</div>
                    </div>
                    
                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <item.icon size={16} className="mr-3" />
                          {item.name}
                        </Link>
                      ))}
                      <div className="border-t border-neutral-100 my-1"></div>
                    </div>
                    
                    {/* Logout (both views) */}
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    >
                      <LogOut size={16} className="mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;