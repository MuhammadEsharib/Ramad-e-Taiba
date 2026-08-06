import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Phone, 
  ArrowUp, 
  Calendar, 
  Sparkles, 
  X, 
  ChevronUp, 
  TrendingUp, 
  PhoneCall, 
  Headphones,
  ExternalLink
} from 'lucide-react';
import { openWhatsAppInquiry } from '../utils/formatters';
import { COMPANY_INFO } from '../data/mockData';

import { Language } from '../types';

interface FloatingControlsProps {
  language?: Language;
  onOpenBookingModal: () => void;
  onOpenAIAssistant: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  language = 'en',
  onOpenBookingModal,
  onOpenAIAssistant
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const quickMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close popup when pressing Escape key or clicking outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isQuickMenuOpen) {
        setIsQuickMenuOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (quickMenuRef.current && !quickMenuRef.current.contains(e.target as Node)) {
        setIsQuickMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isQuickMenuOpen]);

  const primaryPhoneClean = COMPANY_INFO.phonePrimary.replace(/[^0-9+]/g, '');

  return (
    <>
      {/* Persistent Floating Quick Action Menu (Bottom Right) */}
      <div 
        ref={quickMenuRef}
        className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3"
        aria-label="Quick Assistance Floating Menu"
      >
        {/* Expanded Quick Contact Popover Panel */}
        {isQuickMenuOpen && (
          <div 
            className="w-72 sm:w-80 bg-[#0B1F3A]/95 backdrop-blur-xl border border-[#D4AF37]/30 text-white rounded-[24px] p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 mb-1 space-y-3 focus:outline-none"
            role="dialog"
            aria-label="Quick Actions & Direct Contacts"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#D4AF37]">
                  Pak World Desk Active
                </span>
              </div>
              <button
                onClick={() => setIsQuickMenuOpen(false)}
                className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none"
                aria-label="Close Quick Actions Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action List */}
            <div className="space-y-2">
              
              {/* Direct WhatsApp Action */}
              <button
                onClick={() => {
                  setIsQuickMenuOpen(false);
                  openWhatsAppInquiry("Assalamu Alaikum Pak World Travel! I would like instant help regarding Umrah / Visa consultancy.");
                }}
                className="w-full p-3 rounded-[16px] bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-between shadow-md transition-all hover:scale-[1.02] active:scale-98 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none min-h-[44px]"
                aria-label="Start direct WhatsApp chat with Travel Consultant"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 fill-white" />
                  </div>
                  <div className="text-left">
                    <div className="leading-tight text-white font-extrabold">WhatsApp Chat</div>
                    <div className="text-[10px] text-emerald-100 font-normal">Instant 24/7 Agent Help</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </button>

              {/* Direct Voice Call Action */}
              <a
                href={`tel:${primaryPhoneClean}`}
                onClick={() => setIsQuickMenuOpen(false)}
                className="w-full p-3 rounded-[16px] bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-between border border-white/15 transition-all hover:scale-[1.02] active:scale-98 focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[44px]"
                aria-label={`Call Pak World Travel helpline at ${COMPANY_INFO.phonePrimary}`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#1E5EFF]/20 text-[#1E5EFF] flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4 text-[#1E5EFF]" />
                  </div>
                  <div className="text-left">
                    <div className="leading-tight font-extrabold text-white">Call Support Desk</div>
                    <div className="text-[10px] text-gray-300 font-normal" dir="ltr">{COMPANY_INFO.phonePrimary}</div>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase text-[#D4AF37] bg-[#D4AF37]/20 px-2 py-0.5 rounded-full border border-[#D4AF37]/40">
                  Karachi
                </span>
              </a>

              {/* AI Assistant Quick Launcher */}
              <button
                onClick={() => {
                  setIsQuickMenuOpen(false);
                  onOpenAIAssistant();
                }}
                className="w-full p-3 rounded-[16px] bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-blue-600/30 hover:bg-blue-600/40 border border-blue-400/30 text-white font-bold text-xs flex items-center justify-between transition-all hover:scale-[1.02] active:scale-98 focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[44px]"
                aria-label="Launch AI Travel Assistant"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div className="text-left">
                    <div className="leading-tight font-extrabold text-[#D4AF37]">AI Travel Advisor</div>
                    <div className="text-[10px] text-gray-300 font-normal">Ask Saudi rules & flight deals</div>
                  </div>
                </div>
                <span className="text-[9px] font-bold bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full">
                  24/7 AI
                </span>
              </button>

              {/* Application Tracker Shortcut */}
              <a
                href="#tracker"
                onClick={() => setIsQuickMenuOpen(false)}
                className="w-full p-3 rounded-[16px] bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-between border border-white/15 transition-all hover:scale-[1.02] active:scale-98 focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[44px]"
                aria-label="Track Visa or Umrah Application Docket"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <div className="leading-tight font-extrabold text-white">Track Application</div>
                    <div className="text-[10px] text-gray-300 font-normal">Check live visa / Umrah docket</div>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-300 font-bold">Track →</span>
              </a>

            </div>

            <div className="pt-2 border-t border-white/10 text-center text-[10px] text-gray-400">
              Pak World Travel & Tours • DTS License KHI-8842
            </div>
          </div>
        )}

        {/* Primary Trigger Stack */}
        <div className="flex items-center gap-2">
          {/* Quick Contact Toggle Button */}
          <button
            onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
            className="p-3.5 sm:p-4 rounded-full bg-[#0B1F3A] text-white border border-[#D4AF37]/50 shadow-2xl hover:bg-[#15345d] active:scale-95 transition-all flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[48px]"
            aria-expanded={isQuickMenuOpen}
            aria-label="Open Quick Help and Direct Contact Options"
          >
            <div className="relative">
              <Headphones className="w-5 h-5 text-[#D4AF37]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B1F3A]" />
            </div>
            <span className="hidden sm:inline text-xs font-extrabold uppercase tracking-wider text-white">
              Quick Actions
            </span>
            <ChevronUp className={`w-4 h-4 text-[#D4AF37] transition-transform duration-200 ${isQuickMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Direct WhatsApp Quick Pill */}
          <button
            onClick={() => openWhatsAppInquiry("Assalamu Alaikum Pak World Travel! I would like to inquire about packages.")}
            className="p-3.5 sm:p-4 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center relative focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none min-h-[48px] min-w-[48px]"
            aria-label="Direct WhatsApp Consultation with Pak World Travel Desk"
            title="WhatsApp Travel Desk"
          >
            <span className="absolute -inset-1 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-white relative z-10" />
          </button>

          {/* Back to Top Button */}
          {showBackToTop && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 rounded-full bg-[#0B1F3A] text-white border border-white/10 shadow-lg hover:bg-[#1E5EFF] transition-all focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Scroll back to top of page"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Sticky Mobile Book & Call Navigation Bar (Bottom) */}
      <div 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 p-2.5 flex items-center gap-2 shadow-2xl"
        role="region"
        aria-label="Mobile Quick Call and Booking Toolbar"
      >
        <a
          href={`tel:${primaryPhoneClean}`}
          className="flex-1 py-3 rounded-[16px] bg-gray-100 active:bg-gray-200 text-[#0B1F3A] font-extrabold text-xs uppercase flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:outline-none min-h-[44px]"
          aria-label={`Call Pak World support line ${COMPANY_INFO.phonePrimary}`}
        >
          <Phone className="w-4 h-4 text-[#1E5EFF]" />
          <span>Call Desk</span>
        </a>

        <button
          onClick={() => openWhatsAppInquiry("Assalamu Alaikum Pak World Travel! I need instant guidance.")}
          className="p-3 rounded-[16px] bg-[#25D366] text-white flex items-center justify-center shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none min-h-[44px] min-w-[44px]"
          aria-label="Open WhatsApp Chat"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
        </button>

        <button
          onClick={onOpenBookingModal}
          className="flex-1 py-3 rounded-[16px] bg-[#1E5EFF] active:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:outline-none min-h-[44px]"
          aria-label="Open Journey Reservation Modal"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Journey</span>
        </button>
      </div>
    </>
  );
};
