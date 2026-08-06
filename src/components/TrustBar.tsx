import React from 'react';
import { TRUST_PARTNERS } from '../data/mockData';
import { ShieldCheck, CheckCircle2, BadgePercent, Headphones, Award, Plane } from 'lucide-react';
import { Language } from '../types';

interface TrustBarProps {
  language?: Language;
}

export const TrustBar: React.FC<TrustBarProps> = ({ language = 'en' }) => {
  const isUrdu = language === 'ur';

  const urduBadges = [
    { title: "حکومت سے لائسنس یافتہ", desc: "وزارت مذہبی امور پاکستان سے منظور شدہ" },
    { title: "100% شفاف رسید", desc: "کوئی چھپے ہوئے اضافی اخراجات نہیں" },
    { title: "بہترین قیمت کی ضمانت", desc: "کراچی کی بہترین اور معقول ترین شٹل قیمتیں" },
    { title: "24/7 واٹس ایپ سپورٹ", desc: "سفر کے دوران مستقل رابطے میں رہنمائی" },
    { title: "15+ سال کا سچا تجربہ", desc: "ہزاروں مطمئن حجاج اور مسافرین" }
  ];

  const badgesToDisplay = isUrdu ? urduBadges : TRUST_PARTNERS.trustBadges;

  return (
    <section className="bg-[#F6F8FC] py-10 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Airlines Scrolling Ticker */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1E5EFF]">
              {isUrdu ? 'قابل اعتماد ایئر لائنز اور ہوٹل پارٹنرز' : 'Trusted Airline & Hospitality Partners'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity">
            {TRUST_PARTNERS.airlines.map((airline) => (
              <div
                key={airline.name}
                className="flex items-center gap-2 group cursor-pointer py-1 px-3 rounded-lg hover:bg-white transition-all"
              >
                <Plane className="w-4 h-4 text-[#0B1F3A] group-hover:text-[#1E5EFF] transition-colors" />
                <span className="font-display font-black text-sm md:text-base text-[#0B1F3A] group-hover:text-[#1E5EFF] transition-colors tracking-tight">
                  {airline.logoText}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-6 border-t border-gray-200">
          {badgesToDisplay.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3.5 rounded-[18px] bg-white border border-gray-100 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1E5EFF]/10 flex items-center justify-center text-[#1E5EFF] shrink-0">
                {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                {idx === 1 && <CheckCircle2 className="w-5 h-5" />}
                {idx === 2 && <BadgePercent className="w-5 h-5" />}
                {idx === 3 && <Headphones className="w-5 h-5" />}
                {idx === 4 && <Award className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0B1F3A] leading-tight">
                  {badge.title}
                </h4>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
