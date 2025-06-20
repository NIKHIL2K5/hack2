
import React from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface JobDetailsInfoProps {
  job: any;
}

export const JobDetailsInfo = ({ job }: JobDetailsInfoProps) => {
  return (
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
  );
};
