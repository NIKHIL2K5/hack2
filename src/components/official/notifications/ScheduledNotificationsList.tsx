
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Edit, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const ScheduledNotificationsList = () => {
  const scheduleTemplate = [
    { id: 1, name: 'Weekly Job Updates', frequency: 'Weekly', nextSend: '2024-01-22', audience: 'Students' },
    { id: 2, name: 'Startup Opportunities Digest', frequency: 'Bi-weekly', nextSend: '2024-01-25', audience: 'Startups' },
    { id: 3, name: 'Policy Updates', frequency: 'Monthly', nextSend: '2024-02-01', audience: 'All Users' },
    { id: 4, name: 'District Performance Report', frequency: 'Monthly', nextSend: '2024-02-05', audience: 'Officials' }
  ];

  const handleEditSchedule = (template: any) => {
    console.log('Editing scheduled notification:', template);
    toast({
      title: "Edit Schedule",
      description: `Opening editor for "${template.name}"`,
    });
  };

  const handleActivateSchedule = (template: any) => {
    console.log('Activating scheduled notification:', template);
    toast({
      title: "Schedule Activated",
      description: `"${template.name}" has been activated and will send automatically`,
    });
  };

  return (
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
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => handleEditSchedule(template)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => handleActivateSchedule(template)}
                >
                  <CheckCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
