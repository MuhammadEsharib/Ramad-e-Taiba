import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Currency, Language } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import { translations } from '../data/translations';
import { Logo } from './Logo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe2, 
  Menu, 
  X, 
  Plane,
  Sparkles,
  TrendingUp,
  ChevronDown,
  Moon,
  FileText,
  Building2,
  Image,
  MessageSquare,
  HelpCircle,
  PhoneCall,
  Search,
  CheckCircle2
} from 'lucide-react';

// Animated Segmented Currency Selector Component
export const AnimatedCurrencySelector: React.FC<{
  currency: Currency;
  setCurrency: (c: Currency) => void;
  isLiveRates: boolean;
  language: Language;
}> = ({ currency, setCurrency, isLiveRates, language }) => {
  const currencies: Currency[] = ['PKR', 'USD', 'SAR', 'AED', 'EUR'];
  const symbols: Record<Currency, string> = {
    PKR: '₨',
    USD: '$',
    SAR: '﷼',
    AED: 'د.إ',
    EUR: '€'
  };

  return (
    <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full border border-white/15 relative shrink-0">
      <span className="text-[10px] font-bold text-gray-300 px-2 hidden xl:inline uppercase tracking-wider">
        {language === 'ur' ? 'کرنسی:' : 'CURRENCY:'}
      </span>
      {currencies.map((curr) => {
        const isSelected = currency === curr;
        return (
          <button
            key={curr}
            onClick={() => setCurrency(curr)}
            className={`relative px-2.5 py-1 rounded-full text-xs font-black transition-colors z-10 flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none min-h-[30px] ${
              isSelected ? 'text-[#0B1F3A]' : 'text-gray-200 hover:text-white'
            }`}
            aria-label={`Switch currency to ${curr}`}
          >
            {isSelected && (
              <motion.div
                layoutId="activeHeaderCurrencyPill"
                className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-amber-300 rounded-full shadow-md z-[-1]"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="leading-none">{curr}</span>
            <span className="text-[10px] opacity-80 leading-none">{symbols[curr]}</span>
          </button>
        );
      })}

      {isLiveRates && (
        <span className="hidden md:inline-flex items-center gap-1 text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30 ml-1">
          <TrendingUp className="w-2.5 h-2.5" />
          Live
        </span>
      )}
    </div>
  );
};

interface HeaderProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  isLiveRates: boolean;
  onOpenBookingModal: (pkgTitle?: string) => void;
  onOpenAIAssistant: () => void;
}

export const LogoSvg: React.FC<{ className?: string }> = ({ className = "" }) => (
  <Logo size="md" showText={true} className={className} />
);

interface SubLinkItem {
  name: string;
  href: string;
  desc?: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface NavCategory {
  id: string;
  name: string;
  href?: string;
  badge?: string;
  subLinks?: SubLinkItem[];
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  setCurrency,
  language,
  setLanguage,
  isLiveRates,
  onOpenBookingModal,
  onOpenAIAssistant
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const t = translations[language];
  const isUrdu = language === 'ur';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Structured Nav Categories with Sub-links to prevent Header overflow
  const navCategories: NavCategory[] = [
    {
      id: 'home',
      name: t.navHome,
      href: '#hero'
    },
    {
      id: 'umrah',
      name: t.navUmrah,
      badge: 'Popular',
      subLinks: [
        {
          name: isUrdu ? 'تمام عمرہ پیکجز' : 'All Umrah Packages',
          href: '#umrah',
          desc: isUrdu ? 'اکانومی، ایگزیکٹو اور رمضان پیکجز' : '15-Day & Custom packages with hotels near Haram',
          icon: <Moon className="w-4 h-4 text-[#D4AF37]" />,
          badge: '2026'
        },
        {
          name: isUrdu ? 'اکانومی 15 روزہ عمرہ' : 'Economy 15-Day Umrah',
          href: '#umrah',
          desc: isUrdu ? 'کفایتی اور اعلیٰ خدمات' : 'Affordable packages with bus transport & Ziaraat',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        },
        {
          name: isUrdu ? 'ایگزیکٹو 5-اسٹار عمرہ' : 'Executive 5-Star VIP Umrah',
          href: '#umrah',
          desc: isUrdu ? 'سوئس ہوٹل مکہ و مدینہ' : 'Luxury Clock Tower stays with private GMC transfers',
          icon: <Sparkles className="w-4 h-4 text-[#D4AF37]" />,
          badge: 'VIP'
        }
      ]
    },
    {
      id: 'tours',
      name: isUrdu ? 'ٹورز اور مقامات' : 'Tours & Destinations',
      subLinks: [
        {
          name: t.navTours,
          href: '#tours',
          desc: isUrdu ? 'ترکی، دبئی، باکو، تھائی لینڈ، اسکردو' : 'International fixed departures & customized tours',
          icon: <Plane className="w-4 h-4 text-[#1E5EFF]" />
        },
        {
          name: t.navDestinations,
          href: '#destinations',
          desc: isUrdu ? 'دنیا بھر کی سیاحت کی گائیڈ' : 'Top flight & holiday destinations from Karachi',
          icon: <Building2 className="w-4 h-4 text-[#D4AF37]" />
        }
      ]
    },
    {
      id: 'services',
      name: isUrdu ? 'خدمات اور فائل ٹریکر' : 'Services & Tracking',
      subLinks: [
        {
          name: t.navServices,
          href: '#services',
          desc: isUrdu ? 'ویزا، فلائٹ اور ہوٹل کنسلتنسی' : 'Tourist visa, flight ticketing & hotel vouchers',
          icon: <FileText className="w-4 h-4 text-[#1E5EFF]" />
        },
        {
          name: isUrdu ? 'فائل اسٹیٹس ٹریکر' : 'Live Application Tracker',
          href: '#tracker',
          desc: isUrdu ? 'ویزا یا عمرہ فائل کا برائے راست اسٹیٹس' : 'Track your visa and Umrah docket in real-time',
          icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
          badge: 'Live'
        }
      ]
    },
    {
      id: 'company',
      name: isUrdu ? 'معلومات و رابطہ' : 'Company & Info',
      subLinks: [
        {
          name: t.navAbout,
          href: '#about',
          desc: isUrdu ? 'پاک ورلڈ ٹریول کا تعارف' : 'Licenced IATA agency based in North Nazimabad',
          icon: <Building2 className="w-4 h-4 text-[#0B1F3A]" />
        },
        {
          name: t.navGallery,
          href: '#gallery',
          desc: isUrdu ? 'مقدس زیارات اور ٹورز کی تصاویر' : 'Photos of pilgrims and scenic destinations',
          icon: <Image className="w-4 h-4 text-[#1E5EFF]" />
        },
        {
          name: t.navTestimonials,
          href: '#testimonials',
          desc: isUrdu ? 'زائرین اور سیاحوں کی رائے' : 'Genuine reviews from verified Karachi travelers',
          icon: <MessageSquare className="w-4 h-4 text-emerald-600" />
        },
        {
          name: t.navFAQ,
          href: '#faq',
          desc: isUrdu ? 'عام سوالات کے جوابات' : 'Frequently asked questions on visa & packages',
          icon: <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
        },
        {
          name: t.navContact,
          href: '#contact',
          desc: isUrdu ? 'نارتھ ناظم آباد کراچی کا پتہ' : 'Phone, WhatsApp and Karachi office location',
          icon: <PhoneCall className="w-4 h-4 text-blue-600" />
        }
      ]
    }
  ];

  const handleMouseEnter = (catId: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(catId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileCategory = (catId: string) => {
    setMobileExpandedCat(mobileExpandedCat === catId ? null : catId);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="hidden lg:block bg-[#0B1F3A] text-white/90 text-xs py-2 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a 
              href="#contact" 
              className="flex items-center gap-1.5 hover:text-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded-md transition-colors"
              aria-label="View Karachi Office Location and Contact Details"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.topAddress}</span>
            </a>
            <a 
              href={`tel:${COMPANY_INFO.phonePrimary}`} 
              className="flex items-center gap-1.5 hover:text-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded-md transition-colors"
              aria-label={`Call ${COMPANY_INFO.name} primary phone ${COMPANY_INFO.phonePrimary}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span dir="ltr">{COMPANY_INFO.phonePrimary}</span>
            </a>
            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="flex items-center gap-1.5 hover:text-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded-md transition-colors"
              aria-label={`Send email to ${COMPANY_INFO.email}`}
            >
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* AI Assistant Quick Trigger */}
            <button
              onClick={onOpenAIAssistant}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/40 via-amber-500/20 to-blue-600/40 text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[11px] font-bold transition-all shadow-sm hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
              aria-label="Launch AI Travel Advisor Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" />
              <span>{t.aiAdvisorBtn}</span>
            </button>

            {/* Smooth Animated Currency Selector */}
            <AnimatedCurrencySelector
              currency={currency}
              setCurrency={setCurrency}
              isLiveRates={isLiveRates}
              language={language}
            />

            {/* Language Switcher (EN / UR) */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/15 text-amber-300 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
              title="Switch Language / زبان تبدیل کریں"
              aria-label="Switch Language between English and Urdu"
            >
              <Globe2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{language === 'en' ? 'اردو' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        role="navigation"
        aria-label="Main Site Navigation"
        className={`w-full transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-lg border-b border-gray-200 py-2.5'
          : 'bg-white/95 backdrop-blur-md py-3 border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
          
          <a 
            href="#hero" 
            className="focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none rounded-xl shrink-0"
            aria-label={`${COMPANY_INFO.name} Home`}
          >
            <LogoSvg />
          </a>

          {/* Desktop Responsive Navigation Links with Nested Dropdowns */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold tracking-wide text-[#0B1F3A]">
            {navCategories.map((cat) => {
              const hasSub = Boolean(cat.subLinks && cat.subLinks.length > 0);
              const isOpen = activeDropdown === cat.id;

              if (!hasSub && cat.href) {
                return (
                  <a
                    key={cat.id}
                    href={cat.href}
                    className="px-3 py-2 rounded-xl hover:bg-blue-50 hover:text-[#1E5EFF] focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none transition-all relative font-bold text-xs xl:text-sm"
                  >
                    {cat.name}
                  </a>
                );
              }

              return (
                <div
                  key={cat.id}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(cat.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => setActiveDropdown(isOpen ? null : cat.id)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-label={`${cat.name} menu`}
                    className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all text-xs xl:text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none ${
                      isOpen ? 'bg-blue-50 text-[#1E5EFF]' : 'hover:bg-gray-100/80 text-[#0B1F3A]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {cat.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] font-black uppercase rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                        {cat.badge}
                      </span>
                    )}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#1E5EFF]' : 'text-gray-400'}`} />
                  </button>

                  {/* Sub-links Dropdown Menu Popover with RTL alignment */}
                  {isOpen && cat.subLinks && (
                    <div className={`absolute top-full mt-1 w-72 bg-white rounded-[22px] shadow-2xl border border-gray-100 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${
                      isUrdu ? 'right-0 text-right' : 'left-0 text-left'
                    }`}>
                      <div className="space-y-1">
                        {cat.subLinks.map((sub, idx) => (
                          <a
                            key={idx}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-2.5 rounded-[16px] hover:bg-[#F6F8FC] focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none transition-all group/sub"
                          >
                            <div className="p-2 rounded-xl bg-gray-50 group-hover/sub:bg-white group-hover/sub:shadow-sm transition-colors shrink-0 mt-0.5">
                              {sub.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-[#0B1F3A] group-hover/sub:text-[#1E5EFF] transition-colors">
                                  {sub.name}
                                </span>
                                {sub.badge && (
                                  <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                              {sub.desc && (
                                <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">
                                  {sub.desc}
                                </p>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action CTAs for Desktop & Laptop */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <a
              href="#tracker"
              className="px-3.5 py-2 bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#0B1F3A] border border-[#D4AF37]/40 text-xs font-extrabold uppercase tracking-wider rounded-[16px] transition-all flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none"
              aria-label="Check application status docket"
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#0B1F3A]" />
              <span>{isUrdu ? 'فائل اسٹیٹس' : 'Track Status'}</span>
            </a>

            <button
              onClick={() => onOpenBookingModal()}
              className="px-5 py-2 bg-[#0B1F3A] text-white text-xs font-bold uppercase tracking-wider rounded-[16px] hover:bg-[#1E5EFF] transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none"
              aria-label="Open Booking Modal"
            >
              {t.navBookBtn}
            </button>
          </div>

          {/* Mobile Menu Toggle & Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="px-3 py-1.5 text-xs font-extrabold rounded-full bg-amber-400/20 text-[#0B1F3A] border border-amber-400/40 focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[36px]"
              aria-label="Switch Language"
            >
              {language === 'en' ? 'اردو' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-gray-100 text-[#0B1F3A] focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center shadow-sm"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer with Sub-accordions */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-5 pt-4 pb-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-2 font-semibold text-[#0B1F3A]">
              
              {navCategories.map((cat) => {
                const hasSub = Boolean(cat.subLinks && cat.subLinks.length > 0);
                const isExpanded = mobileExpandedCat === cat.id;

                if (!hasSub && cat.href) {
                  return (
                    <a
                      key={cat.id}
                      href={cat.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 px-3 rounded-xl hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none border-b border-gray-100 flex items-center justify-between text-sm font-bold min-h-[44px]"
                    >
                      <span>{cat.name}</span>
                    </a>
                  );
                }

                return (
                  <div key={cat.id} className="border-b border-gray-100">
                    <button
                      onClick={() => toggleMobileCategory(cat.id)}
                      aria-expanded={isExpanded}
                      aria-label={`${cat.name} submenu category`}
                      className="w-full py-3 px-3 rounded-xl hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none flex items-center justify-between text-sm font-bold text-[#0B1F3A] min-h-[44px]"
                    >
                      <div className="flex items-center gap-2">
                        <span>{cat.name}</span>
                        {cat.badge && (
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                            {cat.badge}
                          </span>
                        )}
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180 text-[#1E5EFF]' : ''}`} />
                    </button>

                    {/* Accordion Sub-links */}
                    {isExpanded && cat.subLinks && (
                      <div className="pl-4 pr-2 py-2 space-y-1 bg-[#F6F8FC] rounded-2xl mb-2">
                        {cat.subLinks.map((sub, sIdx) => (
                          <a
                            key={sIdx}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none text-xs font-semibold text-gray-700 hover:text-[#1E5EFF] transition-colors min-h-[44px]"
                          >
                            <span className="shrink-0">{sub.icon}</span>
                            <span className="flex-1">{sub.name}</span>
                            {sub.badge && (
                              <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
                                {sub.badge}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Utility Selectors in Mobile Drawer */}
              <div className="flex items-center justify-between py-3 px-3 bg-gray-50 rounded-2xl my-2">
                <span className="text-xs font-bold text-gray-600">{t.currencyLabel}</span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="bg-white text-xs font-bold px-3 py-2 rounded-xl text-[#0B1F3A] border border-gray-200 focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[44px]"
                  aria-label="Select Currency in mobile menu"
                >
                  <option value="PKR">PKR (₨)</option>
                  <option value="USD">USD ($)</option>
                  <option value="SAR">SAR (﷼)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="AED">AED (د.إ)</option>
                </select>
              </div>

              {/* Action Buttons in Mobile Drawer */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAIAssistant();
                  }}
                  className="w-full py-3.5 rounded-[18px] bg-gradient-to-r from-[#0B1F3A] to-[#1E5EFF] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[44px]"
                  aria-label="Ask AI Travel Advisor"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                  <span>{t.aiAdvisorBtn}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookingModal();
                  }}
                  className="w-full py-3.5 rounded-[18px] bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs uppercase tracking-wider shadow-md focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[44px]"
                  aria-label="Book Journey Package"
                >
                  {t.navBookBtn}
                </button>
              </div>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

