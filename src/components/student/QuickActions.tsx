
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export const QuickActions = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Link to="/my-applications">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full h-20 gradient-primary text-white text-lg shadow-lg hover:shadow-xl transition-shadow hover-button">
            <FileText className="w-6 h-6 mr-3" />
            My Applications
          </Button>
        </motion.div>
      </Link>
      
      <Link to="/application-tracker">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full h-20 bg-accent text-white text-lg shadow-lg hover:shadow-xl hover:bg-green-600 transition-all hover-button">
            <Briefcase className="w-6 h-6 mr-3" />
            Track Applications
          </Button>
        </motion.div>
      </Link>
    </motion.div>
  );
};
