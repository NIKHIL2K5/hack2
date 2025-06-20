import { motion } from "framer-motion";
import { useState } from "react";
import { GraduationCap, Search, FileText, User, LogOut, Briefcase, MapPin, Filter, Plus, Edit3, Upload, Building2, Clock, DollarSign, Phone, Mail, Calendar, Globe, Github, Linkedin, Eye, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
    // Don't pre-populate form with profile data
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
      <header className="glass-card border-b border-neutral-200/80 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 relative">
                <img 
                  src="/lovable-uploads/dc27c7bf-1e1d-4fb1-a5c7-01b85351db67.png" 
                  alt="GovStartup Navigator"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-700">Student Dashboard</h1>
                <p className="text-neutral-600">Welcome back{profile.name ? `, ${profile.name}` : ""}</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Dialog open={showProfile} onOpenChange={setShowProfile}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-neutral-300 text-neutral-700 hover:bg-neutral-100">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-gray-900">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">My Profile</DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Profile Summary */}
                    <div className="lg:col-span-1">
                      <Card className="mb-6">
                        <CardContent className="p-6 text-center">
                          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            {profile.profilePicture ? (
                              <img src={profile.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <User className="w-12 h-12 text-white" />
                            )}
                          </div>
                          <h3 className="text-xl font-bold mb-2">{profile.name || "Add Your Name"}</h3>
                          <p className="text-gray-600 mb-4">{profile.location || "Add Location"}</p>
                          <Badge className="bg-green-100 text-green-800">
                            Member since {new Date(profile.joinedDate).toLocaleDateString()}
                          </Badge>
                        </CardContent>
                      </Card>

                      {/* Applied Companies */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <Building2 className="w-5 h-5 mr-2" />
                            Applied Companies ({appliedJobs.length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {appliedJobs.map((job) => (
                            <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-sm">{job.company}</p>
                                <p className="text-xs text-gray-600">{job.title}</p>
                              </div>
                              <Badge className={job.statusColor}>
                                <job.icon className="w-3 h-3 mr-1" />
                                {job.status}
                              </Badge>
                            </div>
                          ))}
                          {appliedJobs.length === 0 && (
                            <p className="text-gray-500 text-center py-4">No applications yet</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                      <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <Input 
                                  value={profile.name} 
                                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                                  placeholder="Enter your full name"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <Input 
                                  type="email"
                                  value={profile.email} 
                                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                                  placeholder="your.email@example.com"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <Input 
                                  value={profile.phone} 
                                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                                  placeholder="+91 9876543210"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Location</label>
                                <Input 
                                  value={profile.location} 
                                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                                  placeholder="City, State"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Bio</label>
                              <Textarea 
                                value={profile.bio} 
                                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                placeholder="Tell us about yourself..."
                                className="h-24"
                              />
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Professional Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
                              <Input 
                                value={profile.skills.join(", ")} 
                                onChange={(e) => setProfile({...profile, skills: e.target.value.split(", ").filter(Boolean)})}
                                placeholder="React, JavaScript, Python, etc."
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Education</label>
                              <Textarea 
                                value={profile.education} 
                                onChange={(e) => setProfile({...profile, education: e.target.value})}
                                placeholder="Your educational background..."
                                className="h-20"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Experience</label>
                              <Textarea 
                                value={profile.experience} 
                                onChange={(e) => setProfile({...profile, experience: e.target.value})}
                                placeholder="Your work experience, internships, projects..."
                                className="h-24"
                              />
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
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
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">GitHub</label>
                                <Input 
                                  value={profile.githubUrl} 
                                  onChange={(e) => setProfile({...profile, githubUrl: e.target.value})}
                                  placeholder="https://github.com/username"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">LinkedIn</label>
                                <Input 
                                  value={profile.linkedinUrl} 
                                  onChange={(e) => setProfile({...profile, linkedinUrl: e.target.value})}
                                  placeholder="https://linkedin.com/in/username"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Resume</label>
                              <div className="flex items-center space-x-2">
                                <Button type="button" variant="outline" className="border-gray-300">
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

                        <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
                          Update Profile
                        </Button>
                      </form>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Link to="/">
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                  <LogOut className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Card className="glass-card hover:shadow-xl transition-all duration-300 group-hover:border-primary-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-600 text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold text-primary-700 mt-1">{stat.value}</p>
                    </div>
                    <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                      <stat.icon className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="glass-card border-neutral-200">
            <CardHeader>
              <CardTitle className="text-neutral-800 flex items-center">
                <Search className="w-5 h-5 mr-2 text-primary-600" />
                Search Jobs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-700 text-sm mb-2 font-medium">Search by title or company</label>
                  <Input
                    placeholder="e.g. Frontend Developer"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 text-sm mb-2 font-medium">Location</label>
                  <Input
                    placeholder="e.g. Hyderabad"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 text-sm mb-2 font-medium">Skills</label>
                  <Input
                    placeholder="e.g. React, Python"
                    value={skillFilter}
                    onChange={(e) => setSkillFilter(e.target.value)}
                    className="border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

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
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card className="glass-card hover:shadow-xl transition-all duration-300 group-hover:border-primary-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-neutral-800 mb-2 group-hover:text-primary-700 transition-colors">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-neutral-600 mb-3 text-sm">
                          <div className="flex items-center">
                            <Building2 className="w-4 h-4 mr-1" />
                            {job.company}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.stipend}/month
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.duration}
                          </div>
                        </div>
                        <p className="text-neutral-700 mb-4 leading-relaxed">{job.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex}
                              variant="outline" 
                              className="border-accent-300 text-accent-700 bg-accent-50 hover:bg-accent-100 transition-colors"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge className="bg-primary-100 text-primary-700 border-primary-300 font-medium">
                        {job.type}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 text-sm">Posted {job.posted}</span>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          onClick={() => handleApplyJob(job)}
                          className="gradient-primary text-white hover:opacity-90 transition-opacity"
                        >
                          Apply Now
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
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

      {/* Enhanced Job Application Modal */}
      <Dialog open={showJobApplication} onOpenChange={setShowJobApplication}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-gray-900">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-2xl font-bold text-center text-primary-700">
              Apply for {selectedJob?.title}
            </DialogTitle>
            <div className="text-center text-neutral-600 mt-2">
              <p className="flex items-center justify-center gap-2">
                <Building2 className="w-4 h-4" />
                {selectedJob?.company} • {selectedJob?.location}
              </p>
            </div>
          </DialogHeader>
          
          <form onSubmit={handleSubmitApplication} className="space-y-6 py-4">
            {/* Personal Information Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input
                    value={applicationData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <Input
                    type="email"
                    value={applicationData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <Input
                    type="tel"
                    value={applicationData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 9876543210"
                    required
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Current Location</label>
                  <Input
                    value={applicationData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State"
                    className="border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                Professional Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Education Background</label>
                  <Textarea
                    value={applicationData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    placeholder="e.g., B.Tech Computer Science, JNTUH (2020-2024)"
                    className="border-gray-300 h-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Experience</label>
                  <Textarea
                    value={applicationData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="Describe your relevant work experience, internships, projects..."
                    className="border-gray-300 h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Skills (comma separated)</label>
                  <Input
                    value={applicationData.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    placeholder="React, JavaScript, Python, Node.js, etc."
                    className="border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Application Details Section */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-600" />
                Application Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cover Letter *</label>
                  <Textarea
                    value={applicationData.coverLetter}
                    onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                    placeholder="Write a compelling cover letter explaining why you're perfect for this role..."
                    className="border-gray-300 h-32"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expected Salary/Stipend</label>
                    <Input
                      value={applicationData.expectedSalary}
                      onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                      placeholder="₹25,000 per month"
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Available From</label>
                    <Input
                      type="date"
                      value={applicationData.availableFrom}
                      onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Work Mode Preference</label>
                  <select
                    value={applicationData.workMode}
                    onChange={(e) => handleInputChange('workMode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="remote">Remote</option>
                    <option value="onsite">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Portfolio & Resume Section */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-purple-600" />
                Portfolio & Resume
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Resume/CV *</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Resume
                    </label>
                    {applicationData.resumeFile && (
                      <span className="text-sm text-green-600 font-medium">
                        ✓ {applicationData.resumeFile.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Portfolio URL</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        value={applicationData.portfolioUrl}
                        onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                        placeholder="https://yourportfolio.com"
                        className="border-gray-300 pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">GitHub Profile</label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        value={applicationData.githubUrl}
                        onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                        placeholder="https://github.com/username"
                        className="border-gray-300 pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        value={applicationData.linkedinUrl}
                        onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="border-gray-300 pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <Textarea
                value={applicationData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                placeholder="Any additional information you'd like to share (achievements, certifications, etc.)..."
                className="border-gray-300 h-24"
              />
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowJobApplication(false)}
                className="flex-1 border-gray-300 text-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardStudent;
