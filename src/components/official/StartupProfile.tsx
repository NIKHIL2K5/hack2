
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Globe, Users, Phone, Mail, Edit, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface StartupProfileData {
  email: string;
  organizationName: string;
  contactPersonName: string;
  phone: string;
  address: string;
  website: string;
  description: string;
  companySize: string;
  industryFocus: string[];
  foundedYear: string;
  linkedinUrl: string;
  logoUrl: string;
  lastUpdated: string;
}

interface StartupProfileProps {
  userEmail: string;
  organizationName: string;
}

export const StartupProfile = ({ userEmail, organizationName }: StartupProfileProps) => {
  const [profileData, setProfileData] = useState<StartupProfileData>({
    email: userEmail,
    organizationName: organizationName,
    contactPersonName: '',
    phone: '',
    address: '',
    website: '',
    description: '',
    companySize: '',
    industryFocus: [],
    foundedYear: '',
    linkedinUrl: '',
    logoUrl: '',
    lastUpdated: new Date().toISOString()
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<StartupProfileData>(profileData);

  useEffect(() => {
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem(`startup_profile_${userEmail}`);
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfileData(parsed);
      setEditForm(parsed);
    }
  }, [userEmail]);

  const handleSave = () => {
    const updatedData = {
      ...editForm,
      lastUpdated: new Date().toISOString()
    };
    
    setProfileData(updatedData);
    localStorage.setItem(`startup_profile_${userEmail}`, JSON.stringify(updatedData));
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditForm(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof StartupProfileData, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIndustryFocusChange = (value: string) => {
    const industries = value.split(',').map(item => item.trim()).filter(Boolean);
    setEditForm(prev => ({
      ...prev,
      industryFocus: industries
    }));
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-white flex items-center">
            <Building2 className="w-6 h-6 mr-2" />
            Organization Profile
          </CardTitle>
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
                Save
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Basic Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="organizationName" className="text-white">Organization Name</Label>
              <Input
                id="organizationName"
                value={isEditing ? editForm.organizationName : profileData.organizationName}
                onChange={(e) => handleInputChange('organizationName', e.target.value)}
                disabled={!isEditing}
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPersonName" className="text-white">Contact Person Name</Label>
              <Input
                id="contactPersonName"
                value={isEditing ? editForm.contactPersonName : profileData.contactPersonName}
                onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter contact person name"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                value={profileData.email}
                disabled
                className="bg-white/5 border-white/10 text-white/70"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Phone</Label>
              <Input
                id="phone"
                value={isEditing ? editForm.phone : profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter phone number"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Additional Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="website" className="text-white">Website</Label>
              <Input
                id="website"
                value={isEditing ? editForm.website : profileData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                disabled={!isEditing}
                placeholder="https://example.com"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize" className="text-white">Company Size</Label>
              <Input
                id="companySize"
                value={isEditing ? editForm.companySize : profileData.companySize}
                onChange={(e) => handleInputChange('companySize', e.target.value)}
                disabled={!isEditing}
                placeholder="e.g., 50-100 employees"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foundedYear" className="text-white">Founded Year</Label>
              <Input
                id="foundedYear"
                value={isEditing ? editForm.foundedYear : profileData.foundedYear}
                onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                disabled={!isEditing}
                placeholder="e.g., 2020"
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl" className="text-white">LinkedIn URL</Label>
              <Input
                id="linkedinUrl"
                value={isEditing ? editForm.linkedinUrl : profileData.linkedinUrl}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                disabled={!isEditing}
                placeholder="https://linkedin.com/company/..."
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>
          </div>
        </motion.div>

        {/* Full Width Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address" className="text-white">Address</Label>
            <Textarea
              id="address"
              value={isEditing ? editForm.address : profileData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              placeholder="Enter full address"
              className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Company Description</Label>
            <Textarea
              id="description"
              value={isEditing ? editForm.description : profileData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              disabled={!isEditing}
              placeholder="Describe your organization and what you do"
              className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industryFocus" className="text-white">Industry Focus</Label>
            {isEditing ? (
              <Input
                id="industryFocus"
                value={editForm.industryFocus.join(', ')}
                onChange={(e) => handleIndustryFocusChange(e.target.value)}
                placeholder="e.g., Technology, Healthcare, Finance (comma separated)"
                className="bg-white/10 border-white/20 text-white"
              />
            ) : (
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-white/10 border border-white/20 rounded-md">
                {profileData.industryFocus.length > 0 ? (
                  profileData.industryFocus.map((industry, index) => (
                    <Badge key={index} variant="outline" className="border-blue-300 text-blue-200 bg-blue-500/20">
                      {industry}
                    </Badge>
                  ))
                ) : (
                  <span className="text-white/50">No industries specified</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Profile Summary */}
        {!isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <h4 className="text-white font-semibold mb-3">Profile Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/80">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-400" />
                {profileData.email}
              </div>
              {profileData.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-green-400" />
                  {profileData.phone}
                </div>
              )}
              {profileData.website && (
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-purple-400" />
                  <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
                    {profileData.website}
                  </a>
                </div>
              )}
              {profileData.companySize && (
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-yellow-400" />
                  {profileData.companySize}
                </div>
              )}
              {profileData.address && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-red-400" />
                  {profileData.address}
                </div>
              )}
            </div>
            
            {profileData.lastUpdated && (
              <p className="text-xs text-white/50 mt-3">
                Last updated: {new Date(profileData.lastUpdated).toLocaleDateString()}
              </p>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
