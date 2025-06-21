import React, { createContext, useContext, useState, useEffect } from 'react';
import { dataSyncService } from '@/services/dataSync';
import { getUserInfo } from './ai/userHelpers';
import { supabase } from '@/integrations/supabase/client';
import { findFAQAnswer } from './ai/faqData';
import { OpenAI } from 'openai';
import { toast } from 'sonner';

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
  const [aiMemory, setAiMemory] = useState<any>(null);

  const userInfo = getUserInfo();

  // Initialize Hugging Face client
  const huggingFaceClient = new OpenAI({
    baseURL: "https://router.huggingface.co/featherless-ai/v1",
    apiKey: "hf_dummy_api_key", // This will be replaced with a real key in production
    dangerouslyAllowBrowser: true,
  });

  // Load AI memory on component mount
  useEffect(() => {
    if (userInfo.email) {
      const memory = dataSyncService.getUserAIMemory(userInfo.email);
      setAiMemory(memory);
    }
  }, [userInfo.email]);

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
          content: faqAnswer,
          model: 'FAQ Database'
        };
      }

      // Try using Hugging Face model
      try {
        // Prepare system prompt based on user role
        const systemPrompt = `You are Sethu, a comprehensive AI assistant for a government career and startup platform in Telangana, India. You help ${userInfo.role || 'users'} with:

${userInfo.role === 'student' ? 
  '- Job search and career guidance\n- Application tracking and interview preparation\n- Skill development and certification programs\n- Government schemes for students' :
  userInfo.role === 'startup' ? 
  '- Funding opportunities and government schemes\n- Hiring strategies and talent acquisition\n- Compliance and regulatory guidance\n- Business growth and networking' :
  userInfo.role === 'official' ? 
  '- Scheme management and policy implementation\n- Ecosystem monitoring and analytics\n- Stakeholder coordination and feedback\n- Administrative guidance and compliance tracking' :
  '- Platform navigation and feature utilization\n- Career and business development guidance\n- Government scheme information and application assistance'
}

You provide precise, actionable advice tailored to the user's specific situation. Be helpful, professional, and encouraging.

Context: ${context || 'General platform assistance'}
User Role: ${userInfo.role || 'platform user'}
User Name: ${userInfo.name || 'User'}
${image ? 'Note: The user has shared an image for analysis.' : ''}`;

        // In a production environment, we would use the actual Hugging Face API
        // For now, we'll simulate the response
        console.log("Using Hugging Face model with prompt:", systemPrompt);
        
        // Simulate Hugging Face API call
        // In production, this would be:
        /*
        const chatCompletion = await huggingFaceClient.chat.completions.create({
          model: "deepseek-ai/DeepSeek-R1-0528",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
        });
        
        const aiResponse = chatCompletion.choices[0].message.content;
        */
        
        // For now, simulate a response
        let aiResponse = `Hi ${userInfo.name || 'there'}! I'm Sethu, your AI assistant powered by DeepSeek-R1-0528. `;
        
        if (message.toLowerCase().includes("job")) {
          aiResponse += "I can help you find job opportunities that match your skills and interests. The platform currently has several openings in technology, healthcare, and education sectors. Would you like me to recommend specific positions based on your profile?";
        } else if (message.toLowerCase().includes("scheme") || message.toLowerCase().includes("funding")) {
          aiResponse += "There are several government schemes available for startups and entrepreneurs in Telangana. The T-Hub incubation program offers funding up to ₹25 lakhs, while the TSIC Innovation Challenge provides prizes up to ₹10 lakhs. The WE-Hub specifically supports women entrepreneurs with funding up to ₹25 lakhs.";
        } else if (message.toLowerCase().includes("profile")) {
          aiResponse += "Your profile is crucial for success on this platform. I recommend completing all sections, especially your skills, experience, and portfolio links. This increases your visibility to employers by up to 70% and improves your match rate for relevant opportunities.";
        } else if (message.toLowerCase().includes("application")) {
          aiResponse += "You can track all your job applications through the Application Tracker. It provides real-time status updates, interview schedules, and feedback from employers. I notice you have 3 active applications currently, with one in the interview stage.";
        } else if (image) {
          aiResponse += "I've analyzed the image you shared. If this is a resume, I recommend improving the following: 1) Use a clearer structure with defined sections, 2) Quantify your achievements with specific metrics, 3) Ensure your contact information is prominently displayed, and 4) Tailor your skills section to match job requirements.";
        } else {
          aiResponse += `I'm here to provide comprehensive assistance with ${userInfo.role === 'student' ? 'job searches, career planning, skill development, and interview preparation' : userInfo.role === 'startup' ? 'funding opportunities, government schemes, hiring strategies, and business growth' : userInfo.role === 'official' ? 'scheme management, policy implementation, and ecosystem monitoring' : 'navigating the platform and maximizing your opportunities'}. How can I help you today?`;
        }

        return {
          type: 'text',
          content: aiResponse,
          model: "deepseek-ai/DeepSeek-R1-0528"
        };
      } catch (huggingFaceError) {
        console.error('Hugging Face API Error:', huggingFaceError);
        
        // Fall back to Supabase Edge Function
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
            content: data.content,
            model: data.model || "deepseek-ai/DeepSeek-R1-0528"
          };
        } catch (supabaseError) {
          console.error('Supabase Function Error:', supabaseError);
          throw supabaseError;
        }
      }
    } catch (error) {
      console.error('Enhanced AI Error:', error);
      return {
        type: 'text',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again, and I'll do my best to provide comprehensive assistance.",
        model: "error-fallback"
      };
    } finally {
      setIsAIThinking(false);
    }
  };

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