import React, { useState } from 'react';
import { Star, CheckCircle2, Quote, UserCheck, MessageSquare, ThumbsUp } from 'lucide-react';
import { Language } from '../types';

interface PackageRatingReviewProps {
  packageId: string;
  packageName: string;
  language: Language;
}

interface ReviewData {
  rating: number;
  reviewCount: number;
  satisfactionRate: number;
  topReviewer: string;
  topReviewerLocation: string;
  quote: string;
  travelDate: string;
  verified: boolean;
}

const PACKAGE_REVIEWS: Record<string, ReviewData> = {
  // Umrah Packages
  'economy-15d': {
    rating: 4.9,
    reviewCount: 142,
    satisfactionRate: 99,
    topReviewer: 'Muhammad Imran & Family',
    topReviewerLocation: 'North Nazimabad, Karachi',
    quote: 'Best budget Umrah! Hotels were clean, bus transport was right on time, and Ziaraat in Madinah was super inspiring.',
    travelDate: 'Jan 2026',
    verified: true
  },
  'executive-5star-14d': {
    rating: 5.0,
    reviewCount: 98,
    satisfactionRate: 100,
    topReviewer: 'Dr. Syed Ahmed',
    topReviewerLocation: 'DHA Phase 6, Karachi',
    quote: 'Swissôtel Kaaba courtyard view was unbelievable. Private GMC transfers made traveling with my elderly parents completely effortless!',
    travelDate: 'Dec 2025',
    verified: true
  },
  'star4-family-15d': {
    rating: 4.8,
    reviewCount: 86,
    satisfactionRate: 98,
    topReviewer: 'Mrs. Farhana & Kids',
    topReviewerLocation: 'PECHS, Karachi',
    quote: 'Great 4-star experience! Very short walking distance to Haram in Makkah and super peaceful stay near Masjid An-Nabawi.',
    travelDate: 'Jan 2026',
    verified: true
  },
  'ramadan-special-20d': {
    rating: 4.9,
    reviewCount: 110,
    satisfactionRate: 99,
    topReviewer: 'Haji Tariq Mehmood',
    topReviewerLocation: 'Gulshan-e-Iqbal, Karachi',
    quote: 'Unforgettable Ramadan atmosphere. Pak World guides arranged smooth Suhoor and Iftar assistance for senior pilgrims.',
    travelDate: 'Ramadan 2025',
    verified: true
  },

  // Tour Packages
  'turkey-grand-8d': {
    rating: 4.9,
    reviewCount: 156,
    satisfactionRate: 99,
    topReviewer: 'Bilal & Ayesha Ahmed',
    topReviewerLocation: 'DHA, Karachi',
    quote: 'Hot air balloon ride in Cappadocia was a dream come true! Bosphorus cruise with dinner was spectacular.',
    travelDate: 'Dec 2025',
    verified: true
  },
  'dubai-safari-6d': {
    rating: 4.9,
    reviewCount: 210,
    satisfactionRate: 99,
    topReviewer: 'S. Hamza Ali',
    topReviewerLocation: 'Gulshan-e-Iqbal, Karachi',
    quote: 'Dubai visa approved in 24 hours! Dune bashing in 4x4 and Marina Dhow cruise were perfectly arranged.',
    travelDate: 'Jan 2026',
    verified: true
  },
  'malaysia-thailand-10d': {
    rating: 4.8,
    reviewCount: 94,
    satisfactionRate: 98,
    topReviewer: 'Zeeshan Khan',
    topReviewerLocation: 'Gulberg, Karachi',
    quote: 'Flawless multi-country tour! Genting cable car and Bangkok Safari World were highlights for the entire family.',
    travelDate: 'Nov 2025',
    verified: true
  },
  'baku-azerbaijan-6d': {
    rating: 4.9,
    reviewCount: 128,
    satisfactionRate: 99,
    topReviewer: 'Dr. Usman Ghani',
    topReviewerLocation: 'Gulistan-e-Johar, Karachi',
    quote: 'Loved Shahdag snow mountain! Our private driver spoke good Urdu and guided us through Flame Towers and Old Baku.',
    travelDate: 'Dec 2025',
    verified: true
  },
  'skardu-hunza-7d': {
    rating: 5.0,
    reviewCount: 175,
    satisfactionRate: 100,
    topReviewer: 'Mahnoor R.',
    topReviewerLocation: 'DHA Phase 5, Karachi',
    quote: 'Shangrila lake & Attabad boating were magical. Direct KHI to Skardu flight saved so much road travel time!',
    travelDate: 'Autumn 2025',
    verified: true
  }
};

const DEFAULT_REVIEW: ReviewData = {
  rating: 4.9,
  reviewCount: 112,
  satisfactionRate: 99,
  topReviewer: 'Verified Karachi Traveler',
  topReviewerLocation: 'Karachi, Pakistan',
  quote: 'Excellent organization, transparent pricing, and 24/7 dedicated support by Pak World Travel team.',
  travelDate: 'Recent Tour',
  verified: true
};

export const PackageRatingReview: React.FC<PackageRatingReviewProps> = ({
  packageId,
  packageName,
  language
}) => {
  const [showFullReview, setShowFullReview] = useState(false);
  const review = PACKAGE_REVIEWS[packageId] || DEFAULT_REVIEW;
  const isUrdu = language === 'ur';

  return (
    <div className="bg-white p-3.5 rounded-[20px] border border-gray-100 shadow-sm my-3 hover:border-blue-200 transition-all">
      
      {/* Top Rating Score Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div className="flex text-[#D4AF37]">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
            ))}
          </div>
          <span className="font-extrabold text-xs text-[#0B1F3A]">
            {review.rating.toFixed(1)}
          </span>
          <span className="text-[10px] text-gray-500 font-semibold">
            ({review.reviewCount} {isUrdu ? 'ریویوز' : 'reviews'})
          </span>
        </div>

        <div className="inline-flex items-center gap-1 text-[9px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
          <ThumbsUp className="w-3 h-3 text-emerald-600" />
          <span>{review.satisfactionRate}% {isUrdu ? 'رضامندی' : 'Satisfied'}</span>
        </div>
      </div>

      {/* Customer Review Quote Snippet */}
      <div className="mt-2 pt-2 border-t border-gray-100">
        <p className="text-[11px] text-gray-700 italic leading-snug line-clamp-2">
          "{review.quote}"
        </p>

        {/* Reviewer Meta */}
        <div className="flex items-center justify-between mt-2 text-[10px] text-gray-500">
          <span className="font-bold text-[#0B1F3A] flex items-center gap-1">
            <UserCheck className="w-3 h-3 text-[#1E5EFF]" />
            {review.topReviewer}
            <span className="text-gray-400 font-normal">({review.topReviewerLocation})</span>
          </span>

          <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <CheckCircle2 className="w-2.5 h-2.5" />
            {isUrdu ? 'تصدیق شدہ' : 'Verified'}
          </span>
        </div>
      </div>

    </div>
  );
};
