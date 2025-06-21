import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResponsive } from "@/hooks/useResponsive";

interface QuickActionsProps {
  onNavigate?: (path: string) => void;
}

export const QuickActions = ({ onNavigate }: QuickActionsProps) => {
  const { isMobile } = useResponsive();
  
  const handleClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Link to="/my-applications" onClick={() => handleClick("/my-applications")}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full h-14 sm:h-20 gradient-primary text-white text-base sm:text-lg shadow-lg hover:shadow-xl transition-shadow hover-button">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
            My Applications
          </Button>
        </motion.div>
      </Link>
      
      <Link to="/application-tracker" onClick={() => handleClick("/application-tracker")}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full h-14 sm:h-20 bg-accent text-white text-base sm:text-lg shadow-lg hover:shadow-xl hover:bg-green-600 transition-all hover-button">
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
            Track Applications
          </Button>
        </motion.div>
      </Link>
    </motion.div>
  );
};