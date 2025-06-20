
import { motion } from "framer-motion";
import { Shield, BarChart3, FileCheck, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const DashboardOfficial = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 text-white">
      <header className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Government Dashboard</h1>
                <p className="text-white/60">Welcome, Dr. Rajesh Kumar</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/schemes">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-white/40 transition-all">
                <CardContent className="p-8 text-center">
                  <FileCheck className="w-12 h-12 text-indigo-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Manage Schemes</h3>
                  <p className="text-white/70">Create and manage government schemes</p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Link to="/analytics">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-white/40 transition-all">
                <CardContent className="p-8 text-center">
                  <BarChart3 className="w-12 h-12 text-indigo-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
                  <p className="text-white/70">View district-level insights</p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Link to="/feedback">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-white/40 transition-all">
                <CardContent className="p-8 text-center">
                  <Settings className="w-12 h-12 text-indigo-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Feedback</h3>
                  <p className="text-white/70">Review sentiment analysis</p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DashboardOfficial;
