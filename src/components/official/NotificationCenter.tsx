
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Send, Users, MessageSquare } from 'lucide-react';

export const NotificationCenter = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Notifications & Announcements</h2>
        <p className="text-white/70">Broadcast messages and manage system notifications</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Active Notifications', value: '12', icon: Bell, color: 'bg-blue-500' },
          { title: 'Messages Sent', value: '245', icon: Send, color: 'bg-green-500' },
          { title: 'Recipients Reached', value: '1,847', icon: Users, color: 'bg-purple-500' }
        ].map((stat) => (
          <Card key={stat.title} className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Notification Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70">Notification and announcement system will be implemented here including broadcast messaging, system alerts, and communication tools for reaching startups and students.</p>
        </CardContent>
      </Card>
    </div>
  );
};
