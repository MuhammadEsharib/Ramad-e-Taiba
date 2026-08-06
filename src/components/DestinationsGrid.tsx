import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DESTINATIONS } from '../data/mockData';
import { Currency, Language } from '../types';
import { translations } from '../data/translations';
import { convertPKRToCurrency, ExchangeRates } from '../utils/currencyConverter';
import { openWhatsAppInquiry } from '../utils/formatters';
import { Plane, FileCheck, ArrowUpRight, MapPin, Grid } from 'lucide-react';
import { InteractiveDestinationsMap } from './InteractiveDestinationsMap';

interface DestinationsGridProps {
  currency: Currency;
  language: Language;
  liveRates?: ExchangeRates;
  onOpenBookingModal: (destName?: string) => void;
}

export const DestinationsGrid: React.FC<DestinationsGridProps> = ({
  currency,
  language,
  liveRates,
  onOpenBookingModal
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'holy' | 'international' | 'domestic'>('all');
  const [displayMode, setDisplayMode] = useState<'grid' | 'map'>('map');
  const t = translations[language];

  const filtered = DESTINATIONS.filter(d => {
    if (activeCategory === 'all') return true;
    return d.category === activeCategory;
  });

  return (
    <section id="destinations" className="py-20 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="px-3.5 py-1.5 bg-[#1E5EFF]/10 text-[#1E5EFF] text-xs font-bold uppercase tracking-widest rounded-full">
              {t.destBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0B1F3A] mt-3">
              {t.destTitle}
            </h2>
            <p className="text-gray-600 text-sm mt-2 max-w-xl">
              {t.destSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Switcher Button */}
            <div className="flex items-center gap-1 bg-gray-100 p-1.5 rounded-full border border-gray-200">
              <button
                onClick={() => setDisplayMode('map')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  displayMode === 'map' ? 'bg-[#1E5EFF] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                Interactive Map
              </button>
              <button
                onClick={() => setDisplayMode('grid')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  displayMode === 'grid' ? 'bg-[#1E5EFF] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                Photo Grid
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: t.umrahTabAll },
                { id: 'holy', label: '🕌 Holy Sites' },
                { id: 'international', label: '✈️ International' },
                { id: 'domestic', label: '🏔️ Northern Pakistan' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#0B1F3A] text-white shadow-md'
                      : 'bg-[#F6F8FC] text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Display Mode Switch: Map or Grid */}
        {displayMode === 'map' ? (
          <InteractiveDestinationsMap
            currency={currency}
            language={language}
            liveRates={liveRates}
            onOpenBookingModal={onOpenBookingModal}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((dest, idx) => {
              const priceInfo = convertPKRToCurrency(dest.startingPricePKR, currency, liveRates);
              return (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="group relative rounded-[28px] overflow-hidden h-96 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gray-200"
                  onClick={() => onOpenBookingModal(dest.name)}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800');
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent"></div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[11px] font-bold border border-white/20">
                    {t.startingFrom} {priceInfo.formatted}
                  </div>

                  {/* Card Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase text-[#D4AF37] tracking-wider">
                        {language === 'ur' && dest.countryUr ? dest.countryUr : dest.country}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#1E5EFF] transition-colors">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-display font-extrabold text-white mb-3">
                      {language === 'ur' && dest.nameUr ? dest.nameUr : dest.name}
                    </h3>

                    <div className="space-y-1.5 border-t border-white/10 pt-3 text-[11px] text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-[#1E5EFF]" />
                        <span>{t.flightTimeFromKHI}: {language === 'ur' && dest.flightTimeUr ? dest.flightTimeUr : dest.flightTimeFromKarachi}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{language === 'ur' ? 'ویزہ:' : 'Visa:'} {language === 'ur' && dest.visaRequiredUr ? dest.visaRequiredUr : dest.visaRequired}</span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
