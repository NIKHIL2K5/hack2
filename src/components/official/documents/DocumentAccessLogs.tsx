
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const DocumentAccessLogs = () => {
  const accessLogs = [
    { user: 'District Collector - Hyderabad', document: 'T-Hub Startup Policy 2024.pdf', action: 'Downloaded', time: '2 hours ago' },
    { user: 'Startup - TechVenture Solutions', document: 'Scheme Guidelines.docx', action: 'Viewed', time: '4 hours ago' },
    { user: 'Student - JNTU Hyderabad', document: 'IT Sector Report.pdf', action: 'Downloaded', time: '6 hours ago' },
    { user: 'Official - IT Department', document: 'Policy Document.pdf', action: 'Edited', time: '1 day ago' }
  ];

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Recent Access Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {accessLogs.map((log, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div>
                  <p className="text-white font-medium text-sm">{log.user}</p>
                  <p className="text-white/70 text-xs">{log.action} "{log.document}"</p>
                </div>
              </div>
              <span className="text-white/60 text-xs">{log.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
