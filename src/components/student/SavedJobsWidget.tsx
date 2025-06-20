
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SavedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  stipend: string;
  type: string;
  savedAt: string;
}

export const SavedJobsWidget = () => {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      setSavedJobs(JSON.parse(saved));
    }
  }, []);

  const removeSavedJob = (jobId: number) => {
    const updated = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(updated);
    localStorage.setItem('savedJobs', JSON.stringify(updated));
  };

  if (savedJobs.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-20 right-6 z-40"
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 max-h-64 overflow-y-auto"
          >
            <Card className="bg-white shadow-xl border border-gray-200">
              <div className="p-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Saved Jobs</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2 p-2">
                {savedJobs.slice(0, 3).map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:bg-gray-50 transition-colors">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">{job.title}</p>
                            <p className="text-sm text-gray-600">{job.company}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">{job.type}</Badge>
                              <span className="text-xs text-gray-500">{job.stipend}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSavedJob(job.id)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
      >
        <div className="relative">
          <Bookmark className="w-6 h-6" />
          {savedJobs.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
              {savedJobs.length}
            </Badge>
          )}
        </div>
      </Button>
    </motion.div>
  );
};
