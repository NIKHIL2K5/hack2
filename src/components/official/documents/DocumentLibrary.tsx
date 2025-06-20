
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Search, Filter, Calendar, User } from 'lucide-react';

export const DocumentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents = [
    {
      id: 1,
      name: 'T-Hub Startup Policy 2024.pdf',
      category: 'Policy Documents',
      size: '2.4 MB',
      uploadedBy: 'Admin Officer',
      uploadDate: '2024-01-18',
      downloads: 234,
      type: 'pdf'
    },
    {
      id: 2,
      name: 'Scheme Guidelines.docx',
      category: 'Scheme Guidelines',
      size: '1.8 MB',
      uploadedBy: 'Policy Team',
      uploadDate: '2024-01-17',
      downloads: 156,
      type: 'docx'
    },
    {
      id: 3,
      name: 'IT Sector Report.pdf',
      category: 'Reports & Analytics',
      size: '5.2 MB',
      uploadedBy: 'Research Team',
      uploadDate: '2024-01-16',
      downloads: 89,
      type: 'pdf'
    },
    {
      id: 4,
      name: 'Application Form Template.pdf',
      category: 'Forms & Templates',
      size: '0.8 MB',
      uploadedBy: 'Admin Officer',
      uploadDate: '2024-01-15',
      downloads: 567,
      type: 'pdf'
    }
  ];

  const handleDownload = (documentId: number) => {
    console.log('Downloading document:', documentId);
    // Implementation for document download
  };

  const handlePreview = (documentId: number) => {
    console.log('Previewing document:', documentId);
    // Implementation for document preview
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-700';
      case 'docx': return 'bg-blue-100 text-blue-700';
      case 'xlsx': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          {filteredDocuments.map((document) => (
            <div key={document.id} className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <FileText className="w-8 h-8 text-white/70" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{document.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <Badge variant="outline" className="text-white/70 text-xs">
                        {document.category}
                      </Badge>
                      <Badge className={`${getFileTypeColor(document.type)} text-xs`}>
                        {document.type.toUpperCase()}
                      </Badge>
                      <span className="text-white/60 text-xs">{document.size}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-white/60">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{document.uploadedBy}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{document.uploadDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>{document.downloads} downloads</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white/10 border-white/20 text-white"
                    onClick={() => handlePreview(document.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white/10 border-white/20 text-white"
                    onClick={() => handleDownload(document.id)}
                  >
                    <Download className="w-4 h-4" />
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
