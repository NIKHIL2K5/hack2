import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/student/JobCard";
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

interface JobsSectionProps {
  filteredJobs: Job[];
  onApply: (job: Job) => void;
}

export const JobsSection = ({ filteredJobs, onApply }: JobsSectionProps) => {
  const { isMobile } = useResponsive();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <motion.h2 
          className="text-xl sm:text-2xl font-bold text-neutral-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Available Jobs ({filteredJobs.length})
        </motion.h2>
        <Link to="/jobs">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="border-primary-300 text-primary-700 hover:bg-blue-100 hover:border-blue-400 hover-button text-xs sm:text-sm">
              View All Jobs
            </Button>
          </motion.div>
        </Link>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {filteredJobs.map((job, index) => (
          <div key={job.id} className="hover-card">
            <JobCard 
              job={job}
              index={index}
              onApply={onApply}
            />
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 sm:py-12"
        >
          <p className="text-neutral-600 text-lg sm:text-xl">No jobs found matching your criteria.</p>
          <p className="text-neutral-500 mt-2">Try adjusting your search filters.</p>
        </motion.div>
      )}

      {isMobile && filteredJobs.length > 0 && (
        <div className="mt-4 text-center">
          <Link to="/jobs">
            <Button variant="outline" className="w-full border-primary-300 text-primary-700">
              View All Jobs
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};