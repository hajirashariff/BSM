import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CustomerMessage {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  company?: string;
  message: string;
  serviceType: 'consultation' | 'support' | 'implementation' | 'maintenance' | 'custom';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'in_progress' | 'responded' | 'resolved' | 'closed';
  requirements: string[];
  budget?: string;
  timeline?: string;
  timestamp: Date;
  attachments?: string[];
  assignedTo?: string;
  response?: string;
  responseDate?: Date;
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  serviceType: string;
  description: string;
  requirements: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'quoted' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
  estimatedCost?: number;
  actualCost?: number;
  startDate?: Date;
  endDate?: Date;
  assignedTeam?: string[];
  progress: number;
  timestamp: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'customer_message' | 'service_request';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  customerMessage?: CustomerMessage;
  serviceRequest?: ServiceRequest;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  customerMessages: CustomerMessage[];
  serviceRequests: ServiceRequest[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  addCustomerMessage: (message: Omit<CustomerMessage, 'id' | 'timestamp'>) => void;
  addServiceRequest: (request: Omit<ServiceRequest, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  updateCustomerMessageStatus: (id: string, status: CustomerMessage['status']) => void;
  updateServiceRequestStatus: (id: string, status: ServiceRequest['status']) => void;
  assignCustomerMessage: (id: string, assignedTo: string) => void;
  respondToCustomerMessage: (id: string, response: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [customerMessages, setCustomerMessages] = useState<CustomerMessage[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);

  // Initialize with sample data
  useEffect(() => {
    const sampleCustomerMessages: CustomerMessage[] = [
      {
        id: 'cm1',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah.johnson@techcorp.com',
        customerPhone: '+1-555-0123',
        company: 'TechCorp Solutions',
        message: 'We need help implementing a new CRM system for our sales team. We have 50+ users and need integration with our existing ERP system.',
        serviceType: 'implementation',
        priority: 'high',
        status: 'new',
        requirements: ['CRM Implementation', 'ERP Integration', 'User Training', 'Data Migration'],
        budget: '$50,000 - $75,000',
        timeline: '3-4 months',
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      },
      {
        id: 'cm2',
        customerName: 'Michael Chen',
        customerEmail: 'm.chen@startup.io',
        customerPhone: '+1-555-0456',
        company: 'StartupIO',
        message: 'Our current IT infrastructure is struggling with our growth. We need a comprehensive assessment and recommendations for scaling.',
        serviceType: 'consultation',
        priority: 'medium',
        status: 'in_progress',
        requirements: ['Infrastructure Assessment', 'Scalability Planning', 'Cost Optimization'],
        budget: '$10,000 - $20,000',
        timeline: '2-3 weeks',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        assignedTo: 'John Smith',
      },
      {
        id: 'cm3',
        customerName: 'Emily Rodriguez',
        customerEmail: 'emily@globaltech.com',
        customerPhone: '+1-555-0789',
        company: 'GlobalTech Inc',
        message: 'We are experiencing frequent downtime with our production servers. Need immediate support and long-term solution.',
        serviceType: 'support',
        priority: 'urgent',
        status: 'new',
        requirements: ['Emergency Support', 'Server Optimization', 'Monitoring Setup'],
        budget: '$15,000 - $30,000',
        timeline: 'ASAP',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      }
    ];

    const sampleServiceRequests: ServiceRequest[] = [
      {
        id: 'sr1',
        customerId: 'cm1',
        customerName: 'Sarah Johnson',
        serviceType: 'CRM Implementation',
        description: 'Full CRM system implementation with ERP integration',
        requirements: ['CRM Setup', 'ERP Integration', 'User Training', 'Data Migration'],
        priority: 'high',
        status: 'pending',
        estimatedCost: 65000,
        progress: 0,
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
      },
      {
        id: 'sr2',
        customerId: 'cm2',
        customerName: 'Michael Chen',
        serviceType: 'Infrastructure Assessment',
        description: 'Comprehensive IT infrastructure assessment and scaling plan',
        requirements: ['Infrastructure Audit', 'Scalability Analysis', 'Recommendations'],
        priority: 'medium',
        status: 'in_progress',
        estimatedCost: 15000,
        progress: 45,
        assignedTeam: ['John Smith', 'Jane Doe'],
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      }
    ];

    const sampleNotifications: Notification[] = [
      {
        id: '1',
        title: 'New Customer Message',
        message: 'Sarah Johnson from TechCorp Solutions needs CRM implementation help',
        type: 'customer_message',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        read: false,
        actionUrl: '/customer-messages',
        actionText: 'View Message',
        priority: 'high',
        customerMessage: sampleCustomerMessages[0]
      },
      {
        id: '2',
        title: 'Urgent Support Request',
        message: 'Emily Rodriguez reports production server downtime - Immediate attention needed',
        type: 'customer_message',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
        actionUrl: '/customer-messages',
        actionText: 'Respond Now',
        priority: 'urgent',
        customerMessage: sampleCustomerMessages[2]
      },
      {
        id: '3',
        title: 'Service Request Update',
        message: 'Infrastructure assessment for StartupIO is 45% complete',
        type: 'service_request',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        actionUrl: '/service-requests',
        actionText: 'View Progress',
        priority: 'medium',
        serviceRequest: sampleServiceRequests[1]
      },
      {
        id: '4',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will begin at 2:00 AM EST',
        type: 'info',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        read: true,
        actionUrl: '/settings',
        actionText: 'View Details',
        priority: 'medium'
      },
      {
        id: '5',
        title: 'Backup Completed',
        message: 'Daily backup completed successfully. 2.3GB of data backed up.',
        type: 'success',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        read: true,
        priority: 'low'
      }
    ];

    setCustomerMessages(sampleCustomerMessages);
    setServiceRequests(sampleServiceRequests);
    setNotifications(sampleNotifications);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addCustomerMessage = (messageData: Omit<CustomerMessage, 'id' | 'timestamp'>) => {
    const newMessage: CustomerMessage = {
      ...messageData,
      id: `cm_${Date.now()}`,
      timestamp: new Date(),
    };
    setCustomerMessages(prev => [newMessage, ...prev]);
    
    // Create notification for new customer message
    const notification: Notification = {
      id: `notif_${Date.now()}`,
      title: 'New Customer Message',
      message: `${newMessage.customerName} from ${newMessage.company || 'Unknown Company'} needs ${newMessage.serviceType} help`,
      type: 'customer_message',
      timestamp: new Date(),
      read: false,
      actionUrl: '/customer-messages',
      actionText: 'View Message',
      priority: newMessage.priority,
      customerMessage: newMessage
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const addServiceRequest = (requestData: Omit<ServiceRequest, 'id' | 'timestamp'>) => {
    const newRequest: ServiceRequest = {
      ...requestData,
      id: `sr_${Date.now()}`,
      timestamp: new Date(),
    };
    setServiceRequests(prev => [newRequest, ...prev]);
    
    // Create notification for new service request
    const notification: Notification = {
      id: `notif_${Date.now()}`,
      title: 'New Service Request',
      message: `${newRequest.customerName} requested ${newRequest.serviceType}`,
      type: 'service_request',
      timestamp: new Date(),
      read: false,
      actionUrl: '/service-requests',
      actionText: 'View Request',
      priority: newRequest.priority,
      serviceRequest: newRequest
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const updateCustomerMessageStatus = (id: string, status: CustomerMessage['status']) => {
    setCustomerMessages(prev =>
      prev.map(message =>
        message.id === id ? { ...message, status } : message
      )
    );
  };

  const updateServiceRequestStatus = (id: string, status: ServiceRequest['status']) => {
    setServiceRequests(prev =>
      prev.map(request =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  const assignCustomerMessage = (id: string, assignedTo: string) => {
    setCustomerMessages(prev =>
      prev.map(message =>
        message.id === id ? { ...message, assignedTo, status: 'in_progress' as CustomerMessage['status'] } : message
      )
    );
  };

  const respondToCustomerMessage = (id: string, response: string) => {
    setCustomerMessages(prev =>
      prev.map(message =>
        message.id === id ? { 
          ...message, 
          response, 
          responseDate: new Date(),
          status: 'responded' as CustomerMessage['status']
        } : message
      )
    );
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications for demo purposes
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const notificationTypes = [
          {
            title: 'New Ticket Created',
            message: `Service request #SR-${Date.now().toString().slice(-6)} created`,
            type: 'warning' as const,
            priority: 'medium' as const,
            actionUrl: '/tickets',
            actionText: 'View Ticket'
          },
          {
            title: 'System Alert',
            message: 'Memory usage on server-02 exceeded 85%',
            type: 'error' as const,
            priority: 'high' as const,
            actionUrl: '/assets',
            actionText: 'Check Server'
          },
          {
            title: 'User Activity',
            message: 'New user login detected from unknown location',
            type: 'info' as const,
            priority: 'medium' as const,
            actionUrl: '/users',
            actionText: 'Review Activity'
          }
        ];
        
        const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        addNotification(randomNotification);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    customerMessages,
    serviceRequests,
    addNotification,
    addCustomerMessage,
    addServiceRequest,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    updateCustomerMessageStatus,
    updateServiceRequestStatus,
    assignCustomerMessage,
    respondToCustomerMessage,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
