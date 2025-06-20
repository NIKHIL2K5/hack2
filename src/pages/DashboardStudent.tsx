
import { motion } from "framer-motion";
import { GraduationCap, Search, FileText, Settings, Briefcase, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DashboardStudent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-sm text-gray-600">Find your next opportunity!</p>
            </div>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Profile</span>
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input 
                    placeholder="Search for internships, jobs, or companies..." 
                    className="w-full"
                  />
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Applications", value: "8", change: "3 pending", color: "text-teal-600" },
            { title: "Profile Views", value: "24", change: "+6 this week", color: "text-blue-600" },
            { title: "Skill Matches", value: "15", change: "React, Node.js", color: "text-green-600" },
            { title: "Recommendations", value: "12", change: "AI suggested", color: "text-purple-600" }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.change}</p>
                    </div>
                    <Star className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Browse Jobs",
              description: "Find internships and job opportunities",
              icon: Briefcase,
              color: "bg-teal-600",
              action: "Browse All"
            },
            {
              title: "My Applications",
              description: "Track your application status",
              icon: FileText,
              color: "bg-blue-600", 
              action: "View Status"
            },
            {
              title: "AI Recommendations",
              description: "Jobs matched to your skills",
              icon: Star,
              color: "bg-purple-600",
              action: "See Matches"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Button className={`w-full ${item.color} hover:opacity-90 text-white`}>
                    {item.action}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Frontend Developer Intern", company: "TechStart Hyderabad", stipend: "₹15,000/month", skills: "React, JavaScript" },
                { title: "UI/UX Design Intern", company: "Design Studio", stipend: "₹12,000/month", skills: "Figma, Photoshop" },
                { title: "Backend Developer", company: "CloudTech Solutions", stipend: "₹20,000/month", skills: "Node.js, MongoDB" }
              ].map((job, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                    <p className="text-sm text-gray-500">{job.skills}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-teal-600">{job.stipend}</p>
                    <Button size="sm" className="mt-2 bg-teal-600 hover:bg-teal-700 text-white">
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStudent;
