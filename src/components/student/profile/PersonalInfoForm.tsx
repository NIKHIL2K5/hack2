import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useResponsive } from "@/hooks/useResponsive";

interface Profile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

interface PersonalInfoFormProps {
  profile: Profile;
  setProfile: (profile: any) => void;
}

export const PersonalInfoForm = ({ profile, setProfile }: PersonalInfoFormProps) => {
  const { isMobile } = useResponsive();
  
  return (
    <Card className="hover-card">
      <CardHeader className={isMobile ? "px-4 py-3" : undefined}>
        <CardTitle className={isMobile ? "text-lg" : undefined}>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className={isMobile ? "px-4 py-3" : undefined}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              className="h-20 sm:h-24 hover:border-blue-400 transition-colors"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};