
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  FileText, 
  Users, 
  MapPin, 
  MessageSquare, 
  Shield, 
  Bell, 
  Settings,
  Building2,
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SchemeManagementPanel } from '@/components/official/SchemeManagementPanel';
import { StartupMonitoringPanel } from '@/components/official/StartupMonitoringPanel';
import { JobModerationPanel } from '@/components/official/JobModerationPanel';
import { DistrictAnalytics } from '@/components/official/DistrictAnalytics';
import { FeedbackAnalytics } from '@/components/official/FeedbackAnalytics';
import { UserVerificationPanel } from '@/components/official/UserVerificationPanel';
import { PolicyPlanningTools } from '@/components/official/PolicyPlanningTools';
import { NotificationCenter } from '@/components/official/NotificationCenter';
import { DocumentManagement } from '@/components/official/DocumentManagement';
import { RoleManagement } from '@/components/official/RoleManagement';

const DashboardOfficial = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'schemes', label: 'Scheme Management', icon: FileText },
    { id: 'startups', label: 'Startup Monitoring', icon: Building2 },
    { id: 'jobs', label: 'Job Moderation', icon: Users },
    { id: 'analytics', label: 'District Analytics', icon: MapPin },
    { id: 'feedback', label: 'Feedback Analytics', icon: MessageSquare },
    { id: 'verification', label: 'User Verification', icon: Shield },
    { id: 'policy', label: 'Policy Planning', icon: TrendingUp },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'documents', label: 'Document Management', icon: FileText },
    { id: 'roles', label: 'Role Management', icon: Settings }
  ];

  const overviewStats = [
    { title: 'Active Schemes', value: '24', change: '+3', icon: FileText, color: 'bg-blue-500' },
    { title: 'Registered Startups', value: '1,847', change: '+156', icon: Building2, color: 'bg-green-500' },
    { title: 'Job Posts Pending', value: '43', change: '-12', icon: AlertTriangle, color: 'bg-yellow-500' },
    { title: 'Districts Covered', value: '33', change: '+0', icon: MapPin, color: 'bg-purple-500' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'schemes':
        return <SchemeManagementPanel />;
      case 'startups':
        return <StartupMonitoringPanel />;
      case 'jobs':
        return <JobModerationPanel />;
      case 'analytics':
        return <DistrictAnalytics />;
      case 'feedback':
        return <FeedbackAnalytics />;
      case 'verification':
        return <UserVerificationPanel />;
      case 'policy':
        return <PolicyPlanningTools />;
      case 'notifications':
        return <NotificationCenter />;
      case 'documents':
        return <DocumentManagement />;
      case 'roles':
        return <RoleManagement />;
      default:
        return (
          <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                          <div className="flex items-center space-x-2">
                            <p className="text-3xl font-bold text-white">{stat.value}</p>
                            <Badge className="bg-green-100 text-green-700">
                              {stat.change}
                            </Badge>
                          </div>
                        </div>
                        <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Activities */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'New startup registered', detail: 'TechVenture Solutions from Hyderabad', time: '2 minutes ago' },
                    { action: 'Scheme application approved', detail: 'Startup Funding Scheme for GreenTech Innovations', time: '15 minutes ago' },
                    { action: 'Job post flagged for review', detail: 'Software Developer position with unusually low stipend', time: '1 hour ago' },
                    { action: 'Compliance report submitted', detail: 'Q4 compliance by DataFlow Systems', time: '3 hours ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-white/70 text-sm">{activity.detail}</p>
                      </div>
                      <span className="text-white/60 text-xs">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">Government Official Dashboard</h1>
                <p className="text-white/70">Telangana State Administration</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white">
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        activeTab === item.id 
                          ? 'bg-blue-500 text-white' 
                          : 'text-white/80 bg-transparent'
                      }`}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOfficial;
