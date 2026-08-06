import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  CheckCircle, 
  MapPin, 
  Award,
  HeartHandshake
} from 'lucide-react';

interface AboutUsProps {
  language?: Language;
}

export const AboutUs: React.FC<AboutUsProps> = ({ language = 'en' }) => {
  const t = translations[language];

  const highlights = [
    { title: "Expert Guidance", desc: "Certified Umrah scholars & travel consultants with 10+ years field experience." },
    { title: "Best Deals & Fair Pricing", desc: "Direct contracts with airlines & Clock Tower hotels ensure wholesale savings." },
    { title: "Fast Visa Support", desc: "In-house document clearance team with high approval rates for all countries." },
    { title: "Global Air Ticketing", desc: "Instant fares for Emirates, Saudia, Qatar, PIA, Turkish & Flydubai." },
    { title: "24/7 Dedicated Assistance", desc: "Local ground support team in Karachi, Makkah, Madinah, and Dubai." },
    { title: "Customized Packages", desc: "Tailored itineraries for families, elderly pilgrims, and corporate groups." }
  ];

  return (
    <section id="about" className="py-20 bg-white text-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Office & Agency Showcase Media */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000"
                alt="Ramad-e-Taiba Travel Office and Consultants Karachi"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1000');
                }}
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-[24px] text-[#0B1F3A] bg-white/95 backdrop-blur-md shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#1E5EFF] flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{t.topAddress}</h4>
                    <p className="text-xs text-gray-600">{t.aboutBadge}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 border-t border-gray-200 pt-2 mt-2">
                  {t.topHours}
                </p>
              </div>
            </div>

            {/* Floating Trust Card Badge */}
            <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 p-4 bg-white rounded-[20px] shadow-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#0B1F3A]">{t.aboutLicence}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{t.aboutIataNum}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-[#1E5EFF]/10 text-[#1E5EFF] text-xs font-bold uppercase tracking-widest rounded-full">
                {t.aboutTitle}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0B1F3A] mb-6 leading-tight">
              {t.aboutHeading}
            </h2>

            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {t.aboutPara1}
            </p>

            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              {t.aboutPara2}
            </p>

            {/* 6 Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-[18px] bg-[#F6F8FC] border border-gray-100 hover:border-[#1E5EFF] transition-all"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle className="w-4 h-4 text-[#1E5EFF]" />
                    <h4 className="font-bold text-sm text-[#0B1F3A]">{item.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500 pl-6">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3.5 bg-[#0B1F3A] text-white font-bold text-xs uppercase tracking-wider rounded-[18px] hover:bg-[#1E5EFF] transition-colors shadow-md"
              >
                {t.navContact}
              </a>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
                <span>{t.trustPilgrimsServed}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
