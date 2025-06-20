
import React, { createContext, useContext, useState } from 'react';
import { dataSyncService } from '@/services/dataSync';
import { applicationSyncService } from '@/services/applicationSync';
import { findFAQAnswer } from './ai/faqMatcher';
import { generateJobRecommendations, generateSchemeInfo, generateAnalytics, generateCareerGuidance } from './ai/dataGenerators';
import { getUserInfo } from './ai/userHelpers';
import { supabase } from '@/integrations/supabase/client';

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
      
      // Handle specific data requests with local data
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

      // For general questions, use OpenAI
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: {
          message,
          context,
          userRole: userInfo.role,
          userName: userInfo.name,
          hasImage: !!image
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message);
      }

      return {
        type: 'text',
        content: data.content
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
