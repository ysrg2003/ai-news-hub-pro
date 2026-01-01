import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Article from "./pages/Article";
import Trending from "./pages/Trending";
import PersonalizedFeed from "./pages/PersonalizedFeed";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Archive from "./pages/Archive";
import Category from "./pages/Category";
import "./lib/env"; // Import for environment validation

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/personalized" element={<PersonalizedFeed />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
