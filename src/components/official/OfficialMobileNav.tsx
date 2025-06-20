
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  FileText, 
  Users, 
  MapPin, 
  MessageSquare, 
  Shield, 
  Bell, 
  Settings,
  Building2,
  TrendingUp,
  User
} from 'lucide-react';

interface OfficialMobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const OfficialMobileNav = ({ activeTab, setActiveTab }: OfficialMobileNavProps) => {
  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'schemes', label: 'Schemes', icon: FileText },
    { id: 'startups', label: 'Startups', icon: Building2 },
    { id: 'jobs', label: 'Jobs', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: MapPin },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'policy', label: 'Policy', icon: TrendingUp },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'roles', label: 'Roles', icon: Settings }
  ];

  const handleTabClick = (tabId: string) => {
    console.log('Mobile nav tab clicked:', tabId);
    setActiveTab(tabId);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20 z-50">
      <div className="grid grid-cols-4 gap-1 p-2">
        {navigationItems.slice(0, 8).map((item) => (
          <Button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            variant="ghost"
            className={`flex flex-col items-center space-y-1 p-2 h-auto text-xs transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-blue-500/30 text-blue-200 border border-blue-400/30' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span className="truncate max-w-full leading-tight">{item.label}</span>
          </Button>
        ))}
      </div>
      {navigationItems.length > 8 && (
        <div className="grid grid-cols-4 gap-1 p-2 pt-0">
          {navigationItems.slice(8).map((item) => (
            <Button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              variant="ghost"
              className={`flex flex-col items-center space-y-1 p-2 h-auto text-xs transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-500/30 text-blue-200 border border-blue-400/30' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="truncate max-w-full leading-tight">{item.label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
