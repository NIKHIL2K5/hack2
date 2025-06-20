
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, Download, Eye, Search, Filter, Calendar, User, Share, Edit, Lock, Upload } from 'lucide-react';

export const DocumentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const documents = [
    {
      id: 1,
      name: 'Women Entrepreneur Incentive Circular.pdf',
      category: 'Government Circulars',
      size: '980 KB',
      uploadedBy: 'Women Development Dept',
      uploadDate: '2024-01-15',
      downloads: 167,
      type: 'pdf',
      status: 'published',
      description: 'Guidelines for women entrepreneur incentive schemes and application procedures.',
      isConfidential: false
    },
    {
      id: 2,
      name: 'Startup Registration Form Template.xlsx',
      category: 'Forms & Templates',
      size: '245 KB',
      uploadedBy: 'Industries Department',
      uploadDate: '2024-01-14',
      downloads: 89,
      type: 'xlsx',
      status: 'published',
      description: 'Standard form template for startup registration in Telangana state.',
      isConfidential: false
    },
    {
      id: 3,
      name: 'T-Hub Annual Report 2023.pdf',
      category: 'Reports & Analytics',
      size: '5.2 MB',
      uploadedBy: 'T-Hub Administration',
      uploadDate: '2024-01-16',
      downloads: 234,
      type: 'pdf',
      status: 'published',
      description: 'Comprehensive annual report covering T-Hub activities and achievements.',
      isConfidential: false
    },
    {
      id: 4,
      name: 'Budget Allocation Guidelines.pdf',
      category: 'Policy Documents',
      size: '1.8 MB',
      uploadedBy: 'Finance Department',
      uploadDate: '2024-01-13',
      downloads: 45,
      type: 'pdf',
      status: 'confidential',
      description: 'Internal guidelines for budget allocation across various schemes.',
      isConfidential: true
    }
  ];

  const categories = [
    'all',
    'Government Circulars',
    'Policy Documents',
    'Scheme Guidelines',
    'Reports & Analytics',
    'Forms & Templates',
    'Legal Documents'
  ];

  const handleDownload = (documentId: number) => {
    const doc = documents.find(d => d.id === documentId);
    console.log('Downloading document:', doc?.name);
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = doc?.name || 'document';
    link.click();
  };

  const handlePreview = (document: any) => {
    setSelectedDocument(document);
    setIsPreviewOpen(true);
    console.log('Previewing document:', document.name);
  };

  const handleShare = (documentId: number) => {
    const doc = documents.find(d => d.id === documentId);
    console.log('Sharing document:', doc?.name);
    // Copy link to clipboard
    navigator.clipboard.writeText(`https://telangana.gov.in/documents/${documentId}`);
  };

  const handleEdit = (documentId: number) => {
    const doc = documents.find(d => d.id === documentId);
    console.log('Editing document metadata:', doc?.name);
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-700';
      case 'docx': return 'bg-blue-100 text-blue-700';
      case 'xlsx': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'confidential': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-white">Document Library</CardTitle>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 w-full sm:w-64"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-gray-800 text-white">
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0">
                  <div className="flex items-start space-x-4 flex-1">
                    <FileText className="w-8 h-8 text-white/70 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-white font-medium truncate">{document.name}</h4>
                        {document.isConfidential && (
                          <Lock className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-white/70 text-xs">
                          {document.category}
                        </Badge>
                        <Badge className={`${getFileTypeColor(document.type)} text-xs`}>
                          {document.type.toUpperCase()}
                        </Badge>
                        <Badge className={`${getStatusColor(document.status)} text-xs`}>
                          {document.status}
                        </Badge>
                        <span className="text-white/60 text-xs">{document.size}</span>
                      </div>
                      <p className="text-white/60 text-sm mb-2 line-clamp-2">{document.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
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
                  <div className="flex space-x-2 lg:ml-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handlePreview(document)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handleDownload(document.id)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handleShare(document.id)}
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handleEdit(document.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-white/95 backdrop-blur-lg border-white/20">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {selectedDocument?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-600">Category:</span>
                  <p className="text-gray-900">{selectedDocument.category}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Size:</span>
                  <p className="text-gray-900">{selectedDocument.size}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Uploaded by:</span>
                  <p className="text-gray-900">{selectedDocument.uploadedBy}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Date:</span>
                  <p className="text-gray-900">{selectedDocument.uploadDate}</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Description:</h4>
                <p className="text-gray-700">{selectedDocument.description}</p>
              </div>
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Document preview would be displayed here</p>
                  <Button 
                    onClick={() => handleDownload(selectedDocument.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Document
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
