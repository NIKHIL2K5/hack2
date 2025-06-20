
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { saveUserData, loadUserData } from "@/utils/userStorage";
import { applicationSyncService } from "@/services/applicationSync";
import { dataSyncService } from "@/services/dataSync";

// Extended jobs data with 30 jobs across different Telangana locations
const AVAILABLE_JOBS = [
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
    title: "Mobile App Developer",
    company: "AppTech Solutions",
    location: "Karimnagar",
    stipend: "₹35,000",
    duration: "6 months",
    skills: ["React Native", "Flutter", "Mobile UI"],
    description: "Develop innovative mobile applications for Android and iOS platforms.",
    posted: "1 week ago",
    type: "Internship"
  },
  {
    id: 5,
    title: "Backend Developer",
    company: "CloudTech Systems",
    location: "Khammam",
    stipend: "₹32,000",
    duration: "6 months",
    skills: ["Node.js", "Express", "AWS"],
    description: "Work on scalable backend systems and cloud infrastructure.",
    posted: "4 days ago",
    type: "Internship"
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "InfraTech Solutions",
    location: "Mahbubnagar",
    stipend: "₹40,000",
    duration: "8 months",
    skills: ["Docker", "Kubernetes", "Jenkins"],
    description: "Manage deployment pipelines and infrastructure automation.",
    posted: "2 days ago",
    type: "Full-time"
  },
  {
    id: 7,
    title: "Cybersecurity Analyst",
    company: "SecureNet Technologies",
    location: "Adilabad",
    stipend: "₹38,000",
    duration: "6 months",
    skills: ["Network Security", "Penetration Testing", "SIEM"],
    description: "Protect digital assets and conduct security assessments.",
    posted: "3 days ago",
    type: "Internship"
  },
  {
    id: 8,
    title: "AI Research Intern",
    company: "DeepMind Labs",
    location: "Medak",
    stipend: "₹45,000",
    duration: "6 months",
    skills: ["Deep Learning", "TensorFlow", "Research"],
    description: "Conduct cutting-edge research in artificial intelligence and machine learning.",
    posted: "1 day ago",
    type: "Research"
  },
  {
    id: 9,
    title: "Blockchain Developer",
    company: "CryptoTech Innovations",
    location: "Rangareddy",
    stipend: "₹50,000",
    duration: "8 months",
    skills: ["Solidity", "Web3", "Smart Contracts"],
    description: "Build decentralized applications and smart contracts on blockchain platforms.",
    posted: "2 days ago",
    type: "Full-time"
  },
  {
    id: 10,
    title: "Quality Assurance Engineer",
    company: "TestPro Solutions",
    location: "Nalgonda",
    stipend: "₹28,000",
    duration: "5 months",
    skills: ["Selenium", "Test Automation", "API Testing"],
    description: "Ensure software quality through comprehensive testing strategies.",
    posted: "5 days ago",
    type: "Internship"
  },
  {
    id: 11,
    title: "Digital Marketing Specialist",
    company: "MarketGrow Agency",
    location: "Siddipet",
    stipend: "₹22,000",
    duration: "4 months",
    skills: ["SEO", "Social Media", "Google Ads"],
    description: "Drive digital marketing campaigns and boost online presence for clients.",
    posted: "3 days ago",
    type: "Internship"
  },
  {
    id: 12,
    title: "Business Analyst",
    company: "ConsultPro Services",
    location: "Sangareddy",
    stipend: "₹35,000",
    duration: "6 months",
    skills: ["Data Analysis", "Excel", "Power BI"],
    description: "Analyze business processes and provide strategic recommendations.",
    posted: "2 days ago",
    type: "Internship"
  },
  {
    id: 13,
    title: "Game Developer",
    company: "GameCraft Studios",
    location: "Jagtial",
    stipend: "₹33,000",
    duration: "5 months",
    skills: ["Unity", "C#", "Game Design"],
    description: "Create engaging mobile and PC games using Unity engine.",
    posted: "4 days ago",
    type: "Internship"
  },
  {
    id: 14,
    title: "Content Writer",
    company: "WriteCraft Media",
    location: "Rajanna Sircilla",
    stipend: "₹18,000",
    duration: "3 months",
    skills: ["Writing", "Content Strategy", "WordPress"],
    description: "Create compelling content for websites, blogs, and marketing materials.",
    posted: "1 week ago",
    type: "Part-time"
  },
  {
    id: 15,
    title: "IoT Developer",
    company: "SmartTech Innovations",
    location: "Kamareddy",
    stipend: "₹42,000",
    duration: "7 months",
    skills: ["Arduino", "Raspberry Pi", "IoT Protocols"],
    description: "Develop smart IoT solutions for industrial and consumer applications.",
    posted: "2 days ago",
    type: "Full-time"
  },
  {
    id: 16,
    title: "Graphic Designer",
    company: "VisualArts Studio",
    location: "Mancherial",
    stipend: "₹20,000",
    duration: "4 months",
    skills: ["Photoshop", "Illustrator", "Branding"],
    description: "Design visual content for brands, including logos, brochures, and digital assets.",
    posted: "3 days ago",
    type: "Internship"
  },
  {
    id: 17,
    title: "Network Administrator",
    company: "NetSecure Systems",
    location: "Peddapalli",
    stipend: "₹30,000",
    duration: "6 months",
    skills: ["Cisco", "Network Security", "Troubleshooting"],
    description: "Manage and maintain network infrastructure for enterprise clients.",
    posted: "5 days ago",
    type: "Internship"
  },
  {
    id: 18,
    title: "Machine Learning Engineer",
    company: "DataMind Technologies",
    location: "Yadadri Bhuvanagiri",
    stipend: "₹48,000",
    duration: "8 months",
    skills: ["Python", "PyTorch", "MLOps"],
    description: "Build and deploy machine learning models for real-world applications.",
    posted: "1 day ago",
    type: "Full-time"
  },
  {
    id: 19,
    title: "Social Media Manager",
    company: "BrandBoost Digital",
    location: "Wanaparthy",
    stipend: "₹25,000",
    duration: "4 months",
    skills: ["Instagram", "Facebook", "Content Creation"],
    description: "Manage social media presence and engagement for multiple brand accounts.",
    posted: "2 days ago",
    type: "Part-time"
  },
  {
    id: 20,
    title: "Software Tester",
    company: "QualityFirst Technologies",
    location: "Narayanpet",
    stipend: "₹26,000",
    duration: "5 months",
    skills: ["Manual Testing", "Bug Tracking", "Test Cases"],
    description: "Perform comprehensive testing to ensure software quality and reliability.",
    posted: "4 days ago",
    type: "Internship"
  },
  {
    id: 21,
    title: "Web Developer",
    company: "WebCraft Solutions",
    location: "Jogulamba Gadwal",
    stipend: "₹29,000",
    duration: "6 months",
    skills: ["HTML", "CSS", "JavaScript", "PHP"],
    description: "Develop responsive websites and web applications for various clients.",
    posted: "3 days ago",
    type: "Internship"
  },
  {
    id: 22,
    title: "Technical Writer",
    company: "DocuTech Services",
    location: "Nagarkurnool",
    stipend: "₹24,000",
    duration: "4 months",
    skills: ["Technical Writing", "Documentation", "API Docs"],
    description: "Create clear technical documentation and user guides for software products.",
    posted: "1 week ago",
    type: "Part-time"
  },
  {
    id: 23,
    title: "Database Administrator",
    company: "DataVault Systems",
    location: "Vikarabad",
    stipend: "₹36,000",
    duration: "7 months",
    skills: ["MySQL", "PostgreSQL", "Database Design"],
    description: "Manage and optimize database systems for performance and security.",
    posted: "2 days ago",
    type: "Full-time"
  },
  {
    id: 24,
    title: "Video Editor",
    company: "MediaCraft Productions",
    location: "Suryapet",
    stipend: "₹22,000",
    duration: "3 months",
    skills: ["Premiere Pro", "After Effects", "Color Grading"],
    description: "Edit promotional videos, documentaries, and digital content.",
    posted: "5 days ago",
    type: "Internship"
  },
  {
    id: 25,
    title: "Cloud Engineer",
    company: "CloudMax Technologies",
    location: "Mahabubabad",
    stipend: "₹44,000",
    duration: "8 months",
    skills: ["AWS", "Azure", "Cloud Architecture"],
    description: "Design and implement cloud infrastructure solutions for enterprise clients.",
    posted: "1 day ago",
    type: "Full-time"
  },
  {
    id: 26,
    title: "Sales Executive",
    company: "SalesForce Dynamics",
    location: "Bhadradri Kothagudem",
    stipend: "₹20,000",
    duration: "4 months",
    skills: ["Sales", "CRM", "Lead Generation"],
    description: "Drive sales growth through customer relationship management and lead conversion.",
    posted: "3 days ago",
    type: "Part-time"
  },
  {
    id: 27,
    title: "HR Intern",
    company: "PeopleFirst Consulting",
    location: "Mulugu",
    stipend: "₹18,000",
    duration: "3 months",
    skills: ["Recruitment", "HR Policies", "Employee Relations"],
    description: "Support HR operations including recruitment, onboarding, and employee engagement.",
    posted: "6 days ago",
    type: "Internship"
  },
  {
    id: 28,
    title: "Financial Analyst",
    company: "FinanceGrow Advisors",
    location: "Jangaon",
    stipend: "₹32,000",
    duration: "6 months",
    skills: ["Financial Modeling", "Excel", "Analysis"],
    description: "Analyze financial data and provide insights for investment decisions.",
    posted: "2 days ago",
    type: "Internship"
  },
  {
    id: 29,
    title: "Operations Manager",
    company: "OptiMax Logistics",
    location: "Jayashankar Bhupalpally",
    stipend: "₹38,000",
    duration: "7 months",
    skills: ["Operations", "Process Optimization", "Team Management"],
    description: "Oversee daily operations and implement process improvements for efficiency.",
    posted: "4 days ago",
    type: "Full-time"
  },
  {
    id: 30,
    title: "Research Assistant",
    company: "InnoResearch Institute",
    location: "Asifabad",
    stipend: "₹26,000",
    duration: "5 months",
    skills: ["Research Methods", "Data Collection", "Report Writing"],
    description: "Assist in conducting research projects and compiling comprehensive reports.",
    posted: "1 week ago",
    type: "Research"
  }
];

