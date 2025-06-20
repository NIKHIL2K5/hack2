
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProfileSummaryCard } from "@/components/student/profile/ProfileSummaryCard";
import { PersonalInfoForm } from "@/components/student/profile/PersonalInfoForm";
import { ProfessionalInfoForm } from "@/components/student/profile/ProfessionalInfoForm";
import { LinksResumeForm } from "@/components/student/profile/LinksResumeForm";

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
        <ProfileSummaryCard profile={profile} appliedJobs={appliedJobs} />

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <form onSubmit={onUpdateProfile} className="space-y-6">
            <PersonalInfoForm profile={profile} setProfile={setProfile} />
            <ProfessionalInfoForm profile={profile} setProfile={setProfile} />
            <LinksResumeForm profile={profile} setProfile={setProfile} />

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-emerald-700 hover-button">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </DialogContent>
  );
};
