import React, { useState } from 'react';

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  location: string;
  description: string;
}

interface BillingInfo {
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  services: string[];
  issueDate: string;
  description: string;
}

interface SelfServiceCenterProps {
  appointments: Appointment[];
  billingInfo: BillingInfo[];
  onScheduleAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  onCancelAppointment: (appointmentId: string) => void;
  onPayInvoice: (invoiceNumber: string) => void;
}

const SelfServiceCenter: React.FC<SelfServiceCenterProps> = ({
  appointments,
  billingInfo,
  onScheduleAppointment,
  onCancelAppointment,
  onPayInvoice
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'billing'>('appointments');
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: '',
    time: '',
    duration: 60,
    type: '',
    location: '',
    description: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return '#3b82f6';
      case 'completed': return '#10b981';
      case 'cancelled': return '#6b7280';
      case 'paid': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'overdue': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScheduleAppointment(newAppointment);
    setNewAppointment({
      title: '',
      date: '',
      time: '',
      duration: 60,
      type: '',
      location: '',
      description: ''
    });
    setShowScheduleForm(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
          Self-Service Center
        </h2>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Manage your appointments and billing information
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e5e7eb' }}>
          {[
            { key: 'appointments', label: 'Appointments', icon: '📅' },
            { key: 'billing', label: 'Billing', icon: '💳' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                padding: '12px 20px',
                backgroundColor: activeTab === tab.key ? '#ffffff' : 'transparent',
                color: activeTab === tab.key ? '#3b82f6' : '#6b7280',
                border: 'none',
                borderBottom: activeTab === tab.key ? '2px solid #3b82f6' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Appointments Tab */}
      {activeTab === 'appointments' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
              Your Appointments
            </h3>
            <button
              onClick={() => setShowScheduleForm(true)}
              style={{
                padding: '10px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              ➕ Schedule New
            </button>
          </div>

          {/* Appointments List */}
          <div style={{ display: 'grid', gap: '16px' }}>
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                    {appointment.title}
                  </h4>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: `${getStatusColor(appointment.status)}20`,
                    color: getStatusColor(appointment.status)
                  }}>
                    {appointment.status.toUpperCase()}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Date & Time</span>
                    <div style={{ fontSize: '14px', color: '#111827' }}>
                      {formatDate(appointment.date)} at {appointment.time}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Duration</span>
                    <div style={{ fontSize: '14px', color: '#111827' }}>
                      {appointment.duration} minutes
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Type</span>
                    <div style={{ fontSize: '14px', color: '#111827' }}>
                      {appointment.type}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Location</span>
                    <div style={{ fontSize: '14px', color: '#111827' }}>
                      {appointment.location}
                    </div>
                  </div>
                </div>

                {appointment.description && (
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
                    {appointment.description}
                  </p>
                )}

                {appointment.status === 'scheduled' && (
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => onCancelAppointment(appointment.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#fef2f2',
                        color: '#dc2626',
                        border: '1px solid #fecaca',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Schedule Form Modal */}
          {showScheduleForm && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}
              onClick={() => setShowScheduleForm(false)}
            >
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '24px',
                  maxWidth: '500px',
                  width: '90%',
                  maxHeight: '80vh',
                  overflow: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
                  Schedule New Appointment
                </h3>

                <form onSubmit={handleScheduleSubmit}>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                        Title *
                      </label>
                      <input
                        type="text"
                        value={newAppointment.title}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, title: e.target.value }))}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                          Date *
                        </label>
                        <input
                          type="date"
                          value={newAppointment.date}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))}
                          required
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                          Time *
                        </label>
                        <input
                          type="time"
                          value={newAppointment.time}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, time: e.target.value }))}
                          required
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                          Duration (minutes)
                        </label>
                        <select
                          value={newAppointment.duration}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        >
                          <option value={30}>30 minutes</option>
                          <option value={60}>1 hour</option>
                          <option value={90}>1.5 hours</option>
                          <option value={120}>2 hours</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                          Type *
                        </label>
                        <select
                          value={newAppointment.type}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, type: e.target.value }))}
                          required
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        >
                          <option value="">Select type</option>
                          <option value="consultation">Consultation</option>
                          <option value="support">Technical Support</option>
                          <option value="training">Training Session</option>
                          <option value="meeting">General Meeting</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                        Location *
                      </label>
                      <input
                        type="text"
                        value={newAppointment.location}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, location: e.target.value }))}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                        Description
                      </label>
                      <textarea
                        value={newAppointment.description}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, description: e.target.value }))}
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
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button
                      type="button"
                      onClick={() => setShowScheduleForm(false)}
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
                      Cancel
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
                        fontWeight: '500'
                      }}
                    >
                      Schedule
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
            Billing Information
          </h3>

          <div style={{ display: 'grid', gap: '16px' }}>
            {billingInfo.map((invoice) => (
              <div
                key={invoice.invoiceNumber}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                      Invoice #{invoice.invoiceNumber}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>
                      {invoice.description}
                    </p>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: `${getStatusColor(invoice.status)}20`,
                    color: getStatusColor(invoice.status)
                  }}>
                    {invoice.status.toUpperCase()}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Amount</span>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                      {formatCurrency(invoice.amount)}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Due Date</span>
                    <div style={{ fontSize: '14px', color: '#111827' }}>
                      {formatDate(invoice.dueDate)}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Issue Date</span>
                    <div style={{ fontSize: '14px', color: '#111827' }}>
                      {formatDate(invoice.issueDate)}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Services</span>
                  <div style={{ marginTop: '4px' }}>
                    {invoice.services.map((service, index) => (
                      <span
                        key={index}
                        style={{
                          display: 'inline-block',
                          padding: '2px 6px',
                          backgroundColor: '#f3f4f6',
                          color: '#6b7280',
                          borderRadius: '4px',
                          fontSize: '11px',
                          marginRight: '6px',
                          marginBottom: '4px'
                        }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {invoice.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => onPayInvoice(invoice.invoiceNumber)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      Pay Now
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelfServiceCenter;
