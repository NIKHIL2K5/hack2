import { User, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useResponsive } from "@/hooks/useResponsive";

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
  location: string;
  profilePicture: string;
  joinedDate: string;
}

interface ProfileSummaryCardProps {
  profile: Profile;
  appliedJobs: AppliedJob[];
}

export const ProfileSummaryCard = ({ profile, appliedJobs }: ProfileSummaryCardProps) => {
  const { isMobile } = useResponsive();
  
  return (
    <div className="lg:col-span-1">
      <Card className="mb-4 sm:mb-6 hover-card">
        <CardContent className="p-4 sm:p-6 text-center">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
            {profile.profilePicture ? (
              <img src={profile.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{profile.name || "Add Your Name"}</h3>
          <p className="text-gray-600 mb-3 sm:mb-4">{profile.location || "Add Location"}</p>
          <Badge className="bg-green-100 text-green-800">
            Member since {new Date(profile.joinedDate).toLocaleDateString()}
          </Badge>
        </CardContent>
      </Card>

      {/* Applied Companies */}
      <Card className="hover-card">
        <CardHeader className={isMobile ? "px-4 py-3" : undefined}>
          <CardTitle className={`${isMobile ? "text-lg" : "text-lg"} flex items-center`}>
            <Building2 className="w-5 h-5 mr-2" />
            Applied Companies ({appliedJobs.length})
          </CardTitle>
        </CardHeader>
        <CardContent className={isMobile ? "px-4 py-3" : undefined}>
          <div className="space-y-2 sm:space-y-3">
            {appliedJobs.length > 0 ? (
              appliedJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-xs sm:text-sm">{job.company}</p>
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
              <div className="text-center py-6 sm:py-8">
                <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
                <p className="text-gray-500 text-sm">No applications yet</p>
                <p className="text-gray-400 text-xs mt-1">Start applying to jobs to see them here!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};