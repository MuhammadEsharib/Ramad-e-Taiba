import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
    }
  }
  return aiClient;
}

// 1. Live Exchange Rates Cache & API Endpoint
let cachedRates: { rates: Record<string, number>; lastUpdated: number } | null = null;

app.get("/api/currency-rates", async (req, res) => {
  const now = Date.now();
  // 1 hour cache
  if (cachedRates && now - cachedRates.lastUpdated < 3600000) {
    return res.json({ rates: cachedRates.rates, isLive: true, lastUpdated: cachedRates.lastUpdated });
  }

  try {
    const response = await fetch("https://open.er-api.com/v6/latest/PKR");
    if (!response.ok) throw new Error("API response not ok");
    const data = await response.json();
    
    if (data && data.rates) {
      cachedRates = {
        rates: data.rates,
        lastUpdated: now
      };
      return res.json({ rates: data.rates, isLive: true, lastUpdated: now });
    }
    throw new Error("Invalid rate format");
  } catch (error) {
    // Fallback static rates if network API is unreachable
    const fallback = {
      PKR: 1,
      USD: 0.0036, // ~278 PKR per USD
      SAR: 0.0134, // ~74.5 PKR per SAR
      AED: 0.0131, // ~76.2 PKR per AED
      EUR: 0.0033  // ~302 PKR per EUR
    };
    return res.json({ rates: fallback, isLive: false, lastUpdated: now });
  }
});

