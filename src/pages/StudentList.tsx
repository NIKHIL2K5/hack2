
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StudentList = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Student list and management functionality will be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentList;
