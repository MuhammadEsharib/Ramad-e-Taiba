import React, { useState, useEffect } from 'react';
import { Currency, Language } from './types';
import { fetchLiveExchangeRates, ExchangeRates } from './utils/currencyConverter';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { UmrahPackages } from './components/UmrahPackages';
import { InternationalTours } from './components/InternationalTours';
import { DestinationsGrid } from './components/DestinationsGrid';
import { TravelInsightsBlog } from './components/TravelInsightsBlog';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BookingProcess } from './components/BookingProcess';
import { PhotoGallery } from './components/PhotoGallery';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AITravelAssistant } from './components/AITravelAssistant';
import { FloatingControls } from './components/FloatingControls';
import { BookingModal } from './components/BookingModal';
import { CurrencyConverterWidget } from './components/CurrencyConverterWidget';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('PKR');
  const [language, setLanguage] = useState<Language>('en');
  const [liveRates, setLiveRates] = useState<ExchangeRates | undefined>(undefined);
  const [isLiveRates, setIsLiveRates] = useState<boolean>(false);

  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedPresetPackage, setSelectedPresetPackage] = useState<string>('');
  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);

  // Sync document direction and lang for RTL / Urdu support
  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ur' ? 'rtl' : 'ltr');
  }, [language]);

  // Fetch Live Exchange Rates on mount
  useEffect(() => {
    async function loadRates() {
      const res = await fetchLiveExchangeRates();
      if (res && res.rates) {
        setLiveRates(res.rates);
        setIsLiveRates(res.isLive);
      }
    }
    loadRates();
  }, []);

  const handleOpenBookingModal = (pkgTitle?: string) => {
    setSelectedPresetPackage(pkgTitle || '');
    setBookingModalOpen(true);
  };

  return (
    <div
      dir={language === 'ur' ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white text-gray-900 font-sans selection:bg-[#1E5EFF] selection:text-white transition-colors duration-300 ${
        language === 'ur' ? 'font-urdu' : ''
      }`}
    >
      
      {/* 01. Sticky Header Navbar */}
      <Header
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
        isLiveRates={isLiveRates}
        onOpenBookingModal={handleOpenBookingModal}
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Main Page Layout (Sections 01 - 13) */}
      <main>
        {/* 01. Hero Section */}
        <Hero
          currency={currency}
          language={language}
          liveRates={liveRates}
          onOpenBookingModal={handleOpenBookingModal}
          onOpenAIAssistant={() => setAiAssistantOpen(true)}
        />

        {/* 02. Trusted Partners Bar */}
        <TrustBar language={language} />

        {/* 03. About Us Section */}
        <AboutUs language={language} />

        {/* 04. Our Services */}
        <Services language={language} onOpenBookingModal={handleOpenBookingModal} />

        {/* 05. Featured Umrah Packages */}
        <UmrahPackages
          currency={currency}
          language={language}
          liveRates={liveRates}
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* 06. International Tour Packages & Custom Estimator */}
        <InternationalTours
          currency={currency}
          language={language}
          liveRates={liveRates}
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* 07. Popular Destinations Showcase */}
        <DestinationsGrid
          currency={currency}
          language={language}
          liveRates={liveRates}
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* Currency Converter Feature Widget */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <CurrencyConverterWidget
            currency={currency}
            setCurrency={setCurrency}
            language={language}
            liveRates={liveRates}
            isLiveRates={isLiveRates}
          />
        </section>

        {/* 08. Travel Insights & Expert Blog */}
        <TravelInsightsBlog
          language={language}
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* 09. Why Choose Us */}
        <WhyChooseUs language={language} />

        {/* 09. Booking Process */}
        <BookingProcess language={language} />

        {/* 10. Photo Gallery */}
        <PhotoGallery language={language} />

        {/* 11. Customer Testimonials */}
        <Testimonials language={language} />

        {/* 12. FAQ */}
        <FAQ language={language} />

        {/* 13. Contact & Google Map */}
        <ContactSection language={language} />
      </main>

      {/* 14. Footer */}
      <Footer language={language} />

      {/* Floating Action Controls */}
      <FloatingControls
        language={language}
        onOpenBookingModal={() => handleOpenBookingModal()}
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        presetTitle={selectedPresetPackage}
        language={language}
        currency={currency}
        liveRates={liveRates}
      />

      <AITravelAssistant
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        language={language}
      />

    </div>
  );
}
