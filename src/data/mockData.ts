import { UmrahPackage, TourPackage, Destination, ServiceItem, Testimonial, GalleryItem, FAQItem, Currency, CurrencyRate } from '../types';

export const COMPANY_INFO = {
  name: "Ramad-e-Taiba Travel & Tours",
  owner: "Filzah Bin Fahim",
  tagline: "Your trusted partner for Hajj, Umrah & worldwide travel",
  taglineUr: "حج، عمرہ اور بین الاقوامی سفر کے لیے آپ کا بااعتماد ادارہ",
  servicesSummary: "Flights | Hotels | Visa Services",
  cta: "DM us for bookings & packages 😇",
  address: "Ramad-e-Taiba, Block A, North Nazimabad, Karachi, Pakistan",
  shortAddress: "North Nazimabad, Karachi",
  phonePrimary: "+92 300 1234567",
  phoneSecondary: "+92 21 36678900",
  whatsappNumber: "+923001234567",
  email: "info@ramadetaiba.com",
  operatingHours: "Monday - Saturday: 10:00 AM - 9:00 PM (PKT)",
  operatingHoursUr: "پیر تا ہفتہ: صبح 10 تا رات 9 بجے",
  instagram: "https://www.instagram.com/ramadetaiba",
  instagramHandle: "@ramadetaiba",
  facebook: "https://facebook.com/ramadetaiba",
  iataNumber: "IATA Accredited Agency",
  licenseNumber: "Authorized Hajj & Umrah Provider",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.368819077122!2d67.0323381!3d24.9365516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f8464a27503%3A0x8e83360b9491745d!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
};

export const CURRENCY_RATES: Record<Currency, CurrencyRate> = {
  PKR: { symbol: "PKR", rateToPKR: 1 },
  USD: { symbol: "$", rateToPKR: 280 },
  SAR: { symbol: "SAR", rateToPKR: 74.5 },
  AED: { symbol: "AED", rateToPKR: 76.2 },
  EUR: { symbol: "EUR", rateToPKR: 302 }
};

export const TRUST_PARTNERS = {
  airlines: [
    { name: "Emirates", logoText: "EMIRATES", country: "UAE" },
    { name: "Qatar Airways", logoText: "QATAR AIRWAYS", country: "Qatar" },
    { name: "Saudi Arabian Airlines", logoText: "SAUDIA", country: "KSA" },
    { name: "Pakistan International Airlines", logoText: "PIA", country: "Pakistan" },
    { name: "Turkish Airlines", logoText: "TURKISH AIRLINES", country: "Turkey" },
    { name: "Flydubai", logoText: "FLYDUBAI", country: "UAE" },
    { name: "Air Arabia", logoText: "AIR ARABIA", country: "UAE" },
    { name: "Etihad Airways", logoText: "ETIHAD", country: "UAE" }
  ],
  hotels: [
    "Swissôtel Makkah Clock Tower",
    "Pullman Zamzam Makkah",
    "Dar Al Taqwa Madinah",
    "Anjum Makkah Hotel",
    "Mövenpick Hotel Madinah",
    "Raffles Makkah Palace"
  ],
  trustBadges: [
    { icon: "ShieldCheck", title: "IATA Accredited", titleUr: "آئی اے ٹی اے منظور شدہ", desc: "Verified Global Travel Agency", descUr: "عالمی تصدیق شدہ ٹریول ایجنسی" },
    { icon: "CheckCircle2", title: "Direct Umrah Visa", titleUr: "برائے راست عمرہ ویزہ", desc: "Authorized Ministry Provider", descUr: "سعودی وزارت سے باضابطہ منظور شدہ" },
    { icon: "BadgePercent", title: "Best Price Guarantee", titleUr: "بہترین نرخ کی ضمانت", desc: "No Hidden Costs or Surprise Fees", descUr: "بغیر کسی اضافی چارجز کے" },
    { icon: "Headphones", title: "24/7 Karachi Support", titleUr: "24/7 کراچی سپورٹ", desc: "Local Assistance Before & During Trip", descUr: "دفتر نارتھ ناظم آباد سے مستقل رہنمائی" },
    { icon: "Award", title: "10+ Years Trust", titleUr: "10+ سال کا بااعتماد تجربہ", desc: "Over 5,000+ Happy Families Served", descUr: "5000 سے زائد مطمئن زائرین" }
  ]
};

