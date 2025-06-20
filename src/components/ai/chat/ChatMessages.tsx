
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import { EnhancedAIResponse } from '../EnhancedAIResponse';
import { TypingIndicator } from './TypingIndicator';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  image?: File;
  imageName?: string;
  responseData?: any;
}

interface ChatMessagesProps {
  messages: Message[];
  isAIThinking: boolean;
  userRole: string;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isAIThinking, userRole }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`max-w-[80%] p-3 rounded-lg ${
            message.sender === 'user'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {message.imageName && (
              <div className="flex items-center space-x-2 mb-2 p-2 bg-white/10 rounded">
                <ImageIcon className="w-4 h-4" />
                <span className="text-xs">{message.imageName}</span>
              </div>
            )}
            {message.sender === 'ai' && message.responseData ? (
              <EnhancedAIResponse response={message.responseData} userRole={userRole} />
            ) : (
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            )}
            <p className="text-xs opacity-60 mt-1">{message.timestamp}</p>
          </div>
        </motion.div>
      ))}
      {isAIThinking && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};
