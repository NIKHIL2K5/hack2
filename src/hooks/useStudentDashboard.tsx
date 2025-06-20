
import { useState, useEffect } from 'react';
import { getAllCompanies, getDistrictsWithCompanies, getSectorsWithCompanies } from '@/services/companyData';
import { dataSyncService } from '@/services/dataSync';

export const useStudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companies, setCompanies] = useState(getAllCompanies());
  const [availableDistricts] = useState(getDistrictsWithCompanies());
  const [availableSectors] = useState(getSectorsWithCompanies());

  // Job search states
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  
  // Modal states
  const [showProfile, setShowProfile] = useState(false);
  const [showJobApplication, setShowJobApplication] = useState(false);
  
  // Profile and application states
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+91 9876543210',
    location: 'Hyderabad',
    education: 'B.Tech Computer Science',
    skills: 'React, Node.js, Python',
    experience: 'Fresher',
    resume: null,
    portfolio: '',
    linkedin: '',
    github: ''
  });
  
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resume: null,
    expectedSalary: '',
    availableFrom: ''
  });

  // Sample jobs data
  const allJobs = [
    { id: 1, title: 'Software Developer Intern', company: 'TechVenture Solutions', location: 'Hyderabad', stipend: '₹15,000/month', duration: '6 months', skills: ['React', 'JavaScript', 'Node.js'], description: 'Work on cutting-edge web applications', posted: '2 days ago', type: 'Internship' },
    { id: 2, title: 'Data Analyst Intern', company: 'HealthTech Innovations', location: 'Hyderabad', stipend: '₹12,000/month', duration: '4 months', skills: ['Python', 'SQL', 'Excel'], description: 'Analyze healthcare data for insights', posted: '1 day ago', type: 'Internship' },
    { id: 3, title: 'Frontend Developer', company: 'FinPay Solutions', location: 'Hyderabad', stipend: '₹20,000/month', duration: '12 months', skills: ['React', 'TypeScript', 'CSS'], description: 'Build responsive financial applications', posted: '3 days ago', type: 'Full-time' },
    { id: 4, title: 'UI/UX Designer Intern', company: 'EduTech Global', location: 'Hyderabad', stipend: '₹10,000/month', duration: '6 months', skills: ['Figma', 'Adobe XD', 'Prototyping'], description: 'Design intuitive educational interfaces', posted: '1 week ago', type: 'Internship' },
    { id: 5, title: 'IoT Developer', company: 'Smart Manufacturing Co', location: 'Karimnagar', stipend: '₹18,000/month', duration: '8 months', skills: ['Arduino', 'Raspberry Pi', 'C++'], description: 'Develop IoT solutions for manufacturing', posted: '4 days ago', type: 'Contract' }
  ];

  // Filter jobs based on search criteria
  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === '' || 
      job.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesSkills = skillFilter === '' ||
      job.skills.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()));
    
    return matchesSearch && matchesLocation && matchesSkills;
  });

  const stats = {
    totalApplications: 45,
    pendingReviews: 12,
    interviews: 3,
    rejections: 8,
    acceptances: 2
  };

  const recentApplications = [
    { company: 'TechVenture Solutions', position: 'Software Developer Intern', status: 'Under Review', appliedDate: '2024-01-15' },
    { company: 'HealthTech Innovations', position: 'Data Analyst Intern', status: 'Interview Scheduled', appliedDate: '2024-01-12' },
    { company: 'FinPay Solutions', position: 'Frontend Developer', status: 'Accepted', appliedDate: '2024-01-10' },
    { company: 'GreenTech Innovations', position: 'Product Manager Intern', status: 'Rejected', appliedDate: '2024-01-08' }
  ];

  const savedJobs = [
    { id: 1, company: 'EduTech Global', position: 'UI/UX Designer Intern', location: 'Hyderabad', savedDate: '2024-01-18' },
    { id: 2, company: 'Smart Manufacturing Co', position: 'IoT Developer', location: 'Karimnagar', savedDate: '2024-01-17' },
    { id: 3, company: 'BioTech Solutions', position: 'Research Intern', location: 'Nizamabad', savedDate: '2024-01-16' }
  ];

  // Handlers
  const handleInputChange = (field: string, value: string) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setApplicationData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleApplyJob = (job: any) => {
    setSelectedJob(job);
    setShowJobApplication(true);
  };

  const handleSubmitJobApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedJob) {
      const newApplication = {
        id: Date.now(),
        jobId: selectedJob.id,
        company: selectedJob.company,
        position: selectedJob.title,
        status: 'Applied',
        appliedDate: new Date().toISOString().split('T')[0],
        ...applicationData
      };
      
      setAppliedJobs(prev => [...prev, newApplication]);
      setShowJobApplication(false);
      setApplicationData({
        coverLetter: '',
        resume: null,
        expectedSalary: '',
        availableFrom: ''
      });
      
      // Track application in data sync
      dataSyncService.trackAction(
        profile.email,
        'student',
        'job_application_submitted',
        newApplication
      );
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setShowProfile(false);
    
    // Track profile update
    dataSyncService.trackAction(
      profile.email,
      'student',
      'profile_updated',
      profile
    );
  };

  return {
    activeTab,
    setActiveTab,
    stats,
    recentApplications,
    savedJobs,
    companies,
    availableDistricts,
    availableSectors,
    
    // Job search props
    searchTerm,
    setSearchTerm,
    locationFilter,
    setLocationFilter,
    skillFilter,
    setSkillFilter,
    
    // Modal props
    showProfile,
    setShowProfile,
    showJobApplication,
    setShowJobApplication,
    
    // Data props
    profile,
    setProfile,
    appliedJobs,
    filteredJobs,
    selectedJob,
    applicationData,
    
    // Handler props
    handleInputChange,
    handleFileUpload,
    handleApplyJob,
    handleSubmitJobApplication,
    handleUpdateProfile
  };
};
