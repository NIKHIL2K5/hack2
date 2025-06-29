import { authService } from '@/services/authService';

// Get user info from localStorage
export const getUserInfo = () => {
  const currentUser = authService.getCurrentUser();
  
  if (currentUser) {
    return { 
      role: currentUser.role, 
      name: currentUser.name || 'User', 
      email: currentUser.email 
    };
  }
  
  // Fallback to legacy storage methods
  const studentUser = JSON.parse(localStorage.getItem('studentUser') || '{}');
  const officialUser = JSON.parse(localStorage.getItem('officialUser') || '{}');
  const startupAuth = JSON.parse(localStorage.getItem('startupAuth') || '{}');

  if (studentUser.email) {
    return { role: 'student', name: studentUser.name || 'Student', email: studentUser.email };
  } else if (officialUser.email) {
    return { role: 'official', name: officialUser.name || 'Official', email: officialUser.email };
  } else if (startupAuth.user) {
    return { role: 'startup', name: startupAuth.user.name || 'Startup', email: startupAuth.user.email };
  }
  
  return { role: 'guest', name: 'User', email: '' };
};