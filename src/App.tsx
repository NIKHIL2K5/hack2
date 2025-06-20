
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="/dashboard/student" element={<DashboardStudent />} />
          <Route path="/dashboard/startup" element={<DashboardStartup />} />
          <Route path="/dashboard/official" element={<DashboardOfficial />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/application-tracker" element={<ApplicationTracker />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/startup-profile" element={<StartupProfileCreator />} />
          <Route path="/scheme-manager" element={<SchemeManager />} />
          <Route path="/student-list" element={<StudentList />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