// 2. Gemini AI Chatbot API Route
app.post("/api/chat", async (req, res) => {
  const { message, language = "en" } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const ai = getGeminiClient();

  const systemInstruction = `You are "Ramad-e-Taiba AI", the official AI Travel & Umrah Consultant for "Ramad-e-Taiba Travel & Tours", located in Karachi, Pakistan. Managed by Filzah Bin Fahim.
  Instagram: https://www.instagram.com/ramadetaiba (@ramadetaiba)
  Phone: +92 300 1234567 / +92 21 36678900. Email: info@ramadetaiba.com.

  Tagline: "Your trusted partner for Hajj, Umrah & worldwide travel"
  Core Services: Flights | Hotels | Visa Services
  Call to Action: "DM us for bookings & packages 😇"

  COMPLETE WEBSITE STRUCTURE & KNOWLEDGE BASE:
  1. Header Bar: Features instant currency switching (PKR, SAR, USD, AED, EUR) with live exchange rates, English/Urdu language toggle, section navigation links, and a "Book Package / DM Us" button.
  2. Hero Section: Direct search & booking bar for Hajj & Umrah, Flights, Hotels, and Visa Services. Quick CTA buttons for Instagram DM (@ramadetaiba), WhatsApp and AI Travel Assistant.
  3. Trust Bar: Highlights accreditation (Hajj & Umrah Partner, IATA Accredited Agency, Flights, Hotels & Visa Services).
  4. About Us Section: Managed by Filzah Bin Fahim in Karachi, offering high standards of service, complete transparency, and VIP customer hospitality for Hajj, Umrah & worldwide travel.
  5. Our Services: Hajj & Umrah Services, Air Ticketing (PIA, Saudia, Emirates, FlyDubai, Qatar Airways), Hotels Reservations, Visa Services, and International Tour Packages.
  6. Featured Hajj & Umrah Packages (Includes Sorting & Filtering):
     - Sorting options: Price (Low to High / High to Low), Popularity, and Duration.
     - Category filters: All, Economy, Executive, 5-Star VIP, Ramadan Specials.
     - Packages:
       * Economy Umrah (15 Days): PKR 218,000 (3-Star Hotels, 600m Makkah / 400m Madinah, Return Flights from Karachi, Umrah Visa, AC Transport, Guided Ziaraat).
       * 4-Star Family Choice (15 Days): PKR 285,000 (250m Makkah / 200m Nabawi).
       * 5-Star Executive Clock Tower (14 Days): PKR 385,000 (Swissôtel / Pullman Zamzam Clock Tower, Zero distance from Haram, Haramain Train option).
       * Ramadan Special Umrah (20 Days): PKR 420,000 (Last 10 days in Makkah).
  7. International Tour Packages & Custom Tour Price Estimator:
     - Includes Turkey & Cappadocia (8 Days - PKR 345,000), Dubai & Desert Safari (6 Days - PKR 175,000), Malaysia & Thailand (10 Days - PKR 265,000), Baku Azerbaijan (6 Days - PKR 185,000), Skardu & Hunza (7 Days - PKR 95,000).
  8. Popular Destinations Grid: Visual showcase of Makkah Al-Mukarramah, Madinah Al-Munawwarah, Istanbul Turkey, Dubai UAE, Baku Azerbaijan, Skardu Valley.
  9. Why Choose Us: Trusted Partner, Transparency (No Hidden Charges), 24/7 Ground Support in Makkah & Madinah, Custom Itineraries.
  10. Booking Process: Step 1 (Inquire & Select), Step 2 (DM on Instagram @ramadetaiba or WhatsApp), Step 3 (Visa & Ticket Issuance), Step 4 (Blessed Journey Departure).
  11. Photo Gallery & Reviews.

  CRITICAL GUIDELINES FOR RESPONDING TO USERS:
  1. WEBSITE GUIDANCE: Seamlessly guide users on where to look on the website for their query.
  2. ACCURACY: Answer the user's question directly, clearly, and helpfully using the facts above.
  3. CONSULTANT CONTACT DIRECTIVE: Direct users to DM us on Instagram (@ramadetaiba) or WhatsApp (+92 300 1234567) or speak with Filzah Bin Fahim for bookings & custom quotes.
  4. LANGUAGE: Respond in the requested language (${language === "ur" ? "Urdu" : "English"}). If Urdu, write in natural, polite, respectful Urdu.`;

  if (!ai) {
    // Graceful offline intelligent answer if GEMINI_API_KEY is not configured
    const lower = message.toLowerCase();
    let reply = "";
    if (language === "ur") {
      if (lower.includes("عمرہ") || lower.includes("حج") || lower.includes("umrah") || lower.includes("مکہ") || lower.includes("مدینہ")) {
        reply = "رمادِ طیبہ کے حج و عمرہ پیکجز 218,000 روپے (اکانومی 15 دن)، 285,000 روپے (4 سٹار) اور 385,000 روپے (5 سٹار مکہ کلاک ٹاور) سے شروع ہوتے ہیں۔ تمام پیکجز میں کراچی سے فلائٹس، عمرہ ویزہ، ہوٹل کی رہائش، ٹرانسپورٹ اور زیارات شامل ہیں! انسٹاگرام @ramadetaiba پر ڈی ایم کریں۔";
      } else if (lower.includes("ویزا") || lower.includes("ویزہ") || lower.includes("کاغذات")) {
        reply = "سعودی عمرہ ویزہ کے لیے درکار دستاویزات: 1) کم از کم 6 ماہ کی میعاد والا پاسپورٹ، 2) شناختی کارڈ کاپی، 3) 2 وائٹ بیک گراؤنڈ تصاویر۔ ویزہ سروس کے لیے انسٹاگرام @ramadetaiba پر ڈی ایم کریں!";
      } else if (lower.includes("دفتر") || lower.includes("ایڈریس") || lower.includes("کراچی")) {
        reply = "رمادِ طیبہ ٹریول اینڈ ٹورز، کراچی، پاکستان۔ زیرِ اہتمام: فلزہ بن فہیم۔ انسٹاگرام ڈی ایم: @ramadetaiba یا واٹس ایپ کے ذریعے رابطہ کریں۔";
      } else {
        reply = "السلام علیکم! رمادِ طیبہ ٹریول اینڈ ٹورز کراچی میں خوش آمدید۔ آپ انسٹاگرام (@ramadetaiba) پر ڈی ایم کر کے یا فلزہ بن فہیم سے براہ راست رابطہ کر سکتے ہیں۔";
      }
    } else {
      if (lower.includes("umrah") || lower.includes("hajj") || lower.includes("makkah") || lower.includes("madinah")) {
        reply = "Ramad-e-Taiba Travel offers complete Hajj & Umrah Packages starting from PKR 218,000 (15-Day Economy), PKR 285,000 (4-Star Family Choice), and PKR 385,000 (5-Star Executive Clock Tower). Flights | Hotels | Visa Services. DM us on Instagram @ramadetaiba for bookings!";
      } else if (lower.includes("visa") || lower.includes("document")) {
        reply = "For Saudi Arabia Visas, we require: 1) Passport valid for 6+ months, 2) CNIC copy, 3) 2 passport-size white background photos. DM us on Instagram @ramadetaiba for fast visa processing!";
      } else if (lower.includes("address") || lower.includes("office") || lower.includes("location")) {
        reply = "Ramad-e-Taiba Travel & Tours, Karachi, Pakistan. Managed by Filzah Bin Fahim. Connect with us on Instagram @ramadetaiba or WhatsApp for bookings!";
      } else {
        reply = "Assalamu Alaikum! Welcome to Ramad-e-Taiba Travel & Tours, Karachi. Your trusted partner for Hajj, Umrah & worldwide travel. Flights | Hotels | Visa Services. DM us on Instagram @ramadetaiba for bookings 😇";
      }
    }

    return res.json({ text: reply, mode: "intelligent_local" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
      config: {
        systemInstruction
      }
    });

    const text = response.text || (language === "ur" 
      ? "رمادِ طیبہ ٹریول اینڈ ٹورز میں خوش آمدید! مزید تفصیلات یا بکنگ کے لیے انسٹاگرام (@ramadetaiba) پر ڈی ایم کریں یا واٹس ایپ پر رابطہ کریں۔"
      : "Thank you for contacting Ramad-e-Taiba Travel & Tours! Please DM us on Instagram (@ramadetaiba) or WhatsApp for immediate assistance.");
    return res.json({ text, mode: "gemini" });
  } catch (error: any) {
    console.error("Gemini API error in /api/chat:", error?.message || error);
    
    // Provide seamless intelligent fallback with consultant phone & WhatsApp so UX never breaks
    const lower = message.toLowerCase();
    let fallbackText = "";

    if (language === "ur") {
      if (lower.includes("عمرہ") || lower.includes("حج") || lower.includes("umrah") || lower.includes("مکہ") || lower.includes("مدینہ") || lower.includes("پیکج")) {
        fallbackText = "رمادِ طیبہ کے حج و عمرہ پیکجز 218,000 روپے (اکانومی 15 دن)، 285,000 روپے (4 سٹار) اور 385,000 روپے (5 سٹار مکہ کلاک ٹاور) سے شروع ہوتے ہیں۔ فلائٹس | ہوٹلز | ویزہ سروسز۔\n\nفوری بکنگ یا معلومات کے لیے رابطہ کریں:\n📸 انسٹاگرام ڈی ایم: @ramadetaiba\n💬 واٹس ایپ: 1234567 300 92+";
      } else if (lower.includes("ویزا") || lower.includes("ویزہ") || lower.includes("کاغذات")) {
        fallbackText = "سعودی ویزہ کے لیے درکار دستاویزات:\n1) کم از کم 6 ماہ میعاد کا پاسپورٹ\n2) شناختی کارڈ کاپی\n3) 2 پاسپورٹ سائز تصاویر\n\nویزہ معلومات کے لیے رابطہ کریں:\n📸 انسٹاگرام ڈی ایم: @ramadetaiba\n💬 واٹس ایپ: 1234567 300 92+";
      } else if (lower.includes("دفتر") || lower.includes("ایڈریس") || lower.includes("کراچی") || lower.includes("پتہ")) {
        fallbackText = "رمادِ طیبہ ٹریول اینڈ ٹورز، کراچی، پاکستان۔ زیرِ اہتمام: فلزہ بن فہیم۔\n\nرابطہ فرمائیں:\n📸 انسٹاگرام ڈی ایم: @ramadetaiba\n💬 واٹس ایپ: 1234567 300 92+";
      } else {
        fallbackText = "السلام علیکم! رمادِ طیبہ ٹریول اینڈ ٹورز کراچی میں خوش آمدید۔ حج، عمرہ، فلائٹس، ہوٹلز اور ویزہ سروسز کے لیے رابطہ کریں۔\n\n📸 انسٹاگرام ڈی ایم: @ramadetaiba\n💬 واٹس ایپ: 1234567 300 92+";
      }
    } else {
      if (lower.includes("umrah") || lower.includes("hajj") || lower.includes("makkah") || lower.includes("madinah") || lower.includes("package")) {
        fallbackText = "Ramad-e-Taiba Travel offers complete Hajj & Umrah Packages starting from PKR 218,000 (15-Day Economy), PKR 285,000 (4-Star Family Choice), and PKR 385,000 (5-Star Executive Clock Tower). Flights | Hotels | Visa Services.\n\nDM us for bookings & packages:\n📸 Instagram DM: @ramadetaiba\n💬 WhatsApp: +92 300 1234567";
      } else if (lower.includes("visa") || lower.includes("document")) {
        fallbackText = "For Saudi Arabia Visas, we require:\n1) Original Passport valid for 6+ months\n2) CNIC Copy\n3) 2 Passport-size white background photos\n\nFor visa support, connect with us:\n📸 Instagram DM: @ramadetaiba\n💬 WhatsApp: +92 300 1234567";
      } else if (lower.includes("address") || lower.includes("office") || lower.includes("location")) {
        fallbackText = "Ramad-e-Taiba Travel & Tours, Karachi, Pakistan. Managed by Filzah Bin Fahim.\n\nFor bookings & packages:\n📸 Instagram DM: @ramadetaiba\n💬 WhatsApp: +92 300 1234567";
      } else {
        fallbackText = "Assalamu Alaikum! Welcome to Ramad-e-Taiba Travel & Tours, Karachi. Your trusted partner for Hajj, Umrah & worldwide travel. Flights | Hotels | Visa Services.\n\nDM us for bookings & packages 😇:\n📸 Instagram DM: @ramadetaiba\n💬 WhatsApp Chat: +92 300 1234567";
      }
    }

    return res.json({ text: fallbackText, mode: "consultant_fallback" });
  }
});

