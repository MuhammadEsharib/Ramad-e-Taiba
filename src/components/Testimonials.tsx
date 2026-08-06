import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface TestimonialsProps {
  language?: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ language = 'en' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = translations[language];

  const prev = () => {
    setCurrentIndex(i => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  };

  const next = () => {
    setCurrentIndex(i => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));
  };

  const item = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-white text-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 bg-[#1E5EFF]/10 text-[#1E5EFF] text-xs font-bold uppercase tracking-widest rounded-full">
            {t.reviewsBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0B1F3A] mt-3">
            {t.reviewsTitle}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {t.reviewsSubtitle}
          </p>
        </div>

        {/* Testimonial Showcase Card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card bg-white rounded-[32px] p-8 md:p-12 shadow-2xl relative border border-gray-100">
            <Quote className="w-16 h-16 text-[#1E5EFF]/10 absolute top-6 right-8 pointer-events-none" />

            <div className="flex items-center gap-1 text-[#D4AF37] mb-6">
              {Array(item.rating).fill(0).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#D4AF37]" />
              ))}
            </div>

            <p className="text-lg md:text-xl font-medium text-gray-800 italic leading-relaxed mb-8">
              "{item.review}"
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-100 pt-6 gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200');
                  }}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#1E5EFF]"
                />
                <div>
                  <h4 className="font-bold text-base text-[#0B1F3A] flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle2 className="w-4 h-4 text-[#1E5EFF]" />
                  </h4>
                  <div className="text-xs text-gray-500">{item.location} • <span className="text-[#1E5EFF] font-semibold">{item.serviceType}</span></div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="p-3 rounded-full bg-gray-100 hover:bg-[#1E5EFF] hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-bold text-gray-400">
                  {currentIndex + 1} / {TESTIMONIALS.length}
                </span>
                <button
                  onClick={next}
                  className="p-3 rounded-full bg-gray-100 hover:bg-[#1E5EFF] hover:text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
