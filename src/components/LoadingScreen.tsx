import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loading screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className="w-32 h-32 mb-8 relative"
        >
          <img 
            src="/lovable-uploads/dc27c7bf-1e1d-4fb1-a5c7-01b85351db67.png" 
            alt="GovStartup Navigator Logo"
            className="w-full h-full object-contain"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 mix-blend-overlay rounded-lg"
            animate={{ 
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl font-bold text-white mb-4"
        >
          GovStartup Navigator
        </motion.h1>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full w-48"
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;