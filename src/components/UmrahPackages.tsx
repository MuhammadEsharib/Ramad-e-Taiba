import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UMRAH_PACKAGES } from '../data/mockData';
import { UmrahPackage, Currency, Language } from '../types';
import { translations } from '../data/translations';
import { convertPKRToCurrency, ExchangeRates } from '../utils/currencyConverter';
import { openWhatsAppInquiry } from '../utils/formatters';
import { PackageRatingReview } from './PackageRatingReview';
import { PackageCardSkeleton } from './PackageCardSkeleton';
import { 
  Moon, 
  Star, 
  CheckCircle2, 
  Building2, 
  X, 
  ShieldCheck,
  ArrowUpDown,
  Filter,
  Calendar
} from 'lucide-react';

interface UmrahPackagesProps {
  currency: Currency;
  language: Language;
  liveRates?: ExchangeRates;
  isLoading?: boolean;
  onOpenBookingModal: (pkgTitle?: string) => void;
}

export const UmrahPackages: React.FC<UmrahPackagesProps> = ({
  currency,
  language,
  liveRates,
  isLoading = false,
  onOpenBookingModal
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'economy' | 'executive' | 'vip' | 'ramadan'>('all');
  const [sortOption, setSortOption] = useState<'price-asc' | 'price-desc' | 'popularity' | 'duration'>('price-asc');
  const [selectedPackage, setSelectedPackage] = useState<UmrahPackage | null>(null);
  const t = translations[language];

  // 1. Filter packages by category
  const filtered = UMRAH_PACKAGES.filter(pkg => {
    if (activeFilter === 'all') return true;
    return pkg.type === activeFilter;
  });

  // 2. Sort packages based on selected sorting option
  const sortedPackages = [...filtered].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return a.pricePKR - b.pricePKR;
    }
    if (sortOption === 'price-desc') {
      return b.pricePKR - a.pricePKR;
    }
    if (sortOption === 'popularity') {
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    }
    if (sortOption === 'duration') {
      return a.durationDays - b.durationDays;
    }
    return 0;
  });

  return (
    <section id="umrah" className="py-20 bg-white text-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold uppercase tracking-widest rounded-full mb-3">
            <Moon className="w-3.5 h-3.5 fill-[#D4AF37]" />
            {t.umrahBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0B1F3A]">
            {t.umrahTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
            {t.umrahSubtitle}
          </p>
        </div>

        {/* Category Filters & Sorting Dropdown Row */}
        <div className="bg-[#F6F8FC] p-4 rounded-[24px] border border-gray-100 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: t.umrahTabAll },
              { id: 'economy', label: t.umrahTabEconomy },
              { id: 'executive', label: t.umrahTabExecutive },
              { id: 'vip', label: t.umrahTabVIP },
              { id: 'ramadan', label: t.umrahTabRamadan }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeFilter === filter.id
                    ? 'bg-[#0B1F3A] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Sorting Dropdown Menu */}
          <div className="flex items-center gap-2 shrink-0 bg-white px-3.5 py-2 rounded-full border border-gray-200 shadow-sm w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#1E5EFF]" />
              <span>{language === 'ur' ? 'ترتیب دیں:' : 'Sort By:'}</span>
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-transparent text-xs font-extrabold text-[#0B1F3A] focus:outline-none cursor-pointer pr-2"
            >
              <option value="price-asc" className="bg-white text-gray-900">
                {language === 'ur' ? 'قیمت: کم سے زیادہ' : 'Price: Low to High'}
              </option>
              <option value="price-desc" className="bg-white text-gray-900">
                {language === 'ur' ? 'قیمت: زیادہ سے کم' : 'Price: High to Low'}
              </option>
              <option value="popularity" className="bg-white text-gray-900">
                {language === 'ur' ? 'مقبولیت (Popularity)' : 'Popularity / Featured'}
              </option>
              <option value="duration" className="bg-white text-gray-900">
                {language === 'ur' ? 'مدت (دن)' : 'Duration (Shortest First)'}
              </option>
            </select>
          </div>

        </div>

        {/* Package Cards Grid */}
        {isLoading || (currency !== 'PKR' && !liveRates) ? (
          <PackageCardSkeleton count={3} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPackages.map((pkg, idx) => {
              const priceInfo = convertPKRToCurrency(pkg.pricePKR, currency, liveRates);
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#F6F8FC] rounded-[28px] overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  {/* Image Header with Badge */}
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    <img
                      src={pkg.featuredImage}
                      alt={pkg.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1565552070098-0073a126829c?auto=format&fit=crop&q=80&w=800');
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-transparent to-transparent"></div>

                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-[#0B1F3A]/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase rounded-full border border-white/20">
                        {pkg.durationDays} Days
                      </span>
                      {pkg.popular && (
                        <span className="px-3 py-1 bg-[#D4AF37] text-[#0B1F3A] text-[10px] font-extrabold uppercase rounded-full shadow-md flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#0B1F3A]" />
                          Popular Choice
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest block">
                          {t.startingFrom}
                        </span>
                        <div className="text-2xl font-extrabold font-display text-white">
                          {priceInfo.formatted}
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-300 font-medium">{t.perPerson}</span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-display text-[#0B1F3A] mb-3">
                      {language === 'ur' && pkg.titleUr ? pkg.titleUr : pkg.title}
                    </h3>

                    {/* Customer Review & Rating Social Proof Component */}
                    <PackageRatingReview
                      packageId={pkg.id}
                      packageName={language === 'ur' && pkg.titleUr ? pkg.titleUr : pkg.title}
                      language={language}
                    />

                    {/* Hotels Distance Info */}
                    <div className="space-y-3 mb-6 bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm">
                      <div className="flex items-start gap-2.5 text-xs">
                        <Building2 className="w-4 h-4 text-[#1E5EFF] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-[#0B1F3A] flex items-center gap-1">
                            {t.makkahHotelLabel}: {pkg.makkahHotel.name}
                            <span className="flex text-[#D4AF37]">{Array(pkg.makkahHotel.stars).fill('★').join('')}</span>
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {language === 'ur' && pkg.makkahHotel.distanceUr ? pkg.makkahHotel.distanceUr : pkg.makkahHotel.distance}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 text-xs border-t border-gray-100 pt-2.5">
                        <Building2 className="w-4 h-4 text-[#1E5EFF] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-[#0B1F3A] flex items-center gap-1">
                            {t.madinahHotelLabel}: {pkg.madinahHotel.name}
                            <span className="flex text-[#D4AF37]">{Array(pkg.madinahHotel.stars).fill('★').join('')}</span>
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {language === 'ur' && pkg.madinahHotel.distanceUr ? pkg.madinahHotel.distanceUr : pkg.madinahHotel.distance}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inclusions checklist */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-bold uppercase text-gray-400 tracking-wider">{t.includes}</span>
                      {(language === 'ur' && pkg.highlightsUr ? pkg.highlightsUr : pkg.highlights).map((hl, i) => (
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
                    onClick={() => setSelectedPackage(pkg)}
                    className="flex-1 py-3 px-3 bg-white border border-gray-200 text-[#0B1F3A] font-bold text-xs uppercase tracking-wider rounded-[16px] hover:bg-gray-100 transition-colors whitespace-nowrap min-w-0 flex items-center justify-center"
                  >
                    {t.viewDetails}
                  </button>
                  <button
                    onClick={() => onOpenBookingModal(language === 'ur' && pkg.titleUr ? pkg.titleUr : pkg.title)}
                    className="flex-1 py-3 px-3 bg-[#1E5EFF] text-white font-bold text-xs uppercase tracking-wider rounded-[16px] hover:bg-blue-600 transition-colors shadow-md whitespace-nowrap min-w-0 flex items-center justify-center"
                  >
                    {t.bookPackage}
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>
        )}

      </div>

      {/* Package Itinerary & Details Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white text-gray-900 rounded-[28px] max-w-3xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-gray-100">
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 border-b border-gray-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-[#1E5EFF] tracking-wider">
                  {selectedPackage.durationDays} {language === 'ur' ? 'دن کا عمرہ پیکج' : 'Days Umrah Package'}
                </span>
                <h3 className="text-2xl font-extrabold font-display text-[#0B1F3A] mt-1">
                  {language === 'ur' && selectedPackage.titleUr ? selectedPackage.titleUr : selectedPackage.title}
                </h3>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <span className="text-xs text-gray-400 font-bold uppercase block">{t.startingFrom}</span>
                <span className="text-2xl font-black text-[#0B1F3A]">
                  {convertPKRToCurrency(selectedPackage.pricePKR, currency, liveRates).formatted}
                </span>
              </div>
            </div>

            {/* Inclusions Detail */}
            <div className="mb-6 bg-[#F6F8FC] p-4 rounded-2xl border border-gray-100">
              <h4 className="font-extrabold text-sm text-[#0B1F3A] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.includes}</span>
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-700">
                {(language === 'ur' && selectedPackage.inclusionsUr ? selectedPackage.inclusionsUr : selectedPackage.inclusions).map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Day by Day Itinerary */}
            <div>
              <h4 className="font-extrabold text-sm text-[#0B1F3A] mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>{t.itinerary}</span>
              </h4>
              <div className="space-y-4 mb-8">
                {selectedPackage.itinerary.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                    <span className="px-3 py-1 bg-[#0B1F3A] text-[#D4AF37] font-bold text-xs rounded-xl self-start shrink-0">
                      {item.day}
                    </span>
                    <div>
                      <h5 className="font-bold text-xs text-[#0B1F3A]">
                        {language === 'ur' && item.titleUr ? item.titleUr : item.title}
                      </h5>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        {language === 'ur' && item.descriptionUr ? item.descriptionUr : item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setSelectedPackage(null);
                  onOpenBookingModal(selectedPackage.title);
                }}
                className="flex-1 py-4 bg-[#1E5EFF] text-white font-bold text-xs uppercase tracking-wider rounded-[18px] hover:bg-blue-600 transition-colors shadow-md"
              >
                {t.bookPackage}
              </button>
              <button
                onClick={() => {
                  openWhatsAppInquiry(`Assalamu Alaikum! I would like to inquire about the ${selectedPackage.title} (${selectedPackage.durationDays} Days). Please guide me on flight dates.`);
                }}
                className="flex-1 py-4 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider rounded-[18px] hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                WhatsApp Consultation
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
