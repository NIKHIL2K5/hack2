import { motion } from "framer-motion";

// Replaced the React Three Fiber component with a simple div animation
export const Scene3D = () => (
  <div className="relative w-full h-full">
    <motion.div
      className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-70"
      style={{ filter: "blur(20px)" }}
      animate={{ 
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.7, 0.5]
      }}
      transition={{ 
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 opacity-70"
      style={{ filter: "blur(15px)" }}
      animate={{ 
        y: [0, 30, 0],
        x: [0, -20, 0],
        scale: [1, 1.3, 1],
        opacity: [0.4, 0.6, 0.4]
      }}
      transition={{ 
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />
    <motion.div
      className="absolute top-1/2 right-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-70"
      style={{ filter: "blur(12px)" }}
      animate={{ 
        y: [0, 20, 0],
        x: [0, -10, 0],
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{ 
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
    />
  </div>
);