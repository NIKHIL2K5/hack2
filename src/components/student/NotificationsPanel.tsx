
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Briefcase, Clock, Star, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Notification {
  id: number;
  type: 'info' | 'success' | 'deadline' | 'tip';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationsPanelProps {
  appliedJobs: any[];
  profile: any;
}

export const NotificationsPanel = ({ appliedJobs, profile }: NotificationsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Generate smart notifications based on user data
    const smartNotifications: Notification[] = [];

    // Job suggestions based on skills
    if (profile.skills && profile.skills.length > 0) {
      smartNotifications.push({
        id: 1,
        type: 'info',
        title: 'New Job Match!',
        message: `Found 3 new positions matching your ${profile.skills[0]} skills`,
        timestamp: '2 hours ago',
        isRead: false
      });
    }

    // Application reminders
    if (appliedJobs.length > 0) {
      smartNotifications.push({
        id: 2,
        type: 'success',
        title: 'Application Update',
        message: `Your application to ${appliedJobs[appliedJobs.length - 1]?.company} is under review`,
        timestamp: '1 day ago',
        isRead: false
      });
    }

    // Profile completion tips
    if (!profile.resume || !profile.portfolioUrl) {
      smartNotifications.push({
        id: 3,
        type: 'tip',
        title: 'Complete Your Profile',
        message: 'Add your resume and portfolio to increase job match rate by 60%',
        timestamp: '3 hours ago',
        isRead: false
      });
    }

    // Deadline alerts
    smartNotifications.push({
      id: 4,
      type: 'deadline',
      title: 'Application Deadline',
      message: 'TechCorp Innovations internship application closes in 2 days',
      timestamp: '5 hours ago',
      isRead: false
    });

    setNotifications(smartNotifications);
  }, [appliedJobs, profile]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return Star;
      case 'deadline': return Clock;
      case 'tip': return Lightbulb;
      default: return Briefcase;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'deadline': return 'bg-red-100 text-red-800 border-red-200';
      case 'tip': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
            className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
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

            <div className="overflow-y-auto max-h-80">
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
                            !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
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
