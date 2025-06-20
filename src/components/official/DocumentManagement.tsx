
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, Download, FolderOpen } from 'lucide-react';

export const DocumentManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Document & Resource Management</h2>
        <p className="text-white/70">Manage government documents, circulars, and resources</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Total Documents', value: '156', icon: FileText, color: 'bg-blue-500' },
          { title: 'Recent Uploads', value: '8', icon: Upload, color: 'bg-green-500' },
          { title: 'Download Count', value: '2,341', icon: Download, color: 'bg-purple-500' }
        ].map((stat) => (
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
      
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Document Management System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70">Document management system will be implemented here including upload/download functionality for government circulars, PDFs, notices, and resource access control for different user roles.</p>
        </CardContent>
      </Card>
    </div>
  );
};