// 3. Gemini Google Maps Grounding API Route for Real Destination Insights
app.post("/api/maps/place-grounding", async (req, res) => {
  const { placeName, query } = req.body;

  if (!placeName) {
    return res.status(400).json({ error: "placeName is required" });
  }

  const ai = getGeminiClient();

  if (!ai) {
    return res.json({
      overview: `${placeName} is one of the premier destinations offered by Pak World Travel & Tours from Karachi. Contact our travel desk for flight and hotel details!`,
      groundingChunks: [],
      isLiveGrounding: false
    });
  }

  try {
    const prompt = query || `Provide concise travel details, major landmarks, best time to visit, and nearby transport or pilgrimage advice for ${placeName}.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }]
      }
    });

    const overview = response.text || `Live Google Maps info for ${placeName}.`;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return res.json({
      overview,
      groundingChunks,
      isLiveGrounding: true
    });
  } catch (error: any) {
    console.error("Gemini Maps Grounding error:", error);
    return res.status(500).json({
      error: "Failed to fetch Google Maps grounding data",
      overview: `${placeName} - Popular travel spot from Karachi. Contact Pak World Travel on WhatsApp for detailed itineraries.`,
      groundingChunks: []
    });
  }
});

// 3. Vite Development Server vs Production Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pak World Travel Server running on http://localhost:${PORT}`);
  });
}

startServer();
