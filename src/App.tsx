
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import LoginOfficial from "./pages/LoginOfficial";
import DashboardStartup from "./pages/DashboardStartup";
import DashboardStudent from "./pages/DashboardStudent";
import DashboardOfficial from "./pages/DashboardOfficial";
import JobBoard from "./pages/JobBoard";
import MyApplications from "./pages/MyApplications";
import ComplianceTracker from "./pages/ComplianceTracker";
import ChatbotPage from "./pages/ChatbotPage";
import SchemeManager from "./pages/SchemeManager";
import ProfileSettings from "./pages/ProfileSettings";
import FeedbackSentiment from "./pages/FeedbackSentiment";
import Analytics from "./pages/Analytics";
import ApplicationTracker from "./pages/ApplicationTracker";
import LoadingScreen from "./components/LoadingScreen";
import { AIProvider } from "./contexts/AIContext";
import { UniversalAIChat } from "./components/ai/UniversalAIChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AIProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login/:role" element={<Login />} />
              <Route path="/login/official" element={<LoginOfficial />} />
              <Route path="/dashboard/startup" element={<DashboardStartup />} />
              <Route path="/dashboard/student" element={<DashboardStudent />} />
              <Route path="/dashboard/official" element={<DashboardOfficial />} />
              <Route path="/jobs" element={<JobBoard />} />
              <Route path="/my-applications" element={<MyApplications />} />
              <Route path="/compliance" element={<ComplianceTracker />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/schemes" element={<SchemeManager />} />
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="/feedback" element={<FeedbackSentiment />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/application-tracker" element={<ApplicationTracker />} />
            </Routes>
            <UniversalAIChat />
          </Suspense>
        </BrowserRouter>
      </AIProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
