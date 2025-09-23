import React, { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'ticket' | 'system' | 'announcement' | 'reminder';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'urgent' | 'success';
  startDate: string;
  endDate: string;
  targetRoles: string[];
  isDismissible: boolean;
}

interface NotificationCenterProps {
  notifications: Notification[];
  announcements: Announcement[];
  onNotificationClick: (notification: Notification) => void;
  onMarkAsRead: (notificationId: string) => void;
  onDismissAnnouncement: (announcementId: string) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  announcements,
  onNotificationClick,
  onMarkAsRead,
  onDismissAnnouncement
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'ticket' | 'system'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const activeAnnouncements = announcements.filter(a => 
    new Date(a.startDate) <= new Date() && new Date(a.endDate) >= new Date()
  );

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'ticket') return notification.type === 'ticket';
    if (filter === 'system') return notification.type === 'system';
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ticket': return '🎫';
      case 'system': return '⚙️';
      case 'announcement': return '📢';
      case 'reminder': return '⏰';
      default: return '🔔';
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'urgent') return '#ef4444';
    if (priority === 'high') return '#f97316';
    if (type === 'ticket') return '#3b82f6';
    if (type === 'system') return '#6b7280';
    if (type === 'announcement') return '#10b981';
    return '#6b7280';
  };

  const getAnnouncementColor = (type: string) => {
    switch (type) {
      case 'urgent': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'success': return '#10b981';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Announcement Banners */}
      {showAnnouncements && activeAnnouncements.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
              Announcements
            </h3>
            <button
              onClick={() => setShowAnnouncements(false)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#f3f4f6',
                color: '#6b7280',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Hide
            </button>
          </div>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            {activeAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  border: `2px solid ${getAnnouncementColor(announcement.type)}`,
                  backgroundColor: `${getAnnouncementColor(announcement.type)}10`,
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '16px' }}>
                        {announcement.type === 'urgent' ? '🚨' : 
                         announcement.type === 'warning' ? '⚠️' :
                         announcement.type === 'success' ? '✅' : 'ℹ️'}
                      </span>
                      <h4 style={{ 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        color: getAnnouncementColor(announcement.type),
                        margin: 0
                      }}>
                        {announcement.title}
                      </h4>
                    </div>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#374151', 
                      margin: 0,
                      lineHeight: '1.5'
                    }}>
                      {announcement.message}
                    </p>
                  </div>
                  
                  {announcement.isDismissible && (
                    <button
                      onClick={() => onDismissAnnouncement(announcement.id)}
                      style={{
                        padding: '4px',
                        backgroundColor: 'transparent',
                        color: '#6b7280',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        marginLeft: '12px'
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notification Center Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', margin: 0 }}>
            Notification Center
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                position: 'relative'
              }}
            >
              🔔 Notifications
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {[
            { key: 'all', label: 'All' },
            { key: 'unread', label: `Unread (${unreadCount})` },
            { key: 'ticket', label: 'Tickets' },
            { key: 'system', label: 'System' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              style={{
                padding: '8px 16px',
                backgroundColor: filter === tab.key ? '#3b82f6' : '#f3f4f6',
                color: filter === tab.key ? 'white' : '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      {showNotifications && (
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          maxHeight: '500px',
          overflow: 'auto'
        }}>
          {filteredNotifications.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔔</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                No notifications
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                You're all caught up! New notifications will appear here.
              </p>
            </div>
          ) : (
            <div style={{ padding: '0' }}>
              {filteredNotifications.map((notification, index) => (
                <div
                  key={notification.id}
                  onClick={() => {
                    onNotificationClick(notification);
                    if (!notification.read) {
                      onMarkAsRead(notification.id);
                    }
                  }}
                  style={{
                    padding: '16px 20px',
                    borderBottom: index < filteredNotifications.length - 1 ? '1px solid #f3f4f6' : 'none',
                    cursor: 'pointer',
                    backgroundColor: notification.read ? '#ffffff' : '#f8fafc',
                    transition: 'background-color 0.2s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = notification.read ? '#ffffff' : '#f8fafc';
                  }}
                >
                  {!notification.read && (
                    <div style={{
                      position: 'absolute',
                      left: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '8px',
                      height: '8px',
                      backgroundColor: getNotificationColor(notification.type, notification.priority),
                      borderRadius: '50%'
                    }} />
                  )}
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      fontSize: '20px',
                      marginTop: '2px'
                    }}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                        <h4 style={{ 
                          fontSize: '14px', 
                          fontWeight: '600', 
                          color: '#111827',
                          margin: 0
                        }}>
                          {notification.title}
                        </h4>
                        <span style={{ 
                          fontSize: '12px', 
                          color: '#6b7280',
                          marginLeft: '8px'
                        }}>
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      
                      <p style={{ 
                        fontSize: '13px', 
                        color: '#6b7280', 
                        margin: 0,
                        lineHeight: '1.4'
                      }}>
                        {notification.message}
                      </p>
                      
                      {notification.priority === 'urgent' && (
                        <span style={{
                          display: 'inline-block',
                          padding: '2px 6px',
                          backgroundColor: '#fef2f2',
                          color: '#dc2626',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '600',
                          marginTop: '6px'
                        }}>
                          URGENT
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
