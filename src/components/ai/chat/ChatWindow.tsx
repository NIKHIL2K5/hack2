import React from 'react';
import { motion } from 'framer-motion';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { ImagePreview } from './ImagePreview';
import { useResponsive } from '@/hooks/useResponsive';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  image?: File;
  imageName?: string;
  responseData?: any;
}

interface ChatWindowProps {
  messages: Message[];
  inputMessage: string;
  selectedImage: File | null;
  isAIThinking: boolean;
  userRole: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveSelectedImage: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  inputMessage,
  selectedImage,
  isAIThinking,
  userRole,
  onInputChange,
  onSendMessage,
  onImageUpload,
  onRemoveSelectedImage
}) => {
  const { isMobile, isTablet } = useResponsive();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className={`fixed ${isMobile ? 'inset-0 z-50' : 'bottom-24 right-6 w-96 h-[500px] z-40'} bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col`}
    >
      <ChatHeader />
      
      <ChatMessages 
        messages={messages} 
        isAIThinking={isAIThinking} 
        userRole={userRole} 
      />

      <ImagePreview 
        selectedImage={selectedImage} 
        onRemove={onRemoveSelectedImage} 
      />

      <ChatInput
        inputMessage={inputMessage}
        onInputChange={onInputChange}
        onSendMessage={onSendMessage}
        onImageUpload={onImageUpload}
        isAIThinking={isAIThinking}
        hasSelectedImage={!!selectedImage}
      />
    </motion.div>
  );
};