
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface NotificationCreationFormProps {
  onClose?: () => void;
}

export const NotificationCreationForm = ({ onClose }: NotificationCreationFormProps) => {
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

  const handleSendNow = () => {
    if (!messageTitle.trim() || !messageText.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both title and message fields",
        variant: "destructive",
      });
      return;
    }

    console.log('Sending notification:', {
      title: messageTitle,
      message: messageText,
      audience: selectedAudience,
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Notification Sent",
      description: `Successfully sent "${messageTitle}" to ${audienceOptions.find(a => a.id === selectedAudience)?.name}`,
    });

    setMessageTitle('');
    setMessageText('');
    setSelectedAudience('all');
    
    if (onClose) {
      onClose();
    }
  };

  const handleSchedule = () => {
    if (!messageTitle.trim() || !messageText.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both title and message fields",
        variant: "destructive",
      });
      return;
    }

    console.log('Scheduling notification:', {
      title: messageTitle,
      message: messageText,
      audience: selectedAudience,
      status: 'scheduled'
    });

    toast({
      title: "Notification Scheduled",
      description: "Notification has been scheduled and will be sent at the specified time",
    });

    setMessageTitle('');
    setMessageText('');
    setSelectedAudience('all');
    
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label className="text-gray-700 text-sm font-medium block mb-2">Title</label>
        <Input
          value={messageTitle}
          onChange={(e) => setMessageTitle(e.target.value)}
          placeholder="Enter notification title..."
          className="w-full bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
        />
      </div>
      
      <div>
        <label className="text-gray-700 text-sm font-medium block mb-2">Message</label>
        <Textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Enter your message..."
          rows={6}
          className="w-full bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 resize-none"
        />
      </div>
      
      <div>
        <label className="text-gray-700 text-sm font-medium block mb-3">Target Audience</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {audienceOptions.map((audience) => (
            <Button
              key={audience.id}
              size="sm"
              variant={selectedAudience === audience.id ? "default" : "outline"}
              onClick={() => setSelectedAudience(audience.id)}
              className={`justify-start text-left h-auto py-3 px-4 ${
                selectedAudience === audience.id ? 
                "bg-blue-500 hover:bg-blue-600 text-white border-blue-500" : 
                "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{audience.name}</span>
                <span className="text-xs opacity-70">({audience.count} users)</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex gap-3 pt-4">
        <Button 
          className="bg-blue-500 hover:bg-blue-600 text-white flex-1"
          onClick={handleSendNow}
          size="lg"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Now
        </Button>
        <Button 
          variant="outline" 
          className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300 px-6"
          onClick={handleSchedule}
          size="lg"
        >
          <Clock className="w-4 h-4 mr-2" />
          Schedule
        </Button>
      </div>
    </div>
  );
};
