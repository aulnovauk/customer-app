export interface Address {
  id: number;
  type: 'home' | 'work' | 'other';
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Service {
  name: string;
  duration: string;
  price: string;
  category?: string;
  description?: string;
}

export interface Salon {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  distance: string;
  location: string;
  lat?: number;
  lng?: number;
  services: Service[];
  verified: boolean;
  amenities: string[];
  isOpen: boolean;
  openUntil: string;
  nextSlots: string[];
  priceRange?: string;
  tags?: string[];
}

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  salonId: number;
  salonName: string;
  salonImage?: string;
  service: string;
  stylist?: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: BookingStatus;
  notes?: string;
}

export type ProductCategory = 'all' | 'skincare' | 'makeup' | 'haircare' | 'tools';

export interface CartItem {
  productId: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  loyaltyPoints: number;
  memberSince: string;
  preferredTheme?: string;
  defaultAddressId?: number;
}

export interface Notification {
  id: string;
  type: 'booking_reminder' | 'offer' | 'new_salon' | 'booking_confirmed' | 'booking_cancelled';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  bookingId?: string;
}

export type SalonGender = 'women' | 'men' | 'unisex';

export interface SalonData {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  distanceKm: number;
  category: string;
  genderType: SalonGender;
  openUntil: string;
  price: string;
  services: string[];
  trending?: boolean;
  phone?: string;
  website?: string;
}
