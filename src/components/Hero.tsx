import React, { useState } from 'react';
import { Currency, Language } from '../types';
import { translations } from '../data/translations';
import { convertPKRToCurrency, ExchangeRates } from '../utils/currencyConverter';
import { openWhatsAppInquiry } from '../utils/formatters';
import { 
  Search, 
  Plane, 
  Moon, 
  FileCheck, 
  Star, 
  ArrowRight, 
  MapPin, 
  Sparkles
} from 'lucide-react';

interface HeroProps {
  currency: Currency;
  language: Language;
  liveRates?: ExchangeRates;
  onOpenBookingModal: (title?: string) => void;
  onOpenAIAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currency,
  language,
  liveRates,
  onOpenBookingModal,
  onOpenAIAssistant
}) => {
  const [activeTab, setActiveTab] = useState<'umrah' | 'flights' | 'visa'>('umrah');
  const t = translations[language];

  // Search Widget State
  const [umrahPackageType, setUmrahPackageType] = useState('economy');
  const [flightOrigin, setFlightOrigin] = useState('Karachi (KHI)');
  const [flightDestination, setFlightDestination] = useState('Jeddah (JED)');
  const [visaCountry, setVisaCountry] = useState('Saudi Arabia (Umrah/Tourist)');
  const [travelersCount, setTravelersCount] = useState('2');

  const pEconomy = convertPKRToCurrency(218000, currency, liveRates).formatted;
  const pExecutive = convertPKRToCurrency(285000, currency, liveRates).formatted;
  const pVip = convertPKRToCurrency(385000, currency, liveRates).formatted;
  const pRamadan = convertPKRToCurrency(420000, currency, liveRates).formatted;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let msg = "";
    if (activeTab === 'umrah') {
      msg = `Assalamu Alaikum Ramad-e-Taiba Travel! I am looking for an Umrah Package (${umrahPackageType.toUpperCase()}) from Karachi for ${travelersCount} traveler(s). Please share available dates and pricing.`;
    } else if (activeTab === 'flights') {
      msg = `Assalamu Alaikum! Please provide air ticket availability & fares from ${flightOrigin} to ${flightDestination} for ${travelersCount} traveler(s).`;
    } else {
      msg = `Assalamu Alaikum! I need Visa Consultancy support for ${visaCountry} for ${travelersCount} person(s).`;
    }
    openWhatsAppInquiry(msg);
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-[#0B1F3A] text-white pt-8 pb-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1565552070098-0073a126829c?auto=format&fit=crop&q=80&w=2000"
          alt="Makkah and Madinah Luxury Travel Ramad-e-Taiba Travel"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-105 animate-pulse"
          style={{ animationDuration: '25s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-[#0B1F3A]/60"></div>
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Brand Statement */}
          <div className="lg:col-span-7 flex flex-col pt-4">
            
            {/* Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                {t.heroBadge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] text-white mb-6 tracking-tight">
              {t.heroTitleLine1} <br />
              <span className="text-[#1E5EFF] underline decoration-[#D4AF37] decoration-4 underline-offset-8">
                {t.heroTitleLine2}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed font-light">
              {t.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => onOpenBookingModal()}
                className="px-8 py-4 bg-[#1E5EFF] text-white font-bold text-sm uppercase tracking-wider rounded-[18px] flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-blue-900/40 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none min-h-[48px]"
                aria-label="Open Booking Modal to reserve package"
              >
                {t.heroBookCTA}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAIAssistant}
                className="px-6 py-4 bg-gradient-to-r from-[#D4AF37]/20 to-amber-500/20 border border-[#D4AF37] text-[#D4AF37] font-bold text-sm rounded-[18px] flex items-center gap-2 hover:bg-[#D4AF37]/30 transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none min-h-[48px]"
                aria-label="Launch AI Travel Advisor Assistant"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                {t.heroAskAI}
              </button>

              <button
                onClick={() => openWhatsAppInquiry("Assalamu Alaikum Ramad-e-Taiba Travel! I would like a consultation regarding Hajj, Umrah, Flights, Hotels or Visa services.")}
                className="px-6 py-4 border border-white/20 hover:bg-white/10 text-white font-bold text-sm rounded-[18px] transition-all focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none min-h-[48px]"
                aria-label="Inquire via WhatsApp Consultation"
              >
                {t.heroWhatsAppCTA}
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-8">
              <div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">5,000+</div>
                <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">{t.trustPilgrimsServed}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#D4AF37]">10+</div>
                <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">{t.aboutStat1Label}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">100%</div>
                <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">{t.trustBestRate}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#1E5EFF]">24/7</div>
                <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">{t.trustKarachiOffice}</div>
              </div>
            </div>

          </div>

          {/* Right Column: Search Widget Box */}
          <div className="lg:col-span-5 w-full">
            <div className="glass-card rounded-[24px] p-5 sm:p-6 text-gray-900 bg-white shadow-2xl border border-white/20 backdrop-blur-2xl">
              
              {/* Widget Header Tabs */}
              <div 
                className="flex border-b border-gray-200 mb-6 gap-1 sm:gap-2"
                role="tablist"
                aria-label="Package Search Tabs"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'umrah'}
                  onClick={() => setActiveTab('umrah')}
                  className={`flex-1 py-3 text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[44px] ${
                    activeTab === 'umrah'
                      ? 'border-[#1E5EFF] text-[#1E5EFF]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {t.searchTabUmrah}
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'flights'}
                  onClick={() => setActiveTab('flights')}
                  className={`flex-1 py-3 text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[44px] ${
                    activeTab === 'flights'
                      ? 'border-[#1E5EFF] text-[#1E5EFF]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Plane className="w-3.5 h-3.5 text-[#1E5EFF]" />
                  {t.searchTabFlights}
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'visa'}
                  onClick={() => setActiveTab('visa')}
                  className={`flex-1 py-3 text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[44px] ${
                    activeTab === 'visa'
                      ? 'border-[#1E5EFF] text-[#1E5EFF]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <FileCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {t.searchTabVisa}
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSearchSubmit} className="space-y-4">
                {activeTab === 'umrah' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        {t.searchTo}
                      </label>
                      <select
                        value={umrahPackageType}
                        onChange={(e) => setUmrahPackageType(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-[14px] p-3 text-xs font-semibold focus:ring-2 focus:ring-[#1E5EFF] text-gray-900"
                      >
                        <option value="economy">Economy Umrah (15 Days - From {pEconomy})</option>
                        <option value="star4">4-Star Family Choice (15 Days - From {pExecutive})</option>
                        <option value="vip">Executive 5-Star Clock Tower (14 Days - From {pVip})</option>
                        <option value="ramadan">Special Ramadan Package (20 Days - From {pRamadan})</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        {t.searchFrom}
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          readOnly
                          value="Karachi (KHI) - Direct Flights"
                          className="w-full bg-gray-50 border border-gray-200 rounded-[14px] p-3 pl-10 text-xs font-semibold text-gray-800"
                        />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'flights' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">From</label>
                      <input
                        type="text"
                        value={flightOrigin}
                        onChange={(e) => setFlightOrigin(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-[14px] p-3 text-xs font-semibold text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">To</label>
                      <input
                        type="text"
                        value={flightDestination}
                        onChange={(e) => setFlightDestination(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-[14px] p-3 text-xs font-semibold text-gray-900"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'visa' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Destination Country
                    </label>
                    <select
                      value={visaCountry}
                      onChange={(e) => setVisaCountry(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-[14px] p-3 text-xs font-semibold text-gray-900"
                    >
                      <option value="Saudi Arabia (Umrah/Tourist)">Saudi Arabia (Umrah / Tourist Visa)</option>
                      <option value="UAE (Dubai 30-Day Tourist)">UAE (Dubai 30/60 Days)</option>
                      <option value="Turkey (Sticker/E-Visa)">Turkey (Sticker / E-Visa)</option>
                      <option value="Malaysia (E-Visa)">Malaysia (E-Visa)</option>
                      <option value="Azerbaijan (Baku E-Visa)">Azerbaijan (Baku E-Visa)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    {t.searchGuests}
                  </label>
                  <select
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-[14px] p-3 text-xs font-semibold text-gray-900"
                  >
                    <option value="1">1 Person (Single)</option>
                    <option value="2">2 Persons (Couple)</option>
                    <option value="3-4">3-4 Persons (Family)</option>
                    <option value="5+">5+ Persons (Group / Relatives)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1E5EFF] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-[18px] transition-all shadow-lg flex items-center justify-center gap-2 mt-2 active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  {t.searchAction}
                </button>

                <p className="text-[11px] text-center text-gray-500 mt-2">
                  📍 North Nazimabad Karachi Office • Instant WhatsApp Support
                </p>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
