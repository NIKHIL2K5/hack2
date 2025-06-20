
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, Download } from 'lucide-react';
import { StartupDetailsModal } from './StartupDetailsModal';
import { StartupStatsCards } from './startup/StartupStatsCards';
import { StartupGrowthCharts } from './startup/StartupGrowthCharts';
import { StartupListTable } from './startup/StartupListTable';
import { useToast } from '@/hooks/use-toast';

export const StartupMonitoringPanel = () => {
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleViewDetails = (startup: any) => {
    setSelectedStartup(startup);
    setIsDetailsModalOpen(true);
  };

  const handleFlag = (startupId: string) => {
    console.log('Flagging startup:', startupId);
    toast({
      title: "Startup Flagged",
      description: "Startup has been flagged for review by the compliance team.",
      variant: "destructive"
    });
  };

  const handleGenerateReport = () => {
    console.log('Generating startup monitoring report');
    
    toast({
      title: "Generating Report",
      description: "Startup monitoring report is being generated...",
      variant: "default"
    });

    // Simulate report generation
    setTimeout(() => {
      const reportData = {
        title: "Startup Monitoring & Analytics Report",
        generatedAt: new Date().toISOString(),
        totalStartups: 3,
        compliantStartups: 2,
        nonCompliantStartups: 1,
        flaggedStartups: 1,
        districts: ["Hyderabad", "Karimnagar", "Warangal"],
        industries: ["Technology", "Renewable Energy", "Healthcare"],
        totalFunding: "₹7.5 Crore",
        reportType: "Startup Monitoring Report"
      };

      const dataStr = JSON.stringify(reportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `Startup_Monitoring_Report_${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      toast({
        title: "Report Generated",
        description: "Startup monitoring report has been downloaded successfully.",
        variant: "default"
      });
    }, 2000);
  };

  const handleExportData = () => {
    console.log('Exporting startup data');
    
    toast({
      title: "Exporting Data",
      description: "Startup data is being exported...",
      variant: "default"
    });

    // Simulate data export
    setTimeout(() => {
      const exportData = {
        exportedAt: new Date().toISOString(),
        startups: [
          {
            id: 1,
            name: 'TechVenture Solutions',
            location: 'Hyderabad',
            industry: 'Technology',
            employees: 25,
            fundingReceived: '₹2.5 Crore',
            complianceStatus: 'COMPLIANT',
            isDPIIT: true
          },
          {
            id: 2,
            name: 'GreenTech Innovations',
            location: 'Karimnagar',
            industry: 'Renewable Energy',
            employees: 18,
            fundingReceived: '₹1.8 Crore',
            complianceStatus: 'COMPLIANT',
            isDPIIT: false
          },
          {
            id: 3,
            name: 'HealthFirst Systems',
            location: 'Warangal',
            industry: 'Healthcare',
            employees: 32,
            fundingReceived: '₹3.2 Crore',
            complianceStatus: 'NON_COMPLIANT',
            isDPIIT: true
          }
        ]
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `Startup_Data_Export_${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      toast({
        title: "Data Exported",
        description: "Startup data has been exported successfully.",
        variant: "default"
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Startup Monitoring & Analytics</h2>
          <p className="text-white/70">Track startup registrations, compliance, and growth metrics</p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={handleGenerateReport}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button
            onClick={handleExportData}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
      
      <StartupStatsCards />
      <StartupGrowthCharts />
      <StartupListTable onViewDetails={handleViewDetails} onFlag={handleFlag} />

      <StartupDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        startup={selectedStartup}
        onFlag={handleFlag}
      />
    </div>
  );
};
