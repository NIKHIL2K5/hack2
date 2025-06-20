
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Users, Shield, Key } from 'lucide-react';

export const RoleManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Role-Based Access Management</h2>
        <p className="text-white/70">Manage internal roles and access permissions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Active Roles', value: '5', icon: Key, color: 'bg-blue-500' },
          { title: 'District Coordinators', value: '33', icon: Users, color: 'bg-green-500' },
          { title: 'Sector Experts', value: '12', icon: Shield, color: 'bg-purple-500' }
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
          <CardTitle className="text-white">Role Management System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70">Role-based access control system will be implemented here including creation of sub-roles like District Coordinator, Sector Expert, and Admin (state level) with restricted access and views per role.</p>
        </CardContent>
      </Card>
    </div>
  );
};
