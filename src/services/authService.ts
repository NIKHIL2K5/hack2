import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UserData {
  id?: string;
  email: string;
  name: string;
  role: 'student' | 'startup' | 'official';
  organization?: string;
  department?: string;
  employeeId?: string;
  college?: string;
  skills?: string[];
  lastLogin: string;
}

class AuthService {
  // Register a new user
  async register(email: string, password: string, userData: Partial<UserData>): Promise<boolean> {
    try {
      // In a real implementation, this would use Supabase Auth
      // For now, we'll simulate it with localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.some((user: any) => user.email === email);
      
      if (userExists) {
        toast.error('User with this email already exists');
        return false;
      }
      
      const newUser = {
        id: Date.now().toString(),
        email,
        ...userData,
        lastLogin: new Date().toISOString()
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Store current user
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      // Also store in role-specific storage for backward compatibility
      if (userData.role === 'student') {
        localStorage.setItem('studentUser', JSON.stringify(newUser));
      } else if (userData.role === 'startup') {
        localStorage.setItem('startupAuth', JSON.stringify({ user: newUser }));
      } else if (userData.role === 'official') {
        localStorage.setItem('officialUser', JSON.stringify({
          email: newUser.email,
          name: newUser.name,
          organization: {
            id: 'telangana-gov',
            name: 'Government of Telangana',
            type: 'government',
            allowedEmails: [newUser.email]
          },
          department: newUser.department || 'General',
          employeeId: newUser.employeeId || 'EMP001',
          registeredAt: new Date().toISOString()
        }));
      }
      
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      return false;
    }
  }

  // Login an existing user
  async login(email: string, password: string): Promise<boolean> {
    try {
      // In a real implementation, this would use Supabase Auth
      // For now, we'll simulate it with localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = existingUsers.find((user: any) => user.email === email);
      
      if (!user) {
        // If no user found, create one for demo purposes
        return this.register(email, password, {
          name: email.split('@')[0],
          role: email.includes('student') ? 'student' : 
                email.includes('official') ? 'official' : 'startup',
          lastLogin: new Date().toISOString()
        });
      }
      
      // Update last login
      user.lastLogin = new Date().toISOString();
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Store current user
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Also store in role-specific storage for backward compatibility
      if (user.role === 'student') {
        localStorage.setItem('studentUser', JSON.stringify(user));
      } else if (user.role === 'startup') {
        localStorage.setItem('startupAuth', JSON.stringify({ user }));
      } else if (user.role === 'official') {
        localStorage.setItem('officialUser', JSON.stringify({
          email: user.email,
          name: user.name,
          organization: {
            id: 'telangana-gov',
            name: 'Government of Telangana',
            type: 'government',
            allowedEmails: [user.email]
          },
          department: user.department || 'General',
          employeeId: user.employeeId || 'EMP001',
          registeredAt: new Date().toISOString()
        }));
      }
      
      toast.success('Login successful!');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    }
  }

  // Logout the current user
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('studentUser');
    localStorage.removeItem('startupAuth');
    localStorage.removeItem('officialUser');
    toast.success('Logged out successfully');
  }

  // Get the current user
  getCurrentUser(): UserData | null {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      return JSON.parse(userStr);
    }
    
    // Fallback to legacy storage methods
    const studentUser = JSON.parse(localStorage.getItem('studentUser') || '{}');
    const officialUser = JSON.parse(localStorage.getItem('officialUser') || '{}');
    const startupAuth = JSON.parse(localStorage.getItem('startupAuth') || '{}');
    
    if (studentUser.email) {
      return {
        email: studentUser.email,
        name: studentUser.name || 'Student',
        role: 'student',
        lastLogin: new Date().toISOString()
      };
    } else if (officialUser.email) {
      return {
        email: officialUser.email,
        name: officialUser.name || 'Official',
        role: 'official',
        organization: officialUser.organization?.name,
        department: officialUser.department,
        employeeId: officialUser.employeeId,
        lastLogin: new Date().toISOString()
      };
    } else if (startupAuth.user?.email) {
      return {
        email: startupAuth.user.email,
        name: startupAuth.user.name || 'Startup',
        role: 'startup',
        organization: startupAuth.user.organization,
        lastLogin: new Date().toISOString()
      };
    }
    
    return null;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  // Get user role
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }
}

export const authService = new AuthService();