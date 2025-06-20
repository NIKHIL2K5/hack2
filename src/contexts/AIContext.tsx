
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadUserData } from '@/utils/userStorage';

interface AIContextType {
  userRole: 'student' | 'startup' | 'official' | null;
  userName: string;
  askAI: (question: string, context?: string) => Promise<string>;
  isAIThinking: boolean;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<'student' | 'startup' | 'official' | null>(null);
  const [userName, setUserName] = useState('');
  const [isAIThinking, setIsAIThinking] = useState(false);

  useEffect(() => {
    const userData = loadUserData();
    if (userData) {
      setUserName(userData.name || 'User');
      // Determine role based on current path or stored data
      const path = window.location.pathname;
      if (path.includes('/dashboard/student')) {
        setUserRole('student');
      } else if (path.includes('/dashboard/startup')) {
        setUserRole('startup');
      } else if (path.includes('/dashboard/official')) {
        setUserRole('official');
      }
    }
  }, []);

  const getWebsiteKnowledge = () => {
    return `
    This is a Government Startup Portal with the following features:
    
    FOR STUDENTS:
    - Browse and apply for internships and jobs
    - Track application status
    - Manage profile with skills, education, and experience
    - View applied companies and jobs
    - Access AI chatbot for career guidance
    
    FOR STARTUPS:
    - Post job opportunities
    - Manage applications
    - Access government schemes and funding
    - Compliance tracking
    - AI assistance for business guidance
    
    FOR OFFICIALS:
    - Manage government schemes
    - Monitor startup activities
    - Analyze feedback and sentiment
    - Track compliance and applications
    
    GENERAL FEATURES:
    - AI-powered chatbot for guidance
    - Real-time application tracking
    - Profile management
    - Responsive design with enhanced hover effects
    - Secure data storage
    
    CURRENT USER ROLE: ${userRole || 'Not logged in'}
    CURRENT USER NAME: ${userName || 'Guest'}
    `;
  };

  const askAI = async (question: string, context?: string): Promise<string> => {
    setIsAIThinking(true);
    
    try {
      // Simulate AI response with website knowledge
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const websiteInfo = getWebsiteKnowledge();
      const fullContext = `${websiteInfo}\n\nAdditional Context: ${context || ''}\n\nUser Question: ${question}`;
      
      // Generate contextual response based on user role and question
      let response = generateContextualResponse(question, userRole, userName, context);
      
      return response;
    } catch (error) {
      return "I apologize, but I'm having trouble processing your request right now. Please try again later.";
    } finally {
      setIsAIThinking(false);
    }
  };

  const generateContextualResponse = (question: string, role: string | null, name: string, context?: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Role-specific responses
    if (role === 'student') {
      if (lowerQuestion.includes('job') || lowerQuestion.includes('internship')) {
        return `Hi ${name}! As a student, you can browse available jobs and internships on this portal. I can see you have access to job filtering by location, skills, and company. You can apply directly through the platform and track your applications in the "My Applications" section. Would you like help with optimizing your profile or finding specific opportunities?`;
      }
      if (lowerQuestion.includes('application') || lowerQuestion.includes('apply')) {
        return `${name}, you can track all your applications in the "Track Applications" section. The system shows real-time status updates like "Under Review", "Interview Scheduled", or "Rejected". You can also view which companies you've applied to in your profile section.`;
      }
      if (lowerQuestion.includes('profile')) {
        return `Your profile is crucial for landing opportunities! Make sure to update your skills, education, experience, and add links to your portfolio, GitHub, and LinkedIn. You can also upload your resume. The more complete your profile, the better your chances with employers.`;
      }
    }
    
    if (role === 'startup') {
      if (lowerQuestion.includes('post') || lowerQuestion.includes('job')) {
        return `Hi ${name}! As a startup, you can post job opportunities and manage applications through this portal. You also have access to government schemes, funding opportunities, and compliance tracking tools.`;
      }
      if (lowerQuestion.includes('scheme') || lowerQuestion.includes('funding')) {
        return `This portal provides access to various government schemes like T-Hub Incubation, TSIC, WE-Hub, and MSME Development Schemes. You can also explore funding options through the Seed Fund Scheme and Angel Tax Exemption.`;
      }
    }
    
    if (role === 'official') {
      if (lowerQuestion.includes('manage') || lowerQuestion.includes('monitor')) {
        return `Hi ${name}! As an official, you can manage government schemes, monitor startup activities, analyze feedback sentiment, and track compliance across the platform.`;
      }
    }
    
    // General responses
    if (lowerQuestion.includes('how') && lowerQuestion.includes('work')) {
      return `This Government Startup Portal connects students with job opportunities, helps startups access government schemes and funding, and enables officials to monitor and manage the ecosystem. The platform features AI assistance, real-time tracking, and comprehensive profile management.`;
    }
    
    if (lowerQuestion.includes('feature') || lowerQuestion.includes('what can')) {
      return `The platform offers job browsing and applications for students, scheme management for startups, administrative tools for officials, AI-powered guidance, application tracking, profile management, and much more. What specific feature would you like to know about?`;
    }
    
    // Default response
    return `Hi ${name}! I'm your AI assistant for this Government Startup Portal. I can help you with questions about job applications, government schemes, profile management, and platform features. What would you like to know more about?`;
  };

  return (
    <AIContext.Provider value={{ userRole, userName, askAI, isAIThinking }}>
      {children}
    </AIContext.Provider>
  );
};
