import { motion } from "framer-motion";

// Replaced the React Three Fiber component with a simple div animation
export const AnimatedSphere = () => (
  <motion.div
    className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-70 absolute"
    style={{ filter: "blur(20px)" }}
    animate={{ 
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      opacity: [0.5, 0.7, 0.5]
    }}
    transition={{ 
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);