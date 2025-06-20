
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const SentimentTrendsChart = () => {
  const sentimentData = [
    { name: 'Jan', positive: 85, negative: 15, neutral: 25 },
    { name: 'Feb', positive: 78, negative: 22, neutral: 30 },
    { name: 'Mar', positive: 92, negative: 8, neutral: 20 },
    { name: 'Apr', positive: 88, negative: 12, neutral: 25 },
    { name: 'May', positive: 95, negative: 5, neutral: 18 },
    { name: 'Jun', positive: 89, negative: 11, neutral: 22 }
  ];

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Sentiment Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sentimentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px'
              }}
            />
            <Line type="monotone" dataKey="positive" stroke="#10B981" strokeWidth={3} />
            <Line type="monotone" dataKey="negative" stroke="#EF4444" strokeWidth={3} />
            <Line type="monotone" dataKey="neutral" stroke="#F59E0B" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
