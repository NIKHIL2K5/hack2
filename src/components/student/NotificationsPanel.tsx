import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Briefcase, Clock, Star, Lightbulb, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { notificationService, Notification } from '@/services/notificationService';

interface NotificationsPanelProps {
  appliedJobs: any[];
  profile: any;
}

export const NotificationsPanel = ({ appliedJobs, profile }: NotificationsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load notifications on mount and when applied jobs change
  useEffect(() => {
    loadNotifications();
    
    // Set up interval to check for new notifications
    const interval = setInterval(loadNotifications, 30000);
    
    return () => clearInterval(interval);
  }, [appliedJobs]);

  const loadNotifications = () => {
    const userNotifications = notificationService.getNotifications();
    setNotifications(userNotifications);
    setUnreadCount(notificationService.getUnreadCount());
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job': return Briefcase;
      case 'application': return CheckCircle;
      case 'scheme': return FileText;
      case 'system': return Lightbulb;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'job': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'application': return 'bg-green-100 text-green-800 border-green-200';
      case 'scheme': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'system': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    notificationService.markAsRead(notification.id);
    
    // Navigate based on notification type
    if (notification.type === 'job' && notification.data?.jobId) {
      window.location.href = `/jobs?id=${notification.data.jobId}`;
    } else if (notification.type === 'application' && notification.data?.applicationId) {
      window.location.href = `/application-tracker?id=${notification.data.applicationId}`;
    } else if (notification.type === 'scheme' && notification.data?.schemeId) {
      window.location.href = `/scheme-manager?id=${notification.data.schemeId}`;
    }
    
    // Refresh notifications
    loadNotifications();
  };

  const handleMarkAllAsRead = () => {
    notificationService.markAllAsRead();
    loadNotifications();
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative border-neutral-300 text-neutral-700 hover:bg-neutral-100"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
            {unreadCount}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[500px] overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleMarkAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Mark all as read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[400px] custom-scrollbar">
              {notifications.length > 0 ? (
                <div className="space-y-2 p-2">
                  {notifications.map((notification, index) => {
                    const IconComponent = getNotificationIcon(notification.type);
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card 
                          className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                            !notification.read ? 'border-l-4 border-l-blue-500' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {new Date(notification.createdAt).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No notifications yet</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};