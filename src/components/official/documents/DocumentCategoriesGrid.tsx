
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FolderOpen, Upload, Download, Lock, Edit } from 'lucide-react';

export const DocumentCategoriesGrid = () => {
  const documentCategories = [
    { name: 'Government Circulars', count: 45, icon: FileText },
    { name: 'Policy Documents', count: 23, icon: FolderOpen },
    { name: 'Scheme Guidelines', count: 38, icon: Upload },
    { name: 'Reports & Analytics', count: 67, icon: Download },
    { name: 'Legal Documents', count: 12, icon: Lock },
    { name: 'Forms & Templates', count: 29, icon: Edit }
  ];

  return (
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
  );
};
