
import React from 'react';
import { Building2, Flag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface JobDetailsHeaderProps {
  job: any;
}

export const JobDetailsHeader = ({ job }: JobDetailsHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'internship': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'full-time': return 'bg-green-100 text-green-700 border-green-300';
      case 'part-time': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'contract': return 'bg-orange-100 text-orange-700 border-orange-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
        <div className="flex items-center space-x-2 mb-3">
          <Building2 className="w-5 h-5 text-gray-500" />
          <span className="text-xl text-gray-700 font-medium">{job.company}</span>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Badge className={getStatusColor(job.status)}>
          {job.status?.toUpperCase()}
        </Badge>
        <Badge className={getJobTypeColor(job.jobType)}>
          {job.jobType?.toUpperCase()}
        </Badge>
        {job.isFlagged && (
          <Badge className="bg-red-100 text-red-700 border-red-300">
            <Flag className="w-3 h-3 mr-1" />
            FLAGGED
          </Badge>
        )}
      </div>
    </div>
  );
};
