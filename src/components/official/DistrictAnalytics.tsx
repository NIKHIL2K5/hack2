
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Users, Briefcase, Building2, Filter, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export const DistrictAnalytics = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [dateRange, setDateRange] = useState('3months');

  const districtData = [
    { name: 'Hyderabad', startups: 456, jobs: 1234, applications: 5670, students: 2340, growth: '+15%' },
    { name: 'Rangareddy', startups: 234, jobs: 567, applications: 2345, students: 1230, growth: '+12%' },
    { name: 'Warangal Urban', startups: 89, jobs: 234, applications: 1123, students: 567, growth: '+8%' },
    { name: 'Karimnagar', startups: 67, jobs: 156, applications: 789, students: 345, growth: '+5%' },
    { name: 'Nizamabad', startups: 45, jobs: 123, applications: 567, students: 234, growth: '+3%' },
    { name: 'Nalgonda', startups: 34, jobs: 89, applications: 345, students: 178, growth: '+2%' },
    { name: 'Warangal Rural', startups: 23, jobs: 67, applications: 234, students: 123, growth: '+1%' },
    { name: 'Khammam', startups: 21, jobs: 56, applications: 189, students: 98, growth: '+4%' }
  ];

  const sectorData = [
    { name: 'Technology', value: 35, color: 'bg-blue-500' },
    { name: 'Healthcare', value: 18, color: 'bg-green-500' },
    { name: 'Agriculture', value: 15, color: 'bg-yellow-500' },
    { name: 'Manufacturing', value: 12, color: 'bg-purple-500' },
    { name: 'Education', value: 10, color: 'bg-pink-500' },
    { name: 'Fintech', value: 10, color: 'bg-indigo-500' }
  ];

  const skillsInDemand = [
    { skill: 'React/JavaScript', demand: 85, supply: 92 },
    { skill: 'Python/Data Science', demand: 78, supply: 65 },
    { skill: 'Digital Marketing', demand: 72, supply: 88 },
    { skill: 'UI/UX Design', demand: 68, supply: 75 },
    { skill: 'Node.js/Backend', demand: 65, supply: 58 },
    { skill: 'DevOps/Cloud', demand: 62, supply: 45 }
  ];

  const getGrowthColor = (growth: string) => {
    const value = parseInt(growth.replace('%', '').replace('+', ''));
    if (value >= 10) return 'text-green-400';
    if (value >= 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">District-Wise Analytics Dashboard</h2>
          <p className="text-white/70">Comprehensive view of startup ecosystem across Telangana</p>
        </div>
        <Button className="bg-blue-600 text-white">
          <TrendingUp className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-white">District</Label>
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {districtData.map(district => (
                    <SelectItem key={district.name} value={district.name}>{district.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-white">Sector</Label>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  {sectorData.map(sector => (
                    <SelectItem key={sector.name} value={sector.name}>{sector.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-white">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white w-full">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Districts Active', value: '33', icon: MapPin, color: 'bg-blue-500' },
          { title: 'Total Startups', value: '1,247', icon: Building2, color: 'bg-green-500' },
          { title: 'Job Postings', value: '2,890', icon: Briefcase, color: 'bg-purple-500' },
          { title: 'Student Applications', value: '12,456', icon: Users, color: 'bg-orange-500' }
        ].map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Performance Table */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              District Performance Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {districtData.map((district, index) => (
                <motion.div
                  key={district.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-white/60 text-sm">#{index + 1}</span>
                      <h3 className="text-white font-semibold">{district.name}</h3>
                      <span className={`text-sm font-medium ${getGrowthColor(district.growth)}`}>
                        {district.growth}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-white/60">Startups</p>
                      <p className="text-white font-medium">{district.startups}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Jobs</p>
                      <p className="text-white font-medium">{district.jobs}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Applications</p>
                      <p className="text-white font-medium">{district.applications}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Students</p>
                      <p className="text-white font-medium">{district.students}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sector Distribution */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              Sector Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectorData.map((sector, index) => (
                <motion.div
                  key={sector.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${sector.color}`}></div>
                    <span className="text-white">{sector.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-white/20 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${sector.color}`}
                        style={{ width: `${sector.value}%` }}
                      ></div>
                    </div>
                    <span className="text-white/80 text-sm w-10">{sector.value}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Analysis */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Skills in Demand vs. Supply Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsInDemand.map((skill, index) => (
              <motion.div
                key={skill.skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <h3 className="text-white font-semibold mb-3">{skill.skill}</h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">Demand</span>
                      <span className="text-white">{skill.demand}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${skill.demand}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">Supply</span>
                      <span className="text-white">{skill.supply}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${skill.supply}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Gap:</span>
                    <span className={`${skill.demand > skill.supply ? 'text-red-400' : 'text-green-400'}`}>
                      {Math.abs(skill.demand - skill.supply)}% {skill.demand > skill.supply ? 'shortage' : 'surplus'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
