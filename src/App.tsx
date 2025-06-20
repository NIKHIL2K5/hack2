
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Index from "./pages/Index";
import LoginStartup from "./pages/LoginStartup";
import LoginStudent from "./pages/LoginStudent";
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
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login/startup" element={<LoginStartup />} />
            <Route path="/login/student" element={<LoginStudent />} />
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
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
