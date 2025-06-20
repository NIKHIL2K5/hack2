import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Users, Shield, Edit, Trash2, User, Search, UserPlus, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const RoleManagement = () => {
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newRoleName, setNewRoleName] = useState('');
  const [newRolePermissions, setNewRolePermissions] = useState<string[]>([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [editingRole, setEditingRole] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [deletingUser, setDeletingUser] = useState<any>(null);

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
    if (!newRoleName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a role name",
        variant: "destructive"
      });
      return;
    }

    if (newRolePermissions.length === 0) {
      toast({
        title: "Error", 
        description: "Please select at least one permission",
        variant: "destructive"
      });
      return;
    }

    console.log('Creating new role:', { name: newRoleName, permissions: newRolePermissions });
    toast({
      title: "Role Created",
      description: `Role "${newRoleName}" has been created successfully`
    });
    setIsCreateRoleOpen(false);
    setNewRoleName('');
    setNewRolePermissions([]);
  };

  const handleAddUser = () => {
    if (!newUserEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    if (!newUserRole) {
      toast({
        title: "Error",
        description: "Please select a role",
        variant: "destructive"
      });
      return;
    }

    console.log('Adding new user:', { email: newUserEmail, role: newUserRole });
    toast({
      title: "User Added",
      description: `User invitation sent to ${newUserEmail}`
    });
    setIsAddUserOpen(false);
    setNewUserEmail('');
    setNewUserRole('');
  };

  const handleEditRole = (role: any) => {
    console.log('Editing role:', role);
    setEditingRole(role);
    setNewRoleName(role.name);
    setNewRolePermissions([...role.permissions]);
    setIsEditRoleOpen(true);
  };

  const handleUpdateRole = () => {
    if (!newRoleName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a role name",
        variant: "destructive"
      });
      return;
    }

    console.log('Updating role:', editingRole.id, { name: newRoleName, permissions: newRolePermissions });
    toast({
      title: "Role Updated",
      description: `Role "${newRoleName}" has been updated successfully`
    });
    setIsEditRoleOpen(false);
    setEditingRole(null);
    setNewRoleName('');
    setNewRolePermissions([]);
  };

  const handleDeleteRole = (role: any) => {
    if (role.userCount > 0) {
      toast({
        title: "Cannot Delete Role",
        description: `Cannot delete role "${role.name}" as it has ${role.userCount} assigned users`,
        variant: "destructive"
      });
      return;
    }

    console.log('Deleting role:', role);
    toast({
      title: "Role Deleted",
      description: `Role "${role.name}" has been deleted successfully`
    });
  };

  const handleEditUser = (user: any) => {
    console.log('Editing user:', user);
    setEditingUser(user);
    setNewUserEmail(user.email);
    setNewUserRole(user.role);
    setIsEditUserOpen(true);
  };

  const handleUpdateUser = () => {
    if (!newUserEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    console.log('Updating user:', editingUser.id, { email: newUserEmail, role: newUserRole });
    toast({
      title: "User Updated",
      description: `User "${editingUser.name}" has been updated successfully`
    });
    setIsEditUserOpen(false);
    setEditingUser(null);
    setNewUserEmail('');
    setNewUserRole('');
  };

  const handleDeleteUser = (user: any) => {
    console.log('Initiating delete for user:', user);
    setDeletingUser(user);
    setIsDeleteUserOpen(true);
  };

  const confirmDeleteUser = () => {
    if (deletingUser) {
      console.log('Confirming delete for user:', deletingUser);
      toast({
        title: "User Deleted",
        description: `User "${deletingUser.name}" has been removed from the system`,
      });
      setIsDeleteUserOpen(false);
      setDeletingUser(null);
    }
  };

  const handleDeactivateUser = (user: any) => {
    console.log('Deactivating user:', user);
    toast({
      title: "User Deactivated",
      description: `User "${user.name}" has been deactivated`
    });
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
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        onClick={() => handleEditRole(role)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
                        onClick={() => handleDeleteRole(role)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-3">{role.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission, index) => (
                      <Badge key={index} variant="outline" className="text-white/60 text-xs border-white/20">
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
                <div key={user.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium text-sm truncate">{user.name}</h4>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="pl-11 space-y-1">
                        <p className="text-white/70 text-xs truncate">{user.email}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-white/60">
                          <span className="bg-white/10 px-2 py-1 rounded">Role: {user.role}</span>
                          <span className="bg-white/10 px-2 py-1 rounded">District: {user.district}</span>
                        </div>
                        <p className="text-white/50 text-xs">Last active: {user.lastActive}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-3">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
                        onClick={() => handleDeleteUser(user)}
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

      {/* Edit Role Modal */}
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-lg border-white/20">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Edit Role</DialogTitle>
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
              <Button variant="outline" onClick={() => setIsEditRoleOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateRole} className="bg-blue-500 hover:bg-blue-600 text-white">
                Update Role
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

      {/* Edit User Modal */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-lg border-white/20">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Edit User</DialogTitle>
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
              <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateUser} className="bg-blue-500 hover:bg-blue-600 text-white">
                Update User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Modal */}
      <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-lg border-white/20">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              Confirm User Deletion
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-gray-700">
                Are you sure you want to delete user <strong>{deletingUser?.name}</strong>?
              </p>
              <p className="text-sm text-gray-600 mt-2">
                This action cannot be undone. The user will lose access to the system immediately.
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteUserOpen(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmDeleteUser} 
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
