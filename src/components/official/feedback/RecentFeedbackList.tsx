
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

export const RecentFeedbackList = () => {
  const recentFeedback = [
    { id: 1, user: 'Student from Hyderabad', message: 'Great job portal, found internship easily!', sentiment: 'positive', time: '2 hours ago', rating: 5 },
    { id: 2, user: 'Startup from Warangal', message: 'Scheme application process needs simplification', sentiment: 'negative', time: '4 hours ago', rating: 2 },
    { id: 3, user: 'Student from Nizamabad', message: 'Love the new AI chat feature', sentiment: 'positive', time: '6 hours ago', rating: 5 },
    { id: 4, user: 'Startup from Karimnagar', message: 'Document verification is taking too long', sentiment: 'negative', time: '8 hours ago', rating: 2 }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Recent Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentFeedback.map((feedback) => (
            <div key={feedback.id} className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-white/80 text-sm font-medium">{feedback.user}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">{feedback.message}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs ${getSentimentColor(feedback.sentiment)}`}>
                      {feedback.sentiment}
                    </span>
                    <span className="text-white/50 text-xs">{feedback.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
