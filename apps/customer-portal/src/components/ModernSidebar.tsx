import React from 'react';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  badge?: string;
  isActive: boolean;
  onClick: () => void;
}

interface ModernSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  menuItems: MenuItem[];
  branding: {
    logo?: string;
    companyName: string;
    primaryColor: string;
  };
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({
  isOpen,
  onToggle,
  menuItems,
  branding
}) => {
  return (
    <div style={{
      width: isOpen ? '280px' : '80px',
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
        background: `linear-gradient(135deg, ${branding.primaryColor} 0%, ${branding.primaryColor}dd 100%)`,
        color: 'white',
        minHeight: '80px'
      }}>
        {isOpen && (
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              {branding.logo && (
                <img
                  src={branding.logo}
                  alt="Logo"
                  style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                />
              )}
              <h1 style={{ fontSize: '20px', fontWeight: '700', margin: 0, letterSpacing: '-0.025em' }}>
                {branding.companyName}
              </h1>
            </div>
            <p style={{ fontSize: '12px', margin: 0, opacity: 0.9 }}>
              Customer Portal
            </p>
          </div>
        )}
        
        <button
          onClick={onToggle}
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
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isOpen ? '◀' : '▶'}
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
                gap: isOpen ? '12px' : '0',
                padding: isOpen ? '12px 20px' : '12px',
                margin: '0 8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: item.isActive ? `${branding.primaryColor}15` : 'transparent',
                color: item.isActive ? branding.primaryColor : '#6b7280',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                position: 'relative',
                justifyContent: isOpen ? 'flex-start' : 'center',
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
              
              {isOpen && (
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
                      backgroundColor: item.isActive ? branding.primaryColor : '#ef4444',
                      color: 'white',
                      minWidth: '18px',
                      textAlign: 'center'
                    }}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {/* Tooltip for collapsed state */}
              {!isOpen && (
                <div style={{
                  position: 'absolute',
                  left: '100%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  marginLeft: '8px',
                  padding: '6px 8px',
                  backgroundColor: '#1f2937',
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  opacity: 0,
                  pointerEvents: 'none',
                  transition: 'opacity 0.2s ease',
                  zIndex: 1000
                }}>
                  {item.title}
                  {item.badge && ` (${item.badge})`}
                </div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb'
      }}>
        {isOpen ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: branding.primaryColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              JD
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                John Doe
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                Customer
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: branding.primaryColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            margin: '0 auto'
          }}>
            JD
          </div>
        )}
      </div>

      {/* Portal Switcher */}
      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb'
      }}>
        {isOpen ? (
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              <span>⚙️</span>
              <span>Admin</span>
            </button>
            <button
              style={{
                flex: 1,
                padding: '8px 12px',
                backgroundColor: branding.primaryColor,
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              ⚙️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernSidebar;
