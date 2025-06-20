
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, FileText, MapPin, BarChart3, Target, Users, Building2, Download, Eye, Plus, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart, ScatterChart, Scatter } from 'recharts';

export const PolicyPlanningTools = () => {
  const [selectedMetric, setSelectedMetric] = useState('employment');

  const districtPerformance = [
    { district: 'Hyderabad', employment: 85, startups: 120, growth: 15.2, funding: 45.5 },
    { district: 'Warangal', employment: 62, startups: 35, growth: 8.7, funding: 12.3 },
    { district: 'Nizamabad', employment: 48, startups: 18, growth: 5.4, funding: 8.1 },
    { district: 'Karimnagar', employment: 55, startups: 25, growth: 7.2, funding: 10.5 },
    { district: 'Khammam', employment: 41, startups: 12, growth: 3.8, funding: 5.2 },
    { district: 'Nalgonda', employment: 38, startups: 15, growth: 4.1, funding: 6.8 }
  ];

  const sectorGrowth = [
    { name: 'Jan', tech: 12, manufacturing: 8, agriculture: 5, services: 10 },
    { name: 'Feb', tech: 15, manufacturing: 9, agriculture: 6, services: 11 },
    { name: 'Mar', tech: 18, manufacturing: 12, agriculture: 7, services: 13 },
    { name: 'Apr', tech: 22, manufacturing: 14, agriculture: 8, services: 15 },
    { name: 'May', tech: 25, manufacturing: 16, agriculture: 9, services: 17 },
    { name: 'Jun', tech: 28, manufacturing: 18, agriculture: 10, services: 19 }
  ];

  const policyImpact = [
    { policy: 'T-Hub Initiative', implemented: '2023-01', impact: 'High', beneficiaries: 450, funding: '₹25 Cr', status: 'Active' },
    { policy: 'Rural Startup Support', implemented: '2023-03', impact: 'Medium', beneficiaries: 280, funding: '₹15 Cr', status: 'Active' },
    { policy: 'Women Entrepreneur Fund', implemented: '2023-05', impact: 'High', beneficiaries: 320, funding: '₹20 Cr', status: 'Active' },
    { policy: 'Digital Skill Development', implemented: '2023-07', impact: 'Medium', beneficiaries: 1200, funding: '₹10 Cr', status: 'Under Review' }
  ];

  const underservedRegions = [
    { region: 'Adilabad', population: 708972, startupDensity: 0.8, employmentRate: 45, priority: 'high', interventionNeeded: 'Infrastructure Development' },
    { region: 'Mahabubabad', population: 811508, startupDensity: 1.2, employmentRate: 52, priority: 'medium', interventionNeeded: 'Skill Training Centers' },
    { region: 'Jayashankar', population: 1031406, startupDensity: 1.5, employmentRate: 58, priority: 'medium', interventionNeeded: 'Access to Finance' },
    { region: 'Wanaparthy', population: 617749, startupDensity: 0.9, employmentRate: 48, priority: 'high', interventionNeeded: 'Technology Access' }
  ];

  const policyRecommendations = [
    {
      title: 'Enhanced Rural Connectivity',
      priority: 'high',
      impact: 'High',
      timeline: '6-12 months',
      budget: '₹50 Cr',
      description: 'Improve internet infrastructure in rural districts to enable digital entrepreneurship',
      kpis: ['Internet penetration +25%', 'Rural startups +40%', 'Digital literacy +30%']
    },
    {
      title: 'Sector-Specific Incubators',
      priority: 'medium',
      impact: 'Medium',
      timeline: '12-18 months',
      budget: '₹30 Cr',
      description: 'Establish specialized incubators for agriculture and manufacturing sectors',
      kpis: ['Sector startups +35%', 'Job creation +500', 'Innovation index +20%']
    },
    {
      title: 'Cross-District Mentorship Program',
      priority: 'low',
      impact: 'Medium',
      timeline: '3-6 months',
      budget: '₹8 Cr',
      description: 'Connect successful entrepreneurs from developed districts with emerging regions',
      kpis: ['Mentorship sessions +200%', 'Success rate +15%', 'Network strength +40%']
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Policy Planning & Analytics</h2>
          <p className="text-white/70">Data-driven insights for effective policy formulation and resource allocation</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Policy
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Active Policies', value: '15', change: '+3', icon: FileText, color: 'bg-blue-500' },
          { title: 'Underserved Regions', value: '8', change: '-2', icon: MapPin, color: 'bg-red-500' },
          { title: 'Policy Impact Score', value: '84%', change: '+12%', icon: TrendingUp, color: 'bg-green-500' },
          { title: 'Total Beneficiaries', value: '2.8K', change: '+450', icon: Users, color: 'bg-purple-500' }
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
            <CardTitle className="text-white">District Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="district" stroke="rgba(255,255,255,0.6)" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey={selectedMetric} fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex space-x-2 mt-4">
              {['employment', 'startups', 'growth', 'funding'].map((metric) => (
                <Button
                  key={metric}
                  size="sm"
                  variant={selectedMetric === metric ? "default" : "outline"}
                  onClick={() => setSelectedMetric(metric)}
                  className={selectedMetric === metric ? 
                    "bg-blue-500 text-white" : 
                    "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  }
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Sector Growth Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={sectorGrowth}>
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
                <Area type="monotone" dataKey="tech" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="manufacturing" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="agriculture" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                <Area type="monotone" dataKey="services" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Underserved Regions Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {underservedRegions.map((region, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-medium">{region.region}</h4>
                      <Badge className={`${getPriorityColor(region.priority)} text-white text-xs`}>
                        {region.priority} priority
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Population: </span>
                        <span className="text-white/80">{region.population.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Startup Density: </span>
                        <span className="text-white/80">{region.startupDensity}/1000</span>
                      </div>
                      <div>
                        <span className="text-white/60">Employment Rate: </span>
                        <span className="text-white/80">{region.employmentRate}%</span>
                      </div>
                      <div>
                        <span className="text-white/60">Intervention: </span>
                        <span className="text-white/80">{region.interventionNeeded}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                    <Eye className="w-4 h-4 mr-1" />
                    Analyze
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Policy Impact Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {policyImpact.map((policy, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">{policy.policy}</h4>
                    <Badge variant="outline" className="text-white/70 text-xs">
                      {policy.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-white/60">Impact: </span>
                      <span className={getImpactColor(policy.impact)}>{policy.impact}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Funding: </span>
                      <span className="text-white/80">{policy.funding}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Beneficiaries: </span>
                      <span className="text-white/80">{policy.beneficiaries}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Implemented: </span>
                      <span className="text-white/80">{policy.implemented}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Policy Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {policyRecommendations.map((rec, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-medium text-sm">{rec.title}</h4>
                        <Badge className={`${getPriorityColor(rec.priority)} text-white text-xs`}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-white/70 text-xs mb-2">{rec.description}</p>
                      <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                        <div>
                          <span className="text-white/60">Budget: </span>
                          <span className="text-white/80">{rec.budget}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Timeline: </span>
                          <span className="text-white/80">{rec.timeline}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Impact: </span>
                          <span className={getImpactColor(rec.impact)}>{rec.impact}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {rec.kpis.map((kpi, kpiIndex) => (
                          <Badge key={kpiIndex} variant="outline" className="text-white/60 text-xs">
                            {kpi}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white ml-2">
                      <Target className="w-4 h-4" />
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
