import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Camera,
  Shield,
  Bell,
  Globe,
  Lock,
  CreditCard,
  Settings,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  bio?: string;
  website?: string;
  joinDate: string;
  lastLogin: string;
  authMethod?: 'google' | 'email';
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
    timezone: string;
  };
  security: {
    twoFactor: boolean;
    lastPasswordChange: string;
  };
}

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize profile with user data or defaults
  const [profile, setProfile] = useState<UserProfile>({
    id: user?.id || '1',
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: user?.picture || '',
    location: 'San Francisco, CA',
    bio: 'Passionate about technology and customer satisfaction.',
    website: 'https://johndoe.com',
    joinDate: '2024-01-15',
    lastLogin: new Date().toISOString().split('T')[0],
    preferences: {
      notifications: true,
      darkMode: false,
      language: 'en',
      timezone: 'PST'
    },
    security: {
      twoFactor: false,
      lastPasswordChange: '2024-11-15'
    }
  });

  const [editProfile, setEditProfile] = useState(profile);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update profile when user data changes
  useEffect(() => {
    console.log('🔍 ProfilePage: User data changed:', user);
    if (user) {
      const updatedProfile = {
        ...profile,
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.picture || profile.avatar,
        lastLogin: new Date().toISOString().split('T')[0],
        authMethod: user.authMethod || 'email'
      };
      console.log('🔍 ProfilePage: Updated profile with user data:', updatedProfile);
      setProfile(updatedProfile);
      setEditProfile(updatedProfile);
    }
  }, [user]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create preview URL
      const imageUrl = URL.createObjectURL(file);
      
      // Update profile with new image
      const updatedProfile = { ...editProfile, avatar: imageUrl };
      setEditProfile(updatedProfile);
      
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    if (editProfile.avatar) {
      URL.revokeObjectURL(editProfile.avatar);
    }
    setEditProfile({ ...editProfile, avatar: '' });
  };

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
    setUploadSuccess(true);
    
    // Update user context with new data
    updateUser({
      name: editProfile.name,
      email: editProfile.email,
      picture: editProfile.avatar
    });
    
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleCancel = () => {
    // Clean up any uploaded image URLs
    if (editProfile.avatar && editProfile.avatar !== profile.avatar) {
      URL.revokeObjectURL(editProfile.avatar);
    }
    setEditProfile(profile);
    setIsEditing(false);
    setUploadError(null);
    setUploadSuccess(false);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                {editProfile.avatar ? (
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={editProfile.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-12 h-12 text-white" />
                  </div>
                )}
                {isEditing && (
                  <div className="absolute -bottom-2 -right-2 flex space-x-1">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      {isUploading ? (
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                    {editProfile.avatar && (
                      <button 
                        onClick={handleRemoveImage}
                        className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editProfile.name}
                      onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
                      className="text-3xl font-bold text-slate-800 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      value={editProfile.email}
                      onChange={(e) => setEditProfile({...editProfile, email: e.target.value})}
                      className="text-slate-600 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                    />
                    <input
                      type="text"
                      value={editProfile.location}
                      onChange={(e) => setEditProfile({...editProfile, location: e.target.value})}
                      className="text-sm text-slate-500 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">{profile.name}</h1>
                    <p className="text-slate-600 mb-1">{profile.email}</p>
                    <p className="text-slate-500 mb-1">{profile.location}</p>
                    <p className="text-sm text-slate-500">Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end space-y-4">
              {/* Upload Status Messages */}
              {uploadError && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{uploadError}</span>
                </div>
              )}
              {uploadSuccess && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Image uploaded successfully!</span>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex space-x-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-lg"
                    >
                      <Save className="w-5 h-5" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors shadow-lg"
                    >
                      <X className="w-5 h-5" />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <Edit className="w-5 h-5" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'personal' 
                      ? 'bg-blue-100 text-blue-700 font-semibold' 
                      : 'text-slate-600 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-5 h-5 inline mr-3" />
                  Personal Info
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'preferences' 
                      ? 'bg-blue-100 text-blue-700 font-semibold' 
                      : 'text-slate-600 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="w-5 h-5 inline mr-3" />
                  Preferences
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'security' 
                      ? 'bg-blue-100 text-blue-700 font-semibold' 
                      : 'text-slate-600 hover:bg-gray-100'
                  }`}
                >
                  <Shield className="w-5 h-5 inline mr-3" />
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'notifications' 
                      ? 'bg-blue-100 text-blue-700 font-semibold' 
                      : 'text-slate-600 hover:bg-gray-100'
                  }`}
                >
                  <Bell className="w-5 h-5 inline mr-3" />
                  Notifications
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editProfile.name}
                          onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                          <User className="w-5 h-5 text-slate-500" />
                          <span className="text-slate-800">{profile.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editProfile.email}
                          onChange={(e) => setEditProfile({...editProfile, email: e.target.value})}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                          <Mail className="w-5 h-5 text-slate-500" />
                          <span className="text-slate-800">{profile.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editProfile.phone}
                          onChange={(e) => setEditProfile({...editProfile, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                          <Phone className="w-5 h-5 text-slate-500" />
                          <span className="text-slate-800">{profile.phone}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editProfile.location}
                          onChange={(e) => setEditProfile({...editProfile, location: e.target.value})}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                          <MapPin className="w-5 h-5 text-slate-500" />
                          <span className="text-slate-800">{profile.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Member Since</label>
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                        <Calendar className="w-5 h-5 text-slate-500" />
                        <span className="text-slate-800">{new Date(profile.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Last Login</label>
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                        <Calendar className="w-5 h-5 text-slate-500" />
                        <span className="text-slate-800">{new Date(profile.lastLogin).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Login Credentials */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Login Credentials</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Login Method</label>
                          <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-blue-200">
                            {profile.authMethod === 'google' ? (
                              <>
                                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">G</span>
                                </div>
                                <div>
                                  <span className="text-slate-800 font-medium">Google Account</span>
                                  <p className="text-xs text-slate-500">Authenticated via Google OAuth</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                  <Mail className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <span className="text-slate-800 font-medium">Email Account</span>
                                  <p className="text-xs text-slate-500">Authenticated via email/password</p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Account Status</label>
                          <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-blue-200">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <span className="text-slate-800 font-medium">Verified Account</span>
                              <p className="text-xs text-slate-500">Your account is verified and secure</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-white rounded-xl border border-blue-200">
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Account Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">User ID:</span>
                            <span className="text-slate-800 font-mono">{profile.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Email:</span>
                            <span className="text-slate-800">{profile.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Last Login:</span>
                            <span className="text-slate-800">{new Date(profile.lastLogin).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Profile Information */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Additional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
                        {isEditing ? (
                          <textarea
                            value={editProfile.bio || ''}
                            onChange={(e) => setEditProfile({...editProfile, bio: e.target.value})}
                            placeholder="Tell us about yourself..."
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          />
                        ) : (
                          <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-slate-800">{profile.bio || 'No bio added yet'}</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Website</label>
                        {isEditing ? (
                          <input
                            type="url"
                            value={editProfile.website || ''}
                            onChange={(e) => setEditProfile({...editProfile, website: e.target.value})}
                            placeholder="https://yourwebsite.com"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                            <Globe className="w-5 h-5 text-slate-500" />
                            <span className="text-slate-800">{profile.website || 'No website added'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <Bell className="w-6 h-6 text-slate-600" />
                        <div>
                          <h3 className="font-semibold text-slate-800">Email Notifications</h3>
                          <p className="text-sm text-slate-600">Receive notifications about ticket updates and system alerts</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profile.preferences.notifications}
                          onChange={(e) => setProfile({
                            ...profile,
                            preferences: {...profile.preferences, notifications: e.target.checked}
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <Globe className="w-6 h-6 text-slate-600" />
                        <div>
                          <h3 className="font-semibold text-slate-800">Dark Mode</h3>
                          <p className="text-sm text-slate-600">Switch between light and dark themes</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profile.preferences.darkMode}
                          onChange={(e) => setProfile({
                            ...profile,
                            preferences: {...profile.preferences, darkMode: e.target.checked}
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Language</label>
                        <select
                          value={profile.preferences.language}
                          onChange={(e) => setProfile({
                            ...profile,
                            preferences: {...profile.preferences, language: e.target.value}
                          })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Timezone</label>
                        <select
                          value={profile.preferences.timezone}
                          onChange={(e) => setProfile({
                            ...profile,
                            preferences: {...profile.preferences, timezone: e.target.value}
                          })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="PST">Pacific Standard Time</option>
                          <option value="MST">Mountain Standard Time</option>
                          <option value="CST">Central Standard Time</option>
                          <option value="EST">Eastern Standard Time</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <Shield className="w-6 h-6 text-slate-600" />
                        <div>
                          <h3 className="font-semibold text-slate-800">Two-Factor Authentication</h3>
                          <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          profile.security.twoFactor 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {profile.security.twoFactor ? 'Enabled' : 'Disabled'}
                        </span>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          {profile.security.twoFactor ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <Lock className="w-6 h-6 text-slate-600" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">Password</h3>
                          <p className="text-sm text-slate-600">Last changed on {new Date(profile.security.lastPasswordChange).toLocaleDateString()}</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Change Password
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <CreditCard className="w-6 h-6 text-slate-600" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">Payment Methods</h3>
                          <p className="text-sm text-slate-600">Manage your payment information</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Notification Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-slate-800">Ticket Updates</h3>
                        <p className="text-sm text-slate-600">Get notified when your tickets are updated</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-slate-800">System Alerts</h3>
                        <p className="text-sm text-slate-600">Receive important system notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-slate-800">Marketing Emails</h3>
                        <p className="text-sm text-slate-600">Receive updates about new features and promotions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
