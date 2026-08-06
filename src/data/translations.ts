export interface TranslationDict {
  // Navigation & Topbar
  navHome: string;
  navAbout: string;
  navServices: string;
  navUmrah: string;
  navTours: string;
  navDestinations: string;
  navGallery: string;
  navTestimonials: string;
  navFAQ: string;
  navContact: string;
  navBookBtn: string;
  topAddress: string;
  topHours: string;
  aiAdvisorBtn: string;
  currencyLabel: string;
  liveFxRate: string;

  // Hero Section
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleLine3: string;
  heroSubtitle: string;
  heroBookCTA: string;
  heroAskAI: string;
  heroWhatsAppCTA: string;
  searchTabUmrah: string;
  searchTabTours: string;
  searchTabFlights: string;
  searchTabVisa: string;
  searchFrom: string;
  searchTo: string;
  searchDate: string;
  searchGuests: string;
  searchAction: string;

  // Trust Bar
  trustIata: string;
  trustUmrahAuth: string;
  trustBestRate: string;
  trustKarachiOffice: string;
  trustPilgrimsServed: string;

  // About Section
  aboutTitle: string;
  aboutSubtitle: string;
  aboutBadge: string;
  aboutHeading: string;
  aboutPara1: string;
  aboutPara2: string;
  aboutLicence: string;
  aboutIataNum: string;
  aboutStat1Num: string;
  aboutStat1Label: string;
  aboutStat2Num: string;
  aboutStat2Label: string;
  aboutStat3Num: string;
  aboutStat3Label: string;

  // Umrah Section
  umrahBadge: string;
  umrahTitle: string;
  umrahSubtitle: string;
  umrahTabAll: string;
  umrahTabEconomy: string;
  umrahTabExecutive: string;
  umrahTabVIP: string;
  umrahTabRamadan: string;
  perPerson: string;
  viewDetails: string;
  bookPackage: string;
  makkahHotelLabel: string;
  madinahHotelLabel: string;
  includes: string;
  itinerary: string;

  // International Tours
  toursBadge: string;
  toursTitle: string;
  toursSubtitle: string;
  durationLabel: string;
  flightsIncluded: string;
  visaAssistance: string;

  // Estimator
  estimatorTitle: string;
  estimatorSubtitle: string;
  estimatorSelectDest: string;
  estimatorNumTravelers: string;
  estimatorHotelTier: string;
  estimatorAddons: string;
  estimatorEstimatedTotal: string;
  estimatorPerPerson: string;
  estimatorBookThisTrip: string;

  // Destinations
  destBadge: string;
  destTitle: string;
  destSubtitle: string;
  flightTimeFromKHI: string;
  startingFrom: string;

  // Services
  servicesBadge: string;
  servicesTitle: string;
  servicesSubtitle: string;

  // Why Choose Us
  whyBadge: string;
  whyTitle: string;
  whySubtitle: string;

  // Booking Process
  processBadge: string;
  processTitle: string;
  processSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;

  // Gallery
  galleryBadge: string;
  galleryTitle: string;
  gallerySubtitle: string;
  allPhotos: string;

  // Testimonials
  testiBadge: string;
  testiTitle: string;
  testiSubtitle: string;

  // FAQ
  faqBadge: string;
  faqTitle: string;
  faqSubtitle: string;
  faqSearchPlaceholder: string;

  // Contact
  contactBadge: string;
  contactTitle: string;
  contactSubtitle: string;
  officeLocation: string;
  phoneNumbers: string;
  emailUs: string;
  officeHours: string;
  formName: string;
  formEmail: string;
  formPhone: string;
  formService: string;
  formTravelers: string;
  formMessage: string;
  formSubmit: string;
  formSending: string;
  formSuccess: string;

  // AI Assistant Modal
  aiModalTitle: string;
  aiModalSubtitle: string;
  aiWelcomeMsg: string;
  aiPrompt1: string;
  aiPrompt2: string;
  aiPrompt3: string;
  aiPrompt4: string;
  aiInputPlaceholder: string;
  aiSendBtn: string;

  // Booking Modal
  bookingModalTitle: string;
  bookingModalSubtitle: string;
  confirmBooking: string;

  // Footer
  footerDesc: string;
  quickLinks: string;
  popularPackages: string;
  officeAddressFull: string;
  allRightsReserved: string;
}

