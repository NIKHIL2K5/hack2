import { toast } from 'sonner';
import { authService } from './authService';
import { dataSyncService } from './dataSync';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'job' | 'application' | 'scheme' | 'system';
  read: boolean;
  createdAt: string;
  data?: any;
}

class NotificationService {
  private storageKey = 'user_notifications';

  // Get all notifications for the current user
  getNotifications(): Notification[] {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return [];
    
    const allNotifications = this.getAllNotifications();
    return allNotifications.filter(notification => notification.userId === currentUser.email);
  }

  // Get all notifications (for all users)
  private getAllNotifications(): Notification[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Add a new notification
  addNotification(title: string, message: string, type: Notification['type'], data?: any): Notification | null {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return null;
    
    const notification: Notification = {
      id: Date.now().toString(),
      userId: currentUser.email,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString(),
      data
    };
    
    const allNotifications = this.getAllNotifications();
    allNotifications.push(notification);
    localStorage.setItem(this.storageKey, JSON.stringify(allNotifications));
    
    // Track notification creation
    dataSyncService.trackAction(
      currentUser.email,
      currentUser.role,
      'notification_received',
      { notificationType: type, notificationId: notification.id }
    );
    
    return notification;
  }

  // Mark a notification as read
  markAsRead(notificationId: string): boolean {
    const allNotifications = this.getAllNotifications();
    const notificationIndex = allNotifications.findIndex(n => n.id === notificationId);
    
    if (notificationIndex === -1) return false;
    
    allNotifications[notificationIndex].read = true;
    localStorage.setItem(this.storageKey, JSON.stringify(allNotifications));
    
    return true;
  }

  // Mark all notifications as read for the current user
  markAllAsRead(): boolean {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return false;
    
    const allNotifications = this.getAllNotifications();
    const updated = allNotifications.map(notification => 
      notification.userId === currentUser.email 
        ? { ...notification, read: true } 
        : notification
    );
    
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
    return true;
  }

  // Delete a notification
  deleteNotification(notificationId: string): boolean {
    const allNotifications = this.getAllNotifications();
    const filteredNotifications = allNotifications.filter(n => n.id !== notificationId);
    
    if (filteredNotifications.length === allNotifications.length) return false;
    
    localStorage.setItem(this.storageKey, JSON.stringify(filteredNotifications));
    return true;
  }

  // Get unread notification count
  getUnreadCount(): number {
    const notifications = this.getNotifications();
    return notifications.filter(n => !n.read).length;
  }

  // Show a toast notification and add it to the notification center
  showNotification(title: string, message: string, type: Notification['type'], data?: any): void {
    // Add to notification center
    this.addNotification(title, message, type, data);
    
    // Show toast
    toast(title, {
      description: message,
      action: {
        label: "View",
        onClick: () => {
          // Handle view action based on notification type
          if (type === 'job' && data?.jobId) {
            window.location.href = `/jobs?id=${data.jobId}`;
          } else if (type === 'application' && data?.applicationId) {
            window.location.href = `/application-tracker?id=${data.applicationId}`;
          } else if (type === 'scheme' && data?.schemeId) {
            window.location.href = `/scheme-manager?id=${data.schemeId}`;
          }
        }
      }
    });
  }

  // Notify users about new job postings
  notifyAboutNewJob(job: any): void {
    // Get all users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Filter for student users
    const studentUsers = users.filter((user: any) => user.role === 'student');
    
    // For each student user, check if they should be notified
    studentUsers.forEach((user: any) => {
      // Check if job location matches user location (if available)
      const locationMatch = !user.location || job.location.includes(user.location);
      
      // Check if job skills match user skills (if available)
      const userSkills = user.skills || [];
      const jobSkills = job.skills || [];
      const skillsMatch = userSkills.length === 0 || 
        jobSkills.some((skill: string) => 
          userSkills.some((userSkill: string) => 
            userSkill.toLowerCase().includes(skill.toLowerCase()) || 
            skill.toLowerCase().includes(userSkill.toLowerCase())
          )
        );
      
      // If location or skills match, send notification
      if (locationMatch || skillsMatch) {
        // Add notification to user's notifications
        const notification: Notification = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          userId: user.email,
          title: 'New Job Opportunity',
          message: `${job.title} at ${job.company} in ${job.location}`,
          type: 'job',
          read: false,
          createdAt: new Date().toISOString(),
          data: { jobId: job.id }
        };
        
        const allNotifications = this.getAllNotifications();
        allNotifications.push(notification);
        localStorage.setItem(this.storageKey, JSON.stringify(allNotifications));
        
        // Track notification creation
        dataSyncService.trackAction(
          user.email,
          'student',
          'job_notification_received',
          { jobId: job.id, jobTitle: job.title, company: job.company }
        );
      }
    });
  }
}

export const notificationService = new NotificationService();