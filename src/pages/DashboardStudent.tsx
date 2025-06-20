
import { motion } from "framer-motion";
import { useState } from "react";
import { GraduationCap, Search, FileText, User, LogOut, Briefcase, MapPin, Filter, Plus, Edit3, Upload, Building2, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const DashboardStudent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showJobApplication, setShowJobApplication] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Sample student profile data
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+91 9876543210",
    location: "Hyderabad",
    skills: ["React", "JavaScript", "Python", "Node.js"],
    education: "B.Tech Computer Science, JNTUH",
    experience: "6 months internship at TechCorp",
    resume: "alex_resume.pdf"
  });

  // Sample jobs data
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
      location: "Hyderabad",
      stipend: "₹35,000",
      duration: "6 months",
      skills: ["React", "Node.js", "MongoDB"],
      description: "Build end-to-end web applications and work with modern tech stack.",
      posted: "5 days ago",
      type: "Internship"
    }
  ];

  const stats = [
    { title: "Applications Sent", value: "8", icon: FileText },
    { title: "Jobs Applied", value: "12", icon: Briefcase },
    { title: "Profile Views", value: "45", icon: User }
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

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    toast.success(`Applied to ${selectedJob.title} successfully!`);
    setShowJobApplication(false);
    setSelectedJob(null);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
    setShowProfile(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-700 to-teal-500 text-white">
      <header className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Student Dashboard</h1>
                <p className="text-white/60">Welcome back, {profile.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Dialog open={showProfile} onOpenChange={setShowProfile}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-white text-gray-900">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <Input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <Input value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <Input value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <Input value={profile.location} onChange={(e) => setProfile({...profile, location: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
                      <Input 
                        value={profile.skills.join(", ")} 
                        onChange={(e) => setProfile({...profile, skills: e.target.value.split(", ")})} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Education</label>
                      <Input value={profile.education} onChange={(e) => setProfile({...profile, education: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Experience</label>
                      <Input value={profile.experience} onChange={(e) => setProfile({...profile, experience: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Resume</label>
                      <div className="flex items-center space-x-2">
                        <Button type="button" variant="outline" className="border-gray-300">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Resume
                        </Button>
                        <span className="text-sm text-gray-600">{profile.resume}</span>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Update Profile</Button>
                  </form>
                </DialogContent>
              </Dialog>
              
              <Link to="/">
                <Button variant="outline" className="bg-red-500/20 border-red-500/50 text-red-200 hover:bg-red-500/30">
                  <LogOut className="w-4 h-4" />
                </Button>
              </Link>
            </div>
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
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70">{stat.title}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                    <stat.icon className="w-8 h-8 text-teal-300" />
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
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Search Jobs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Search by title or company</label>
                  <Input
                    placeholder="e.g. Frontend Developer"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Location</label>
                  <Input
                    placeholder="e.g. Hyderabad"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Skills</label>
                  <Input
                    placeholder="e.g. React, Python"
                    value={skillFilter}
                    onChange={(e) => setSkillFilter(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Jobs Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Available Jobs ({filteredJobs.length})</h2>
            <Link to="/jobs">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                View All Jobs
              </Button>
            </Link>
          </div>

          <div className="grid gap-6">
            {filteredJobs.slice(0, 4).map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-white/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-white/70 mb-3">
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
                        <p className="text-white/80 mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex}
                              variant="outline" 
                              className="border-teal-400/30 text-teal-200 bg-teal-500/20"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">
                        {job.type}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Posted {job.posted}</span>
                      <Button 
                        onClick={() => handleApplyJob(job)}
                        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                      >
                        Apply Now
                      </Button>
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
              <p className="text-white/60 text-xl">No jobs found matching your criteria.</p>
              <p className="text-white/40 mt-2">Try adjusting your search filters.</p>
            </motion.div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/my-applications">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Button className="w-full h-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg">
                <FileText className="w-6 h-6 mr-3" />
                My Applications
              </Button>
            </motion.div>
          </Link>
          
          <Link to="/application-tracker">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Button className="w-full h-20 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white text-lg">
                <Briefcase className="w-6 h-6 mr-3" />
                Track Applications
              </Button>
            </motion.div>
          </Link>
        </div>
      </main>

      {/* Job Application Modal */}
      <Dialog open={showJobApplication} onOpenChange={setShowJobApplication}>
        <DialogContent className="max-w-2xl bg-white text-gray-900">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitApplication} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Job Details</h4>
              <p><strong>Company:</strong> {selectedJob?.company}</p>
              <p><strong>Location:</strong> {selectedJob?.location}</p>
              <p><strong>Stipend:</strong> {selectedJob?.stipend}/month</p>
              <p><strong>Duration:</strong> {selectedJob?.duration}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Cover Letter</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md h-32"
                placeholder="Write a compelling cover letter explaining why you're perfect for this role..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Resume</label>
              <div className="flex items-center space-x-4">
                <Button type="button" variant="outline" className="border-gray-300">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Resume
                </Button>
                <span className="text-sm text-gray-600">or use current: {profile.resume}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Portfolio/GitHub Link (Optional)</label>
              <Input placeholder="https://github.com/yourusername" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Expected Start Date</label>
              <Input type="date" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Information</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md h-24"
                placeholder="Any additional information you'd like to share..."
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" className="flex-1">
                Submit Application
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowJobApplication(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardStudent;
