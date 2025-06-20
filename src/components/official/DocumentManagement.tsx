
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, Upload, Download, FolderOpen, Search, Filter, Eye, Edit, Trash2, Share2, Lock, Unlock, Calendar, User } from 'lucide-react';

export const DocumentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documentCategories = [
    { name: 'Government Circulars', count: 45, icon: FileText },
    { name: 'Policy Documents', count: 23, icon: FolderOpen },
    { name: 'Scheme Guidelines', count: 38, icon: Upload },
    { name: 'Reports & Analytics', count: 67, icon: Download },
    { name: 'Legal Documents', count: 12, icon: Lock },
    { name: 'Forms & Templates', count: 29, icon: Edit }
  ];

  const recentDocuments = [
    {
      id: 1,
      name: 'T-Hub Startup Policy 2024.pdf',
      category: 'Policy Documents',
      size: '2.4 MB',
      uploadedBy: 'Chief Minister Office',
      uploadedDate: '2024-01-18',
      downloads: 256,
      status: 'published',
      access: 'public'
    },
    {
      id: 2,
      name: 'Rural Development Scheme Guidelines.docx',
      category: 'Scheme Guidelines',
      size: '1.8 MB',
      uploadedBy: 'Rural Development Dept',
      uploadedDate: '2024-01-17',
      downloads: 189,
      status: 'draft',
      access: 'restricted'
    },
    {
      id: 3,
      name: 'IT Sector Growth Report Q4-2023.pdf',
      category: 'Reports & Analytics',
      size: '5.2 MB',
      uploadedBy: 'IT Department',
      uploadedDate: '2024-01-16',
      downloads: 342,
      status: 'published',
      access: 'public'
    },
    {
      id: 4,
      name: 'Women Entrepreneur Incentive Circular.pdf',
      category: 'Government Circulars',
      size: '980 KB',
      uploadedBy: 'Women Development Dept',
      uploadedDate: '2024-01-15',
      downloads: 167,
      status: 'published',
      access: 'public'
    },
    {
      id: 5,
      name: 'Startup Registration Form Template.xlsx',
      category: 'Forms & Templates',
      size: '245 KB',
      uploadedBy: 'Industries Department',
      uploadedDate: '2024-01-14',
      downloads: 89,
      status: 'published',
      access: 'public'
    }
  ];

  const accessLogs = [
    { user: 'District Collector - Hyderabad', document: 'T-Hub Startup Policy 2024.pdf', action: 'Downloaded', time: '2 hours ago' },
    { user: 'Startup - TechVenture Solutions', document: 'Scheme Guidelines.docx', action: 'Viewed', time: '4 hours ago' },
    { user: 'Student - JNTU Hyderabad', document: 'IT Sector Report.pdf', action: 'Downloaded', time: '6 hours ago' },
    { user: 'Official - IT Department', document: 'Policy Document.pdf', action: 'Edited', time: '1 day ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getAccessIcon = (access: string) => {
    return access === 'public' ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Document & Resource Management</h2>
          <p className="text-white/70">Centralized repository for government documents, policies, and resources</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            Create Folder
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Documents', value: '214', change: '+18', icon: FileText, color: 'bg-blue-500' },
          { title: 'Recent Uploads', value: '12', change: '+4', icon: Upload, color: 'bg-green-500' },
          { title: 'Total Downloads', value: '3,847', change: '+234', icon: Download, color: 'bg-purple-500' },
          { title: 'Active Users', value: '89', change: '+12', icon: User, color: 'bg-orange-500' }
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
          <CardTitle className="text-white">Document Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {documentCategories.map((category, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg text-center hover:bg-white/10 transition-colors cursor-pointer">
                <category.icon className="w-8 h-8 text-white/70 mx-auto mb-2" />
                <h4 className="text-white font-medium text-sm mb-1">{category.name}</h4>
                <p className="text-white/60 text-xs">{category.count} documents</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Document Library</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <Input
                  placeholder="Search documents..."
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
          <div className="space-y-3">
            {recentDocuments.map((doc) => (
              <div key={doc.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <FileText className="w-5 h-5 text-white/60" />
                      <h4 className="text-white font-medium">{doc.name}</h4>
                      <Badge className={`${getStatusColor(doc.status)} text-white text-xs`}>
                        {doc.status}
                      </Badge>
                      <div className="text-white/60">
                        {getAccessIcon(doc.access)}
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Category: </span>
                        <span className="text-white/80">{doc.category}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Size: </span>
                        <span className="text-white/80">{doc.size}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Uploaded by: </span>
                        <span className="text-white/80">{doc.uploadedBy}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Date: </span>
                        <span className="text-white/80">{doc.uploadedDate}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Downloads: </span>
                        <span className="text-white/80">{doc.downloads}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Recent Access Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {accessLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="text-white font-medium text-sm">{log.user}</p>
                    <p className="text-white/70 text-xs">{log.action} "{log.document}"</p>
                  </div>
                </div>
                <span className="text-white/60 text-xs">{log.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
