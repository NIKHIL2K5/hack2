
import { motion } from "framer-motion";
import { Shield, FileText, BarChart3, Settings, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardOfficial = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Government Dashboard</h1>
              <p className="text-sm text-gray-600">Telangana Startup Ecosystem</p>
            </div>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Admin Panel</span>
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Active Startups", value: "1,247", change: "+89 this month", color: "text-indigo-600" },
            { title: "Job Postings", value: "456", change: "45 pending review", color: "text-blue-600" },
            { title: "Students Placed", value: "892", change: "+124 this month", color: "text-green-600" },
            { title: "Schemes Active", value: "23", change: "3 expiring soon", color: "text-orange-600" }
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
                    <BarChart3 className={`w-8 h-8 ${stat.color}`} />
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
              title: "Manage Schemes",
              description: "Create and update government schemes",
              icon: FileText,
              color: "bg-indigo-600",
              action: "Manage"
            },
            {
              title: "Review Applications",
              description: "Approve or reject job postings",
              icon: CheckCircle,
              color: "bg-green-600",
              action: "Review"
            },
            {
              title: "District Analytics",
              description: "View regional performance metrics",
              icon: BarChart3,
              color: "bg-blue-600",
              action: "View Analytics"
            },
            {
              title: "Feedback Analysis",
              description: "Sentiment analysis of user feedback",
              icon: AlertTriangle,
              color: "bg-orange-600",
              action: "Analyze"
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

        {/* Recent Activity & Alerts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "Job Posting", title: "Senior Developer at TechCorp", status: "Pending Approval" },
                  { type: "Scheme Application", title: "MSME Registration - StartupXYZ", status: "Under Review" },
                  { type: "Compliance Report", title: "Q4 Startup Compliance Check", status: "Action Required" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.type}</p>
                    </div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>District Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { district: "Hyderabad", startups: 567, growth: "+12%" },
                  { district: "Warangal", startups: 134, growth: "+8%" },
                  { district: "Nizamabad", startups: 89, growth: "+15%" },
                  { district: "Karimnagar", startups: 67, growth: "+6%" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.district}</p>
                      <p className="text-sm text-gray-600">{item.startups} startups</p>
                    </div>
                    <span className="text-green-600 font-semibold">{item.growth}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOfficial;
