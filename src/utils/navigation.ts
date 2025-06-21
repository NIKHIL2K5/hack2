import { getUserInfo } from '@/contexts/ai/userHelpers';

export const getDashboardPathByRole = (role: string | null): string => {
  switch (role) {
    case 'startup':
      return '/dashboard/startup';
    case 'official':
      return '/dashboard/official';
    case 'student':
      return '/dashboard/student';
    case 'freelancer':
    case 'agency':
      return '/freelancer-dashboard';
    case 'client':
    case 'youtuber':
    case 'ngo':
      return '/client-dashboard';
    default:
      return '/';
  }
};

export const redirectToDashboard = (navigate: any): void => {
  const userInfo = getUserInfo();
  const dashboardPath = getDashboardPathByRole(userInfo.role);
  navigate(dashboardPath);
};