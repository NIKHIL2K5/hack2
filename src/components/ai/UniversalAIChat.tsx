
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAI } from '@/contexts/AIContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export const UniversalAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { askAI, isAIThinking, userRole, userName } = useAI();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with a welcome message
    if (messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        text: `Hi ${userName || 'there'}! I'm your AI assistant. I know everything about this platform and can help you with questions about ${userRole === 'student' ? 'jobs, applications, and career guidance' : userRole === 'startup' ? 'government schemes, funding, and business guidance' : userRole === 'official' ? 'scheme management and monitoring' : 'navigating the platform'}. How can I assist you today?`,
        sender: 'ai' as const,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([welcomeMessage]);
    }
  }, [userName, userRole]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');

    try {
      const currentPage = window.location.pathname;
      const context = `Current page: ${currentPage}, User role: ${userRole}`;
      const aiResponse = await askAI(currentMessage, context);
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I apologize, but I'm having trouble responding right now. Please try again.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-2 p-3 bg-gray-100 rounded-lg max-w-xs"
    >
      <Bot className="w-4 h-4 text-blue-500" />
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </motion.div>
  );

  return (
    <>
      {/* AI Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover-button"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <MessageSquare className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* AI Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 z-40 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Assistant</h3>
                    <p className="text-xs opacity-80">Always ready to help</p>
                  </div>
                </div>
                <motion.div whileHover={{ rotate: 180 }}>
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </div>
            </div>

            {/* Messages */}
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
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs opacity-60 mt-1">{message.timestamp}</p>
                  </div>
                </motion.div>
              ))}
              {isAIThinking && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about the platform..."
                  className="flex-1"
                  disabled={isAIThinking}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isAIThinking || !inputMessage.trim()}
                  className="hover-button"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
