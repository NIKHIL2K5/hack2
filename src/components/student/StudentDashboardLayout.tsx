import { FileText, User, Eye } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { StudentHeader } from "@/components/student/StudentHeader";
import { StudentStats } from "@/components/student/StudentStats";
import { JobSearchFilters } from "@/components/student/JobSearchFilters";
import { StudentProfileModal } from "@/components/student/StudentProfileModal";
import { JobApplicationModal } from "@/components/student/JobApplicationModal";
import { JobsSection } from "@/components/student/JobsSection";
import { QuickActions } from "@/components/student/QuickActions";
import { SavedJobsWidget } from "@/components/student/SavedJobsWidget";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "@/hooks/useResponsive";
import { PageContainer } from "@/components/layout/PageContainer";

interface StudentDashboardLayoutProps {
  // State props
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  locationFilter: string;
  setLocationFilter: (filter: string) => void;
  skillFilter: string;
  setSkillFilter: (filter: string) => void;
  showProfile: boolean;
  setShowProfile: (show: boolean) => void;
  showJobApplication: boolean;
  setShowJobApplication: (show: boolean) => void;
  
  // Data props
  profile: any;
  setProfile: (profile: any) => void;
  appliedJobs: any[];
  filteredJobs: any[];
  selectedJob: any;
  applicationData: any;
  
  // Handler props
  handleInputChange: (field: string, value: string) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleApplyJob: (job: any) => void;
  handleSubmitJobApplication: (e: React.FormEvent) => void;
  handleUpdateProfile: (e: React.FormEvent) => void;
  onNavigate?: (path: string) => void;
}

export const StudentDashboardLayout = (props: StudentDashboardLayoutProps) => {
  const {
    searchTerm,
    setSearchTerm,
    locationFilter,
    setLocationFilter,
    skillFilter,
    setSkillFilter,
    showProfile,
    setShowProfile,
    showJobApplication,
    setShowJobApplication,
    profile,
    setProfile,
    appliedJobs,
    filteredJobs,
    selectedJob,
    applicationData,
    handleInputChange,
    handleFileUpload,
    handleApplyJob,
    handleSubmitJobApplication,
    handleUpdateProfile,
    onNavigate
  } = props;

  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  const stats = [
    { title: "Applications Sent", value: appliedJobs.length.toString(), icon: FileText },
    { title: "Jobs Viewed", value: "45", icon: Eye },
    { title: "Profile Views", value: "23", icon: User }
  ];

  return (
    <PageContainer className="bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200">
      <StudentHeader 
        profileName={profile.name}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        appliedJobs={appliedJobs}
        profile={profile}
        ProfileModalContent={
          <StudentProfileModal
            profile={profile}
            setProfile={setProfile}
            appliedJobs={appliedJobs}
            onUpdateProfile={handleUpdateProfile}
          />
        }
      />

      <div className="mt-6 space-y-6">
        <StudentStats stats={isMobile ? stats.slice(0, 2) : stats} />
        
        <JobSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          skillFilter={skillFilter}
          setSkillFilter={setSkillFilter}
        />

        <JobsSection 
          filteredJobs={filteredJobs.slice(0, isMobile ? 3 : isTablet ? 4 : 6)}
          onApply={handleApplyJob}
        />

        <QuickActions onNavigate={handleNavigation} />
      </div>

      <SavedJobsWidget />

      <Dialog open={showJobApplication} onOpenChange={setShowJobApplication}>
        <JobApplicationModal
          selectedJob={selectedJob}
          applicationData={applicationData}
          onInputChange={handleInputChange}
          onFileUpload={handleFileUpload}
          onSubmit={handleSubmitJobApplication}
        />
      </Dialog>
    </PageContainer>
  );
};