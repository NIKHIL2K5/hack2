
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Eye, Flag, MapPin, Calendar, Users, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: 'internship' | 'full-time' | 'part-time' | 'contract';
  stipend: string;
  description: string;
  requirements: string[];
  postedDate: string;
  applicationDeadline: string;
  status: 'pending' | 'approved' | 'rejected';
  isFlagged: boolean;
  flagReason?: string;
  contactEmail: string;
  applicationsCount: number;
}

interface JobPostingCardProps {
  job: JobPosting;
  index: number;
  onViewDetails: (job: JobPosting) => void;
  onFlag: (jobId: string) => void;
  onApprove: (jobId: string) => void;
  onReject: (jobId: string) => void;
  onSendEmail: (jobId: string, email: string) => void;
}

export const JobPostingCard = ({
  job,
  index,
  onViewDetails,
  onFlag,
  onApprove,
  onReject,
  onSendEmail
}: JobPostingCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'internship': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'full-time': return 'bg-green-100 text-green-800 border-green-200';
      case 'part-time': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'contract': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={`bg-white/10 backdrop-blur-lg border-white/20 ${job.isFlagged ? 'ring-2 ring-red-500/50' : ''}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <CardTitle className="text-xl text-white truncate">{job.title}</CardTitle>
                {job.isFlagged && (
                  <Badge className="bg-red-100 text-red-700 border border-red-300 flex-shrink-0">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    FLAGGED
                  </Badge>
                )}
                <Badge className={`${getStatusColor(job.status)} flex-shrink-0`}>
                  {job.status.toUpperCase()}
                </Badge>
                <Badge className={`${getJobTypeColor(job.jobType)} flex-shrink-0`}>
                  {job.jobType.toUpperCase()}
                </Badge>
              </div>
              
              <p className="text-white/80 mb-3 font-medium">{job.company}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                <div className="flex items-center text-white/80 text-sm">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center text-white/80 text-sm">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-white/80 text-sm">
                  <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{job.applicationsCount} applications</span>
                </div>
              </div>

              {job.isFlagged && job.flagReason && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-3">
                  <p className="text-red-200 text-sm">
                    <AlertTriangle className="w-4 h-4 inline mr-2" />
                    {job.flagReason}
                  </p>
                </div>
              )}

              <div className="bg-white/5 rounded-lg p-3 mb-3">
                <p className="text-white/70 text-sm line-clamp-2">{job.description}</p>
              </div>

              <div className="mb-3">
                <p className="text-white/80 text-sm mb-2">Requirements:</p>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, reqIndex) => (
                    <Badge key={reqIndex} variant="outline" className="border-blue-300 text-blue-200 bg-blue-500/20 text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 ml-4 flex-shrink-0">
              <Button
                onClick={() => onViewDetails(job)}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
              
              <Button
                onClick={() => onFlag(job.id)}
                variant="outline"
                size="sm"
                className={job.isFlagged 
                  ? "bg-green-500/20 border-green-500/50 text-green-200 hover:bg-green-500/30"
                  : "bg-red-500/20 border-red-500/50 text-red-200 hover:bg-red-500/30"
                }
              >
                <Flag className="w-4 h-4 mr-1" />
                {job.isFlagged ? 'Unflag' : 'Flag'}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/70 text-sm">Stipend/Salary</p>
              <p className="text-lg font-bold text-green-400">{job.stipend}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/70 text-sm">Application Deadline</p>
              <p className="text-lg font-bold text-blue-400">
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/70 text-sm">Contact</p>
              <p className="text-sm text-white/80 truncate">{job.contactEmail}</p>
            </div>
          </div>

          {job.status === 'pending' && (
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => onApprove(job.id)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button
                onClick={() => onReject(job.id)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
              <Button
                onClick={() => onSendEmail(job.id, job.contactEmail)}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Company
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
