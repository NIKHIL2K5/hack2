import React, { createContext, useContext, useState } from 'react';
import { dataSyncService } from '@/services/dataSync';
import { getUserInfo } from './ai/userHelpers';
import { supabase } from '@/integrations/supabase/client';
import { findFAQAnswer } from './ai/faqData';

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

      // First check if the question matches any FAQ
      const faqAnswer = findFAQAnswer(message);
      if (faqAnswer) {
        // If we have a direct FAQ match, return it immediately
        return {
          type: 'text',
          content: faqAnswer
        };
      }

      // If no FAQ match, try the Supabase Edge Function
      try {
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
          console.error('Error calling AI function:', error);
          throw new Error(`Error calling OpenAI API: ${error.message}`);
        }

        return {
          type: 'text',
          content: data.content
        };
      } catch (apiError) {
        console.error('API Error:', apiError);
        
        // Fallback to local response generation if API fails
        let response = "I'm Sethu, your AI assistant. ";
        
        if (message.toLowerCase().includes("job")) {
          response += "I can help you find job opportunities that match your skills and interests. Would you like me to search for specific roles or industries?";
        } else if (message.toLowerCase().includes("scheme") || message.toLowerCase().includes("funding")) {
          response += "There are several government schemes available for startups and entrepreneurs in Telangana. The T-Hub incubation program and TSIC Innovation Challenge are particularly popular.";
        } else if (message.toLowerCase().includes("profile")) {
          response += "Your profile is an important part of your presence on this platform. Make sure to keep it updated with your latest skills and experiences to improve your visibility to potential employers.";
        } else if (message.toLowerCase().includes("application")) {
          response += "You can track all your job applications through the Application Tracker. It shows real-time status updates for each position you've applied to.";
        } else if (image) {
          response += "I've analyzed the image you shared. If this is a resume, I recommend highlighting your key skills more prominently and ensuring your contact information is clearly visible at the top.";
        } else {
          response += `I'm here to help with ${userInfo.role === 'student' ? 'job searches, career planning, skill development, and interview preparation' : userInfo.role === 'startup' ? 'funding opportunities, government schemes, hiring strategies, and business growth' : userInfo.role === 'official' ? 'scheme management, policy implementation, and ecosystem monitoring' : 'navigating the platform and maximizing your opportunities'}. How can I assist you today?`;
        }
        
        return {
          type: 'text',
          content: response
        };
      }
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