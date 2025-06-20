
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';

export const ChatHeader: React.FC = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold">Sethu - AI Assistant</h3>
            <p className="text-xs opacity-80">Expert guidance & image analysis</p>
          </div>
        </div>
        <motion.div whileHover={{ rotate: 180 }}>
          <Sparkles className="w-5 h-5" />
        </motion.div>
      </div>
    </div>
  );
};
