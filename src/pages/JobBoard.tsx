import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Filter, MapPin, DollarSign, Clock, Building2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const JobBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  // Expanded jobs with more locations
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
    }
  ];

  const locations = ["All Locations", "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Mahbubnagar", "Adilabad", "Medak", "Rangareddy", "Nalgonda"];
  const skills = ["All Skills", "React", "JavaScript", "Python", "Machine Learning", "Figma", "Flutter", "Node.js", "Docker", "Network Security", "Deep Learning", "Solidity"];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200">
      {/* Header */}
      <header className="glass-card border-b border-neutral-200/80 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard/student">
                <motion.div whileHover={{ scale: 1.05, x: -5 }}>
                  <Button variant="outline" className="border-neutral-300 text-neutral-700 hover:bg-neutral-100">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </motion.div>
              </Link>
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
                    className="pl-10 border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 rounded-md text-neutral-700 focus:border-primary-500 focus:ring-primary-500"
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
                  className="px-3 py-2 border border-neutral-300 rounded-md text-neutral-700 focus:border-primary-500 focus:ring-primary-500"
                >
                  {skills.map(skill => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button className="w-full gradient-primary text-white">
                    <Filter className="w-4 h-4 mr-2" />
                    Apply Filters
                  </Button>
                </motion.div>
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
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <Card className="glass-card hover:shadow-xl transition-all duration-300 group-hover:border-primary-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-neutral-800 mb-2 group-hover:text-primary-700 transition-colors">{job.title}</CardTitle>
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
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        onClick={() => handleApply(job.id, job.title)}
                        className="gradient-primary text-white px-8"
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
            <p className="text-neutral-500 mt-2">Try adjusting your filters or search terms.</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default JobBoard;
