
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Calendar, AlertTriangle, CheckCircle, Filter, Search, Eye, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Startup {
  id: string;
  name: string;
  district: string;
  sector: string;
  registrationType: 'DPIIT' | 'MSME' | 'GST' | 'Multiple';
  registrationDate: string;
  complianceStatus: 'compliant' | 'pending' | 'overdue';
  lastComplianceDate: string;
  employeeCount: number;
  fundingReceived: string;
  contactEmail: string;
  contactPhone: string;
  isFlagged: boolean;
  flagReason?: string;
}

export const StartupMonitoringPanel = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [complianceFilter, setComplianceFilter] = useState('all');

  const telanganaDistricts = [
    'Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon',
    'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar',
    'Khammam', 'Kumuram Bheem', 'Mahabubabad', 'Mahabubnagar', 'Mancherial',
    'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda',
    'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla',
    'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad',
    'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri'
  ];

  const sectors = [
    'Technology', 'Healthcare', 'Agriculture', 'Manufacturing', 'Education',
    'Fintech', 'E-commerce', 'Renewable Energy', 'Biotechnology', 'Food Processing'
  ];

  useEffect(() => {
    // Initialize with sample startup data
    const sampleStartups: Startup[] = [
      {
        id: '1',
        name: 'TechVenture Solutions',
        district: 'Hyderabad',
        sector: 'Technology',
        registrationType: 'DPIIT',
        registrationDate: '2023-03-15',
        complianceStatus: 'compliant',
        lastComplianceDate: '2024-01-15',
        employeeCount: 25,
        fundingReceived: '₹2.5 Crore',
        contactEmail: 'info@techventure.com',
        contactPhone: '+91 9876543210',
        isFlagged: false
      },
      {
        id: '2',
        name: 'GreenTech Innovations',
        district: 'Warangal Urban',
        sector: 'Renewable Energy',
        registrationType: 'Multiple',
        registrationDate: '2023-07-22',
        complianceStatus: 'pending',
        lastComplianceDate: '2023-10-22',
        employeeCount: 12,
        fundingReceived: '₹1.2 Crore',
        contactEmail: 'contact@greentech.in',
        contactPhone: '+91 9876543211',
        isFlagged: false
      },
      {
        id: '3',
        name: 'Suspicious Corp',
        district: 'Rangareddy',
        sector: 'Fintech',
        registrationType: 'GST',
        registrationDate: '2024-01-01',
        complianceStatus: 'overdue',
        lastComplianceDate: '2024-01-01',
        employeeCount: 5,
        fundingReceived: '₹50 Lakh',
        contactEmail: 'fake@suspicious.com',
        contactPhone: '+91 0000000000',
        isFlagged: true,
        flagReason: 'AI Detection: Unusual registration pattern and missing compliance documents'
      }
    ];
    
    setStartups(sampleStartups);
    setFilteredStartups(sampleStartups);
  }, []);

  useEffect(() => {
    // Filter startups based on all criteria
    let filtered = startups;
    
    if (searchTerm) {
      filtered = filtered.filter(startup => 
        startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.sector.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (districtFilter !== 'all') {
      filtered = filtered.filter(startup => startup.district === districtFilter);
    }
    
    if (sectorFilter !== 'all') {
      filtered = filtered.filter(startup => startup.sector === sectorFilter);
    }
    
    if (complianceFilter !== 'all') {
      filtered = filtered.filter(startup => startup.complianceStatus === complianceFilter);
    }
    
    setFilteredStartups(filtered);
  }, [startups, searchTerm, districtFilter, sectorFilter, complianceFilter]);

  const handleComplianceAction = (startupId: string, action: 'approve' | 'reject') => {
    const updatedStartups = startups.map(startup => 
      startup.id === startupId 
        ? { 
            ...startup, 
            complianceStatus: action === 'approve' ? 'compliant' : 'overdue' as 'compliant' | 'pending' | 'overdue',
            lastComplianceDate: action === 'approve' ? new Date().toISOString().split('T')[0] : startup.lastComplianceDate
          }
        : startup
    );
    
    setStartups(updatedStartups);
    toast.success(`Compliance ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
  };

  const handleFlagStartup = (startupId: string) => {
    const startup = startups.find(s => s.id === startupId);
    if (!startup) return;

    const updatedStartups = startups.map(s => 
      s.id === startupId 
        ? { 
            ...s, 
            isFlagged: !s.isFlagged,
            flagReason: !s.isFlagged ? 'Manually flagged for review' : undefined
          }
        : s
    );
    
    setStartups(updatedStartups);
    toast.success(`Startup ${!startup.isFlagged ? 'flagged' : 'unflagged'} successfully!`);
  };

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRegistrationTypeColor = (type: string) => {
    switch (type) {
      case 'DPIIT': return 'bg-blue-100 text-blue-700';
      case 'MSME': return 'bg-purple-100 text-purple-700';
      case 'GST': return 'bg-orange-100 text-orange-700';
      case 'Multiple': return 'bg-teal-100 text-teal-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Startup Activity & Compliance Monitoring</h2>
          <p className="text-white/70">Monitor registered startups and track compliance status</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Startups', value: startups.length.toString(), color: 'bg-blue-500' },
          { title: 'Compliant', value: startups.filter(s => s.complianceStatus === 'compliant').length.toString(), color: 'bg-green-500' },
          { title: 'Pending Review', value: startups.filter(s => s.complianceStatus === 'pending').length.toString(), color: 'bg-yellow-500' },
          { title: 'Flagged', value: startups.filter(s => s.isFlagged).length.toString(), color: 'bg-red-500' }
        ].map((stat, index) => (
          <Card key={stat.title} className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Building2 className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-white">Search Startups</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  placeholder="Search by name or sector..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border-white/20 text-white pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-white">District</Label>
              <Select value={districtFilter} onValueChange={setDistrictFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {telanganaDistricts.map(district => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-white">Sector</Label>
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-white">Compliance Status</Label>
              <Select value={complianceFilter} onValueChange={setComplianceFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="compliant">Compliant</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Startups List */}
      <div className="space-y-4">
        {filteredStartups.map((startup, index) => (
          <motion.div
            key={startup.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`bg-white/10 backdrop-blur-lg border-white/20 ${startup.isFlagged ? 'ring-2 ring-red-500/50' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-xl text-white">{startup.name}</CardTitle>
                      {startup.isFlagged && (
                        <Badge className="bg-red-100 text-red-700">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          FLAGGED
                        </Badge>
                      )}
                      <Badge className={getComplianceStatusColor(startup.complianceStatus)}>
                        {startup.complianceStatus.toUpperCase()}
                      </Badge>
                      <Badge className={getRegistrationTypeColor(startup.registrationType)}>
                        {startup.registrationType}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center text-white/80">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{startup.district}</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Building2 className="w-4 h-4 mr-2" />
                        <span className="text-sm">{startup.sector}</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">Registered: {new Date(startup.registrationDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {startup.isFlagged && startup.flagReason && (
                      <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-3">
                        <p className="text-red-200 text-sm">
                          <AlertTriangle className="w-4 h-4 inline mr-2" />
                          {startup.flagReason}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/20 text-white"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    
                    <Button
                      onClick={() => handleFlagStartup(startup.id)}
                      variant="outline"
                      size="sm"
                      className={startup.isFlagged 
                        ? "bg-green-500/20 border-green-500/50 text-green-200"
                        : "bg-red-500/20 border-red-500/50 text-red-200"
                      }
                    >
                      <Flag className="w-4 h-4 mr-1" />
                      {startup.isFlagged ? 'Unflag' : 'Flag'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/70 text-sm">Employees</p>
                    <p className="text-lg font-bold text-white">{startup.employeeCount}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/70 text-sm">Funding Received</p>
                    <p className="text-lg font-bold text-green-400">{startup.fundingReceived}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/70 text-sm">Last Compliance</p>
                    <p className="text-lg font-bold text-blue-400">
                      {new Date(startup.lastComplianceDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/70 text-sm">Contact</p>
                    <p className="text-sm text-white/80">{startup.contactEmail}</p>
                    <p className="text-sm text-white/80">{startup.contactPhone}</p>
                  </div>
                </div>

                {startup.complianceStatus === 'pending' && (
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleComplianceAction(startup.id, 'approve')}
                      className="bg-green-600 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Compliance
                    </Button>
                    <Button
                      onClick={() => handleComplianceAction(startup.id, 'reject')}
                      className="bg-red-600 text-white"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Reject Compliance
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
