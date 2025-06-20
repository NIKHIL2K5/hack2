import { motion } from "framer-motion";
import { ArrowLeft, Clock, CheckCircle, XCircle, FileText, Building2, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";

const ApplicationTracker = () => {
  const navigate = useNavigate();
  
  const applications = [
    {
      id: 1,
      jobTitle: "Frontend Developer Intern",
      company: "TechCorp Innovations",
      location: "Hyderabad",
      appliedDate: "2024-01-15",
      status: "Interview Scheduled",
      progress: 75,
      statusColor: "bg-blue-500/20 text-blue-600",
      icon: Clock,
      timeline: [
        { step: "Application Submitted", completed: true, date: "Jan 15" },
        { step: "Resume Reviewed", completed: true, date: "Jan 16" },
        { step: "Interview Scheduled", completed: true, date: "Jan 18" },
        { step: "Final Decision", completed: false, date: "Pending" }
      ]
    },
    {
      id: 2,
      jobTitle: "Data Science Intern",
      company: "AI Solutions Ltd",
      location: "Warangal",
      appliedDate: "2024-01-12",
      status: "Accepted",
      progress: 100,
      statusColor: "bg-green-500/20 text-green-600",
      icon: CheckCircle,
      timeline: [
        { step: "Application Submitted", completed: true, date: "Jan 12" },
        { step: "Resume Reviewed", completed: true, date: "Jan 13" },
        { step: "Interview Completed", completed: true, date: "Jan 14" },
        { step: "Offer Extended", completed: true, date: "Jan 15" }
      ]
    },
    {
      id: 3,
      jobTitle: "UI/UX Designer",
      company: "Design Studio Pro",
      location: "Nizamabad",
      appliedDate: "2024-01-10",
      status: "Rejected",
      progress: 50,
      statusColor: "bg-red-500/20 text-red-600",
      icon: XCircle,
      timeline: [
        { step: "Application Submitted", completed: true, date: "Jan 10" },
        { step: "Resume Reviewed", completed: true, date: "Jan 11" },
        { step: "Not Selected", completed: true, date: "Jan 12" },
        { step: "Feedback Provided", completed: false, date: "-" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard/student">
              <motion.div whileHover={{ scale: 1.1, x: -5 }}>
                <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </motion.div>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Application Tracker</h1>
              <p className="text-gray-600">Monitor your application status and progress</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-8">
          {applications.map((application, index) => (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-gray-900 mb-2">{application.jobTitle}</CardTitle>
                      <div className="flex items-center space-x-6 text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-2" />
                          {application.company}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {application.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Applied: {application.appliedDate}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge className={application.statusColor}>
                          <application.icon className="w-4 h-4 mr-1" />
                          {application.status}
                        </Badge>
                        <div className="flex-1 max-w-xs">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{application.progress}%</span>
                          </div>
                          <Progress value={application.progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Application Timeline</h4>
                    <div className="grid md:grid-cols-4 gap-4">
                      {application.timeline.map((step, stepIndex) => (
                        <motion.div
                          key={stepIndex}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + stepIndex * 0.05 }}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            step.completed 
                              ? 'border-green-200 bg-green-50' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            {step.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-2"></div>
                            )}
                            <span className={`font-medium ${step.completed ? 'text-green-800' : 'text-gray-600'}`}>
                              {step.step}
                            </span>
                          </div>
                          <p className={`text-sm ${step.completed ? 'text-green-600' : 'text-gray-500'}`}>
                            {step.date}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Application Summary</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-blue-100">Total Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">1</div>
                  <div className="text-blue-100">Accepted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">1</div>
                  <div className="text-blue-100">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">33%</div>
                  <div className="text-blue-100">Success Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default ApplicationTracker;