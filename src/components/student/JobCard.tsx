
import { motion } from "framer-motion";
import { Building2, MapPin, DollarSign, Clock, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSavedJobs } from "@/hooks/useSavedJobs";

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

  const handleSaveToggle = () => {
    if (isSaved) {
      removeSavedJob(job.id);
    } else {
      saveJob(job);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Card className="glass-card shadow-lg border-primary-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-neutral-800">{job.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSaveToggle}
                  className={`p-2 ${isSaved ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 text-neutral-600 mb-3 text-sm">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-1" />
                  {job.company}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {job.stipend}/month
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {job.duration}
                </div>
              </div>
              <p className="text-neutral-700 mb-4 leading-relaxed">{job.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, skillIndex) => (
                  <Badge 
                    key={skillIndex}
                    variant="outline" 
                    className="border-accent-300 text-accent-700 bg-accent-50"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <Badge className="bg-primary-100 text-primary-700 border-primary-300 font-medium">
              {job.type}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-500 text-sm">Posted {job.posted}</span>
            <Button 
              onClick={() => onApply(job)}
              className="gradient-primary text-white"
            >
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
