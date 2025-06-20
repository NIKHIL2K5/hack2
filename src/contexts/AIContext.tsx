
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadUserData } from '@/utils/userStorage';
import { dataSyncService } from '@/services/dataSync';
import { getUserInfo } from './ai/userHelpers';
import { getComprehensiveKnowledge } from './ai/knowledgeBase';
import { generateComprehensiveResponse } from './ai/responseGenerator';

interface AIContextType {
  userRole: 'student' | 'startup' | 'official' | null;
  userName: string;
  askAI: (question: string, context?: string, image?: File) => Promise<string>;
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
  const [userMemory, setUserMemory] = useState<any>(null);

  useEffect(() => {
    const userData = loadUserData();
    const officialUser = JSON.parse(localStorage.getItem('officialUser') || '{}');
    
    let currentUserId = '';
    let currentUserName = '';
    let currentRole: 'student' | 'startup' | 'official' | null = null;

    if (userData) {
      currentUserId = userData.email || 'anonymous';
      currentUserName = userData.name || 'User';
      setUserName(currentUserName);
    }
    
    if (officialUser.email) {
      currentUserId = officialUser.email;
      currentUserName = officialUser.name || officialUser.organization?.name || 'User';
      setUserName(currentUserName);
    }

    // Determine role based on current path or stored data
    const path = window.location.pathname;
    if (path.includes('/dashboard/student')) {
      currentRole = 'student';
    } else if (path.includes('/dashboard/startup') || path.includes('/applications')) {
      currentRole = 'startup';
    } else if (path.includes('/dashboard/official') || path.includes('/schemes')) {
      currentRole = 'official';
    }
    
    setUserRole(currentRole);

    // Load user's AI memory
    if (currentUserId && currentRole) {
      const memory = dataSyncService.getUserAIMemory(currentUserId);
      setUserMemory(memory);
      
      // Track AI context initialization
      dataSyncService.trackAction(
        currentUserId,
        currentRole,
        'ai_context_initialized',
        { hasMemory: !!memory }
      );
    }
  }, []);

  const askAI = async (question: string, context?: string, image?: File): Promise<string> => {
    setIsAIThinking(true);
    
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const comprehensiveKnowledge = getComprehensiveKnowledge(userRole, userName, userMemory);
      let imageContext = '';
      
      if (image) {
        imageContext = `\n\nImage Analysis: The user has shared an image (${image.name}). I should analyze the visual content and provide relevant guidance or feedback based on what I can observe in the image.`;
      }
      
      const fullContext = `${comprehensiveKnowledge}\n\nAdditional Context: ${context || ''}\n\nUser Question: ${question}${imageContext}`;
      
      // Generate comprehensive response with memory
      let response = generateComprehensiveResponse(question, userRole, userName, context, !!image, userMemory);
      
      // Store conversation in AI memory
      if (userName && userRole) {
        const conversationData = {
          question,
          response,
          context,
          hasImage: !!image,
          timestamp: new Date().toISOString()
        };
        
        dataSyncService.storeAIMemory(userName, userRole, conversationData);
        
        // Track AI interaction
        dataSyncService.trackAction(
          userName,
          userRole,
          'ai_interaction',
          { questionLength: question.length, responseLength: response.length, hasImage: !!image }
        );
      }
      
      return response;
    } catch (error) {
      return "I apologize for the technical difficulty. Let me try to help you anyway using my comprehensive knowledge and memory of our previous interactions. Could you please rephrase your question or provide more specific details about what you need assistance with?";
    } finally {
      setIsAIThinking(false);
    }
  };

  return (
    <AIContext.Provider value={{ userRole, userName, askAI, isAIThinking }}>
      {children}
    </AIContext.Provider>
  );
};
