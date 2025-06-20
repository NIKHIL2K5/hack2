
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Eye, Flag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StartupListTableProps {
  onViewDetails: (startup: any) => void;
  onFlag: (startupId: string) => void;
}

export const StartupListTable = ({ onViewDetails, onFlag }: StartupListTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const [startupStates, setStartupStates] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: true // HealthFirst Systems starts as flagged
  });

  const startups = [
    {
      id: 1,
      name: 'TechVenture Solutions',
      location: 'Hyderabad',
      industry: 'Technology',
      employees: 25,
      fundingReceived: '₹2.5 Crore',
      lastCompliance: '1/15/2024',
      registeredDate: '3/15/2023',
      complianceStatus: 'COMPLIANT',
      isDPIIT: true,
      contactEmail: 'info@techventure.com',
      contactPhone: '+91 9876543210',
      website: 'https://techventure.com',
      description: 'A leading technology startup focused on AI and machine learning solutions for enterprises.',
    },
    {
      id: 2,
      name: 'GreenTech Innovations',
      location: 'Karimnagar',
      industry: 'Renewable Energy',
      employees: 18,
      fundingReceived: '₹1.8 Crore',
      lastCompliance: '12/28/2023',
      registeredDate: '5/20/2023',
      complianceStatus: 'COMPLIANT',
      isDPIIT: false,
      contactEmail: 'contact@greentech.com',
      contactPhone: '+91 9876543211',
      website: 'https://greentech.com',
      description: 'Innovative solutions for renewable energy and sustainable development.',
    },
    {
      id: 3,
      name: 'HealthFirst Systems',
      location: 'Warangal',
      industry: 'Healthcare',
      employees: 32,
      fundingReceived: '₹3.2 Crore',
      lastCompliance: '10/15/2023',
      registeredDate: '1/10/2023',
      complianceStatus: 'NON_COMPLIANT',
      isDPIIT: true,
      contactEmail: 'info@healthfirst.com',
      contactPhone: '+91 9876543212',
      description: 'Digital healthcare solutions for rural and urban areas.',
    }
  ];

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLIANT': return 'bg-green-100 text-green-700';
      case 'NON_COMPLIANT': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleFlagToggle = (startupId: number, startupName: string) => {
    const currentlyFlagged = startupStates[startupId];
    
    setStartupStates(prev => ({
      ...prev,
      [startupId]: !currentlyFlagged
    }));

    // Call the parent's onFlag function
    onFlag(String(startupId));

    toast({
      title: currentlyFlagged ? "Flag Removed" : "Startup Flagged",
      description: currentlyFlagged 
        ? `${startupName} has been removed from review.` 
        : `${startupName} has been flagged for review by the compliance team.`,
      variant: currentlyFlagged ? "default" : "destructive"
    });
  };

  const filteredStartups = startups.filter(startup => 
    startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">Registered Startups</CardTitle>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredStartups.map((startup) => {
            const isFlagged = startupStates[startup.id];
            return (
              <div key={startup.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-medium text-lg">{startup.name}</h4>
                      <Badge className={getComplianceStatusColor(startup.complianceStatus)}>
                        {startup.complianceStatus}
                      </Badge>
                      {startup.isDPIIT && (
                        <Badge className="bg-blue-100 text-blue-700">
                          DPIIT
                        </Badge>
                      )}
                      {isFlagged && (
                        <Badge className="bg-red-100 text-red-700">
                          <Flag className="w-3 h-3 mr-1" />
                          FLAGGED
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Location: </span>
                        <span className="text-white/80">{startup.location}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Industry: </span>
                        <span className="text-white/80">{startup.industry}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Employees: </span>
                        <span className="text-white/80">{startup.employees}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Funding: </span>
                        <span className="text-white/80">{startup.fundingReceived}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => onViewDetails({ ...startup, isFlagged })}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className={isFlagged 
                        ? "bg-red-500/30 border-red-500/50 text-red-200 hover:bg-red-500/40" 
                        : "bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
                      }
                      onClick={() => handleFlagToggle(startup.id, startup.name)}
                    >
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
