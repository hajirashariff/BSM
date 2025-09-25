import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  Calendar,
  Users,
  AlertCircle,
  CheckCircle,
  Plus,
  Trash2
} from 'lucide-react';

interface Stakeholder {
  name: string;
  role: string;
  email: string;
  phone: string;
}

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAccount: (accountData: any) => void;
}

export default function AddAccountModal({ isOpen, onClose, onAddAccount }: AddAccountModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    size: 'Mid-Market',
    website: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    annualRevenue: '',
    employeeCount: '',
    contractValue: '',
    contractStartDate: '',
    contractEndDate: '',
    primaryContact: {
      name: '',
      role: '',
      email: '',
      phone: ''
    },
    stakeholders: [] as Stakeholder[],
    riskFactors: [] as string[],
    opportunities: [] as string[]
  });

  const [currentStakeholder, setCurrentStakeholder] = useState<Stakeholder>({
    name: '',
    role: '',
    email: '',
    phone: ''
  });

  const [currentRiskFactor, setCurrentRiskFactor] = useState('');
  const [currentOpportunity, setCurrentOpportunity] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const industries = [
    'Technology', 'Manufacturing', 'Finance', 'Healthcare', 'Retail', 
    'Education', 'Government', 'Non-Profit', 'Energy', 'Telecommunications',
    'Real Estate', 'Consulting', 'Media', 'Transportation', 'Other'
  ];

  const companySizes = [
    'Startup (1-10)',
    'Small (11-50)', 
    'Mid-Market (51-200)',
    'Enterprise (201-1000)',
    'Large Enterprise (1000+)'
  ];

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
    'Australia', 'Japan', 'India', 'Brazil', 'Mexico', 'Other'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Company name is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (!formData.primaryContact.name.trim()) newErrors.primaryContactName = 'Primary contact name is required';
    if (!formData.primaryContact.email.trim()) newErrors.primaryContactEmail = 'Primary contact email is required';
    if (!formData.primaryContact.role.trim()) newErrors.primaryContactRole = 'Primary contact role is required';
    if (!formData.contractValue) newErrors.contractValue = 'Contract value is required';
    if (!formData.contractStartDate) newErrors.contractStartDate = 'Contract start date is required';
    if (!formData.contractEndDate) newErrors.contractEndDate = 'Contract end date is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.primaryContact.email && !emailRegex.test(formData.primaryContact.email)) {
      newErrors.primaryContactEmail = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (formData.primaryContact.phone && !phoneRegex.test(formData.primaryContact.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.primaryContactPhone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate account ID
      const accountId = `ACC-${String(Date.now()).slice(-6)}`;
      
      // Calculate health score based on various factors
      let healthScore = 75; // Base score
      if (formData.stakeholders.length > 1) healthScore += 5;
      if (formData.opportunities.length > 0) healthScore += 5;
      if (formData.riskFactors.length === 0) healthScore += 10;
      if (parseFloat(formData.contractValue) > 1000000) healthScore += 5;
      
      const newAccount = {
        id: accountId,
        name: formData.name,
        industry: formData.industry,
        size: formData.size,
        website: formData.website,
        description: formData.description,
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`,
        health: Math.min(healthScore, 100),
        healthTrend: 'stable',
        revenue: formData.contractValue,
        renewal: formData.contractEndDate,
        status: healthScore >= 85 ? 'Active' : healthScore >= 70 ? 'Active' : 'At Risk',
        tickets: 0,
        openTickets: 0,
        resolvedTickets: 0,
        avgResolutionTime: '0h',
        satisfaction: 0,
        stakeholders: [formData.primaryContact, ...formData.stakeholders],
        lastActivity: new Date().toISOString().split('T')[0],
        riskFactors: formData.riskFactors,
        opportunities: formData.opportunities,
        annualRevenue: formData.annualRevenue,
        employeeCount: formData.employeeCount,
        contractStartDate: formData.contractStartDate,
        contractEndDate: formData.contractEndDate
      };

      await onAddAccount(newAccount);
      
      // Reset form
      setFormData({
        name: '',
        industry: '',
        size: 'Mid-Market',
        website: '',
        description: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        annualRevenue: '',
        employeeCount: '',
        contractValue: '',
        contractStartDate: '',
        contractEndDate: '',
        primaryContact: { name: '', role: '', email: '', phone: '' },
        stakeholders: [],
        riskFactors: [],
        opportunities: []
      });
      
      onClose();
    } catch (error) {
      console.error('Error adding account:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addStakeholder = () => {
    if (currentStakeholder.name && currentStakeholder.role && currentStakeholder.email) {
      setFormData(prev => ({
        ...prev,
        stakeholders: [...prev.stakeholders, currentStakeholder]
      }));
      setCurrentStakeholder({ name: '', role: '', email: '', phone: '' });
    }
  };

  const removeStakeholder = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stakeholders: prev.stakeholders.filter((_, i) => i !== index)
    }));
  };

  const addRiskFactor = () => {
    if (currentRiskFactor.trim()) {
      setFormData(prev => ({
        ...prev,
        riskFactors: [...prev.riskFactors, currentRiskFactor.trim()]
      }));
      setCurrentRiskFactor('');
    }
  };

  const removeRiskFactor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      riskFactors: prev.riskFactors.filter((_, i) => i !== index)
    }));
  };

  const addOpportunity = () => {
    if (currentOpportunity.trim()) {
      setFormData(prev => ({
        ...prev,
        opportunities: [...prev.opportunities, currentOpportunity.trim()]
      }));
      setCurrentOpportunity('');
    }
  };

  const removeOpportunity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      opportunities: prev.opportunities.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New Account</h2>
              <p className="text-sm text-gray-600">Create a new B2B account with comprehensive details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Building2 size={20} className="text-blue-600" />
              <span>Basic Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter company name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.industry ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size
                </label>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the company and their business"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <MapPin size={20} className="text-blue-600" />
              <span>Address Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Main Street"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="New York"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="NY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP/Postal Code
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="10001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <DollarSign size={20} className="text-blue-600" />
              <span>Financial Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Revenue
                </label>
                <input
                  type="text"
                  value={formData.annualRevenue}
                  onChange={(e) => setFormData(prev => ({ ...prev, annualRevenue: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="$1,000,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee Count
                </label>
                <input
                  type="text"
                  value={formData.employeeCount}
                  onChange={(e) => setFormData(prev => ({ ...prev, employeeCount: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contract Value *
                </label>
                <input
                  type="text"
                  value={formData.contractValue}
                  onChange={(e) => setFormData(prev => ({ ...prev, contractValue: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contractValue ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="$500,000"
                />
                {errors.contractValue && <p className="text-red-500 text-xs mt-1">{errors.contractValue}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contract Start Date *
                </label>
                <input
                  type="date"
                  value={formData.contractStartDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, contractStartDate: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contractStartDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.contractStartDate && <p className="text-red-500 text-xs mt-1">{errors.contractStartDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contract End Date *
                </label>
                <input
                  type="date"
                  value={formData.contractEndDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, contractEndDate: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contractEndDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.contractEndDate && <p className="text-red-500 text-xs mt-1">{errors.contractEndDate}</p>}
              </div>
            </div>
          </div>

          {/* Primary Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <User size={20} className="text-blue-600" />
              <span>Primary Contact</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.primaryContact.name}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    primaryContact: { ...prev.primaryContact, name: e.target.value }
                  }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.primaryContactName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Smith"
                />
                {errors.primaryContactName && <p className="text-red-500 text-xs mt-1">{errors.primaryContactName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role/Title *
                </label>
                <input
                  type="text"
                  value={formData.primaryContact.role}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    primaryContact: { ...prev.primaryContact, role: e.target.value }
                  }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.primaryContactRole ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="CTO"
                />
                {errors.primaryContactRole && <p className="text-red-500 text-xs mt-1">{errors.primaryContactRole}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.primaryContact.email}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    primaryContact: { ...prev.primaryContact, email: e.target.value }
                  }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.primaryContactEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@company.com"
                />
                {errors.primaryContactEmail && <p className="text-red-500 text-xs mt-1">{errors.primaryContactEmail}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.primaryContact.phone}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    primaryContact: { ...prev.primaryContact, phone: e.target.value }
                  }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.primaryContactPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.primaryContactPhone && <p className="text-red-500 text-xs mt-1">{errors.primaryContactPhone}</p>}
              </div>
            </div>
          </div>

          {/* Additional Stakeholders */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Users size={20} className="text-blue-600" />
              <span>Additional Stakeholders</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={currentStakeholder.name}
                  onChange={(e) => setCurrentStakeholder(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={currentStakeholder.role}
                  onChange={(e) => setCurrentStakeholder(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="IT Director"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={currentStakeholder.email}
                  onChange={(e) => setCurrentStakeholder(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="jane@company.com"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addStakeholder}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Stakeholders List */}
            {formData.stakeholders.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Added Stakeholders:</h4>
                {formData.stakeholders.map((stakeholder, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <User size={16} className="text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{stakeholder.name}</p>
                        <p className="text-sm text-gray-600">{stakeholder.role} • {stakeholder.email}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeStakeholder(index)}
                      className="p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Risk Factors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <AlertCircle size={20} className="text-red-600" />
              <span>Risk Factors</span>
            </h3>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentRiskFactor}
                onChange={(e) => setCurrentRiskFactor(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter risk factor (e.g., High ticket volume, Payment delays)"
                onKeyPress={(e) => e.key === 'Enter' && addRiskFactor()}
              />
              <button
                type="button"
                onClick={addRiskFactor}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Add
              </button>
            </div>

            {formData.riskFactors.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.riskFactors.map((risk, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full"
                  >
                    {risk}
                    <button
                      type="button"
                      onClick={() => removeRiskFactor(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Opportunities */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <CheckCircle size={20} className="text-green-600" />
              <span>Opportunities</span>
            </h3>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentOpportunity}
                onChange={(e) => setCurrentOpportunity(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter opportunity (e.g., Upsell: Additional licenses, Reference customer)"
                onKeyPress={(e) => e.key === 'Enter' && addOpportunity()}
              />
              <button
                type="button"
                onClick={addOpportunity}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add
              </button>
            </div>

            {formData.opportunities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.opportunities.map((opportunity, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    {opportunity}
                    <button
                      type="button"
                      onClick={() => removeOpportunity(index)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Adding Account...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  <span>Add Account</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
