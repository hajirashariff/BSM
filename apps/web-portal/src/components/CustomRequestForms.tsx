import React, { useState } from 'react';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea' | 'date' | 'number' | 'checkbox';
  required: boolean;
  options?: string[];
  placeholder?: string;
  helpText?: string;
  validation?: string;
}

interface RequestForm {
  id: string;
  title: string;
  description: string;
  category: string;
  fields: FormField[];
  isDraft: boolean;
  createdDate: string;
}

interface CustomRequestFormsProps {
  forms: RequestForm[];
  onFormSubmit: (formData: any) => void;
  onFormSave: (formData: any) => void;
}

const CustomRequestForms: React.FC<CustomRequestFormsProps> = ({ 
  forms, 
  onFormSubmit, 
  onFormSave 
}) => {
  const [selectedForm, setSelectedForm] = useState<RequestForm | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isDraft, setIsDraft] = useState(false);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedForm) {
      onFormSubmit({
        formId: selectedForm.id,
        data: formData,
        isDraft: false
      });
      setFormData({});
      setSelectedForm(null);
    }
  };

  const handleSaveDraft = () => {
    if (selectedForm) {
      onFormSave({
        formId: selectedForm.id,
        data: formData,
        isDraft: true
      });
      setIsDraft(true);
    }
  };

  const renderField = (field: FormField) => {
    const commonStyle = {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      fontFamily: 'inherit',
      backgroundColor: '#ffffff',
      transition: 'border-color 0.2s ease'
    };

    const focusStyle = {
      outline: 'none',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={field.type}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            style={commonStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, commonStyle)}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            style={{ ...commonStyle, resize: 'vertical' }}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, commonStyle)}
          />
        );
      
      case 'select':
        return (
          <select
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            style={commonStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, commonStyle)}
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      case 'date':
        return (
          <input
            type="date"
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            style={commonStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, commonStyle)}
          />
        );
      
      case 'checkbox':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={formData[field.id] || false}
              onChange={(e) => handleFieldChange(field.id, e.target.checked)}
              style={{ width: '16px', height: '16px' }}
            />
            <span style={{ fontSize: '14px', color: '#374151' }}>
              {field.label}
            </span>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
          Custom Request Forms
        </h2>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Submit service requests using customizable forms with validation and help tooltips
        </p>
      </div>

      {!selectedForm ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {forms.map((form) => (
            <div
              key={form.id}
              onClick={() => setSelectedForm(form)}
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                  {form.title}
                </h3>
                {form.isDraft && (
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: '#fef3c7',
                    color: '#d97706'
                  }}>
                    DRAFT
                  </span>
                )}
              </div>
              
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
                {form.description}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1'
                }}>
                  {form.category}
                </span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  {form.fields.length} fields
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <button
              onClick={() => setSelectedForm(null)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '16px'
              }}
            >
              ← Back to Forms
            </button>
            
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              {selectedForm.title}
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              {selectedForm.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            {selectedForm.fields.map((field) => (
              <div key={field.id} style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  {field.label}
                  {field.required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
                </label>
                
                {renderField(field)}
                
                {field.helpText && (
                  <div style={{ marginTop: '4px', fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>💡</span>
                    <span>{field.helpText}</span>
                  </div>
                )}
                
                {field.validation && (
                  <div style={{ marginTop: '4px', fontSize: '12px', color: '#ef4444' }}>
                    {field.validation}
                  </div>
                )}
              </div>
            ))}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                type="button"
                onClick={handleSaveDraft}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
              >
                Save Draft
              </button>
              
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }}
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomRequestForms;
