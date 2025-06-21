import React, { useState } from 'react';
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
  User,
  Menu,
  X
} from 'lucide-react';

interface OfficialMobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const OfficialMobileNav = ({ activeTab, setActiveTab }: OfficialMobileNavProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const primaryNavItems = navigationItems.slice(0, 4);
  const secondaryNavItems = navigationItems.slice(4);

  return (
    <>
      {/* Overlay */}
      {isExpanded && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Expanded Menu */}
        {isExpanded && (
          <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg">
            <div className="grid grid-cols-3 gap-2 p-4 max-h-64 overflow-y-auto">
              {secondaryNavItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  variant="ghost"
                  className={`flex flex-col items-center space-y-1 p-3 h-auto text-xs transition-all duration-200 rounded-lg ${
                    activeTab === item.id 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="truncate max-w-full leading-tight">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Main Navigation Bar */}
        <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg">
          <div className="grid grid-cols-5 gap-1 p-2">
            {primaryNavItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                variant="ghost"
                className={`flex flex-col items-center space-y-1 p-2 h-auto text-xs transition-all duration-200 rounded-lg ${
                  activeTab === item.id 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="truncate max-w-full leading-tight">{item.label}</span>
              </Button>
            ))}
            
            {/* More Button */}
            <Button
              onClick={toggleExpanded}
              variant="ghost"
              className={`flex flex-col items-center space-y-1 p-2 h-auto text-xs transition-all duration-200 rounded-lg ${
                isExpanded 
                  ? 'bg-gray-200 text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isExpanded ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
              <span className="truncate max-w-full leading-tight">
                {isExpanded ? 'Close' : 'More'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};