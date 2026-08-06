import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Printer, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  QrCode, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  Clock, 
  Check, 
  Plane, 
  Globe2
} from 'lucide-react';
import { openWhatsAppInquiry } from '../utils/formatters';
import { Currency, Language } from '../types';
import { translations } from '../data/translations';
import { COMPANY_INFO, UMRAH_PACKAGES, TOUR_PACKAGES } from '../data/mockData';
import { convertPKRToCurrency, ExchangeRates } from '../utils/currencyConverter';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetTitle?: string;
  language?: Language;
  currency?: Currency;
  liveRates?: ExchangeRates;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  presetTitle = '',
  language = 'en',
  currency = 'PKR',
  liveRates
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [packageInterest, setPackageInterest] = useState(presetTitle || 'Economy Umrah Package (15 Days)');
  const [travelersCount, setTravelersCount] = useState('2');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'form' | 'voucher'>('form');

  // Active modal currency override if user toggles inside modal
  const [modalCurrency, setModalCurrency] = useState<Currency>(currency);

  // Sync modal currency with global prop
  useEffect(() => {
    setModalCurrency(currency);
  }, [currency]);

  // Sync package interest with presetTitle prop
  useEffect(() => {
    if (presetTitle) {
      setPackageInterest(presetTitle);
    }
  }, [presetTitle]);

  // Date Picker States
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState<Date | null>(new Date(Date.now() + 86400000 * 7)); // Default 1 week out
  const [returnDate, setReturnDate] = useState<Date | null>(new Date(Date.now() + 86400000 * 22)); // Default 15 days duration
  const [dateSelectionMode, setDateSelectionMode] = useState<'departure' | 'return'>('departure');

  const t = translations[language];
  const isUrdu = language === 'ur';

  // Close modal when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Calendar calculations
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleDayClick = (dayNum: number) => {
    const clickedDate = new Date(year, month, dayNum);

    if (dateSelectionMode === 'departure') {
      setDepartureDate(clickedDate);
      if (!returnDate || returnDate <= clickedDate) {
        setReturnDate(new Date(clickedDate.getTime() + 86400000 * 14));
      }
      setDateSelectionMode('return');
    } else {
      if (departureDate && clickedDate < departureDate) {
        setDepartureDate(clickedDate);
      } else {
        setReturnDate(clickedDate);
        setShowDatePicker(false);
      }
    }
  };

  const calculateDurationDays = () => {
    if (!departureDate || !returnDate) return 15;
    const diffTime = Math.abs(returnDate.getTime() - departureDate.getTime());
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const formatDateShort = (d: Date | null) => {
    if (!d) return 'Select Date';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handlePresetSelect = (preset: 'weekend' | 'nextMonth' | 'ramadan' | 'spring') => {
    const now = new Date();
    if (preset === 'weekend') {
      const dep = new Date(now.getTime() + 86400000 * 3);
      const ret = new Date(dep.getTime() + 86400000 * 4);
      setDepartureDate(dep);
      setReturnDate(ret);
    } else if (preset === 'nextMonth') {
      const dep = new Date(now.getFullYear(), now.getMonth() + 1, 10);
      const ret = new Date(dep.getTime() + 86400000 * 14);
      setDepartureDate(dep);
      setReturnDate(ret);
    } else if (preset === 'ramadan') {
      const dep = new Date(2026, 2, 1);
      const ret = new Date(dep.getTime() + 86400000 * 20);
      setDepartureDate(dep);
      setReturnDate(ret);
    } else if (preset === 'spring') {
      const dep = new Date(2026, 3, 10);
      const ret = new Date(dep.getTime() + 86400000 * 10);
      setDepartureDate(dep);
      setReturnDate(ret);
    }
    setShowDatePicker(false);
  };

  // Find matched package details for voucher itinerary
  const matchedUmrah = UMRAH_PACKAGES.find(p => p.title.toLowerCase().includes(packageInterest.toLowerCase()) || packageInterest.toLowerCase().includes(p.title.toLowerCase()));
  const matchedTour = TOUR_PACKAGES.find(p => p.title.toLowerCase().includes(packageInterest.toLowerCase()) || packageInterest.toLowerCase().includes(p.title.toLowerCase()));

  const packagePricePKR = matchedUmrah?.pricePKR || matchedTour?.pricePKR || 218000;
  const numTravelersInt = parseInt(travelersCount) || 2;
  const totalCostPKR = packagePricePKR * numTravelersInt;

  const perPersonConverted = convertPKRToCurrency(packagePricePKR, modalCurrency, liveRates);
  const totalCostConverted = convertPKRToCurrency(totalCostPKR, modalCurrency, liveRates);

  const voucherRefNo = `RTT-2026-VCH-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const travelDatesFormatted = `Departure: ${formatDateShort(departureDate)} | Return: ${formatDateShort(returnDate)} (${calculateDurationDays()} Days)`;
    const msg = `Assalamu Alaikum Ramad-e-Taiba Travel & Tours!\nNew Booking Inquiry:\nName: ${fullName || 'Valued Guest'}\nPhone: ${phone}\nEmail: ${email}\nPackage: ${packageInterest}\nTravel Dates: ${travelDatesFormatted}\nTravelers: ${travelersCount}\nPrice (${modalCurrency}): ${totalCostConverted.formatted}\nNotes: ${notes}`;

    setTimeout(() => {
      openWhatsAppInquiry(msg);
    }, 1200);
  };

  const handlePrintVoucher = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Booking and Voucher Modal"
    >
      <div className="bg-white text-gray-900 rounded-[32px] max-w-2xl w-full p-5 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto border border-gray-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center z-20 no-print"
          aria-label="Close Booking Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tabs: Booking Form vs Download Voucher */}
        <div className="mb-6 pb-4 border-b border-gray-100 no-print">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <span className="text-[11px] font-extrabold uppercase text-[#1E5EFF] tracking-wider block">
                {COMPANY_INFO.name} • Karachi
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#0B1F3A]">
                {packageInterest}
              </h3>
            </div>

            {/* Currency Selector Pill */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full border border-gray-200 shrink-0 self-start sm:self-auto">
              <span className="text-[10px] font-bold text-gray-500 px-2 uppercase">Currency:</span>
              {(['PKR', 'USD', 'SAR', 'AED', 'EUR'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setModalCurrency(c)}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold transition-all ${
                    modalCurrency === c ? 'bg-[#1E5EFF] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-gray-100 p-1 rounded-2xl">
            <button
              onClick={() => setActiveModalTab('form')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                activeModalTab === 'form' ? 'bg-[#0B1F3A] text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isUrdu ? 'بکنگ درخواست / واٹس ایپ' : 'Booking Form & Inquiry'}</span>
            </button>

            <button
              onClick={() => setActiveModalTab('voucher')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                activeModalTab === 'voucher' ? 'bg-[#1E5EFF] text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isUrdu ? 'آفیشل واؤچر / واؤچر پرنٹ کریں' : 'Download Printable Voucher'}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FORM VIEW */}
        {activeModalTab === 'form' && (
          <div>
            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-[28px] border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-extrabold text-xl text-emerald-900">
                  {isUrdu ? 'درخواست کامیابی سے موصول ہو گئی!' : 'Booking Inquiry Received!'}
                </h4>
                <p className="text-xs text-emerald-800 mt-2 mb-4">
                  {isUrdu 
                    ? `شکریہ ${fullName || 'محترم زائر'}۔ ہم آپ کو واٹس ایپ پر فلزہ بن فہیم (رمادِ طیبہ کراچی) سے براہِ راست جوڑ رہے ہیں۔`
                    : `Thank you ${fullName || 'Valued Guest'}. We are connecting you directly with Filzah Bin Fahim on WhatsApp.`}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveModalTab('voucher')}
                    className="px-5 py-2.5 bg-[#1E5EFF] text-white font-bold text-xs uppercase rounded-full shadow-md flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Voucher</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-gray-200 text-gray-800 font-bold text-xs uppercase rounded-full"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Price Estimate Summary Header Box */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-gray-500 block">Estimated Rate ({modalCurrency})</span>
                    <span className="text-lg font-black text-[#1E5EFF]">{perPersonConverted.formatted}</span>
                    <span className="text-[10px] text-gray-500 block">per person (Quad Sharing)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-gray-500 block">Total ({numTravelersInt} Travelers)</span>
                    <span className="text-xl font-extrabold text-[#0B1F3A]">{totalCostConverted.formatted}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    {t.formName}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Filzah Bin Fahim"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#F6F8FC] border border-gray-200 rounded-[14px] p-3 text-xs font-semibold focus:ring-2 focus:ring-[#1E5EFF] text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      {t.formPhone}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F6F8FC] border border-gray-200 rounded-[14px] p-3 text-xs font-semibold focus:ring-2 focus:ring-[#1E5EFF] text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      {t.formEmail}
                    </label>
                    <input
                      type="email"
                      placeholder="info@ramadetaiba.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F6F8FC] border border-gray-200 rounded-[14px] p-3 text-xs font-semibold focus:ring-2 focus:ring-[#1E5EFF] text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      Selected Package / Service
                    </label>
                    <input
                      type="text"
                      value={packageInterest}
                      onChange={(e) => setPackageInterest(e.target.value)}
                      className="w-full bg-[#F6F8FC] border border-gray-200 rounded-[14px] p-3 text-xs font-semibold focus:ring-2 focus:ring-[#1E5EFF] text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      {t.formTravelers}
                    </label>
                    <select
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(e.target.value)}
                      className="w-full bg-[#F6F8FC] border border-gray-200 rounded-[14px] p-3 text-xs font-semibold focus:ring-2 focus:ring-[#1E5EFF] text-gray-900"
                    >
                      <option value="1">1 Person (Single)</option>
                      <option value="2">2 Persons (Couple / Sharing)</option>
                      <option value="3">3 Persons (Triple Room)</option>
                      <option value="4">4 Persons (Quad Family Room)</option>
                      <option value="5">5+ Persons (Group / Family)</option>
                    </select>
                  </div>
                </div>

                {/* Interactive Travel Date Selector */}
                <div className="relative">
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1 flex items-center justify-between">
                    <span>Tentative Travel Dates</span>
                    <span className="text-[10px] text-[#1E5EFF] font-bold">
                      Duration: {calculateDurationDays()} Days
                    </span>
                  </label>

                  <div
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="w-full bg-[#F6F8FC] hover:bg-blue-50/50 border border-gray-200 hover:border-[#1E5EFF] rounded-[16px] p-3.5 cursor-pointer transition-all flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#1E5EFF]/10 text-[#1E5EFF] flex items-center justify-center shrink-0">
                        <CalendarIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-[#0B1F3A]">
                          {formatDateShort(departureDate)} → {formatDateShort(returnDate)}
                        </div>
                        <div className="text-[10px] text-gray-500">
                          Click to customize travel dates & presets
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-[#1E5EFF] bg-white px-2.5 py-1 rounded-full border border-gray-200">
                      Change
                    </span>
                  </div>

                  {/* Calendar Popup */}
                  {showDatePicker && (
                    <div className="mt-2 p-4 bg-white rounded-[24px] border border-gray-200 shadow-2xl space-y-4 animate-fadeIn z-30 relative">
                      
                      <div className="flex flex-wrap gap-1.5 pb-2 border-b border-gray-100">
                        <button
                          type="button"
                          onClick={() => handlePresetSelect('weekend')}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-[#1E5EFF] hover:text-white rounded-lg text-[10px] font-bold text-gray-700 transition-colors"
                        >
                          ⚡ Next Weekend
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePresetSelect('nextMonth')}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-[#1E5EFF] hover:text-white rounded-lg text-[10px] font-bold text-gray-700 transition-colors"
                        >
                          📅 Next Month
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePresetSelect('ramadan')}
                          className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-600 hover:text-white rounded-lg text-[10px] font-bold text-emerald-800 transition-colors"
                        >
                          🕌 Ramadan 2026
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setCurrentCalendarDate(new Date(year, month - 1, 1))}
                          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        <span className="text-xs font-extrabold text-[#0B1F3A]">
                          {monthNames[month]} {year}
                        </span>

                        <button
                          type="button"
                          onClick={() => setCurrentCalendarDate(new Date(year, month + 1, 1))}
                          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex bg-gray-100 p-1 rounded-xl text-[11px] font-bold">
                        <button
                          type="button"
                          onClick={() => setDateSelectionMode('departure')}
                          className={`flex-1 py-1 rounded-lg transition-all ${
                            dateSelectionMode === 'departure' ? 'bg-[#1E5EFF] text-white shadow-sm' : 'text-gray-600'
                          }`}
                        >
                          Departure: {formatDateShort(departureDate)}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDateSelectionMode('return')}
                          className={`flex-1 py-1 rounded-lg transition-all ${
                            dateSelectionMode === 'return' ? 'bg-[#1E5EFF] text-white shadow-sm' : 'text-gray-600'
                          }`}
                        >
                          Return: {formatDateShort(returnDate)}
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400">
                        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center">
                        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                          <div key={`empty-${i}`} className="p-2" />
                        ))}

                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const dayNum = i + 1;
                          const thisTileDate = new Date(year, month, dayNum);

                          const isDep = departureDate && thisTileDate.toDateString() === departureDate.toDateString();
                          const isRet = returnDate && thisTileDate.toDateString() === returnDate.toDateString();
                          const isInRange = departureDate && returnDate && thisTileDate > departureDate && thisTileDate < returnDate;

                          return (
                            <button
                              key={dayNum}
                              type="button"
                              onClick={() => handleDayClick(dayNum)}
                              className={`p-2 text-xs font-bold rounded-xl transition-all ${
                                isDep || isRet
                                  ? 'bg-[#1E5EFF] text-white shadow-md font-extrabold'
                                  : isInRange
                                  ? 'bg-blue-100 text-[#1E5EFF]'
                                  : 'hover:bg-gray-100 text-gray-800'
                              }`}
                            >
                              {dayNum}
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-2 text-right">
                        <button
                          type="button"
                          onClick={() => setShowDatePicker(false)}
                          className="px-4 py-1.5 bg-[#0B1F3A] text-white text-xs font-bold rounded-full"
                        >
                          Confirm Dates
                        </button>
                      </div>

                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    {t.formMessage}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention hotel requirements, special requests for elderly/children, or additional flight preferences..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#F6F8FC] border border-gray-200 rounded-[14px] p-3 text-xs font-semibold focus:ring-2 focus:ring-[#1E5EFF] text-gray-900"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-4 bg-[#1E5EFF] hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-[18px] transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.formSubmit}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModalTab('voucher')}
                    className="w-full sm:w-auto px-5 py-4 bg-gray-100 hover:bg-gray-200 text-[#0B1F3A] font-bold text-xs uppercase rounded-[18px] transition-colors flex items-center justify-center gap-2 shrink-0"
                  >
                    <Download className="w-4 h-4 text-[#1E5EFF]" />
                    <span>View Voucher</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        )}

        {/* TAB 2: PRINTABLE VOUCHER VIEW */}
        {activeModalTab === 'voucher' && (
          <div className="space-y-6">
            
            {/* Printable Voucher Root */}
            <div id="printable-voucher-root" className="bg-white border-2 border-[#0B1F3A] rounded-[24px] p-6 text-gray-900 shadow-xl space-y-6 relative overflow-hidden">
              
              {/* Top Watermark / Stamp */}
              <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
                <ShieldCheck className="w-32 h-32 text-[#0B1F3A]" />
              </div>

              {/* Voucher Header with Company Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#0B1F3A]">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#0B1F3A] rounded-xl text-[#D4AF37] font-black text-xl flex items-center justify-center">
                      RT
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-extrabold text-[#0B1F3A] uppercase tracking-wide">
                        {COMPANY_INFO.name}
                      </h2>
                      <p className="text-[11px] font-bold text-gray-600">
                        {COMPANY_INFO.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">
                    {COMPANY_INFO.address} • Phone: {COMPANY_INFO.phonePrimary} • Email: {COMPANY_INFO.email}
                  </p>
                </div>

                <div className="text-left sm:text-right bg-blue-50 p-3 rounded-2xl border border-blue-100 shrink-0">
                  <span className="text-[10px] font-extrabold text-[#1E5EFF] uppercase block">Official Travel Voucher</span>
                  <span className="text-xs font-mono font-bold text-gray-900 block">{voucherRefNo}</span>
                  <span className="text-[9px] text-gray-500 block mt-0.5">{COMPANY_INFO.licenseNumber}</span>
                </div>
              </div>

              {/* Passenger & Booking Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold block uppercase">Passenger Name</span>
                  <span className="font-extrabold text-[#0B1F3A]">{fullName || 'Valued Passenger'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold block uppercase">Contact Number</span>
                  <span className="font-bold text-gray-800">{phone || COMPANY_INFO.phonePrimary}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold block uppercase">Travelers</span>
                  <span className="font-bold text-gray-800">{travelersCount} Person(s)</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold block uppercase">Duration</span>
                  <span className="font-bold text-gray-800">{calculateDurationDays()} Days</span>
                </div>
              </div>

              {/* Package & Itinerary Details */}
              <div>
                <div className="p-4 bg-[#0B1F3A] text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider block">Selected Package</span>
                    <h3 className="text-lg font-extrabold text-white">{packageInterest}</h3>
                    <p className="text-xs text-gray-300 mt-0.5">
                      Departure: {formatDateShort(departureDate)} • Return: {formatDateShort(returnDate)}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-gray-300 font-bold uppercase block">Total Package Price</span>
                    <span className="text-xl font-black text-[#D4AF37]">{totalCostConverted.formatted}</span>
                    <span className="text-[10px] text-gray-300 block">({perPersonConverted.formatted} / person)</span>
                  </div>
                </div>

                {/* Accommodations Box */}
                {matchedUmrah ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <span className="text-[10px] font-bold text-[#1E5EFF] uppercase block">Makkah Accommodation</span>
                      <span className="font-extrabold text-[#0B1F3A] block">{matchedUmrah.makkahHotel.name}</span>
                      <span className="text-[11px] text-gray-600 block">{matchedUmrah.makkahHotel.stars}★ Hotel • {matchedUmrah.makkahHotel.distance}</span>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase block">Madinah Accommodation</span>
                      <span className="font-extrabold text-[#0B1F3A] block">{matchedUmrah.madinahHotel.name}</span>
                      <span className="text-[11px] text-gray-600 block">{matchedUmrah.madinahHotel.stars}★ Hotel • {matchedUmrah.madinahHotel.distance}</span>
                    </div>
                  </div>
                ) : matchedTour ? (
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs mb-4">
                    <span className="text-[10px] font-bold text-[#1E5EFF] uppercase block">Hotels & Lodging</span>
                    <span className="font-extrabold text-[#0B1F3A] block">{matchedTour.hotels}</span>
                    <span className="text-[11px] text-gray-600 block">{matchedTour.duration} • Destination: {matchedTour.destination} ({matchedTour.country})</span>
                  </div>
                ) : null}

                {/* Inclusions Checklist */}
                <div className="space-y-1.5 mb-4 text-xs">
                  <span className="text-[11px] font-bold uppercase text-gray-700 block">Guaranteed Inclusions:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(matchedUmrah?.inclusions || matchedTour?.inclusions || [
                      "Saudi Arabia Visa Processing",
                      "Return Flight Ticket from Karachi",
                      "Hotel Accommodation with Breakfast",
                      "Complete AC Transport",
                      "Guided Ziaraat Tours",
                      "24/7 Ground Assistance"
                    ]).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100 text-[11px]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                        <span className="text-gray-800 font-semibold">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terms & Verification Footer */}
                <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-500">
                  <div>
                    <p className="font-bold text-gray-800">Ramad-e-Taiba Travel & Tours • DTS License KHI-8842</p>
                    <p>North Nazimabad Block A, Karachi, Pakistan • WhatsApp: +92 300 1234567</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="w-16 h-16 border border-gray-300 rounded-lg p-1 bg-white flex items-center justify-center">
                        <QrCode className="w-12 h-12 text-[#0B1F3A]" />
                      </div>
                      <span className="text-[8px] font-mono block mt-0.5">SCAN VERIFY</span>
                    </div>

                    <div className="text-center border-l pl-3 border-gray-200">
                      <div className="h-10 w-24 border-b border-gray-400 mb-1 flex items-end justify-center font-serif text-[11px] italic font-bold text-[#0B1F3A]">
                        Filzah Bin Fahim
                      </div>
                      <span className="text-[9px] uppercase font-bold text-gray-600 block">Authorized Signature</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Print & Download Action Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 no-print">
              <button
                type="button"
                onClick={() => setActiveModalTab('form')}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase rounded-full"
              >
                ← Back to Form
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintVoucher}
                  className="px-6 py-3 bg-[#1E5EFF] hover:bg-blue-600 text-white font-extrabold text-xs uppercase rounded-full shadow-lg flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Voucher / Save PDF</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
