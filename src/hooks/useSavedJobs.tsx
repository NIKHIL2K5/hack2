
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface SavedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  stipend: string;
  type: string;
  savedAt: string;
}

export const useSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      setSavedJobs(JSON.parse(saved));
    }
  }, []);

  const saveJob = (job: any) => {
    const savedJob: SavedJob = {
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      stipend: job.stipend,
      type: job.type,
      savedAt: new Date().toISOString()
    };

    const updated = [...savedJobs, savedJob];
    setSavedJobs(updated);
    localStorage.setItem('savedJobs', JSON.stringify(updated));
    toast.success(`${job.title} saved to your job list!`);
  };

  const removeSavedJob = (jobId: number) => {
    const updated = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(updated);
    localStorage.setItem('savedJobs', JSON.stringify(updated));
    toast.success('Job removed from saved list');
  };

  const isJobSaved = (jobId: number) => {
    return savedJobs.some(job => job.id === jobId);
  };

  return {
    savedJobs,
    saveJob,
    removeSavedJob,
    isJobSaved
  };
};
