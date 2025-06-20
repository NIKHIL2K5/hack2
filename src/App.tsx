
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginStartup from "./pages/LoginStartup";
import LoginStudent from "./pages/LoginStudent";
import LoginOfficial from "./pages/LoginOfficial";
import DashboardStartup from "./pages/DashboardStartup";
import DashboardStudent from "./pages/DashboardStudent";
import DashboardOfficial from "./pages/DashboardOfficial";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login/startup" element={<LoginStartup />} />
          <Route path="/login/student" element={<LoginStudent />} />
          <Route path="/login/official" element={<LoginOfficial />} />
          <Route path="/dashboard/startup" element={<DashboardStartup />} />
          <Route path="/dashboard/student" element={<DashboardStudent />} />
          <Route path="/dashboard/official" element={<DashboardOfficial />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
