
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

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp Innovations",
      location: "Hyderabad",
      stipend: "₹25,000",
      duration: "6 months",
      skills: ["React", "JavaScript", "CSS"],
      description: "Join our dynamic team to build cutting-edge web applications...",
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
      description: "Work on exciting AI projects and gain hands-on experience...",
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
      description: "Create beautiful and intuitive user experiences...",
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
      description: "Develop innovative mobile applications for Android and iOS...",
      posted: "1 week ago",
      type: "Internship"
    }
  ];

  const locations = ["All Locations", "Hyderabad", "Warangal", "Nizamabad", "Karimnagar"];
  const skills = ["All Skills", "React", "JavaScript", "Python", "Machine Learning", "Figma", "Flutter"];

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
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-700 to-teal-500 text-white">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard/student">
                <motion.div whileHover={{ scale: 1.1, x: -5 }}>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </motion.div>
              </Link>
              <h1 className="text-3xl font-bold">Job Board</h1>
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
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                >
                  {locations.map(location => (
                    <option key={location} value={location} className="bg-teal-800 text-white">
                      {location}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                >
                  {skills.map(skill => (
                    <option key={skill} value={skill} className="bg-teal-800 text-white">
                      {skill}
                    </option>
                  ))}
                </select>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-900">
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
          <p className="text-white/80 text-lg">
            Found <span className="font-bold text-white">{filteredJobs.length}</span> opportunities for you
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
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-white/40 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-white mb-2">{job.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-white/70">
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
                      className="bg-teal-500/20 text-teal-200 border-teal-400/30"
                    >
                      {job.type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-white/80 mb-4">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex}
                        variant="outline" 
                        className="border-white/30 text-white/90"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-white/80">
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
                        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8"
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
            <p className="text-white/60 text-xl">No jobs found matching your criteria.</p>
            <p className="text-white/40 mt-2">Try adjusting your filters or search terms.</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default JobBoard;
