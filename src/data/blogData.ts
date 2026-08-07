export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'umrah' | 'visa' | 'flights' | 'destinations' | 'budget';
  categoryLabel: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  featuredImage: string;
  summary: string;
  tags: string[];
  content: {
    introduction: string;
    tableOfContents: string[];
    sections: {
      heading: string;
      body: string;
      bulletPoints?: string[];
    }[];
    keyTakeaways: string[];
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Ultimate 2026 Umrah Guide: Essential Steps for Pilgrims Traveling from Karachi",
    slug: "ultimate-2026-umrah-guide-karachi",
    category: "umrah",
    categoryLabel: "Umrah & Hajj Guide",
    author: {
      name: "Tariq Mehmood Siddiqui",
      role: "Senior Umrah Consultant & Director",
      avatar: "https://images.unsplash.com/photo-1633546707050-88e2b545831c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dW1yb2h8ZW58MHx8MHx8fDA%3D"
    },
    publishedDate: "February 2026",
    readTime: "6 min read",
    featuredImage: "https://images.unsplash.com/photo-1633546707050-88e2b545831c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dW1yb2h8ZW58MHx8MHx8fDA%3D",
    summary: "Everything Karachi families need to know before booking Umrah in 2026: Nusuk app registration, Makkah Clock Tower vs Aziziyah, flight choices from Karachi Airport, and baggage rules.",
    tags: ["Umrah 2026", "Nusuk App", "Karachi Flight Deals", "Makkah Hotels", "Rawdah Reservation"],
    content: {
      introduction: "Performing Umrah is a life-transforming spiritual pilgrimage. For families embarking from Karachi, understanding Saudi Ministry rules, Nusuk App appointments, and choosing between Clock Tower zero-distance hotels vs economy shuttles can save time, money, and physical effort.",
      tableOfContents: [
        "1. Important Passport & Visa Requirements",
        "2. Understanding the Nusuk App for Rawdah Riaz-ul-Jannah",
        "3. Flight Selection from Jinnah International Karachi",
        "4. Hotel Selection: Makkah Clock Tower vs Economy Shuttles",
        "5. Essential Packing List for Pakistani Pilgrims"
      ],
      sections: [
        {
          heading: "1. Important Passport & Visa Requirements",
          body: "Saudi Ministry of Hajj & Umrah now issues electronic Umrah visas within 24 to 72 hours. Your passport must have at least 6 months validity from departure date. Pakistani CNIC copies and white background passport photos are required.",
          bulletPoints: [
            "Passport validity: Minimum 6 months remaining.",
            "Biometric verification through Saudi Visa Bio app (where applicable).",
            "Children under 18 must travel with male Mahram or family group."
          ]
        },
        {
          heading: "2. Understanding the Nusuk App for Rawdah Riaz-ul-Jannah",
          body: "Visiting the sacred Rawdah (Riaz-ul-Jannah) in Masjid An-Nabawi Madinah requires a valid permit issued exclusively via the Nusuk Smartphone App. Book your permit immediately upon receiving your Umrah visa to secure preferred time slots for men and women.",
          bulletPoints: [
            "Download Nusuk App prior to departure from Karachi.",
            "Separate booking slots for Male and Female pilgrims.",
            "Keep digital PDF and barcode on mobile phone for entry control."
          ]
        },
        {
          heading: "3. Flight Selection from Jinnah International Karachi",
          body: "Karachi (KHI) offers direct non-stop flights to Jeddah (JED) and Madinah (MED) via PIA, Saudia, and Airblue (approx 3.5 to 4 hours flight time). Connecting carriers like Emirates, Flydubai, Qatar Airways, and Air Arabia offer flexible baggage allowances and premium comfort.",
          bulletPoints: [
            "Saudia & PIA: Direct flights with 2x 23kg baggage allowance.",
            "Flydubai & Air Arabia: Economical budget rates via Dubai/Sharjah.",
            "Free 5-Litre Zamzam water check-in permitted on return to Karachi."
          ]
        },
        {
          heading: "4. Hotel Selection: Makkah Clock Tower vs Economy Shuttles",
          body: "If traveling with elderly parents or young children, staying at zero-distance 5-Star Clock Tower hotels (Swissôtel, Pullman Zamzam, Fairmont) eliminates long walks in heat. For budget conscious travelers, 3-Star economy hotels in Kudai / Emaar Grand offer 24/7 complimentary AC shuttle buses right to the Haram Courtyard.",
          bulletPoints: [
            "Clock Tower 5-Star: Zero distance, direct courtyard access, open buffet breakfast.",
            "4-Star Anjum / Shohada: 200m-250m walking distance, spacious family quad rooms.",
            "3-Star Economy: 500m-600m with continuous air-conditioned bus transfers."
          ]
        }
      ],
      keyTakeaways: [
        "Book Rawdah permits on Nusuk App early.",
        "Always confirm full baggage weight limits at booking.",
        "Ramad-e-Taiba Travel & Tours provides 24/7 ground assistance in Makkah & Madinah."
      ]
    }
  },
  {
    id: "post-2",
    title: "Dubai Tourist Visa vs Saudi E-Visa: Complete Requirements Breakdown for Pakistanis",
    slug: "dubai-visa-vs-saudi-evisa-pakistan",
    category: "visa",
    categoryLabel: "Visa Consultancy",
    author: {
      name: "Syed Rehan Ali",
      role: "Visa & Immigration Specialist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    },
    publishedDate: "January 2026",
    readTime: "5 min read",
    featuredImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200",
    summary: "Detailed comparison of UAE 30-Day Tourist Visa vs Saudi Tourist / Umrah E-Visa for Pakistani passport holders. Documents, bank statement rules, and approval timelines.",
    tags: ["Dubai Visa", "Saudi E-Visa", "Pakistani Passport", "Visa Rules 2026", "North Nazimabad Visa Office"],
    content: {
      introduction: "Obtaining a tourist visa on a Pakistani passport is straightforward when handled by authorized IATA agencies. Here is a clear, transparent comparison of processing requirements for Dubai (UAE) and Saudi Arabia.",
      tableOfContents: [
        "1. UAE 30-Day Tourist Visa Guidelines",
        "2. Saudi Arabia Tourist & Umrah E-Visa Overview",
        "3. Bank Statement & Financial Proof Requirements",
        "4. Common Reasons for Visa Delays & Rejections"
      ],
      sections: [
        {
          heading: "1. UAE 30-Day Tourist Visa Guidelines",
          body: "The UAE 30-Day Single Entry Tourist Visa is processed electronically. Approval takes 24 to 48 working hours. Requirements include clear passport scan (6 months validity), CNIC copy, white background photograph, and return flight ticket reservation.",
          bulletPoints: [
            "Validity: 60 days to enter, 30 days stay upon arrival.",
            "Express processing available in 12-24 hours.",
            "Family group visas require marriage / birth certificates."
          ]
        },
        {
          heading: "2. Saudi Arabia Tourist & Umrah E-Visa Overview",
          body: "Saudi Arabia offers both dedicated Umrah Visas and 1-Year Multiple Entry Tourist Visas (if holding valid US, UK, or Schengen visa). Standard Umrah visas allow 90 days stay with access to Makkah, Madinah, and all Saudi cities.",
          bulletPoints: [
            "Umrah Visa: Valid for 90 days across the Kingdom.",
            "Includes comprehensive mandatory Saudi Health Insurance.",
            "Direct processing through Ramad-e-Taiba Travel & Tours Ministry portal."
          ]
        },
        {
          heading: "3. Bank Statement & Financial Proof Requirements",
          body: "While E-visas for UAE and Saudi Umrah generally do not require extensive bank statements, holiday tour visas for Turkey, Schengen, UK, and USA require 6 months active bank account statements with sufficient closing balance.",
          bulletPoints: [
            "Ensure steady account balance without sudden large deposits.",
            "Bank account maintenance certificate signed and stamped by bank manager.",
            "NTN (Tax Return) copies significantly boost visa approval chances."
          ]
        }
      ],
      keyTakeaways: [
        "UAE tourist visa approval in 24-48 hours.",
        "Saudi Umrah visa valid for 90 days with full insurance.",
        "Visit Ramad-e-Taiba Travel & Tours in North Nazimabad Karachi for hassle-free file verification."
      ]
    }
  },
  {
    id: "post-3",
    title: "Top 7 Secret Spots in Turkey & Cappadocia You Must Visit in 2026",
    slug: "top-7-secret-spots-turkey-cappadocia",
    category: "destinations",
    categoryLabel: "Destination Guides",
    author: {
      name: "Fatima Noor",
      role: "International Tour Coordinator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    },
    publishedDate: "January 2026",
    readTime: "7 min read",
    featuredImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1200",
    summary: "Discover beyond Hagia Sophia: Goreme Cave Hotels, Bosphorus Sunset Dhows, Pamukkale Travertines, and Grand Bazaar bargain secrets for Pakistani travelers.",
    tags: ["Turkey Tour", "Cappadocia Balloon", "Istanbul Guide", "Grand Bazaar Shopping", "Bosphorus Cruise"],
    content: {
      introduction: "Turkey remains the top international holiday destination for Pakistani travelers. Beyond the world-famous landmarks, Turkey offers magical experiences in Cappadocia, Antalya, and Asian Istanbul.",
      tableOfContents: [
        "1. Goreme Valley Hot Air Balloons at Sunrise",
        "2. Private Bosphorus Yacht Sunset Cruise",
        "3. Derinkuyu Underground City Exploration",
        "4. Pamukkale Cotton Castle Thermal Pools",
        "5. Shopping Guide for Istiklal Street & Grand Bazaar"
      ],
      sections: [
        {
          heading: "1. Goreme Valley Hot Air Balloons at Sunrise",
          body: "Floating 3,000 feet above fairy chimney rock formations in Cappadocia is a once-in-a-lifetime experience. Hot Air Balloon flights operate year-round subject to weather. Booking through your tour operator in advance guarantees sunrise spots.",
          bulletPoints: [
            "Flight duration: 60 minutes with champagne toast and flight certificate.",
            "Best photo vantage point: Lover's Hill panoramic viewpoint.",
            "Cave hotel stay in Goreme adds romantic ambiance."
          ]
        },
        {
          heading: "2. Private Bosphorus Yacht Sunset Cruise",
          body: "Sail between Europe and Asia along the Bosphorus Strait. Witness Dolmabahce Palace, Maiden's Tower, and Bosphorus Bridge illuminated at dusk while enjoying authentic Turkish tea and baklava.",
          bulletPoints: [
            "2-hour luxury boat cruise from Kabatas pier.",
            "Includes folk dances and live Turkish entertainment.",
            "Halal food buffet options served on board."
          ]
        }
      ],
      keyTakeaways: [
        "Combine Istanbul (4 Days) + Cappadocia (3 Days) for the ultimate holiday.",
        "Ramad-e-Taiba Travel & Tours provides complete internal flights, cave hotels, and visa assistance.",
        "Best months to visit: April to June & September to November."
      ]
    }
  },
  {
    id: "post-4",
    title: "How to Find Cheap Flight Fares from Karachi Airport (PIA, Saudia, Emirates)",
    slug: "find-cheap-flight-fares-karachi-airport",
    category: "flights",
    categoryLabel: "Flight & Travel Hacks",
    author: {
      name: "Muhammad Bilal",
      role: "Ticketing & Aviation Desk Manager",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    },
    publishedDate: "December 2025",
    readTime: "4 min read",
    featuredImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200",
    summary: "Proven ticketing strategies from our IATA travel desk in Karachi: advance booking windows, seasonal discount codes, group ticket savings, and luggage rules.",
    tags: ["Flight Deals", "Karachi Airport", "IATA Ticketing", "PIA Discounts", "Emirates Offers"],
    content: {
      introduction: "Airfares constitute a major portion of any travel budget. By understanding airline fare buckets and booking windows, travelers from Karachi can save up to 25% on international airfare.",
      tableOfContents: [
        "1. Best Booking Window for Karachi Flights",
        "2. Mid-Week vs Weekend Departure Savings",
        "3. IATA B2B Wholesale Fares vs Online Booking Engines",
        "4. Baggage Allowance Rules for Umrah & Family Passengers"
      ],
      sections: [
        {
          heading: "1. Best Booking Window for Karachi Flights",
          body: "For Middle East flights (Jeddah, Dubai, Doha), booking 3 to 5 weeks in advance yields optimal pricing. For European and Far East destinations, aim for 6 to 8 weeks ahead. Avoid last-minute 72-hour bookings when seats enter premium fare brackets.",
          bulletPoints: [
            "Saudi Arabia / Gulf routes: Book 20-35 days ahead.",
            "Turkey & Far East: Book 45-60 days ahead.",
            "Peak Ramadan / Eid holidays: Reserve 2-3 months in advance."
          ]
        },
        {
          heading: "2. Mid-Week vs Weekend Departure Savings",
          body: "Departures on Tuesday and Wednesday are generally 10% to 15% cheaper than Friday or Sunday flights out of Jinnah International Karachi.",
          bulletPoints: [
            "Avoid Friday evening departure spikes.",
            "Flexible date search +/- 2 days saves money.",
            "Call Ramad-e-Taiba Travel & Tours desk for offline group fare hold."
          ]
        }
      ],
      keyTakeaways: [
        "Consult Ramad-e-Taiba Travel & Tours IATA desk for exclusive agent GDS fares.",
        "Group bookings of 10+ passengers receive dedicated airline discounts.",
        "24/7 ticket re-issuance and date change support available."
      ]
    }
  }
];