export const translations: Record<'en' | 'ur', TranslationDict> = {
  en: {
    navHome: "Home",
    navAbout: "About Us",
    navServices: "Services",
    navUmrah: "Umrah Packages",
    navTours: "International Tours",
    navDestinations: "Destinations",
    navGallery: "Gallery",
    navTestimonials: "Testimonials",
    navFAQ: "FAQ",
    navContact: "Contact",
    navBookBtn: "Book Your Journey",
    topAddress: "North Nazimabad, Block A, Karachi",
    topHours: "Mon - Sat: 10:00 AM - 9:00 PM",
    aiAdvisorBtn: "AI Travel Advisor",
    currencyLabel: "CURRENCY:",
    liveFxRate: "Live FX Converted",

    heroBadge: "Authorized Umrah & International Travel Agency in Karachi",
    heroTitleLine1: "BLESSED JOURNEYS.",
    heroTitleLine2: "UNFORGETTABLE TOURS.",
    heroTitleLine3: "WORLD-CLASS SERVICE.",
    heroSubtitle: "Your most trusted travel partner in North Nazimabad, Karachi. Specializing in Economy & 5-Star Clock Tower Umrah Packages, Visa Consultancy, Air Tickets & Custom International Vacations.",
    heroBookCTA: "Book Umrah Journey",
    heroAskAI: "Ask AI Assistant",
    heroWhatsAppCTA: "WhatsApp Consultation",
    searchTabUmrah: "Umrah Packages",
    searchTabTours: "Holiday Tours",
    searchTabFlights: "Air Tickets",
    searchTabVisa: "Visa Consultancy",
    searchFrom: "Departure City",
    searchTo: "Destination / Package",
    searchDate: "Travel Month",
    searchGuests: "Travelers",
    searchAction: "Search Packages",

    trustIata: "IATA Accredited Agency",
    trustUmrahAuth: "Direct Saudi Ministry Visa Provider",
    trustBestRate: "Best Price Guarantee & Transparent Rates",
    trustKarachiOffice: "Local Office Support in North Nazimabad",
    trustPilgrimsServed: "5,000+ Happy Pilgrims & Travelers",

    aboutTitle: "About Ramad-e-Taiba Travel & Tours",
    aboutSubtitle: "Your trusted partner for Hajj, Umrah & worldwide travel in Karachi. Managed by Filzah Bin Fahim.",
    aboutBadge: "Hajj & Umrah Partner | IATA Accredited",
    aboutHeading: "A Dedicated Standard of Excellence in Hajj, Umrah & Global Travel",
    aboutPara1: "Based in Karachi, Ramad-e-Taiba Travel & Tours is led by Filzah Bin Fahim. We have built an unshakeable reputation for complete transparency, VIP customer hospitality, and seamless execution of Hajj & Umrah pilgrimages, flights, hotels, and visa services.",
    aboutPara2: "Whether you seek an economical Umrah package with hotels close to Haram or a 5-Star luxury stay inside the Makkah Clock Tower with private GMC transfers, our expert team ensures every moment of your holy trip is stress-free.",
    aboutLicence: "Ramad-e-Taiba Travel & Tours",
    aboutIataNum: "IATA Accredited Agency",
    aboutStat1Num: "10+",
    aboutStat1Label: "Years of Trust in Karachi",
    aboutStat2Num: "5,000+",
    aboutStat2Label: "Successful Pilgrims",
    aboutStat3Num: "99.4%",
    aboutStat3Label: "Visa Approval Rate",

    umrahBadge: "Blessed Spiritual Pilgrimages",
    umrahTitle: "Premium Umrah Packages 2026",
    umrahSubtitle: "Carefully designed Umrah deals with direct Karachi flights, Makkah & Madinah hotels, AC transport, and guided Ziaraat.",
    umrahTabAll: "All Packages",
    umrahTabEconomy: "Economy",
    umrahTabExecutive: "4-Star Choice",
    umrahTabVIP: "5-Star Clock Tower",
    umrahTabRamadan: "Ramadan Special",
    perPerson: "per person (Quad sharing)",
    viewDetails: "View Details",
    bookPackage: "Book Package",
    makkahHotelLabel: "Makkah Hotel",
    madinahHotelLabel: "Madinah Hotel",
    includes: "Package Inclusions:",
    itinerary: "Day-by-Day Journey Plan:",

    toursBadge: "Explore The World",
    toursTitle: "International Tour Packages",
    toursSubtitle: "All-inclusive tour packages with return flights from Karachi, visas, 4-star hotels, transfers, and sightseeing.",
    durationLabel: "Duration",
    flightsIncluded: "Return Flights Included",
    visaAssistance: "Visa Assistance Included",

    estimatorTitle: "Custom Tour Price Estimator",
    estimatorSubtitle: "Calculate instant estimated costs for your custom family vacation or honeymoon package from Karachi.",
    estimatorSelectDest: "Choose Destination",
    estimatorNumTravelers: "Number of Travelers",
    estimatorHotelTier: "Hotel Category",
    estimatorAddons: "Optional Add-ons",
    estimatorEstimatedTotal: "Estimated Total Package Cost",
    estimatorPerPerson: "Approx per person",
    estimatorBookThisTrip: "Request Custom Quote for This Estimate",

    destBadge: "Popular Destinations",
    destTitle: "Top Travel Destinations from Karachi",
    destSubtitle: "Explore our most sought-after holiday and spiritual destinations with direct flights from Jinnah International Airport.",
    flightTimeFromKHI: "Flight from Karachi",
    startingFrom: "Starting from",

    servicesBadge: "Comprehensive Travel Solutions",
    servicesTitle: "Our Complete Travel Services",
    servicesSubtitle: "From Umrah e-visas to luxury air ticketing and embassy consultancy, we handle every detail of your journey.",

    whyBadge: "Why Choose Us",
    whyTitle: "Why Karachi Families Trust Ramad-e-Taiba",
    whySubtitle: "We prioritize your comfort, transparent pricing, and 24/7 on-ground support at every step.",

    processBadge: "Hassle-Free Booking",
    processTitle: "How to Book Your Trip in 4 Simple Steps",
    processSubtitle: "Experience a smooth, straightforward booking process online or via WhatsApp DM.",
    step1Title: "1. Select Package or Request Quote",
    step1Desc: "Browse our Umrah or worldwide travel packages or ask our AI assistant for a customized itinerary.",
    step2Title: "2. Document Submission",
    step2Desc: "Submit passport scans, CNIC, and photos via Instagram DM (@ramadetaiba) or WhatsApp.",
    step3Title: "3. Fast Visa & Ticket Confirmation",
    step3Desc: "Our team processes your official visa approval, issues airline tickets, and secures hotel vouchers.",
    step4Title: "4. Travel with Complete Peace of Mind",
    step4Desc: "Receive complete briefing, hotel contact info, and 24/7 ground guide assistance in Saudi Arabia or destination.",

    galleryBadge: "Memorable Moments",
    galleryTitle: "Our Pilgrims & Tour Gallery",
    gallerySubtitle: "Real photos of our happy pilgrims in Makkah, Madinah, Turkey, Dubai, and Northern Pakistan.",
    allPhotos: "All Photos",

    testiBadge: "Pilgrim & Customer Reviews",
    testiTitle: "What Our Travelers Say",
    testiSubtitle: "Read authentic feedback from families who traveled with Ramad-e-Taiba Travel & Tours from Karachi.",

    faqBadge: "Got Questions?",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Find answers to common queries regarding Hajj & Umrah visas, flights, hotels, and document requirements.",
    faqSearchPlaceholder: "Search questions (e.g. visa, documents)...",

    contactBadge: "Get In Touch",
    contactTitle: "Contact Ramad-e-Taiba Karachi",
    contactSubtitle: "Filzah Bin Fahim and our travel experts in Karachi are ready to help you plan your blessed pilgrimage or dream vacation.",
    officeLocation: "Office Location",
    phoneNumbers: "Phone & WhatsApp",
    emailUs: "Email Inquiry",
    officeHours: "Operating Hours",
    formName: "Full Name *",
    formEmail: "Email Address *",
    formPhone: "Mobile / WhatsApp Number *",
    formService: "Service Needed *",
    formTravelers: "Number of Passengers",
    formMessage: "Travel Dates & Special Requirements *",
    formSubmit: "Send Inquiry via Instagram / WhatsApp",
    formSending: "Sending your request...",
    formSuccess: "Inquiry sent successfully! Our consultant Filzah Bin Fahim will contact you shortly.",

    aiModalTitle: "Ramad-e-Taiba AI Travel Assistant",
    aiModalSubtitle: "Instant answers about Umrah packages, Saudi visas, flight fares, hotels, and tour itineraries.",
    aiWelcomeMsg: "Assalamu Alaikum! I am Ramad-e-Taiba AI. How can I assist you with your Hajj, Umrah or worldwide travel planning today?",
    aiPrompt1: "What are the Umrah package prices for 2026?",
    aiPrompt2: "What documents are needed for Saudi Umrah visa?",
    aiPrompt3: "Tell me about flights, hotels and visa services.",
    aiPrompt4: "How can I DM for bookings on Instagram (@ramadetaiba)?",
    aiInputPlaceholder: "Ask about Hajj, Umrah, flights, hotels, or visa services...",
    aiSendBtn: "Send",

    bookingModalTitle: "Reserve Package / DM for Bookings",
    bookingModalSubtitle: "Fill out the quick form below or DM us on Instagram (@ramadetaiba) / WhatsApp for instant response.",
    confirmBooking: "Confirm Booking Request",

    footerDesc: "Ramad-e-Taiba Travel & Tours, Karachi — Your trusted partner for Hajj, Umrah & worldwide travel. Flights | Hotels | Visa Services. DM us on Instagram @ramadetaiba for bookings & packages.",
    quickLinks: "Quick Links",
    popularPackages: "Popular Packages",
    officeAddressFull: "Ramad-e-Taiba, Karachi, Pakistan",
    allRightsReserved: "© 2026 Ramad-e-Taiba Travel & Tours. All Rights Reserved."
  },

  ur: {
    navHome: "صفحہ اول",
    navAbout: "ہمارے بارے میں",
    navServices: "ہماری خدمات",
    navUmrah: "حج و عمرہ",
    navTours: "بین الاقوامی ٹورز",
    navDestinations: "سیاحتی مقامات",
    navGallery: "تصاویری گیلری",
    navTestimonials: "مسافروں کی رائے",
    navFAQ: "سوال و جواب",
    navContact: "رابطہ کریں",
    navBookBtn: "بکنگ کروائیں",
    topAddress: "نارتھ ناظم آباد، بلاک اے، کراچی",
    topHours: "پیر تا ہفتہ: صبح 10 تا رات 9 بجے",
    aiAdvisorBtn: "اے آئی ٹریول مشیر",
    currencyLabel: "کرنسی:",
    liveFxRate: "لائیو ایکسچینج ریٹ",

    heroBadge: "کراچی کی قابل اعتماد و منظور شدہ عمرہ و ٹریول ایجنسی",
    heroTitleLine1: "با برکت روحانی سفر۔",
    heroTitleLine2: "یادگار بین الاقوامی ٹورز۔",
    heroTitleLine3: "اعلیٰ ترین معیاری خدمات۔",
    heroSubtitle: "نارتھ ناظم آباد کراچی میں آپ کا سب سے قابل اعتماد سفری ساتھی۔ اکانومی و 5 سٹار مکہ کلاک ٹاور عمرہ پیکجز، ویزہ کنسلٹنسی، ہوائی ٹکٹ اور سیر و تفریح۔",
    heroBookCTA: "عمرہ پیکج بک کریں",
    heroAskAI: "اے آئی اسسٹنٹ سے پوچھیں",
    heroWhatsAppCTA: "واٹس ایپ پر رابطہ کریں",
    searchTabUmrah: "عمرہ پیکجز",
    searchTabTours: "تفریحی ٹورز",
    searchTabFlights: "ہوائی ٹکٹ",
    searchTabVisa: "ویزہ سروس",
    searchFrom: "روانگی کا شہر",
    searchTo: "منزل / پیکج",
    searchDate: "سفر کا مہینہ",
    searchGuests: "مسافروں کی تعداد",
    searchAction: "موجودہ پیکجز تلاش کریں",

    trustIata: "آئی اے ٹی اے (IATA) منظور شدہ",
    trustUmrahAuth: "حج و عمرہ کا بااعتماد پارٹنر",
    trustBestRate: "بہترین قیمت اور شفاف شرح کی ضمانت",
    trustKarachiOffice: "کراچی میں مقامی دفتر کی سہولت",
    trustPilgrimsServed: "5000 سے زائد مطمئن زائرین",

    aboutTitle: "رمادِ طیبہ ٹریول اینڈ ٹورز کراچی",
    aboutSubtitle: "حج، عمرہ اور بین الاقوامی سفر کے لیے آپ کا بااعتماد ساتھی۔ زیرِ اہتمام: فلزہ بن فہیم",
    aboutBadge: "حج و عمرہ پارٹنر | فلائٹس | ہوٹلز | ویزہ سروسز",
    aboutHeading: "حج، عمرہ اور عالمی سفر میں معیار اور اعلا خدمت کا عزم",
    aboutPara1: "رمادِ طیبہ ٹریول اینڈ ٹورز کراچی میں فلزہ بن فہیم کی زیرِ نگرانی قائم ایک بااعتماد ادارہ ہے۔ ہم مکمل شفافیت، مہمان نوازی، اور حج، عمرہ، فلائٹس، ہوٹلز اور ویزہ سروسز کی فراہمی میں بہترین شہرت رکھتے ہیں۔",
    aboutPara2: "خواہ آپ کو حرم کے قریب معقول اکانومی عمرہ پیکج درکار ہو یا مکہ کلاک ٹاور میں 5 سٹار قیام، ہماری تجربہ کار ٹیم ہر قدم پر آپ کی مکمل رہنمائی کرتی ہے۔",
    aboutLicence: "رمادِ طیبہ ٹریول اینڈ ٹورز",
    aboutIataNum: "آئی اے ٹی اے منظور شدہ",
    aboutStat1Num: "+10",
    aboutStat1Label: "سال کا بااعتماد تجربہ",
    aboutStat2Num: "+5,000",
    aboutStat2Label: "کامیاب زائرین",
    aboutStat3Num: "99.4%",
    aboutStat3Label: "ویزہ منظوری کی شرح",

    umrahBadge: "مقدس و بابرکت روحانی سفر",
    umrahTitle: "پریمیئم عمرہ پیکجز 2026",
    umrahSubtitle: "کراچی سے برائے راست فلائٹس، مکہ و مدینہ کے بہترین ہوٹلز اور مکمل زیارات کے ساتھ۔",
    umrahTabAll: "تمام پیکجز",
    umrahTabEconomy: "اکانومی",
    umrahTabExecutive: "4-سٹار چوائس",
    umrahTabVIP: "5-سٹار کلاک ٹاور",
    umrahTabRamadan: "رمضان سپیشل",
    perPerson: "فی کس (کواڈ شیئرنگ)",
    viewDetails: "تفصیلات دیکھیں",
    bookPackage: "پیکج بک کریں",
    makkahHotelLabel: "مکہ ہوٹل",
    madinahHotelLabel: "مدینہ ہوٹل",
    includes: "پیکج میں شامل سہولیات:",
    itinerary: "روزمرہ سفری شیڈول:",

    toursBadge: "دنیا کی سیر کریں",
    toursTitle: "بین الاقوامی سیاحتی پیکجز",
    toursSubtitle: "کراچی سے واپسی کی فلائٹس، ویزہ، 4-سٹار ہوٹلز، ٹرانسپورٹ اور سیر و تفریح کے ساتھ۔",
    durationLabel: "مدت",
    flightsIncluded: "واپسی کی فلائٹ شامل ہے",
    visaAssistance: "ویزہ سہولت شامل ہے",

    estimatorTitle: "کسٹم ٹور تخمینہ کیلکولیٹر",
    estimatorSubtitle: "اپنے خاندانی سیاحتی سفر کا فوری تخمینہ لگائیں۔",
    estimatorSelectDest: "منزل کا انتخاب کریں",
    estimatorNumTravelers: "مسافروں کی تعداد",
    estimatorHotelTier: "ہوٹل کا کیٹیگری",
    estimatorAddons: "اضافی سہولیات",
    estimatorEstimatedTotal: "کل تخمینی رقم",
    estimatorPerPerson: "تقریباً فی کس",
    estimatorBookThisTrip: "اس تخمینے پر کوٹ حاصل کریں",

    destBadge: "دلفریب و خوبصورت دنیا",
    destTitle: "مقبول ترین سیاحتی و زیارتی مقامات",
    destSubtitle: "مکہ مکرمہ، مدینہ منورہ، استنبول، دبئی، باکو اور مالدیپ کے بہترین مناظر۔",
    flightTimeFromKHI: "کراچی سے فلائٹ کا وقت",
    startingFrom: "شروعاتی قیمت",

    servicesBadge: "جامع سفری سہولیات",
    servicesTitle: "ہماری تمام سفری خدمات",
    servicesSubtitle: "عمرہ ای-ویزہ، فلائٹس، ہوٹل بکنگ اور ویزہ کنسلٹنسی۔",

    whyBadge: "ہمیں کیوں منتخب کریں",
    whyTitle: "کراچی کے خاندان رمادِ طیبہ پر اعتماد کیوں کرتے ہیں؟",
    whySubtitle: "ہم آپ کی مکمل تسلی، شفّاف قیمتوں اور 24/7 رہنمائی کو ترجیح دیتے ہیں۔",

    processBadge: "آسان بکنگ",
    processTitle: "سفر کی بکنگ کے 4 آسان مراحل",
    processSubtitle: "آن لائن یا انسٹاگرام ڈی ایم / واٹس ایپ کے ذریعے آسان سفری منصوبہ بندی۔",
    step1Title: "1. پیکج کا انتخاب یا کوٹ کی درخواست",
    step1Desc: "عمرہ یا عالمی سفری پیکجز دیکھیں یا ہمارے اے آئی اسسٹنٹ سے معلومات حاصل کریں۔",
    step2Title: "2. دستاویزات کی فراہمی",
    step2Desc: "پاسپورٹ اور شناختی کارڈ کی کاپی انسٹاگرام (@ramadetaiba) یا واٹس ایپ پر بھیجیں۔",
    step3Title: "3. ویزہ اور ٹکٹ کی تصدیق",
    step3Desc: "ہماری ٹیم فوری ویزہ، ایئر لائن ٹکٹ اور ہوٹل واؤچر جاری کرتی ہے۔",
    step4Title: "4. پرامن اور سکون دہ سفر",
    step4Desc: "مکمل معلومات اور سعودیہ یا منزل پر 24/7 رہنمائی کے ساتھ سفر کریں۔",

    galleryBadge: "ہماری یادگاریں",
    galleryTitle: "زائرین و مسافروں کی تصاویر",
    gallerySubtitle: "مکہ مکرمہ، مدینہ منورہ، استنبول، دبئی اور سکردو میں ہمارے مسافروں کے خوبصورت لمحات۔",
    allPhotos: "تمام تصاویر",

    testiBadge: "مسافروں کی آراء",
    testiTitle: "ہمارے زائرین کیا کہتے ہیں",
    testiSubtitle: "کراچی کے ان خاندانوں کے تاثرات جنہوں نے رمادِ طیبہ ٹریول اینڈ ٹورز کے ساتھ سفر کیا۔",

    faqBadge: "سوالات و جوابات",
    faqTitle: "عام طور پر پوچھے جانے والے سوالات",
    faqSubtitle: "عمرہ ویزہ، فلائٹس، ہوٹل بکنگ اور ویزہ سروسز کے بارے میں معلومات حاصل کریں۔",
    faqSearchPlaceholder: "سوالات تلاش کریں (مثلاً ویزہ، کاغذات، پاسپورٹ)...",

    contactBadge: "رابطہ کریں",
    contactTitle: "رمادِ طیبہ کراچی سے رابطہ کریں",
    contactSubtitle: "فلزہ بن فہیم اور ہماری ٹیم کراچی میں آپ کی بااحسن معاونت کے لیے تیار ہیں۔",
    officeLocation: "دفتر کا پتہ",
    phoneNumbers: "فون و واٹس ایپ",
    emailUs: "ای میل انکوائری",
    officeHours: "اوقاتِ کار",
    formName: "مکمل نام *",
    formEmail: "ای میل ایڈریس *",
    formPhone: "موبائل / واٹس ایپ نمبر *",
    formService: "مطلوبہ سروس *",
    formTravelers: "مسافروں کی تعداد",
    formMessage: "سفر کی تاریخیں اور مزید تفصیلات *",
    formSubmit: "انسٹاگرام / واٹس ایپ پر درخواست بھیجیں",
    formSending: "درخواست بھیجی جا رہی ہے...",
    formSuccess: "انکوائری کامیابی سے موصول ہو گئی! فلزہ بن فہیم جلد رابطہ کریں گے۔",

    aiModalTitle: "رمادِ طیبہ اے آئی ٹریول اسسٹنٹ",
    aiModalSubtitle: "عمرہ پیکجز، فلائٹس، ہوٹلز اور ویزہ سروسز کے فوری جوابات حاصل کریں۔",
    aiWelcomeMsg: "السلام علیکم! میں رمادِ طیبہ اے آئی ہوں۔ میں آپ کے حج، عمرہ یا عالمی سفر کی منصوبہ بندی میں کیسے مدد کر سکتا ہوں؟",
    aiPrompt1: "2026 کے عمرہ پیکجز کی قیمتیں کیا ہیں؟",
    aiPrompt2: "سعودی عمرہ ویزہ کے لیے کون سے کاغذات چاہیے؟",
    aiPrompt3: "فلائٹس، ہوٹلز اور ویزہ سروسز کی تفصیلات بتائیں۔",
    aiPrompt4: "انسٹاگرام (@ramadetaiba) پر بکنگ کا طریقہ کار؟",
    aiInputPlaceholder: "حج، عمرہ، فلائٹس، ہوٹلز یا ویزہ کے بارے میں پوچھیں...",
    aiSendBtn: "ارسال کریں",

    bookingModalTitle: "پیکج بکنگ / انسٹاگرام ڈی ایم",
    bookingModalSubtitle: "ذیل کا فارم پر کریں یا انسٹاگرام (@ramadetaiba) پر ڈی ایم کریں۔",
    confirmBooking: "بکنگ کی درخواست کی تصدیق کریں",

    footerDesc: "رمادِ طیبہ ٹریول اینڈ ٹورز کراچی — حج، عمرہ اور بین الاقوامی سفر کے لیے آپ کا بااعتماد ساتھی۔ فلائٹس | ہوٹلز | ویزہ سروسز۔ بکنگ کے لیے انسٹاگرام @ramadetaiba پر ڈی ایم کریں۔",
    quickLinks: "اہم لنکس",
    popularPackages: "مقبول ترین پیکجز",
    officeAddressFull: "رمادِ طیبہ، کراچی، پاکستان",
    allRightsReserved: "© 2026 رمادِ طیبہ ٹریول اینڈ ٹورز۔ جملہ حقوق محفوظ ہیں۔"
  }
};
