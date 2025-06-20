
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flag, MapPin, Users, Building, Phone, Mail, Globe, Calendar, DollarSign, AlertTriangle, CheckCircle, Eye, Download } from 'lucide-react';

interface StartupDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  startup: any;
  onFlag: (startupId: string) => void;
}

export const StartupDetailsModal = ({ isOpen, onClose, startup, onFlag }: StartupDetailsModalProps) => {
  if (!startup) return null;

  const handleFlagStartup = () => {
    onFlag(String(startup.id));
    console.log('Startup flagged:', startup.name);
  };

  const handleApproveCompliance = () => {
    console.log('Compliance approved for:', startup.name);
  };

  const handleSendNotice = () => {
    console.log('Compliance notice sent to:', startup.name);
  };

  const handleDownloadReport = () => {
    console.log('Downloading detailed report for:', startup.name);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-lg border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Building className="w-6 h-6 text-blue-600" />
            {startup.name}
            {startup.isFlagged && (
              <Badge className="bg-red-100 text-red-700">
                <Flag className="w-3 h-3 mr-1" />
                FLAGGED
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Industry:</span>
                    <p className="text-gray-900">{startup.industry}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Location:</span>
                    <p className="text-gray-900 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {startup.location}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Employees:</span>
                    <p className="text-gray-900 flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {startup.employees}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Funding Received:</span>
                    <p className="text-gray-900 flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {startup.fundingReceived}
                    </p>
                  </div>
                </div>
                {startup.description && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Description:</span>
                    <p className="text-gray-900 mt-1">{startup.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {startup.contactEmail && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a href={`mailto:${startup.contactEmail}`} className="text-blue-600 hover:underline">
                      {startup.contactEmail}
                    </a>
                  </div>
                )}
                {startup.contactPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <a href={`tel:${startup.contactPhone}`} className="text-blue-600 hover:underline">
                      {startup.contactPhone}
                    </a>
                  </div>
                )}
                {startup.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {startup.website}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Timeline & Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Registration Date:</span>
                  <p className="text-gray-900">{startup.registeredDate}</p>
                </div>
                {startup.lastCompliance && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Last Compliance Report:</span>
                    <p className="text-gray-900">{startup.lastCompliance}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Status & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status & Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Compliance Status:</span>
                  <Badge className={
                    startup.complianceStatus === 'COMPLIANT' 
                      ? 'bg-green-100 text-green-700 ml-2' 
                      : 'bg-red-100 text-red-700 ml-2'
                  }>
                    {startup.complianceStatus === 'COMPLIANT' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 mr-1" />
                    )}
                    {startup.complianceStatus}
                  </Badge>
                </div>
                
                {startup.isDPIIT && (
                  <div>
                    <Badge className="bg-blue-100 text-blue-700">
                      DPIIT Certified
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleDownloadReport}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                
                {startup.complianceStatus === 'COMPLIANT' ? (
                  <Button 
                    onClick={handleApproveCompliance}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Compliance
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSendNotice}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Send Compliance Notice
                  </Button>
                )}
                
                <Button 
                  onClick={handleFlagStartup}
                  variant="outline"
                  className="w-full border-red-300 text-red-700 hover:bg-red-50"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  {startup.isFlagged ? 'Remove Flag' : 'Flag for Review'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
