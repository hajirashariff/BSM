import React, { useState } from 'react';
import { 
  Palette, 
  Upload, 
  Eye, 
  EyeOff, 
  Save,
  Info,
  Image,
  Paintbrush
} from 'lucide-react';

export default function BrandingSettings() {
  const [appTitle, setAppTitle] = useState('BSM Portal');
  const [portalTitle, setPortalTitle] = useState('Business Service Management');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [accentColor, setAccentColor] = useState('#10B981');
  const [announcementText, setAnnouncementText] = useState('Welcome to our enhanced BSM portal!');
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);
  const [showColorPreview, setShowColorPreview] = useState(true);

  const handleSave = () => {
    console.log('Saving branding settings:', {
      appTitle,
      portalTitle,
      primaryColor,
      accentColor,
      announcementText,
      announcementEnabled
    });
    alert('Branding settings saved! (Mock)');
  };

  return (
    <div className="space-y-6">
      {/* App Titles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">App Title</label>
          <input
            type="text"
            value={appTitle}
            onChange={(e) => setAppTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter app title"
          />
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Portal Title</label>
          <input
            type="text"
            value={portalTitle}
            onChange={(e) => setPortalTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter portal title"
          />
        </div>
      </div>

      {/* Logo Upload */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Logo Upload</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Image className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Upload Logo
              </span>
              <input type="file" className="sr-only" accept="image/*" />
            </label>
            <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 2MB</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="text-gray-400" size={16} />
          <span className="text-sm text-gray-500">Preview disabled - coming soon</span>
        </div>
      </div>

      {/* Color Theme */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-900">Color Theme</h3>
          <button
            onClick={() => setShowColorPreview(!showColorPreview)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {showColorPreview ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Primary Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Accent Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Color Preview */}
        {showColorPreview && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Color Preview</h4>
            <div className="flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: primaryColor }}
              >
                Primary
              </div>
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: accentColor }}
              >
                Accent
              </div>
              <div className="text-sm text-gray-600">
                <p>Primary: {primaryColor}</p>
                <p>Accent: {accentColor}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Announcement Banner */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Announcement Banner</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={announcementEnabled}
              onChange={(e) => setAnnouncementEnabled(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Banner Text</label>
          <textarea
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter announcement text"
          />
        </div>

        {/* Banner Preview */}
        {announcementEnabled && announcementText && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Preview</h4>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded">
              {announcementText}
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          className="btn-primary flex items-center space-x-2"
        >
          <Save size={20} />
          <span>Save Branding Settings</span>
        </button>
      </div>
    </div>
  );
}

