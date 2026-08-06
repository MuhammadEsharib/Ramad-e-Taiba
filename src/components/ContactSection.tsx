import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  Navigation,
  ExternalLink,
  Compass,
  Building2,
  Plane
} from 'lucide-react';
import { openWhatsAppInquiry } from '../utils/formatters';
import { Language } from '../types';
import { translations } from '../data/translations';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

interface ContactSectionProps {
  language?: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language = 'en' }) => {
  const isUrdu = language === 'ur';
  const t = translations[language];

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    travelInterest: 'Umrah Package',
    travelDate: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeMarker, setActiveMarker] = useState<'office' | 'chawrangi' | 'airport'>('office');

  const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
  const hasValidGoogleKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

  // Office Location Coordinates in North Nazimabad Karachi
  const OFFICE_LAT_LNG = { lat: 24.9365516, lng: 67.0323381 };
  const CHOWRANGI_LAT_LNG = { lat: 24.9355, lng: 67.0330 };
  const AIRPORT_LAT_LNG = { lat: 24.9070, lng: 67.1608 };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = `Assalamu Alaikum! New Inquiry from ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nInterest: ${formData.travelInterest}\nDate: ${formData.travelDate}\nNotes: ${formData.message}`;
    setTimeout(() => {
      openWhatsAppInquiry(msg);
    }, 1200);
  };

  const directGoogleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${OFFICE_LAT_LNG.lat},${OFFICE_LAT_LNG.lng}`;

  return (
    <section id="contact" className="py-20 bg-white text-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 bg-[#1E5EFF]/10 text-[#1E5EFF] text-xs font-bold uppercase tracking-widest rounded-full">
            {t.contactBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0B1F3A] mt-3">
            {t.contactTitle}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {t.contactSubtitle}
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Office & Interactive Location Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={`tel:${COMPANY_INFO.phonePrimary}`}
                className="p-4 rounded-[20px] bg-[#F6F8FC] border border-gray-100 hover:border-[#1E5EFF] transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-[#1E5EFF]/10 text-[#1E5EFF] flex items-center justify-center mb-2 group-hover:bg-[#1E5EFF] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                  {isUrdu ? 'فون کریں' : 'Call Office'}
                </span>
                <span className="text-xs font-bold text-[#0B1F3A] mt-0.5" dir="ltr">
                  {COMPANY_INFO.phonePrimary}
                </span>
              </a>

              <button
                onClick={() => openWhatsAppInquiry("Assalamu Alaikum Ramad-e-Taiba Travel!")}
                className="p-4 rounded-[20px] bg-[#F6F8FC] border border-gray-100 hover:border-[#25D366] transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-2 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                  {isUrdu ? 'واٹس ایپ' : 'WhatsApp'}
                </span>
                <span className="text-xs font-bold text-[#0B1F3A] mt-0.5">
                  {isUrdu ? 'فوری چیٹ' : 'Instant Chat'}
                </span>
              </button>
            </div>

            {/* Address Box */}
            <div className="bg-[#F6F8FC] p-6 rounded-[24px] border border-gray-100 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1E5EFF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#0B1F3A]">{t.topAddress}</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {isUrdu ? t.officeAddressFull : COMPANY_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-gray-200 pt-3">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#0B1F3A]">{t.topHours}</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {isUrdu ? 'پیر تا ہفتہ: صبح 10 تا رات 9 بجے' : COMPANY_INFO.operatingHours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-gray-200 pt-3">
                <Mail className="w-5 h-5 text-[#1E5EFF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#0B1F3A]">
                    {isUrdu ? 'ای میل ایڈریس' : 'Email Address'}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {COMPANY_INFO.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Interactive Google Map Container */}
            <div className="rounded-[28px] overflow-hidden border border-gray-200 shadow-xl bg-[#0B1F3A] text-white relative flex flex-col">
              
              {/* Map Filter Controls Bar */}
              <div className="p-3 bg-[#0B1F3A] border-b border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#D4AF37]">
                  <Compass className="w-4 h-4 text-[#D4AF37] animate-spin" style={{ animationDuration: '10s' }} />
                  <span>{isUrdu ? 'گوگل میپ نارتھ ناظم آباد' : 'Google Map North Nazimabad'}</span>
                </div>

                <a
                  href={directGoogleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-full bg-[#1E5EFF] hover:bg-blue-600 text-white font-bold text-[10px] flex items-center gap-1 transition-all"
                >
                  <Navigation className="w-3 h-3" />
                  <span>{isUrdu ? 'گوگل میپ راستے' : 'Get Directions'}</span>
                </a>
              </div>

              {/* Map Rendering Frame */}
              <div className="h-72 w-full relative overflow-hidden">
                {hasValidGoogleKey ? (
                  <APIProvider apiKey={API_KEY} version="weekly">
                    <Map
                      defaultCenter={OFFICE_LAT_LNG}
                      defaultZoom={15}
                      mapId="NORTH_NAZIMABAD_MAP_ID"
                      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                      style={{ width: '100%', height: '100%' }}
                    >
                      {/* Marker 1: Main Head Office */}
                      <AdvancedMarker
                        position={OFFICE_LAT_LNG}
                        onClick={() => setActiveMarker('office')}
                      >
                        <Pin background="#1E5EFF" glyphColor="#ffffff" borderColor="#ffffff" />
                      </AdvancedMarker>

                      {/* Marker 2: Five Star Chowrangi Landmark */}
                      <AdvancedMarker
                        position={CHOWRANGI_LAT_LNG}
                        onClick={() => setActiveMarker('chawrangi')}
                      >
                        <Pin background="#D4AF37" glyphColor="#0B1F3A" borderColor="#ffffff" />
                      </AdvancedMarker>

                      {activeMarker === 'office' && (
                        <InfoWindow
                          position={OFFICE_LAT_LNG}
                          onCloseClick={() => setActiveMarker('office')}
                        >
                          <div className="p-2 text-gray-900 text-xs">
                            <strong className="block text-[#0B1F3A]">Ramad-e-Taiba Travel & Tours</strong>
                            <p className="text-[10px] text-gray-600 mt-0.5">Karachi, Pakistan</p>
                          </div>
                        </InfoWindow>
                      )}
                    </Map>
                  </APIProvider>
                ) : (
                  /* Custom Canvas Map Overlay with Direct Interactive Pins */
                  <div className="w-full h-full bg-gradient-to-br from-[#0B1F3A] via-[#102a4c] to-[#081527] relative flex flex-col justify-between p-4 overflow-hidden">
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(#1E5EFF_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

                    {/* Landmark Pins */}
                    <div className="relative z-10 my-auto flex flex-col gap-3">
                      
                      {/* Office Pin Card */}
                      <div 
                        onClick={() => setActiveMarker('office')}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          activeMarker === 'office' ? 'bg-[#1E5EFF] text-white border-white shadow-lg' : 'bg-white/10 text-gray-200 border-white/10 hover:bg-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#0B1F3A] flex items-center justify-center font-bold shrink-0">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="font-extrabold text-xs">
                              {isUrdu ? 'رمادِ طیبہ ٹریول دفتر' : 'Ramad-e-Taiba Travel Office'}
                            </h5>
                            <p className="text-[10px] opacity-80">
                              {isUrdu ? 'رمادِ طیبہ، کراچی' : 'Ramad-e-Taiba, Karachi'}
                            </p>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          {isUrdu ? 'کھلا ہے' : 'Open Now'}
                        </span>
                      </div>

                      {/* Five Star Chowrangi Landmark */}
                      <div 
                        onClick={() => setActiveMarker('chawrangi')}
                        className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          activeMarker === 'chawrangi' ? 'bg-[#D4AF37] text-[#0B1F3A] border-white shadow-lg font-bold' : 'bg-white/10 text-gray-200 border-white/10 hover:bg-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#D4AF37]" />
                          <span className="text-xs">
                            {isUrdu ? 'نزد فائیو سٹار چورنگی چوراہا' : 'Near Five Star Chowrangi Junction'}
                          </span>
                        </div>
                        <span className="text-[10px] opacity-75">100m</span>
                      </div>

                      {/* Airport Hub */}
                      <div 
                        onClick={() => setActiveMarker('airport')}
                        className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          activeMarker === 'airport' ? 'bg-[#1E5EFF] text-white border-white shadow-lg font-bold' : 'bg-white/10 text-gray-200 border-white/10 hover:bg-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Plane className="w-4 h-4 text-[#1E5EFF]" />
                          <span className="text-xs">
                            {isUrdu ? 'جناح انٹرنیشنل ایئرپورٹ کراچی' : 'Jinnah Intl Airport Karachi (KHI)'}
                          </span>
                        </div>
                        <span className="text-[10px] opacity-75">25 mins</span>
                      </div>

                    </div>

                  </div>
                )}
              </div>

              {/* Bottom Quick Directions Link */}
              <div className="p-3 bg-[#081527] border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300">
                <span>{isUrdu ? 'نارتھ ناظم آباد کراچی' : 'North Nazimabad Town, Karachi'}</span>
                <a
                  href={directGoogleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#D4AF37] font-bold hover:underline flex items-center gap-1"
                >
                  <span>{isUrdu ? 'میپ پر کھولیں' : 'Open in Google Maps'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Modern Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#F6F8FC] p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-xl">
              
              <h3 className="text-2xl font-display font-extrabold text-[#0B1F3A] mb-2">
                {t.contactTitle}
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                {isUrdu 
                  ? 'ذیلی فارم پر کریں، نارتھ ناظم آباد کے سینئر ٹریول کنسلٹنٹ 15 منٹ میں رابطہ کریں گے۔'
                  : 'Fill in your details below. Our travel specialist in North Nazimabad Karachi will contact you within 15 minutes.'}
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 rounded-[24px] border border-emerald-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h4 className="font-bold text-lg text-emerald-900">
                    {isUrdu ? `شکریہ، ${formData.fullName}!` : `Thank You, ${formData.fullName}!`}
                  </h4>
                  <p className="text-xs text-emerald-700 mt-2">
                    {t.formSuccess}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">{t.formName}</label>
                      <input
                        type="text"
                        required
                        placeholder={isUrdu ? "مثال: محمد عثمان" : "e.g. Muhammad Usman"}
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-[14px] p-3 text-xs font-semibold focus:ring-2 focus:ring-[#1E5EFF] text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">{t.formPhone}</label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 0000000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-[14px] p-3 text-xs font-semibold focus:ring-2 focus:ring-[#1E5EFF] text-gray-900"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">{t.formEmail}</label>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-[14px] p-3 text-xs font-semibold focus:ring-2 focus:ring-[#1E5EFF] text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">{t.formService}</label>
                      <select
                        value={formData.travelInterest}
                        onChange={(e) => setFormData({...formData, travelInterest: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-[14px] p-3 text-xs font-semibold focus:ring-2 focus:ring-[#1E5EFF] text-gray-900"
                      >
                        <option value="Economy Umrah Package">{isUrdu ? 'اکانومی عمرہ پیکج' : 'Economy Umrah Package'}</option>
                        <option value="5-Star Executive Umrah">{isUrdu ? '5 سٹار مکہ کلاک ٹاور عمرہ' : '5-Star Executive Clock Tower Umrah'}</option>
                        <option value="International Tour (Turkey/Dubai/Baku/etc)">{isUrdu ? 'بین الاقوامی سیاحتی ٹور (ترکی / دبئی / باکو)' : 'International Tour (Turkey / Dubai / Baku / etc)'}</option>
                        <option value="Air Ticket Booking">{isUrdu ? 'ہوائی ٹکٹنگ (فلائٹس)' : 'Air Ticket Booking'}</option>
                        <option value="Visa Consultancy">{isUrdu ? 'ویزہ کنسلٹنسی' : 'Visa Consultancy'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      {isUrdu ? 'سفر کی متوقع تاریخ / مہینہ' : 'Intended Travel Date / Month'}
                    </label>
                    <input
                      type="text"
                      placeholder={isUrdu ? "مثال: آئندہ ماہ / رمضان المبارک" : "e.g. Next Month / Ramadan / Specific Date"}
                      value={formData.travelDate}
                      onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                      className="w-full bg-white border border-gray-200 rounded-[14px] p-3 text-xs font-semibold focus:ring-2 focus:ring-[#1E5EFF] text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">{t.formMessage}</label>
                    <textarea
                      rows={3}
                      placeholder={isUrdu ? "مسافروں کی تعداد، ہوٹل کی پسند یا دیگر ضروریات تحریر کریں..." : "Mention number of travelers, hotel preferences, or special needs..."}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white border border-gray-200 rounded-[14px] p-3 text-xs font-semibold focus:ring-2 focus:ring-[#1E5EFF] text-gray-900"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#1E5EFF] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-[18px] transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    {t.formSubmit}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
