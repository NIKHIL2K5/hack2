import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
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
      <span className="text-xs text-gray-500">Analyzing your question...</span>
    </motion.div>
  );
};