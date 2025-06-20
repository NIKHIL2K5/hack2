
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, TrendingUp, AlertTriangle, ThumbsUp, Filter, Download, Eye, Clock, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

export const FeedbackAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sentimentData = [
    { name: 'Jan', positive: 85, negative: 15, neutral: 25 },
    { name: 'Feb', positive: 78, negative: 22, neutral: 30 },
    { name: 'Mar', positive: 92, negative: 8, neutral: 20 },
    { name: 'Apr', positive: 88, negative: 12, neutral: 25 },
    { name: 'May', positive: 95, negative: 5, neutral: 18 },
    { name: 'Jun', positive: 89, negative: 11, neutral: 22 }
  ];

  const categoryBreakdown = [
    { name: 'Job Portal', value: 45, color: '#3B82F6' },
    { name: 'Scheme Process', value: 30, color: '#10B981' },
    { name: 'Website UI/UX', value: 15, color: '#F59E0B' },
    { name: 'Support Response', value: 10, color: '#EF4444' }
  ];

  const urgentIssues = [
    { id: 1, title: 'Job application process too complex', severity: 'high', category: 'Job Portal', reports: 23, status: 'investigating' },
    { id: 2, title: 'Scheme eligibility criteria unclear', severity: 'medium', category: 'Scheme Process', reports: 15, status: 'resolved' },
    { id: 3, title: 'Website loading slow on mobile', severity: 'low', category: 'Website UI/UX', reports: 8, status: 'pending' },
    { id: 4, title: 'Document upload failing frequently', severity: 'high', category: 'Technical', reports: 31, status: 'investigating' }
  ];

  const recentFeedback = [
    { id: 1, user: 'Student from Hyderabad', message: 'Great job portal, found internship easily!', sentiment: 'positive', time: '2 hours ago', rating: 5 },
    { id: 2, user: 'Startup from Warangal', message: 'Scheme application process needs simplification', sentiment: 'negative', time: '4 hours ago', rating: 2 },
    { id: 3, user: 'Student from Nizamabad', message: 'Love the new AI chat feature', sentiment: 'positive', time: '6 hours ago', rating: 5 },
    { id: 4, user: 'Startup from Karimnagar', message: 'Document verification is taking too long', sentiment: 'negative', time: '8 hours ago', rating: 2 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

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
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Feedback', value: '2,847', change: '+12%', icon: MessageSquare, color: 'bg-blue-500' },
          { title: 'Positive Sentiment', value: '89%', change: '+5%', icon: ThumbsUp, color: 'bg-green-500' },
          { title: 'Issues Resolved', value: '156', change: '+23%', icon: TrendingUp, color: 'bg-purple-500' },
          { title: 'Avg Response Time', value: '2.3h', change: '-15%', icon: Clock, color: 'bg-orange-500' }
        ].map((stat) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Feedback Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryBreakdown.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                  <span className="text-white/80 text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
};
