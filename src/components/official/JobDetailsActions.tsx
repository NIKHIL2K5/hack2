
import React from 'react';
import { CheckCircle, XCircle, Flag, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobDetailsActionsProps {
  job: any;
  onApprove?: (jobId: string) => void;
  onReject?: (jobId: string) => void;
  onFlag?: (jobId: string) => void;
  onSendEmail?: (jobId: string, companyEmail: string) => void;
}

export const JobDetailsActions = ({ 
  job, 
  onApprove, 
  onReject, 
  onFlag, 
  onSendEmail 
}: JobDetailsActionsProps) => {
  return (
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
  );
};
