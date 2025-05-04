import React, { useState } from 'react';
import { Mail, User, Key, CreditCard, Bell, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';

const Account: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile form state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success notification would go here
    } catch (error) {
      // Error handling would go here
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      // Show error message
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success notification would go here
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      // Error handling would go here
    } finally {
      setIsSaving(false);
    }
  };
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 md:text-3xl">
            Account Settings
          </h1>
          <p className="text-neutral-600 mt-1">
            Manage your profile and preferences
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="p-6">
            <div className="flex flex-col items-center mb-6">
              <Avatar 
                src={user?.avatar} 
                alt={user?.name || 'User'} 
                size="lg" 
                className="mb-4"
              />
              <h3 className="font-medium text-neutral-900 text-center">{user?.name}</h3>
              <p className="text-sm text-neutral-500 text-center mt-1">{user?.email}</p>
            </div>
            
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg w-full
                    ${activeTab === tab.id 
                      ? 'text-neutral-900 bg-primary-100' 
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'}
                  `}
                >
                  <tab.icon size={18} className="mr-2" />
                  {tab.label}
                </button>
              ))}
              
              <button
                onClick={() => logout()}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-lg w-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              >
                <LogOut size={18} className="mr-2" />
                Sign out
              </button>
            </nav>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-3">
          {activeTab === 'profile' && (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Profile Information</h2>
              
              <form onSubmit={handleSaveProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Profile Photo
                    </label>
                    <div className="flex items-center">
                      <Avatar 
                        src={user?.avatar} 
                        alt={user?.name || 'User'} 
                        size="md" 
                        className="mr-4"
                      />
                      <div>
                        <Button variant="outline" size="sm" className="mb-2">
                          Change Photo
                        </Button>
                        <p className="text-xs text-neutral-500">
                          JPG, GIF or PNG. Max size of 800K
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Input
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={<User size={18} />}
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail size={18} />}
                  />
                  
                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isSaving}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </form>
              
              <div className="border-t border-neutral-200 pt-6 mt-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Delete Account</h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="outline" className="text-error-500 border-error-500 hover:bg-error-50">
                  Delete Account
                </Button>
              </div>
            </Card>
          )}
          
          {activeTab === 'security' && (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Security Settings</h2>
              
              <form onSubmit={handleChangePassword} className="mb-8">
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Change Password</h3>
                
                <Input
                  label="Current Password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  icon={<Key size={18} />}
                  className="mb-4"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Input
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    icon={<Key size={18} />}
                  />
                  
                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    icon={<Key size={18} />}
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSaving}
                >
                  Update Password
                </Button>
              </form>
              
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Two-Factor Authentication</h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button variant="outline">
                  Enable 2FA
                </Button>
              </div>
            </Card>
          )}
          
          {activeTab === 'payment-methods' && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-900">Payment Methods</h2>
                <Button variant="primary" size="sm">
                  Add Payment Method
                </Button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="border border-neutral-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                      <CreditCard size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Visa ending in 4242</p>
                      <p className="text-sm text-neutral-500">Expires 12/2025</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full mr-3">Default</span>
                    <Button variant="text" size="sm" className="text-neutral-600">
                      Edit
                    </Button>
                  </div>
                </div>
                
                <div className="border border-neutral-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center mr-3">
                      <CreditCard size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Mastercard ending in 8888</p>
                      <p className="text-sm text-neutral-500">Expires 08/2024</p>
                    </div>
                  </div>
                  <div>
                    <Button variant="text" size="sm" className="text-neutral-600">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Billing Address</h3>
                <p className="text-neutral-600 mb-4">
                  123 Main Street<br />
                  Apt 4B<br />
                  San Francisco, CA 94107<br />
                  United States
                </p>
                <Button variant="outline" size="sm">
                  Update Address
                </Button>
              </div>
            </Card>
          )}
          
          {activeTab === 'notifications' && (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-neutral-900 mb-3">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-neutral-900">Payment Confirmations</p>
                        <p className="text-sm text-neutral-500">Receive emails for payment confirmations</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="payment-confirmations" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                        <label htmlFor="payment-confirmations" className="toggle-label block overflow-hidden h-6 rounded-full bg-neutral-300 cursor-pointer"></label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-neutral-900">Payment Reminders</p>
                        <p className="text-sm text-neutral-500">Receive reminders for upcoming payments</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="payment-reminders" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                        <label htmlFor="payment-reminders" className="toggle-label block overflow-hidden h-6 rounded-full bg-neutral-300 cursor-pointer"></label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-neutral-900">Account Updates</p>
                        <p className="text-sm text-neutral-500">Receive emails about your account</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="account-updates" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                        <label htmlFor="account-updates" className="toggle-label block overflow-hidden h-6 rounded-full bg-neutral-300 cursor-pointer"></label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-neutral-900">Marketing</p>
                        <p className="text-sm text-neutral-500">Receive marketing and promotional emails</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="marketing" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                        <label htmlFor="marketing" className="toggle-label block overflow-hidden h-6 rounded-full bg-neutral-300 cursor-pointer"></label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 pt-6">
                  <h3 className="text-md font-medium text-neutral-900 mb-3">Push Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-neutral-900">Payment Alerts</p>
                        <p className="text-sm text-neutral-500">Receive push notifications for payments</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="push-payments" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                        <label htmlFor="push-payments" className="toggle-label block overflow-hidden h-6 rounded-full bg-neutral-300 cursor-pointer"></label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-neutral-900">Due Date Reminders</p>
                        <p className="text-sm text-neutral-500">Get reminders before payment due dates</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="push-reminders" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                        <label htmlFor="push-reminders" className="toggle-label block overflow-hidden h-6 rounded-full bg-neutral-300 cursor-pointer"></label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="primary">
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;