import { useState, useRef, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal, List, Star, MapPin as MapPinIcon, ChevronDown, Check, X } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Mock salon data with coordinates
const salons = [
  {
    id: 1,
    name: "Alchemic Beauty Studio",
    image: "https://images.unsplash.com/photo-1638964327749-53436bcccdca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGx1eHVyeSUyMHNhbG9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczNjgzMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 78,
    distance: "12.2 mi",
    location: "Delhi",
    lat: 28.5,
    lng: 77.08,
    services: [
      { name: "Hair Bonding", duration: "45 mins", price: "₹1,100" },
      { name: "Hair Colour", duration: "30 mins", price: "₹500" },
      { name: "Tape in Hair Unit", duration: "30 mins", price: "₹800" },
    ],
    verified: true,
    amenities: ["WiFi", "Parking", "AC"],
    isOpen: true,
    openUntil: "8:00 PM",
    nextSlots: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"],
  },
  {
    id: 2,
    name: "Radiance Hair and Skin Clinic",
    image: "https://images.unsplash.com/photo-1760862652442-e8ff7ebdd2f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwbW9kZXJuJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzM3MDA0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 180,
    distance: "12.2 mi",
    location: "Chittaranjan Park, New Delhi",
    lat: 28.52,
    lng: 77.1,
    services: [
      { name: "Hair Bonding", duration: "45 mins", price: "₹1,100" },
      { name: "Hair Colour", duration: "30 mins", price: "₹500" },
      { name: "Tape in Hair Unit", duration: "30 mins", price: "₹800" },
    ],
    verified: true,
    amenities: ["WiFi", "AC", "Card Payment"],
    isOpen: true,
    openUntil: "9:00 PM",
    nextSlots: ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"],
  },
  {
    id: 3,
    name: "Luxe Beauty Studio",
    image: "https://images.unsplash.com/photo-1711517479380-9fa1735be261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwbW9kZXJuJTIwSW5kaWF8ZW58MXx8fHwxNzczNjgzMTg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5.0,
    reviews: 234,
    distance: "18.5 mi",
    location: "Connaught Place, New Delhi",
    lat: 28.48,
    lng: 77.12,
    services: [
      { name: "Full Body Massage", duration: "60 mins", price: "₹2,500" },
      { name: "Swedish Massage", duration: "45 mins", price: "₹1,800" },
    ],
    verified: true,
    amenities: ["WiFi", "Parking", "AC", "Card Payment"],
    isOpen: false,
    openUntil: "7:00 PM",
    nextSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"],
  },
  {
    id: 4,
    name: "Serenity Spa & Salon",
    image: "https://images.unsplash.com/photo-1758188753373-5b01a0fc6d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaGFpciUyMHNhbG9uJTIwaW50ZXJpb3IlMjBsdXh1cnl8ZW58MXx8fHwxNzczNzAwNDMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviews: 189,
    distance: "21.3 mi",
    location: "Vasant Kunj, New Delhi",
    lat: 28.51,
    lng: 77.06,
    services: [
      { name: "Facial Treatment", duration: "60 mins", price: "₹1,800" },
      { name: "Deep Cleansing", duration: "45 mins", price: "₹1,500" },
    ],
    verified: false,
    amenities: ["WiFi", "AC"],
    isOpen: true,
    openUntil: "8:30 PM",
    nextSlots: ["11:00 AM", "12:30 PM", "02:00 PM", "03:30 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"],
  },
  {
    id: 5,
    name: "Glow & Beauty Bar",
    image: "https://images.unsplash.com/photo-1769034260387-39fa07f0c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBuYWlsJTIwc2Fsb24lMjBpbnRlcmlvciUyMGNoaWN8ZW58MXx8fHwxNzczNzAwNDMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5.0,
    reviews: 98,
    distance: "19.8 mi",
    location: "Saket, New Delhi",
    lat: 28.49,
    lng: 77.11,
    services: [
      { name: "Gel Manicure", duration: "45 mins", price: "₹1,200" },
      { name: "Pedicure Deluxe", duration: "60 mins", price: "₹1,500" },
    ],
    verified: true,
    amenities: ["Parking", "AC", "Card Payment"],
    isOpen: true,
    openUntil: "10:00 PM",
    nextSlots: ["09:30 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"],
  },
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

const typeOptions = ["All", "Salon", "Spa", "Clinic", "Studio"];
const amenityOptions = ["WiFi", "Parking", "AC", "Card Payment", "Home Service"];
const priceOptions = ["₹", "₹₹", "₹₹₹", "₹₹₹₹"];

export function Explore() {
  const navigate = useNavigate();
  const [sheetHeight, setSheetHeight] = useState(55); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("Best match");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Handle drag start
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setStartY(clientY);
    setStartHeight(sheetHeight);
  };

  // Handle drag move
  const handleDragMove = (e: TouchEvent | MouseEvent) => {
    if (!isDragging) return;

    const clientY = "touches" in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
    const deltaY = startY - clientY;
    const viewportHeight = window.innerHeight;
    const deltaPercent = (deltaY / viewportHeight) * 100;

    let newHeight = startHeight + deltaPercent;
    newHeight = Math.max(20, Math.min(90, newHeight));
    setSheetHeight(newHeight);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("touchmove", handleDragMove);
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("touchend", handleDragEnd);
      window.addEventListener("mouseup", handleDragEnd);

      return () => {
        window.removeEventListener("touchmove", handleDragMove);
        window.removeEventListener("mousemove", handleDragMove);
        window.removeEventListener("touchend", handleDragEnd);
        window.removeEventListener("mouseup", handleDragEnd);
      };
    }
  }, [isDragging, startY, startHeight]);

  // Filter salons
  const filteredSalons = salons.filter((salon) => {
    if (onlyVerified && !salon.verified) return false;
    if (selectedAmenities.length > 0) {
      const hasAllAmenities = selectedAmenities.every((amenity) => salon.amenities.includes(amenity));
      if (!hasAllAmenities) return false;
    }
    return true;
  });

  const clearAllFilters = () => {
    setSelectedType("All");
    setSelectedAmenities([]);
    setSelectedPrice([]);
    setOnlyVerified(false);
  };

  const handleToggleFilters = useCallback(() => setShowFilters((f) => !f), []);
  const handleToggleSortBy = useCallback(() => setSortBy((s) => s === "Best match" ? "Distance" : "Best match"), []);
  const handleToggleVerified = useCallback(() => setOnlyVerified((v) => !v), []);

  const handleSalonClickData = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const id = parseInt((e.currentTarget as HTMLElement).dataset.salonId ?? "0", 10);
    navigate(`/salon/${id}`);
  }, [navigate]);

  const handleTypeClickData = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedType(e.currentTarget.dataset.typeId ?? "");
  }, []);

  const handleAmenityClickData = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const amenity = e.currentTarget.dataset.amenity ?? "";
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  }, []);

  const handlePriceClickData = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const price = e.currentTarget.dataset.price ?? "";
    setSelectedPrice((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  }, []);

  const handleSlotClickData = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const salonId = parseInt(e.currentTarget.dataset.salonId ?? "0", 10);
    const slot = e.currentTarget.dataset.slot ?? "";
    navigate(`/salon/${salonId}?time=${encodeURIComponent(slot)}`);
  }, [navigate]);

  const handleSeeMoreClickData = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const salonId = parseInt(e.currentTarget.dataset.salonId ?? "0", 10);
    navigate(`/salon/${salonId}?tab=booking`);
  }, [navigate]);

  const handleServiceClickData = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const salonId = parseInt(e.currentTarget.dataset.salonId ?? "0", 10);
    const serviceName = e.currentTarget.dataset.serviceName ?? "";
    navigate(`/salon/${salonId}?service=${encodeURIComponent(serviceName)}&tab=services`);
  }, [navigate]);

  return (
    <div className="h-screen overflow-hidden max-w-[390px] mx-auto relative transition-colors duration-300" style={{ backgroundColor: 'var(--muted)' }}>
      {/* Map Background */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-background-pastel)' }}>
        <div className="relative w-full h-full">
          {/* Map placeholder with patterns */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="road" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 0 50 L 100 50" style={{ stroke: 'var(--color-neutral-medium)' }} strokeWidth="1" fill="none" />
                <path d="M 50 0 L 50 100" style={{ stroke: 'var(--color-neutral-medium)' }} strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#road)" />
          </svg>

          {/* Location markers */}
          {filteredSalons.map((salon, idx) => (
            <div
              key={salon.id}
              className="absolute"
              style={{
                left: `${25 + idx * 15}%`,
                top: `${20 + (idx % 3) * 20}%`,
              }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-gray-900 text-white px-3 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center gap-1 mb-1">
                  {salon.rating}
                </div>
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12z"
                    style={{ fill: 'var(--color-neutral-dark)' }}
                  />
                  <circle cx="12" cy="12" r="6" fill="white" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Search Bar */}
      <div 
        className="absolute top-0 left-0 right-0 z-20 backdrop-blur-xl border-b shadow-sm transition-colors duration-300"
        style={{ 
          backgroundColor: 'var(--surface-glass-light)',
          borderColor: 'var(--border-light)' 
        }}
      >
        <div className="px-5 pt-12 pb-4">
          <div className="flex items-center gap-3">
            <div 
              className="flex-1 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-md border transition-colors duration-300"
              style={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border-light)' 
              }}
            >
              <Search className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
              <div className="flex-1">
                <p className="text-base font-bold" style={{ color: 'var(--foreground)' }}>All treatments</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Current location</p>
              </div>
            </div>

            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md border transition-colors duration-300"
              style={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border-light)' 
              }}
            >
              <List className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="absolute left-0 right-0 bottom-0 z-30 rounded-t-[32px] shadow-2xl transition-colors duration-300"
        style={{ 
          height: `${sheetHeight}%`, 
          transition: isDragging ? "none" : "height 0.3s ease",
          backgroundColor: 'var(--card)' 
        }}
      >
        {/* Drag Handle */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
          onTouchStart={handleDragStart}
          onMouseDown={handleDragStart}
        >
          <div className="w-12 h-1.5 rounded-full" style={{ backgroundColor: 'var(--border)' }} />
        </div>

        {/* Filter Buttons */}
        <div className="px-5 py-4 border-b transition-colors duration-300" style={{ borderColor: 'var(--border-light)' }}>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={handleToggleFilters}
              className={`px-4 py-2 border rounded-full flex items-center gap-2 shadow-sm flex-shrink-0 transition-colors duration-300`}
              style={{ 
                backgroundColor: showFilters ? 'var(--muted)' : 'var(--card)',
                borderColor: showFilters ? 'var(--foreground)' : 'var(--border)' 
              }}
            >
              <SlidersHorizontal className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
            </button>

            <button
              onClick={handleToggleSortBy}
              className="px-4 py-2 border rounded-full flex items-center gap-2 shadow-sm flex-shrink-0 transition-colors duration-300"
              style={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)' 
              }}
            >
              <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{sortBy}</span>
              <ChevronDown className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
            </button>

            <button 
              className="px-4 py-2 border rounded-full flex items-center gap-2 shadow-sm flex-shrink-0 transition-colors duration-300"
              style={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)' 
              }}
            >
              <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Amenities</span>
              <ChevronDown className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
            </button>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="px-5 py-4 border-b max-h-64 overflow-y-auto scrollbar-hide transition-colors duration-300" style={{ borderColor: 'var(--border-light)', backgroundColor: 'var(--muted)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black" style={{ color: 'var(--foreground)' }}>Filters</h3>
              <button onClick={clearAllFilters} className="text-rose-500 text-sm font-bold">
                Clear all
              </button>
            </div>

            {/* Type Filter */}
            <div className="mb-4">
              <p className="text-xs font-bold uppercase mb-2" style={{ color: 'var(--muted-foreground)' }}>Type</p>
              <div className="flex gap-2 flex-wrap">
                {typeOptions.map((type) => (
                  <button
                    key={type}
                    data-type-id={type} onClick={handleTypeClickData}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all`}
                    style={
                      selectedType === type 
                        ? { backgroundColor: 'var(--foreground)', color: 'var(--background)' }
                        : { backgroundColor: 'var(--card)', color: 'var(--foreground)', border: '1px solid var(--border)' }
                    }
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities Filter */}
            <div className="mb-4">
              <p className="text-xs font-bold uppercase mb-2" style={{ color: 'var(--muted-foreground)' }}>Amenities</p>
              <div className="flex gap-2 flex-wrap">
                {amenityOptions.map((amenity) => (
                  <button
                    key={amenity}
                    data-amenity={amenity} onClick={handleAmenityClickData}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1`}
                    style={
                      selectedAmenities.includes(amenity)
                        ? { backgroundColor: 'var(--foreground)', color: 'var(--background)' }
                        : { backgroundColor: 'var(--card)', color: 'var(--foreground)', border: '1px solid var(--border)' }
                    }
                  >
                    {selectedAmenities.includes(amenity) && <Check className="w-3 h-3" />}
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-4">
              <p className="text-xs font-bold uppercase mb-2" style={{ color: 'var(--muted-foreground)' }}>Price</p>
              <div className="flex gap-2">
                {priceOptions.map((price) => (
                  <button
                    key={price}
                    data-price={price} onClick={handlePriceClickData}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all`}
                    style={
                      selectedPrice.includes(price)
                        ? { backgroundColor: 'var(--foreground)', color: 'var(--background)' }
                        : { backgroundColor: 'var(--card)', color: 'var(--foreground)', border: '1px solid var(--border)' }
                    }
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>

            {/* Only Verified */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>Only verified venues</p>
              <button
                onClick={handleToggleVerified}
                className={`w-12 h-6 rounded-full transition-all relative`}
                style={{ backgroundColor: onlyVerified ? 'var(--foreground)' : 'var(--border)' }}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full shadow-md transition-transform`}
                  style={{ 
                    backgroundColor: 'var(--background)',
                    transform: onlyVerified ? 'translateX(24px)' : 'translateX(2px)'
                  }}
                />
              </button>
            </div>
          </div>
        )}

        {/* Venues count */}
        <div className="px-5 py-3 transition-colors duration-300" style={{ backgroundColor: 'var(--muted)' }}>
          <p className="text-sm font-medium text-center" style={{ color: 'var(--muted-foreground)' }}>{filteredSalons.length} venues nearby</p>
        </div>

        {/* Scrollable Salon List */}
        <div className="overflow-y-auto scrollbar-hide" style={{ height: showFilters ? "calc(100% - 420px)" : "calc(100% - 160px)" }}>
          <div className="px-5 pt-4 pb-24 space-y-4">
            {filteredSalons.map((salon) => (
              <div key={salon.id} className="cursor-pointer active:scale-[0.98] transition-transform">
                {/* Salon Image - Separate element with all rounded corners */}
                <div 
                  className="relative h-48 rounded-2xl overflow-hidden mb-3"
                  data-salon-id={salon.id} onClick={handleSalonClickData}
                  style={{ backgroundColor: 'var(--muted)' }}
                >
                  <ImageWithFallback src={salon.image} alt={salon.name} className="w-full h-full object-cover" />
                  {salon.verified && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-900 flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-600" />
                      Verified
                    </div>
                  )}
                </div>

                {/* Salon Info - No card boundaries, just content */}
                <div data-salon-id={salon.id} onClick={handleSalonClickData}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-black text-xl mb-1" style={{ color: 'var(--foreground)' }}>{salon.name}</h3>
                      <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>{salon.location}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1.5 rounded-lg flex-shrink-0 ml-3">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-black text-gray-900 text-sm">{salon.rating}</span>
                      <span className="text-gray-500 text-xs">({salon.reviews})</span>
                    </div>
                  </div>

                  {/* Availability Section - ABOVE SERVICES */}
                  <div className="mb-3">
                    {/* Open/Close Status */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ 
                          backgroundColor: salon.isOpen ? 'var(--color-success)' : 'var(--color-error)',
                          boxShadow: salon.isOpen ? '0 0 6px rgba(16, 185, 129, 0.6)' : '0 0 6px rgba(239, 68, 68, 0.6)'
                        }}
                      />
                      <span 
                        className="text-xs font-bold"
                        style={{ color: salon.isOpen ? 'var(--color-success)' : 'var(--color-error)' }}
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
                            data-salon-id={salon.id} data-slot={slot} onClick={handleSlotClickData}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 px-2 py-0.5 rounded-md text-[11px] font-bold transition-all duration-200"
                            style={{
                              background: salon.isOpen 
                                ? 'var(--gradient-success-cta)'
                                : 'var(--muted)',
                              color: salon.isOpen ? 'var(--text-inverse)' : 'var(--muted-foreground)',
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
                            data-salon-id={salon.id} onClick={handleSeeMoreClickData}
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

                  {/* Services - Clean list without card */}
                  {salon.services.length > 0 && (
                    <div className="space-y-2">
                      {salon.services.slice(0, 3).map((service, idx) => (
                        <button
                          key={idx}
                          data-salon-id={salon.id} data-service-name={service.name} onClick={handleServiceClickData}
                          className="w-full flex items-center justify-between transition-colors rounded-lg p-3 hover:bg-muted"
                        >
                          <div className="flex-1 text-left">
                            <p className="font-bold text-base mb-0.5" style={{ color: 'var(--foreground)' }}>{service.name}</p>
                            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{service.duration}</p>
                          </div>
                          <p className="text-lg font-normal" style={{ color: 'var(--foreground)' }}>
                            from {service.price}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}