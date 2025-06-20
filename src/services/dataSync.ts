export interface UserAction {
  id: string;
  userId: string;
  userRole: 'student' | 'startup' | 'official';
  action: string;
  timestamp: string;
  data?: any;
  organizationName?: string;
}

export interface JobPosting {
  id: number;
  title: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
  skills: string[];
  description: string;
  posted: string;
  type: string;
  department?: string;
  experience?: string;
  salary?: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  deadline?: string;
  organizationName: string;
  postedAt: string;
  status: string;
}

class DataSyncService {
  private storageKeys = {
    userActions: 'platform_user_actions',
    jobPostings: 'platform_job_postings',
    userProfiles: 'platform_user_profiles',
    aiMemory: 'platform_ai_memory'
  };

  // Track user actions
  trackAction(userId: string, userRole: 'student' | 'startup' | 'official', action: string, data?: any, organizationName?: string) {
    const userAction: UserAction = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      userId,
      userRole,
      action,
      timestamp: new Date().toISOString(),
      data,
      organizationName
    };

    const actions = this.getUserActions();
    actions.push(userAction);
    localStorage.setItem(this.storageKeys.userActions, JSON.stringify(actions));
    
    console.log('Action tracked:', userAction);
    return userAction;
  }

  // Get all user actions
  getUserActions(): UserAction[] {
    const stored = localStorage.getItem(this.storageKeys.userActions);
    return stored ? JSON.parse(stored) : [];
  }

  // Get actions by user or organization
  getActionsByUser(userId: string): UserAction[] {
    return this.getUserActions().filter(action => action.userId === userId);
  }

  getActionsByOrganization(organizationName: string): UserAction[] {
    return this.getUserActions().filter(action => action.organizationName === organizationName);
  }

  // Sync job posting across all dashboards
  syncJobPosting(jobData: any, organizationName: string): JobPosting {
    const newJob: JobPosting = {
      id: Date.now(),
      title: jobData.title,
      company: organizationName,
      location: jobData.location || 'Telangana',
      stipend: jobData.salary || 'Competitive',
      duration: jobData.experience || '6 months',
      skills: jobData.skills || [],
      description: jobData.description,
      posted: 'Just now',
      type: jobData.jobType || 'Internship',
      department: jobData.department,
      experience: jobData.experience,
      salary: jobData.salary,
      responsibilities: jobData.responsibilities || [],
      requirements: jobData.requirements || [],
      benefits: jobData.benefits || [],
      deadline: jobData.deadline,
      organizationName,
      postedAt: new Date().toISOString(),
      status: 'active'
    };

    // Save to job postings storage
    const existingJobs = JSON.parse(localStorage.getItem('job_postings') || '[]');
    existingJobs.push(newJob);
    localStorage.setItem('job_postings', JSON.stringify(existingJobs));

    // Also sync to global job postings for student dashboard
    const globalJobs = this.getGlobalJobPostings();
    globalJobs.push(newJob);
    localStorage.setItem(this.storageKeys.jobPostings, JSON.stringify(globalJobs));

    console.log('Job synced globally:', newJob);
    return newJob;
  }

  // Get all job postings for student dashboard
  getGlobalJobPostings(): JobPosting[] {
    const stored = localStorage.getItem(this.storageKeys.jobPostings);
    return stored ? JSON.parse(stored) : [];
  }

  // Store AI conversation memory
  storeAIMemory(userId: string, userRole: string, conversation: any) {
    const memory = this.getAIMemory();
    if (!memory[userId]) {
      memory[userId] = {
        role: userRole,
        conversations: [],
        preferences: {},
        context: {}
      };
    }
    
    memory[userId].conversations.push({
      timestamp: new Date().toISOString(),
      ...conversation
    });

    // Keep only last 50 conversations per user
    if (memory[userId].conversations.length > 50) {
      memory[userId].conversations = memory[userId].conversations.slice(-50);
    }

    localStorage.setItem(this.storageKeys.aiMemory, JSON.stringify(memory));
  }

  // Get AI memory for user
  getAIMemory(): any {
    const stored = localStorage.getItem(this.storageKeys.aiMemory);
    return stored ? JSON.parse(stored) : {};
  }

  getUserAIMemory(userId: string) {
    const memory = this.getAIMemory();
    return memory[userId] || null;
  }

  // Update user profile information
  updateUserProfile(userId: string, profileData: any) {
    const profiles = JSON.parse(localStorage.getItem(this.storageKeys.userProfiles) || '{}');
    profiles[userId] = {
      ...profiles[userId],
      ...profileData,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(this.storageKeys.userProfiles, JSON.stringify(profiles));
  }

  getUserProfile(userId: string) {
    const profiles = JSON.parse(localStorage.getItem(this.storageKeys.userProfiles) || '{}');
    return profiles[userId] || null;
  }
}

export const dataSyncService = new DataSyncService();
