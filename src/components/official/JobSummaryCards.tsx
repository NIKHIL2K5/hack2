
import React from 'react';
import { Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface JobPosting {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  isFlagged: boolean;
}

interface JobSummaryCardsProps {
  jobPostings: JobPosting[];
}

export const JobSummaryCards = ({ jobPostings }: JobSummaryCardsProps) => {
  const summaryData = [
    { title: 'Total Jobs', value: jobPostings.length.toString(), color: 'bg-blue-500' },
    { title: 'Pending Review', value: jobPostings.filter(j => j.status === 'pending').length.toString(), color: 'bg-yellow-500' },
    { title: 'Approved', value: jobPostings.filter(j => j.status === 'approved').length.toString(), color: 'bg-green-500' },
    { title: 'Flagged', value: jobPostings.filter(j => j.isFlagged).length.toString(), color: 'bg-red-500' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {summaryData.map((stat) => (
        <Card key={stat.title} className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center flex-shrink-0`}>
                <Briefcase className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
