import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Building2, Plus, Users, FileText, Bot, Settings, LogOut, Briefcase, CheckCircle, User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useOfficialData } from "@/hooks/useOfficialData";
import { Scene3D } from "@/components/3d/Scene3D";
import { JobPostingModal } from "@/components/official/JobPostingModal";
import { JobManagement } from "@/components/official/JobManagement";
import { StartupProfile } from "@/components/official/StartupProfile";
import { dataSyncService } from "@/services/dataSync";
import { authService } from "@/services/authService";

const DashboardStartup = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [hasValidAccess, setHasValidAccess] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const { getApplicationStats, officialUser } = useOfficialData();
  const stats = getApplicationStats();

  useEffect(() => {
    // Check if user is logged in
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login/startup');
      return;
    }
    
    if (currentUser.role !== 'startup') {
      navigate(`/dashboard/${currentUser.role}`);
      return;
    }
    
    setUserEmail(currentUser.email);
    setOrganizationName(currentUser.organization || 'Your Organization');
    
    // Track dashboard access
    dataSyncService.trackAction(
      currentUser.email,
      'startup',
      'dashboard_access',
      { timestamp: new Date().toISOString() },
      currentUser.organization
    );
  }, [navigate]);

  // Track tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      dataSyncService.trackAction(
        currentUser.email,
        'startup',
        'tab_change',
        { tab: tabId },
        currentUser.organization
      );
    }
  };

  // Track job posting modal
  const handlePostJob = () => {
    setIsJobModalOpen(true);
    
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      dataSyncService.trackAction(
        currentUser.email,
        'startup',
        'job_posting_modal_opened',
        {},
        currentUser.organization
      );
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const dashboardStats = [
    { title: "Active Jobs", value: "12", icon: Briefcase, color: "text-blue-500" },
    { title: "Total Applications", value: stats.total.toString(), icon: Users, color: "text-teal-500" },
    { title: "Accepted Applications", value: stats.shortlisted.toString(), icon: CheckCircle, color: "text-green-500" },
    { title: "Pending Review", value: stats.pending.toString(), icon: FileText, color: "text-yellow-500" }
  ];

  const recentJobs = [
    { title: "Frontend Developer Intern", applications: stats.pending + 5, status: "Active" },
    { title: "Data Science Intern", applications: stats.reviewed + 8, status: "Active" },
    { title: "UI/UX Designer", applications: stats.shortlisted + 3, status: "Active" },
    { title: "Backend Developer", applications: stats.rejected + 2, status: "Closed" }
  ];

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
                <h1 className="text-2xl font-bold">{organizationName} Dashboard</h1>
                <p className="text-white/60">Manage applications and job postings</p>
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
              
              <Link to="/profile-settings">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Settings className="w-4 h-4" />
                  </Button>
                </motion.div>
              </Link>
              
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button 
                  variant="outline" 
                  className="bg-red-500/20 border-red-500/50 text-red-200 hover:bg-red-500/30"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="relative z-10 container mx-auto px-6 py-4">
        <div className="flex space-x-4 mb-6">
          {[
            { id: "overview", label: "Overview" },
            { id: "profile", label: "Profile", icon: User },
            { id: "jobs", label: "Job Postings" },
            { id: "applications", label: "Applications" }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTabChange(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {tab.icon && <tab.icon className="w-4 h-4 mr-2" />}
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 pb-8">
        {activeTab === "overview" && (
          <>
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {dashboardStats.map((stat, index) => (
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
              
              <Link to="/applications">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button className="w-full h-20 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white text-lg font-semibold">
                    <Users className="w-6 h-6 mr-3" />
                    Manage Applications
                  </Button>
                </motion.div>
              </Link>
              
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
                  <CardTitle className="text-white text-xl">Recent Job Postings & Applications</CardTitle>
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
                          <p className="text-white/60">{job.applications} applications received</p>
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
          </>
        )}

        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <StartupProfile 
              userEmail={userEmail} 
              organizationName={organizationName} 
            />
          </motion.div>
        )}

        {activeTab === "jobs" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Job Management</h2>
              <Button
                onClick={handlePostJob}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                Post New Job
              </Button>
            </div>
            <JobManagement organizationName={organizationName} />
          </motion.div>
        )}

        {activeTab === "applications" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Application Management</h2>
              <Link to="/applications">
                <Button className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white">
                  <Users className="w-5 h-5 mr-2" />
                  View All Applications
                </Button>
              </Link>
            </div>
            <p className="text-white/60 text-lg">
              Click "View All Applications" to access the full application management system.
            </p>
          </motion.div>
        )}
      </main>

      {/* Job Posting Modal */}
      <JobPostingModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        organizationName={organizationName}
      />
    </div>
  );
};

export default DashboardStartup;