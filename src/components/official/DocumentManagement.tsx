
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FolderOpen } from 'lucide-react';
import { DocumentStatsCards } from './documents/DocumentStatsCards';
import { DocumentCategoriesGrid } from './documents/DocumentCategoriesGrid';
import { DocumentLibrary } from './documents/DocumentLibrary';
import { DocumentAccessLogs } from './documents/DocumentAccessLogs';

export const DocumentManagement = () => {
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
      
      <DocumentStatsCards />
      <DocumentCategoriesGrid />
      <DocumentLibrary />
      <DocumentAccessLogs />
    </div>
  );
};
