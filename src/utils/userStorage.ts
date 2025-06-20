
export interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  education: string;
  experience: string;
  bio: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  appliedJobs: any[];
  companies?: string[];
  lastLogin: string;
}

export const saveUserData = (userData: UserData) => {
  try {
    localStorage.setItem('govStartupUserData', JSON.stringify({
      ...userData,
      lastLogin: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
};

export const loadUserData = (): UserData | null => {
  try {
    const saved = localStorage.getItem('govStartupUserData');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load user data:', error);
    return null;
  }
};

export const clearUserData = () => {
  try {
    localStorage.removeItem('govStartupUserData');
  } catch (error) {
    console.error('Failed to clear user data:', error);
  }
};
