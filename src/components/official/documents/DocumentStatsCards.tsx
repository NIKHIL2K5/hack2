
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Download, User } from 'lucide-react';

export const DocumentStatsCards = () => {
  const stats = [
    { title: 'Total Documents', value: '214', change: '+18', icon: FileText, color: 'bg-blue-500' },
    { title: 'Recent Uploads', value: '12', change: '+4', icon: Upload, color: 'bg-green-500' },
    { title: 'Total Downloads', value: '3,847', change: '+234', icon: Download, color: 'bg-purple-500' },
    { title: 'Active Users', value: '89', change: '+12', icon: User, color: 'bg-orange-500' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-white/80 text-sm">{stat.title}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    {stat.change}
                  </Badge>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
