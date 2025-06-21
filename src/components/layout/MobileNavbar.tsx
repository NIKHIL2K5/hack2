import React from 'react';
import { Home, User, Briefcase, FileText, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { authService } from '@/services/authService';
import { motion } from 'framer-motion';

export const MobileNavbar: React.FC = () => {
  const location = useLocation();
  const currentUser = authService.getCurrentUser();
  const userRole = currentUser?.role || 'guest';

  // Define navigation items based on user role
  const getNavItems = () => {
    if (userRole === 'student') {
      return [
        { path: '/dashboard/student', label: 'Home', icon: Home },
        { path: '/jobs', label: 'Jobs', icon: Briefcase },
        { path: '/my-applications', label: 'Applications', icon: FileText },
        { path: '/profile-settings', label: 'Profile', icon: User },
      ];
    }

    if (userRole === 'startup') {
      return [
        { path: '/dashboard/startup', label: 'Home', icon: Home },
        { path: '/applications', label: 'Applications', icon: FileText },
        { path: '/compliance', label: 'Compliance', icon: Briefcase },
        { path: '/profile-settings', label: 'Profile', icon: User },
      ];
    }

    if (userRole === 'official') {
      return [
        { path: '/dashboard/official', label: 'Home', icon: Home },
        { path: '/scheme-manager', label: 'Schemes', icon: FileText },
        { path: '/analytics', label: 'Analytics', icon: Briefcase },
        { path: '/profile-settings', label: 'Profile', icon: User },
      ];
    }

    // Default items for guests
    return [
      { path: '/', label: 'Home', icon: Home },
      { path: '/login/student', label: 'Student', icon: User },
      { path: '/login/startup', label: 'Startup', icon: Briefcase },
      { path: '/login/official', label: 'Official', icon: FileText },
    ];
  };

  const navItems = getNavItems();

  // Only show on mobile devices
  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive ? 'text-primary-600' : 'text-gray-500'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
              <span className="text-xs mt-1">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 w-1/4 h-0.5 bg-primary-600"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};