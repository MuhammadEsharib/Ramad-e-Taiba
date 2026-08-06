export type Currency = 'PKR' | 'USD' | 'SAR' | 'AED' | 'EUR';
export type Language = 'en' | 'ur';

export interface CurrencyRate {
  symbol: string;
  rateToPKR: number; // 1 PKR = 1/rateToPKR in target currency
}

export interface UmrahPackage {
  id: string;
  title: string;
  titleUr?: string;
  type: 'economy' | 'executive' | 'vip' | 'ramadan';
  durationDays: number;
  pricePKR: number;
  popular?: boolean;
  featuredImage: string;
  makkahHotel: {
    name: string;
    stars: number;
    distance: string;
    distanceUr?: string;
  };
  madinahHotel: {
    name: string;
    stars: number;
    distance: string;
    distanceUr?: string;
  };
  inclusions: string[];
  inclusionsUr?: string[];
  highlights: string[];
  highlightsUr?: string[];
  itinerary: {
    day: string;
    title: string;
    titleUr?: string;
    description: string;
    descriptionUr?: string;
  }[];
}

export interface TourPackage {
  id: string;
  title: string;
  titleUr?: string;
  destination: string;
  destinationUr?: string;
  country: string;
  duration: string;
  durationUr?: string;
  pricePKR: number;
  badge?: string;
  badgeUr?: string;
  image: string;
  highlights: string[];
  highlightsUr?: string[];
  inclusions: string[];
  inclusionsUr?: string[];
  hotels: string;
  hotelsUr?: string;
  flightsIncluded: boolean;
  visaAssistance: boolean;
  itinerary: {
    day: string;
    title: string;
    titleUr?: string;
    description: string;
    descriptionUr?: string;
  }[];
}

export interface Destination {
  id: string;
  name: string;
  nameUr?: string;
  country: string;
  countryUr?: string;
  category: 'holy' | 'international' | 'domestic';
  image: string;
  flightTimeFromKarachi: string;
  flightTimeUr?: string;
  visaRequired: string;
  visaRequiredUr?: string;
  bestSeason: string;
  bestSeasonUr?: string;
  highlights: string[];
  highlightsUr?: string[];
  startingPricePKR: number;
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  titleUr?: string;
  shortDesc: string;
  shortDescUr?: string;
  fullDesc: string;
  fullDescUr?: string;
  features: string[];
  featuresUr?: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  nameUr?: string;
  location: string;
  locationUr?: string;
  avatar: string;
  rating: number;
  serviceType: string;
  serviceTypeUr?: string;
  review: string;
  reviewUr?: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleUr?: string;
  category: 'umrah' | 'tours' | 'hotels' | 'clients';
  imageUrl: string;
  location: string;
  locationUr?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  questionUr?: string;
  answerUr?: string;
  category: 'umrah' | 'visa' | 'flights' | 'payment';
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  travelType: string;
  selectedPackage?: string;
  travelDate: string;
  travelersCount: number;
  budgetRange: string;
  notes: string;
}