export const UMRAH_PACKAGES: UmrahPackage[] = [
  {
    id: "economy-15d",
    title: "Economy Umrah Package",
    titleUr: "اکانومی 15 روزہ عمرہ پیکج",
    type: "economy",
    durationDays: 15,
    pricePKR: 218000,
    popular: true,
    featuredImage: "https://images.unsplash.com/photo-1677835214504-9648944c3e50?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dW1yb2h8ZW58MHx8MHx8fDA%3D",
    makkahHotel: {
      name: "Emaar Grand Makkah (or similar)",
      stars: 3,
      distance: "600m from Haram (Shuttle Available)",
      distanceUr: "حرم شریف سے 600 میٹر (شٹل سروس میسر)"
    },
    madinahHotel: {
      name: "Al Majeedi ARAC Madinah (or similar)",
      stars: 3,
      distance: "400m from Masjid An-Nabawi",
      distanceUr: "مسجدِ نبوی سے 400 میٹر"
    },
    inclusions: [
      "Saudi Arabia Umrah Visa Processing",
      "Direct / 1-Stop Return Flight Ticket from Karachi",
      "7 Nights Accommodation in Makkah",
      "7 Nights Accommodation in Madinah",
      "Complete AC Bus Transportation (Airport & Inter-City)",
      "Guided Holy Ziaraat in Makkah & Madinah",
      "24/7 Ground Assistance by Ramad-e-Taiba Guide"
    ],
    inclusionsUr: [
      "سعودی الیکٹرانک عمرہ ویزہ پروسیسنگ",
      "کراچی سے مکہ و مدینہ واپسی کی ہوائی ٹکٹ",
      "مکہ مکرمہ میں 7 راتیں قیام",
      "مدینہ منورہ میں 7 راتیں قیام",
      "مکمل اے سی بس ٹرانسپورٹ (ایئرپورٹ اور زیارات)",
      "مکہ و مدینہ کے مقدس مقامات کی مکمل زیارات",
      "رمادِ طیبہ کی جانب سے 24/7 رہنمائی"
    ],
    highlights: [
      "Most Affordable Complete Package",
      "Proximity to Holy Sites",
      "Ideal for Small Families & First Timers",
      "Free Zamzam Water 5L"
    ],
    highlightsUr: [
      "مناسب ترین مکمل پیکج",
      "مقدس مقامات سے قریب ترین قیام",
      "خاندانوں اور پہلی بار جانے والوں کے لیے بہترین",
      "5 لیٹر زمزم کا تحفہ"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Jeddah & Transfer to Makkah", titleUr: "جدہ آمد اور مکہ مکرمہ منتقلی", description: "Receive assistance at King Abdulaziz International Airport, transfer via AC coach to Makkah hotel, perform Umrah with guided group leader.", descriptionUr: "کنگ عبدالعزیز ایئرپورٹ پر استقبلیہ، اے سی کوچ کے ذریعے مکہ ہوٹل منتقلی اور عمرہ ادا کرنا۔" },
      { day: "Day 2-7", title: "Ibadat in Makkah Mukarramah & Ziaraat", titleUr: "مکہ مکرمہ میں عبادات اور مقدس زیارات", description: "Daily prayers at Masjid Al-Haram. Day 4 includes guided Ziaraat to Jabal Al-Nour, Jabal Thawr, Mina, Arafat, and Muzdalifah.", descriptionUr: "مسجد الحرام میں باقاعدہ باجماعت نمازیں اور جبل النور، منیٰ و عرفات کی باقاعدہ زیارات۔" },
      { day: "Day 8", title: "Departure to Madinah Al-Munawwarah", titleUr: "مدینہ منورہ کی جانب سفر", description: "Check out from Makkah, luxury bus transfer to Madinah Al-Munawwarah, check-in near Masjid An-Nabawi.", descriptionUr: "مکہ ہوٹل سے چیک آؤٹ، لگژری بس کے ذریعے مدینہ منورہ منتقلی اور ہوٹل میں چیک ان۔" },
      { day: "Day 9-14", title: "Ibadat in Madinah & Ziaraat", titleUr: "مدینہ منورہ میں عبادات اور دربارِ رسالت میں حاضری", description: "Salat and Salam at Roza-e-Rasool (PBUH). Guided Ziaraat to Masjid Quba, Masjid Al-Qiblatayn, and Jabal Uhud.", descriptionUr: "روضہ رسول ﷺ پر سلامی، مسجد قباء، مسجد قبلتین اور جبل احد کی زیارات۔" },
      { day: "Day 15", title: "Return Journey to Karachi", titleUr: "کراچی واپسی", description: "Transfer to Prince Mohammad bin Abdulaziz Airport (Madinah) or Jeddah for your return flight to Karachi.", descriptionUr: "ایئرپورٹ منتقلی اور کراچی کے لیے پرواز۔" }
    ]
  },
  {
    id: "executive-5star-14d",
    title: "Executive 5-Star Luxury Umrah",
    titleUr: "ایگزیکٹو 5-سٹار کلاک ٹاور عمرہ پیکج",
    type: "vip",
    durationDays: 14,
    pricePKR: 385000,
    popular: true,
    featuredImage: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80&w=1000",
    makkahHotel: {
      name: "Swissôtel Makkah / Pullman Zamzam Clock Tower",
      stars: 5,
      distance: "Zero Distance (Direct Courtyard Access)",
      distanceUr: "زیرو ڈسٹنس (حرم صحن سے برائے راست دخول)"
    },
    madinahHotel: {
      name: "Dar Al Taqwa / Pullman Zamzam Madinah",
      stars: 5,
      distance: "Front Row - 100m from Women & Men Entrances",
      distanceUr: "پہلی صف - مسجد نبوی کے صحن سے صرف 100 میٹر"
    },
    inclusions: [
      "VIP Umrah Visa & Express E-Visa Clearance",
      "Direct Saudi Arabian Airlines / Emirates Flights from Karachi",
      "7 Nights 5-Star Luxury Hotel in Makkah Clock Tower",
      "6 Nights 5-Star Luxury Hotel in Madinah Central Markaziah",
      "Daily Open-Buffet International Breakfast",
      "Private Private GMC / SUV Inter-City Transfers",
      "Personal VIP Mutawwif (Religious Guide)",
      "Complimentary Ziaraat in Private GMC"
    ],
    inclusionsUr: [
      "وی آئی پی فاسٹ ٹریک عمرہ ای-ویزہ",
      "کراچی سے برائے راست سعودیہ یا ایمریٹس فلائٹس",
      "مکہ کلاک ٹاور 5-سٹار ہوٹل میں 7 راتیں قیام",
      "مدینہ منورہ کے مرکزی علاقے میں 5-سٹار 6 راتیں",
      "روزانہ اوپن بفے انٹرنیشنل ناشتہ",
      "پرائیویٹ GMC گاڑی کے ذریعے ٹرانسپورٹ",
      "خصوصی دینی معلم کی رہنمائی",
      "پرائیویٹ گاڑی پر مکمل زیارات"
    ],
    highlights: [
      "Clock Tower Courtyard Access",
      "Private GMC Transfers",
      "Open Buffet Breakfast Included",
      "VIP Customer Concierge"
    ],
    highlightsUr: [
      "کلاک ٹاور سے حرم صحن تک فوری رسائی",
      "پرائیویٹ GMC لگژری گاڑی",
      "روزانہ اوپن بفے ناشتہ شامل",
      "وی آئی پی 24 گھنٹے پرسنل رہنمائی"
    ],
    itinerary: [
      { day: "Day 1", title: "VIP Meet & Assist at Jeddah Airport", titleUr: "جدہ ایئرپورٹ پر وی آئی پی استقبال", description: "Direct private GMC transfer to Makkah Swissôtel. Perform Umrah with private dedicated scholar.", descriptionUr: "ایئرپورٹ پر پرائیویٹ GMC ڈرائیور، سوئس ہوٹل منتقلی اور معلم کے ساتھ عمرہ۔" },
      { day: "Day 2-7", title: "Luxurious Stay in Makkah", titleUr: "مکہ مکرمہ میں 5-سٹار قیام", description: "Enjoy Kaaba-view room experience and daily buffet breakfast. Private Ziaraat tour.", descriptionUr: "کعبہ ویو روم، بفے ناشتہ اور پرائیویٹ گاڑی پر تمام مقدس زیارات۔" },
      { day: "Day 8", title: "Haramain High-Speed Bullet Train Transfer", titleUr: "حرمین ایکسپریس بلٹ ٹرین سفر", description: "Travel in First Class Haramain Bullet Train to Madinah in just 2 hours 20 minutes.", descriptionUr: "فرسٹ کلاس بلٹ ٹرین کے ذریعے صرف 2 گھنٹے 20 منٹ میں مدینہ منورہ پہنچنا۔" },
      { day: "Day 9-13", title: "Five-Star Experience in Madinah", titleUr: "مدینہ منورہ میں 5-سٹار قیام", description: "Prime courtyard view near Bab Al-Salam. Private Ziaraat including Date Garden & Uhud battleground.", descriptionUr: "باب السلام سے متصل ہوٹل قیام، کھجور کے باغات اور جبل احد کی زیارات۔" },
      { day: "Day 14", title: "Direct Flight Home to Karachi", titleUr: "کراچی کے لیے برائے راست فلائٹ", description: "Chauffeur transfer to Madinah Airport for flight back to Karachi.", descriptionUr: "لگژری گاڑی سے مدینہ ایئرپورٹ منتقلی اور کراچی واپسی۔" }
    ]
  },
  {
    id: "star4-family-15d",
    title: "4-Star Family Choice Umrah",
    titleUr: "4-سٹار فیملی عمرہ پیکج",
    type: "executive",
    durationDays: 15,
    pricePKR: 285000,
    featuredImage: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1000",
    makkahHotel: {
      name: "Anjum Makkah / Al Shohada Hotel",
      stars: 4,
      distance: "250m from Haram",
      distanceUr: "حرم شریف سے صرف 250 میٹر"
    },
    madinahHotel: {
      name: "Mövenpick Hotel Madinah / Saja Al Madinah",
      stars: 4,
      distance: "200m from Masjid An-Nabawi",
      distanceUr: "مسجدِ نبوی سے 200 میٹر"
    },
    inclusions: [
      "Umrah Tourist Visa Processing",
      "Return Air Tickets (PIA / Flydubai / Saudia)",
      "7 Nights 4-Star Makkah Accommodation",
      "7 Nights 4-Star Madinah Accommodation",
      "Coaster Bus Group Transport",
      "Makkah & Madinah Ziaraat Package"
    ],
    inclusionsUr: [
      "عمرہ ویزہ پروسیسنگ",
      "واپسی کی فلائٹ ٹکٹ",
      "مکہ مکرمہ 4-سٹار ہوٹل 7 راتیں",
      "مدینہ منورہ 4-سٹار ہوٹل 7 راتیں",
      "کوستر اے سی بس ٹرانسپورٹ",
      "مکمل مکہ و مدینہ زیارات"
    ],
    highlights: [
      "Best Value 4-Star Comfort",
      "Short Walking Distance to Haram",
      "Family Friendly Quad/Triple Rooms Available"
    ],
    highlightsUr: [
      "بہترین 4-سٹار معیار اور قیمت",
      "حرم سے پیدل کا مختصر فاصلہ",
      "خاندانی افراد کے لیے بہترین کمرے"
    ],
    itinerary: [
      { day: "Day 1-7", title: "Makkah Stay", titleUr: "مکہ مکرمہ قیام", description: "Seamless arrival, comfortable 4-star lodging, Umrah completion, full Makkah Ziaraat.", descriptionUr: "باآسانی ہوٹل آمد، عمرہ کی ادائیگی اور زیارات۔" },
      { day: "Day 8-14", title: "Madinah Stay", titleUr: "مدینہ منورہ قیام", description: "Relaxing stay close to Masjid An-Nabawi, peaceful prayers at Rawdah Shareef.", descriptionUr: "مسجد نبوی کے قریب پرسکون قیام اور ریاض الجنتہ میں نماز۔" },
      { day: "Day 15", title: "Return to Karachi", titleUr: "کراچی واپسی", description: "Final transfer to airport and arrival back in Karachi.", descriptionUr: "ایئرپورٹ منتقلی اور کراچی واپسی۔" }
    ]
  },
  {
    id: "ramadan-special-20d",
    title: "Special Ramadan Umrah Package",
    titleUr: "رمضان المبارک خصوصی عمرہ پیکج",
    type: "ramadan",
    durationDays: 20,
    pricePKR: 420000,
    featuredImage: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=1000",
    makkahHotel: {
      name: "Le Méridien Towers / Emaar Elite Makkah",
      stars: 4,
      distance: "24/7 Shuttle to Haram (5 min ride)",
      distanceUr: "24 گھنٹے شٹل سروس (صرف 5 منٹ کا فاصلہ)"
    },
    madinahHotel: {
      name: "Rua Al Hijrah / Leader Al Maktara",
      stars: 4,
      distance: "250m from Masjid An-Nabawi",
      distanceUr: "مسجدِ نبوی سے 250 میٹر"
    },
    inclusions: [
      "Ramadan Special Umrah Visa",
      "Direct Flight Tickets KHI - JED / MED - KHI",
      "10 Days Makkah (First/Middle Ten Days)",
      "10 Days Madinah Munawwarah",
      "Suhoor & Iftar Arrangement Assistance",
      "AC Bus Transfers & Ziaraat"
    ],
    inclusionsUr: [
      "رمضان المبارک ویزہ پروسیسنگ",
      "کراچی سے برائے راست پروازیں",
      "مکہ مکرمہ میں 10 دن قیام",
      "مدینہ منورہ میں 10 دن قیام",
      "سحری و افطاری کے انتظامات میں معاونت",
      "لگژری اے سی ٹرانسپورٹ اور زیارات"
    ],
    highlights: [
      "Experience Spiritual Atmosphere of Holy Ramadan",
      "Taraweeh & Tahajjud at Holy Mosques",
      "Dedicated Group Support for Seniors"
    ],
    highlightsUr: [
      "رمضان المبارک کے روحانی لمحات کا تجربہ",
      "تراویح اور تہجد کی باجماعت ادائیگی",
      "بزرگوں کے لیے خصوصی معاونت"
    ],
    itinerary: [
      { day: "Day 1-10", title: "Ramadan Spiritual Days in Makkah", titleUr: "مکہ مکرمہ میں رمضان کے بابرکت ایام", description: "Pray Taraweeh at Kaaba, attend Khatm-ul-Quran.", descriptionUr: "مسجد الحرام میں تراویح اور ختمِ قرآن مجید کی سعادت۔" },
      { day: "Day 11-20", title: "Blessed Ramadan in Madinah", titleUr: "مدینہ منورہ میں مبارک راتیں", description: "Spend sacred Ramadan evenings in Prophet's Mosque.", descriptionUr: "مسجدِ نبوی ﷺ کے صحنوں میں پرانوار افطار اور عبادات۔" }
    ]
  }
];


