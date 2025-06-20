
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Building2, MapPin, Key, Save, Edit, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface OfficialProfileData {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  employeeId: string;
  organization: string;
  designation: string;
  address: string;
  district: string;
  state: string;
  emailApiKey: string;
  smtpServer: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;
  lastUpdated: string;
}

export const OfficialProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState<OfficialProfileData>({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    employeeId: '',
    organization: '',
    designation: '',
    address: '',
    district: '',
    state: 'Telangana',
    emailApiKey: '',
    smtpServer: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    lastUpdated: ''
  });

  const [editForm, setEditForm] = useState<OfficialProfileData>(profileData);

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('officialProfile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfileData(parsed);
      setEditForm(parsed);
    } else {
      // Load from current user session if available
      const currentUser = localStorage.getItem('officialUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        const initialData = {
          ...profileData,
          fullName: user.name || '',
          email: user.email || '',
          department: user.department || '',
          employeeId: user.employeeId || '',
          organization: user.organization?.name || '',
        };
        setProfileData(initialData);
        setEditForm(initialData);
      }
    }
  }, []);

  const handleSave = () => {
    const updatedData = {
      ...editForm,
      lastUpdated: new Date().toISOString()
    };
    
    setProfileData(updatedData);
    localStorage.setItem('officialProfile', JSON.stringify(updatedData));
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditForm(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof OfficialProfileData, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const testEmailConfiguration = () => {
    if (!profileData.emailApiKey && !profileData.smtpUsername) {
      toast.error("Please configure email settings first");
      return;
    }
    toast.success("Email configuration test initiated");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Official Profile</h2>
          <p className="text-white/70">Manage your profile and email configuration</p>
        </div>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Full Name</Label>
              <Input
                value={isEditing ? editForm.fullName : profileData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your full name"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Email Address</Label>
              <Input
                value={isEditing ? editForm.email : profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                placeholder="official@organization.org.in"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Phone Number</Label>
              <Input
                value={isEditing ? editForm.phone : profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                placeholder="+91 XXXXXXXXXX"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Designation</Label>
              <Input
                value={isEditing ? editForm.designation : profileData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                disabled={!isEditing}
                placeholder="e.g., Assistant Director"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>
          </CardContent>
        </Card>

        {/* Official Information */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              Official Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Organization</Label>
              <Input
                value={isEditing ? editForm.organization : profileData.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
                disabled={!isEditing}
                placeholder="Organization name"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Department</Label>
              <Input
                value={isEditing ? editForm.department : profileData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                disabled={!isEditing}
                placeholder="Department name"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Employee ID</Label>
              <Input
                value={isEditing ? editForm.employeeId : profileData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                disabled={!isEditing}
                placeholder="Employee ID"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">State</Label>
              <Select 
                value={isEditing ? editForm.state : profileData.state}
                onValueChange={(value) => handleInputChange('state', value)}
                disabled={!isEditing}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Telangana">Telangana</SelectItem>
                  <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Address Information */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Address Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Address</Label>
            <Textarea
              value={isEditing ? editForm.address : profileData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              placeholder="Enter complete address"
              className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">District</Label>
            <Input
              value={isEditing ? editForm.district : profileData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              disabled={!isEditing}
              placeholder="District name"
              className="bg-white/10 border-white/20 text-white disabled:opacity-70"
            />
          </div>
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Email Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Email API Key (Optional)</Label>
              <div className="relative">
                <Input
                  type={showApiKey ? "text" : "password"}
                  value={isEditing ? editForm.emailApiKey : profileData.emailApiKey}
                  onChange={(e) => handleInputChange('emailApiKey', e.target.value)}
                  disabled={!isEditing}
                  placeholder="API key for email service"
                  className="bg-white/10 border-white/20 text-white disabled:opacity-70 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-white/60"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">SMTP Server</Label>
              <Input
                value={isEditing ? editForm.smtpServer : profileData.smtpServer}
                onChange={(e) => handleInputChange('smtpServer', e.target.value)}
                disabled={!isEditing}
                placeholder="smtp.gmail.com"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">SMTP Port</Label>
              <Input
                value={isEditing ? editForm.smtpPort : profileData.smtpPort}
                onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                disabled={!isEditing}
                placeholder="587"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">SMTP Username</Label>
              <Input
                value={isEditing ? editForm.smtpUsername : profileData.smtpUsername}
                onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
                disabled={!isEditing}
                placeholder="Email for SMTP authentication"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">SMTP Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={isEditing ? editForm.smtpPassword : profileData.smtpPassword}
                  onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                  disabled={!isEditing}
                  placeholder="App password for SMTP"
                  className="bg-white/10 border-white/20 text-white disabled:opacity-70 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-white/60"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="md:col-span-2">
              <Button
                onClick={testEmailConfiguration}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Mail className="w-4 h-4 mr-2" />
                Test Email Configuration
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {profileData.lastUpdated && (
        <div className="text-center">
          <p className="text-white/50 text-sm">
            Last updated: {new Date(profileData.lastUpdated).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};
