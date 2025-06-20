
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit } from 'lucide-react';

export const RecentNotificationsList = () => {
  const recentNotifications = [
    {
      id: 1,
      title: 'New T-Hub Incubation Program Open',
      message: 'Applications are now open for the T-Hub incubation program. Apply before March 31st.',
      audience: 'Startups',
      sentDate: '2024-01-18',
      status: 'sent',
      recipients: 387,
      openRate: '78%',
      clickRate: '34%'
    },
    {
      id: 2,
      title: 'System Maintenance Scheduled',
      message: 'The platform will undergo maintenance on Jan 20th from 2-4 AM. Services may be temporarily unavailable.',
      audience: 'All Users',
      sentDate: '2024-01-17',
      status: 'sent',
      recipients: 2156,
      openRate: '85%',
      clickRate: '12%'
    },
    {
      id: 3,
      title: 'Job Fair Registration Now Open',
      message: 'Register for the state-wide job fair happening in February. Over 200 companies participating.',
      audience: 'Students',
      sentDate: '2024-01-16',
      status: 'sent',
      recipients: 1456,
      openRate: '92%',
      clickRate: '67%'
    },
    {
      id: 4,
      title: 'Policy Update: Startup Registration',
      message: 'New simplified process for startup registration. Updated guidelines are now available.',
      audience: 'Startups',
      sentDate: '2024-01-15',
      status: 'draft',
      recipients: 0,
      openRate: '0%',
      clickRate: '0%'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'scheduled': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentNotifications.map((notification) => (
            <div key={notification.id} className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-medium">{notification.title}</h4>
                    <Badge className={`${getStatusColor(notification.status)} text-white text-xs`}>
                      {notification.status}
                    </Badge>
                  </div>
                  <p className="text-white/70 text-sm mb-2">{notification.message}</p>
                  <div className="grid grid-cols-5 gap-4 text-xs">
                    <div>
                      <span className="text-white/60">Audience: </span>
                      <span className="text-white/80">{notification.audience}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Recipients: </span>
                      <span className="text-white/80">{notification.recipients}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Open Rate: </span>
                      <span className="text-white/80">{notification.openRate}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Click Rate: </span>
                      <span className="text-white/80">{notification.clickRate}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Sent: </span>
                      <span className="text-white/80">{notification.sentDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
