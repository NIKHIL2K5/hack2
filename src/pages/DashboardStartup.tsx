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
import { isValidOfficialEmail } from "@/services/officialAuth";
import { dataSyncService } from "@/services/dataSync";

const DashboardStartup = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [hasValidAccess, setHasValidAccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { getApplicationStats, officialUser } = useOfficialData();
  const stats = getApplicationStats();

  useEffect(() => {
    // Check if user has valid org.in email access
    const storedUser = localStorage.getItem('officialUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const email = user.email;
      setUserEmail(email);
      
      if (isValidOfficialEmail(email)) {
        setHasValidAccess(true);
        
        // Track dashboard access
        dataSyncService.trackAction(
          email,
          'startup',
          'dashboard_access',
          { timestamp: new Date().toISOString() },
          user.organization?.name
        );
      } else {
        setHasValidAccess(false);
      }
    } else {
      setHasValidAccess(false);
    }
  }, []);

  // Track tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    
    if (officialUser) {
      dataSyncService.trackAction(
        officialUser.email,
        'startup',
        'tab_change',
        { tab: tabId },
        officialUser.organization.name
      );
    }
  };

  // Track job posting modal
  const handlePostJob = () => {
    setIsJobModalOpen(true);
    
    if (officialUser) {
      dataSyncService.trackAction(
        officialUser.email,
        'startup',
        'job_posting_modal_opened',
        {},
        officialUser.organization.name
      );
    }
  };

  // If user doesn't have valid access, show access denied message
  if (!hasValidAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-red-300/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-300" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Access Restricted</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-red-500/20 border-red-400/50">
                <AlertTriangle className="h-4 w-4 text-red-300" />
                <AlertTitle className="text-red-200">Organization Email Required</AlertTitle>
                <AlertDescription className="text-red-100">
                  Only official organization emails ending with "org.in" are allowed to access the startup dashboard.
                </AlertDescription>
              </Alert>
              
              {userEmail && (
                <div className="text-center">
                  <p className="text-white/70 text-sm mb-2">Current email:</p>
                  <p className="text-white font-mono bg-white/10 rounded px-3 py-2">{userEmail}</p>
                </div>
              )}
              
              <div className="text-center space-y-4">
                <p className="text-white/80">
                  Please contact your organization administrator or use a valid organization email to access this dashboard.
                </p>
                
                <div className="flex flex-col space-y-2">
                  <Link to="/login/startup">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Login with Organization Email
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold">{officialUser?.organization.name || 'Partner Organization'} Dashboard</h1>
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
              userEmail={officialUser?.email || ''} 
              organizationName={officialUser?.organization.name || 'Unknown Organization'} 
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
            <JobManagement organizationName={officialUser?.organization.name || 'Unknown Organization'} />
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
        organizationName={officialUser?.organization.name || 'Unknown Organization'}
      />
    </div>
  );
};

export default DashboardStartup;