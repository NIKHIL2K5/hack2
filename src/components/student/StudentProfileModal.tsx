
import { Building2, User, Upload } from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AppliedJob {
  id: number;
  title: string;
  company: string;
  appliedDate: string;
  status: string;
  statusColor: string;
  icon: any;
  location: string;
  stipend: string;
}

interface Profile {
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  education: string;
  experience: string;
  resume: string;
  bio: string;
  profilePicture: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  joinedDate: string;
}

interface StudentProfileModalProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
  appliedJobs: AppliedJob[];
  onUpdateProfile: (e: React.FormEvent) => void;
}

export const StudentProfileModal = ({ profile, setProfile, appliedJobs, onUpdateProfile }: StudentProfileModalProps) => {
  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-gray-900">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center">My Profile</DialogTitle>
      </DialogHeader>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <div className="lg:col-span-1">
          <Card className="mb-6 hover-card">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                {profile.profilePicture ? (
                  <img src={profile.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{profile.name || "Add Your Name"}</h3>
              <p className="text-gray-600 mb-4">{profile.location || "Add Location"}</p>
              <Badge className="bg-green-100 text-green-800">
                Member since {new Date(profile.joinedDate).toLocaleDateString()}
              </Badge>
            </CardContent>
          </Card>

          {/* Applied Companies */}
          <Card className="hover-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Applied Companies ({appliedJobs.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {appliedJobs.length > 0 ? (
                appliedJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-sm">{job.company}</p>
                      <p className="text-xs text-gray-600">{job.title}</p>
                      <p className="text-xs text-gray-500">Applied: {job.appliedDate}</p>
                    </div>
                    <Badge className={job.statusColor}>
                      <job.icon className="w-3 h-3 mr-1" />
                      {job.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No applications yet</p>
                  <p className="text-gray-400 text-xs mt-1">Start applying to jobs to see them here!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <form onSubmit={onUpdateProfile} className="space-y-6">
            <Card className="hover-card">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <Input 
                      value={profile.name} 
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      placeholder="Enter your full name"
                      className="hover:border-blue-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input 
                      type="email"
                      value={profile.email} 
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      placeholder="your.email@example.com"
                      className="hover:border-blue-400 transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input 
                      value={profile.phone} 
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      placeholder="+91 9876543210"
                      className="hover:border-blue-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <Input 
                      value={profile.location} 
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      placeholder="City, State"
                      className="hover:border-blue-400 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <Textarea 
                    value={profile.bio} 
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    placeholder="Tell us about yourself..."
                    className="h-24 hover:border-blue-400 transition-colors"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
                  <Input 
                    value={profile.skills.join(", ")} 
                    onChange={(e) => setProfile({...profile, skills: e.target.value.split(", ").filter(Boolean)})}
                    placeholder="React, JavaScript, Python, etc."
                    className="hover:border-blue-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Education</label>
                  <Textarea 
                    value={profile.education} 
                    onChange={(e) => setProfile({...profile, education: e.target.value})}
                    placeholder="Your educational background..."
                    className="h-20 hover:border-blue-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Experience</label>
                  <Textarea 
                    value={profile.experience} 
                    onChange={(e) => setProfile({...profile, experience: e.target.value})}
                    placeholder="Your work experience, internships, projects..."
                    className="h-24 hover:border-blue-400 transition-colors"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardHeader>
                <CardTitle>Links & Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Portfolio URL</label>
                    <Input 
                      value={profile.portfolioUrl} 
                      onChange={(e) => setProfile({...profile, portfolioUrl: e.target.value})}
                      placeholder="https://yourportfolio.com"
                      className="hover:border-blue-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">GitHub</label>
                    <Input 
                      value={profile.githubUrl} 
                      onChange={(e) => setProfile({...profile, githubUrl: e.target.value})}
                      placeholder="https://github.com/username"
                      className="hover:border-blue-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn</label>
                    <Input 
                      value={profile.linkedinUrl} 
                      onChange={(e) => setProfile({...profile, linkedinUrl: e.target.value})}
                      placeholder="https://linkedin.com/in/username"
                      className="hover:border-blue-400 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Resume</label>
                  <div className="flex items-center space-x-2">
                    <Button type="button" variant="outline" className="border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Resume
                    </Button>
                    {profile.resume && (
                      <span className="text-sm text-gray-600">{profile.resume}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-emerald-700 hover-button">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </DialogContent>
  );
};
