
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Building2, Users, TrendingUp, AlertTriangle, Search, Filter, Download, Eye, Flag, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { StartupDetailsModal } from './StartupDetailsModal';

export const StartupMonitoringPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

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

  const startups = [
    {
      id: 1,
      name: 'TechVenture Solutions',
      location: 'Hyderabad',
      industry: 'Technology',
      employees: 25,
      fundingReceived: '₹2.5 Crore',
      lastCompliance: '1/15/2024',
      registeredDate: '3/15/2023',
      complianceStatus: 'COMPLIANT',
      isDPIIT: true,
      contactEmail: 'info@techventure.com',
      contactPhone: '+91 9876543210',
      website: 'https://techventure.com',
      description: 'A leading technology startup focused on AI and machine learning solutions for enterprises.',
      isFlagged: false
    },
    {
      id: 2,
      name: 'GreenTech Innovations',
      location: 'Karimnagar',
      industry: 'Renewable Energy',
      employees: 18,
      fundingReceived: '₹1.8 Crore',
      lastCompliance: '12/28/2023',
      registeredDate: '5/20/2023',
      complianceStatus: 'COMPLIANT',
      isDPIIT: false,
      contactEmail: 'contact@greentech.com',
      contactPhone: '+91 9876543211',
      website: 'https://greentech.com',
      description: 'Innovative solutions for renewable energy and sustainable development.',
      isFlagged: false
    },
    {
      id: 3,
      name: 'HealthFirst Systems',
      location: 'Warangal',
      industry: 'Healthcare',
      employees: 32,
      fundingReceived: '₹3.2 Crore',
      lastCompliance: '10/15/2023',
      registeredDate: '1/10/2023',
      complianceStatus: 'NON_COMPLIANT',
      isDPIIT: true,
      contactEmail: 'info@healthfirst.com',
      contactPhone: '+91 9876543212',
      description: 'Digital healthcare solutions for rural and urban areas.',
      isFlagged: true
    }
  ];

  const handleViewDetails = (startup: any) => {
    setSelectedStartup(startup);
    setIsDetailsModalOpen(true);
  };

  const handleFlag = (startupId: string) => {
    console.log('Flagging startup:', startupId);
    // Implementation for flagging startup
  };

  const handleGenerateReport = () => {
    console.log('Generating startup monitoring report');
    // Implementation for report generation
  };

  const handleExportData = () => {
    console.log('Exporting startup data');
    // Implementation for data export
  };

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLIANT': return 'bg-green-100 text-green-700';
      case 'NON_COMPLIANT': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredStartups = startups.filter(startup => 
    startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Startup Monitoring & Analytics</h2>
          <p className="text-white/70">Track startup registrations, compliance, and growth metrics</p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={handleGenerateReport}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button
            onClick={handleExportData}
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
          { title: 'Total Startups', value: '1,847', change: '+156', icon: Building2, color: 'bg-blue-500' },
          { title: 'Active This Month', value: '124', change: '+23', icon: TrendingUp, color: 'bg-green-500' },
          { title: 'Compliance Issues', value: '12', change: '-8', icon: AlertTriangle, color: 'bg-red-500' },
          { title: 'DPIIT Certified', value: '89', change: '+15', icon: Users, color: 'bg-purple-500' }
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

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Registered Startups</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <Input
                  placeholder="Search startups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStartups.map((startup) => (
              <div key={startup.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-medium text-lg">{startup.name}</h4>
                      <Badge className={getComplianceStatusColor(startup.complianceStatus)}>
                        {startup.complianceStatus}
                      </Badge>
                      {startup.isDPIIT && (
                        <Badge className="bg-blue-100 text-blue-700">
                          DPIIT
                        </Badge>
                      )}
                      {startup.isFlagged && (
                        <Badge className="bg-red-100 text-red-700">
                          <Flag className="w-3 h-3 mr-1" />
                          FLAGGED
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Location: </span>
                        <span className="text-white/80">{startup.location}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Industry: </span>
                        <span className="text-white/80">{startup.industry}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Employees: </span>
                        <span className="text-white/80">{startup.employees}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Funding: </span>
                        <span className="text-white/80">{startup.fundingReceived}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handleViewDetails(startup)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
                      onClick={() => handleFlag(startup.id)}
                    >
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <StartupDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        startup={selectedStartup}
        onFlag={handleFlag}
      />
    </div>
  );
};
