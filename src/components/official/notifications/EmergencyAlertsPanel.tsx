
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

export const EmergencyAlertsPanel = () => {
  const emergencyAlerts = [
    { type: 'System Issue', message: 'Document upload service experiencing delays', priority: 'high', timestamp: '2 hours ago' },
    { type: 'Policy Change', message: 'New compliance requirements effective immediately', priority: 'medium', timestamp: '6 hours ago' },
    { type: 'Maintenance', message: 'Scheduled database optimization tonight', priority: 'low', timestamp: '1 day ago' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
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
  );
};
