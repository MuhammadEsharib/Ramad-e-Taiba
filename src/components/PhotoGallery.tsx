import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem, Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, X, Maximize2 } from 'lucide-react';

interface PhotoGalleryProps {
  language?: Language;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ language = 'en' }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'umrah' | 'tours' | 'clients'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const t = translations[language];

  const filtered = GALLERY_ITEMS.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <section id="gallery" className="py-20 bg-[#F6F8FC] text-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1.5 bg-[#1E5EFF]/10 text-[#1E5EFF] text-xs font-bold uppercase tracking-widest rounded-full">
            {t.galleryBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0B1F3A] mt-3">
            {t.galleryTitle}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {t.gallerySubtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: t.umrahTabAll },
            { id: 'umrah', label: '🕌 Holy Sites' },
            { id: 'tours', label: '✈️ International Tours' },
            { id: 'clients', label: '👥 Happy Groups' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all ${
                activeTab === tab.id
                  ? 'bg-[#0B1F3A] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-[24px] overflow-hidden h-72 shadow-md hover:shadow-2xl transition-all cursor-pointer bg-gray-200"
              onClick={() => setSelectedPhoto(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1565552070098-0073a126829c?auto=format&fit=crop&q=80&w=800');
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="self-end w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#D4AF37] mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="max-w-4xl w-full relative">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white p-2 hover:text-[#D4AF37]"
            >
              <X className="w-8 h-8" />
            </button>

            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1565552070098-0073a126829c?auto=format&fit=crop&q=80&w=800');
              }}
              className="w-full h-auto max-h-[80vh] object-contain rounded-[20px]"
            />

            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-bold font-display">{selectedPhoto.title}</h3>
              <p className="text-xs text-[#D4AF37] mt-1">{selectedPhoto.location}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
