
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, CheckCircle, AlertTriangle } from 'lucide-react';

export const UserVerificationPanel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">User Verification & Moderation</h2>
        <p className="text-white/70">Verify documents and moderate user accounts</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Pending Verification', value: '23', icon: AlertTriangle, color: 'bg-yellow-500' },
          { title: 'Verified Users', value: '1,891', icon: CheckCircle, color: 'bg-green-500' },
          { title: 'Total Users', value: '2,156', icon: Users, color: 'bg-blue-500' }
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
          <CardTitle className="text-white">User Verification Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70">User verification and moderation tools will be implemented here including document verification, account management, and user role assignment.</p>
        </CardContent>
      </Card>
    </div>
  );
};
