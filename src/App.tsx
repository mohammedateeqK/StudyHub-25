import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import UploadNotes from "./pages/UploadNotes";
<<<<<<< HEAD
import ViewNotes from "./pages/ViewNotes";
import CreateTest from "./pages/CreateTest";
=======
import UploadedNotes from "./pages/UploadedNotes";
import ViewNotes from "./pages/ViewNotes";
import CreateTest from "./pages/CreateTest";
import CreatedTests from "./pages/CreatedTests";
>>>>>>> b8bbcfb4e065947d48fc3173279e510ce6af8d91
import TakeTest from "./pages/TakeTest";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notes/upload" element={<UploadNotes />} />
<<<<<<< HEAD
            <Route path="/notes" element={<ViewNotes />} />
            <Route path="/tests/create" element={<CreateTest />} />
=======
            <Route path="/notes/uploaded" element={<UploadedNotes />} />
            <Route path="/notes" element={<ViewNotes />} />
            <Route path="/tests/create" element={<CreateTest />} />
            <Route path="/tests/created" element={<CreatedTests />} />
>>>>>>> b8bbcfb4e065947d48fc3173279e510ce6af8d91
            <Route path="/tests" element={<TakeTest />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
