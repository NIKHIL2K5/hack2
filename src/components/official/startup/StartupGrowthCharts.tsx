
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const StartupGrowthCharts = () => {
  const startupGrowthData = [
    { month: 'Jan', registered: 45, active: 42, compliant: 38 },
    { month: 'Feb', registered: 52, active: 49, compliant: 45 },
    { month: 'Mar', registered: 48, active: 46, compliant: 41 },
    { month: 'Apr', registered: 61, active: 58, compliant: 52 },
    { month: 'May', registered: 55, active: 52, compliant: 48 },
    { month: 'Jun', registered: 67, active: 63, compliant: 58 }
  ];

  const industryDistribution = [
    { name: 'Technology', value: 45, color: '#3B82F6' },
    { name: 'Healthcare', value: 23, color: '#10B981' },
    { name: 'Fintech', value: 18, color: '#F59E0B' },
    { name: 'E-commerce', value: 12, color: '#8B5CF6' },
    { name: 'Others', value: 15, color: '#6B7280' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Startup Growth Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={startupGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="registered" fill="#3B82F6" />
              <Bar dataKey="active" fill="#10B981" />
              <Bar dataKey="compliant" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Industry Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={industryDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {industryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {industryDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                <span className="text-white/80 text-sm">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
