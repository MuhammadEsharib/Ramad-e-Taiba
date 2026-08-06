import React from 'react';
import { LogoSvg } from './Header';
import { COMPANY_INFO } from '../data/mockData';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageSquare, Heart, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  language?: Language;
}

export const Footer: React.FC<FooterProps> = ({ language = 'en' }) => {
  const isUrdu = language === 'ur';
  const t = translations[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1F3A] text-white pt-16 pb-8 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero">
              <LogoSvg />
            </a>

            <p className="text-xs text-gray-300 leading-relaxed font-light max-w-sm">
              {isUrdu
                ? 'رمادِ طیبہ ٹریول اینڈ ٹورز کراچی — حج، عمرہ اور عالمی سفر کے لیے آپ کا بااعتماد ساتھی۔ فلائٹس | ہوٹلز | ویزہ سروسز۔'
                : 'Ramad-e-Taiba Travel & Tours, Karachi — Your trusted partner for Hajj, Umrah & worldwide travel. Flights | Hotels | Visa Services.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1E5EFF] text-[#D4AF37] hover:text-white transition-colors"
                title="Instagram @ramadetaiba"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={COMPANY_INFO.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1E5EFF] text-white transition-colors"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber.replace('+','')}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white transition-transform hover:scale-110"
                title="WhatsApp Direct"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>

            <div className="text-[11px] text-gray-400 pt-2">
              <p>Managed by: <strong className="text-white">{COMPANY_INFO.owner}</strong></p>
              <p>Specialization: <strong className="text-white">Hajj, Umrah, Flights, Hotels & Visa Services</strong></p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#D4AF37] mb-4">
              {isUrdu ? 'اہم لنکس' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><a href="#hero" className="hover:text-white transition-colors">{t.navHome}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{t.navAbout}</a></li>
              <li><a href="#umrah" className="hover:text-white transition-colors">{t.navUmrah}</a></li>
              <li><a href="#tours" className="hover:text-white transition-colors">{t.navTours}</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">{t.navDestinations}</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">{t.navGallery}</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">{t.navTestimonials}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{t.navContact}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#D4AF37] mb-4">
              {isUrdu ? 'ہماری خدمات' : 'Our Services'}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><a href="#services" className="hover:text-white transition-colors">{isUrdu ? 'اکانومی عمرہ پیکجز' : 'Economy Umrah Packages'}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{isUrdu ? '5 سٹار وی آئی پی عمرہ' : '5-Star Executive Umrah'}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{isUrdu ? 'ایئر ٹکٹ بکنگ' : 'Air Ticket Booking'}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{isUrdu ? 'ویزہ کنسلٹنسی' : 'Visa Consultancy'}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{isUrdu ? 'دبئی و ترکی ٹورز' : 'Dubai & Turkey Tours'}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{isUrdu ? 'ہوٹل واؤچرز' : 'Worldwide Hotel Deals'}</a></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#D4AF37] mb-4">
              {isUrdu ? 'دفتر کا پتہ اور رابطہ' : 'Karachi Office'}
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{isUrdu ? t.officeAddressFull : COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span dir="ltr">{COMPANY_INFO.phonePrimary}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Ramad-e-Taiba Travel & Tours. {isUrdu ? 'جملہ حقوق محفوظ ہیں۔' : 'All rights reserved.'}</p>
          
          <div className="flex items-center gap-4">
            <span>Ramad-e-Taiba, Karachi, Pakistan</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-[#1E5EFF] text-white transition-colors"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