export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "turkey-grand-8d",
    title: "Grand Turkey Express & Cappadocia",
    titleUr: "گرینڈ ترکی و کیپاڈوشیا 8 روزہ ٹور",
    destination: "Istanbul & Cappadocia",
    destinationUr: "استنبول اور کیپاڈوشیا",
    country: "Turkey",
    duration: "8 Days / 7 Nights",
    durationUr: "8 دن / 7 راتیں",
    pricePKR: 345000,
    badge: "Best Seller",
    badgeUr: "سب سے زیادہ مقبول",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1000",
    highlights: [
      "Bosphorus Luxury Cruise with Turkish Dinner Show",
      "Hot Air Balloon Tour in Cappadocia",
      "Hagia Sophia & Blue Mosque Guided Tour",
      "Topkapi Palace & Grand Bazaar Shopping",
      "Internal Flight Istanbul-Cappadocia Included"
    ],
    highlightsUr: [
      "باسفورس کروز اور ترکش ڈنر شو",
      "کیپاڈوشیا میں ہاٹ ایئر بیلون کی پرواز",
      "آیا صوفیہ اور نیلی مسجد کی زیارت",
      "ٹوپکاپی محل اور گرینڈ بازار شاپنگ",
      "استنبول تا کیپاڈوشیا اندرونی فلائٹ شامل"
    ],
    inclusions: [
      "Return Air Ticket from Karachi",
      "Turkey Sticker/E-Visa Processing Assistance",
      "4-Star Luxury Hotel Stays with Breakfast",
      "Domestic Flights inside Turkey",
      "Airport Pickups & Sightseeing in AC Coaches",
      "English & Urdu Speaking Local Guide"
    ],
    inclusionsUr: [
      "کراچی سے واپسی کی پرواز ٹکٹ",
      "ترکی ویزہ معاونت",
      "4-سٹار ہوٹل میں ناشتہ کیساتھ قیام",
      "ترکی کی اندرونی پروازیں",
      "ایئرپورٹ اور تفریحی مقامات کی بس سروس",
      "اردو اور انگریزی بولنے والا گائیڈ"
    ],
    hotels: "Ramada Plaza Istanbul & Goreme Cave Hotel Cappadocia",
    hotelsUr: "رامادہ پلازہ استنبول اور گوریمے کیو ہوٹل کیپاڈوشیا",
    flightsIncluded: true,
    visaAssistance: true,
    itinerary: [
      { day: "Day 1", title: "Arrival in Istanbul", titleUr: "استنبول آمد", description: "Welcome at Istanbul Airport (IST). Transfer to hotel. Evening walk around Taksim Square & Istiklal Street.", descriptionUr: "استنبول ایئرپورٹ پر استقبال، ہوٹل منتقلی اور شام کے وقت تقسیم سکوائر کی سیر۔" },
      { day: "Day 2", title: "Historical City Tour", titleUr: "تاریخی شہر کا ٹور", description: "Visit Hagia Sophia, Sultanahmet Blue Mosque, Hippodrome, and Grand Bazaar.", descriptionUr: "آیا صوفیہ، سلطان احمد مسجد اور گرینڈ بازار کا دورہ۔" },
      { day: "Day 3", title: "Bosphorus Cruise & Dinner Show", titleUr: "باسفورس کروز ڈنر", description: "Scenic Bosphorus strait boat tour witnessing Asian & European shorelines with cultural folk dance show.", descriptionUr: "ایشیاء اور یورپ کو ملانے والے باسفورس سمندر کی سیر۔" },
      { day: "Day 4", title: "Flight to Cappadocia", titleUr: "کیپاڈوشیا کی جانب پرواز", description: "Fly to Nevsehir/Kayseri. Check-in to authentic Cappadocia Cave Hotel. Sunset over Fairy Chimneys.", descriptionUr: "پرواز کے ذریعے کیپاڈوشیا آمد اور غار ہوٹل میں قیام۔" },
      { day: "Day 5", title: "Cappadocia Hot Air Balloon & Goreme", titleUr: "ہاٹ ایئر بیلون پرواز", description: "Early morning iconic Hot Air Balloon flight. Tour Goreme Open Air Museum and Underground City.", descriptionUr: "صبح سویرے بیلون کی سحر انگیز پرواز۔" },
      { day: "Day 6-7", title: "Return to Istanbul & Leisure Shopping", titleUr: "استنبول واپسی اور شاپنگ", description: "Fly back to Istanbul. Free day for shopping at Cevahir Mall & Spice Bazaar.", descriptionUr: "استنبول واپسی اور خریداری کا موقع۔" },
      { day: "Day 8", title: "Departure to Karachi", titleUr: "کراچی واپسی", description: "Transfer to Istanbul Airport for return flight to Karachi.", descriptionUr: "ایئرپورٹ منتقلی اور کراچی واپسی۔" }
    ]
  },
  {
    id: "dubai-safari-6d",
    title: "Dubai Glamour & Desert Adventure",
    titleUr: "دبئی اور ابوظہبی 6 روزہ فیملی ٹور",
    destination: "Dubai & Abu Dhabi",
    destinationUr: "دبئی اور ابوظہبی",
    country: "United Arab Emirates",
    duration: "6 Days / 5 Nights",
    durationUr: "6 دن / 5 راتیں",
    pricePKR: 175000,
    badge: "Family Favorite",
    badgeUr: "خاندانوں کا پسندیدہ",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000",
    highlights: [
      "Burj Khalifa 124th Floor Observatory Ticket",
      "Desert Safari with 4x4 Dune Bashing & BBQ Dinner",
      "Marina Dhow Dinner Cruise",
      "Abu Dhabi City Tour & Sheikh Zayed Grand Mosque",
      "Dubai Mall Fountain Show & Museum of the Future"
    ],
    highlightsUr: [
      "برج خلیفہ 124ویں منزل کا ٹکٹ",
      "4x4 ڈیلکس صحرائی سفاری اور بی بی کیو ڈنر",
      "دبئی مرینا ڈاؤ کروز ڈنر",
      "ابوظہبی ٹور اور شیخ زاید مسجد",
      "دبئی مال فاؤنٹین شو اور فیوچر میوزیم"
    ],
    inclusions: [
      "Return Air Ticket Karachi - Dubai",
      "UAE 30-Day Tourist Visa Approval",
      "4-Star Hotel in Bur Dubai / Deira with Daily Breakfast",
      "Airport Pick & Drop in AC Vehicles",
      "Entry Tickets to Mentioned Attractions"
    ],
    inclusionsUr: [
      "کراچی تا دبئی واپسی فلائٹ ٹکٹ",
      "یو اے ای 30 روزہ ویزہ منظوری",
      "4-سٹار ہوٹل ناشتے کے ساتھ",
      "ایئرپورٹ پک اینڈ ڈراپ",
      "تمام مقامات کے اینٹری ٹکٹس"
    ],
    hotels: "Citymax Hotel Bur Dubai / Grand Excelsior",
    hotelsUr: "سٹی میکس ہوٹل بر دبئی یا گرینڈ ایکسیلسیئر",
    flightsIncluded: true,
    visaAssistance: true,
    itinerary: [
      { day: "Day 1", title: "Arrival in Dubai", titleUr: "دبئی آمد", description: "Meet at Dubai International Airport (DXB). Check-in and relax.", descriptionUr: "دبئی ایئرپورٹ پر استقبال اور ہوٹل منتقلی۔" },
      { day: "Day 2", title: "Half-Day City Tour & Burj Khalifa", titleUr: "سٹی ٹور اور برج خلیفہ", description: "Explore Dubai Frame, Jumeirah Beach, Burj Al Arab photo stop, Burj Khalifa 124th floor.", descriptionUr: "دبئی فریم، جمیرہ بیچ اور برج خلیفہ ٹاپ کا دورہ۔" },
      { day: "Day 3", title: "4x4 Desert Safari", titleUr: "صحرا کی سفاری", description: "Thrilling dune bashing, camel rides, quad biking, henna painting, live Tanoura dance, BBQ buffet dinner.", descriptionUr: "جیپ سفاری، اونٹ کی سواری اور بار بی کیو بفے۔" },
      { day: "Day 4", title: "Abu Dhabi Day Tour", titleUr: "ابوظہبی ٹور", description: "Visit breathtaking Sheikh Zayed Mosque, Corniche, Heritage Village, and Ferrari World photo stop.", descriptionUr: "خوبصورت شیخ زاید مسجد اور فراری ورلڈ۔" },
      { day: "Day 5", title: "Dubai Marina Dhow Cruise", titleUr: "مرینا ڈاؤ کروز", description: "Leisure morning shopping at Meena Bazaar. Evening luxury Dhow Dinner Cruise along Dubai Marina.", descriptionUr: "شام کے وقت لگژری کشتی میں رات کا کھانا۔" },
      { day: "Day 6", title: "Departure to Karachi", titleUr: "کراچی واپسی", description: "Check out and airport drop for flight back to Karachi.", descriptionUr: "ایئرپورٹ منتقلی اور پرواز۔" }
    ]
  },
  {
    id: "malaysia-thailand-10d",
    title: "Malaysia & Thailand Multi-Country Escape",
    titleUr: "ملائیشیا اور تھائی لینڈ 10 روزہ ٹور",
    destination: "Kuala Lumpur, Genting & Bangkok",
    destinationUr: "کوالالمپور، گینٹنگ اور بنکاک",
    country: "Malaysia & Thailand",
    duration: "10 Days / 9 Nights",
    durationUr: "10 دن / 9 راتیں",
    pricePKR: 265000,
    badge: "Popular Combo",
    badgeUr: "مقبول ترین کمبو",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=1000",
    highlights: [
      "Petronas Twin Towers & Batu Caves Kuala Lumpur",
      "Genting Highlands Cable Car Ride & Indoor Theme Park",
      "Bangkok Chao Phraya River Cruise Dinner",
      "Safari World & Marine Park Bangkok",
      "Pattaya Coral Island Speedboat Tour with Lunch"
    ],
    highlightsUr: [
      "پیٹروناس ٹوئن ٹاورز اور باٹو غار",
      "گینٹنگ ہائی لینڈز کیبل کار کی سواری",
      "بنکاک ریور کروز ڈنر",
      "سفاری ورلڈ اور مرین پارک",
      "پٹایا کورل آئی لینڈ اسپیڈ بوٹ ٹور"
    ],
    inclusions: [
      "International Flights (KHI-KUL-BKK-KHI)",
      "Malaysia E-Visa & Thailand Visa Assistance",
      "4-Star Hotel Accommodation with Breakfast",
      "Genting Cable Car Tickets",
      "Inter-city Transfers and Sightseeing Tours"
    ],
    inclusionsUr: [
      "تمام بین الاقوامی ہوائی ٹکٹس",
      "ملائیشیا اور تھائی لینڈ ویزہ معاونت",
      "4-سٹار ہوٹل قیام اور ناشتہ",
      "کیبل کار ٹکٹس",
      "تمام تفریحی سائٹس کے دورے"
    ],
    hotels: "Furama Bukit Bintang KL & Asia Hotel Bangkok",
    hotelsUr: "فوراما بوکت بنتانگ کوالالمپور اور ایشیا ہوٹل بنکاک",
    flightsIncluded: true,
    visaAssistance: true,
    itinerary: [
      { day: "Day 1-4", title: "Kuala Lumpur & Genting Highlands", titleUr: "کوالالمپور اور گینٹنگ ہائی لینڈز", description: "Discover KL landmarks, Batu Caves, Genting Cable Car, Putrajaya lake cruise.", descriptionUr: "ٹوئن ٹاورز، کیبل کار اور پوتراجایا جھیل کی سیر۔" },
      { day: "Day 5-9", title: "Bangkok & Pattaya Paradise", titleUr: "بنکاک اور پٹایا بیچ", description: "Fly to Bangkok, visit Grand Palace, Coral Island Pattaya, Safari World.", descriptionUr: "پرواز کے ذریعے بنکاک آمد، جزیرہ کورل کی سیر۔" },
      { day: "Day 10", title: "Return to Karachi", titleUr: "کراچی واپسی", description: "Fly back home with unforgettable memories.", descriptionUr: "کراچی کے لیے پرواز۔" }
    ]
  },
  {
    id: "baku-azerbaijan-6d",
    title: "Baku Land of Fire & Shahdag Snow Mountain",
    titleUr: "باؤک اور شاہداغ آذربائیجان 6 روزہ ٹور",
    destination: "Baku & Shahdag",
    destinationUr: "باؤک اور شاہداغ",
    country: "Azerbaijan",
    duration: "6 Days / 5 Nights",
    durationUr: "6 دن / 5 راتیں",
    pricePKR: 185000,
    badge: "Trending",
    badgeUr: "ٹرینڈنگ منزل",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&q=80&w=1000",
    highlights: [
      "Baku Old City (Icherisheher) & Maiden Tower",
      "Flame Towers & Highland Park Panoramic View",
      "Ateshgah Fire Temple & Yanardag Burning Mountain",
      "Shahdag Mountain Resort Cable Car Ride",
      "Nizami Street Shopping & Boulevard Walk"
    ],
    highlightsUr: [
      "باکو پرانا شہر اور میڈن ٹاور",
      "فلیم ٹاورز اور ہائی لینڈ پارک",
      "آتشگاہ آتش و ینارداغ جلتا پہاڑ",
      "شاہداغ سنو ریسارٹ کیبل کار",
      "نظامی سٹریٹ شاپنگ"
    ],
    inclusions: [
      "Return Flights from Karachi (Air Arabia / Flydubai)",
      "Azerbaijan E-Visa Guaranteed (3-day processing)",
      "4-Star Central Baku Hotel with Breakfast",
      "Private Vehicle Tours with English/Urdu Driver",
      "Entrance Tickets to Fire Temple & Yanardag"
    ],
    inclusionsUr: [
      "کراچی سے پروازیں",
      "آذربائیجان 3 روزہ ای-ویزہ",
      "4-سٹار باکو ہوٹل اور ناشتہ",
      "پرائیویٹ گاڑی پر سیر و تفریح",
      "اینٹری ٹکٹس شامل"
    ],
    hotels: "Winter Park Hotel Baku / Bristol Hotel",
    hotelsUr: "وینٹر پارک ہوٹل باکو یا برسٹل ہوٹل",
    flightsIncluded: true,
    visaAssistance: true,
    itinerary: [
      { day: "Day 1", title: "Arrival in Baku", titleUr: "باکو آمد", description: "Airport pickup, transfer to Baku center, evening tour of Nizami Street.", descriptionUr: "ایئرپورٹ پر استقبال اور نظامی سٹریٹ کی سیر۔" },
      { day: "Day 2", title: "Baku City & Flame Towers Tour", titleUr: "باکو سٹی ٹور", description: "Guided tour of Old City, Maiden Tower, Heydar Aliyev Center, Boulevard, Flame Towers.", descriptionUr: "پرانے شہر اور حیدر علیوف سینٹر کا دورہ۔" },
      { day: "Day 3", title: "Fire Mountain & Mud Volcanoes", titleUr: "ینارداغ اور آتشگاہ", description: "Ateshgah Zoroastrian Fire Temple and Yanardag natural burning flame mountain.", descriptionUr: "قدرتی جلتی ہوئی پہاڑی کی زیارت۔" },
      { day: "Day 4", title: "Day Excursion to Shahdag Snow Resort", titleUr: "شاہداغ سنو ریسارٹ", description: "Breathtaking mountain scenery, cable car ride, snow activities.", descriptionUr: "برفانی پہاڑوں کی سحر انگیز سیر۔" },
      { day: "Day 5-6", title: "Shopping & Return Flight", titleUr: "شاپنگ اور واپسی", description: "Genclik Mall shopping and return flight to Karachi.", descriptionUr: "شاپنگ مالز کی سیر اور کراچی واپسی۔" }
    ]
  },
  {
    id: "skardu-hunza-7d",
    title: "Skardu & Hunza Valley Alpine Paradise",
    titleUr: "اسکردو اور وادیِ ہنزہ 7 روزہ ڈومیسٹک ٹور",
    destination: "Skardu, Shangrila & Hunza",
    destinationUr: "اسکردو، شنگریلا اور ہنزہ",
    country: "Northern Pakistan",
    duration: "7 Days / 6 Nights",
    durationUr: "7 دن / 6 راتیں",
    pricePKR: 95000,
    badge: "Domestic Luxury",
    badgeUr: "پاکستانی سیاحت",
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=1000",
    highlights: [
      "Direct PIA Flight from Karachi to Skardu Airport",
      "Shangrila Resort Lake & Upper Kachura Lake",
      "Katpana Cold Desert Sunset Sand Dunes",
      "Attabad Lake Turquoise Boating & Hussaini Suspension Bridge",
      "Baltit Fort & Karimabad Hunza Market"
    ],
    highlightsUr: [
      "کراچی تا اسکردو پی آئی اے برائے راست فلائٹ",
      "شنگریلا جھیل اور اپر کچورا جھیل",
      "کتپانہ کولڈ ڈیزرٹ کے ریت کے ٹیلے",
      "عطا۔آباد جھیل میں بوٹنگ اور حسینی پل",
      "بلتت قلعہ اور کریم آباد بازار ہنزہ"
    ],
    inclusions: [
      "Karachi to Skardu Return Air Tickets (or Islamabad Option)",
      "Prado 4x4 Jeep / Luxury Grand Cabin Transfers",
      "Deluxe Resort Stays with Breakfast & Dinner",
      "Tour Guide & Bonfire Nights"
    ],
    inclusionsUr: [
      "کراچی تا اسکردو ہوائی ٹکٹ",
      "4x4 پراڈو جیپ / گرینڈ کیبن",
      "ڈیلوکس ریسارٹ قیام، ناشتہ اور کھانا",
      "گائیڈ اور الؤ نائٹ"
    ],
    hotels: "Shangrila Resort Skardu & Mulberry Hotel Hunza",
    hotelsUr: "شنگریلا ریسارٹ اسکردو اور ملبری ہوٹل ہنزہ",
    flightsIncluded: true,
    visaAssistance: false,
    itinerary: [
      { day: "Day 1", title: "Flight KHI to Skardu", titleUr: "اسکردو آمد", description: "Scenic flight over Himalayas/Karakoram. Visit Lower Kachura Lake.", descriptionUr: "ہمالیہ کے پہاڑوں سے خوبصورت پرواز۔" },
      { day: "Day 2", title: "Deosai Plains & Shigar Fort", titleUr: "دیوسائی پلینز اور شگر قلعہ", description: "Visit Cold Desert, Shigar Fort, and Manthoka Waterfall.", descriptionUr: "کولڈ ڈیزرٹ اور آبشار کی سیر۔" },
      { day: "Day 3-5", title: "Travel to Hunza Valley", titleUr: "وادیِ ہنزہ سفر", description: "Attabad Lake, Passu Cones, Hussaini Bridge, Baltit & Altit Forts.", descriptionUr: "عطا آباد جھیل اور پاسو کونز۔" },
      { day: "Day 6-7", title: "Return to Skardu & Flight back to Karachi", titleUr: "کراچی واپسی", description: "Souvenir shopping and direct flight back home to Karachi.", descriptionUr: "سووینئر شاپنگ اور کراچی کے لیے پرواز۔" }
    ]
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: "makkah",
    name: "Makkah Mukarramah",
    nameUr: "مکہ مکرمہ",
    country: "Saudi Arabia",
    countryUr: "سعودی عرب",
    category: "holy",
    image: "https://images.unsplash.com/photo-1565552070098-0073a126829c?auto=format&fit=crop&q=80&w=800",
    flightTimeFromKarachi: "3.5 Hours (Direct to Jeddah)",
    flightTimeUr: "3.5 گھنٹے (برائے راست جدہ)",
    visaRequired: "Umrah / Tourist Visa Required",
    visaRequiredUr: "عمرہ / ٹورسٹ ویزہ لازمی",
    bestSeason: "Year-Round (Winter/Ramadan Preferred)",
    bestSeasonUr: "سال کے تمام مہینے (سردیاں و رمضان)",
    highlights: ["Masjid Al-Haram", "The Holy Kaaba", "Jabal Al-Nour", "Mina & Arafat"],
    highlightsUr: ["مسجد الحرام", "خانہ کعبہ", "جبل النور (غارِ حرا)", "منیٰ و عرفات"],
    startingPricePKR: 218000
  },
  {
    id: "madinah",
    name: "Madinah Al-Munawwarah",
    nameUr: "مدینہ منورہ",
    country: "Saudi Arabia",
    countryUr: "سعودی عرب",
    category: "holy",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80&w=800",
    flightTimeFromKarachi: "4 Hours (Direct Flight)",
    flightTimeUr: "4 گھنٹے (برائے راست فلائٹ)",
    visaRequired: "Umrah Visa Required",
    visaRequiredUr: "عمرہ ویزہ لازمی",
    bestSeason: "Year-Round",
    bestSeasonUr: "سال کے تمام مہینے",
    highlights: ["Masjid An-Nabawi", "Roza-e-Rasool (PBUH)", "Masjid Quba", "Jabal Uhud"],
    highlightsUr: ["مسجدِ نبوی ﷺ", "روضہ رسول ﷺ", "مسجدِ قباء", "جبلِ احد"],
    startingPricePKR: 218000
  },
  {
    id: "dubai",
    name: "Dubai",
    nameUr: "دبئی",
    country: "UAE",
    countryUr: "متحدہ عرب امارات",
    category: "international",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    flightTimeFromKarachi: "2 Hours 10 Mins (Direct)",
    flightTimeUr: "2 گھنٹے 10 منٹ (برائے راست)",
    visaRequired: "UAE E-Visa (24-48 Hrs)",
    visaRequiredUr: "ای-ویزہ (24 تا 48 گھنٹے)",
    bestSeason: "October to April",
    bestSeasonUr: "اکتوبر تا اپریل",
    highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall", "Marina Cruise"],
    highlightsUr: ["برج خلیفہ", "صحرا کی سفاری", "دبئی مال", "مرینا کروز"],
    startingPricePKR: 175000
  },
  {
    id: "istanbul",
    name: "Istanbul & Turkey",
    nameUr: "استنبول اور ترکی",
    country: "Turkey",
    countryUr: "ترکی",
    category: "international",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800",
    flightTimeFromKarachi: "6 Hours (Direct/1-Stop)",
    flightTimeUr: "6 گھنٹے (برائے راست / ون سٹاپ)",
    visaRequired: "Sticker / E-Visa",
    visaRequiredUr: "سٹیکر یا ای-ویزہ",
    bestSeason: "March to November",
    bestSeasonUr: "مارچ تا نومبر",
    highlights: ["Hagia Sophia", "Bosphorus Cruise", "Cappadocia Balloons", "Grand Bazaar"],
    highlightsUr: ["آیا صوفیہ", "باسفورس کروز", "کیپاڈوشیا بیلونز", "گرینڈ بازار"],
    startingPricePKR: 345000
  },
  {
    id: "kuala-lumpur",
    name: "Kuala Lumpur",
    nameUr: "کوالالمپور",
    country: "Malaysia",
    countryUr: "ملائیشیا",
    category: "international",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800",
    flightTimeFromKarachi: "5.5 Hours",
    flightTimeUr: "5.5 گھنٹے",
    visaRequired: "Malaysia E-Visa",
    visaRequiredUr: "ملائیشیا ای-ویزہ",
    bestSeason: "Year-Round",
    bestSeasonUr: "سال کے تمام ایام",
    highlights: ["Petronas Twin Towers", "Batu Caves", "Genting Highlands", "Langkawi"],
    highlightsUr: ["پیٹروناس ٹوئن ٹاورز", "باٹو کیوز", "گینٹنگ ہائی لینڈز", "لنگکاوی"],
    startingPricePKR: 265000
  },
  {
    id: "baku",
    name: "Baku",
    nameUr: "باکو",
    country: "Azerbaijan",
    countryUr: "آذربائیجان",
    category: "international",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&q=80&w=800",
    flightTimeFromKarachi: "3.5 Hours",
    flightTimeUr: "3.5 گھنٹے",
    visaRequired: "E-Visa (3 Days)",
    visaRequiredUr: "ای-ویزہ (3 دن)",
    bestSeason: "April to June & Sept to Nov",
    bestSeasonUr: "اپریل تا جون اور ستمبر تا نومبر",
    highlights: ["Flame Towers", "Old City", "Shahdag Mountain", "Fire Temple"],
    highlightsUr: ["فلیم ٹاورز", "پرانا باکو", "شاہداغ سنو ریسارٹ", "آتشگاہ"],
    startingPricePKR: 185000
  },
  {
    id: "skardu",
    name: "Skardu & Hunza",
    nameUr: "اسکردو اور ہنزہ",
    country: "Pakistan",
    countryUr: "پاکستان",
    category: "domestic",
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=800",
    flightTimeFromKarachi: "2 Hours (Direct Flight KHI-KDU)",
    flightTimeUr: "2 گھنٹے (برائے راست فلائٹ)",
    visaRequired: "No Visa Required (CNIC)",
    visaRequiredUr: "شناختی کارڈ کافی ہے",
    bestSeason: "May to October",
    bestSeasonUr: "مئی تا اکتوبر",
    highlights: ["Shangrila Lake", "Attabad Lake", "Passu Cones", "Deosai Plains"],
    highlightsUr: ["شنگریلا جھیل", "عطا آباد جھیل", "پاسو کونز", "دیوسائی پلینز"],
    startingPricePKR: 95000
  },
  {
    id: "swat-kalam",
    name: "Swat & Kalam Valley",
    nameUr: "سوات اور وادیِ کلام",
    country: "Pakistan",
    countryUr: "پاکستان",
    category: "domestic",
    image: "https://images.unsplash.com/photo-1586351012965-861624544334?auto=format&fit=crop&q=80&w=800",
    flightTimeFromKarachi: "Flight to ISB + By Road",
    flightTimeUr: "پرواز تا اسلام آباد + بائی روڈ",
    visaRequired: "No Visa Required",
    visaRequiredUr: "کسی ویزہ کی ضرورت نہیں",
    bestSeason: "Year-Round",
    bestSeasonUr: "سال کے تمام ایام",
    highlights: ["Mahodand Lake", "Malam Jabba Ski Resort", "Ushu Forest", "Fizagat"],
    highlightsUr: ["مہوڈنڈ جھیل", "ملم جبہ سنو ریسارٹ", "اشو جنگل", "فیضا گٹ"],
    startingPricePKR: 65000
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "air-tickets",
    iconName: "Plane",
    title: "Air Ticket Booking",
    titleUr: "ہوائی ٹکٹ کی بکنگ",
    shortDesc: "Instant worldwide flight reservations for domestic and international airlines with exclusive discounted fares from Karachi.",
    shortDescUr: "کراچی سے تمام ملکی اور بین الاقوامی ایئر لائنز کی ٹکٹوں پر رعایتی قیمتیں۔",
    fullDesc: "We provide hassle-free ticket bookings for Emirates, Qatar Airways, Saudia, PIA, Turkish Airlines, Flydubai, Air Arabia, and all major international carriers. Enjoy group fares, date change flexibility, seat selection, and 24/7 flight monitoring.",
    fullDescUr: "ایمریٹس، سعودیہ، پی آئی اے، فلائی دبئی اور ایئر عربیہ کی ٹکٹوں کی برائے راست جاریگی۔",
    features: ["Domestic & International Routes", "Group Fare Discounts", "Date Change & Refund Support", "Seat Selection & Extra Baggage Deals"],
    featuresUr: ["ملکی و بین الاقوامی فلائٹس", "گروپ ڈسکاؤنٹس", "تاریخ کی تبدیلی اور رینڈ سہولت", "سیٹ کی سلیکشن"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "umrah-services",
    iconName: "Moon",
    title: "Hajj & Umrah Pilgrimage Packages",
    titleUr: "حج و عمرہ پیکجز",
    shortDesc: "Complete Umrah & Hajj visa, Makkah & Madinah hotel stays, VIP transfers, and guidance by Filzah Bin Fahim.",
    shortDescUr: "مکہ و مدینہ کے ہوٹلز، الیکٹرانک ویزہ اور 24/7 رہنمائی۔",
    fullDesc: "Ramad-e-Taiba Travel & Tours is your trusted authorized Hajj & Umrah service provider in Karachi. We specialize in custom 3-Star, 4-Star, and 5-Star luxury Clock Tower packages, family groups, and VIP private arrangements with full ground handling.",
    fullDescUr: "رمادِ طیبہ ٹریول نارتھ ناظم آباد کراچی میں حج و عمرہ کی اعلیٰ خدمات فراہم کرتا ہے۔",
    features: ["Direct Umrah & Hajj Visa Issuance", "Clock Tower 5-Star Hotel Options", "Guided Ziaraat in Makkah & Madinah", "24/7 Dedicated Ground Assistance"],
    featuresUr: ["برائے راست عمرہ ویزہ", "کلاک ٹاور 5-سٹار ہوٹلز", "مکہ و مدینہ زیارات", "24/7 میدانِ عمل میں رہنمائی"],
    image: "https://images.unsplash.com/photo-1565552070098-0073a126829c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "visa-consultancy",
    iconName: "FileCheck",
    title: "Visa Services & Consultancy",
    titleUr: "ویزہ کنسلٹنسی اور فائلنگ",
    shortDesc: "Expert document preparation, visa processing, and approval support for Saudi, UAE, Turkey, Azerbaijan, Malaysia, UK, USA, and Schengen.",
    shortDescUr: "سعودیہ، دبئی، ترکی، آذربائیجان اور یورپی ممالک کے ویزہ فارمز۔",
    fullDesc: "Navigating visa requirements is seamless with Ramad-e-Taiba. Our experienced visa consultancy team in Karachi handles complete file preparation, appointment scheduling, cover letter writing, hotel vouchers, and invitation processing with high approval rates.",
    fullDescUr: "مکمل ڈاکومینٹیشن، اپائنٹمنٹ اور کور لیٹر کی تیاری۔",
    features: ["Tourist & Visit Visa Specialist", "Document Verification & File Prep", "Fast Track E-Visa Approvals", "Embassy Appointment Booking"],
    featuresUr: ["ٹورسٹ و وزٹ ویزہ کے ماہرین", "دستاویزات کی تصدیق", "فاسٹ ٹریک ای-ویزہ", "سفارتخانے کی اپائنٹمنٹ"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "holiday-tours",
    iconName: "Compass",
    title: "Worldwide Travel & Holiday Packages",
    titleUr: "بین الاقوامی سیاحتی پیکجز",
    shortDesc: "Curated holiday packages for Turkey, Dubai, Malaysia, Thailand, Azerbaijan, Sri Lanka, and domestic tours.",
    shortDescUr: "ترکی، دبئی، باکو، تھائی لینڈ اور شمالی پاکستان کے فیملی ٹورز۔",
    fullDesc: "Whether you are planning a family holiday, honeymoon, or group tour, Ramad-e-Taiba combines best flight deals, handpicked hotels, guided tours, and local transfers for an unforgettable experience.",
    fullDescUr: "خاندانی اور ہنی مون ٹورز کے لیے بہترین سفر۔",
    features: ["Customized Family & Honeymoon Itineraries", "English/Urdu Local Tour Guides", "Included Entry Tickets to Top Attractions", "All Transfers in AC Coaches"],
    featuresUr: ["کسٹمائزڈ فیملی ٹورز", "اردو دان لوکل گائیڈز", "اینٹری ٹکٹس شامل", "تمام ٹرانسپورٹ اے سی بس میں"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "hotel-booking",
    iconName: "Hotel",
    title: "Worldwide Hotel Reservations",
    titleUr: "ہوٹل بکنگ سروسز",
    shortDesc: "Discounted rates for 3-star to 5-star luxury hotels near Haram in Makkah, Central Madinah, and global cities.",
    shortDescUr: "حرم کے پاس مکہ کلاک ٹاور اور دنیا بھر کے 5-سٹار ہوٹلز۔",
    fullDesc: "Access wholesale hotel rates across Saudi Arabia, UAE, Turkey, Far East, Europe, and Pakistan. Enjoy direct courtyard access in Makkah Clock Tower and Central Markaziah Madinah with guaranteed voucher issuance.",
    fullDescUr: "سعودیہ اور عالمی شہروں میں کنفرمڈ واؤچرز۔",
    features: ["Clock Tower & Haram Courtyard Hotels", "Instant Confirmation Vouchers", "Competitive B2B & Retail Rates", "Family Suite Configurations"],
    featuresUr: ["مکہ کلاک ٹاور و صحنِ حرم ہوٹلز", "فوری کنفرمیشن واؤچرز", "مناسب ترین نرخ", "فیملی سوئٹس"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "insurance-transfers",
    iconName: "Car",
    title: "Flight Bookings & Airport Transfers",
    titleUr: "ایئرپورٹ ٹرانسپورٹ و پرائیویٹ گاڑیاں",
    shortDesc: "Discounted airline tickets on Saudia, Emirates, PIA, Air Arabia and private VIP ground transfers.",
    shortDescUr: "سعودی عرب اور دبئی میں پرائیویٹ GMC اور بس ٹرانسپورٹ۔",
    fullDesc: "Travel with complete peace of mind. We provide flight bookings, travel insurance, and private GMC, Coaster, and limousine airport transfers in Saudi Arabia and global destinations.",
    fullDescUr: "ایئرپورٹ پر استقبلیہ اور آرام دہ گاڑیاں۔",
    features: ["Instant Airline Reservations", "Private GMC & Luxury Bus Transfers", "24/7 Airport Meet & Assist", "Reliable Chauffeur Service"],
    featuresUr: ["فوری فلائٹ بکنگ", "پرائیویٹ GMC و بسیں", "24 گھنٹے ایئرپورٹ ہیلپ ڈسک", "تجربہ کار ڈرائیور"],
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Haji Muhammad Farooq & Family",
    location: "Karachi, Pakistan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    serviceType: "5-Star Umrah Package",
    review: "Ramad-e-Taiba Travel & Tours made our Umrah journey completely hassle-free! From hotel check-in at Swissôtel Clock Tower to private GMC transfers, Filzah Bin Fahim and team provided top-notch service.",
    date: "January 2026"
  },
  {
    id: "t2",
    name: "Dr. Syed Hamza Ali",
    location: "Karachi, Pakistan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    serviceType: "Grand Turkey Express Tour",
    review: "The Turkey tour was brilliantly arranged by Ramad-e-Taiba. Hot Air Balloon ride in Cappadocia, Bosphorus cruise, and 4-star hotels were fantastic. All visa paperwork was handled smoothly.",
    date: "December 2025"
  },
  {
    id: "t3",
    name: "Ayesha & Bilal Ahmed",
    location: "Karachi, Pakistan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    serviceType: "Dubai Honeymoon Tour",
    review: "Extremely professional service! Cheap airfare tickets, Dubai visa received in just 24 hours, and excellent desert safari experience. Best travel partner in Karachi without a doubt.",
    date: "November 2025"
  },
  {
    id: "t4",
    name: "Sheikh Faisal Rehman",
    location: "Karachi, Pakistan",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    serviceType: "Economy Umrah Group",
    review: "Very honest pricing with zero hidden charges. Filzah Bin Fahim and the guide in Madinah were very helpful during Ziaraat. Will book all my future family trips with Ramad-e-Taiba Travel & Tours.",
    date: "October 2025"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Holy Kaaba View from Makkah Hotel",
    category: "umrah",
    imageUrl: "https://images.unsplash.com/photo-1565552070098-0073a126829c?auto=format&fit=crop&q=80&w=1000",
    location: "Makkah Mukarramah"
  },
  {
    id: "g2",
    title: "Masjid An-Nabawi Courtyard Umbrellas",
    category: "umrah",
    imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80&w=1000",
    location: "Madinah Al-Munawwarah"
  },
  {
    id: "g3",
    title: "Hot Air Balloon Flight in Cappadocia",
    category: "tours",
    imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1000",
    location: "Cappadocia, Turkey"
  },
  {
    id: "g4",
    title: "Dubai Skyline & Marina Dhow Cruise",
    category: "tours",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000",
    location: "Dubai, UAE"
  },
  {
    id: "g5",
    title: "Kachura Shangrila Lake Resort",
    category: "tours",
    imageUrl: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=1000",
    location: "Skardu, Pakistan"
  },
  {
    id: "g6",
    title: "Ramad-e-Taiba Pilgrims Group in Madinah",
    category: "clients",
    imageUrl: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1000",
    location: "Madinah"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "How do I book an Umrah package from Karachi with Pak World Travel?",
    answer: "You can book directly by visiting our head office in North Nazimabad Block A, Karachi, or online via WhatsApp / phone inquiry. Submit your valid original passport (minimum 6 months validity), CNIC copy, passport size white background photographs, and initial booking deposit. Our visa team processes your Umrah visa electronically within 48 to 72 hours.",
    questionUr: "پاک ورلڈ ٹریول کے ذریعے کراچی سے عمرہ پیکج کیسے بک کروائیں؟",
    answerUr: "آپ نارتھ ناظم آباد بلاک A کراچی میں واقع ہمارے مرکزی دفتر میں تشریف لا کر یا آن لائن واٹس ایپ / فون کال کے ذریعے براہ راست بکنگ کروا سکتے ہیں۔ اپنا کم از کم 6 ماہ کی میعاد والا اصلی پاسپورٹ، شناختی کارڈ کی کاپی، 2 وائٹ بیک گراؤنڈ تصاویر اور ابتدائی ڈپازٹ جمع کروائیں۔ ہماری ویزہ ٹیم 48 سے 72 گھنٹوں میں الیکٹرانک عمرہ ویزہ پروسیس کرتی ہے۔",
    category: "umrah"
  },
  {
    id: "faq2",
    question: "What documents are required for Saudi Arabia Tourist & Umrah Visa?",
    answer: "Required documents include: 1) Original Passport with 6+ months validity, 2) CNIC Copy, 3) 2 Passport Size Photos with White Background, 4) FRC or Nikahnama (if traveling with spouse/family). For E-visas, scanned copies suffice.",
    questionUr: "سعودی عرب عمرہ اور ٹورسٹ ویزہ کے لیے کون سے کاغذات درکار ہیں؟",
    answerUr: "درکار دستاویزات درج ذیل ہیں: 1) کم از کم 6 ماہ کی میعاد والا اصلی پاسپورٹ، 2) شناختی کارڈ کی کاپی، 3) 2 عدد پاسپورٹ سائز وائٹ بیک گراؤنڈ تصاویر، 4) ایف آر سی یا نکاح نامہ (خاندان یا اہلیہ کے ساتھ سفر کی صورت میں)۔ ای-ویزہ کے لیے سکین شدہ کاپیاں بھی کافی ہیں۔",
    category: "visa"
  },
  {
    id: "faq3",
    question: "Can I customize my hotel stay distance and flight dates?",
    answer: "Yes! Pak World Travel & Tours specializes in customized travel. You can choose your preferred hotel tier (3★, 4★, 5★ Clock Tower), flight carrier (Emirates, Saudia, PIA, Air Arabia), and exact travel dates.",
    questionUr: "کیا میں اپنے ہوٹل کے قیام کا فاصلہ اور پرواز کی تاریخیں اپنی مرضی سے منتخب کر سکتا ہوں؟",
    answerUr: "جی ہاں! پاک ورلڈ ٹریول کسٹمائزڈ عمرہ پیکجز کا ماہر ہے۔ آپ اپنی پسند کے مطابق ہوٹل (3 سٹار، 4 سٹار یا 5 سٹار مکہ کلاک ٹاور)، ایئر لائن (سعودیہ، ایمریٹس، پی آئی اے، ایئر عربیہ) اور سفر کی تاریخیں منتخب کر سکتے ہیں۔",
    category: "umrah"
  },
  {
    id: "faq4",
    question: "What payment options and installment plans are available?",
    answer: "We accept payments via Bank Transfers (Online HBL, Meezan, Bank Alfalah), Pay Order, Cash at our North Nazimabad Karachi office, and major Debit/Credit Cards. Stage payments are supported for advance group bookings.",
    questionUr: "ادائیگی کے کون سے طریقے اور سہولیات دستیاب ہیں؟",
    answerUr: "ہم آن لائن بینک ٹرانسفر (ایچ بی ایل، میزان بینک، بینک الفلاح)، پے آرڈر، نارتھ ناظم آباد کراچی کے دفتر میں نقد رقم اور ڈیبٹ/کریڈٹ کارڈ قبول کرتے ہیں۔ ایڈوانس گروپ بکنگز کے لیے مرحلہ وار ادائیگی کی سہولت بھی موجود ہے۔",
    category: "payment"
  },
  {
    id: "faq5",
    question: "How long does tourist visa processing take for Turkey, Dubai & Azerbaijan?",
    answer: "UAE E-Visas take 24-48 working hours. Azerbaijan E-Visas take 3 days (or 3 hours express). Turkey Sticker visas take approximately 10 to 15 working days through Gerry's / Embassy submission.",
    questionUr: "دبئی، ترکی اور آذربائیجان کے ویزہ پروسیسنگ میں کتنا وقت لگتا ہے؟",
    answerUr: "یو اے ای (دبئی) ای-ویزہ 24 سے 48 ورکنگ گھنٹوں میں، آذربائیجان ای-ویزہ 3 دنوں میں (یا ایکسپریس 3 گھنٹوں میں)، اور ترکی کا سٹیکر ویزہ سفارتخانے کے ذریعے تقریباً 10 سے 15 ورکنگ دنوں میں پروسیس ہوتا ہے۔",
    category: "visa"
  },
  {
    id: "faq6",
    question: "Are Ziaraat tours in Makkah and Madinah included in your packages?",
    answer: "Yes, all our economy, executive, and VIP Umrah packages include guided group or private Ziaraat in luxury AC coaches to sacred places like Jabal Al-Nour, Cave Hira, Mina, Arafat, Masjid Quba, Jabal Uhud, and Qiblatayn.",
    questionUr: "کیا آپ کے پیکجز میں مکہ مکرمہ اور مدینہ منورہ کی زیارات شامل ہیں؟",
    answerUr: "جی ہاں، ہمارے تمام اکانومی، ایگزیکٹو اور وی آئی پی عمرہ پیکجز میں لگژری اے سی بسوں/گاڑیوں کے ذریعے جبل النور، غارِ حرا، منیٰ، عرفات، مسجد قباء، جبلِ احد اور مسجد قبلتین جیسی تمام مقدس مقامات کی باقاعدہ زیارات شامل ہیں۔",
    category: "umrah"
  }
];

export const WHY_CHOOSE_US_POINTS = [
  {
    title: "10+ Years Dedicated Experience",
    desc: "A trusted brand in Karachi with deep expertise in Umrah regulations, airline booking engines, and international tourism.",
    icon: "Award"
  },
  {
    title: "Transparent Pricing & No Hidden Fees",
    desc: "What we quote is what you pay. Full itemized breakdown of flights, hotels, visa, tax, and transfers.",
    icon: "Receipt"
  },
  {
    title: "Direct Umrah & Visa Authorization",
    desc: "Official Ministry authorized visa vendor ensuring instant e-visa approval and official verification.",
    icon: "ShieldCheck"
  },
  {
    title: "24/7 On-Ground Support",
    desc: "Dedicated ground representatives in Makkah, Madinah, Jeddah, Dubai, and Istanbul to assist you anytime.",
    icon: "Headphones"
  },
  {
    title: "Customized Family Packages",
    desc: "Tailored arrangements for elderly pilgrims, wheel-chair support, kids meals, and private GMC transportation.",
    icon: "Users"
  },
  {
    title: "Prime North Nazimabad Karachi Office",
    desc: "Easy physical access in Block A North Nazimabad for face-to-face consultation, file handovers, and briefing.",
    icon: "MapPin"
  }
];
