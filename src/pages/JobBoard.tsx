
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200">
      {/* Header */}
      <header className="glass-card border-b border-neutral-200/80 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard/student">
                <Button variant="outline" className="border-neutral-300 text-neutral-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
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
