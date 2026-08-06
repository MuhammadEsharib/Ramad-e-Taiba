import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DESTINATIONS } from '../data/mockData';
import { Destination, Currency, Language } from '../types';
import { convertPKRToCurrency, ExchangeRates } from '../utils/currencyConverter';
import { openWhatsAppInquiry } from '../utils/formatters';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { 
  MapPin, 
  Plane, 
  FileCheck, 
  Sparkles, 
  ExternalLink, 
  X, 
  Compass, 
  Navigation, 
  Globe2, 
  Calendar,
  Layers,
  Info
} from 'lucide-react';

interface InteractiveDestinationsMapProps {
  currency: Currency;
  language: Language;
  liveRates?: ExchangeRates;
  onOpenBookingModal: (destName?: string) => void;
}

// Lat, Lng coordinates for popular spots
const DESTINATION_COORDS: Record<string, { lat: number; lng: number; xPercent: number; yPercent: number }> = {
  makkah: { lat: 21.4225, lng: 39.8262, xPercent: 52, yPercent: 48 },
  madinah: { lat: 24.4672, lng: 39.6112, xPercent: 51, yPercent: 44 },
  dubai: { lat: 25.2048, lng: 55.2708, xPercent: 58, yPercent: 45 },
  istanbul: { lat: 41.0082, lng: 28.9784, xPercent: 44, yPercent: 32 },
  baku: { lat: 40.4093, lng: 49.8671, xPercent: 54, yPercent: 33 },
  skardu: { lat: 35.2971, lng: 75.6333, xPercent: 68, yPercent: 36 },
  "swat-kalam": { lat: 35.2227, lng: 72.4258, xPercent: 66, yPercent: 37 },
  "kuala-lumpur": { lat: 3.1390, lng: 101.6869, xPercent: 78, yPercent: 62 }
};

