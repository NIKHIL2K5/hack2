
import React, { createContext, useContext, useState } from 'react';
import { dataSyncService } from '@/services/dataSync';
import { applicationSyncService } from '@/services/applicationSync';

interface AIContextType {
  askEnhancedAI: (message: string, context?: string, image?: File) => Promise<any>;
  isAIThinking: boolean;
  userRole: string;
  userName: string;
  aiMemory: any;
}

const EnhancedAIContext = createContext<AIContextType | undefined>(undefined);

export const useEnhancedAI = () => {
  const context = useContext(EnhancedAIContext);
  if (!context) {
    throw new Error('useEnhancedAI must be used within an EnhancedAIProvider');
  }
  return context;
};

export const EnhancedAIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAIThinking, setIsAIThinking] = useState(false);

  // Get user info from localStorage
  const getUserInfo = () => {
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

  const userInfo = getUserInfo();

  const generateJobRecommendations = (userRole: string, context: string) => {
    const jobs = JSON.parse(localStorage.getItem('platform_job_postings') || '[]');
    const studentJobs = [
      {
        title: "AI Research Intern",
        company: "TechCorp AI Labs",
        location: "Hyderabad",
        stipend: "₹45,000",
        duration: "6 months",
        skills: ["Python", "TensorFlow", "Machine Learning"],
        type: "Research Internship"
      },
      {
        title: "Full Stack Developer",
        company: "StartupTech Solutions",
        location: "Warangal",
        stipend: "₹35,000",
        duration: "6 months",
        skills: ["React", "Node.js", "MongoDB"],
        type: "Full-time Internship"
      }
    ];

    return userRole === 'student' ? [...jobs.slice(0, 3), ...studentJobs] : jobs.slice(0, 5);
  };

  const generateSchemeInfo = (userRole: string) => {
    const schemes = [
      {
        name: "T-Hub Startup Accelerator",
        category: "Acceleration",
        description: "Comprehensive startup acceleration program with mentorship and funding opportunities.",
        funding: "Up to ₹50 lakhs",
        duration: "6 months",
        eligibility: "Early-stage startups with innovative ideas"
      },
      {
        name: "TSIC Innovation Challenge",
        category: "Competition",
        description: "Annual innovation challenge for students and entrepreneurs in Telangana.",
        funding: "₹10 lakhs prize",
        duration: "3 months",
        eligibility: "Students and startups in Telangana"
      },
      {
        name: "WE-Hub Women Entrepreneur Program",
        category: "Incubation",
        description: "Supporting women entrepreneurs with funding and mentorship.",
        funding: "Up to ₹25 lakhs",
        duration: "12 months",
        eligibility: "Women-led startups"
      }
    ];

    return userRole === 'startup' ? schemes : schemes.slice(0, 2);
  };

  const generateAnalytics = (userRole: string, userEmail: string) => {
    const userActions = dataSyncService.getActionsByUser(userEmail);
    const applications = applicationSyncService.getApplicationsForStudent(userEmail);
    
    switch (userRole) {
      case 'student':
        return {
          applications_sent: applications.length,
          jobs_viewed: userActions.filter(a => a.action.includes('job')).length,
          profile_views: Math.floor(Math.random() * 50) + 10,
          response_rate: `${Math.floor(Math.random() * 30) + 15}%`
        };
      case 'startup':
        const companyApps = applicationSyncService.getApplicationsForCompany(userEmail);
        return {
          job_postings: userActions.filter(a => a.action === 'job_posted').length,
          applications_received: companyApps.length,
          profile_visits: Math.floor(Math.random() * 100) + 50,
          hiring_rate: `${Math.floor(Math.random() * 25) + 10}%`
        };
      case 'official':
        return {
          schemes_managed: Math.floor(Math.random() * 15) + 5,
          applications_processed: Math.floor(Math.random() * 200) + 100,
          success_rate: `${Math.floor(Math.random() * 20) + 70}%`,
          active_programs: Math.floor(Math.random() * 10) + 3
        };
      default:
        return {};
    }
  };

  const generateCareerGuidance = (userRole: string, message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('interview')) {
      return {
        steps: [
          "Research the company and role thoroughly",
          "Practice common interview questions",
          "Prepare specific examples using STAR method",
          "Dress professionally and arrive early",
          "Prepare thoughtful questions to ask the interviewer"
        ],
        resources: [
          "Practice on LeetCode for technical roles",
          "Use Glassdoor for company insights",
          "Record yourself practicing answers"
        ]
      };
    } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return {
        steps: [
          "Use a clean, professional format",
          "Tailor your resume to each job application",
          "Quantify your achievements with numbers",
          "Include relevant skills and keywords",
          "Keep it to 1-2 pages maximum"
        ],
        resources: [
          "Use Canva or Google Docs templates",
          "Get feedback from career counselors",
          "Use action verbs to describe experiences"
        ]
      };
    } else if (lowerMessage.includes('skill')) {
      return {
        steps: [
          "Identify industry-relevant skills",
          "Create a learning schedule",
          "Practice with real projects",
          "Build a portfolio to showcase work",
          "Get certified where applicable"
        ],
        resources: [
          "Coursera and edX for online courses",
          "GitHub for project portfolio",
          "LinkedIn Learning for professional skills"
        ]
      };
    }

    return {
      steps: [
        "Define your career goals clearly",
        "Assess your current skills and gaps",
        "Network with industry professionals",
        "Gain relevant experience through internships",
        "Keep learning and stay updated"
      ],
      resources: [
        "Join professional associations",
        "Attend industry conferences and meetups",
        "Follow industry leaders on social media"
      ]
    };
  };

  const askEnhancedAI = async (message: string, context?: string, image?: File): Promise<any> => {
    setIsAIThinking(true);
    
    try {
      // Store conversation in AI memory
      dataSyncService.storeAIMemory(userInfo.email, userInfo.role, {
        message,
        context,
        timestamp: new Date().toISOString()
      });

      const lowerMessage = message.toLowerCase();
      
      // Determine response type based on message content
      if (lowerMessage.includes('job') && (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('find'))) {
        const jobs = generateJobRecommendations(userInfo.role, context || '');
        return {
          type: 'job_recommendations',
          content: `Based on your profile and preferences, here are some recommended opportunities for you:`,
          data: jobs
        };
      }
      
      if (lowerMessage.includes('scheme') || lowerMessage.includes('funding') || lowerMessage.includes('grant')) {
        const schemes = generateSchemeInfo(userInfo.role);
        return {
          type: 'scheme_info',
          content: `Here are relevant government schemes and funding opportunities:`,
          data: schemes
        };
      }
      
      if (lowerMessage.includes('analytic') || lowerMessage.includes('stat') || lowerMessage.includes('dashboard') || lowerMessage.includes('performance')) {
        const analytics = generateAnalytics(userInfo.role, userInfo.email);
        return {
          type: 'analytics',
          content: `Here's your current performance analytics:`,
          data: analytics
        };
      }
      
      if (lowerMessage.includes('career') || lowerMessage.includes('guidance') || lowerMessage.includes('advice') || lowerMessage.includes('help')) {
        const guidance = generateCareerGuidance(userInfo.role, message);
        return {
          type: 'career_guidance',
          content: `Here's personalized career guidance for you:`,
          data: guidance
        };
      }

      // Enhanced general responses based on role and context
      let response = '';
      
      if (userInfo.role === 'student') {
        if (lowerMessage.includes('application')) {
          const applications = applicationSyncService.getApplicationsForStudent(userInfo.email);
          response = `You have submitted ${applications.length} job applications. Here's the status breakdown:\n\n`;
          const statusCounts = applications.reduce((acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          
          Object.entries(statusCounts).forEach(([status, count]) => {
            response += `• ${status.charAt(0).toUpperCase() + status.slice(1)}: ${count}\n`;
          });
          
          if (applications.length > 0) {
            response += `\nYour most recent application was for "${applications[applications.length - 1].jobTitle}" at ${applications[applications.length - 1].companyName}.`;
          }
        } else if (lowerMessage.includes('profile')) {
          response = `Your student profile shows you're actively seeking opportunities. To improve your chances:\n\n• Keep your skills section updated\n• Add relevant projects to your portfolio\n• Write compelling cover letters\n• Follow up on applications professionally\n\nWould you like specific advice on any of these areas?`;
        } else {
          response = `As a student on our platform, I can help you with:\n\n• Finding relevant job opportunities\n• Application tracking and status\n• Career guidance and skill development\n• Interview preparation tips\n• Resume optimization\n• Government schemes for students\n\nWhat specific assistance do you need today?`;
        }
      } else if (userInfo.role === 'startup') {
        if (lowerMessage.includes('hiring') || lowerMessage.includes('recruit')) {
          const userActions = dataSyncService.getActionsByUser(userInfo.email);
          const jobPostings = userActions.filter(a => a.action === 'job_posted').length;
          response = `You've posted ${jobPostings} job(s) so far. Here are some hiring best practices:\n\n• Write clear, detailed job descriptions\n• Specify required skills and experience\n• Offer competitive compensation\n• Respond to applications promptly\n• Provide feedback to candidates\n\nNeed help optimizing your job postings?`;
        } else if (lowerMessage.includes('funding') || lowerMessage.includes('scheme')) {
          response = `As a startup, you have access to various funding opportunities:\n\n• T-Hub Incubation Program\n• Telangana State Innovation Cell (TSIC)\n• MSME Development Schemes\n• Angel Tax Exemption\n• Startup India initiatives\n\nI can provide detailed information about eligibility and application processes for any of these schemes.`;
        } else {
          response = `As a startup on our platform, I can assist you with:\n\n• Posting and managing job openings\n• Reviewing candidate applications\n• Accessing government funding schemes\n• Compliance requirements\n• Hiring best practices\n• Market insights and analytics\n\nWhat would you like to know more about?`;
        }
      } else if (userInfo.role === 'official') {
        response = `As a government official, I can help you with:\n\n• Managing government schemes and programs\n• Monitoring application processes\n• Tracking scheme effectiveness\n• Policy implementation guidance\n• Startup ecosystem analytics\n• Compliance monitoring\n\nHow can I assist you with your administrative duties today?`;
      } else {
        response = `Welcome to our comprehensive career and startup platform! I can help you with:\n\n• Job search and career guidance\n• Startup funding and schemes\n• Application tracking\n• Market insights\n• Skill development advice\n\nPlease let me know what you'd like to explore!`;
      }

      return {
        type: 'text',
        content: response
      };
    } catch (error) {
      console.error('Enhanced AI Error:', error);
      return {
        type: 'text',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again, and I'll do my best to provide comprehensive assistance."
      };
    } finally {
      setIsAIThinking(false);
    }
  };

  const aiMemory = dataSyncService.getUserAIMemory(userInfo.email);

  return (
    <EnhancedAIContext.Provider
      value={{
        askEnhancedAI,
        isAIThinking,
        userRole: userInfo.role,
        userName: userInfo.name,
        aiMemory
      }}
    >
      {children}
    </EnhancedAIContext.Provider>
  );
};
