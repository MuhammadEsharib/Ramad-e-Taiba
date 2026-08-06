import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, Loader2, MessageSquare, PhoneCall, UserCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { openWhatsAppInquiry } from '../utils/formatters';
import { LogoSvg } from './Header';

interface AITravelAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  isComplexQuery?: boolean;
}

// Dedicated Consultant CTA Card Component
const ConsultantCTACard: React.FC<{ language: Language; queryContext?: string }> = ({ language, queryContext }) => {
  const isUrdu = language === 'ur';

  return (
    <div className="mt-3 p-3.5 bg-gradient-to-r from-[#0B1F3A] to-[#1E5EFF] rounded-[18px] text-white shadow-lg border border-[#D4AF37]/30">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#0B1F3A] flex items-center justify-center shrink-0">
          <UserCheck className="w-4 h-4" />
        </div>
        <div>
          <h5 className="font-display font-extrabold text-xs text-white">
            {isUrdu ? 'براہ راست سینئر ماہر سے رابطہ کریں' : 'Speak Directly with Senior Consultant'}
          </h5>
          <p className="text-[10px] text-gray-200">
            {isUrdu ? 'مکمل تفصیلات، متبادل تواریخ اور رعایت کے لیے' : 'For exact date availability, custom itineraries & discounts'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5">
        <button
          onClick={() => openWhatsAppInquiry(`Assalamu Alaikum Ramad-e-Taiba Travel! I need detailed consultant support regarding: ${queryContext || 'Custom Hajj / Umrah / Travel Planning'}`)}
          className="py-2 px-3 bg-[#25D366] hover:bg-emerald-600 text-white font-extrabold text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'واٹس ایپ رابطہ' : 'WhatsApp Agent'}</span>
        </button>

        <a
          href="tel:+923001234567"
          className="py-2 px-3 bg-[#D4AF37] hover:bg-amber-400 text-[#0B1F3A] font-extrabold text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'کال کریں (+92 300)' : 'Call Karachi Office'}</span>
        </a>
      </div>
    </div>
  );
};

export const AITravelAssistant: React.FC<AITravelAssistantProps> = ({ isOpen, onClose, language = 'en' }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: t.aiWelcomeMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Escape key to close modal
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

  // Helper to detect if a query or response involves complex/high-detail topics
  const isHighDetailOrComplexQuery = (txt: string): boolean => {
    const lower = txt.toLowerCase();
    const keywords = [
      'detail', 'custom', 'itinerary', 'family', 'group', 'discount', 'price',
      'cost', 'quote', 'dates', 'flight', 'hotel', 'schedule', 'day by day',
      'package', 'vip', 'ramadan', 'visa', 'booking', 'contact', 'consultant',
      'whatsapp', 'office', 'تفصیل', 'پیکج', 'قیمت', 'واٹس ایپ', 'تاریخ', 'گروپ',
      'رابطہ', 'دفتر'
    ];
    return keywords.some(kw => lower.includes(kw));
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const isComplex = isHighDetailOrComplexQuery(query);

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isComplexQuery: isComplex
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, language })
      });

      let aiText = '';
      if (response.ok) {
        const data = await response.json();
        aiText = data.text;
      } else {
        aiText = language === 'ur'
          ? "آپ کا بہت شکریہ! پاک ورلڈ ٹریول اینڈ ٹورز کے پیکجز، ویزہ اور فلائٹس کی مکمل تفصیلات کے لیے ہمارے ماہر ٹریول کنسلٹنٹ سے واٹس ایپ پر رابطہ کریں۔"
          : "Thank you for asking! For detailed itineraries and customized package options, please speak directly with our senior travel consultant on WhatsApp or phone.";
      }

      const responseIsComplex = isComplex || isHighDetailOrComplexQuery(aiText);

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isComplexQuery: responseIsComplex
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: language === 'ur'
            ? "السلام علیکم! ہمارے پاک ورلڈ نارتھ ناظم آباد کراچی کے نمائندے سے واٹس ایپ پر براہ راست بات چیت کے لیے نیچے بٹن دبائیں!"
            : "Assalamu Alaikum! Connect with our senior consultant at North Nazimabad Karachi on WhatsApp for immediate package quotes!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isComplexQuery: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    t.aiPrompt1,
    t.aiPrompt2,
    t.aiPrompt3,
    t.aiPrompt4
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Pak World AI Travel Assistant Dialog"
    >
      <div className="bg-white text-gray-900 rounded-[28px] max-w-lg w-full h-[85vh] max-h-[620px] shadow-2xl flex flex-col overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-[#0B1F3A] text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <LogoSvg className="h-9 w-auto" />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close AI Travel Assistant Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Header info bar */}
        <div className="bg-[#1E5EFF]/10 px-4 py-2 flex items-center justify-between border-b border-blue-500/20 text-xs">
          <div className="flex items-center gap-1.5 text-blue-700 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span>{t.aiModalTitle}</span>
          </div>
          <button
            onClick={() => openWhatsAppInquiry("Assalamu Alaikum Pak World Travel! I am asking from the website AI assistant.")}
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none min-h-[36px]"
            aria-label="Open WhatsApp Chat with Consultant"
          >
            <MessageSquare className="w-3 h-3" />
            <span>WhatsApp Agent</span>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F6F8FC]">
          {messages.map((msg, idx) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#0B1F3A] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-[20px] p-3.5 text-xs leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-[#1E5EFF] text-white rounded-br-none font-medium'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Direct Consultant Contact CTA Card for AI messages that involve complex or detailed queries */}
                {msg.sender === 'ai' && msg.isComplexQuery && (
                  <ConsultantCTACard
                    language={language}
                    queryContext={messages[idx - 1]?.text || 'Package Inquiry'}
                  />
                )}

                <span className="text-[9px] opacity-60 block text-right mt-1 font-sans">{msg.time}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-center text-xs text-gray-500 p-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#1E5EFF]" />
              <span>{language === 'ur' ? 'اے آئی اسسٹنٹ تجزیہ کر رہا ہے...' : 'Ramad-e-Taiba AI is generating response...'}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2.5 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
          {quickPrompts.map((promptText, i) => (
            <button
              key={i}
              onClick={() => handleSend(promptText)}
              className="px-3 py-1.5 rounded-full bg-[#F6F8FC] hover:bg-[#1E5EFF] hover:text-white text-[11px] font-semibold whitespace-nowrap transition-colors border border-gray-200 text-[#0B1F3A]"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder={t.aiInputPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-[#F6F8FC] text-gray-900 border border-gray-200 rounded-full py-2.5 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading}
            className="p-2.5 rounded-full bg-[#1E5EFF] hover:bg-blue-600 text-white transition-colors shadow-md active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
