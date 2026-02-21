import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import FreedomSection from './sections/FreedomSection';
import CardShowcaseSection from './sections/CardShowcaseSection';
import PricingSection from './sections/PricingSection';
import ReviewsSection from './sections/ReviewsSection';
import InvestmentSection from './sections/InvestmentSection';
import SecuritySection from './sections/SecuritySection';
import PartnersSection from './sections/PartnersSection';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FreedomSection />
        <CardShowcaseSection />
        <PricingSection />
        <ReviewsSection />
        <InvestmentSection />
        <SecuritySection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
