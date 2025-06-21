import { motion } from "framer-motion";
import { Building2, MapPin, DollarSign, Clock, Bookmark, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { notificationService } from "@/services/notificationService";
import { toast } from "sonner";
import { useResponsive } from "@/hooks/useResponsive";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
  skills: string[];
  description: string;
  posted: string;
  type: string;
}

interface JobCardProps {
  job: Job;
  index: number;
  onApply: (job: Job) => void;
}

export const JobCard = ({ job, index, onApply }: JobCardProps) => {
  const { saveJob, removeSavedJob, isJobSaved } = useSavedJobs();
  const isSaved = isJobSaved(job.id);
  const { isMobile } = useResponsive();

  const handleSaveToggle = () => {
    if (isSaved) {
      removeSavedJob(job.id);
    } else {
      saveJob(job);
    }
  };

  const handleNotificationToggle = () => {
    // Toggle job notifications
    const notificationTitle = "Job Alert Enabled";
    const notificationMessage = `You'll receive updates about "${job.title}" at ${job.company}`;
    
    notificationService.showNotification(
      notificationTitle,
      notificationMessage,
      'job',
      { jobId: job.id }
    );
    
    toast.success("Job alerts enabled! You'll receive notifications about this position.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Card className="glass-card shadow-lg border-primary-300">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-3 sm:mb-4">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-800 line-clamp-1">{job.title}</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSaveToggle}
                    className={`p-1 sm:p-2 ${isSaved ? 'text-yellow-500' : 'text-gray-400'}`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNotificationToggle}
                    className="p-1 sm:p-2 text-gray-400 hover:text-blue-500"
                  >
                    <Bell className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-4 text-neutral-600 mb-2 sm:mb-3 text-xs sm:text-sm">
                <div className="flex items-center">
                  <Building2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="truncate max-w-[120px] sm:max-w-none">{job.company}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="truncate max-w-[80px] sm:max-w-none">{job.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="truncate max-w-[80px] sm:max-w-none">{job.stipend}/month</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="truncate max-w-[80px] sm:max-w-none">{job.duration}</span>
                </div>
              </div>
              <p className="text-neutral-700 mb-3 sm:mb-4 leading-relaxed line-clamp-2 sm:line-clamp-3 text-sm">{job.description}</p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {job.skills.slice(0, isMobile ? 3 : job.skills.length).map((skill, skillIndex) => (
                  <Badge 
                    key={skillIndex}
                    variant="outline" 
                    className="border-accent-300 text-accent-700 bg-accent-50 text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
                {isMobile && job.skills.length > 3 && (
                  <Badge variant="outline" className="border-gray-300 text-gray-700 bg-gray-50 text-xs">
                    +{job.skills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
            <Badge className="bg-primary-100 text-primary-700 border-primary-300 font-medium self-start sm:self-auto">
              {job.type}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-500 text-xs sm:text-sm">Posted {job.posted}</span>
            <Button 
              onClick={() => onApply(job)}
              className="gradient-primary text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 h-8 sm:h-10"
            >
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};