import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Shield, Users, CheckCircle, AlertTriangle, Search, Filter, Download, Eye, Clock, FileText, UserCheck, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useToast } from "@/hooks/use-toast";

export const UserVerificationPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      type: 'Student',
      college: 'NIT Warangal',
      documents: ['ID Card', 'College Certificate'],
      submittedDate: '2024-01-18',
      priority: 'high',
      district: 'Warangal'
    },
    {
      id: 2,
      name: 'TechVenture Solutions',
      type: 'Startup',
      industry: 'Software Development',
      documents: ['Registration Certificate', 'GST Certificate', 'Bank Statement'],
      submittedDate: '2024-01-17',
      priority: 'medium',
      district: 'Hyderabad'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      type: 'Student',
      college: 'JNTU Hyderabad',
      documents: ['ID Card', 'Bonafide Certificate'],
      submittedDate: '2024-01-16',
      priority: 'low',
      district: 'Hyderabad'
    },
    {
      id: 4,
      name: 'GreenTech Innovations',
      type: 'Startup',
      industry: 'Renewable Energy',
      documents: ['Incorporation Certificate', 'Environmental Clearance'],
      submittedDate: '2024-01-15',
      priority: 'high',
      district: 'Karimnagar'
    }
  ]);

  const { toast } = useToast();

  const verificationStats = [
    { name: 'Jan', verified: 45, pending: 12, rejected: 3 },
    { name: 'Feb', verified: 52, pending: 8, rejected: 5 },
    { name: 'Mar', verified: 48, pending: 15, rejected: 2 },
    { name: 'Apr', verified: 61, pending: 9, rejected: 4 },
    { name: 'May', verified: 55, pending: 18, rejected: 3 },
    { name: 'Jun', verified: 67, pending: 11, rejected: 6 }
  ];

  const userTypeDistribution = [
    { name: 'Students', value: 1456, color: '#3B82F6' },
    { name: 'Startups', value: 387, color: '#10B981' },
    { name: 'Officials', value: 45, color: '#F59E0B' },
    { name: 'Freelancers', value: 268, color: '#8B5CF6' }
  ];

  const recentlyVerified = [
    { name: 'Anitha Reddy', type: 'Student', verifiedDate: '2024-01-18', verifiedBy: 'Officer A' },
    { name: 'DataFlow Systems', type: 'Startup', verifiedDate: '2024-01-18', verifiedBy: 'Officer B' },
    { name: 'Mohammed Ali', type: 'Student', verifiedDate: '2024-01-17', verifiedBy: 'Officer C' },
    { name: 'EduTech Global', type: 'Startup', verifiedDate: '2024-01-17', verifiedBy: 'Officer A' }
  ];

  const flaggedAccounts = [
    { id: 1, name: 'Suspicious Startup Ltd', reason: 'Invalid documents', flaggedDate: '2024-01-16', severity: 'high' },
    { id: 2, name: 'John Doe', reason: 'Duplicate registration', flaggedDate: '2024-01-15', severity: 'medium' },
    { id: 3, name: 'Fake Corp', reason: 'Non-existent company', flaggedDate: '2024-01-14', severity: 'high' }
  ];

  const handleReviewUser = (userId: number) => {
    console.log('Reviewing user:', userId);
    const user = pendingUsers.find(u => u.id === userId);
    toast({
      title: "Document Review Started",
      description: `Opening document review for ${user?.name}. Checking all submitted documents...`,
    });
  };

  const handleApproveUser = (userId: number) => {
    console.log('Approving user:', userId);
    const user = pendingUsers.find(u => u.id === userId);
    
    // Remove user from pending list
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    
    toast({
      title: "User Approved ✅",
      description: `${user?.name} has been successfully verified and approved. Welcome email sent.`,
    });
  };

  const handleRejectUser = (userId: number) => {
    console.log('Rejecting user:', userId);
    const user = pendingUsers.find(u => u.id === userId);
    
    // Remove user from pending list
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    
    toast({
      title: "User Rejected ❌", 
      description: `${user?.name}'s verification has been rejected. Rejection notice sent with feedback.`,
      variant: "destructive",
    });
  };

  const handleExportReport = () => {
    console.log('Exporting verification report');
    
    const reportData = {
      exportDate: new Date().toISOString(),
      totalPendingVerifications: pendingUsers.length,
      verificationStats,
      userDistribution: userTypeDistribution,
      flaggedAccounts: flaggedAccounts.length,
      recentActivity: recentlyVerified
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `verification-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Report Exported 📊",
      description: "Verification analytics report has been downloaded successfully.",
    });
  };

  const handleFilterUsers = () => {
    console.log('Filtering users with criteria:', selectedFilter);
    toast({
      title: "Filter Applied 🔍",
      description: `Showing users filtered by: ${selectedFilter}. Use search to further narrow results.`,
    });
  };

  const handleViewFlaggedAccount = (accountId: number) => {
    console.log('Viewing flagged account:', accountId);
    const account = flaggedAccounts.find(a => a.id === accountId);
    toast({
      title: "Viewing Flagged Account 🚩",
      description: `Opening detailed investigation for ${account?.name}. Reviewing all flags and evidence.`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">User Verification & Moderation</h2>
          <p className="text-white/70">Verify documents, manage user accounts, and ensure platform integrity</p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={handleFilterUsers}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button
            onClick={handleExportReport}
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
          { title: 'Pending Verification', value: pendingUsers.length.toString(), change: '+8', icon: AlertTriangle, color: 'bg-yellow-500' },
          { title: 'Verified Today', value: '23', change: '+15', icon: CheckCircle, color: 'bg-green-500' },
          { title: 'Total Users', value: '2,156', change: '+156', icon: Users, color: 'bg-blue-500' },
          { title: 'Flagged Accounts', value: flaggedAccounts.length.toString(), change: '-3', icon: Shield, color: 'bg-red-500' }
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
            <CardTitle className="text-white">Verification Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={verificationStats}>
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
                <Bar dataKey="verified" fill="#10B981" />
                <Bar dataKey="pending" fill="#F59E0B" />
                <Bar dataKey="rejected" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {userTypeDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                  <span className="text-white/80 text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Pending Verifications</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingUsers.map((user) => (
              <div key={user.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-medium">{user.name}</h4>
                      <Badge variant="outline" className="text-white/70">
                        {user.type}
                      </Badge>
                      <Badge className={`${getPriorityColor(user.priority)} text-white text-xs`}>
                        {user.priority}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">
                          {user.type === 'Student' ? 'College: ' : 'Industry: '}
                        </span>
                        <span className="text-white/80">
                          {user.type === 'Student' ? user.college : user.industry}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/60">District: </span>
                        <span className="text-white/80">{user.district}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Documents: </span>
                        <span className="text-white/80">{user.documents.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Submitted: </span>
                        <span className="text-white/80">{user.submittedDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handleReviewUser(user.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handleApproveUser(user.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => handleRejectUser(user.id)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Recently Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentlyVerified.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium text-sm">{user.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-white/70 text-xs">
                        {user.type}
                      </Badge>
                      <span className="text-white/60 text-xs">by {user.verifiedBy}</span>
                    </div>
                  </div>
                  <span className="text-white/60 text-xs">{user.verifiedDate}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Flagged Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {flaggedAccounts.map((account, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm">{account.name}</p>
                      <p className="text-white/70 text-xs">{account.reason}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs ${getSeverityColor(account.severity)}`}>
                          {account.severity} priority
                        </span>
                        <span className="text-white/50 text-xs">{account.flaggedDate}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handleViewFlaggedAccount(account.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
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
