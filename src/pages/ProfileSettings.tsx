import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, User, Mail, Phone, MapPin, Building2, Save, Edit, X, Upload, Globe, Linkedin, Github, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getUserInfo } from "@/contexts/ai/userHelpers";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    address: "",
    website: "",
    description: "",
    companySize: "",
    industryFocus: [] as string[],
    foundedYear: "",
    linkedinUrl: "",
    githubUrl: "",
    logoUrl: "",
    lastUpdated: new Date().toISOString()
  });

  useEffect(() => {
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem(`startup_profile_${userInfo.email}`);
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfileData(parsed);
    } else if (userInfo.email) {
      // Initialize with user info if available
      setProfileData(prev => ({
        ...prev,
        name: userInfo.name || "",
        email: userInfo.email || "",
        organization: userInfo.role === 'startup' ? userInfo.name : ""
      }));
    }
  }, [userInfo.email, userInfo.name, userInfo.role]);

  const handleSave = () => {
    const updatedData = {
      ...profileData,
      lastUpdated: new Date().toISOString()
    };
    
    setProfileData(updatedData);
    localStorage.setItem(`startup_profile_${userInfo.email}`, JSON.stringify(updatedData));
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    // Reload from localStorage to discard changes
    const savedProfile = localStorage.getItem(`startup_profile_${userInfo.email}`);
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIndustryFocusChange = (value: string) => {
    const industries = value.split(',').map(item => item.trim()).filter(Boolean);
    setProfileData(prev => ({
      ...prev,
      industryFocus: industries
    }));
  };

  const handleBackNavigation = () => {
    // Navigate based on user role
    if (userInfo.role === 'startup') {
      navigate('/dashboard/startup');
    } else if (userInfo.role === 'student') {
      navigate('/dashboard/student');
    } else if (userInfo.role === 'official') {
      navigate('/dashboard/official');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white">
      <header className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={handleBackNavigation}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-white flex items-center">
                  <User className="w-6 h-6 mr-2" />
                  Profile Settings
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
                      Save Changes
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
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                      className="bg-white/10 border-white/20 text-white disabled:opacity-70"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={true} // Email should not be editable
                      className="bg-white/5 border-white/10 text-white/70"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter phone number"
                      className="bg-white/10 border-white/20 text-white disabled:opacity-70"
                    />
                  </div>
                </div>

                {/* Organization Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Organization Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organization" className="text-white">Organization Name</Label>
                    <Input
                      id="organization"
                      value={profileData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter organization name"
                      className="bg-white/10 border-white/20 text-white disabled:opacity-70"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companySize" className="text-white">Company Size</Label>
                    <Input
                      id="companySize"
                      value={profileData.companySize}
                      onChange={(e) => handleInputChange('companySize', e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., 1-10, 11-50, 51-200"
                      className="bg-white/10 border-white/20 text-white disabled:opacity-70"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="foundedYear" className="text-white">Founded Year</Label>
                    <Input
                      id="foundedYear"
                      value={profileData.foundedYear}
                      onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., 2020"
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
                    value={profileData.address}
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
                    value={profileData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Describe your organization and what you do"
                    className="bg-white/10 border-white/20 text-white disabled:opacity-70"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-white">Website</Label>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-white/60" />
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        disabled={!isEditing}
                        placeholder="https://example.com"
                        className="bg-white/10 border-white/20 text-white disabled:opacity-70"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl" className="text-white">LinkedIn</Label>
                    <div className="flex items-center space-x-2">
                      <Linkedin className="w-4 h-4 text-white/60" />
                      <Input
                        id="linkedinUrl"
                        value={profileData.linkedinUrl}
                        onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                        disabled={!isEditing}
                        placeholder="https://linkedin.com/company/..."
                        className="bg-white/10 border-white/20 text-white disabled:opacity-70"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl" className="text-white">GitHub</Label>
                    <div className="flex items-center space-x-2">
                      <Github className="w-4 h-4 text-white/60" />
                      <Input
                        id="githubUrl"
                        value={profileData.githubUrl}
                        onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                        disabled={!isEditing}
                        placeholder="https://github.com/..."
                        className="bg-white/10 border-white/20 text-white disabled:opacity-70"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industryFocus" className="text-white">Industry Focus</Label>
                  {isEditing ? (
                    <Input
                      id="industryFocus"
                      value={profileData.industryFocus.join(', ')}
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

                <div className="space-y-2">
                  <Label htmlFor="logoUpload" className="text-white">Company Logo</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                      {profileData.logoUrl ? (
                        <img 
                          src={profileData.logoUrl} 
                          alt="Company Logo" 
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <Building2 className="w-8 h-8 text-white/40" />
                      )}
                    </div>
                    {isEditing && (
                      <Button 
                        variant="outline" 
                        className="bg-white/10 border-white/20 text-white"
                        disabled={!isEditing}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Logo
                      </Button>
                    )}
                  </div>
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
                      {profileData.email || "No email provided"}
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

              {/* Danger Zone */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="text-red-300 font-medium mb-2">Delete Account</h4>
                  <p className="text-white/70 text-sm mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button 
                    variant="destructive" 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => toast.error("This action is disabled in the demo")}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfileSettings;