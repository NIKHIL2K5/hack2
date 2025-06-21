import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Bell, User, Menu } from 'lucide-react';

interface OfficialMobileHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onMenuToggle?: () => void;
}

export const OfficialMobileHeader = ({ activeTab, setActiveTab, onMenuToggle }: OfficialMobileHeaderProps) => {
  const getTabTitle = (tab: string) => {
    const titles: { [key: string]: string } = {
      overview: 'Dashboard Overview',
      profile: 'Profile Settings',
      schemes: 'Scheme Management',
      startups: 'Startup Monitoring',
      jobs: 'Job Moderation',
      analytics: 'District Analytics',
      feedback: 'Feedback Analytics',
      verification: 'User Verification',
      policy: 'Policy Planning',
      notifications: 'Notifications',
      documents: 'Document Management',
      roles: 'Role Management'
    };
    return titles[tab] || 'Government Dashboard';
  };

  const handleNotificationClick = () => {
    console.log('Mobile header notifications clicked');
    setActiveTab('notifications');
  };

  const handleProfileClick = () => {
    console.log('Mobile header profile clicked');
    setActiveTab('profile');
  };

  return (
    <header className="lg:hidden bg-white/5 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-white" />
          <div>
            <h1 className="text-lg font-bold text-white">{getTabTitle(activeTab)}</h1>
            <p className="text-white/60 text-sm">Telangana State</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200"
            onClick={handleNotificationClick}
          >
            <Bell className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200"
            onClick={handleProfileClick}
          >
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};