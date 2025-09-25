import React, { useState } from 'react';

interface BrandingSettings {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  welcomeMessage: string;
  companyName: string;
  theme: 'light' | 'dark' | 'auto';
}

interface BrandingSettingsProps {
  settings: BrandingSettings;
  onSettingsChange: (settings: BrandingSettings) => void;
}

const BrandingSettings: React.FC<BrandingSettingsProps> = ({ settings, onSettingsChange }) => {
  const [currentSettings, setCurrentSettings] = useState<BrandingSettings>(settings);
  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = (field: keyof BrandingSettings, value: string) => {
    const newSettings = { ...currentSettings, [field]: value };
    setCurrentSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleChange('logo', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const colorPresets = [
    { name: 'Blue', primary: '#3b82f6', secondary: '#1e40af' },
    { name: 'Green', primary: '#10b981', secondary: '#047857' },
    { name: 'Purple', primary: '#8b5cf6', secondary: '#5b21b6' },
    { name: 'Orange', primary: '#f97316', secondary: '#ea580c' },
    { name: 'Red', primary: '#ef4444', secondary: '#dc2626' },
    { name: 'Indigo', primary: '#6366f1', secondary: '#4338ca' }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
          Branding & Customization
        </h2>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Customize your portal's appearance, logo, and welcome message
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Settings Form */}
        <div>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
              Portal Settings
            </h3>

            {/* Company Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Company Name
              </label>
              <input
                type="text"
                value={currentSettings.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Welcome Message */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Welcome Message
              </label>
              <textarea
                value={currentSettings.welcomeMessage}
                onChange={(e) => handleChange('welcomeMessage', e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Logo Upload */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Logo
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {currentSettings.logo && (
                  <img
                    src={currentSettings.logo}
                    alt="Logo preview"
                    style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '6px' }}
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  style={{ fontSize: '14px' }}
                />
              </div>
            </div>

            {/* Color Scheme */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Color Scheme
              </label>
              
              {/* Color Presets */}
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>Presets</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        handleChange('primaryColor', preset.primary);
                        handleChange('secondaryColor', preset.secondary);
                      }}
                      style={{
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: preset.primary
                      }} />
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', display: 'block' }}>
                    Primary Color
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="color"
                      value={currentSettings.primaryColor}
                      onChange={(e) => handleChange('primaryColor', e.target.value)}
                      style={{ width: '40px', height: '40px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={currentSettings.primaryColor}
                      onChange={(e) => handleChange('primaryColor', e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '12px'
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', display: 'block' }}>
                    Secondary Color
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="color"
                      value={currentSettings.secondaryColor}
                      onChange={(e) => handleChange('secondaryColor', e.target.value)}
                      style={{ width: '40px', height: '40px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={currentSettings.secondaryColor}
                      onChange={(e) => handleChange('secondaryColor', e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '12px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Theme
              </label>
              <select
                value={currentSettings.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>

            {/* Preview Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="preview"
                checked={previewMode}
                onChange={(e) => setPreviewMode(e.target.checked)}
                style={{ width: '16px', height: '16px' }}
              />
              <label htmlFor="preview" style={{ fontSize: '14px', color: '#374151' }}>
                Live Preview Mode
              </label>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
              Preview
            </h3>

            {/* Portal Header Preview */}
            <div style={{
              background: `linear-gradient(135deg, ${currentSettings.primaryColor} 0%, ${currentSettings.secondaryColor} 100%)`,
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '16px',
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                {currentSettings.logo && (
                  <img
                    src={currentSettings.logo}
                    alt="Logo"
                    style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                  />
                )}
                <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
                  {currentSettings.companyName || 'Your Company'}
                </h2>
              </div>
              <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>
                {currentSettings.welcomeMessage || 'Welcome to our customer portal'}
              </p>
            </div>

            {/* Sample Cards Preview */}
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{
                background: '#ffffff',
                border: `2px solid ${currentSettings.primaryColor}20`,
                borderRadius: '8px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: currentSettings.primaryColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px'
                  }}>
                    📊
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>
                    Sample Metric
                  </h4>
                </div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                  This is how your portal elements will look with the selected colors.
                </p>
              </div>

              <div style={{
                background: '#ffffff',
                border: `1px solid ${currentSettings.secondaryColor}30`,
                borderRadius: '8px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: currentSettings.secondaryColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px'
                  }}>
                    🎫
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>
                    Sample Ticket
                  </h4>
                </div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                  Secondary color is used for accents and highlights.
                </p>
              </div>
            </div>

            {/* Theme Preview */}
            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                Theme: {currentSettings.theme}
              </h4>
              <div style={{
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: currentSettings.theme === 'dark' ? '#1f2937' : '#f9fafb',
                color: currentSettings.theme === 'dark' ? '#f9fafb' : '#1f2937',
                fontSize: '12px'
              }}>
                {currentSettings.theme === 'dark' ? 'Dark theme preview' : 
                 currentSettings.theme === 'light' ? 'Light theme preview' : 
                 'Auto theme (follows system preference)'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button
          onClick={() => setCurrentSettings(settings)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Reset
        </button>
        <button
          onClick={() => onSettingsChange(currentSettings)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default BrandingSettings;
