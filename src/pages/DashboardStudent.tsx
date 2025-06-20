import { useState } from "react";
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
import { useStudentData } from "@/hooks/useStudentData";

const DashboardStudent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showJobApplication, setShowJobApplication] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const {
    profile,
    setProfile,
    appliedJobs,
    applicationData,
    handleInputChange,
    handleFileUpload,
    handleSubmitApplication,
    handleUpdateProfile
  } = useStudentData();

  // Jobs data
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp Innovations",
      location: "Hyderabad",
      stipend: "₹25,000",
      duration: "6 months",
      skills: ["React", "JavaScript", "CSS"],
      description: "Join our dynamic team to build cutting-edge web applications using React and modern frontend technologies.",
      posted: "2 days ago",
      type: "Internship"
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "AI Solutions Ltd",
      location: "Warangal",
      stipend: "₹30,000",
      duration: "4 months",
      skills: ["Python", "Machine Learning", "SQL"],
      description: "Work on exciting AI projects and gain hands-on experience with machine learning algorithms.",
      posted: "1 day ago",
      type: "Internship"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Design Studio Pro",
      location: "Nizamabad",
      stipend: "₹20,000",
      duration: "3 months",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      description: "Create beautiful and intuitive user experiences for our digital products.",
      posted: "3 days ago",
      type: "Part-time"
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "StartupTech",
      location: "Karimnagar",
      stipend: "₹35,000",
      duration: "6 months",
      skills: ["React", "Node.js", "MongoDB"],
      description: "Build end-to-end web applications and work with modern tech stack.",
      posted: "5 days ago",
      type: "Internship"
    },
    {
      id: 5,
      title: "Mobile App Developer",
      company: "AppTech Solutions",
      location: "Khammam",
      stipend: "₹28,000",
      duration: "5 months",
      skills: ["React Native", "Flutter", "Mobile UI"],
      description: "Develop innovative mobile applications for Android and iOS platforms.",
      posted: "1 week ago",
      type: "Internship"
    },
    {
      id: 6,
      title: "Backend Developer",
      company: "CloudTech Systems",
      location: "Mahbubnagar",
      stipend: "₹32,000",
      duration: "6 months",
      skills: ["Node.js", "Express", "AWS"],
      description: "Work on scalable backend systems and cloud infrastructure.",
      posted: "4 days ago",
      type: "Internship"
    },
    {
      id: 7,
      title: "DevOps Engineer",
      company: "InfraTech Solutions",
      location: "Adilabad",
      stipend: "₹40,000",
      duration: "8 months",
      skills: ["Docker", "Kubernetes", "Jenkins"],
      description: "Manage deployment pipelines and infrastructure automation.",
      posted: "2 days ago",
      type: "Full-time"
    },
    {
      id: 8,
      title: "Cybersecurity Analyst",
      company: "SecureNet Technologies",
      location: "Medak",
      stipend: "₹38,000",
      duration: "6 months",
      skills: ["Network Security", "Penetration Testing", "SIEM"],
      description: "Protect digital assets and conduct security assessments.",
      posted: "3 days ago",
      type: "Internship"
    },
    {
      id: 9,
      title: "AI Research Intern",
      company: "DeepMind Labs",
      location: "Rangareddy",
      stipend: "₹45,000",
      duration: "6 months",
      skills: ["Deep Learning", "TensorFlow", "Research"],
      description: "Conduct cutting-edge research in artificial intelligence and machine learning.",
      posted: "1 day ago",
      type: "Research"
    },
    {
      id: 10,
      title: "Blockchain Developer",
      company: "CryptoTech Innovations",
      location: "Nalgonda",
      stipend: "₹50,000",
      duration: "8 months",
      skills: ["Solidity", "Web3", "Smart Contracts"],
      description: "Build decentralized applications and smart contracts on blockchain platforms.",
      posted: "2 days ago",
      type: "Full-time"
    }
  ];

  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesSkill = !skillFilter || job.skills.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
    
    return matchesSearch && matchesLocation && matchesSkill;
  });

  const handleApplyJob = (job) => {
    setSelectedJob(job);
    setShowJobApplication(true);
  };

  const handleSubmitJobApplication = (e) => {
    const success = handleSubmitApplication(e, selectedJob);
    if (success) {
      setShowJobApplication(false);
      setSelectedJob(null);
    }
  };

  const stats = [
    { title: "Applications Sent", value: appliedJobs.length.toString(), icon: FileText },
    { title: "Jobs Viewed", value: "45", icon: Eye },
    { title: "Profile Views", value: "23", icon: User }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200">
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

      <main className="container mx-auto px-6 py-8">
        <StudentStats stats={stats} />
        
        <JobSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          skillFilter={skillFilter}
          setSkillFilter={setSkillFilter}
        />

        <JobsSection 
          filteredJobs={filteredJobs}
          onApply={handleApplyJob}
        />

        <QuickActions />
      </main>

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
    </div>
  );
};

export default DashboardStudent;
