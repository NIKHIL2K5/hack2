
import { motion } from "framer-motion";
import { GraduationCap, Search, FileText, User, LogOut, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const DashboardStudent = () => {
  const stats = [
    { title: "Applications Sent", value: "8", icon: FileText },
    { title: "Jobs Applied", value: "12", icon: Briefcase },
    { title: "Profile Views", value: "45", icon: User }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-700 to-teal-500 text-white">
      <header className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Student Dashboard</h1>
                <p className="text-white/60">Welcome back, Alex Johnson</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70">{stat.title}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                    <stat.icon className="w-8 h-8 text-teal-300" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/jobs">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Button className="w-full h-20 bg-gradient-to-r from-teal-500 to-teal-700 text-white text-lg">
                <Search className="w-6 h-6 mr-3" />
                Browse Jobs
              </Button>
            </motion.div>
          </Link>
          
          <Link to="/my-applications">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Button className="w-full h-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg">
                <FileText className="w-6 h-6 mr-3" />
                My Applications
              </Button>
            </motion.div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DashboardStudent;
