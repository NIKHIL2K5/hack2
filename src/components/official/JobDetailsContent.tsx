
import React from 'react';
import { Clock, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface JobDetailsContentProps {
  job: any;
}

export const JobDetailsContent = ({ job }: JobDetailsContentProps) => {
  return (
    <>
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
    </>
  );
};
