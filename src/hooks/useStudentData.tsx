import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { saveUserData, loadUserData } from "@/utils/userStorage";

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
      coverLetter: "",
      skills: "",
      portfolio: "",
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
