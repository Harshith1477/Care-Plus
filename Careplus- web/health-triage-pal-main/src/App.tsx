import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HealthConditionPage from "./pages/HealthConditionPage";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import DoctorDashboard from "./pages/DoctorDashboard";
import { ChatAssistant } from "./components/ChatAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:id" element={<HealthConditionPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
