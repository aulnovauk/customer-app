import { ArrowLeft, Star, Clock, MapPin, Filter, SlidersHorizontal, Flame, Eye, Navigation, ChevronDown } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ChatButton } from "../components/ChatButton";
import { ChatDrawer } from "../components/ChatDrawer";

// Salon data - in production this would come from an API
const allSalons = [
  {
    id: 1,
    name: "Luxe Beauty Studio",
    image: "https://images.unsplash.com/photo-1759134155377-4207d89b39ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBpbnRlcmlvciUyMGx1eHVyeSUyMG1vZGVybnxlbnwxfHx8fDE3NzM2NzU0MjN8MA&ixlib=rb-4.1.0&q=80&w=600",
    rating: 4.9,
    reviews: 234,
    distance: "0.8 km",
    category: "Hair & Makeup",
    openUntil: "8:00 PM",
    price: "From ₹1,200",
    recentlyViewed: true,
    nearYou: true,
    trending: true,
    isOpen: true,
    nextSlots: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"],
    services: [
      { name: "Haircut & Styling", duration: "45 mins", price: "₹1,200" },
      { name: "Hair Color", duration: "90 mins", price: "₹2,500" },
      { name: "Makeup", duration: "60 mins", price: "₹3,000" },
    ],
  },
  {
    id: 2,
    name: "Serenity Spa & Salon",
    image: "https://images.unsplash.com/photo-1760862652442-e8ff7ebdd2f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwbW9kZXJuJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzM3MDA0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 189,
    distance: "1.2 km",
    category: "Spa & Wellness",
    openUntil: "9:00 PM",
    price: "From ₹1,800",
    recentlyViewed: false,
    nearYou: true,
    trending: true,
    isOpen: true,
    nextSlots: ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"],
    services: [
      { name: "Swedish Massage", duration: "60 mins", price: "₹1,800" },
      { name: "Deep Tissue Massage", duration: "75 mins", price: "₹2,200" },
      { name: "Facial Treatment", duration: "45 mins", price: "₹1,500" },
    ],
  },
  {
    id: 3,
    name: "Glow & Beauty Bar",
    image: "https://images.unsplash.com/photo-1758188753373-5b01a0fc6d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaGFpciUyMHNhbG9uJTIwaW50ZXJpb3IlMjBsdXh1cnl8ZW58MXx8fHwxNzczNzAwNDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5.0,
    reviews: 98,
    distance: "1.8 km",
    category: "Skincare & Facials",
    openUntil: "7:00 PM",
    price: "From ₹1,500",
    recentlyViewed: false,
    nearYou: true,
    trending: true,
    isOpen: false,
    nextSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"],
    services: [
      { name: "Hydrating Facial", duration: "50 mins", price: "₹1,500" },
      { name: "Deep Cleansing", duration: "40 mins", price: "₹1,200" },
      { name: "Glow Treatment", duration: "60 mins", price: "₹2,000" },
    ],
  },
  {
    id: 4,
    name: "Glamour Nails Studio",
    image: "https://images.unsplash.com/photo-1769034260387-39fa07f0c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBuYWlsJTIwc2Fsb24lMjBpbnRlcmlvciUyMGNoaWN8ZW58MXx8fHwxNzczNzAwNDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviews: 156,
    distance: "2.1 km",
    category: "Nails & Beauty",
    openUntil: "8:30 PM",
    price: "From ₹800",
    recentlyViewed: false,
    nearYou: true,
    trending: false,
    isOpen: true,
    nextSlots: ["11:30 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"],
    services: [
      { name: "Gel Manicure", duration: "45 mins", price: "₹800" },
      { name: "Pedicure Deluxe", duration: "60 mins", price: "₹1,200" },
      { name: "Nail Art", duration: "30 mins", price: "₹500" },
    ],
  },
  {
    id: 5,
    name: "Divine Hair Lounge",
    image: "https://images.unsplash.com/photo-1763612812693-9b021dfa016b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGJlYXV0eSUyMHNhbG9uJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzczNzAwNDMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 312,
    distance: "1.5 km",
    category: "Hair Styling",
    openUntil: "8:00 PM",
    price: "From ₹1,100",
    recentlyViewed: true,
    nearYou: false,
    trending: false,
    isOpen: true,
    nextSlots: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM"],
    services: [
      { name: "Premium Haircut", duration: "40 mins", price: "₹1,100" },
      { name: "Hair Color", duration: "90 mins", price: "₹2,800" },
      { name: "Hair Styling", duration: "30 mins", price: "₹800" },
    ],
  },
  {
    id: 6,
    name: "Bliss Wellness Spa",
    image: "https://images.unsplash.com/photo-1762631203805-88841687ab4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMHNwYSUyMGludGVyaW9yJTIwc2VyZW5lJTIwbW9kZXJufGVufDF8fHx8MTc3MzcwMDQzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 267,
    distance: "0.9 km",
    category: "Spa & Massage",
    openUntil: "9:30 PM",
    price: "From ₹2,000",
    recentlyViewed: true,
    nearYou: false,
    trending: false,
    isOpen: true,
    nextSlots: ["02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"],
    services: [
      { name: "Aromatherapy Massage", duration: "75 mins", price: "₹2,000" },
      { name: "Hot Stone Massage", duration: "90 mins", price: "₹2,500" },
      { name: "Spa Package", duration: "120 mins", price: "₹3,500" },
    ],
  },
  {
    id: 7,
    name: "Radiance Beauty Studio",
    image: "https://images.unsplash.com/photo-1760862652442-e8ff7ebdd2f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3BhJTIwc2Fsb24lMjBpbnRlcmlvciUyMG1pbml0YWxpc3R8ZW58MXx8fHwxNzczNzAwNDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5.0,
    reviews: 421,
    distance: "1.3 km",
    category: "Premium Salon",
    openUntil: "10:00 PM",
    price: "From ₹1,600",
    recentlyViewed: false,
    nearYou: false,
    trending: true,
    isOpen: true,
    nextSlots: ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"],
    services: [
      { name: "Premium Hair Styling", duration: "50 mins", price: "₹1,600" },
      { name: "Balayage", duration: "120 mins", price: "₹4,500" },
      { name: "Keratin Treatment", duration: "90 mins", price: "₹3,800" },
    ],
  },
  {
    id: 8,
    name: "Elegance Beauty Lounge",
    image: "https://images.unsplash.com/photo-1711517479380-9fa1735be261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwbW9kZXJuJTIwSW5kaWF8ZW58MXx8fHwxNzczNjgzMTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6,
    reviews: 145,
    distance: "2.5 km",
    category: "Full Service Salon",
    openUntil: "7:30 PM",
    price: "From ₹1,000",
    recentlyViewed: false,
    nearYou: true,
    trending: false,
    isOpen: false,
    nextSlots: ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"],
    services: [
      { name: "Classic Haircut", duration: "35 mins", price: "₹1,000" },
      { name: "Express Facial", duration: "30 mins", price: "₹900" },
      { name: "Basic Manicure", duration: "40 mins", price: "₹700" },
    ],
  },
];

