
import { motion } from "framer-motion";
import { Eye, Download, CheckCircle, XCircle, Clock, UserCheck, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobApplication } from "@/hooks/useOfficialData";
import { useOfficialData } from "@/hooks/useOfficialData";
import { toast } from "sonner";
import { useState } from "react";
import { ApplicationDetailsModal } from "./ApplicationDetailsModal";

interface ApplicationsTableProps {
  applications: JobApplication[];
}

export const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
  const { updateApplicationStatus } = useOfficialData();
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusUpdate = (applicationId: number, status: JobApplication['status'], studentName: string) => {
    updateApplicationStatus(applicationId, status);
    
    const statusMessages = {
      'shortlisted': `${studentName} has been shortlisted successfully!`,
      'rejected': `${studentName}'s application has been rejected.`,
      'pending': `${studentName}'s application is now under review.`,
      'reviewed': `${studentName}'s application has been marked as reviewed.`
    };
    
    toast.success(statusMessages[status]);
  };

  const handleViewDetails = (application: JobApplication) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: JobApplication['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Pending Review</Badge>;
      case 'reviewed':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300">Under Review</Badge>;
      case 'shortlisted':
        return <Badge className="bg-green-100 text-green-700 border-green-300">Accepted</Badge>;
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
        return <UserCheck className="w-4 h-4" />;
      case 'rejected':
        return <UserX className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <>
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center">
            <Eye className="w-6 h-6 mr-2" />
            Application Management
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
                  className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-white">{application.studentName}</h3>
                        {getStatusBadge(application.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-white/80 font-medium text-lg mb-1">{application.jobTitle}</p>
                          <p className="text-white/60 text-sm mb-2">{application.studentEmail}</p>
                          <p className="text-white/70 text-sm">Applied: {new Date(application.appliedAt).toLocaleDateString()}</p>
                        </div>
                        
                        <div>
                          <p className="text-white/80 text-sm mb-2">Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {application.skills.slice(0, 3).map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline" className="border-indigo-300 text-indigo-200 bg-indigo-500/20">
                                {skill}
                              </Badge>
                            ))}
                            {application.skills.length > 3 && (
                              <Badge variant="outline" className="border-gray-300 text-gray-200 bg-gray-500/20">
                                +{application.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {application.coverLetter && (
                        <div className="bg-white/5 rounded p-3 mb-4">
                          <p className="text-white/80 text-sm font-medium mb-1">Cover Letter:</p>
                          <p className="text-white/70 text-sm line-clamp-2">{application.coverLetter}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(application)}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      
                      {application.resumeUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Resume
                        </Button>
                      )}
                      
                      <div className="flex flex-col gap-2 mt-2">
                        {application.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(application.id, 'shortlisted', application.studentName)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <UserCheck className="w-4 h-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(application.id, 'rejected', application.studentName)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              <UserX className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        
                        {application.status === 'shortlisted' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(application.id, 'pending', application.studentName)}
                              className="bg-yellow-600 hover:bg-yellow-700 text-white"
                            >
                              <Clock className="w-4 h-4 mr-1" />
                              Review Again
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(application.id, 'rejected', application.studentName)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              <UserX className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        
                        {application.status === 'rejected' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(application.id, 'pending', application.studentName)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Clock className="w-4 h-4 mr-1" />
                            Reconsider
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <ApplicationDetailsModal
        application={selectedApplication}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedApplication(null);
        }}
        onStatusUpdate={handleStatusUpdate}
      />
    </>
  );
};
