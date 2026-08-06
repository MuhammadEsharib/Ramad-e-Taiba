import React from 'react';
import { WHY_CHOOSE_US_POINTS } from '../data/mockData';
import { Award, Receipt, ShieldCheck, Headphones, Users, MapPin, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface WhyChooseUsProps {
  language?: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ language = 'en' }) => {
  const isUrdu = language === 'ur';
  const t = translations[language];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Award': return <Award className="w-6 h-6" />;
      case 'Receipt': return <Receipt className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Headphones': return <Headphones className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      case 'MapPin': return <MapPin className="w-6 h-6" />;
      default: return <ShieldCheck className="w-6 h-6" />;
    }
  };

  const urduPoints = [
    {
      title: 'منظور شدہ لائسنس یافتہ ایجنسی',
      desc: 'حکومت پاکستان اور آئٹا (IATA) سے منظور شدہ ادارہ، 15 سال سے بہترین سچی خدمات',
      icon: 'Award'
    },
    {
      title: 'شفاف قیمتیں، کوئی چھپے اخراجات نہیں',
      desc: 'واضح رسید، مکمل پیکج ڈاکیومنٹ اور پہلے دن سے تحریری معاہدہ۔',
      icon: 'Receipt'
    },
    {
      title: 'حرمین شریفین کے قریب ترین ہوٹل',
      desc: 'مکہ مکرمہ و مدینہ منورہ میں حجاج و زائرین کے لیے بہترین واکنگ ڈسٹنس ہوٹل۔',
      icon: 'ShieldCheck'
    },
    {
      title: '24/7 رہنمائی و معاونت',
      desc: 'کراچی ایئرپورٹ روانگی سے لے کر سعودیہ میں زیارات تک ہر قدم پر ساتھی۔',
      icon: 'Headphones'
    },
    {
      title: 'تجربہ کار دینی و سفری گائیڈ',
      desc: 'عمرہ مناسک کی مکمل تربیت، زیارات اور معلوماتی رہنمائی کے ساتھ۔',
      icon: 'Users'
    },
    {
      title: 'کراچی میں مقیم و دستیاب دفتر',
      desc: 'رمادِ طیبہ کراچی میں آپ کی خدمت کے لیے دستیاب، بالمشافہ اعتماد اور مکمل تسلی۔',
      icon: 'MapPin'
    }
  ];

  const pointsToDisplay = isUrdu ? urduPoints : WHY_CHOOSE_US_POINTS;

  return (
    <section className="py-20 bg-[#F6F8FC] text-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 bg-[#1E5EFF]/10 text-[#1E5EFF] text-xs font-bold uppercase tracking-widest rounded-full">
            {isUrdu ? 'غیر معمولی معیار اور اعتماد' : 'Uncompromising Quality & Trust'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0B1F3A] mt-3">
            {isUrdu ? 'کراچی کے خاندان رمادِ طیبہ پر اعتماد کیوں کرتے ہیں؟' : 'Why Karachi Families Trust Ramad-e-Taiba'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
            {isUrdu 
              ? 'ہم مقامی مہمان نوازی کو عالمی معیار کے ساتھ ملا کر ہر زائر اور سیاح کو مکمل تحفظ اور تسلی فراہم کرتے ہیں۔'
              : 'We combine local Karachi hospitality with global travel network standards, ensuring every pilgrim and tourist receives personalized care.'}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pointsToDisplay.map((point, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-14 h-14 rounded-[20px] bg-[#1E5EFF]/10 text-[#1E5EFF] flex items-center justify-center mb-6 group-hover:bg-[#1E5EFF] group-hover:text-white transition-colors">
                  {getIcon(point.icon)}
                </div>

                <h3 className="text-xl font-bold font-display text-[#0B1F3A] mb-3">
                  {point.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {point.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1 text-[11px] font-bold text-[#1E5EFF]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isUrdu ? 'تصدیق شدہ رمادِ طیبہ معیار' : 'Verified Ramad-e-Taiba Standard'}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
