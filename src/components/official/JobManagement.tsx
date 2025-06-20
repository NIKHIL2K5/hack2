
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Eye, Edit, Trash2, Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  jobType: string;
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  deadline: string;
  organizationName: string;
  postedAt: string;
  status: string;
}

interface JobManagementProps {
  organizationName: string;
}

export const JobManagement = ({ organizationName }: JobManagementProps) => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);

  useEffect(() => {
    // Load jobs from localStorage
    const storedJobs = JSON.parse(localStorage.getItem('job_postings') || '[]');
    const orgJobs = storedJobs.filter((job: JobPosting) => job.organizationName === organizationName);
    setJobs(orgJobs);
  }, [organizationName]);

  const deleteJob = (jobId: number) => {
    const allJobs = JSON.parse(localStorage.getItem('job_postings') || '[]');
    const updatedJobs = allJobs.filter((job: JobPosting) => job.id !== jobId);
    localStorage.setItem('job_postings', JSON.stringify(updatedJobs));
    
    setJobs(prev => prev.filter(job => job.id !== jobId));
    toast.success("Job posting deleted successfully!");
  };

  const toggleJobStatus = (jobId: number) => {
    const allJobs = JSON.parse(localStorage.getItem('job_postings') || '[]');
    const updatedJobs = allJobs.map((job: JobPosting) => 
      job.id === jobId 
        ? { ...job, status: job.status === 'active' ? 'closed' : 'active' }
        : job
    );
    localStorage.setItem('job_postings', JSON.stringify(updatedJobs));
    
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: job.status === 'active' ? 'closed' : 'active' }
        : job
    ));
    
    const job = jobs.find(j => j.id === jobId);
    toast.success(`Job ${job?.status === 'active' ? 'closed' : 'activated'} successfully!`);
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-700 border-green-300';
      case 'part-time': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'contract': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'internship': return 'bg-purple-100 text-purple-700 border-purple-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-700 border-green-300'
      : 'bg-red-100 text-red-700 border-red-300';
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center">
          <Briefcase className="w-6 h-6 mr-2" />
          Posted Jobs ({jobs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {jobs.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-white/30" />
            <p className="text-lg">No jobs posted yet</p>
            <p className="text-sm">Click "Post New Job" to create your first job posting</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status === 'active' ? 'Active' : 'Closed'}
                      </Badge>
                      {job.jobType && (
                        <Badge className={getJobTypeColor(job.jobType)}>
                          {job.jobType.replace('-', ' ').toUpperCase()}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-white/80">
                        <p className="font-medium">{job.department}</p>
                        {job.location && (
                          <p className="text-sm text-white/60 flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </p>
                        )}
                      </div>
                      
                      <div className="text-white/80">
                        {job.experience && <p className="text-sm">Experience: {job.experience}</p>}
                        {job.salary && <p className="text-sm">Salary: {job.salary}</p>}
                      </div>
                      
                      <div className="text-white/80">
                        <p className="text-sm flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Posted: {new Date(job.postedAt).toLocaleDateString()}
                        </p>
                        {job.deadline && (
                          <p className="text-sm text-orange-300">
                            Deadline: {new Date(job.deadline).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="bg-white/5 rounded p-3 mb-4">
                      <p className="text-white/70 text-sm line-clamp-3">{job.description}</p>
                    </div>

                    {job.skills.length > 0 && (
                      <div className="mb-4">
                        <p className="text-white/80 text-sm mb-2">Required Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="border-blue-300 text-blue-200 bg-blue-500/20">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={() => toggleJobStatus(job.id)}
                      className={job.status === 'active' 
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                      }
                    >
                      {job.status === 'active' ? 'Close' : 'Activate'}
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={() => deleteJob(job.id)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
