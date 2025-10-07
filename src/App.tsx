import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Game from "./pages/Game";
import WorldMap from "./pages/WorldMap";
import LevelProgression from "./pages/LevelProgression";
import LevelSelection from "./pages/LevelSelection";
import RecipeBook from "./pages/RecipeBook";
import Challenges from "./pages/Challenges";
import SpinWheel from "./pages/SpinWheel";
import FoodQuiz from "./pages/FoodQuiz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game" element={<Game />} />
          <Route path="/world-map" element={<WorldMap />} />
          <Route path="/levels" element={<LevelProgression />} />
          <Route path="/level-selection" element={<LevelSelection />} />
          <Route path="/recipe-book" element={<RecipeBook />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/spin-wheel" element={<SpinWheel />} />
          <Route path="/food-quiz" element={<FoodQuiz />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
