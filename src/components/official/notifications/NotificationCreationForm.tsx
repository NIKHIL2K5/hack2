
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Clock, Users } from 'lucide-react';
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

  const selectedAudienceData = audienceOptions.find(a => a.id === selectedAudience);

  return (
    <Card className="bg-white/95 backdrop-blur-lg border-white/20 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-gray-900 text-xl font-semibold">Create Notification</CardTitle>
        <p className="text-gray-600 text-sm">Send announcements and updates to your audience</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-gray-800 text-sm font-medium block mb-3">Notification Title</label>
          <Input
            value={messageTitle}
            onChange={(e) => setMessageTitle(e.target.value)}
            placeholder="Enter notification title..."
            className="w-full bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        
        <div>
          <label className="text-gray-800 text-sm font-medium block mb-3">Message Content</label>
          <Textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Enter your message content here..."
            rows={5}
            className="w-full bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        
        <div>
          <label className="text-gray-800 text-sm font-medium block mb-3 flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Target Audience
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {audienceOptions.map((audience) => (
              <Button
                key={audience.id}
                size="sm"
                variant={selectedAudience === audience.id ? "default" : "outline"}
                onClick={() => setSelectedAudience(audience.id)}
                className={`justify-start text-left h-auto py-3 px-4 transition-all ${
                  selectedAudience === audience.id ? 
                  "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-md" : 
                  "bg-white hover:bg-blue-50 text-gray-700 border-gray-300 hover:border-blue-300"
                }`}
              >
                <div className="flex flex-col items-start w-full">
                  <span className="font-medium text-sm">{audience.name}</span>
                  <span className="text-xs opacity-75">({audience.count} users)</span>
                </div>
              </Button>
            ))}
          </div>
          {selectedAudienceData && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Selected:</strong> {selectedAudienceData.name} ({selectedAudienceData.count} recipients)
              </p>
            </div>
          )}
        </div>
        
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white flex-1 shadow-md"
            onClick={handleSendNow}
            size="lg"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Now
          </Button>
          <Button 
            variant="outline" 
            className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 px-6 shadow-sm"
            onClick={handleSchedule}
            size="lg"
          >
            <Clock className="w-4 h-4 mr-2" />
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
