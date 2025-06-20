
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Eye } from 'lucide-react';

export const PriorityIssuesList = () => {
  const urgentIssues = [
    { id: 1, title: 'Job application process too complex', severity: 'high', category: 'Job Portal', reports: 23, status: 'investigating' },
    { id: 2, title: 'Scheme eligibility criteria unclear', severity: 'medium', category: 'Scheme Process', reports: 15, status: 'resolved' },
    { id: 3, title: 'Website loading slow on mobile', severity: 'low', category: 'Website UI/UX', reports: 8, status: 'pending' },
    { id: 4, title: 'Document upload failing frequently', severity: 'high', category: 'Technical', reports: 31, status: 'investigating' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Priority Issues
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {urgentIssues.map((issue) => (
            <div key={issue.id} className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">{issue.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={`${getSeverityColor(issue.severity)} text-white text-xs`}>
                      {issue.severity}
                    </Badge>
                    <span className="text-white/60 text-xs">{issue.reports} reports</span>
                    <Badge variant="outline" className="text-white/70 text-xs">
                      {issue.status}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-white/70 hover:text-white">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
