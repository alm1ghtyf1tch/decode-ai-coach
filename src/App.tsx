import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import AppLayout from "@/components/AppLayout";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import LearnHub from "./pages/LearnHub";
import LessonDetail from "./pages/LessonDetail";
import AskAI from "./pages/AskAI";
import JudgeMode from "./pages/JudgeMode";
import RefreshMode from "./pages/RefreshMode";
import Garage from "./pages/Garage";
import Quiz from "./pages/Quiz";
import ManualLibrary from "./pages/ManualLibrary";
import Profile from "./pages/Profile";
import FieldExplorer from "./pages/FieldExplorer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="learn" element={<LearnHub />} />
              <Route path="lesson/:id" element={<LessonDetail />} />
              <Route path="ask" element={<AskAI />} />
              <Route path="judge" element={<JudgeMode />} />
              <Route path="refresh" element={<RefreshMode />} />
              <Route path="garage" element={<Garage />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="library" element={<ManualLibrary />} />
              <Route path="progress" element={<Profile />} />
              <Route path="field" element={<FieldExplorer />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
