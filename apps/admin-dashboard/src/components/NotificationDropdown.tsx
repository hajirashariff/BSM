import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  Trash2, 
  ExternalLink,
  AlertTriangle,
  Info,
  CheckCircle,
  AlertCircle,
  Clock,
  MoreVertical,
  MessageSquare,
  User,
  Building,
  DollarSign,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';
import { useNotifications, Notification, CustomerMessage, ServiceRequest } from '../contexts/NotificationContext';

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={16} />;
      case 'customer_message':
        return <MessageSquare className="text-blue-500" size={16} />;
      case 'service_request':
        return <User className="text-purple-500" size={16} />;
      case 'info':
      default:
        return <Info className="text-blue-500" size={16} />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-600 bg-red-50/50';
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <Bell size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 border-l-4 ${getPriorityColor(notification.priority)} hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          
                          {/* Customer Message Details */}
                          {notification.customerMessage && (
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <User size={12} />
                                <span>{notification.customerMessage.customerName}</span>
                                {notification.customerMessage.company && (
                                  <>
                                    <Building size={12} />
                                    <span>{notification.customerMessage.company}</span>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                  {notification.customerMessage.serviceType}
                                </span>
                                {notification.customerMessage.budget && (
                                  <>
                                    <DollarSign size={12} />
                                    <span>{notification.customerMessage.budget}</span>
                                  </>
                                )}
                                {notification.customerMessage.timeline && (
                                  <>
                                    <Calendar size={12} />
                                    <span>{notification.customerMessage.timeline}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {/* Service Request Details */}
                          {notification.serviceRequest && (
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <User size={12} />
                                <span>{notification.serviceRequest.customerName}</span>
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                                  {notification.serviceRequest.serviceType}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span>Progress: {notification.serviceRequest.progress}%</span>
                                {notification.serviceRequest.estimatedCost && (
                                  <>
                                    <DollarSign size={12} />
                                    <span>${notification.serviceRequest.estimatedCost.toLocaleString()}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-gray-400 flex items-center">
                              <Clock size={12} className="mr-1" />
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            {notification.actionText && (
                              <span className="text-xs text-blue-600 font-medium">
                                {notification.actionText}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={14} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </span>
                <button
                  onClick={() => {
                    window.location.href = '/notifications';
                    setIsOpen(false);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  View all
                  <ExternalLink size={12} className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
