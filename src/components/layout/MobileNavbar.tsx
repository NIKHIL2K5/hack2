import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, FileText, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';

export const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleLogout = () => {
    authService.logout();
    navigate('/');
    setIsOpen(false);
  };

  // Define navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      { path: '/', label: 'Home', icon: Home },
    ];

    if (!currentUser) {
      return [
        ...baseItems,
        { path: '/login/student', label: 'Student Login', icon: User },
        { path: '/login/startup', label: 'Startup Login', icon: Briefcase },
        { path: '/login/official', label: 'Official Login', icon: FileText },
      ];
    }

    if (currentUser.role === 'student') {
      return [
        ...baseItems,
        { path: '/dashboard/student', label: 'Dashboard', icon: User },
        { path: '/jobs', label: 'Job Board', icon: Briefcase },
        { path: '/my-applications', label: 'My Applications', icon: FileText },
        { path: '/profile-settings', label: 'Profile', icon: Settings },
      ];
    }

    if (currentUser.role === 'startup') {
      return [
        ...baseItems,
        { path: '/dashboard/startup', label: 'Dashboard', icon: User },
        { path: '/applications', label: 'Applications', icon: FileText },
        { path: '/profile-settings', label: 'Profile', icon: Settings },
      ];
    }

    if (currentUser.role === 'official') {
      return [
        ...baseItems,
        { path: '/dashboard/official', label: 'Dashboard', icon: User },
        { path: '/scheme-manager', label: 'Schemes', icon: FileText },
        { path: '/profile-settings', label: 'Profile', icon: Settings },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <Button
          onClick={toggleMenu}
          className="w-12 h-12 rounded-full bg-primary-600 text-white shadow-lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={toggleMenu} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Menu</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <nav className="space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center p-3 rounded-lg ${
                          location.pathname === item.path
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
                {currentUser && (
                  <div className="p-4 border-t">
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};