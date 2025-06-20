
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Clock } from 'lucide-react';

export const NotificationCreationForm = () => {
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [messageText, setMessageText] = useState('');
  const [messageTitle, setMessageTitle] = useState('');

  const audienceOptions = [
    { id: 'all', name: 'All Users', count: 2156 },
    { id: 'students', name: 'Students', count: 1456 },
    { id: 'startups', name: 'Startups', count: 387 },
    { id: 'officials', name: 'Officials', count: 45 },
    { id: 'district-hyderabad', name: 'Hyderabad District', count: 892 },
    { id: 'district-warangal', name: 'Warangal District', count: 234 }
  ];

  return (
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
            {audienceOptions.map((audience) => (
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
  );
};
