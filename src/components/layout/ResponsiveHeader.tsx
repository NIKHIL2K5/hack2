import React from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useResponsive } from '@/hooks/useResponsive';
import { authService } from '@/services/authService';

interface ResponsiveHeaderProps {
  title: string;
  subtitle?: string;
  showProfile?: boolean;
  showNotifications?: boolean;
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
  logoSrc?: string;
  actions?: React.ReactNode;
}

export const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({
  title,
  subtitle,
  showProfile = true,
  showNotifications = true,
  onProfileClick,
  onNotificationsClick,
  logoSrc = "/lovable-uploads/dc27c7bf-1e1d-4fb1-a5c7-01b85351db67.png",
  actions
}) => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2 sm:space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/" className="flex items-center">
              <img 
                src={logoSrc}
                alt="Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate max-w-[150px] sm:max-w-none">
                {title}
              </h1>
              {subtitle && !isMobile && (
                <p className="text-xs sm:text-sm text-gray-600">{subtitle}</p>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-2 sm:space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {actions}
            
            {showNotifications && (
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                className="border-gray-300 text-gray-700"
                onClick={onNotificationsClick}
              >
                <Bell className="w-4 h-4" />
                {!isMobile && <span className="ml-2">Notifications</span>}
              </Button>
            )}
            
            {showProfile && (
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                className="border-gray-300 text-gray-700"
                onClick={onProfileClick}
              >
                <User className="w-4 h-4" />
                {!isMobile && <span className="ml-2">Profile</span>}
              </Button>
            )}
            
            {currentUser && (
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                className="border-red-300 text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                {!isMobile && !isTablet && <span className="ml-2">Logout</span>}
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  );
};