import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Patterns from "./pages/Patterns";
import Companies from "./pages/Companies";
import Difficulty from "./pages/Difficulty";
import ProblemList from "./pages/ProblemList";
import ProblemDetail from "./pages/ProblemDetail";
import CodeEditor from "./pages/CodeEditor";
import Solution from "./pages/Solution";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/difficulty" element={<Difficulty />} />
          <Route path="/problems/:category" element={<ProblemList />} />
          <Route path="/problems/company/:company" element={<ProblemList />} />
          <Route path="/problems/difficulty/:level" element={<ProblemList />} />
          <Route path="/problem/:problemId" element={<ProblemDetail />} />
          <Route path="/editor/:problemId" element={<CodeEditor />} />
          <Route path="/solution/:problemId" element={<Solution />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
