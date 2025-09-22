import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Menu items configuration
  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: '📊', badge: undefined, isActive: activeMenuItem === 'Dashboard', onClick: () => setActiveMenuItem('Dashboard') },
    { id: 'tickets', title: 'My Tickets', icon: '🎫', badge: '3', isActive: activeMenuItem === 'My Tickets', onClick: () => setActiveMenuItem('My Tickets') },
    { id: 'create', title: 'Create Ticket', icon: '➕', badge: undefined, isActive: activeMenuItem === 'Create Ticket', onClick: () => setActiveMenuItem('Create Ticket') },
    { id: 'forms', title: 'Request Forms', icon: '📋', badge: undefined, isActive: activeMenuItem === 'Request Forms', onClick: () => setActiveMenuItem('Request Forms') },
    { id: 'knowledge', title: 'Knowledge Base', icon: '📖', badge: undefined, isActive: activeMenuItem === 'Knowledge Base', onClick: () => setActiveMenuItem('Knowledge Base') },
    { id: 'notifications', title: 'Notifications', icon: '🔔', badge: '5', isActive: activeMenuItem === 'Notifications', onClick: () => setActiveMenuItem('Notifications') },
    { id: 'analytics', title: 'Analytics', icon: '📈', badge: undefined, isActive: activeMenuItem === 'Analytics', onClick: () => setActiveMenuItem('Analytics') },
    { id: 'self-service', title: 'Self-Service', icon: '🛠️', badge: undefined, isActive: activeMenuItem === 'Self-Service', onClick: () => setActiveMenuItem('Self-Service') },
    { id: 'settings', title: 'Settings', icon: '⚙️', badge: undefined, isActive: activeMenuItem === 'Settings', onClick: () => setActiveMenuItem('Settings') }
  ];

  // Event handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Searching for: "${searchTerm}"`);
    }, 1000);
  };

  // Mock data
  const mockTickets = [
    {
      id: 'TKT-001',
      title: 'Email server configuration issue',
      description: 'Unable to send emails from the new server configuration.',
      status: 'in-progress',
      priority: 'high',
      progress: 75,
      assignee: 'Sarah Johnson',
      createdDate: '2024-01-15'
    },
    {
      id: 'TKT-002',
      title: 'Password reset not working',
      description: 'Users are unable to reset their passwords through the portal.',
      status: 'open',
      priority: 'medium',
      progress: 25,
      assignee: 'Mike Chen',
      createdDate: '2024-01-14'
    },
    {
      id: 'TKT-003',
      title: 'Database performance optimization',
      description: 'Slow query performance affecting user experience.',
      status: 'pending',
      priority: 'urgent',
      progress: 10,
      assignee: 'Alex Rodriguez',
      createdDate: '2024-01-13'
    }
  ];

  const mockMetrics = [
    { title: 'Active Tickets', value: 12, icon: '🎫', color: '#3b82f6', bgColor: '#eff6ff' },
    { title: 'Resolution Rate', value: '94%', icon: '✅', color: '#10b981', bgColor: '#f0fdf4' },
    { title: 'Avg Response Time', value: '2.3h', icon: '⏱️', color: '#f59e0b', bgColor: '#fffbeb' },
    { title: 'Satisfaction Score', value: '4.7/5', icon: '⭐', color: '#8b5cf6', bgColor: '#faf5ff' }
  ];

  // Render content based on active menu item
  const renderContent = () => {
    switch (activeMenuItem) {
      case 'Dashboard':
        return (
          <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                Dashboard
              </h1>
              <p style={{ color: '#6b7280', fontSize: '16px' }}>
                Welcome to your customer portal! Manage tickets, access knowledge base, and get support.
              </p>
            </div>

            {/* Quick Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px', 
              marginBottom: '32px' 
            }}>
              {mockMetrics.map((metric, index) => (
                <div
                  key={index}
                  style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
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
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: metric.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    margin: '0 auto 12px auto'
                  }}>
                    {metric.icon}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
                    {metric.value}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    {metric.title}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Tickets */}
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                Recent Tickets
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {mockTickets.map((ticket) => (
                  <div key={ticket.id} style={{
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                  onClick={() => alert(`Opening ticket: ${ticket.title}`)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                        {ticket.title}
                      </span>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: ticket.status === 'in-progress' ? '#dbeafe' : ticket.status === 'open' ? '#fef3c7' : '#f3f4f6',
                        color: ticket.status === 'in-progress' ? '#1e40af' : ticket.status === 'open' ? '#d97706' : '#6b7280'
                      }}>
                        {ticket.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                      {ticket.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#9ca3af' }}>
                      <span>Assignee: {ticket.assignee}</span>
                      <span>Progress: {ticket.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'My Tickets':
        return (
          <div style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
              My Tickets
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              {mockTickets.map((ticket) => (
                <div key={ticket.id} style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => alert(`Opening ticket: ${ticket.title}`)}
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
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
                      {ticket.title}
                    </h3>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: ticket.priority === 'urgent' ? '#fef2f2' : ticket.priority === 'high' ? '#fef3c7' : '#f0fdf4',
                      color: ticket.priority === 'urgent' ? '#dc2626' : ticket.priority === 'high' ? '#d97706' : '#16a34a'
                    }}>
                      {ticket.priority.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                    {ticket.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      Assignee: {ticket.assignee}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      Created: {ticket.createdDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
              {activeMenuItem}
            </h2>
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '40px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                {menuItems.find(item => item.title === activeMenuItem)?.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                {activeMenuItem} Section
              </h3>
              <p style={{ color: '#6b7280', fontSize: '16px' }}>
                This section is under development. Full functionality will be available soon.
              </p>
            </div>
          </div>
        );
    }
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>BSM Portal - Customer Portal</title>
        <meta name="description" content="Comprehensive customer portal for ticket management and support" />
      </Head>

      <div style={{ 
        display: 'flex', 
        height: '100vh', 
        width: '100%', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        overflow: 'hidden'
      }}>
        {/* Sidebar */}
        <div style={{
          width: sidebarOpen ? '280px' : '80px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          position: 'relative',
          zIndex: 10,
          transition: 'width 0.3s ease'
        }}>
          {/* Sidebar Header */}
          <div style={{
            padding: '24px 20px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            minHeight: '80px'
          }}>
            {sidebarOpen && (
              <div>
                <h1 style={{ fontSize: '20px', fontWeight: '700', margin: 0, letterSpacing: '-0.025em' }}>
                  BSM Portal
                </h1>
                <p style={{ fontSize: '12px', margin: '4px 0 0 0', opacity: 0.9 }}>
                  Customer Portal
                </p>
              </div>
            )}
            
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)'
              }}
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>

          {/* Navigation Menu */}
          <nav style={{ flex: 1, padding: '16px 0', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: sidebarOpen ? '12px' : '0',
                    padding: sidebarOpen ? '12px 20px' : '12px',
                    margin: '0 8px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: item.isActive ? '#eff6ff' : 'transparent',
                    color: item.isActive ? '#3b82f6' : '#6b7280',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    justifyContent: sidebarOpen ? 'flex-start' : 'center',
                    minHeight: '44px'
                  }}
                  onMouseEnter={(e) => {
                    if (!item.isActive) {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.color = '#374151';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!item.isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#6b7280';
                    }
                  }}
                >
                  <span style={{ fontSize: '18px', minWidth: '20px', textAlign: 'center' }}>
                    {item.icon}
                  </span>
                  
                  {sidebarOpen && (
                    <>
                      <span style={{ flex: 1, textAlign: 'left' }}>
                        {item.title}
                      </span>
                      {item.badge && (
                        <span style={{
                          padding: '2px 6px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          fontWeight: '600',
                          backgroundColor: item.isActive ? '#3b82f6' : '#ef4444',
                          color: 'white',
                          minWidth: '18px',
                          textAlign: 'center'
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Portal Switcher */}
          <div style={{
            padding: '12px 20px',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb'
          }}>
            {sidebarOpen ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => window.open('http://localhost:3001', '_blank')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>⚙️</span>
                  <span>Admin</span>
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: '1px solid transparent',
                    borderRadius: '6px',
                    cursor: 'default',
                    fontSize: '12px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>🌐</span>
                  <span>Portal</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={() => window.open('http://localhost:3001', '_blank')}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    cursor: 'pointer',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ⚙️
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header */}
          <header style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '24px 32px', 
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
            color: '#111827',
            borderBottom: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                }}
              >
                ≡
              </button>
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: 0, letterSpacing: '-0.025em', color: '#111827' }}>
                  {activeMenuItem}
                </h1>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Search Bar */}
              <form onSubmit={handleSearch} style={{ position: 'relative' }}>
                <div style={{
                  position: 'relative',
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.2s ease'
                }}>
                  <input
                    type="text"
                    placeholder="🔍 Search tickets, articles, or help..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '300px',
                      padding: '12px 16px 12px 40px',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontWeight: '500',
                      color: '#374151'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !searchTerm.trim()}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      padding: '8px 16px',
                      background: isLoading || !searchTerm.trim() ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: isLoading || !searchTerm.trim() ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.2s',
                      opacity: isLoading || !searchTerm.trim() ? 0.7 : 1,
                      boxShadow: isLoading || !searchTerm.trim() ? 'none' : '0 2px 4px rgba(59, 130, 246, 0.2)'
                    }}
                  >
                    {isLoading ? '⏳' : 'Search'}
                  </button>
                </div>
              </form>

              {/* Notifications */}
              <button
                onClick={() => setActiveMenuItem('Notifications')}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                }}
              >
                🔔
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '10px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  5
                </span>
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <main style={{ 
            flex: 1, 
            overflow: 'auto', 
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
            position: 'relative'
          }}>
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  );
}
