
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Settings, Users, Shield, Key, Plus, Edit, Trash2, Search, Eye, UserCheck, UserX, Crown } from 'lucide-react';

export const RoleManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const roleHierarchy = [
    {
      role: 'State Admin',
      level: 1,
      permissions: ['Full System Access', 'User Management', 'Policy Creation', 'Data Export'],
      users: 3,
      color: 'bg-red-500'
    },
    {
      role: 'District Coordinator',
      level: 2,
      permissions: ['District Data Access', 'Local User Management', 'Report Generation'],
      users: 33,
      color: 'bg-blue-500'
    },
    {
      role: 'Sector Expert',
      level: 3,
      permissions: ['Sector-specific Analysis', 'Startup Evaluation', 'Policy Recommendations'],
      users: 12,
      color: 'bg-green-500'
    },
    {
      role: 'Data Analyst',
      level: 4,
      permissions: ['Data Analysis', 'Report Creation', 'Dashboard Access'],
      users: 8,
      color: 'bg-purple-500'
    },
    {
      role: 'Support Staff',
      level: 5,
      permissions: ['User Support', 'Document Management', 'Basic Operations'],
      users: 15,
      color: 'bg-orange-500'
    }
  ];

  const activeUsers = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@telangana.gov.in',
      role: 'State Admin',
      district: 'Hyderabad',
      lastActive: '2 hours ago',
      status: 'active',
      permissions: 15
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@warangal.gov.in',
      role: 'District Coordinator',
      district: 'Warangal',
      lastActive: '1 hour ago',
      status: 'active',
      permissions: 8
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      email: 'mohammed.ali@telangana.gov.in',
      role: 'Sector Expert',
      district: 'Hyderabad',
      lastActive: '3 hours ago',
      status: 'active',
      permissions: 6
    },
    {
      id: 4,
      name: 'Anitha Reddy',
      email: 'anitha.reddy@karimnagar.gov.in',
      role: 'District Coordinator',
      district: 'Karimnagar',
      lastActive: '5 hours ago',
      status: 'inactive',
      permissions: 8
    },
    {
      id: 5,
      name: 'Suresh Rao',
      email: 'suresh.rao@telangana.gov.in',
      role: 'Data Analyst',
      district: 'Nizamabad',
      lastActive: '1 day ago',
      status: 'active',
      permissions: 4
    }
  ];

  const permissionCategories = [
    {
      category: 'User Management',
      permissions: ['Create Users', 'Edit Users', 'Delete Users', 'Assign Roles', 'View User Profiles']
    },
    {
      category: 'Data Access',
      permissions: ['View All Data', 'Export Data', 'Import Data', 'Modify Data', 'Delete Data']
    },
    {
      category: 'System Administration',
      permissions: ['System Settings', 'Backup Management', 'Security Settings', 'Audit Logs', 'Integration Management']
    },
    {
      category: 'Content Management',
      permissions: ['Create Content', 'Edit Content', 'Publish Content', 'Delete Content', 'Moderate Content']
    },
    {
      category: 'Reporting',
      permissions: ['Generate Reports', 'Schedule Reports', 'Share Reports', 'Custom Analytics', 'Data Visualization']
    }
  ];

  const accessRequests = [
    {
      id: 1,
      requester: 'John Doe',
      currentRole: 'Support Staff',
      requestedRole: 'Data Analyst',
      reason: 'Promotion and additional responsibilities',
      requestDate: '2024-01-18',
      status: 'pending'
    },
    {
      id: 2,
      requester: 'Sarah Wilson',
      currentRole: 'Data Analyst',
      requestedRole: 'Sector Expert',
      reason: 'Specialization in agriculture sector',
      requestDate: '2024-01-17',
      status: 'pending'
    },
    {
      id: 3,
      requester: 'David Kumar',
      currentRole: 'District Coordinator',
      requestedRole: 'State Admin',
      reason: 'Temporary access for state-wide project',
      requestDate: '2024-01-16',
      status: 'approved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'inactive': return 'text-red-400';
      case 'pending': return 'text-yellow-400';
      case 'approved': return 'text-green-400';
      case 'denied': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Role-Based Access Management</h2>
          <p className="text-white/70">Manage internal roles, permissions, and user access across the platform</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Role
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Roles', value: '5', change: '+1', icon: Key, color: 'bg-blue-500' },
          { title: 'Active Users', value: '71', change: '+8', icon: Users, color: 'bg-green-500' },
          { title: 'Permission Groups', value: '25', change: '+3', icon: Shield, color: 'bg-purple-500' },
          { title: 'Access Requests', value: '12', change: '+4', icon: Settings, color: 'bg-orange-500' }
        ].map((stat) => (
          <Card key={stat.title} className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-white/80 text-sm">{stat.title}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      {stat.change}
                    </Badge>
                  </div>
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
          <CardTitle className="text-white">Role Hierarchy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roleHierarchy.map((role, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg ${role.color} flex items-center justify-center`}>
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-white font-medium text-lg">{role.role}</h4>
                        <Badge variant="outline" className="text-white/70">
                          Level {role.level}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-700 text-xs">
                          {role.users} users
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission, permIndex) => (
                          <Badge key={permIndex} variant="outline" className="text-white/60 text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Active Users</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeUsers.map((user) => (
                <div key={user.id} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-medium text-sm">{user.name}</h4>
                        <Badge variant="outline" className="text-white/70 text-xs">
                          {user.role}
                        </Badge>
                        <span className={`text-xs ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                      <p className="text-white/70 text-xs mb-1">{user.email}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="text-white/60">District: {user.district}</span>
                        <span className="text-white/60">Permissions: {user.permissions}</span>
                        <span className="text-white/60">Last active: {user.lastActive}</span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white p-1">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white p-1">
                        <UserX className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Access Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {accessRequests.map((request) => (
                <div key={request.id} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-medium text-sm">{request.requester}</h4>
                        <span className={`text-xs ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                      <div className="text-xs text-white/70 mb-2">
                        <span>{request.currentRole}</span>
                        <span className="mx-2">→</span>
                        <span className="text-white">{request.requestedRole}</span>
                      </div>
                      <p className="text-white/60 text-xs mb-1">{request.reason}</p>
                      <span className="text-white/50 text-xs">{request.requestDate}</span>
                    </div>
                    {request.status === 'pending' && (
                      <div className="flex space-x-1 ml-2">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white p-1">
                          <UserCheck className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="destructive" className="bg-red-500 hover:bg-red-600 p-1">
                          <UserX className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Permission Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {permissionCategories.map((category, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-white font-medium mb-3">{category.category}</h4>
                <div className="grid grid-cols-5 gap-2">
                  {category.permissions.map((permission, permIndex) => (
                    <div key={permIndex} className="p-2 bg-white/5 rounded text-center">
                      <p className="text-white/80 text-xs">{permission}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
