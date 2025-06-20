import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useEnhancedAI } from '@/contexts/EnhancedAIContext';
import { ChatToggleButton } from './chat/ChatToggleButton';
import { ChatWindow } from './chat/ChatWindow';
import { findFAQAnswer } from '@/contexts/ai/faqData';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  image?: File;
  imageName?: string;
  responseData?: any;
  model?: string;
}

export const UniversalAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { askEnhancedAI, isAIThinking, userRole, userName } = useEnhancedAI();

  useEffect(() => {
    // Initialize with a welcome message
    if (messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        text: `Hi ${userName || 'there'}! I'm Sethu, your comprehensive AI assistant powered by DeepSeek-R1-0528. I can help you with detailed guidance on ${userRole === 'student' ? 'job searches, career planning, skill development, and interview preparation' : userRole === 'startup' ? 'funding opportunities, government schemes, hiring strategies, and business growth' : userRole === 'official' ? 'scheme management, policy implementation, and ecosystem monitoring' : 'navigating the platform and maximizing your opportunities'}. I provide precise, actionable advice tailored to your specific situation. You can also share images for visual analysis. How can I assist you today?`,
        sender: "ai" as const,
        timestamp: new Date().toLocaleTimeString(),
        model: "deepseek-ai/DeepSeek-R1-0528"
      };
      setMessages([welcomeMessage]);
    }
  }, [userName, userRole, messages.length]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload only image files');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Please upload images smaller than 10MB');
        return;
      }
      
      setSelectedImage(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage || (selectedImage ? `[Shared image: ${selectedImage.name}]` : ''),
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
      image: selectedImage || undefined,
      imageName: selectedImage?.name
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    const currentImage = selectedImage;
    
    setInputMessage('');
    setSelectedImage(null);

    try {
      // First check if we have a direct FAQ match
      const faqAnswer = findFAQAnswer(currentMessage);
      
      if (faqAnswer) {
        // If we have a direct FAQ match, use it
        const aiMessage: Message = {
          id: messages.length + 2,
          text: faqAnswer,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString(),
          responseData: { type: 'text', content: faqAnswer },
          model: "FAQ Database"
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Otherwise, use the AI service
        const currentPage = window.location.pathname;
        const context = `Current page: ${currentPage}, User role: ${userRole}`;
        const aiResponse = await askEnhancedAI(currentMessage, context, currentImage || undefined);
        
        const aiMessage: Message = {
          id: messages.length + 2,
          text: aiResponse.content,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString(),
          responseData: aiResponse,
          model: aiResponse.model || "deepseek-ai/DeepSeek-R1-0528"
        };

        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("AI Chat Error:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I apologize, but I'm having trouble processing your request right now. Please try again, and I'll do my best to provide comprehensive assistance.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <>
      <ChatToggleButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />

      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            inputMessage={inputMessage}
            selectedImage={selectedImage}
            isAIThinking={isAIThinking}
            userRole={userRole}
            onInputChange={setInputMessage}
            onSendMessage={handleSendMessage}
            onImageUpload={handleImageUpload}
            onRemoveSelectedImage={removeSelectedImage}
          />
        )}
      </AnimatePresence>
    </>
  );
};