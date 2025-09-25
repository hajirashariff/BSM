import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home as HomeIcon,
  Ticket,
  HelpCircle,
  User,
  Settings as SettingsIcon,
  Bell,
  Edit,
  Save,
  Shield,
  Activity,
  Mail,
  Phone,
  Globe,
  CheckCircle,
  AlertTriangle,
  Clock,
  Calendar,
  MapPin,
  Building,
  CreditCard,
  Key,
  Eye,
  EyeOff,
  Download,
  Upload,
  Trash2,
  Plus,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  ChevronDown,
  MoreVertical,
  RefreshCw,
  LogOut,
  UserCheck,
  Lock,
  Unlock,
  History,
  FileText,
  Database,
  Server,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: HomeIcon },
  { href: '/tickets', label: 'Support Tickets', icon: Ticket },
  { href: '/help', label: 'Help Center', icon: HelpCircle },
  { href: '/account', label: 'My Account', icon: User },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

const accountSections = [
  { id: 'profile', label: 'Profile Information', icon: User },
  { id: 'security', label: 'Security & Access', icon: Shield },
  { id: 'activity', label: 'Activity Log', icon: Activity },
  { id: 'devices', label: 'Connected Devices', icon: Monitor },
  { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
  { id: 'notifications', label: 'Notification Preferences', icon: Bell },
];

const mockUserProfile = {
  id: 'USR-001',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@company.com',
  phone: '+1 (555) 123-4567',
  company: 'Acme Corporation',
  department: 'IT Department',
  role: 'System Administrator',
  title: 'Senior IT Administrator',
  location: 'New York, NY',
  timezone: 'UTC-5 (EST)',
  language: 'English',
  avatar: null,
  joinDate: '2023-01-15',
  lastLogin: '2024-01-20T10:30:00Z',
  status: 'Active',
  permissions: ['admin', 'user_management', 'ticket_management', 'system_config'],
  preferences: {
    theme: 'light',
    notifications: true,
    emailDigest: true,
    smsAlerts: false
  }
};

const mockActivityLog = [
  {
    id: 'ACT-001',
    action: 'Password Changed',
    description: 'User password was successfully updated',
    timestamp: '2024-01-20T10:30:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'Success',
    severity: 'Info'
  },
  {
    id: 'ACT-002',
    action: 'Login',
    description: 'User logged in from new device',
    timestamp: '2024-01-20T09:15:00Z',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    status: 'Success',
    severity: 'Info'
  },
  {
    id: 'ACT-003',
    action: 'Profile Updated',
    description: 'User profile information was modified',
    timestamp: '2024-01-19T14:22:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'Success',
    severity: 'Info'
  },
  {
    id: 'ACT-004',
    action: 'Failed Login Attempt',
    description: 'Invalid password entered',
    timestamp: '2024-01-19T08:45:00Z',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'Failed',
    severity: 'Warning'
  }
];

const mockDevices = [
  {
    id: 'DEV-001',
    name: 'Windows Desktop',
    type: 'Desktop',
    os: 'Windows 10',
    browser: 'Chrome 120.0',
    lastActive: '2024-01-20T10:30:00Z',
    location: 'New York, NY',
    isCurrent: true,
    status: 'Active'
  },
  {
    id: 'DEV-002',
    name: 'MacBook Pro',
    type: 'Laptop',
    os: 'macOS 14.2',
    browser: 'Safari 17.2',
    lastActive: '2024-01-19T15:45:00Z',
    location: 'New York, NY',
    isCurrent: false,
    status: 'Active'
  },
  {
    id: 'DEV-003',
    name: 'iPhone 15',
    type: 'Mobile',
    os: 'iOS 17.2',
    browser: 'Safari Mobile',
    lastActive: '2024-01-18T20:15:00Z',
    location: 'New York, NY',
    isCurrent: false,
    status: 'Inactive'
  }
];

const mockSubscriptions = [
  {
    id: 'SUB-001',
    name: 'BSM Professional',
    description: 'Full access to all BSM features and support',
    status: 'Active',
    startDate: '2023-01-15',
    endDate: '2024-01-15',
    price: '$99.00',
    billingCycle: 'Monthly',
    features: ['Unlimited Tickets', 'Priority Support', 'Advanced Analytics', 'API Access']
  },
  {
    id: 'SUB-002',
    name: 'Mobile App Access',
    description: 'Access to BSM mobile applications',
    status: 'Active',
    startDate: '2023-06-01',
    endDate: '2024-06-01',
    price: '$19.99',
    billingCycle: 'Monthly',
    features: ['Mobile Dashboard', 'Push Notifications', 'Offline Access']
  }
];

export default function AccountPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const [profile, setProfile] = useState(mockUserProfile);
  const [activityLog, setActivityLog] = useState(mockActivityLog);
  const [devices, setDevices] = useState(mockDevices);
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setTimeout(() => setMessage(null), 3000);
      setShowPasswordModal(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password. Please try again.' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDeviceRevoke = async (deviceId: string) => {
    if (window.confirm('Are you sure you want to revoke access for this device?')) {
      setDevices(prev => prev.filter(device => device.id !== deviceId));
      setMessage({ type: 'success', text: 'Device access revoked successfully!' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleExportData = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage({ type: 'success', text: 'Data export initiated. You will receive an email when ready.' });
      setTimeout(() => setMessage(null), 3000);
      setShowExportModal(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to initiate data export. Please try again.' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
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
          disabled={saving}
        >
          <Edit size={16} />
          <span>{isEditing ? 'Cancel' : 'Edit'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <div className="lg:col-span-1">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 dark:bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-4">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
              ) : (
                <User size={48} className="text-gray-400 dark:text-zinc-500" />
              )}
            </div>
            {isEditing && (
              <button className="btn-secondary text-sm">
                <Upload size={16} className="mr-2" />
                Change Photo
              </button>
            )}
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">
                {profile.firstName} {profile.lastName}
              </h4>
              <p className="text-sm text-gray-600 dark:text-zinc-400">{profile.title}</p>
              <p className="text-sm text-gray-500 dark:text-zinc-500">{profile.department}</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Job Title</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({...profile, title: e.target.value})}
                disabled={!isEditing}
                className="input-field dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({...profile, location: e.target.value})}
                disabled={!isEditing}
                className="input-field dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-3 mt-6">
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
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Security & Access</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-zinc-100">Password</h4>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Last changed 30 days ago</p>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="btn-secondary"
            >
              Change Password
            </button>
          </div>
        </div>

        <div className="card dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-zinc-100">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Add an extra layer of security</p>
            </div>
            <button className="btn-primary">
              Enable 2FA
            </button>
          </div>
        </div>

        <div className="card dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-zinc-100">Data Export</h4>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Download your account data</p>
            </div>
            <button
              onClick={() => setShowExportModal(true)}
              className="btn-secondary"
            >
              <Download size={16} className="mr-2" />
              Export Data
            </button>
          </div>
        </div>

        <div className="card dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-zinc-100">Account Deletion</h4>
              <p className="text-sm text-gray-600 dark:text-zinc-400">Permanently delete your account</p>
            </div>
            <button className="btn-secondary text-red-600 hover:text-red-700">
              <Trash2 size={16} className="mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivitySection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Activity Log</h3>
        <div className="flex items-center space-x-2">
          <button className="btn-secondary text-sm">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </button>
          <button className="btn-secondary text-sm">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="card dark:bg-zinc-900 dark:border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-zinc-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-zinc-100">Action</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-zinc-100">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-zinc-100">Timestamp</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-zinc-100">IP Address</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-zinc-100">Status</th>
              </tr>
            </thead>
            <tbody>
              {activityLog.map((activity) => (
                <tr key={activity.id} className="border-b border-gray-100 dark:border-zinc-800">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.severity === 'Warning' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <span className="font-medium text-gray-900 dark:text-zinc-100">{activity.action}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-zinc-400">{activity.description}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-zinc-400">
                    {new Date(activity.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-zinc-400">{activity.ipAddress}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      activity.status === 'Success' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDevicesSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Connected Devices</h3>
        <button className="btn-primary">
          <Plus size={16} className="mr-2" />
          Add Device
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device) => (
          <div key={device.id} className="card dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                  {device.type === 'Desktop' ? <Monitor size={20} /> : 
                   device.type === 'Laptop' ? <Monitor size={20} /> :
                   device.type === 'Mobile' ? <Smartphone size={20} /> : <Tablet size={20} />}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-zinc-100">{device.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-zinc-400">{device.os}</p>
                </div>
              </div>
              {device.isCurrent && (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full">
                  Current
                </span>
              )}
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 dark:text-zinc-400">
              <div className="flex items-center space-x-2">
                <Globe size={14} />
                <span>{device.browser}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} />
                <span>{device.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={14} />
                <span>Last active: {new Date(device.lastActive).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                device.status === 'Active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
              }`}>
                {device.status}
              </span>
              {!device.isCurrent && (
                <button
                  onClick={() => handleDeviceRevoke(device.id)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Revoke Access
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSubscriptionsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Subscriptions</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subscriptions.map((subscription) => (
          <div key={subscription.id} className="card dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-zinc-100">{subscription.name}</h4>
                <p className="text-sm text-gray-600 dark:text-zinc-400">{subscription.description}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                subscription.status === 'Active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
              }`}>
                {subscription.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-zinc-400">Price</span>
                <span className="font-medium text-gray-900 dark:text-zinc-100">{subscription.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-zinc-400">Billing Cycle</span>
                <span className="font-medium text-gray-900 dark:text-zinc-100">{subscription.billingCycle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-zinc-400">Next Billing</span>
                <span className="font-medium text-gray-900 dark:text-zinc-100">
                  {new Date(subscription.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="text-sm font-medium text-gray-900 dark:text-zinc-100 mb-2">Features</h5>
              <ul className="space-y-1">
                {subscription.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-zinc-400">
                    <CheckCircle size={14} className="text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="btn-secondary flex-1 text-sm">
                Manage
              </button>
              <button className="btn-secondary flex-1 text-sm">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Notification Preferences</h3>

      <div className="space-y-4">
        {Object.entries(profile.preferences).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-zinc-100 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h4>
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                {key === 'notifications' && 'Receive notifications about important updates'}
                {key === 'emailDigest' && 'Get daily email summaries of your activity'}
                {key === 'smsAlerts' && 'Receive SMS alerts for urgent notifications'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={(e) => setProfile({
                  ...profile, 
                  preferences: {...profile.preferences, [key]: e.target.checked}
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-zinc-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'security':
        return renderSecuritySection();
      case 'activity':
        return renderActivitySection();
      case 'devices':
        return renderDevicesSection();
      case 'subscriptions':
        return renderSubscriptionsSection();
      case 'notifications':
        return renderNotificationsSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <>
      <Head>
        <title>My Account - BSM Customer Portal</title>
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
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600 dark:bg-primary-900 dark:text-primary-300 dark:border-primary-400' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
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
                  My Account
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
              {/* Account Navigation */}
              <div className="lg:col-span-1">
                <div className="card dark:bg-zinc-900 dark:border-zinc-800">
                  <nav className="space-y-2">
                    {accountSections.map((section) => {
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

              {/* Account Content */}
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

