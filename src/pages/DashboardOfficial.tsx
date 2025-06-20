
import { motion } from "framer-motion";
import { Shield, Users, FileCheck, TrendingUp, LogOut, Building2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useOfficialData } from "@/hooks/useOfficialData";
import { ApplicationsTable } from "@/components/official/ApplicationsTable";
import { ApplicationStats } from "@/components/official/ApplicationStats";

const DashboardOfficial = () => {
  const { officialUser, applications, getApplicationStats } = useOfficialData();
  const stats = getApplicationStats();

  if (!officialUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8">
          <CardContent className="text-center text-white">
            <Shield className="w-16 h-16 mx-auto mb-4 text-red-300" />
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-white/70 mb-4">Please log in as an authorized official</p>
            <Link to="/login/official">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getOrgTypeColor = (type: string) => {
    switch (type) {
      case 'corporate': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'government': return 'bg-green-100 text-green-700 border-green-300';
      case 'educational': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'research': return 'bg-orange-100 text-orange-700 border-orange-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 text-white">
      <header className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold">{officialUser.organization.name}</h1>
                  <Badge className={getOrgTypeColor(officialUser.organization.type)}>
                    {officialUser.organization.type}
                  </Badge>
                </div>
                <div className="flex items-center text-white/60 text-sm">
                  <Mail className="w-4 h-4 mr-2" />
                  {officialUser.email} • {officialUser.department}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-white/80">Welcome, {officialUser.name}</span>
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
        <ApplicationStats stats={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/schemes">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-white/40 transition-all">
                <CardContent className="p-6 text-center">
                  <FileCheck className="w-10 h-10 text-indigo-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-1">Manage Jobs</h3>
                  <p className="text-white/70 text-sm">Post & edit job listings</p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Link to="/analytics">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-white/40 transition-all">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-10 h-10 text-indigo-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-1">Analytics</h3>
                  <p className="text-white/70 text-sm">View hiring insights</p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Link to="/feedback">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-white/40 transition-all">
                <CardContent className="p-6 text-center">
                  <Users className="w-10 h-10 text-indigo-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-1">Feedback</h3>
                  <p className="text-white/70 text-sm">Candidate reviews</p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6 text-center">
              <Shield className="w-10 h-10 text-indigo-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">Settings</h3>
              <p className="text-white/70 text-sm">Organization config</p>
            </CardContent>
          </Card>
        </div>

        <ApplicationsTable applications={applications} />
      </main>
    </div>
  );
};

export default DashboardOfficial;
