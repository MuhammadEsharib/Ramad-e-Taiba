import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FAQProps {
  language?: Language;
}

export const FAQ: React.FC<FAQProps> = ({ language = 'en' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);
  const isUrdu = language === 'ur';
  const t = translations[language];

  const filtered = FAQS.filter(f => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    
    const qEn = f.question.toLowerCase();
    const aEn = f.answer.toLowerCase();
    const qUr = (f.questionUr || '').toLowerCase();
    const aUr = (f.answerUr || '').toLowerCase();

    return qEn.includes(term) || aEn.includes(term) || qUr.includes(term) || aUr.includes(term);
  });

  return (
    <section id="faq" className="py-20 bg-[#F6F8FC] text-gray-900" dir={isUrdu ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="px-3.5 py-1.5 bg-[#1E5EFF]/10 text-[#1E5EFF] text-xs font-bold uppercase tracking-widest rounded-full">
            {t.faqBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0B1F3A] mt-3">
            {t.faqTitle}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {t.faqSubtitle}
          </p>

          {/* Search Box */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search className={`absolute ${isUrdu ? 'right-4' : 'left-4'} top-3.5 w-4 h-4 text-gray-400 pointer-events-none`} />
            <input
              type="text"
              placeholder={t.faqSearchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-white border border-gray-200 rounded-full py-3 ${
                isUrdu ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'
              } text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E5EFF] text-gray-900 shadow-sm`}
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-[20px] border border-gray-100 p-6 shadow-sm">
              <p className="text-sm font-bold text-gray-700">
                {isUrdu
                  ? 'آپ کی تلاش سے متعلق کوئی سوال نہیں ملا۔'
                  : 'No matching questions found.'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {isUrdu
                  ? 'برائے مہربانی دیگر الفاظ کے ساتھ تلاش کریں یا واٹس ایپ پر براہ راست نمائندے سے سوال پوچھیں۔'
                  : 'Try searching with different keywords or connect with our consultant via WhatsApp.'}
              </p>
            </div>
          ) : (
            filtered.map((item) => {
              const isOpen = openId === item.id;
              const questionText = isUrdu && item.questionUr ? item.questionUr : item.question;
              const answerText = isUrdu && item.answerUr ? item.answerUr : item.answer;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-[20px] border border-gray-100 overflow-hidden shadow-sm hover:border-gray-200 transition-all"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className={`w-full p-5 ${
                      isUrdu ? 'text-right' : 'text-left'
                    } flex items-center justify-between gap-4 font-bold text-sm md:text-base text-[#0B1F3A] focus:outline-none hover:text-[#1E5EFF] transition-colors`}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <HelpCircle className="w-5 h-5 text-[#1E5EFF] shrink-0" />
                      <span className="leading-snug">{questionText}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${
                        isOpen ? 'rotate-180 text-[#1E5EFF]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      className={`px-5 pb-5 text-xs md:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 ${
                        isUrdu ? 'text-right' : 'text-left'
                      }`}
                    >
                      {answerText}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
