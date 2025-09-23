import React, { useState } from 'react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdDate: string;
  lastUpdated: string;
  assignee: string;
  progress: number;
  linkedIssues: string[];
  estimatedResolution: string;
}

interface TaskManagementProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

const TaskManagement: React.FC<TaskManagementProps> = ({ tickets, onTicketClick }) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#3b82f6';
      case 'in-progress': return '#f59e0b';
      case 'pending': return '#6b7280';
      case 'resolved': return '#10b981';
      case 'closed': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress < 25) return '#ef4444';
    if (progress < 50) return '#f97316';
    if (progress < 75) return '#eab308';
    return '#22c55e';
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
          Task Management & Workflow
        </h2>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Track your tickets with detailed progress and status information
        </p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => {
              setSelectedTicket(ticket);
              onTicketClick(ticket);
            }}
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderLeft: `4px solid ${getStatusColor(ticket.status)}`
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
            {/* Header with status and priority */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: `${getStatusColor(ticket.status)}20`,
                    color: getStatusColor(ticket.status)
                  }}
                >
                  {ticket.status.toUpperCase()}
                </span>
                <span
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: `${getPriorityColor(ticket.priority)}20`,
                    color: getPriorityColor(ticket.priority)
                  }}
                >
                  {ticket.priority.toUpperCase()}
                </span>
              </div>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                {ticket.createdDate}
              </span>
            </div>

            {/* Title and description */}
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              {ticket.title}
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
              {ticket.description}
            </p>

            {/* Progress bar */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Progress
                </span>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  {ticket.progress}%
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${ticket.progress}%`,
                    height: '100%',
                    backgroundColor: getProgressColor(ticket.progress),
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>

            {/* Footer with assignee and linked issues */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Assignee:</span>
                <span style={{ fontSize: '12px', fontWeight: '500', color: '#374151' }}>
                  {ticket.assignee}
                </span>
              </div>
              {ticket.linkedIssues.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>🔗</span>
                  <span style={{ fontSize: '12px', color: '#3b82f6' }}>
                    {ticket.linkedIssues.length} linked
                  </span>
                </div>
              )}
            </div>

            {/* Estimated resolution */}
            <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                Estimated Resolution: {ticket.estimatedResolution}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected ticket details modal */}
      {selectedTicket && (
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
          onClick={() => setSelectedTicket(null)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
              {selectedTicket.title}
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              {selectedTicket.description}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Status:</span>
                <span style={{ marginLeft: '8px', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', backgroundColor: `${getStatusColor(selectedTicket.status)}20`, color: getStatusColor(selectedTicket.status) }}>
                  {selectedTicket.status.toUpperCase()}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Priority:</span>
                <span style={{ marginLeft: '8px', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', backgroundColor: `${getPriorityColor(selectedTicket.priority)}20`, color: getPriorityColor(selectedTicket.priority) }}>
                  {selectedTicket.priority.toUpperCase()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTicket(null)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;
