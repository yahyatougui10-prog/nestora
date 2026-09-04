export type CancellationPolicy = 'flexible' | 'moderate' | 'strict';

export interface Property {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  type: PropertyType;
  category: string;
  rating: number;
  reviews: number;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  price: number;
  weeklyPrice?: number;
  monthlyPrice?: number;
  cleaningFee: number;
  serviceFee: number;
  image: string;
  images: string[];
  gallery: PropertyImage[];
  coverImage: string;
  description: string;
  amenities: string[];
  host: Host;
  isGuestFavorite: boolean;
  isVerified: boolean;
  isInstantBook: boolean;
  cancellationPolicy: CancellationPolicy;
  availableDates: DateRange[];
  createdAt: string;
}

export type PropertyType =
  | 'Apartment'
  | 'Villa'
  | 'House'
  | 'Cabin'
  | 'Riad'
  | 'Hotel'
  | 'Guesthouse'
  | 'Resort'
  | 'Luxury Estate'
  | 'Architectural Home'
  | 'Private Palace'
  | 'Luxury Camp'
  | 'Entire home'
  | 'Entire villa'
  | 'Luxury Suite';

export type Amenity = string;

export interface Host {
  id: string;
  name: string;
  avatar: string;
  isSuperhost: boolean;
  hostingSince: string;
  rating: number;
  reviews: number;
  languages: string[];
  responseRate: number;
  responseTime: string;
  properties: string[];
}

export interface DateRange {
  start: string;
  end: string;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  cleanliness: number;
  accuracy: number;
  communication: number;
  location: number;
  checkIn: number;
  value: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  languages: string[];
  preferences: string[];
  notifications: boolean;
  bookingNotifications: boolean;
  messageNotifications: boolean;
}

export interface Favorite {
  propertyId: string;
  addedAt: string;
}

export interface Trip {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  location: string;
  hostName: string;
  hostAvatar: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: TripStatus;
  createdAt: string;
}

export type TripStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  propertyId: string;
  propertyName: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  messages: Message[];
  lastMessage?: Message;
  updatedAt: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  location: string;
  hostName: string;
  hostAvatar: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  subtotal: number;
  cleaningFee: number;
  serviceFee: number;
  total: number;
  status: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  paymentMethod: string;
  reservationId: string;
  createdAt: string;
}

export interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  priceRange: [number, number];
  propertyTypes: PropertyType[];
  ratings: number[];
  amenities: string[];
  sortBy: SortOption;
}

export type SortOption = 'recommended' | 'priceLow' | 'priceHigh' | 'rating' | 'reviews';

export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

export interface ListingData {
  name: string;
  type: PropertyType;
  location: string;
  city: string;
  country: string;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: string[];
  description: string;
  price: number;
  cleaningFee: number;
  images: string[];
  coverImage: string;
}

export interface ThemeMode {
  mode: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
}

export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  rtl: boolean;
  currency: string;
  currencySymbol: string;
}

export const LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English', rtl: false, currency: 'USD', currencySymbol: '$' },
  { code: 'fr', name: 'French', nativeName: 'Français', rtl: false, currency: 'EUR', currencySymbol: '€' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true, currency: 'MAD', currencySymbol: 'د.م.' },
];

export const CURRENCIES: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  MAD: { symbol: 'د.م.', rate: 10.5 },
};

export type PropertyImageCategory =
  | 'Exterior'
  | 'Living spaces'
  | 'Bedrooms'
  | 'Bathrooms'
  | 'Kitchen'
  | 'Outdoor'
  | 'Pool'
  | 'Views'
  | 'Amenities'
  | 'Dining'
  | 'Workspace'
  | 'Neighborhood'
  | 'Night view';

export interface PropertyImage {
  url: string;
  caption: string;
  category: PropertyImageCategory;
  isCover: boolean;
}

export type OfferStatus = 'pending' | 'countered' | 'accepted' | 'rejected' | 'expired' | 'cancelled';

export interface Offer {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  guestId: string;
  guestName: string;
  guestAvatar: string;
  originalPrice: number;
  offeredPrice: number;
  nights: number;
  message: string;
  status: OfferStatus;
  createdAt: string;
  expiresAt: string;
  timeline: { status: OfferStatus; at: string; note?: string }[];
}

export type NegotiationParty = 'guest' | 'host';

export interface NegotiationMessage {
  id: string;
  sender: NegotiationParty;
  content: string;
  timestamp: string;
  offerId?: string;
  read: boolean;
}

export interface Negotiation {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  guestId: string;
  guestName: string;
  guestAvatar: string;
  originalPrice: number;
  messages: NegotiationMessage[];
  activeOffer?: Offer;
  updatedAt: string;
}

export type NotificationType = 'booking' | 'negotiation' | 'message' | 'host' | 'review';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  actionHref?: string;
}

export type ReportReason = 'Fraud' | 'Incorrect information' | 'Harassment' | 'Inappropriate content' | 'Safety concern' | 'Other';

export type ReportTarget = 'listing' | 'message' | 'host' | 'review';

export interface Report {
  id: string;
  targetType: ReportTarget;
  targetId: string;
  reason: ReportReason;
  details: string;
  reporterId: string;
  createdAt: string;
  status: 'open' | 'reviewing' | 'resolved' | 'dismissed';
}

export type ListingStatus = 'draft' | 'under_review' | 'published' | 'paused' | 'rejected' | 'suspended';