export const useStudentData = () => {
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

  const [appliedJobs, setAppliedJobs] = useState([]);

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

  // Load user data on hook initialization
  useEffect(() => {
    const savedUserData = loadUserData();
    if (savedUserData) {
      setProfile({
        name: savedUserData.name || "",
        email: savedUserData.email || "",
        phone: savedUserData.phone || "",
        location: savedUserData.location || "",
        skills: savedUserData.skills || [],
        education: savedUserData.education || "",
        experience: savedUserData.experience || "",
        resume: "",
        bio: savedUserData.bio || "",
        profilePicture: "",
        portfolioUrl: savedUserData.portfolioUrl || "",
        githubUrl: savedUserData.githubUrl || "",
        linkedinUrl: savedUserData.linkedinUrl || "",
        joinedDate: "2024-01-15"
      });
      
      if (savedUserData.appliedJobs && savedUserData.appliedJobs.length > 0) {
        setAppliedJobs(savedUserData.appliedJobs);
      }
      
      if (savedUserData.name) {
        toast.success(`Welcome back, ${savedUserData.name}!`);
      }
    }

    // Sync job data to global storage
    dataSyncService.syncJobPostings(AVAILABLE_JOBS);
  }, []);

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

  const handleSubmitApplication = (e, selectedJob) => {
    e.preventDefault();
    
    if (!applicationData.fullName || !applicationData.email) {
      toast.error("Please fill in all required fields");
      return false;
    }

    // Create application using the sync service
    const newApplication = applicationSyncService.submitApplication(
      applicationData,
      selectedJob,
      profile
    );

    // Track the application locally for the student
    const updatedAppliedJobs = [...appliedJobs, selectedJob.id];
    setAppliedJobs(updatedAppliedJobs);
    localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));

    // Track action for analytics
    if (profile.email) {
      dataSyncService.trackAction(
        profile.email,
        'student',
        'job_application_submitted',
        {
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          company: selectedJob.company,
          applicationData: {
            fullName: applicationData.fullName,
            email: applicationData.email,
            skills: applicationData.skills
          }
        }
      );
    }

    toast.success(`Application submitted successfully for ${selectedJob.title}!`);
    
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

    return true;
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    
    const userData = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      skills: profile.skills,
      education: profile.education,
      experience: profile.experience,
      bio: profile.bio,
      portfolioUrl: profile.portfolioUrl,
      githubUrl: profile.githubUrl,
      linkedinUrl: profile.linkedinUrl,
      appliedJobs: appliedJobs,
      lastLogin: new Date().toISOString()
    };

    saveUserData(userData);
    toast.success("Profile updated successfully!");
  };

  return {
    profile,
    setProfile,
    appliedJobs,
    applicationData,
    handleInputChange,
    handleFileUpload,
    handleSubmitApplication,
    handleUpdateProfile
  };
};
