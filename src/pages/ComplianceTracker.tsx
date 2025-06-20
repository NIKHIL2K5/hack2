import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "@/contexts/ai/userHelpers";

const ComplianceTracker = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  
  const complianceItems = [
    { name: "MSME Registration", status: "completed", progress: 100 },
    { name: "GST Registration", status: "completed", progress: 100 },
    { name: "DPIIT Recognition", status: "in-progress", progress: 75 },
    { name: "EPF Registration", status: "pending", progress: 0 },
    { name: "ESI Registration", status: "pending", progress: 0 }
  ];

  const overallProgress = complianceItems.reduce((acc, item) => acc + item.progress, 0) / complianceItems.length;

  const handleBackNavigation = () => {
    // Navigate based on user role
    if (userInfo.role === 'startup') {
      navigate('/dashboard/startup');
    } else if (userInfo.role === 'student') {
      navigate('/dashboard/student');
    } else if (userInfo.role === 'official') {
      navigate('/dashboard/official');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 text-white">
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
            <h1 className="text-3xl font-bold">Compliance Tracker</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Overall Compliance Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Progress</span>
                  <span className="text-2xl font-bold text-white">{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-6">
          {complianceItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {item.status === "completed" && <CheckCircle className="text-green-400 w-6 h-6" />}
                      {item.status === "in-progress" && <Clock className="text-yellow-400 w-6 h-6" />}
                      {item.status === "pending" && <AlertTriangle className="text-red-400 w-6 h-6" />}
                      <span className="text-white font-semibold">{item.name}</span>
                    </div>
                    <span className="text-white/80">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="mt-3 h-2" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ComplianceTracker;