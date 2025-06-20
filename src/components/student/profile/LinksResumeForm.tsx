
import { Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Profile {
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  resume: string;
}

interface LinksResumeFormProps {
  profile: Profile;
  setProfile: (profile: any) => void;
}

export const LinksResumeForm = ({ profile, setProfile }: LinksResumeFormProps) => {
  return (
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
  );
};