const sortOptions = [
  { value: "distance", label: "Nearest First" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviewed" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

// Helper function to filter slots that are after current time
const getAvailableSlots = (slots: string[]) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  return slots.filter(slot => {
    // Parse slot time (e.g., "09:00 AM" or "02:30 PM")
    const [time, period] = slot.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    // Convert to 24-hour format
    let slotHour = hours;
    if (period === 'PM' && hours !== 12) {
      slotHour = hours + 12;
    } else if (period === 'AM' && hours === 12) {
      slotHour = 0;
    }
    
    // Compare with current time
    if (slotHour > currentHour) return true;
    if (slotHour === currentHour && minutes > currentMinute) return true;
    return false;
  });
};

export function SalonsList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "nearby"; // recently-viewed, nearby, trending
  
  const [sortBy, setSortBy] = useState("distance");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<{ name: string; image: string; isOnline: boolean } | null>(null);

  const handleChatClick = (e: React.MouseEvent, salonName: string, salonImage: string, isOnline: boolean) => {
    e.stopPropagation(); // Prevent card navigation
    setSelectedSalon({ name: salonName, image: salonImage, isOnline });
    setChatOpen(true);
  };

  // Get title and icon based on type
  const getHeaderInfo = () => {
    switch (type) {
      case "recently-viewed":
        return { title: "Recently viewed", icon: Eye };
      case "trending":
        return { title: "Trending", icon: Flame };
      default:
        return { title: "Near you", icon: Navigation };
    }
  };

  const { title, icon: Icon } = getHeaderInfo();

  // Filter salons based on type
  const getFilteredSalons = () => {
    switch (type) {
      case "recently-viewed":
        return allSalons.filter(s => s.recentlyViewed);
      case "trending":
        return allSalons.filter(s => s.trending);
      default:
        return allSalons.filter(s => s.nearYou);
    }
  };

  // Sort salons
  const getSortedSalons = () => {
    const filtered = [...getFilteredSalons()];
    
    switch (sortBy) {
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "reviews":
        return filtered.sort((a, b) => b.reviews - a.reviews);
      case "price-low":
        return filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceA - priceB;
        });
      case "price-high":
        return filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceB - priceA;
        });
      default: // distance
        return filtered.sort((a, b) => {
          const distA = parseFloat(a.distance);
          const distB = parseFloat(b.distance);
          return distA - distB;
        });
    }
  };

  const salons = getSortedSalons();

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Header */}
      <div 
        className="sticky top-0 z-50 px-5 py-4 border-b backdrop-blur-xl transition-colors duration-300"
        style={{ 
          backgroundColor: 'var(--card-glass)',
          borderColor: 'var(--border-light)' 
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full transition-all active:scale-95"
            style={{ backgroundColor: 'var(--muted)' }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
          </button>

          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-rose-500" />
            <h1 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
              {title}
            </h1>
          </div>

          <button
            onClick={() => navigate("/map")}
            className="p-2 rounded-full transition-all active:scale-95"
            style={{ backgroundColor: 'var(--muted)' }}
          >
            <MapPin className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
          </button>
        </div>

        {/* Sort & Filter */}
        <div className="flex items-center gap-2">
          {/* Sort Button */}
          <div className="relative flex-1">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl transition-all border"
              style={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)'
              }}
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                <span className="text-sm font-medium">
                  {sortOptions.find(o => o.value === sortBy)?.label}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} style={{ color: 'var(--muted-foreground)' }} />
            </button>

            {/* Sort Dropdown */}
            {showSortMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-xl border overflow-hidden z-50"
                style={{ 
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)'
                }}
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm transition-colors"
                    style={{ 
                      backgroundColor: sortBy === option.value ? 'var(--muted)' : 'transparent',
                      color: sortBy === option.value ? 'var(--foreground)' : 'var(--muted-foreground)'
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Filter Button */}
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all border"
            style={{ 
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              color: 'var(--foreground)'
            }}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Results count */}
        <div className="mt-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>
          {salons.length} {salons.length === 1 ? 'salon' : 'salons'} found
        </div>
      </div>

      {/* Salons Grid */}
      <div className="px-5 py-6 pb-32">
        <div className="grid grid-cols-1 gap-5">
          {salons.map((salon, index) => (
            <motion.div
              key={salon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/salon/${salon.id}`)}
              className="cursor-pointer"
            >
              {/* Salon Image */}
              <div 
                className="relative w-full h-48 mb-3 overflow-hidden"
                style={{ 
                  borderRadius: '20px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
              >
                <ImageWithFallback
                  src={salon.image}
                  alt={salon.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Chat Button - Top Left */}
                <div className="absolute top-3 left-3 z-10">
                  <ChatButton
                    isOnline={salon.isOpen} // Use isOpen as online status
                    onClick={(e) => handleChatClick(e, salon.name, salon.image, salon.isOpen)}
                  />
                </div>

                {/* Distance */}
                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    {salon.distance}
                  </div>
                </div>
              </div>

              {/* Salon Info */}
              <div className="px-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-black text-base mb-1.5" style={{ color: 'var(--foreground)' }}>
                      {salon.name}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      {salon.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg flex-shrink-0 ml-3" style={{ backgroundColor: 'var(--background-elevated)' }}>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-black text-sm" style={{ color: 'var(--foreground)' }}>{salon.rating}</span>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>({salon.reviews})</span>
                  </div>
                </div>

                {/* Availability Section - ABOVE SERVICES */}
                <div className="mb-3">
                  {/* Open/Close Status */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <div 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ 
                        backgroundColor: salon.isOpen ? '#10B981' : '#EF4444',
                        boxShadow: salon.isOpen ? '0 0 6px rgba(16, 185, 129, 0.6)' : '0 0 6px rgba(239, 68, 68, 0.6)'
                      }}
                    />
                    <span 
                      className="text-xs font-bold"
                      style={{ color: salon.isOpen ? '#10B981' : '#EF4444' }}
                    >
                      {salon.isOpen ? 'Open' : 'Closed'}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      • Closes at {salon.openUntil}
                    </span>
                  </div>

                  {/* Time Slots - Compact Pills */}
                  <div className="relative">
                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-1">
                      {getAvailableSlots(salon.nextSlots).slice(0, 4).map((slot, idx) => (
                        <motion.button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/salon/${salon.id}?time=${encodeURIComponent(slot)}`);
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-shrink-0 px-2 py-0.5 rounded-md text-[11px] font-bold transition-all duration-200"
                          style={{
                            background: salon.isOpen 
                              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                              : 'var(--muted)',
                            color: salon.isOpen ? '#FFFFFF' : 'var(--muted-foreground)',
                            boxShadow: salon.isOpen 
                              ? '0 1px 6px rgba(16, 185, 129, 0.25)'
                              : '0 1px 3px rgba(0, 0, 0, 0.08)',
                          }}
                        >
                          {slot}
                        </motion.button>
                      ))}
                      
                      {/* See More Link */}
                      {getAvailableSlots(salon.nextSlots).length > 4 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/salon/${salon.id}?tab=booking`);
                          }}
                          className="flex-shrink-0 text-[11px] font-bold"
                          style={{
                            color: 'var(--primary)',
                          }}
                        >
                          See more
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Services List */}
                {salon.services && salon.services.length > 0 && (
                  <div className="mb-3">
                    <div className="space-y-0 -mx-1">
                      {salon.services.slice(0, 2).map((service, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/salon/${salon.id}?service=${encodeURIComponent(service.name)}&tab=services`);
                          }}
                          className="w-full flex items-center justify-between transition-all duration-200 px-3 py-3"
                          style={{
                            backgroundColor: idx % 2 === 0 ? 'var(--muted)' : 'transparent'
                          }}
                        >
                          <div className="flex-1 text-left">
                            <p className="font-bold text-sm mb-0.5" style={{ color: 'var(--foreground)' }}>{service.name}</p>
                            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{service.duration}</p>
                          </div>
                          <p className="text-base font-normal" style={{ color: 'var(--foreground)' }}>
                            from {service.price}
                          </p>
                        </button>
                      ))}
                    </div>
                    
                    {/* See all services link */}
                    {salon.services.length > 2 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/salon/${salon.id}?tab=services`);
                        }}
                        className="w-full text-left px-2 pt-3 pb-1"
                      >
                        <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
                          See all {salon.services.length} services
                        </span>
                      </button>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-1.5" style={{ color: 'var(--muted-foreground)' }}>
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Open until {salon.openUntil}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Drawer */}
      {selectedSalon && (
        <ChatDrawer
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          salonName={selectedSalon.name}
          salonImage={selectedSalon.image}
          isOnline={selectedSalon.isOnline}
        />
      )}
    </div>
  );
}