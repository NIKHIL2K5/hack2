import { motion } from "framer-motion";
import { ArrowLeft, Clock, CheckCircle, XCircle, FileText, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "@/contexts/ai/userHelpers";

const MyApplications = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  
  const applications = [
    {
      id: 1,
      jobTitle: "Frontend Developer Intern",
      company: "TechCorp Innovations",
      appliedDate: "2024-01-15",
      status: "Under Review",
      statusColor: "bg-yellow-500/20 text-yellow-300",
      icon: Clock
    },
    {
      id: 2,
      jobTitle: "Data Science Intern",
      company: "AI Solutions Ltd",
      appliedDate: "2024-01-12",
      status: "Accepted",
      statusColor: "bg-green-500/20 text-green-300",
      icon: CheckCircle
    },
    {
      id: 3,
      jobTitle: "UI/UX Designer",
      company: "Design Studio Pro",
      appliedDate: "2024-01-10",
      status: "Rejected",
      statusColor: "bg-red-500/20 text-red-300",
      icon: XCircle
    }
  ];

  const handleBackNavigation = () => {
    // Navigate based on user role
    if (userInfo.role === 'student') {
      navigate('/dashboard/student');
    } else if (userInfo.role === 'startup') {
      navigate('/dashboard/startup');
    } else if (userInfo.role === 'official') {
      navigate('/dashboard/official');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-700 to-teal-500 text-white">
      <header className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={handleBackNavigation}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold">My Applications</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6"
        >
          {applications.map((application, index) => (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-white mb-2">{application.jobTitle}</CardTitle>
                      <div className="flex items-center space-x-4 text-white/70">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-1" />
                          {application.company}
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          Applied: {application.appliedDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={application.statusColor}>
                        <application.icon className="w-4 h-4 mr-1" />
                        {application.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default MyApplications;