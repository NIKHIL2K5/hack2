
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Profile {
  skills: string[];
  education: string;
  experience: string;
}

interface ProfessionalInfoFormProps {
  profile: Profile;
  setProfile: (profile: any) => void;
}

export const ProfessionalInfoForm = ({ profile, setProfile }: ProfessionalInfoFormProps) => {
  return (
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
  );
};
