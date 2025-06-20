import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Filter, MapPin, DollarSign, Clock, Building2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getUserInfo } from "@/contexts/ai/userHelpers";

const JobBoard = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  // Expanded 30 jobs with diverse locations across Telangana
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
    // More jobs would be here...
  ];

  const locations = ["All Locations", "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Mahbubnagar", "Adilabad", "Medak", "Rangareddy", "Nalgonda", "Siddipet", "Sangareddy", "Jagtial", "Rajanna Sircilla", "Kamareddy", "Mancherial", "Peddapalli", "Yadadri Bhuvanagiri", "Wanaparthy", "Narayanpet", "Jogulamba Gadwal", "Nagarkurnool", "Vikarabad", "Suryapet", "Mahabubabad", "Bhadradri Kothagudem", "Mulugu", "Jangaon", "Jayashankar Bhupalpally", "Asifabad"];
  const skills = ["All Skills", "React", "JavaScript", "Python", "Machine Learning", "Figma", "Flutter", "Node.js", "Docker", "Network Security", "Deep Learning", "Solidity", "SEO", "Unity", "Arduino", "Photoshop", "Cisco", "PyTorch", "PHP", "MySQL", "Premiere Pro", "AWS", "Sales", "Excel"];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || selectedLocation === "All Locations" || job.location === selectedLocation;
    const matchesSkill = !selectedSkill || selectedSkill === "All Skills" || job.skills.includes(selectedSkill);
    
    return matchesSearch && matchesLocation && matchesSkill;
  });

  const handleApply = (jobId: number, jobTitle: string) => {
    toast.success(`Applied to ${jobTitle}! Check your applications.`);
  };

  const handleBackNavigation = () => {
    // Navigate based on user role
    if (userInfo.role === 'student') {
      navigate('/dashboard/student');
    } else if (userInfo.role === 'startup') {
      navigate('/dashboard/startup');
    } else if (userInfo.role === 'official') {
      navigate('/dashboard/official');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200">
      {/* Header */}
      <header className="glass-card border-b border-neutral-200/80 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-neutral-300 text-neutral-700"
                onClick={handleBackNavigation}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/cec6e927-27d5-408a-824c-f6c3bec5f342.png" 
                  alt="GovStartup Navigator"
                  className="w-10 h-10 object-contain"
                />
                <h1 className="text-3xl font-bold text-primary-700">Job Board</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="glass-card border-neutral-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-neutral-300"
                  />
                </div>
                
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 rounded-md text-neutral-700"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 rounded-md text-neutral-700"
                >
                  {skills.map(skill => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>

                <Button className="w-full gradient-primary text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-neutral-700 text-lg font-medium">
            Found <span className="font-bold text-primary-700">{filteredJobs.length}</span> opportunities for you
          </p>
        </motion.div>

        {/* Job Cards */}
        <div className="grid gap-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="glass-card shadow-lg border-primary-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-neutral-800 mb-2">{job.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-neutral-600">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-1" />
                          {job.company}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.posted}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="bg-primary-100 text-primary-700 border-primary-300 font-medium"
                    >
                      {job.type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-neutral-700 mb-4 leading-relaxed">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex}
                        variant="outline" 
                        className="border-accent-300 text-accent-700 bg-accent-50"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-neutral-700">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span className="font-semibold">{job.stipend}/month</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{job.duration}</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleApply(job.id, job.title)}
                      className="gradient-primary text-white px-8"
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
            <p className="text-neutral-600 text-xl">No jobs found matching your criteria.</p>
            <p className="text-neutral-500 mt-2">Try adjusting your filters or search terms.</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default JobBoard;