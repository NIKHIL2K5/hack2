
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, Search, Filter, Eye, Download, Share2, Edit, Lock, Unlock } from 'lucide-react';

export const DocumentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
  );
};
