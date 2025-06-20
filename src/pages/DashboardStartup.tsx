
import { motion } from "framer-motion";
import { Building2, PlusCircle, FileText, Bot, Settings, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardStartup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Startup Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, Founder!</p>
            </div>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Profile</span>
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Active Jobs", value: "12", change: "+3 this week", color: "text-blue-600" },
            { title: "Applications", value: "48", change: "+12 new", color: "text-green-600" },
            { title: "Compliance Score", value: "85%", change: "+5% this month", color: "text-orange-600" },
            { title: "Scheme Matches", value: "6", change: "2 pending review", color: "text-purple-600" }
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
                    <TrendingUp className={`w-8 h-8 ${stat.color}`} />
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
              title: "Post New Job",
              description: "Create internship or job postings",
              icon: PlusCircle,
              color: "bg-blue-600",
              action: "Post Job"
            },
            {
              title: "View Applications",
              description: "Review student applications",
              icon: Users,
              color: "bg-green-600",
              action: "View All"
            },
            {
              title: "Compliance Tracker",
              description: "MSME, GST, DPIIT status",
              icon: FileText,
              color: "bg-orange-600",
              action: "Check Status"
            },
            {
              title: "AI Scheme Assistant",
              description: "Discover relevant schemes",
              icon: Bot,
              color: "bg-purple-600",
              action: "Ask AI"
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

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "New application received for Frontend Developer position",
                "Compliance reminder: Update GST certificate",
                "AI found 2 new scheme matches for your startup",
                "Job posting 'UI/UX Intern' expires in 3 days"
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStartup;
