
import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, FileText, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { ApplicationStats } from "@/components/official/ApplicationStats";
import { ApplicationsTable } from "@/components/official/ApplicationsTable";
import { useOfficialData } from "@/hooks/useOfficialData";

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

const ApplicationsManagement = () => {
  const { applications, getApplicationStats } = useOfficialData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const stats = getApplicationStats();

  // Filter and sort applications
  const filteredApplications = applications
    .filter(app => {
      const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
        case "oldest":
          return new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime();
        case "name":
          return a.studentName.localeCompare(b.studentName);
        default:
          return 0;
      }
    });

  const handleExportApplications = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Student Name,Email,Job Title,Applied Date,Status,Skills\n"
      + filteredApplications.map(app => 
          `"${app.studentName}","${app.studentEmail}","${app.jobTitle}","${app.appliedAt}","${app.status}","${app.skills.join('; ')}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "applications.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <div className="flex items-center space-x-4">
              <Link to="/dashboard/startup">
                <motion.div whileHover={{ scale: 1.1, x: -5 }}>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </motion.div>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Applications Management</h1>
                <p className="text-white/60">Manage and review job applications</p>
              </div>
            </div>
            
            <Button
              onClick={handleExportApplications}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Statistics */}
        <ApplicationStats stats={stats} />

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm">Search Applications</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input
                      placeholder="Search by name, email, or job title..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-white/80 text-sm">Filter by Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-white/80 text-sm">Sort by</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <ApplicationsTable applications={filteredApplications} />
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8"
        >
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between text-white/70">
                <div className="flex items-center space-x-4">
                  <FileText className="w-5 h-5" />
                  <span>Showing {filteredApplications.length} of {applications.length} applications</span>
                </div>
                <div className="text-sm">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default ApplicationsManagement;
