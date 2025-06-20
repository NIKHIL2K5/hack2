import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Building2, TrendingUp, Eye, BarChart3, Download, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export const DistrictAnalytics = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedEmploymentRange, setSelectedEmploymentRange] = useState('all');

  const districtData = [
    {
      id: 1,
      name: 'Adilabad',
      priority: 'high priority',
      population: 708972,
      startupDensity: '0.8/1000',
      employmentRate: '45%',
      intervention: 'Infrastructure Development',
      startups: 15,
      activeSchemes: 3,
      fundingAllocated: '₹2.5 Cr'
    },
    {
      id: 2,
      name: 'Hyderabad',
      priority: 'medium priority',
      population: 3943323,
      startupDensity: '12.5/1000',
      employmentRate: '78%',
      intervention: 'Skill Development',
      startups: 1234,
      activeSchemes: 15,
      fundingAllocated: '₹45.8 Cr'
    },
    {
      id: 3,
      name: 'Warangal',
      priority: 'low priority',
      population: 1136574,
      startupDensity: '3.2/1000',
      employmentRate: '62%',
      intervention: 'Education Enhancement',
      startups: 89,
      activeSchemes: 8,
      fundingAllocated: '₹12.3 Cr'
    }
  ];

  const performanceData = [
    { month: 'Jan', hyderabad: 120, warangal: 45, adilabad: 12 },
    { month: 'Feb', hyderabad: 135, warangal: 52, adilabad: 15 },
    { month: 'Mar', hyderabad: 142, warangal: 48, adilabad: 18 },
    { month: 'Apr', hyderabad: 158, warangal: 61, adilabad: 22 },
    { month: 'May', hyderabad: 165, warangal: 55, adilabad: 25 },
    { month: 'Jun', hyderabad: 178, warangal: 67, adilabad: 28 }
  ];

  const handleAnalyzeDistrict = (district: any) => {
    setSelectedDistrict(district);
    console.log('Analyzing district:', district.name);
    
    // Show detailed analysis modal or redirect to detailed view
    alert(`Analyzing ${district.name} district:\n\n` +
          `Population: ${district.population.toLocaleString()}\n` +
          `Employment Rate: ${district.employmentRate}\n` +
          `Startups: ${district.startups}\n` +
          `Priority: ${district.priority}\n` +
          `Recommended Intervention: ${district.intervention}`);
  };

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
    console.log('Filter panel toggled:', !showFilters);
  };

  const handleGenerateReport = () => {
    console.log('Generating district analytics report');
    const reportData = {
      totalDistricts: districtData.length,
      highPriorityDistricts: districtData.filter(d => d.priority === 'high priority').length,
      totalStartups: districtData.reduce((sum, d) => sum + d.startups, 0),
      averageEmployment: Math.round(
        districtData.reduce((sum, d) => sum + parseFloat(d.employmentRate), 0) / districtData.length
      )
    };
    
    alert(`District Analytics Report Generated:\n\n` +
          `Total Districts: ${reportData.totalDistricts}\n` +
          `High Priority Districts: ${reportData.highPriorityDistricts}\n` +
          `Total Startups: ${reportData.totalStartups}\n` +
          `Average Employment Rate: ${reportData.averageEmployment}%`);
  };

  const handleExportData = () => {
    console.log('Exporting district data');
    const csvData = districtData.map(district => 
      `${district.name},${district.population},${district.employmentRate},${district.startups},${district.priority}`
    );
    alert('District data exported successfully!\n\nData format: Name, Population, Employment Rate, Startups, Priority');
  };

  const filteredDistricts = districtData.filter(district => {
    if (selectedPriority !== 'all' && district.priority !== selectedPriority) return false;
    if (selectedEmploymentRange !== 'all') {
      const rate = parseFloat(district.employmentRate);
      if (selectedEmploymentRange === 'low' && rate >= 50) return false;
      if (selectedEmploymentRange === 'medium' && (rate < 50 || rate >= 70)) return false;
      if (selectedEmploymentRange === 'high' && rate < 70) return false;
    }
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high priority': return 'text-red-400';
      case 'medium priority': return 'text-yellow-400';
      case 'low priority': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">District-wise Analytics</h2>
          <p className="text-white/70">Comprehensive analysis of startup ecosystem across all districts</p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={handleFilterToggle}
            variant="outline"
            className={`${showFilters ? 'bg-blue-500 text-white' : 'bg-white/10 border-white/20 text-white'} hover:bg-white/20`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
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
            Export Data
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Filter Districts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Priority Level</label>
                <select 
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
                >
                  <option value="all">All Priorities</option>
                  <option value="high priority">High Priority</option>
                  <option value="medium priority">Medium Priority</option>
                  <option value="low priority">Low Priority</option>
                </select>
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Employment Rate</label>
                <select 
                  value={selectedEmploymentRange}
                  onChange={(e) => setSelectedEmploymentRange(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
                >
                  <option value="all">All Ranges</option>
                  <option value="low">Below 50%</option>
                  <option value="medium">50% - 70%</option>
                  <option value="high">Above 70%</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Districts', value: '33', change: '+0', icon: MapPin, color: 'bg-blue-500' },
          { title: 'Active Programs', value: '45', change: '+8', icon: TrendingUp, color: 'bg-green-500' },
          { title: 'Total Beneficiaries', value: '12,456', change: '+1,234', icon: Users, color: 'bg-purple-500' },
          { title: 'Registered Startups', value: '1,847', change: '+156', icon: Building2, color: 'bg-orange-500' }
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

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">District Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
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
              <Line type="monotone" dataKey="hyderabad" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="warangal" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="adilabad" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">
            District Overview 
            {filteredDistricts.length !== districtData.length && (
              <span className="text-sm text-white/60 ml-2">
                ({filteredDistricts.length} of {districtData.length} districts)
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDistricts.map((district) => (
              <div key={district.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-medium text-lg">{district.name}</h4>
                      <Badge className={`${getPriorityColor(district.priority)} bg-opacity-20`}>
                        {district.priority}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-white/60">Population: </span>
                        <span className="text-white/80">{district.population.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Startup Density: </span>
                        <span className="text-white/80">{district.startupDensity}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Employment Rate: </span>
                        <span className="text-white/80">{district.employmentRate}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Intervention: </span>
                        <span className="text-white/80">{district.intervention}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Startups: </span>
                        <span className="text-white/80 font-medium">{district.startups}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Active Schemes: </span>
                        <span className="text-white/80 font-medium">{district.activeSchemes}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Funding: </span>
                        <span className="text-white/80 font-medium">{district.fundingAllocated}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => handleAnalyzeDistrict(district)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Analyze
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
