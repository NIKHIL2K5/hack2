
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Eye, MessageSquare, Clock, CheckCircle } from 'lucide-react';

export const PriorityIssuesList = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);

  const urgentIssues = [
    { 
      id: 1, 
      title: 'Job application process too complex', 
      severity: 'high', 
      category: 'Job Portal', 
      reports: 23, 
      status: 'investigating',
      description: 'Users are reporting difficulty navigating the multi-step job application process.',
      reportedBy: ['user123', 'student456', 'candidate789'],
      lastUpdate: '2 hours ago'
    },
    { 
      id: 2, 
      title: 'Scheme eligibility criteria unclear', 
      severity: 'medium', 
      category: 'Scheme Process', 
      reports: 15, 
      status: 'resolved',
      description: 'Multiple users confused about startup scheme eligibility requirements.',
      reportedBy: ['startup_founder', 'entrepreneur2', 'newbie_startup'],
      lastUpdate: '1 day ago'
    },
    { 
      id: 3, 
      title: 'Website loading slow on mobile', 
      severity: 'low', 
      category: 'Website UI/UX', 
      reports: 8, 
      status: 'pending',
      description: 'Mobile users experiencing slow page load times across the platform.',
      reportedBy: ['mobile_user1', 'student_mobile'],
      lastUpdate: '3 hours ago'
    },
    { 
      id: 4, 
      title: 'Document upload failing frequently', 
      severity: 'high', 
      category: 'Technical', 
      reports: 31, 
      status: 'investigating',
      description: 'Document upload feature failing for various file types and sizes.',
      reportedBy: ['doc_uploader', 'startup_docs', 'compliance_user'],
      lastUpdate: '30 minutes ago'
    }
  ];

  const handleViewDetails = (issue) => {
    setSelectedIssue(issue);
    console.log('Viewing issue details:', issue.title);
    
    const statusIcon = issue.status === 'resolved' ? '✅' : 
                      issue.status === 'investigating' ? '🔍' : '⏳';
    
    alert(`${statusIcon} Issue Details:\n\n` +
          `Title: ${issue.title}\n` +
          `Severity: ${issue.severity.toUpperCase()}\n` +
          `Category: ${issue.category}\n` +
          `Reports: ${issue.reports}\n` +
          `Status: ${issue.status.toUpperCase()}\n` +
          `Last Update: ${issue.lastUpdate}\n\n` +
          `Description: ${issue.description}\n\n` +
          `Recent Reports From: ${issue.reportedBy.slice(0, 3).join(', ')}`);
  };

  const handleMarkAsResolved = (issueId) => {
    console.log('Marking issue as resolved:', issueId);
    alert(`Issue #${issueId} has been marked as resolved!\n\nA notification will be sent to all affected users.`);
  };

  const handleAssignToTeam = (issueId) => {
    console.log('Assigning issue to team:', issueId);
    alert(`Issue #${issueId} has been assigned to the technical team.\n\nExpected resolution time: 2-3 business days.`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'investigating': return <Eye className="w-4 h-4 text-blue-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Priority Issues
          <Badge className="ml-2 bg-red-100 text-red-700">
            {urgentIssues.filter(issue => issue.severity === 'high').length} Critical
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {urgentIssues.map((issue) => (
            <div key={issue.id} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {getStatusIcon(issue.status)}
                    <h4 className="text-white font-medium text-sm">{issue.title}</h4>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={`${getSeverityColor(issue.severity)} text-white text-xs`}>
                      {issue.severity}
                    </Badge>
                    <span className="text-white/60 text-xs flex items-center">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {issue.reports} reports
                    </span>
                    <Badge variant="outline" className="text-white/70 text-xs">
                      {issue.status}
                    </Badge>
                    <span className="text-white/50 text-xs">{issue.lastUpdate}</span>
                  </div>
                  <p className="text-white/70 text-xs mb-2">{issue.description}</p>
                  <div className="flex space-x-2">
                    {issue.status !== 'resolved' && (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 h-6"
                        onClick={() => handleMarkAsResolved(issue.id)}
                      >
                        Mark Resolved
                      </Button>
                    )}
                    {issue.status === 'pending' && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 h-6"
                        onClick={() => handleAssignToTeam(issue.id)}
                      >
                        Assign Team
                      </Button>
                    )}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => handleViewDetails(issue)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/60">
              Total Issues: {urgentIssues.length} | 
              High Priority: {urgentIssues.filter(i => i.severity === 'high').length}
            </span>
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => alert('Opening full issue management dashboard...')}
            >
              View All Issues
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
