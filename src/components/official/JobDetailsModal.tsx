
import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Calendar, Users, Mail, Phone, Building2, Clock, CheckCircle, XCircle, Flag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: any;
  onApprove?: (jobId: string) => void;
  onReject?: (jobId: string) => void;
  onFlag?: (jobId: string) => void;
  onSendEmail?: (jobId: string, companyEmail: string) => void;
}

export const JobDetailsModal = ({ 
  isOpen, 
  onClose, 
  job, 
  onApprove, 
  onReject, 
  onFlag,
  onSendEmail 
}: JobDetailsModalProps) => {
  if (!job) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
            Job Details
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Header Section */}
          <div className="space-y-4">
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

            {/* Key Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{job.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Posted Date</p>
                      <p className="font-medium">{new Date(job.postedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Applications</p>
                      <p className="font-medium">{job.applicationsCount || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Job Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Job Description</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Requirements</h3>
            <div className="flex flex-wrap gap-2">
              {job.requirements?.map((req: string, index: number) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {req}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Compensation & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Compensation</h3>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-2xl font-bold text-green-700">{job.stipend}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Application Deadline</h3>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <p className="text-lg font-bold text-blue-700">
                    {new Date(job.applicationDeadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{job.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Flag Reason (if flagged) */}
          {job.isFlagged && job.flagReason && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-red-700">Flag Reason</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{job.flagReason}</p>
              </div>
            </div>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            {job.status === 'pending' && (
              <>
                <Button
                  onClick={() => onApprove?.(job.id)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Job
                </Button>
                <Button
                  onClick={() => onReject?.(job.id)}
                  variant="destructive"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Job
                </Button>
              </>
            )}
            
            <Button
              onClick={() => onFlag?.(job.id)}
              variant="outline"
              className={job.isFlagged 
                ? "border-green-500 text-green-600 hover:bg-green-50"
                : "border-red-500 text-red-600 hover:bg-red-50"
              }
            >
              <Flag className="w-4 h-4 mr-2" />
              {job.isFlagged ? 'Unflag Job' : 'Flag Job'}
            </Button>

            <Button
              onClick={() => onSendEmail?.(job.id, job.contactEmail)}
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email to Company
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
