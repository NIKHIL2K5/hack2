
import { motion } from "framer-motion";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { NotificationsPanel } from "./NotificationsPanel";

interface StudentHeaderProps {
  profileName: string;
  showProfile: boolean;
  setShowProfile: (show: boolean) => void;
  ProfileModalContent: React.ReactNode;
  appliedJobs?: any[];
  profile?: any;
}

export const StudentHeader = ({ 
  profileName, 
  showProfile, 
  setShowProfile, 
  ProfileModalContent,
  appliedJobs = [],
  profile = {}
}: StudentHeaderProps) => {
  return (
    <header className="glass-card border-b border-neutral-200/80 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 relative">
              <img 
                src="/lovable-uploads/dc27c7bf-1e1d-4fb1-a5c7-01b85351db67.png" 
                alt="GovStartup Navigator"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-700">Student Dashboard</h1>
              <p className="text-neutral-600">Welcome back{profileName ? `, ${profileName}` : ""}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NotificationsPanel appliedJobs={appliedJobs} profile={profile} />
            
            <Dialog open={showProfile} onOpenChange={setShowProfile}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-neutral-300 text-neutral-700 hover:bg-neutral-100">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </DialogTrigger>
              {ProfileModalContent}
            </Dialog>
            
            <Link to="/">
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                <LogOut className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
