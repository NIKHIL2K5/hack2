
import { motion } from "framer-motion";
import { Building2, MapPin, DollarSign, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <Card className="glass-card hover:shadow-xl transition-all duration-300 group-hover:border-primary-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-neutral-800 mb-2 group-hover:text-primary-700 transition-colors">{job.title}</h3>
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
                    className="border-accent-300 text-accent-700 bg-accent-50 hover:bg-accent-100 transition-colors"
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => onApply(job)}
                className="gradient-primary text-white hover:opacity-90 transition-opacity"
              >
                Apply Now
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