export const InteractiveDestinationsMap: React.FC<InteractiveDestinationsMapProps> = ({
  currency,
  language,
  liveRates,
  onOpenBookingModal
}) => {
  const [selectedDest, setSelectedDest] = useState<Destination>(DESTINATIONS[0]);
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [mapMode, setMapMode] = useState<'satellite' | 'roadmap' | 'arcs'>('satellite');
  const [isGroundingLoading, setIsGroundingLoading] = useState<boolean>(false);
  const [groundingData, setGroundingData] = useState<{ overview: string; groundingChunks: any[]; isLiveGrounding: boolean } | null>(null);
  const [isGroundingModalOpen, setIsGroundingModalOpen] = useState<boolean>(false);

  const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
  const hasValidGoogleKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

  // Handler to fetch live Google Maps Grounding place insights from backend Express server
  const handleFetchGrounding = async (dest: Destination) => {
    setIsGroundingLoading(true);
    setIsGroundingModalOpen(true);
    setGroundingData(null);

    try {
      const res = await fetch('/api/maps/place-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeName: `${dest.name}, ${dest.country}`,
          query: `Provide major attractions, distance from Karachi Airport, pilgrimage/travel advice, and reviews summary for ${dest.name}, ${dest.country}.`
        })
      });
      const data = await res.json();
      setGroundingData(data);
    } catch (err) {
      setGroundingData({
        overview: `${selectedDest.name} is a premier destination managed by Ramad-e-Taiba Travel & Tours North Nazimabad Karachi. Direct flight bookings and visa consultancy available.`,
        groundingChunks: [],
        isLiveGrounding: false
      });
    } finally {
      setIsGroundingLoading(false);
    }
  };

  const selectedCoords = DESTINATION_COORDS[selectedDest.id] || { lat: 24.8607, lng: 67.0011, xPercent: 50, yPercent: 50 };
  const priceInfo = convertPKRToCurrency(selectedDest.startingPricePKR, currency, liveRates);

  return (
    <div className="bg-[#0B1F3A] text-white rounded-[32px] p-6 md:p-10 shadow-2xl overflow-hidden relative border border-white/10">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E5EFF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Map Header Controls */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1E5EFF]/20 text-[#1E5EFF] text-xs font-extrabold uppercase tracking-widest rounded-full border border-[#1E5EFF]/30">
            <Globe2 className="w-3.5 h-3.5 text-[#1E5EFF]" />
            Interactive Global Destinations
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white mt-2">
            Explore Popular Travel Spots & Routes
          </h3>
          <p className="text-xs md:text-sm text-gray-300 mt-1">
            Click on any custom pin marker to view flight times from Karachi, visa requirements, starting packages, and live Google Maps insights.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-full border border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'map' ? 'bg-[#1E5EFF] text-white shadow-md' : 'text-gray-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Interactive Map
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'list' ? 'bg-[#1E5EFF] text-white shadow-md' : 'text-gray-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Spot Selector
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left/Center Interactive Map Frame (7 or 8 columns) */}
        <div className="lg:col-span-8 rounded-[28px] overflow-hidden border border-white/15 bg-[#081528] shadow-2xl relative min-h-[460px] flex flex-col justify-between p-4">
          
          {/* Map Mode Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 bg-black/40 p-2 rounded-2xl border border-white/10 z-20">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setMapMode('satellite')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                  mapMode === 'satellite' ? 'bg-[#1E5EFF] text-white shadow' : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <span>🛰️ Satellite 3D</span>
              </button>
              <button
                onClick={() => setMapMode('roadmap')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                  mapMode === 'roadmap' ? 'bg-[#1E5EFF] text-white shadow' : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <span>🗺️ Roadmap</span>
              </button>
              <button
                onClick={() => setMapMode('arcs')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                  mapMode === 'arcs' ? 'bg-[#1E5EFF] text-white shadow' : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <span>✈️ Flight Arcs</span>
              </button>
            </div>

            <div className="text-[11px] font-bold text-[#D4AF37] px-2">
              Viewing: <span className="text-white font-extrabold">{selectedDest.name} ({selectedDest.country})</span>
            </div>
          </div>

          {mapMode === 'satellite' || mapMode === 'roadmap' ? (
            /* Real Live Google Maps Embedded Interactive View (Supports 3D/Satellite zoom & pan) */
            <div className="w-full h-[400px] rounded-[22px] overflow-hidden border border-white/10 relative shadow-inner">
              <iframe
                title={`Google Map - ${selectedDest.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedDest.name + ' ' + selectedDest.country)}&t=${mapMode === 'satellite' ? 'k' : 'm'}&z=13&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          ) : (
            /* Flight Network Custom Interactive Map with Karachi Origin Arcs */
            <div className="relative w-full h-[400px] rounded-[22px] bg-gradient-to-br from-[#0a192f] via-[#0d2242] to-[#081324] overflow-hidden border border-white/10 flex flex-col justify-between p-4">
              
              {/* World Grid Map Visual Decoration */}
              <div className="absolute inset-0 bg-[radial-gradient(#1E5EFF_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

              {/* Flight Connection Lines overlay SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Center Karachi Hub (approx 63%, 46%) */}
                <circle cx="63%" cy="46%" r="6" fill="#1E5EFF" className="animate-ping opacity-75" />
                <circle cx="63%" cy="46%" r="4" fill="#1E5EFF" />

                {/* Animated Flight Arcs from Karachi to Selected Spot */}
                <path
                  d={`M 63% 46% Q 55% 20% ${selectedCoords.xPercent}% ${selectedCoords.yPercent}%`}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              </svg>

              {/* Top Map Status Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold border border-white/15">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  Origin Hub: Karachi (KHI)
                </div>
                <div className="text-[11px] text-gray-300 bg-white/10 px-3 py-1 rounded-full border border-white/10 hidden sm:block">
                  Latitude: {selectedCoords.lat.toFixed(2)}° • Longitude: {selectedCoords.lng.toFixed(2)}°
                </div>
              </div>

              {/* Pins layer */}
              <div className="relative w-full h-full my-auto z-10">
                {DESTINATIONS.map((dest) => {
                  const coords = DESTINATION_COORDS[dest.id] || { xPercent: 50, yPercent: 50 };
                  const isSelected = dest.id === selectedDest.id;

                  return (
                    <motion.div
                      key={dest.id}
                      style={{
                        left: `${coords.xPercent}%`,
                        top: `${coords.yPercent}%`
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      onClick={() => setSelectedDest(dest)}
                      whileHover={{ scale: 1.25 }}
                    >
                      {/* Pulse Ring */}
                      {isSelected && (
                        <div className="absolute -inset-3 bg-[#1E5EFF] rounded-full opacity-40 animate-ping pointer-events-none" />
                      )}

                      {/* Pin Button */}
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold shadow-xl border transition-all ${
                        isSelected
                          ? 'bg-[#1E5EFF] text-white border-white scale-110 z-30'
                          : 'bg-black/80 text-gray-200 border-white/20 hover:bg-[#D4AF37] hover:text-black z-20'
                      }`}>
                        <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#D4AF37]'}`} />
                        <span className="hidden sm:inline">{dest.name}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Interactive Legend */}
              <div className="relative z-10 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#1E5EFF]" />
                    Selected Spot
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#D4AF37]" />
                    Popular Destinations
                  </span>
                </div>
                <span className="text-gray-400 text-[11px]">
                  Direct flight arcs originating from Karachi Jinnah Airport
                </span>
              </div>

            </div>
          )}

          {/* Quick Spots Thumbnails Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none">
            {DESTINATIONS.map((dest) => {
              const isSelected = dest.id === selectedDest.id;
              return (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDest(dest)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    isSelected
                      ? 'bg-[#1E5EFF] text-white shadow-md'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800');
                    }}
                    className="w-5 h-5 rounded-full object-cover shrink-0"
                  />
                  <span>{dest.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Destination Detail Summary Card (4 columns) */}
        <div className="lg:col-span-4 bg-white/10 backdrop-blur-xl rounded-[28px] p-6 border border-white/15 flex flex-col justify-between shadow-2xl">
          <div>
            {/* Header Image */}
            <div className="relative h-44 rounded-[20px] overflow-hidden mb-5">
              <img
                src={selectedDest.image}
                alt={selectedDest.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800');
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-transparent" />
              <span className="absolute top-3 left-3 px-3 py-1 bg-[#1E5EFF] text-white text-[10px] font-extrabold uppercase rounded-full shadow-md">
                {selectedDest.category === 'holy' ? '🕌 Holy Pilgrimage' : selectedDest.category === 'domestic' ? '🏔️ Domestic North' : '✈️ International'}
              </span>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] text-[#D4AF37] font-bold uppercase tracking-wider block">
                  {selectedDest.country}
                </span>
                <h4 className="text-2xl font-display font-extrabold text-white">
                  {selectedDest.name}
                </h4>
              </div>
            </div>

            {/* Price Badge */}
            <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 mb-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-300 block">Starting Package Rate</span>
                <span className="text-xl font-extrabold text-[#D4AF37]">{priceInfo.formatted}</span>
              </div>
              <span className="text-[10px] text-gray-300 bg-white/10 px-2.5 py-1 rounded-full">Per Person</span>
            </div>

            {/* Key Specs */}
            <div className="space-y-3 mb-6 text-xs text-gray-200">
              <div className="flex items-center gap-2.5 p-2.5 bg-black/20 rounded-xl">
                <Plane className="w-4 h-4 text-[#1E5EFF] shrink-0" />
                <div>
                  <span className="font-bold block text-white">Flight Time from Karachi</span>
                  <span className="text-gray-300">{selectedDest.flightTimeFromKarachi}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 bg-black/20 rounded-xl">
                <FileCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <div>
                  <span className="font-bold block text-white">Visa Approval Status</span>
                  <span className="text-gray-300">{selectedDest.visaRequired}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 bg-black/20 rounded-xl">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold block text-white">Recommended Season</span>
                  <span className="text-gray-300">{selectedDest.bestSeason}</span>
                </div>
              </div>
            </div>

            {/* Highlights List */}
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase text-[#D4AF37] block mb-2">Key Attractions:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDest.highlights.map((hl, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-white/10 rounded-lg text-[11px] font-semibold text-white border border-white/10">
                    • {hl}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2.5 pt-2 border-t border-white/10">
            <button
              onClick={() => handleFetchGrounding(selectedDest)}
              className="w-full py-3 bg-[#1E5EFF] hover:bg-blue-600 text-white font-extrabold text-xs uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              Live Google Maps Grounding
            </button>

            <button
              onClick={() => openWhatsAppInquiry(`Assalamu Alaikum! I would like to inquire about tour/flight packages for ${selectedDest.name} (${selectedDest.country}) from Karachi.`)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Inquire via WhatsApp
            </button>
          </div>

        </div>

      </div>

      {/* Google Maps Grounding Modal */}
      <AnimatePresence>
        {isGroundingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-gray-900 rounded-[28px] max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto border border-gray-200"
            >
              <button
                onClick={() => setIsGroundingModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-[#1E5EFF] text-xs font-extrabold uppercase mb-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                Google Maps Grounding Insights
              </div>

              <h3 className="text-2xl font-display font-extrabold text-[#0B1F3A] mb-4">
                {selectedDest.name} ({selectedDest.country})
              </h3>

              {isGroundingLoading ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-10 h-10 border-4 border-[#1E5EFF] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-bold text-gray-600">Retrieving live Google Maps data & place recommendations for {selectedDest.name}...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Overview Text */}
                  <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 text-xs sm:text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                    {groundingData?.overview}
                  </div>

                  {/* Google Maps Place Grounding Source Links */}
                  {groundingData?.groundingChunks && groundingData.groundingChunks.length > 0 && (
                    <div>
                      <h4 className="text-xs font-extrabold uppercase text-gray-700 mb-3 flex items-center gap-1.5">
                        <Navigation className="w-4 h-4 text-[#1E5EFF]" />
                        Official Google Maps Grounding Sources:
                      </h4>
                      <div className="space-y-2">
                        {groundingData.groundingChunks.map((chunk, idx) => {
                          const mapsData = chunk.maps || chunk.web;
                          if (!mapsData) return null;
                          return (
                            <a
                              key={idx}
                              href={mapsData.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-between text-xs transition-colors group"
                            >
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#1E5EFF]" />
                                <span className="font-bold text-gray-900 group-hover:text-[#1E5EFF]">
                                  {mapsData.title || `Google Maps Place Link #${idx + 1}`}
                                </span>
                              </div>
                              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1E5EFF]" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[11px] text-gray-500">
                      Ramad-e-Taiba Travel & Tours • DTS License No. KHI-8842
                    </span>
                    <button
                      onClick={() => {
                        setIsGroundingModalOpen(false);
                        onOpenBookingModal(language === 'ur' && selectedDest.nameUr ? selectedDest.nameUr : selectedDest.name);
                      }}
                      className="px-6 py-2.5 bg-[#1E5EFF] text-white font-bold text-xs uppercase rounded-full shadow-md"
                    >
                      {language === 'ur' ? 'فلائٹ / پیکج بک کریں' : 'Book Flight / Package'}
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
