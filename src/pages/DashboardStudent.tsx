
import { useState } from "react";
import { FileText, User, Eye, Briefcase, AlertCircle, Calendar, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { StudentHeader } from "@/components/student/StudentHeader";
import { StudentStats } from "@/components/student/StudentStats";
import { JobSearchFilters } from "@/components/student/JobSearchFilters";
import { JobCard } from "@/components/student/JobCard";
import { StudentProfileModal } from "@/components/student/StudentProfileModal";
import { JobApplicationModal } from "@/components/student/JobApplicationModal";

const DashboardStudent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showJobApplication, setShowJobApplication] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Application form state - no prefilled data
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    education: "",
    experience: "",
    skills: "",
    coverLetter: "",
    portfolioUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    expectedSalary: "",
    availableFrom: "",
    workMode: "hybrid",
    additionalInfo: "",
    resumeFile: null
  });

  // Enhanced student profile data - no prefilled data
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: [],
    education: "",
    experience: "",
    resume: "",
    bio: "",
    profilePicture: "",
    portfolioUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    joinedDate: "2024-01-15"
  });

  // Applied jobs data
  const [appliedJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp Innovations",
      appliedDate: "2024-01-20",
      status: "Under Review",
      statusColor: "bg-yellow-100 text-yellow-800",
      icon: AlertCircle,
      location: "Hyderabad",
      stipend: "₹25,000"
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "AI Solutions Ltd",
      appliedDate: "2024-01-18",
      status: "Interview Scheduled",
      statusColor: "bg-blue-100 text-blue-800",
      icon: Calendar,
      location: "Warangal",
      stipend: "₹30,000"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Design Studio Pro",
      appliedDate: "2024-01-15",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-800",
      icon: XCircle,
      location: "Nizamabad",
      stipend: "₹20,000"
    }
  ]);

  // Expanded jobs data with more locations
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

  const stats = [
    { title: "Applications Sent", value: appliedJobs.length.toString(), icon: FileText },
    { title: "Jobs Viewed", value: "45", icon: Eye },
    { title: "Profile Views", value: "23", icon: User }
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

  const handleInputChange = (field, value) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setApplicationData(prev => ({
      ...prev,
      resumeFile: file
    }));
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!applicationData.fullName || !applicationData.email || !applicationData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!applicationData.coverLetter) {
      toast.error("Cover letter is required");
      return;
    }

    toast.success(`Application submitted successfully for ${selectedJob.title}!`);
    setShowJobApplication(false);
    setSelectedJob(null);
    
    // Reset form
    setApplicationData({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      education: "",
      experience: "",
      skills: "",
      coverLetter: "",
      portfolioUrl: "",
      githubUrl: "",
      linkedinUrl: "",
      expectedSalary: "",
      availableFrom: "",
      workMode: "hybrid",
      additionalInfo: "",
      resumeFile: null
    });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
    setShowProfile(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200">
      <StudentHeader 
        profileName={profile.name}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
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

        {/* Jobs Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <motion.h2 
              className="text-2xl font-bold text-neutral-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Available Jobs ({filteredJobs.length})
            </motion.h2>
            <Link to="/jobs">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-primary-300 text-primary-700 hover:bg-primary-50">
                  View All Jobs
                </Button>
              </motion.div>
            </Link>
          </div>

          <div className="grid gap-6">
            {filteredJobs.slice(0, 6).map((job, index) => (
              <JobCard 
                key={job.id}
                job={job}
                index={index}
                onApply={handleApplyJob}
              />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-neutral-600 text-xl">No jobs found matching your criteria.</p>
              <p className="text-neutral-500 mt-2">Try adjusting your search filters.</p>
            </motion.div>
          )}
        </div>

        {/* Quick Actions */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/my-applications">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full h-20 gradient-primary text-white text-lg shadow-lg hover:shadow-xl transition-shadow">
                <FileText className="w-6 h-6 mr-3" />
                My Applications
              </Button>
            </motion.div>
          </Link>
          
          <Link to="/application-tracker">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full h-20 bg-accent text-white text-lg shadow-lg hover:shadow-xl hover:bg-accent-600 transition-all">
                <Briefcase className="w-6 h-6 mr-3" />
                Track Applications
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </main>

      {/* Job Application Modal */}
      <Dialog open={showJobApplication} onOpenChange={setShowJobApplication}>
        <JobApplicationModal
          selectedJob={selectedJob}
          applicationData={applicationData}
          onInputChange={handleInputChange}
          onFileUpload={handleFileUpload}
          onSubmit={handleSubmitApplication}
        />
      </Dialog>
    </div>
  );
};

export default DashboardStudent;
