import React, { useState } from 'react';
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
  { href: '/', label: 'Dashboard', icon: HomeIcon },
  { href: '/tickets', label: 'Support Tickets', icon: Ticket },
  { href: '/help', label: 'Help Center', icon: HelpCircle },
  { href: '/billing', label: 'Billing & Invoices', icon: CreditCard },
  { href: '/account', label: 'My Account', icon: User },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/chat', label: 'Live Chat', icon: MessageSquare },
  { href: '/downloads', label: 'Downloads', icon: Download },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
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

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    itemsPerPage: 25
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to the backend
    alert('Settings saved successfully!');
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            value={profile.firstName}
            onChange={(e) => setProfile({...profile, firstName: e.target.value})}
            disabled={!isEditing}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={profile.lastName}
            onChange={(e) => setProfile({...profile, lastName: e.target.value})}
            disabled={!isEditing}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            disabled={!isEditing}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
            disabled={!isEditing}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            type="text"
            value={profile.company}
            onChange={(e) => setProfile({...profile, company: e.target.value})}
            disabled={!isEditing}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <input
            type="text"
            value={profile.department}
            onChange={(e) => setProfile({...profile, department: e.target.value})}
            disabled={!isEditing}
            className="input-field"
          />
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-3">
          <button onClick={() => setIsEditing(false)} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary flex items-center space-x-2">
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      )}
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
      
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h4>
              <p className="text-sm text-gray-600">
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
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Password</h4>
          <p className="text-sm text-gray-600 mb-3">Last changed 30 days ago</p>
          <button className="btn-secondary">Change Password</button>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
          <button className="btn-primary">Enable 2FA</button>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Active Sessions</h4>
          <p className="text-sm text-gray-600 mb-3">Manage your active login sessions</p>
          <button className="btn-secondary">View Sessions</button>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
          <select
            value={preferences.theme}
            onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
            className="input-field"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
          <select
            value={preferences.language}
            onChange={(e) => setPreferences({...preferences, language: e.target.value})}
            className="input-field"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
          <select
            value={preferences.timezone}
            onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
            className="input-field"
          >
            <option value="UTC-5">UTC-5 (EST)</option>
            <option value="UTC-6">UTC-6 (CST)</option>
            <option value="UTC-7">UTC-7 (MST)</option>
            <option value="UTC-8">UTC-8 (PST)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
          <select
            value={preferences.dateFormat}
            onChange={(e) => setPreferences({...preferences, dateFormat: e.target.value})}
            className="input-field"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Integrations</h3>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Email Integration</h4>
                <p className="text-sm text-gray-600">Connect your email for ticket notifications</p>
              </div>
            </div>
            <button className="btn-secondary">Configure</button>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Phone size={20} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">SMS Integration</h4>
                <p className="text-sm text-gray-600">Receive SMS notifications for urgent tickets</p>
              </div>
            </div>
            <button className="btn-secondary">Configure</button>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Globe size={20} className="text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Webhook Integration</h4>
                <p className="text-sm text-gray-600">Connect external services via webhooks</p>
              </div>
            </div>
            <button className="btn-secondary">Configure</button>
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
      case 'preferences':
        return renderPreferencesSection();
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
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Settings
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Customer User</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <div className="card">
                  <nav className="space-y-2">
                    {settingsSections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                            activeSection === section.id
                              ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
                <div className="card">
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
