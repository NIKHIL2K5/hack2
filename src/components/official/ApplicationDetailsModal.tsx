
import React from 'react';
import { motion } from 'framer-motion';
import { X, User, Mail, Calendar, FileText, Award, MapPin, Phone, Building2, Download, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobApplication } from '@/hooks/useOfficialData';

interface ApplicationDetailsModalProps {
  application: JobApplication | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (applicationId: number, status: JobApplication['status'], studentName: string) => void;
}

export const ApplicationDetailsModal = ({ 
  application, 
  isOpen, 
  onClose, 
  onStatusUpdate 
}: ApplicationDetailsModalProps) => {
  if (!application) return null;

  const getStatusColor = (status: JobApplication['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'reviewed':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'shortlisted':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const mockAdditionalData = {
    phone: '+91 9876543210',
    location: 'Hyderabad, Telangana',
    education: 'B.Tech Computer Science, JNTU Hyderabad',
    experience: '2 years of internship experience',
    projects: [
      'E-commerce React Application',
      'Machine Learning Price Predictor',
      'Task Management System'
    ],
    achievements: [
      'Hackathon Winner 2023',
      'Dean\'s List Student',
      'Open Source Contributor'
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6" />
              <span>Application Details - {application.studentName}</span>
            </div>
            <Badge className={getStatusColor(application.status)}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{application.studentEmail}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{mockAdditionalData.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{mockAdditionalData.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Applied: {new Date(application.appliedAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Job Application Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Job Application
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Position:</label>
                <p className="text-sm mt-1">{application.jobTitle}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Education:</label>
                <p className="text-sm mt-1">{mockAdditionalData.education}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Experience:</label>
                <p className="text-sm mt-1">{mockAdditionalData.experience}</p>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Skills & Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {application.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Key Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockAdditionalData.projects.map((project, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">{project}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Cover Letter */}
          {application.coverLetter && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Cover Letter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {application.coverLetter}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Achievements */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Achievements & Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {mockAdditionalData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">{achievement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </Button>
          </div>
          
          <div className="flex space-x-3">
            {application.status === 'pending' && (
              <>
                <Button
                  onClick={() => onStatusUpdate(application.id, 'shortlisted', application.studentName)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Accept Application
                </Button>
                <Button
                  onClick={() => onStatusUpdate(application.id, 'rejected', application.studentName)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Reject Application
                </Button>
              </>
            )}
            
            {application.status === 'shortlisted' && (
              <Button
                onClick={() => onStatusUpdate(application.id, 'pending', application.studentName)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Move to Review
              </Button>
            )}
            
            {application.status === 'rejected' && (
              <Button
                onClick={() => onStatusUpdate(application.id, 'pending', application.studentName)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Reconsider Application
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
