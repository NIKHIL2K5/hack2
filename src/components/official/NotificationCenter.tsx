import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NotificationStatsCards } from './notifications/NotificationStatsCards';
import { NotificationCreationForm } from './notifications/NotificationCreationForm';
import { EmergencyAlertsPanel } from './notifications/EmergencyAlertsPanel';
import { RecentNotificationsList } from './notifications/RecentNotificationsList';
import { ScheduledNotificationsList } from './notifications/ScheduledNotificationsList';

export const NotificationCenter = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateNotification = () => {
    console.log('Opening create notification modal');
    setIsCreateModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Notifications & Announcements</h2>
          <p className="text-white/70">Broadcast messages, manage communications, and engage with platform users</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
          onClick={handleCreateNotification}
        >
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

      {/* Create Notification Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl p-0 bg-white border-0 overflow-hidden">
          <NotificationCreationForm onClose={() => setIsCreateModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};