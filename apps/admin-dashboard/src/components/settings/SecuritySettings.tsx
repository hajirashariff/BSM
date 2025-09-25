import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Save,
  RefreshCw,
  Smartphone,
  Mail,
  Clock
} from 'lucide-react';

export default function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [mfaSettings, setMfaSettings] = useState({
    enabled: false,
    method: 'sms', // sms, email, authenticator
    backupCodes: [] as string[]
  });

  const [sessionSettings, setSessionSettings] = useState({
    timeout: 30, // minutes
    requireReauth: false,
    maxConcurrentSessions: 3
  });

  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxAge: 90 // days
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleMfaToggle = () => {
    setMfaSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleSessionChange = (field: string, value: any) => {
    setSessionSettings(prev => ({ ...prev, [field]: value }));
  };

  const handlePolicyChange = (field: string, value: any) => {
    setPasswordPolicy(prev => ({ ...prev, [field]: value }));
  };

  const generateBackupCodes = () => {
    const codes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
    setMfaSettings(prev => ({ ...prev, backupCodes: codes }));
  };

  const validatePassword = (password: string) => {
    const checks = {
      length: password.length >= passwordPolicy.minLength,
      uppercase: passwordPolicy.requireUppercase ? /[A-Z]/.test(password) : true,
      lowercase: passwordPolicy.requireLowercase ? /[a-z]/.test(password) : true,
      numbers: passwordPolicy.requireNumbers ? /\d/.test(password) : true,
      special: passwordPolicy.requireSpecialChars ? /[!@#$%^&*(),.?":{}|<>]/.test(password) : true
    };
    return checks;
  };

  const passwordChecks = validatePassword(passwordForm.newPassword);

  return (
    <div className="space-y-6">
      {/* Password Management */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Key className="text-blue-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Password Management</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            
            {/* Password Requirements */}
            {passwordForm.newPassword && (
              <div className="mt-2 space-y-1">
                <div className={`flex items-center space-x-2 text-sm ${passwordChecks.length ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordChecks.length ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  <span>At least {passwordPolicy.minLength} characters</span>
                </div>
                {passwordPolicy.requireUppercase && (
                  <div className={`flex items-center space-x-2 text-sm ${passwordChecks.uppercase ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordChecks.uppercase ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    <span>One uppercase letter</span>
                  </div>
                )}
                {passwordPolicy.requireLowercase && (
                  <div className={`flex items-center space-x-2 text-sm ${passwordChecks.lowercase ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordChecks.lowercase ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    <span>One lowercase letter</span>
                  </div>
                )}
                {passwordPolicy.requireNumbers && (
                  <div className={`flex items-center space-x-2 text-sm ${passwordChecks.numbers ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordChecks.numbers ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    <span>One number</span>
                  </div>
                )}
                {passwordPolicy.requireSpecialChars && (
                  <div className={`flex items-center space-x-2 text-sm ${passwordChecks.special ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordChecks.special ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    <span>One special character</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
            )}
          </div>

          <button className="btn-primary flex items-center space-x-2">
            <Save size={16} />
            <span>Update Password</span>
          </button>
        </div>
      </div>

      {/* Multi-Factor Authentication */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Shield className="text-green-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Multi-Factor Authentication</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Enable MFA</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={mfaSettings.enabled}
                onChange={handleMfaToggle}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          {mfaSettings.enabled && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Authentication Method</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="mfaMethod" 
                      value="sms" 
                      checked={mfaSettings.method === 'sms'}
                      onChange={(e) => setMfaSettings(prev => ({ ...prev, method: e.target.value }))}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <Smartphone size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-700">SMS Text Message</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="mfaMethod" 
                      value="email" 
                      checked={mfaSettings.method === 'email'}
                      onChange={(e) => setMfaSettings(prev => ({ ...prev, method: e.target.value }))}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-700">Email Verification</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="mfaMethod" 
                      value="authenticator" 
                      checked={mfaSettings.method === 'authenticator'}
                      onChange={(e) => setMfaSettings(prev => ({ ...prev, method: e.target.value }))}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <Smartphone size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-700">Authenticator App</span>
                  </label>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Backup Codes</label>
                  <button 
                    onClick={generateBackupCodes}
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
                  >
                    <RefreshCw size={14} />
                    <span>Generate New Codes</span>
                  </button>
                </div>
                {mfaSettings.backupCodes.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2">Save these codes in a safe place. Each code can only be used once.</p>
                    <div className="grid grid-cols-2 gap-2">
                      {mfaSettings.backupCodes.map((code, index) => (
                        <div key={index} className="text-sm font-mono text-gray-800 bg-white p-2 rounded border">
                          {code}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Session Management */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Clock className="text-purple-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Session Management</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              min="5"
              max="480"
              value={sessionSettings.timeout}
              onChange={(e) => handleSessionChange('timeout', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-xs text-gray-500 mt-1">Session will expire after this many minutes of inactivity</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Require Re-authentication</h4>
              <p className="text-sm text-gray-500">Force users to re-enter password for sensitive operations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={sessionSettings.requireReauth}
                onChange={(e) => handleSessionChange('requireReauth', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Concurrent Sessions</label>
            <input
              type="number"
              min="1"
              max="10"
              value={sessionSettings.maxConcurrentSessions}
              onChange={(e) => handleSessionChange('maxConcurrentSessions', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-xs text-gray-500 mt-1">Maximum number of simultaneous sessions per user</p>
          </div>
        </div>
      </div>

      {/* Password Policy */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Lock className="text-orange-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Password Policy</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Length</label>
              <input
                type="number"
                min="6"
                max="32"
                value={passwordPolicy.minLength}
                onChange={(e) => handlePolicyChange('minLength', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password Age (days)</label>
              <input
                type="number"
                min="30"
                max="365"
                value={passwordPolicy.maxAge}
                onChange={(e) => handlePolicyChange('maxAge', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Require Uppercase Letters</h4>
                <p className="text-sm text-gray-500">At least one uppercase letter (A-Z)</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={passwordPolicy.requireUppercase}
                  onChange={(e) => handlePolicyChange('requireUppercase', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Require Lowercase Letters</h4>
                <p className="text-sm text-gray-500">At least one lowercase letter (a-z)</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={passwordPolicy.requireLowercase}
                  onChange={(e) => handlePolicyChange('requireLowercase', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Require Numbers</h4>
                <p className="text-sm text-gray-500">At least one number (0-9)</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={passwordPolicy.requireNumbers}
                  onChange={(e) => handlePolicyChange('requireNumbers', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Require Special Characters</h4>
                <p className="text-sm text-gray-500">At least one special character (!@#$%^&*)</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={passwordPolicy.requireSpecialChars}
                  onChange={(e) => handlePolicyChange('requireSpecialChars', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="card bg-yellow-50 border-yellow-200">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="text-yellow-600 mt-0.5" size={20} />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Security Recommendations</h4>
            <ul className="mt-2 text-sm text-yellow-700 space-y-1">
              <li>• Enable multi-factor authentication for enhanced security</li>
              <li>• Use strong, unique passwords for all accounts</li>
              <li>• Regularly update your password and review security settings</li>
              <li>• Keep backup codes in a secure location</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
