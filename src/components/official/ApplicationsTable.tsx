
import { motion } from "framer-motion";
import { Eye, Download, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobApplication } from "@/hooks/useOfficialData";
import { useOfficialData } from "@/hooks/useOfficialData";

interface ApplicationsTableProps {
  applications: JobApplication[];
}

export const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
  const { updateApplicationStatus } = useOfficialData();

  const getStatusBadge = (status: JobApplication['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Pending</Badge>;
      case 'reviewed':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300">Reviewed</Badge>;
      case 'shortlisted':
        return <Badge className="bg-green-100 text-green-700 border-green-300">Shortlisted</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700 border-red-300">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-300">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: JobApplication['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'shortlisted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center">
          <Eye className="w-6 h-6 mr-2" />
          Recent Applications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <Eye className="w-12 h-12 mx-auto mb-4 text-white/30" />
              <p className="text-lg">No applications received yet</p>
              <p className="text-sm">Applications will appear here once students apply</p>
            </div>
          ) : (
            applications.map((application, index) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{application.studentName}</h3>
                      {getStatusBadge(application.status)}
                    </div>
                    <p className="text-white/80 font-medium mb-1">{application.jobTitle}</p>
                    <p className="text-white/60 text-sm mb-2">{application.studentEmail}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {application.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="border-indigo-300 text-indigo-200 bg-indigo-500/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-white/70 text-sm">Applied: {new Date(application.appliedAt).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    
                    {application.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateApplicationStatus(application.id, 'shortlisted')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Shortlist
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateApplicationStatus(application.id, 'rejected')}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    
                    {application.status === 'shortlisted' && (
                      <Button
                        size="sm"
                        onClick={() => updateApplicationStatus(application.id, 'pending')}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
