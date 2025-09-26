import React, { useState } from 'react';
import { 
  Globe, 
  Languages, 
  Info, 
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function LocalizationSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [dynamicTranslation, setDynamicTranslation] = useState(false);
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [currency, setCurrency] = useState('INR');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', flag: '🇮🇳' }
  ];

  const timezones = [
    'Asia/Kolkata',
    'Asia/Dubai',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];

  const dateFormats = [
    'DD/MM/YYYY',
    'MM/DD/YYYY',
    'YYYY-MM-DD',
    'DD-MM-YYYY',
    'MM-DD-YYYY'
  ];

  const currencies = [
    'INR',
    'USD',
    'EUR',
    'GBP',
    'AED',
    'JPY'
  ];

  const handleSave = () => {
    console.log('Saving localization settings:', {
      selectedLanguage,
      dynamicTranslation,
      timezone,
      dateFormat,
      currency
    });
    alert('Localization settings saved! (Mock)');
  };

  return (
    <div className="space-y-6">
      {/* Language Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-900">Language Settings</h3>
          <div className="group relative">
            <Info className="text-gray-400 cursor-help" size={16} />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Select the primary language for your portal
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Primary Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Dynamic Translation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">Multi-Language Support</h3>
            <div className="group relative">
              <Info className="text-gray-400 cursor-help" size={16} />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Enable automatic translation for user-generated content
              </div>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={dynamicTranslation}
              onChange={(e) => setDynamicTranslation(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-blue-600 mt-0.5" size={16} />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Dynamic Translation Feature</p>
              <p className="mt-1">When enabled, user-generated content will be automatically translated based on user preferences. This feature requires additional setup and API configuration.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Regional Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Date Format</label>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {dateFormats.map((format) => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500">Example: {new Date().toLocaleDateString('en-IN')}</p>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500">Used for financial displays</p>
          </div>
        </div>
      </div>

      {/* Language Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Language Preview</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Current Language</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Home:</strong> Home</p>
                <p><strong>Tickets:</strong> Tickets</p>
                <p><strong>Settings:</strong> Settings</p>
                <p><strong>Users:</strong> Users</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Language Preview</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Home:</strong> {selectedLanguage === 'hi' ? 'होम' : selectedLanguage === 'ta' ? 'வீடு' : 'Home'}</p>
                <p><strong>Tickets:</strong> {selectedLanguage === 'hi' ? 'टिकट' : selectedLanguage === 'ta' ? 'டிக்கெட்' : 'Tickets'}</p>
                <p><strong>Settings:</strong> {selectedLanguage === 'hi' ? 'सेटिंग्स' : selectedLanguage === 'ta' ? 'அமைப்புகள்' : 'Settings'}</p>
                <p><strong>Users:</strong> {selectedLanguage === 'hi' ? 'उपयोगकर्ता' : selectedLanguage === 'ta' ? 'பயனர்கள்' : 'Users'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          className="btn-primary flex items-center space-x-2"
        >
          <Save size={20} />
          <span>Save Localization Settings</span>
        </button>
      </div>
    </div>
  );
}

