
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Download, Calendar, MapPin, Users, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SchemeFormModal } from './SchemeFormModal';
import { toast } from 'sonner';

interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  tags: string[];
  districts: string[];
  startDate: string;
  endDate: string;
  budget: string;
  applicationsReceived: number;
  applicationsApproved: number;
  status: 'active' | 'inactive' | 'expired';
}

export const SchemeManagementPanel = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const telanganaDistricts = [
    'Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon',
    'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar',
    'Khammam', 'Kumuram Bheem', 'Mahabubabad', 'Mahabubnagar', 'Mancherial',
    'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda',
    'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla',
    'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad',
    'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri'
  ];

  useEffect(() => {
    // Load schemes from localStorage
    const savedSchemes = localStorage.getItem('government_schemes');
    if (savedSchemes) {
      const parsedSchemes = JSON.parse(savedSchemes);
      setSchemes(parsedSchemes);
      setFilteredSchemes(parsedSchemes);
    } else {
      // Initialize with sample data
      const sampleSchemes: Scheme[] = [
        {
          id: '1',
          name: 'T-Hub Startup Acceleration Program',
          description: 'Comprehensive support for early-stage startups including mentorship, funding, and market access.',
          eligibility: 'Startups incorporated in Telangana with innovative technology solutions',
          tags: ['Technology', 'Innovation', 'Funding'],
          districts: ['Hyderabad', 'Rangareddy', 'Medchal-Malkajgiri'],
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          budget: '₹10 Crore',
          applicationsReceived: 245,
          applicationsApproved: 87,
          status: 'active'
        },
        {
          id: '2',
          name: 'Rural Entrepreneurship Development Scheme',
          description: 'Supporting rural entrepreneurs with skill development and financial assistance.',
          eligibility: 'Rural youth aged 18-35 with business ideas in agriculture or allied sectors',
          tags: ['Rural', 'Agriculture', 'Youth'],
          districts: ['Warangal Rural', 'Karimnagar', 'Nizamabad', 'Nalgonda'],
          startDate: '2024-02-01',
          endDate: '2025-01-31',
          budget: '₹15 Crore',
          applicationsReceived: 189,
          applicationsApproved: 124,
          status: 'active'
        }
      ];
      setSchemes(sampleSchemes);
      setFilteredSchemes(sampleSchemes);
      localStorage.setItem('government_schemes', JSON.stringify(sampleSchemes));
    }
  }, []);

  useEffect(() => {
    // Filter schemes based on search and status
    let filtered = schemes;
    
    if (searchTerm) {
      filtered = filtered.filter(scheme => 
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(scheme => scheme.status === statusFilter);
    }
    
    setFilteredSchemes(filtered);
  }, [schemes, searchTerm, statusFilter]);

  const handleSaveScheme = (schemeData: Omit<Scheme, 'id' | 'applicationsReceived' | 'applicationsApproved'>) => {
    if (editingScheme) {
      // Update existing scheme
      const updatedSchemes = schemes.map(scheme => 
        scheme.id === editingScheme.id 
          ? { 
              ...scheme, 
              ...schemeData,
              applicationsReceived: scheme.applicationsReceived,
              applicationsApproved: scheme.applicationsApproved
            }
          : scheme
      );
      setSchemes(updatedSchemes);
      localStorage.setItem('government_schemes', JSON.stringify(updatedSchemes));
      toast.success('Scheme updated successfully!');
    } else {
      // Create new scheme
      const newScheme: Scheme = {
        ...schemeData,
        id: Date.now().toString(),
        applicationsReceived: 0,
        applicationsApproved: 0
      };
      const updatedSchemes = [...schemes, newScheme];
      setSchemes(updatedSchemes);
      localStorage.setItem('government_schemes', JSON.stringify(updatedSchemes));
      toast.success('Scheme created successfully!');
    }
    
    setIsModalOpen(false);
    setEditingScheme(null);
  };

  const handleDeleteScheme = (schemeId: string) => {
    const updatedSchemes = schemes.filter(scheme => scheme.id !== schemeId);
    setSchemes(updatedSchemes);
    localStorage.setItem('government_schemes', JSON.stringify(updatedSchemes));
    toast.success('Scheme deleted successfully!');
  };

  const handleEditScheme = (scheme: Scheme) => {
    setEditingScheme(scheme);
    setIsModalOpen(true);
  };

  const downloadReport = () => {
    const report = schemes.map(scheme => ({
      Name: scheme.name,
      Status: scheme.status,
      Budget: scheme.budget,
      'Applications Received': scheme.applicationsReceived,
      'Applications Approved': scheme.applicationsApproved,
      'Success Rate': `${((scheme.applicationsApproved / scheme.applicationsReceived) * 100).toFixed(1)}%`,
      Districts: scheme.districts.join(', '),
      'Start Date': scheme.startDate,
      'End Date': scheme.endDate
    }));
    
    const csvContent = [
      Object.keys(report[0]).join(','),
      ...report.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scheme_performance_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Report downloaded successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'expired': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Scheme Management</h2>
          <p className="text-white/70">Manage government schemes and track performance</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={downloadReport} className="bg-green-600 text-white">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add New Scheme
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-white">Search Schemes</Label>
              <Input
                placeholder="Search by name or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Status Filter</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schemes List */}
      <div className="grid gap-6">
        {filteredSchemes.map((scheme, index) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-xl text-white">{scheme.name}</CardTitle>
                      <Badge className={getStatusColor(scheme.status)}>
                        {scheme.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-white/70 mb-3">{scheme.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-white/80">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {new Date(scheme.startDate).toLocaleDateString()} - {new Date(scheme.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{scheme.districts.length} districts</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">{scheme.budget}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {scheme.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="border-blue-300 text-blue-200 bg-blue-500/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button
                      onClick={() => handleEditScheme(scheme)}
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/20 text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteScheme(scheme.id)}
                      variant="outline"
                      size="sm"
                      className="bg-red-500/20 border-red-500/50 text-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/70 text-sm">Applications Received</p>
                    <p className="text-2xl font-bold text-white">{scheme.applicationsReceived}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/70 text-sm">Applications Approved</p>
                    <p className="text-2xl font-bold text-green-400">{scheme.applicationsApproved}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/70 text-sm">Success Rate</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {scheme.applicationsReceived > 0 
                        ? `${((scheme.applicationsApproved / scheme.applicationsReceived) * 100).toFixed(1)}%`
                        : '0%'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Scheme Form Modal */}
      <SchemeFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingScheme(null);
        }}
        onSave={handleSaveScheme}
        scheme={editingScheme}
        districts={telanganaDistricts}
      />
    </div>
  );
};
