
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Users, Shield, Edit, Trash2, User, Search, UserPlus } from 'lucide-react';

export const RoleManagement = () => {
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newRoleName, setNewRoleName] = useState('');
  const [newRolePermissions, setNewRolePermissions] = useState<string[]>([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('');

  const roles = [
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access and management',
      permissions: ['user_management', 'role_management', 'system_settings', 'data_export'],
      userCount: 2,
      color: 'bg-red-500'
    },
    {
      id: 2,
      name: 'District Collector',
      description: 'District-level administration and oversight',
      permissions: ['startup_monitoring', 'scheme_management', 'district_analytics'],
      userCount: 33,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'Policy Officer',
      description: 'Policy creation and management',
      permissions: ['policy_planning', 'scheme_creation', 'document_management'],
      userCount: 12,
      color: 'bg-green-500'
    },
    {
      id: 4,
      name: 'IT Administrator',
      description: 'Technical system management',
      permissions: ['system_settings', 'user_verification', 'data_export'],
      userCount: 5,
      color: 'bg-purple-500'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@telangana.gov.in',
      role: 'Super Admin',
      district: 'Hyderabad',
      lastActive: '2024-01-20',
      status: 'active'
    },
    {
      id: 2,
      name: 'Ms. Priya Sharma',
      email: 'priya.sharma@warangal.gov.in',
      role: 'District Collector',
      district: 'Warangal',
      lastActive: '2024-01-19',
      status: 'active'
    },
    {
      id: 3,
      name: 'Mr. Venkat Reddy',
      email: 'venkat.reddy@telangana.gov.in',
      role: 'Policy Officer',
      district: 'Karimnagar',
      lastActive: '2024-01-18',
      status: 'active'
    },
    {
      id: 4,
      name: 'Ms. Lakshmi Devi',
      email: 'lakshmi.devi@nizamabad.gov.in',
      role: 'District Collector',
      district: 'Nizamabad',
      lastActive: '2024-01-15',
      status: 'inactive'
    }
  ];

  const permissions = [
    'user_management',
    'role_management',
    'startup_monitoring',
    'scheme_management',
    'policy_planning',
    'district_analytics',
    'document_management',
    'system_settings',
    'user_verification',
    'data_export'
  ];

  const handleCreateRole = () => {
    console.log('Creating new role:', { name: newRoleName, permissions: newRolePermissions });
    setIsCreateRoleOpen(false);
    setNewRoleName('');
    setNewRolePermissions([]);
  };

  const handleAddUser = () => {
    console.log('Adding new user:', { email: newUserEmail, role: newUserRole });
    setIsAddUserOpen(false);
    setNewUserEmail('');
    setNewUserRole('');
  };

  const handleEditRole = (roleId: number) => {
    console.log('Editing role:', roleId);
  };

  const handleDeleteRole = (roleId: number) => {
    console.log('Deleting role:', roleId);
  };

  const handleEditUser = (userId: number) => {
    console.log('Editing user:', userId);
  };

  const handleDeactivateUser = (userId: number) => {
    console.log('Deactivating user:', userId);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Role & User Management</h2>
          <p className="text-white/70">Manage system roles, permissions, and user access</p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => setIsAddUserOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
          <Button
            onClick={() => setIsCreateRoleOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Role
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Roles', value: '4', change: '+1', icon: Shield, color: 'bg-blue-500' },
          { title: 'Active Users', value: '52', change: '+5', icon: Users, color: 'bg-green-500' },
          { title: 'Pending Approvals', value: '3', change: '0', icon: User, color: 'bg-yellow-500' },
          { title: 'System Admins', value: '7', change: '+1', icon: Shield, color: 'bg-purple-500' }
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">System Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.id} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
                      <h4 className="text-white font-medium">{role.name}</h4>
                      <Badge className="bg-blue-100 text-blue-700 text-xs">
                        {role.userCount} users
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-white/10 border-white/20 text-white"
                        onClick={() => handleEditRole(role.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-red-500/20 border-red-500/30 text-red-300"
                        onClick={() => handleDeleteRole(role.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-3">{role.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission, index) => (
                      <Badge key={index} variant="outline" className="text-white/60 text-xs">
                        {permission.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">System Users</CardTitle>
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
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-medium text-sm">{user.name}</h4>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      <p className="text-white/70 text-xs">{user.email}</p>
                      <div className="flex items-center space-x-3 text-xs text-white/60 mt-1">
                        <span>Role: {user.role}</span>
                        <span>•</span>
                        <span>District: {user.district}</span>
                        <span>•</span>
                        <span>Last active: {user.lastActive}</span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-white/10 border-white/20 text-white"
                        onClick={() => handleEditUser(user.id)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-red-500/20 border-red-500/30 text-red-300"
                        onClick={() => handleDeactivateUser(user.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Role Modal */}
      <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-lg border-white/20">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Create New Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Role Name</label>
              <Input
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="Enter role name..."
                className="bg-white border-gray-300"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Permissions</label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {permissions.map((permission) => (
                  <label key={permission} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newRolePermissions.includes(permission)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewRolePermissions([...newRolePermissions, permission]);
                        } else {
                          setNewRolePermissions(newRolePermissions.filter(p => p !== permission));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">{permission.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRole} className="bg-blue-500 hover:bg-blue-600 text-white">
                Create Role
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add User Modal */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-lg border-white/20">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
              <Input
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="user@telangana.gov.in"
                className="bg-white border-gray-300"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Assign Role</label>
              <Select value={newUserRole} onValueChange={setNewUserRole}>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.name}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser} className="bg-green-500 hover:bg-green-600 text-white">
                Add User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
