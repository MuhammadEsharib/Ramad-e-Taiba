import React from 'react';
import { Search, UserCheck, FileCheck, PlaneTakeoff, ArrowRight } from 'lucide-react';
import { openWhatsAppInquiry } from '../utils/formatters';
import { Language } from '../types';
import { translations } from '../data/translations';

interface BookingProcessProps {
  language?: Language;
}

export const BookingProcess: React.FC<BookingProcessProps> = ({ language = 'en' }) => {
  const isUrdu = language === 'ur';

  const steps = [
    {
      num: "01",
      title: isUrdu ? "پیکج کا انتخاب" : "Choose Package",
      desc: isUrdu ? "عمرہ کیٹیگری، کراچی سے فلائٹ روٹ یا بین الاقوامی سیاحتی ٹور کا انتخاب کریں۔" : "Select your Umrah tier, flight route from Karachi, or international holiday destination.",
      icon: <Search className="w-6 h-6 text-[#1E5EFF]" />
    },
    {
      num: "02",
      title: isUrdu ? "ماہر سے مشورہ" : "Consult Expert",
      desc: isUrdu ? "کراچی دفتر میں تشریف لائیں یا واٹس ایپ / انسٹاگرام پر سفری ماہرین سے رابطہ کریں۔" : "Speak with Filzah Bin Fahim and our consultants via Instagram DM (@ramadetaiba) or WhatsApp.",
      icon: <UserCheck className="w-6 h-6 text-[#D4AF37]" />
    },
    {
      num: "03",
      title: isUrdu ? "دستاویزات کی تکمیل" : "Complete Documentation",
      desc: isUrdu ? "پاسپورٹ اور شناختی کارڈ جمع کروائیں۔ ہماری ٹیم ای-ویزہ، ہوٹل اور فلائٹس ٹکٹ جاری کرے گی۔" : "Hand over passport & CNIC. Our in-house team processes your e-visa, hotel vouchers & flight tickets.",
      icon: <FileCheck className="w-6 h-6 text-[#1E5EFF]" />
    },
    {
      num: "04",
      title: isUrdu ? "پرامن اور آسان سفر" : "Travel Stress-Free",
      desc: isUrdu ? "کراچی ایئرپورٹ سے روانہ ہوں اور منزل پر 24/7 رہنمائی و سہولت حاصل کریں۔" : "Fly from Karachi with full peace of mind, backed by 24/7 ground assistance at your destination.",
      icon: <PlaneTakeoff className="w-6 h-6 text-[#25D366]" />
    }
  ];

  return (
    <section className="py-20 bg-white text-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 bg-[#1E5EFF]/10 text-[#1E5EFF] text-xs font-bold uppercase tracking-widest rounded-full">
            {isUrdu ? 'آسان 4 مرحلہ وار سفر' : 'Simple 4-Step Journey'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0B1F3A] mt-3">
            {isUrdu ? 'بکنگ کے آسان مراحل' : 'How Our Booking Process Works'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
            {isUrdu 
              ? 'پہلی معلومات سے لے کر کراچی ایئرپورٹ سے روانگی تک، چار آسان مراحل میں سفری منصوبہ بندی کا تجربہ کریں۔'
              : 'From initial inquiry to departure from Karachi Airport, experience seamless travel planning in four straightforward steps.'}
          </p>
        </div>

        {/* Steps Grid with Progress Line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#F6F8FC] p-8 rounded-[28px] border border-gray-100 shadow-lg relative flex flex-col justify-between group hover:border-[#1E5EFF] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-[20px] bg-white shadow-md flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="font-display font-black text-3xl text-gray-300">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-[#0B1F3A] mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center text-[11px] font-bold text-[#1E5EFF]">
                <span>{isUrdu ? `مرحلہ ${idx + 1} از 4` : `Step ${idx + 1} of 4`}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => openWhatsAppInquiry("Assalamu Alaikum! I would like to start my booking process with Ramad-e-Taiba Travel & Tours.")}
            className="px-8 py-4 bg-[#1E5EFF] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-[18px] transition-all shadow-xl shadow-blue-900/30 inline-flex items-center gap-2"
          >
            {isUrdu ? 'ابھی بکنگ کنسلٹیشن شروع کریں' : 'Start Your Booking Consultation Now'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
