
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Download } from 'lucide-react';
import { FeedbackStatsCards } from './feedback/FeedbackStatsCards';
import { SentimentTrendsChart } from './feedback/SentimentTrendsChart';
import { CategoryBreakdownChart } from './feedback/CategoryBreakdownChart';
import { PriorityIssuesList } from './feedback/PriorityIssuesList';
import { RecentFeedbackList } from './feedback/RecentFeedbackList';

export const FeedbackAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Feedback Sentiment Analytics</h2>
          <p className="text-white/70">Monitor user satisfaction and identify improvement areas</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
      
      <FeedbackStatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentTrendsChart />
        <CategoryBreakdownChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriorityIssuesList />
        <RecentFeedbackList />
      </div>
    </div>
  );
};
