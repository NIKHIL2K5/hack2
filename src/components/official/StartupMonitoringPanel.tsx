
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, Download } from 'lucide-react';
import { StartupDetailsModal } from './StartupDetailsModal';
import { StartupStatsCards } from './startup/StartupStatsCards';
import { StartupGrowthCharts } from './startup/StartupGrowthCharts';
import { StartupListTable } from './startup/StartupListTable';

export const StartupMonitoringPanel = () => {
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleViewDetails = (startup: any) => {
    setSelectedStartup(startup);
    setIsDetailsModalOpen(true);
  };

  const handleFlag = (startupId: string) => {
    console.log('Flagging startup:', startupId);
    // Implementation for flagging startup
  };

  const handleGenerateReport = () => {
    console.log('Generating startup monitoring report');
    // Implementation for report generation
  };

  const handleExportData = () => {
    console.log('Exporting startup data');
    // Implementation for data export
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
