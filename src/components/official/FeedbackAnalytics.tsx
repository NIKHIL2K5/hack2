
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, TrendingUp, AlertTriangle, ThumbsUp } from 'lucide-react';

export const FeedbackAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Feedback Sentiment Analytics</h2>
        <p className="text-white/70">Analyze user feedback and sentiment trends</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Total Feedback', value: '1,234', icon: MessageSquare, color: 'bg-blue-500' },
          { title: 'Positive Sentiment', value: '67%', icon: ThumbsUp, color: 'bg-green-500' },
          { title: 'Issues Identified', value: '45', icon: AlertTriangle, color: 'bg-red-500' }
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
          <CardTitle className="text-white">Feedback Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70">Comprehensive feedback analysis features will be implemented here including sentiment classification, trend analysis, and actionable insights.</p>
        </CardContent>
      </Card>
    </div>
  );
};
