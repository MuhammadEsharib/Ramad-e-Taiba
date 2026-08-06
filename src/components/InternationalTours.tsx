import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TOUR_PACKAGES } from '../data/mockData';
import { TourPackage, Currency, Language } from '../types';
import { translations } from '../data/translations';
import { convertPKRToCurrency, ExchangeRates } from '../utils/currencyConverter';
import { openWhatsAppInquiry } from '../utils/formatters';
import { PackageRatingReview } from './PackageRatingReview';
import { PackageCardSkeleton } from './PackageCardSkeleton';
import { 
  Plane, 
  FileCheck, 
  CheckCircle2, 
  MapPin, 
  Calculator, 
  X,
  Hotel,
  ArrowUpDown
} from 'lucide-react';

interface InternationalToursProps {
  currency: Currency;
  language: Language;
  liveRates?: ExchangeRates;
  isLoading?: boolean;
  onOpenBookingModal: (pkgTitle?: string) => void;
}

export const InternationalTours: React.FC<InternationalToursProps> = ({
  currency,
  language,
  liveRates,
  isLoading = false,
  onOpenBookingModal
}) => {
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [sortOption, setSortOption] = useState<'price-asc' | 'price-desc' | 'popularity' | 'duration'>('price-asc');
  const t = translations[language];

  // Cost Calculator State
  const [calcDest, setCalcDest] = useState(TOUR_PACKAGES[0].id);
  const [calcAdults, setCalcAdults] = useState(2);
  const [calcChildren, setCalcChildren] = useState(0);
  const [calcHotelTier, setCalcHotelTier] = useState<'3star' | '4star' | '5star'>('4star');

  const selectedTourObj = TOUR_PACKAGES.find(t => t.id === calcDest) || TOUR_PACKAGES[0];
  
  // Dynamic Calculation Logic
  const basePricePKR = selectedTourObj.pricePKR;
  const hotelMultiplier = calcHotelTier === '3star' ? 0.88 : calcHotelTier === '5star' ? 1.35 : 1.0;
  const adultTotal = calcAdults * (basePricePKR * hotelMultiplier);
  const childTotal = calcChildren * (basePricePKR * hotelMultiplier * 0.7);
  const estimatedTotalPKR = Math.round(adultTotal + childTotal);

  // Sorting packages
  const sortedTours = [...TOUR_PACKAGES].sort((a, b) => {
    if (sortOption === 'price-asc') return a.pricePKR - b.pricePKR;
    if (sortOption === 'price-desc') return b.pricePKR - a.pricePKR;
    if (sortOption === 'popularity') return (b.badge ? 1 : 0) - (a.badge ? 1 : 0);
    if (sortOption === 'duration') return parseInt(a.duration) - parseInt(b.duration);
    return 0;
  });

  return (
    <section id="tours" className="py-20 bg-[#F6F8FC] text-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1.5 bg-[#1E5EFF]/10 text-[#1E5EFF] text-xs font-bold uppercase tracking-widest rounded-full">
            {t.toursBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0B1F3A] mt-3">
            {t.toursTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
            {t.toursSubtitle}
          </p>
        </div>

        {/* Sorting Dropdown Control */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm flex-col sm:flex-row gap-4">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {language === 'ur' ? 'دستیاب انٹرنیشنل ٹورز:' : 'Featured Tour Packages:'}
          </div>
          <div className="flex items-center gap-2 bg-[#F6F8FC] px-4 py-2 rounded-full border border-gray-200 shadow-sm w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 uppercase tracking-wider">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#1E5EFF]" />
              <span>{language === 'ur' ? 'ترتیب دیں:' : 'Sort By:'}</span>
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-transparent text-xs font-extrabold text-[#0B1F3A] focus:outline-none cursor-pointer pr-2"
            >
              <option value="price-asc">{language === 'ur' ? 'قیمت: کم سے زیادہ' : 'Price: Low to High'}</option>
              <option value="price-desc">{language === 'ur' ? 'قیمت: زیادہ سے کم' : 'Price: High to Low'}</option>
              <option value="popularity">{language === 'ur' ? 'مقبولیت / بیچ' : 'Popularity / Featured'}</option>
              <option value="duration">{language === 'ur' ? 'مدت (دن)' : 'Duration'}</option>
            </select>
          </div>
        </div>

        {/* Tour Cards Grid */}
        {isLoading || (currency !== 'PKR' && !liveRates) ? (
          <div className="mb-16">
            <PackageCardSkeleton count={3} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {sortedTours.map((tour, idx) => {
              const priceInfo = convertPKRToCurrency(tour.pricePKR, currency, liveRates);
            return (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800');
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent"></div>

                    {tour.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-[10px] uppercase rounded-full shadow-md">
                        {language === 'ur' && tour.badgeUr ? tour.badgeUr : tour.badge}
                      </span>
                    )}

                    <span className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white font-extrabold text-[10px] uppercase rounded-full border border-white/20">
                      {language === 'ur' && tour.durationUr ? tour.durationUr : tour.duration}
                    </span>

                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest block">{t.startingFrom}</span>
                      <span className="text-2xl font-extrabold font-display text-white">
                        {priceInfo.formatted}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1E5EFF] mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{language === 'ur' && tour.destinationUr ? tour.destinationUr : tour.destination} ({tour.country})</span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-[#0B1F3A] mb-3">
                      {language === 'ur' && tour.titleUr ? tour.titleUr : tour.title}
                    </h3>

                    {/* Customer Review & Rating Social Proof Component */}
                    <PackageRatingReview
                      packageId={tour.id}
                      packageName={language === 'ur' && tour.titleUr ? tour.titleUr : tour.title}
                      language={language}
                    />

                    <div className="flex flex-wrap gap-2 mb-4">
                      {tour.flightsIncluded && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-[#1E5EFF]">
                          <Plane className="w-3 h-3" /> {t.flightsIncluded}
                        </span>
                      )}
                      {tour.visaAssistance && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600">
                          <FileCheck className="w-3 h-3" /> {t.visaAssistance}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mb-6">
                      {(language === 'ur' && tour.highlightsUr ? tour.highlightsUr : tour.highlights).slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5EFF] shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 flex gap-3">
                  <button
                    onClick={() => setSelectedTour(tour)}
                    className="flex-1 py-3 px-3 bg-[#F6F8FC] border border-gray-200 text-[#0B1F3A] font-bold text-xs uppercase tracking-wider rounded-[16px] hover:bg-gray-200 transition-colors whitespace-nowrap min-w-0 flex items-center justify-center"
                  >
                    {t.viewDetails}
                  </button>
                  <button
                    onClick={() => onOpenBookingModal(language === 'ur' && tour.titleUr ? tour.titleUr : tour.title)}
                    className="flex-1 py-3 px-3 bg-[#0B1F3A] text-white font-bold text-xs uppercase tracking-wider rounded-[16px] hover:bg-[#1E5EFF] transition-colors shadow-md whitespace-nowrap min-w-0 flex items-center justify-center"
                  >
                    {t.bookPackage}
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>
        )}

        {/* Interactive Custom Tour Price Estimator Widget */}
        <div className="bg-gradient-to-r from-[#0B1F3A] via-[#153966] to-[#1E5EFF] rounded-[32px] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                {t.estimatorTitle}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-display font-extrabold mb-2">
              {t.estimatorTitle}
            </h3>
            <p className="text-xs md:text-sm text-gray-200 mb-8 font-light">
              {t.estimatorSubtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">{t.estimatorSelectDest}</label>
                <select
                  value={calcDest}
                  onChange={(e) => setCalcDest(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-[14px] p-3 text-xs font-bold text-white focus:outline-none focus:bg-[#0B1F3A]"
                >
                  {TOUR_PACKAGES.map(tObj => (
                    <option key={tObj.id} value={tObj.id} className="bg-[#0B1F3A] text-white">
                      {language === 'ur' && tObj.titleUr ? tObj.titleUr : tObj.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">{t.estimatorNumTravelers} (Adults)</label>
                <select
                  value={calcAdults}
                  onChange={(e) => setCalcAdults(Number(e.target.value))}
                  className="w-full bg-white/10 border border-white/20 rounded-[14px] p-3 text-xs font-bold text-white focus:outline-none focus:bg-[#0B1F3A]"
                >
                  {[1,2,3,4,5,6,8,10].map(n => (
                    <option key={n} value={n} className="bg-[#0B1F3A] text-white">{n} Adult(s)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Children (2-11 Yrs)</label>
                <select
                  value={calcChildren}
                  onChange={(e) => setCalcChildren(Number(e.target.value))}
                  className="w-full bg-white/10 border border-white/20 rounded-[14px] p-3 text-xs font-bold text-white focus:outline-none focus:bg-[#0B1F3A]"
                >
                  {[0,1,2,3,4].map(n => (
                    <option key={n} value={n} className="bg-[#0B1F3A] text-white">{n} Child(ren)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">{t.estimatorHotelTier}</label>
                <select
                  value={calcHotelTier}
                  onChange={(e) => setCalcHotelTier(e.target.value as any)}
                  className="w-full bg-white/10 border border-white/20 rounded-[14px] p-3 text-xs font-bold text-white focus:outline-none focus:bg-[#0B1F3A]"
                >
                  <option value="3star" className="bg-[#0B1F3A] text-white">3-Star Standard</option>
                  <option value="4star" className="bg-[#0B1F3A] text-white">4-Star Deluxe</option>
                  <option value="5star" className="bg-[#0B1F3A] text-white">5-Star VIP Luxury</option>
                </select>
              </div>

            </div>

            {/* Total Result Display & WhatsApp CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-black/30 backdrop-blur-md p-6 rounded-[20px] border border-white/10">
              <div>
                <span className="text-xs text-gray-300 uppercase tracking-wider block">{t.estimatorEstimatedTotal} ({calcAdults} Adults, {calcChildren} Kids)</span>
                <span className="text-3xl font-display font-extrabold text-[#D4AF37]">
                  {convertPKRToCurrency(estimatedTotalPKR, currency, liveRates).formatted}
                </span>
              </div>

              <button
                onClick={() => {
                  const formattedConverted = convertPKRToCurrency(estimatedTotalPKR, currency, liveRates).formatted;
                  openWhatsAppInquiry(`Assalamu Alaikum Pak World Travel! I calculated an estimate for ${selectedTourObj.title} for ${calcAdults} Adult(s) and ${calcChildren} Child(ren) with ${calcHotelTier.toUpperCase()} hotel. Estimated Quote: ${formattedConverted}. Please send full itinerary & details.`);
                }}
                className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-amber-400 text-[#0B1F3A] font-extrabold text-xs uppercase tracking-wider rounded-[16px] transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
              >
                {t.estimatorBookThisTrip}
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Tour Modal */}
      {selectedTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white text-gray-900 rounded-[28px] max-w-3xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-gray-100">
            <button
              onClick={() => setSelectedTour(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 border-b border-gray-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-[#1E5EFF] tracking-wider">
                  {selectedTour.duration}
                </span>
                <h3 className="text-2xl font-bold font-display text-[#0B1F3A]">
                  {selectedTour.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 block">{t.startingFrom}</span>
                <span className="text-2xl font-extrabold text-[#1E5EFF]">
                  {convertPKRToCurrency(selectedTour.pricePKR, currency, liveRates).formatted}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Hotel className="w-4 h-4 text-[#1E5EFF]" />
                <span>Accommodation: <strong>{selectedTour.hotels}</strong></span>
              </div>

              <div className="bg-[#F6F8FC] p-4 rounded-[18px]">
                <h4 className="font-bold text-xs uppercase text-gray-500 mb-2">{t.includes}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedTour.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5EFF]" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h4 className="font-bold text-sm uppercase tracking-wider mb-3">{t.itinerary}</h4>
            <div className="space-y-3 mb-8">
              {selectedTour.itinerary.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-gray-50 rounded-[16px] border border-gray-100">
                  <div className="font-bold text-xs text-[#1E5EFF]">{item.day}: {item.title}</div>
                  <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSelectedTour(null);
                  onOpenBookingModal(selectedTour.title);
                }}
                className="flex-1 py-3.5 bg-[#1E5EFF] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-[18px] transition-colors"
              >
                {t.bookPackage}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
