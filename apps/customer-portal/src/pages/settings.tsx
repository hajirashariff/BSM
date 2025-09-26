import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Home as HomeIcon, 
  Ticket, 
  HelpCircle,
  CreditCard,
  User,
  FileText,
  MessageSquare,
  Download,
  Settings as SettingsIcon,
  Bell,
  Search,
  Plus,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Activity,
  Filter,
  SortAsc,
  ExternalLink,
  Star,
  Eye,
  ThumbsUp,
  Calendar,
  Save,
  Edit,
  Trash2,
  Shield,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/tickets', label: 'Support Tickets', icon: Ticket },
  { href: '/help', label: 'Help Center', icon: HelpCircle },
  { href: '/account', label: 'My Account', icon: User },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Activity },
];

export default function SettingsPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    department: 'IT',
    role: 'System Administrator'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    ticketUpdates: true,
    serviceAlerts: true,
    knowledgeUpdates: false,
    weeklyDigest: true
  });


  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    lastPasswordChange: '2024-01-15',
    activeSessions: 3
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    const newPassword = prompt('Enter new password:');
    if (newPassword && newPassword.length >= 8) {
      setSaving(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSecurity(prev => ({ ...prev, lastPasswordChange: new Date().toISOString().split('T')[0] }));
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to change password. Please try again.' });
        setTimeout(() => setMessage(null), 3000);
      } finally {
        setSaving(false);
      }
    } else if (newPassword) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long.' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handle2FAToggle = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSecurity(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }));
      setMessage({ 
        type: 'success', 
        text: `Two-factor authentication ${security.twoFactorEnabled ? 'disabled' : 'enabled'} successfully!` 
      });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update 2FA settings. Please try again.' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleIntegrationConfigure = (integration: string) => {
    setMessage({ type: 'success', text: `${integration} configuration opened!` });
    setTimeout(() => setMessage(null), 3000);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  const MessageNotification = () => {
    if (!message) return null;
    
    return (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        message.type === 'success' 
          ? 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700'
          : 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700'
      }`}>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}></div>
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      </div>
    );
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Profile Information</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-secondary flex items-center space-x-2"
        >
          <Edit size={16} />
          <span>{isEditing ? 'Cancel' : 'Edit'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">First Name</label>
          <input
            type="text"
            value={profile.firstName}
            onChange={(e) => setProfile({...profile, firstName: e.target.value})}
            disabled={!isEditing}
            className="input-field dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Last Name</label>
          <input
            type="text"
            value={profile.lastName}
            onChange={(e) => setProfile({...profile, lastName: e.target.value})}
            disabled={!isEditing}
            className="input-field dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            disabled={!isEditing}
            className="input-field dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Phone</label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
            disabled={!isEditing}
            className="input-field dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Company</label>
          <input
            type="text"
            value={profile.company}
            onChange={(e) => setProfile({...profile, company: e.target.value})}
            disabled={!isEditing}
            className="input-field dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Department</label>
          <input
            type="text"
            value={profile.department}
            onChange={(e) => setProfile({...profile, department: e.target.value})}
            disabled={!isEditing}
            className="input-field dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          />
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-3">
          <button 
            onClick={() => setIsEditing(false)} 
            className="btn-secondary"
            disabled={saving}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="btn-primary flex items-center space-x-2"
            disabled={saving}
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Notification Preferences</h3>
      
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-zinc-100 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h4>
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                {key === 'emailNotifications' && 'Receive notifications via email'}
                {key === 'smsNotifications' && 'Receive notifications via SMS'}
                {key === 'ticketUpdates' && 'Get notified about ticket status changes'}
                {key === 'serviceAlerts' && 'Receive service outage and maintenance alerts'}
                {key === 'knowledgeUpdates' && 'Get notified about new knowledge base articles'}
                {key === 'weeklyDigest' && 'Receive weekly summary of activities'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-zinc-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <Bell size={20} className="text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100">Notification Frequency</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              You can adjust how often you receive notifications. Changes will take effect immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-zinc-100 mb-2">Password</h4>
              <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">
                Last changed {new Date(security.lastPasswordChange).toLocaleDateString()}
              </p>
            </div>
            <button 
              onClick={handlePasswordChange}
              className="btn-secondary"
              disabled={saving}
            >
              {saving ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-zinc-100 mb-2">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">
                Add an extra layer of security to your account
              </p>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${security.twoFactorEnabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-600 dark:text-zinc-400">
                  {security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
            <button 
              onClick={handle2FAToggle}
              className={`${security.twoFactorEnabled ? 'btn-secondary' : 'btn-primary'}`}
              disabled={saving}
            >
              {saving ? 'Updating...' : security.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-zinc-100 mb-2">Active Sessions</h4>
              <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">
                Manage your active login sessions ({security.activeSessions} active)
              </p>
            </div>
            <button 
              onClick={() => setMessage({ type: 'success', text: 'Sessions management opened!' })}
              className="btn-secondary"
            >
              View Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );


  const renderIntegrationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Integrations</h3>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Mail size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-zinc-100">Email Integration</h4>
                <p className="text-sm text-gray-600 dark:text-zinc-400">Connect your email for ticket notifications</p>
              </div>
            </div>
            <button 
              onClick={() => handleIntegrationConfigure('Email')}
              className="btn-secondary"
            >
              Configure
            </button>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Phone size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-zinc-100">SMS Integration</h4>
                <p className="text-sm text-gray-600 dark:text-zinc-400">Receive SMS notifications for urgent tickets</p>
              </div>
            </div>
            <button 
              onClick={() => handleIntegrationConfigure('SMS')}
              className="btn-secondary"
            >
              Configure
            </button>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Globe size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-zinc-100">Webhook Integration</h4>
                <p className="text-sm text-gray-600 dark:text-zinc-400">Connect external services via webhooks</p>
              </div>
            </div>
            <button 
              onClick={() => handleIntegrationConfigure('Webhook')}
              className="btn-secondary"
            >
              Configure
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'notifications':
        return renderNotificationsSection();
      case 'security':
        return renderSecuritySection();
      case 'integrations':
        return renderIntegrationsSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <>
      <Head>
        <title>Settings - BSM Customer Portal</title>
        <meta name="description" content="Manage your account settings and preferences" />
      </Head>

      <MessageNotification />
      
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BSM</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-zinc-100">Customer Portal</h1>
            </div>
          </div>
          
          <nav className="px-4 pb-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const active = router.pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                        active 
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

        </aside>

        {/* Main Content */}
        <div className="ml-64">
          {/* Header */}
          <header className="bg-white dark:bg-zinc-900 shadow-sm border-b border-gray-200 dark:border-zinc-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                  Settings
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-zinc-700 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">Customer User</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <div className="card dark:bg-zinc-900 dark:border-zinc-800">
                  <nav className="space-y-2">
                    {settingsSections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                            activeSection === section.id
                              ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600 dark:bg-primary-900 dark:text-primary-300 dark:border-primary-400' 
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                          }`}
                        >
                          <Icon size={20} />
                          <span className="font-medium">{section.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-3">
                <div className="card dark:bg-zinc-900 dark:border-zinc-800">
                  {renderActiveSection()}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
