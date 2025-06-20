
import { motion } from "framer-motion";
import { useState } from "react";
import { Building2, Plus, Users, FileText, Bot, Settings, LogOut, Briefcase, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Canvas } from "@react-three/fiber";
import { Float, Box, Sphere } from "@react-three/drei";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const FloatingShape = ({ position, color, shape = "box" }: any) => (
  <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
    <mesh position={position}>
      {shape === "box" ? <boxGeometry args={[0.5, 0.5, 0.5]} /> : <sphereGeometry args={[0.3]} />}
      <meshStandardMaterial color={color} />
    </mesh>
  </Float>
);

const Scene3D = () => (
  <Canvas camera={{ position: [0, 0, 5] }}>
    <ambientLight intensity={0.3} />
    <directionalLight position={[5, 5, 5]} intensity={0.5} />
    <FloatingShape position={[-2, 1, 0]} color="#3b82f6" shape="box" />
    <FloatingShape position={[2, -1, 0]} color="#14b8a6" shape="sphere" />
    <FloatingShape position={[0, 2, -1]} color="#6366f1" shape="box" />
  </Canvas>
);

const DashboardStartup = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { title: "Active Jobs", value: "12", icon: Briefcase, color: "text-blue-500" },
    { title: "Applications", value: "48", icon: Users, color: "text-teal-500" },
    { title: "Compliance Score", value: "92%", icon: CheckCircle, color: "text-green-500" },
    { title: "Scheme Matches", value: "8", icon: FileText, color: "text-purple-500" }
  ];

  const recentJobs = [
    { title: "Frontend Developer Intern", applications: 15, status: "Active" },
    { title: "Data Science Intern", applications: 23, status: "Active" },
    { title: "UI/UX Designer", applications: 10, status: "Closed" }
  ];

  const handlePostJob = () => {
    toast.success("Job posting form opened!");
  };

  const handleViewApplications = () => {
    toast.info("Viewing applications...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white">
      {/* 3D Background */}
      <div className="fixed inset-0 opacity-10">
        <Scene3D />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Startup Dashboard</h1>
                <p className="text-white/60">Welcome back, TechCorp Innovations</p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <Link to="/chatbot">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Bot className="w-4 h-4 mr-2" />
                    AI Assistant
                  </Button>
                </motion.div>
              </Link>
              
              <Link to="/profile">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Settings className="w-4 h-4" />
                  </Button>
                </motion.div>
              </Link>
              
              <Link to="/">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button variant="outline" className="bg-red-500/20 border-red-500/50 text-red-200 hover:bg-red-500/30">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:border-white/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">{stat.title}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-r from-white/10 to-white/5`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div whileHover={{ scale: 1.02 }}>
            <Button
              onClick={handlePostJob}
              className="w-full h-20 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-lg font-semibold"
            >
              <Plus className="w-6 h-6 mr-3" />
              Post New Job
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }}>
            <Button
              onClick={handleViewApplications}
              className="w-full h-20 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white text-lg font-semibold"
            >
              <Users className="w-6 h-6 mr-3" />
              View Applications
            </Button>
          </motion.div>
          
          <Link to="/compliance">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Button className="w-full h-20 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white text-lg font-semibold">
                <CheckCircle className="w-6 h-6 mr-3" />
                Compliance Tracker
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Recent Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-xl">Recent Job Postings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentJobs.map((job, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div>
                      <h3 className="text-white font-semibold">{job.title}</h3>
                      <p className="text-white/60">{job.applications} applications</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      job.status === "Active" 
                        ? "bg-green-500/20 text-green-300" 
                        : "bg-gray-500/20 text-gray-300"
                    }`}>
                      {job.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardStartup;
