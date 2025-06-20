
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { JobDetailsHeader } from './JobDetailsHeader';
import { JobDetailsInfo } from './JobDetailsInfo';
import { JobDetailsContent } from './JobDetailsContent';
import { JobDetailsActions } from './JobDetailsActions';

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
            <JobDetailsHeader job={job} />
            <JobDetailsInfo job={job} />
          </div>

          {/* Content Section */}
          <JobDetailsContent job={job} />

          {/* Action Buttons */}
          <JobDetailsActions 
            job={job}
            onApprove={onApprove}
            onReject={onReject}
            onFlag={onFlag}
            onSendEmail={onSendEmail}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
