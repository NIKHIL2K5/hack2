import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useResponsive } from "@/hooks/useResponsive";

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
  const { isMobile } = useResponsive();
  
  return (
    <Card>
      <CardHeader className={isMobile ? "px-4 py-3" : undefined}>
        <CardTitle className={isMobile ? "text-lg" : undefined}>Professional Information</CardTitle>
      </CardHeader>
      <CardContent className={isMobile ? "px-4 py-3" : undefined}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
            <Input 
              value={profile.skills.join(", ")} 
              onChange={(e) => setProfile({...profile, skills: e.target.value.split(", ").filter(Boolean)})}
              placeholder="React, JavaScript, Python, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Education</label>
            <Textarea 
              value={profile.education} 
              onChange={(e) => setProfile({...profile, education: e.target.value})}
              placeholder="Your educational background..."
              className="h-16 sm:h-20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Experience</label>
            <Textarea 
              value={profile.experience} 
              onChange={(e) => setProfile({...profile, experience: e.target.value})}
              placeholder="Your work experience, internships, projects..."
              className="h-20 sm:h-24"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};