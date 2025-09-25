// Notification API Service
export interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  priority: 'low' | 'medium' | 'high';
}

class NotificationService {
  private static instance: NotificationService;
  private listeners: Array<(notifications: NotificationData[]) => void> = [];

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Subscribe to notification updates
  public subscribe(listener: (notifications: NotificationData[]) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners
  private notifyListeners(notifications: NotificationData[]): void {
    this.listeners.forEach(listener => listener(notifications));
  }

  // Simulate real-time notifications
  public startRealTimeNotifications(): (() => void) | void {
    const notificationTemplates = [
      {
        title: 'New Service Request',
        message: 'High priority ticket #SR-{id} has been created',
        type: 'warning' as const,
        priority: 'high' as const,
        actionUrl: '/tickets',
        actionText: 'View Ticket'
      },
      {
        title: 'System Alert',
        message: 'Server {server} CPU usage exceeded {threshold}%',
        type: 'error' as const,
        priority: 'high' as const,
        actionUrl: '/assets',
        actionText: 'Check Server'
      },
      {
        title: 'User Activity',
        message: 'New user {user} has registered and needs approval',
        type: 'info' as const,
        priority: 'medium' as const,
        actionUrl: '/users',
        actionText: 'Approve User'
      },
      {
        title: 'Backup Completed',
        message: 'Daily backup completed successfully. {size} of data backed up.',
        type: 'success' as const,
        priority: 'low' as const
      },
      {
        title: 'Maintenance Scheduled',
        message: 'System maintenance scheduled for {time}',
        type: 'info' as const,
        priority: 'medium' as const,
        actionUrl: '/settings',
        actionText: 'View Details'
      }
    ];

    // Generate random notifications every 30-60 seconds
    const generateNotification = () => {
      const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
      const id = Date.now().toString().slice(-6);
      
      const notification: NotificationData = {
        id: `notif_${id}`,
        title: template.title,
        message: template.message
          .replace('{id}', id)
          .replace('{server}', `server-${Math.floor(Math.random() * 10) + 1}`)
          .replace('{threshold}', `${Math.floor(Math.random() * 20) + 80}`)
          .replace('{user}', `User${Math.floor(Math.random() * 1000)}`)
          .replace('{size}', `${(Math.random() * 5 + 1).toFixed(1)}GB`)
          .replace('{time}', new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toLocaleString()),
        type: template.type,
        priority: template.priority,
        timestamp: new Date(),
        read: false,
        actionUrl: template.actionUrl,
        actionText: template.actionText
      };

      // Emit notification to all listeners
      this.listeners.forEach(listener => {
        // This would typically fetch current notifications and add the new one
        // For now, we'll just log it
        console.log('New notification:', notification);
      });
    };

    // Start generating notifications
    const interval = setInterval(generateNotification, 30000 + Math.random() * 30000);
    
    // Return cleanup function
    return () => clearInterval(interval);
  }

  // Simulate API calls
  public async fetchNotifications(): Promise<NotificationData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    return [
      {
        id: '1',
        title: 'New Service Request',
        message: 'High priority ticket #SR-2024-001 has been created by John Doe',
        type: 'warning',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        actionUrl: '/tickets',
        actionText: 'View Ticket',
        priority: 'high'
      },
      {
        id: '2',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will begin at 2:00 AM EST',
        type: 'info',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
        actionUrl: '/settings',
        actionText: 'View Details',
        priority: 'medium'
      },
      {
        id: '3',
        title: 'Asset Alert',
        message: 'Server CPU usage exceeded 90% on production-server-01',
        type: 'error',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true,
        actionUrl: '/assets',
        actionText: 'Check Server',
        priority: 'high'
      }
    ];
  }

  public async markAsRead(id: string): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log(`Marked notification ${id} as read`);
  }

  public async deleteNotification(id: string): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log(`Deleted notification ${id}`);
  }
}

export default NotificationService;


