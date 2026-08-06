import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../data/mockData';
import { ServiceItem, Language } from '../types';
import { translations } from '../data/translations';
import { ApplicationTracker } from './ApplicationTracker';
import { 
  Plane, 
  Moon, 
  FileCheck, 
  Compass, 
  Hotel, 
  Car, 
  ArrowRight, 
  CheckCircle2, 
  X,
  Search
} from 'lucide-react';
import { openWhatsAppInquiry } from '../utils/formatters';

interface ServicesProps {
  language?: Language;
  onOpenBookingModal: (serviceName?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ language = 'en', onOpenBookingModal }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const t = translations[language];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Plane': return <Plane className="w-6 h-6" />;
      case 'Moon': return <Moon className="w-6 h-6" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'Hotel': return <Hotel className="w-6 h-6" />;
      case 'Car': return <Car className="w-6 h-6" />;
      default: return <Plane className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#F6F8FC] text-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 bg-[#1E5EFF]/10 text-[#1E5EFF] text-xs font-bold uppercase tracking-widest rounded-full">
            {t.servicesBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0B1F3A] mt-3 mb-4">
            {t.servicesTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {t.servicesSubtitle}
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-[24px] p-6 shadow-md hover:shadow-2xl transition-all border border-gray-100 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="relative h-44 rounded-[18px] overflow-hidden mb-6 bg-gray-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800');
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 w-12 h-12 rounded-[14px] bg-[#0B1F3A] text-white flex items-center justify-center shadow-lg border border-white/20">
                    {getIcon(service.iconName)}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-display text-[#0B1F3A] mb-2">
                  {service.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5EFF] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold uppercase tracking-wider text-[#1E5EFF] hover:underline flex items-center gap-1"
                >
                  {t.viewDetails}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenBookingModal(service.title)}
                  className="px-4 py-2 bg-[#0B1F3A] text-white text-xs font-bold uppercase rounded-[12px] hover:bg-[#1E5EFF] transition-colors"
                >
                  {t.searchAction}
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Visual Progress Tracker Widget for Visa Consultancy & Umrah Processing */}
        <ApplicationTracker language={language} />

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white text-gray-900 rounded-[28px] max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-gray-100">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-[16px] bg-[#1E5EFF] text-white flex items-center justify-center">
                {getIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#1E5EFF] tracking-wider">Service Overview</span>
                <h3 className="text-2xl font-bold font-display">{selectedService.title}</h3>
              </div>
            </div>

            <img
              src={selectedService.image}
              alt={selectedService.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800');
              }}
              className="w-full h-52 object-cover rounded-[20px] mb-6"
            />

            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              {selectedService.fullDesc}
            </p>

            <h4 className="font-bold text-sm text-[#0B1F3A] mb-3 uppercase tracking-wider">
              {t.includes}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {selectedService.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-[#F6F8FC] text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5EFF]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenBookingModal(selectedService.title);
                }}
                className="flex-1 py-3.5 bg-[#1E5EFF] text-white font-bold text-xs uppercase tracking-wider rounded-[18px] hover:bg-blue-600 transition-colors"
              >
                {t.bookPackage}
              </button>
              <button
                onClick={() => {
                  openWhatsAppInquiry(`Assalamu Alaikum! I want to inquire about ${selectedService.title} service.`);
                }}
                className="flex-1 py-3.5 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider rounded-[18px] hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
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
