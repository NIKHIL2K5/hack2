import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResponsive } from '@/hooks/useResponsive';

interface ChatToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ isOpen, onToggle }) => {
  const { isMobile } = useResponsive();
  
  return (
    <motion.div
      className={`fixed ${isMobile ? 'bottom-16 right-4' : 'bottom-6 right-6'} z-50`}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={onToggle}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg border-0"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
};