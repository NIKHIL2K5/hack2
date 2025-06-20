
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Bell, Send, Users, MessageSquare, Plus, Eye, Edit, Trash2, Target, Clock, CheckCircle } from 'lucide-react';

export const NotificationCenter = () => {
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [messageText, setMessageText] = useState('');
  const [messageTitle, setMessageTitle] = useState('');

  const audienceOptions = [
    { id: 'all', name: 'All Users', count: 2156 },
    { id: 'students', name: 'Students', count: 1456 },
    { id: 'startups', name: 'Startups', count: 387 },
    { id: 'officials', name: 'Officials', count: 45 },
    { id: 'district-hyderabad', name: 'Hyderabad District', count: 892 },
    { id: 'district-warangal', name: 'Warangal District', count: 234 },
    { id: 'sector-tech', name: 'Tech Sector', count: 156 },
    { id: 'sector-agriculture', name: 'Agriculture Sector', count: 89 }
  ];

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

  const scheduleTemplate = [
    { id: 1, name: 'Weekly Job Updates', frequency: 'Weekly', nextSend: '2024-01-22', audience: 'Students' },
    { id: 2, name: 'Startup Opportunities Digest', frequency: 'Bi-weekly', nextSend: '2024-01-25', audience: 'Startups' },
    { id: 3, name: 'Policy Updates', frequency: 'Monthly', nextSend: '2024-02-01', audience: 'All Users' },
    { id: 4, name: 'District Performance Report', frequency: 'Monthly', nextSend: '2024-02-05', audience: 'Officials' }
  ];

  const emergencyAlerts = [
    { type: 'System Issue', message: 'Document upload service experiencing delays', priority: 'high', timestamp: '2 hours ago' },
    { type: 'Policy Change', message: 'New compliance requirements effective immediately', priority: 'medium', timestamp: '6 hours ago' },
    { type: 'Maintenance', message: 'Scheduled database optimization tonight', priority: 'low', timestamp: '1 day ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'scheduled': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

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
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Active Notifications', value: '18', change: '+5', icon: Bell, color: 'bg-blue-500' },
          { title: 'Messages Sent Today', value: '245', change: '+67', icon: Send, color: 'bg-green-500' },
          { title: 'Total Recipients', value: '2.1K', change: '+156', icon: Users, color: 'bg-purple-500' },
          { title: 'Avg Open Rate', value: '84%', change: '+12%', icon: Eye, color: 'bg-orange-500' }
        ].map((stat) => (
          <Card key={stat.title} className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-white/80 text-sm">{stat.title}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Create New Notification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-white/80 text-sm block mb-2">Title</label>
              <Input
                value={messageTitle}
                onChange={(e) => setMessageTitle(e.target.value)}
                placeholder="Enter notification title..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <label className="text-white/80 text-sm block mb-2">Message</label>
              <Textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Enter your message..."
                rows={4}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <label className="text-white/80 text-sm block mb-2">Target Audience</label>
              <div className="grid grid-cols-2 gap-2">
                {audienceOptions.slice(0, 6).map((audience) => (
                  <Button
                    key={audience.id}
                    size="sm"
                    variant={selectedAudience === audience.id ? "default" : "outline"}
                    onClick={() => setSelectedAudience(audience.id)}
                    className={selectedAudience === audience.id ? 
                      "bg-blue-500 text-white" : 
                      "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    }
                  >
                    {audience.name} ({audience.count})
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white flex-1">
                <Send className="w-4 h-4 mr-2" />
                Send Now
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Clock className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Emergency Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyAlerts.map((alert, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-medium text-sm">{alert.type}</h4>
                        <span className={`text-xs ${getPriorityColor(alert.priority)}`}>
                          {alert.priority}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm">{alert.message}</p>
                      <span className="text-white/50 text-xs">{alert.timestamp}</span>
                    </div>
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                      <Bell className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

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

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Scheduled Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduleTemplate.map((template) => (
              <div key={template.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-white font-medium text-sm">{template.name}</p>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-white/60">Frequency: {template.frequency}</span>
                      <span className="text-white/60">•</span>
                      <span className="text-white/60">Next: {template.nextSend}</span>
                      <span className="text-white/60">•</span>
                      <span className="text-white/60">Audience: {template.audience}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
