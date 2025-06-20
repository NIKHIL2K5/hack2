
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FolderOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DocumentStatsCards } from './documents/DocumentStatsCards';
import { DocumentCategoriesGrid } from './documents/DocumentCategoriesGrid';
import { DocumentLibrary } from './documents/DocumentLibrary';
import { DocumentAccessLogs } from './documents/DocumentAccessLogs';
import { toast } from '@/hooks/use-toast';

export const DocumentManagement = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUploadDocument = () => {
    console.log('Opening upload document modal');
    setIsUploadModalOpen(true);
  };

  const handleCreateFolder = () => {
    console.log('Opening create folder modal');
    setIsFolderModalOpen(true);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    console.log('Uploading file:', selectedFile.name);
    toast({
      title: "Document Uploaded",
      description: `Successfully uploaded "${selectedFile.name}"`,
    });
    
    setSelectedFile(null);
    setIsUploadModalOpen(false);
  };

  const handleFolderCreate = () => {
    if (!folderName.trim()) {
      toast({
        title: "Folder Name Required",
        description: "Please enter a folder name",
        variant: "destructive",
      });
      return;
    }

    console.log('Creating folder:', folderName);
    toast({
      title: "Folder Created",
      description: `Successfully created folder "${folderName}"`,
    });
    
    setFolderName('');
    setIsFolderModalOpen(false);
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
            onClick={handleUploadDocument}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={handleCreateFolder}
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            Create Folder
          </Button>
        </div>
      </div>
      
      <DocumentStatsCards />
      <DocumentCategoriesGrid />
      <DocumentLibrary />
      <DocumentAccessLogs />

      {/* Upload Document Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-lg border-white/20">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div>
              <Label htmlFor="file-upload" className="text-gray-700">Select File</Label>
              <Input
                id="file-upload"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="mt-2"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              />
            </div>
            {selectedFile && (
              <div className="text-sm text-gray-600">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </div>
            )}
            <div className="flex space-x-2">
              <Button onClick={handleFileUpload} className="flex-1">
                Upload
              </Button>
              <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Folder Modal */}
      <Dialog open={isFolderModalOpen} onOpenChange={setIsFolderModalOpen}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-lg border-white/20">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Create New Folder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div>
              <Label htmlFor="folder-name" className="text-gray-700">Folder Name</Label>
              <Input
                id="folder-name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Enter folder name..."
                className="mt-2"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleFolderCreate} className="flex-1">
                Create Folder
              </Button>
              <Button variant="outline" onClick={() => setIsFolderModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
