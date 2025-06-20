
import React, { createContext, useContext, useState } from 'react';
import { dataSyncService } from '@/services/dataSync';
import { applicationSyncService } from '@/services/applicationSync';
import { findFAQAnswer } from './ai/faqMatcher';
import { generateJobRecommendations, generateSchemeInfo, generateAnalytics, generateCareerGuidance } from './ai/dataGenerators';
import { getUserInfo } from './ai/userHelpers';

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

  const userInfo = getUserInfo();

  const askEnhancedAI = async (message: string, context?: string, image?: File): Promise<any> => {
    setIsAIThinking(true);
    
    try {
      // Store conversation in AI memory
      dataSyncService.storeAIMemory(userInfo.email, userInfo.role, {
        message,
        context,
        timestamp: new Date().toISOString()
      });

      // Check for FAQ answers first using the enhanced matching
      const faqAnswer = findFAQAnswer(message, userInfo.role);
      if (faqAnswer) {
        return {
          type: 'text',
          content: faqAnswer
        };
      }

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
          response = `As a student on our platform, I can help you with:\n\n• Finding relevant job opportunities\n\n• Application tracking and status\n\n• Career guidance and skill development\n\n• Interview preparation tips\n\n• Resume optimization\n\n• Government schemes for students\n\nWhat specific assistance do you need today?`;
        }
      } else if (userInfo.role === 'startup') {
        if (lowerMessage.includes('hiring') || lowerMessage.includes('recruit')) {
          const userActions = dataSyncService.getActionsByUser(userInfo.email);
          const jobPostings = userActions.filter(a => a.action === 'job_posted').length;
          response = `You've posted ${jobPostings} job(s) so far. Here are some hiring best practices:\n\n• Write clear, detailed job descriptions\n\n• Specify required skills and experience\n\n• Offer competitive compensation\n\n• Respond to applications promptly\n\n• Provide feedback to candidates\n\nNeed help optimizing your job postings?`;
        } else if (lowerMessage.includes('funding') || lowerMessage.includes('scheme')) {
          response = `As a startup, you have access to various funding opportunities:\n\n• T-Hub Incubation Program\n\n• Telangana State Innovation Cell (TSIC)\n\n• MSME Development Schemes\n\n• Angel Tax Exemption\n\n• Startup India initiatives\n\nI can provide detailed information about eligibility and application processes for any of these schemes.`;
        } else {
          response = `As a startup on our platform, I can assist you with:\n\n• Posting and managing job openings\n\n• Reviewing candidate applications\n\n• Accessing government funding schemes\n\n• Compliance requirements\n\n• Hiring best practices\n\n• Market insights and analytics\n\nWhat would you like to know more about?`;
        }
      } else if (userInfo.role === 'official') {
        response = `As a government official, I can help you with:\n\n• Managing government schemes and programs\n\n• Monitoring application processes\n\n• Tracking scheme effectiveness\n\n• Policy implementation guidance\n\n• Startup ecosystem analytics\n\n• Compliance monitoring\n\nHow can I assist you with your administrative duties today?`;
      } else {
        response = `Welcome to our comprehensive career and startup platform! I can help you with:\n\n• Job search and career guidance\n\n• Startup funding and schemes\n\n• Application tracking\n\n• Market insights\n\n• Skill development advice\n\nPlease let me know what you'd like to explore!`;
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
