import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { Language } from '../types';
import { translations } from '../data/translations';
import { openWhatsAppInquiry } from '../utils/formatters';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  Tag, 
  ArrowRight, 
  X, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare,
  Bookmark
} from 'lucide-react';

interface TravelInsightsBlogProps {
  language: Language;
  onOpenBookingModal: (title?: string) => void;
}

export const TravelInsightsBlog: React.FC<TravelInsightsBlogProps> = ({
  language,
  onOpenBookingModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [aiPromptInput, setAiPromptInput] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  const t = translations[language];

  // Filter logic
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesQuery = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAskAiExpert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPromptInput.trim()) return;

    setIsAiLoading(true);
    setAiAnswer(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: aiPromptInput, language })
      });
      const data = await res.json();
      setAiAnswer(data.text || 'Thank you for your question. Connect with our senior travel consultant on WhatsApp for instant guidance!');
    } catch (err) {
      setAiAnswer('Pak World Travel & Tours offers expert visa & Umrah guidance. Please contact our Karachi office or WhatsApp +92 300 1234567.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <section id="travel-insights" className="py-20 bg-[#F8FAFC] text-gray-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1E5EFF]/10 text-[#1E5EFF] text-xs font-bold uppercase tracking-widest rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              Pak World Travel Knowledge Base
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0B1F3A] mt-3">
              Travel Insights & Expert Guides
            </h2>
            <p className="text-gray-600 text-sm mt-2 max-w-2xl">
              Stay informed with official Umrah guidelines, visa advice, flight booking hacks, and curated destination guides written by our senior travel consultants in Karachi.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Umrah, visa, flights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-full pl-9 pr-4 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-[#1E5EFF] text-gray-900 shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { id: 'all', label: 'All Insights' },
            { id: 'umrah', label: '🕌 Umrah & Hajj' },
            { id: 'visa', label: '📑 Visa Consultancy' },
            { id: 'destinations', label: '🌍 Destination Guides' },
            { id: 'flights', label: '✈️ Flight Hacks' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#0B1F3A] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Post Grid */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-[28px] p-12 text-center border border-gray-200 shadow-sm my-8">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 text-base">No articles found</h3>
            <p className="text-xs text-gray-500 mt-1">Try adjusting your search keywords or filter category.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 px-5 py-2 bg-[#1E5EFF] text-white font-bold text-xs rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {filteredPosts.map((post, idx) => {
              const isBookmarked = bookmarkedIds.includes(post.id);
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  onClick={() => setActiveArticle(post)}
                >
                  <div>
                    {/* Featured Image Header */}
                    <div className="relative h-60 overflow-hidden bg-gray-100">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1565552070098-0073a126829c?auto=format&fit=crop&q=80&w=800');
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                      
                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 px-3.5 py-1.5 bg-[#1E5EFF] text-white text-[11px] font-extrabold uppercase rounded-full shadow-md">
                        {post.categoryLabel}
                      </span>

                      {/* Bookmark Button */}
                      <button
                        onClick={(e) => toggleBookmark(post.id, e)}
                        className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all ${
                          isBookmarked 
                            ? 'bg-[#D4AF37] text-white' 
                            : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                        title={isBookmarked ? 'Bookmarked' : 'Save article'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>

                      {/* Title Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-3 text-[11px] text-gray-200 mb-1 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D4AF37]" />
                            {post.readTime}
                          </span>
                          <span>•</span>
                          <span>{post.publishedDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Article Content Preview */}
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-[#0B1F3A] group-hover:text-[#1E5EFF] transition-colors leading-snug mb-3">
                        {post.title}
                      </h3>

                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                        {post.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {post.tags.slice(0, 3).map((tag, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] font-semibold flex items-center gap-1">
                            <Tag className="w-2.5 h-2.5 text-gray-400" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Author Bar */}
                  <div className="px-6 py-4 bg-[#F8FAFC] border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200');
                        }}
                        className="w-8 h-8 rounded-full object-cover border border-white shadow-sm"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 leading-tight">
                          {post.author.name}
                        </h4>
                        <p className="text-[10px] text-gray-500">
                          {post.author.role}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#1E5EFF] group-hover:translate-x-1 transition-transform">
                      Read Full Guide
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* AI Travel Guide Q&A Widget */}
        <div className="bg-gradient-to-br from-[#0B1F3A] via-[#153966] to-[#0B1F3A] rounded-[32px] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E5EFF]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-extrabold uppercase rounded-full mb-3 border border-[#D4AF37]/30">
              <Sparkles className="w-3.5 h-3.5" />
              Ask Pak World AI Travel Expert
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Have a Specific Travel or Visa Question?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 mb-6">
              Ask our AI consultant about Saudi Umrah rules, Dubai visa documents, flight baggage, or custom itinerary planning from Karachi!
            </p>

            <form onSubmit={handleAskAiExpert} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="e.g. What documents are required for 15-day Umrah with children?"
                value={aiPromptInput}
                onChange={(e) => setAiPromptInput(e.target.value)}
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]"
              />
              <button
                type="submit"
                disabled={isAiLoading}
                className="px-6 py-3 bg-[#1E5EFF] hover:bg-blue-600 disabled:opacity-50 text-white font-extrabold text-xs uppercase rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 shrink-0"
              >
                {isAiLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4" />
                    Ask Consultant
                  </>
                )}
              </button>
            </form>

            {/* AI Answer Display */}
            {aiAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-xs leading-relaxed text-gray-100"
              >
                <div className="flex items-center gap-2 mb-2 font-bold text-[#D4AF37]">
                  <Sparkles className="w-4 h-4" />
                  Pak World AI Travel Advice:
                </div>
                <p className="whitespace-pre-line">{aiAnswer}</p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">Pak World Travel & Tours • North Nazimabad Karachi</span>
                  <button
                    onClick={() => openWhatsAppInquiry(`Assalamu Alaikum! I asked AI Travel Assistant: "${aiPromptInput}". I would like to discuss this further.`)}
                    className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
                  >
                    Discuss on WhatsApp →
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </div>

      {/* Full Article Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-gray-900 rounded-[32px] max-w-3xl w-full my-auto overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col border border-gray-200"
            >
              {/* Sticky Modal Bar */}
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1E5EFF]">
                  {activeArticle.categoryLabel}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openWhatsAppInquiry(`Assalamu Alaikum! I read your article "${activeArticle.title}" and would like to inquire about booking/consultancy.`)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full shadow-sm flex items-center gap-1.5"
                  >
                    WhatsApp Inquiry
                  </button>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                
                {/* Header Title & Author */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#0B1F3A] leading-tight mb-4">
                    {activeArticle.title}
                  </h1>

                  <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-100 text-xs text-gray-600">
                    <div className="flex items-center gap-3">
                      <img
                        src={activeArticle.author.avatar}
                        alt={activeArticle.author.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200');
                        }}
                        className="w-9 h-9 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <span className="font-bold text-gray-900 block">{activeArticle.author.name}</span>
                        <span className="text-[10px] text-gray-500">{activeArticle.author.role}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#1E5EFF]" />
                        {activeArticle.readTime}
                      </span>
                      <span>•</span>
                      <span>{activeArticle.publishedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Banner Image */}
                <div className="rounded-[24px] overflow-hidden h-64 md:h-80 shadow-md">
                  <img
                    src={activeArticle.featuredImage}
                    alt={activeArticle.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1565552070098-0073a126829c?auto=format&fit=crop&q=80&w=1200');
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Summary Box */}
                <div className="p-4 bg-[#F6F8FC] rounded-[20px] border border-blue-100/80 text-xs leading-relaxed text-gray-700 italic">
                  <strong>Overview: </strong> {activeArticle.summary}
                </div>

                {/* Table of Contents */}
                {activeArticle.content.tableOfContents && (
                  <div className="p-5 bg-gray-50 rounded-[20px] border border-gray-200">
                    <h3 className="font-bold text-xs uppercase text-gray-700 tracking-wider mb-2">
                      Table of Contents
                    </h3>
                    <ul className="space-y-1.5 text-xs font-semibold text-[#1E5EFF]">
                      {activeArticle.content.tableOfContents.map((toc, idx) => (
                        <li key={idx} className="hover:underline cursor-pointer">
                          {toc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Main Article Sections */}
                <div className="space-y-6 text-sm leading-relaxed text-gray-800">
                  <p>{activeArticle.content.introduction}</p>

                  {activeArticle.content.sections.map((section, idx) => (
                    <div key={idx} className="space-y-3 pt-2">
                      <h3 className="text-lg font-bold text-[#0B1F3A]">
                        {section.heading}
                      </h3>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{section.body}</p>
                      
                      {section.bulletPoints && (
                        <ul className="space-y-2 bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-xs text-gray-700">
                          {section.bulletPoints.map((bp, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#1E5EFF] shrink-0 mt-0.5" />
                              <span>{bp}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Key Takeaways */}
                <div className="p-6 bg-gradient-to-r from-[#0B1F3A] to-[#153966] text-white rounded-[24px]">
                  <h3 className="font-bold text-sm text-[#D4AF37] uppercase tracking-wider mb-3">
                    Key Expert Takeaways
                  </h3>
                  <ul className="space-y-2 text-xs">
                    {activeArticle.content.keyTakeaways.map((kt, kIdx) => (
                      <li key={kIdx} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
                        <span>{kt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Article Footer CTA */}
                <div className="p-6 bg-[#F6F8FC] rounded-[24px] border border-gray-200 text-center space-y-3">
                  <h4 className="font-bold text-base text-[#0B1F3A]">
                    Ready to plan your trip with Pak World Travel?
                  </h4>
                  <p className="text-xs text-gray-600">
                    Visit our office in North Nazimabad Karachi or contact our senior travel consultant for instant package quotes.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setActiveArticle(null);
                        onOpenBookingModal(activeArticle.title);
                      }}
                      className="px-6 py-3 bg-[#1E5EFF] text-white font-bold text-xs uppercase rounded-full shadow-lg hover:bg-blue-600 transition-all"
                    >
                      Reserve Package / Inquiry
                    </button>
                    <button
                      onClick={() => openWhatsAppInquiry(`Assalamu Alaikum! I would like to consult about "${activeArticle.title}".`)}
                      className="px-6 py-3 bg-emerald-600 text-white font-bold text-xs uppercase rounded-full shadow-lg hover:bg-emerald-700 transition-all"
                    >
                      WhatsApp Travel Desk
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
