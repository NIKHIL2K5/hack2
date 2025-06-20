
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { NotificationStatsCards } from './notifications/NotificationStatsCards';
import { NotificationCreationForm } from './notifications/NotificationCreationForm';
import { EmergencyAlertsPanel } from './notifications/EmergencyAlertsPanel';
import { RecentNotificationsList } from './notifications/RecentNotificationsList';
import { ScheduledNotificationsList } from './notifications/ScheduledNotificationsList';

export const NotificationCenter = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Notifications & Announcements</h2>
          <p className="text-white/70">Broadcast messages, manage communications, and engage with platform users</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Notification
        </Button>
      </div>
      
      <NotificationStatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotificationCreationForm />
        <EmergencyAlertsPanel />
      </div>

      <RecentNotificationsList />
      <ScheduledNotificationsList />
    </div>
  );
};
