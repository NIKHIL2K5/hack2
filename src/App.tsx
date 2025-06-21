import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UniversalAIChat } from "@/components/ai/UniversalAIChat";
import Index from "./pages/Index";
import LoginStudent from "./pages/LoginStudent";
import LoginStartup from "./pages/LoginStartup";
import LoginOfficial from "./pages/LoginOfficial";
import DashboardStudent from "./pages/DashboardStudent";
import DashboardStartup from "./pages/DashboardStartup";
import DashboardOfficial from "./pages/DashboardOfficial";
import MyApplications from "./pages/MyApplications";
import ApplicationTracker from "./pages/ApplicationTracker";
import ProfileSettings from "./pages/ProfileSettings";
import StartupProfileCreator from "./pages/StartupProfileCreator";
import SchemeManager from "./pages/SchemeManager";
import StudentList from "./pages/StudentList";
import ChatbotPage from "./pages/ChatbotPage";
import ApplicationsManagement from "./pages/ApplicationsManagement";
import ComplianceTracker from "./pages/ComplianceTracker";
import JobBoard from "./pages/JobBoard";
import Analytics from "./pages/Analytics";
import FeedbackSentiment from "./pages/FeedbackSentiment";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { authService } from "./services/authService";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, role }: { children: JSX.Element, role: string }) => {
  const currentUser = authService.getCurrentUser();
  
  if (!currentUser) {
    // Not logged in, redirect to home
    return <Navigate to="/" replace />;
  }
  
  if (currentUser.role !== role) {
    // Wrong role, redirect to correct dashboard
    return <Navigate to={`/dashboard/${currentUser.role}`} replace />;
  }
  
  return children;
};

const App = () => {
  // Check if user is already logged in and redirect to appropriate dashboard
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser && window.location.pathname === '/') {
      // If user is already logged in and on home page, redirect to their dashboard
      const dashboardPath = `/dashboard/${currentUser.role}`;
      if (window.location.pathname !== dashboardPath) {
        window.location.href = dashboardPath;
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login/student" element={<LoginStudent />} />
            <Route path="/login/startup" element={<LoginStartup />} />
            <Route path="/login/official" element={<LoginOfficial />} />
            
            {/* Protected routes with role-based access */}
            <Route path="/dashboard/student" element={
              <ProtectedRoute role="student">
                <DashboardStudent />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/startup" element={
              <ProtectedRoute role="startup">
                <DashboardStartup />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/official" element={
              <ProtectedRoute role="official">
                <DashboardOfficial />
              </ProtectedRoute>
            } />
            
            {/* Other routes */}
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/application-tracker" element={<ApplicationTracker />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
            <Route path="/startup-profile" element={<StartupProfileCreator />} />
            <Route path="/scheme-manager" element={<SchemeManager />} />
            <Route path="/student-list" element={<StudentList />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/applications" element={<ApplicationsManagement />} />
            <Route path="/compliance" element={<ComplianceTracker />} />
            <Route path="/jobs" element={<JobBoard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/feedback" element={<FeedbackSentiment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <UniversalAIChat />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;