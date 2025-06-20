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
    // Comprehensive startup data with at least one company from each district
    const comprehensiveStartups: Startup[] = [
      // Hyderabad - Tech Hub
      { id: '1', name: 'TechVenture Solutions', district: 'Hyderabad', sector: 'Technology', registrationType: 'DPIIT', registrationDate: '2023-03-15', complianceStatus: 'compliant', lastComplianceDate: '2024-01-15', employeeCount: 25, fundingReceived: '₹2.5 Crore', contactEmail: 'info@techventure.com', contactPhone: '+91 9876543210', isFlagged: false },
      { id: '2', name: 'HealthTech Innovations', district: 'Hyderabad', sector: 'Healthcare', registrationType: 'Multiple', registrationDate: '2023-05-20', complianceStatus: 'compliant', lastComplianceDate: '2024-01-10', employeeCount: 18, fundingReceived: '₹1.8 Crore', contactEmail: 'contact@healthtech.in', contactPhone: '+91 9876543211', isFlagged: false },
      { id: '3', name: 'FinPay Solutions', district: 'Hyderabad', sector: 'Fintech', registrationType: 'DPIIT', registrationDate: '2023-08-12', complianceStatus: 'pending', lastComplianceDate: '2023-11-12', employeeCount: 30, fundingReceived: '₹3.2 Crore', contactEmail: 'hello@finpay.co', contactPhone: '+91 9876543212', isFlagged: false },
      
      // Warangal
      { id: '4', name: 'GreenTech Innovations', district: 'Warangal Urban', sector: 'Renewable Energy', registrationType: 'Multiple', registrationDate: '2023-07-22', complianceStatus: 'compliant', lastComplianceDate: '2023-12-22', employeeCount: 12, fundingReceived: '₹1.2 Crore', contactEmail: 'contact@greentech.in', contactPhone: '+91 9876543213', isFlagged: false },
      { id: '5', name: 'AgriBot Systems', district: 'Warangal Rural', sector: 'Agriculture', registrationType: 'MSME', registrationDate: '2023-09-05', complianceStatus: 'compliant', lastComplianceDate: '2024-01-05', employeeCount: 8, fundingReceived: '₹80 Lakh', contactEmail: 'info@agribot.co', contactPhone: '+91 9876543214', isFlagged: false },
      
      // Rangareddy
      { id: '6', name: 'EduLearn Platform', district: 'Rangareddy', sector: 'Education', registrationType: 'DPIIT', registrationDate: '2023-04-18', complianceStatus: 'compliant', lastComplianceDate: '2024-01-18', employeeCount: 22, fundingReceived: '₹1.5 Crore', contactEmail: 'team@edulearn.in', contactPhone: '+91 9876543215', isFlagged: false },
      { id: '7', name: 'Suspicious Corp', district: 'Rangareddy', sector: 'Fintech', registrationType: 'GST', registrationDate: '2024-01-01', complianceStatus: 'overdue', lastComplianceDate: '2024-01-01', employeeCount: 5, fundingReceived: '₹50 Lakh', contactEmail: 'fake@suspicious.com', contactPhone: '+91 0000000000', isFlagged: true, flagReason: 'AI Detection: Unusual registration pattern and missing compliance documents' },
      
      // Karimnagar
      { id: '8', name: 'Smart Manufacturing Co', district: 'Karimnagar', sector: 'Manufacturing', registrationType: 'MSME', registrationDate: '2023-06-10', complianceStatus: 'compliant', lastComplianceDate: '2024-01-08', employeeCount: 45, fundingReceived: '₹4.2 Crore', contactEmail: 'contact@smartmfg.in', contactPhone: '+91 9876543216', isFlagged: false },
      
      // Nizamabad
      { id: '9', name: 'BioTech Solutions', district: 'Nizamabad', sector: 'Biotechnology', registrationType: 'DPIIT', registrationDate: '2023-02-28', complianceStatus: 'compliant', lastComplianceDate: '2024-01-12', employeeCount: 15, fundingReceived: '₹1.8 Crore', contactEmail: 'info@biotech.co.in', contactPhone: '+91 9876543217', isFlagged: false },
      
      // Khammam
      { id: '10', name: 'Food Processing Hub', district: 'Khammam', sector: 'Food Processing', registrationType: 'Multiple', registrationDate: '2023-10-15', complianceStatus: 'pending', lastComplianceDate: '2023-12-15', employeeCount: 20, fundingReceived: '₹2.1 Crore', contactEmail: 'hello@foodhub.in', contactPhone: '+91 9876543218', isFlagged: false },
      
      // Nalgonda
      { id: '11', name: 'E-Commerce Express', district: 'Nalgonda', sector: 'E-commerce', registrationType: 'GST', registrationDate: '2023-11-08', complianceStatus: 'compliant', lastComplianceDate: '2024-01-20', employeeCount: 35, fundingReceived: '₹2.8 Crore', contactEmail: 'support@ecomexpress.in', contactPhone: '+91 9876543219', isFlagged: false },
      
      // Medak
      { id: '12', name: 'Rural Tech Solutions', district: 'Medak', sector: 'Technology', registrationType: 'MSME', registrationDate: '2023-08-25', complianceStatus: 'compliant', lastComplianceDate: '2024-01-14', employeeCount: 12, fundingReceived: '₹95 Lakh', contactEmail: 'info@ruraltech.co', contactPhone: '+91 9876543220', isFlagged: false },
      
      // Adilabad
      { id: '13', name: 'Tribal Crafts Digital', district: 'Adilabad', sector: 'E-commerce', registrationType: 'DPIIT', registrationDate: '2023-09-12', complianceStatus: 'pending', lastComplianceDate: '2023-12-12', employeeCount: 8, fundingReceived: '₹65 Lakh', contactEmail: 'contact@tribalcrafts.in', contactPhone: '+91 9876543221', isFlagged: false },
      
      // Siddipet
      { id: '14', name: 'Agri-Solar Systems', district: 'Siddipet', sector: 'Renewable Energy', registrationType: 'Multiple', registrationDate: '2023-07-03', complianceStatus: 'compliant', lastComplianceDate: '2024-01-03', employeeCount: 18, fundingReceived: '₹1.6 Crore', contactEmail: 'info@agrisolar.in', contactPhone: '+91 9876543222', isFlagged: false },
      
      // Mahabubnagar
      { id: '15', name: 'Health Connect Rural', district: 'Mahabubnagar', sector: 'Healthcare', registrationType: 'MSME', registrationDate: '2023-05-14', complianceStatus: 'compliant', lastComplianceDate: '2024-01-16', employeeCount: 25, fundingReceived: '₹1.4 Crore', contactEmail: 'team@healthconnect.in', contactPhone: '+91 9876543223', isFlagged: false },
      
      // Adding companies for remaining districts
      { id: '16', name: 'Textile Tech Hub', district: 'Warangal Urban', sector: 'Manufacturing', registrationType: 'DPIIT', registrationDate: '2023-06-20', complianceStatus: 'compliant', lastComplianceDate: '2024-01-11', employeeCount: 28, fundingReceived: '₹2.2 Crore', contactEmail: 'info@textiletech.in', contactPhone: '+91 9876543224', isFlagged: false },
      { id: '17', name: 'Digital Learning Labs', district: 'Sangareddy', sector: 'Education', registrationType: 'Multiple', registrationDate: '2023-08-30', complianceStatus: 'pending', lastComplianceDate: '2023-11-30', employeeCount: 16, fundingReceived: '₹1.1 Crore', contactEmail: 'hello@digitallearn.co', contactPhone: '+91 9876543225', isFlagged: false },
      { id: '18', name: 'Pharma Innovation Ltd', district: 'Medchal-Malkajgiri', sector: 'Biotechnology', registrationType: 'DPIIT', registrationDate: '2023-04-25', complianceStatus: 'compliant', lastComplianceDate: '2024-01-18', employeeCount: 32, fundingReceived: '₹3.5 Crore', contactEmail: 'contact@pharmainnovation.in', contactPhone: '+91 9876543226', isFlagged: false },
      { id: '19', name: 'Forest Products Tech', district: 'Bhadradri Kothagudem', sector: 'Manufacturing', registrationType: 'MSME', registrationDate: '2023-09-18', complianceStatus: 'compliant', lastComplianceDate: '2024-01-09', employeeCount: 14, fundingReceived: '₹1.3 Crore', contactEmail: 'info@foresttech.co.in', contactPhone: '+91 9876543227', isFlagged: false },
      { id: '20', name: 'Smart Agriculture Co', district: 'Suryapet', sector: 'Agriculture', registrationType: 'Multiple', registrationDate: '2023-10-05', complianceStatus: 'pending', lastComplianceDate: '2023-12-05', employeeCount: 11, fundingReceived: '₹88 Lakh', contactEmail: 'team@smartagri.in', contactPhone: '+91 9876543228', isFlagged: false }
    ];
    
    setStartups(comprehensiveStartups);
    setFilteredStartups(comprehensiveStartups);
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

      {/* Summary Cards - Fixed UI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            title: 'Active Schemes', 
            value: '24', 
            change: '+3',
            icon: Building2, 
            color: 'bg-blue-500',
            changeColor: 'bg-green-100 text-green-700'
          },
          { 
            title: 'Registered Startups', 
            value: '1,847', 
            change: '+156',
            icon: Building2, 
            color: 'bg-green-500',
            changeColor: 'bg-green-100 text-green-700'
          },
          { 
            title: 'Job Posts Pending', 
            value: '43', 
            change: '-12',
            icon: AlertTriangle, 
            color: 'bg-yellow-500',
            changeColor: 'bg-green-100 text-green-700'
          },
          { 
            title: 'Districts Covered', 
            value: '33', 
            change: '+0',
            icon: MapPin, 
            color: 'bg-purple-500',
            changeColor: 'bg-gray-100 text-gray-700'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-sm font-medium mb-1">{stat.title}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      <Badge className={`${stat.changeColor} text-xs`}>
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center flex-shrink-0`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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
                  className="bg-white/10 border-white/20 text-white pl-10 placeholder:text-white/50"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-white">District</Label>
              <Select value={districtFilter} onValueChange={setDistrictFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
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
                <SelectContent className="bg-white z-50">
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
                <SelectContent className="bg-white z-50">
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
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    
                    <Button
                      onClick={() => handleFlagStartup(startup.id)}
                      variant="outline"
                      size="sm"
                      className={startup.isFlagged 
                        ? "bg-green-500/20 border-green-500/50 text-green-200 hover:bg-green-500/30"
                        : "bg-red-500/20 border-red-500/50 text-red-200 hover:bg-red-500/30"
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
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Compliance
                    </Button>
                    <Button
                      onClick={() => handleComplianceAction(startup.id, 'reject')}
                      className="bg-red-600 text-white hover:bg-red-700"
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
