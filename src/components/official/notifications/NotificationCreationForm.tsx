import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Clock, Users, Bell } from 'lucide-react';
import { toast } from 'sonner';

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
      toast.error("Please fill in both title and message fields");
      return;
    }

    console.log('Sending notification:', {
      title: messageTitle,
      message: messageText,
      audience: selectedAudience,
      timestamp: new Date().toISOString()
    });

    toast.success(`Successfully sent "${messageTitle}" to ${audienceOptions.find(a => a.id === selectedAudience)?.name}`);

    setMessageTitle('');
    setMessageText('');
    setSelectedAudience('all');
    
    if (onClose) {
      onClose();
    }
  };

  const handleSchedule = () => {
    if (!messageTitle.trim() || !messageText.trim()) {
      toast.error("Please fill in both title and message fields");
      return;
    }

    console.log('Scheduling notification:', {
      title: messageTitle,
      message: messageText,
      audience: selectedAudience,
      status: 'scheduled'
    });

    toast.success("Notification has been scheduled and will be sent at the specified time");

    setMessageTitle('');
    setMessageText('');
    setSelectedAudience('all');
    
    if (onClose) {
      onClose();
    }
  };

  const selectedAudienceData = audienceOptions.find(a => a.id === selectedAudience);

  return (
    <Card className="bg-white shadow-xl border border-gray-200">
      <CardHeader className="pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">Create Notification</CardTitle>
            <p className="text-gray-600 text-sm">Send announcements and updates to your audience</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div>
          <label className="text-gray-800 text-sm font-medium block mb-2">Notification Title</label>
          <Input
            value={messageTitle}
            onChange={(e) => setMessageTitle(e.target.value)}
            placeholder="Enter notification title..."
            className="w-full bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        
        <div>
          <label className="text-gray-800 text-sm font-medium block mb-2">Message Content</label>
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
            <Users className="w-4 h-4 mr-2 text-blue-600" />
            Target Audience
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
              <p className="text-blue-800 text-sm flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                <strong>Selected:</strong> {selectedAudienceData.name} ({selectedAudienceData.count} recipients)
              </p>
            </div>
          )}
        </div>
        
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white flex-1 shadow-md h-12"
            onClick={handleSendNow}
          >
            <Send className="w-4 h-4 mr-2" />
            Send Now
          </Button>
          <Button 
            variant="outline" 
            className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 px-6 shadow-sm h-12"
            onClick={handleSchedule}
          >
            <Clock className="w-4 h-4 mr-2" />
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};