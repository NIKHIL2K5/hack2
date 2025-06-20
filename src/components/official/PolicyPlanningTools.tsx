
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, FileText, MapPin, BarChart3 } from 'lucide-react';

export const PolicyPlanningTools = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Policy Planning Tools</h2>
        <p className="text-white/70">Advanced analytics for policy planning and decision making</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Underserved Regions', value: '8', icon: MapPin, color: 'bg-red-500' },
          { title: 'Policy Reports', value: '15', icon: FileText, color: 'bg-blue-500' },
          { title: 'Growth Opportunities', value: '12', icon: TrendingUp, color: 'bg-green-500' }
        ].map((stat) => (
          <Card key={stat.title} className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Policy Planning Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70">Advanced policy planning tools will be implemented here including underserved region identification, performance analytics, and report generation for CM office and ministry.</p>
        </CardContent>
      </Card>
    </div>
  );
};
