import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import CertificatesPage from "./pages/CertificatesPage";
import { CustomCursor } from "./components/CustomCursor";
import { PersistentPortrait } from "./components/PersistentPortrait";
import { LanguageSelector } from "./components/LanguageSelector";
import { BgProvider } from "./contexts/BgContext";
import Preloader from "./components/Preloader";

const queryClient = new QueryClient();

// Internal wrapper to use useLocation hook safely inside Router
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Preloader />
      <Toaster />
      <Sonner />
      <CustomCursor />
      <PersistentPortrait />
      <LanguageSelector />
      <BgProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </BgProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
