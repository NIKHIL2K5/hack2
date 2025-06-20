
import React from 'react';
import { X, MapPin, Calendar, Users, Mail, Phone, Globe, Flag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface StartupDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  startup: any;
  onFlag?: (startupId: string) => void;
}

export const StartupDetailsModal = ({ 
  isOpen, 
  onClose, 
  startup,
  onFlag 
}: StartupDetailsModalProps) => {
  if (!startup) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLIANT': return 'bg-green-100 text-green-700 border-green-300';
      case 'DPIIT': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'NON_COMPLIANT': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
            Startup Details
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{startup.name}</h1>
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{startup.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Registered: {startup.registeredDate}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Badge className={getStatusColor(startup.complianceStatus)}>
                {startup.complianceStatus}
              </Badge>
              {startup.isDPIIT && (
                <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                  DPIIT
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Employees</p>
                <p className="text-xl font-bold text-gray-900">{startup.employees}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-6 h-6 text-green-500 mx-auto mb-2 font-bold">₹</div>
                <p className="text-sm text-gray-500">Funding Received</p>
                <p className="text-xl font-bold text-green-600">{startup.fundingReceived}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Last Compliance</p>
                <p className="text-lg font-medium text-gray-900">{startup.lastCompliance}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-6 h-6 text-orange-500 mx-auto mb-2 font-bold">§</div>
                <p className="text-sm text-gray-500">Industry</p>
                <p className="text-lg font-medium text-gray-900">{startup.industry}</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{startup.contactEmail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{startup.contactPhone}</span>
              </div>
              {startup.website && (
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <a href={startup.website} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">
                    {startup.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {startup.description && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">About</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">{startup.description}</p>
              </div>
            </div>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Button
              onClick={() => onFlag?.(startup.id)}
              variant="outline"
              className={startup.isFlagged 
                ? "border-green-500 text-green-600 hover:bg-green-50"
                : "border-red-500 text-red-600 hover:bg-red-50"
              }
            >
              <Flag className="w-4 h-4 mr-2" />
              {startup.isFlagged ? 'Remove Flag' : 'Flag Startup'}
            </Button>

            <Button
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>

            <Button
              variant="outline"
              className="border-purple-500 text-purple-600 hover:bg-purple-50"
            >
              View Compliance Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
