import { ArrowLeft, SlidersHorizontal, List, Star, MapPin as MapPinIcon, ChevronDown } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Mock salon data with coordinates
const salons = [
  {
    id: 1,
    name: "Vinnys Salon",
    image: "https://images.unsplash.com/photo-1759134155377-4207d89b39ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBpbnRlcmlvciUyMGx1eHVyeSUyMG1vZGVybnxlbnwxfHx8fDE3NzM2NzU0MjN8MA&ixlib=rb-4.1.0&q=80&w=600",
    rating: 5.0,
    reviews: 139,
    distance: "23.2 mi",
    location: "DLF Phase IV, Gurugram",
    lat: 28.5,
    lng: 77.08,
    services: [
      { name: "Waxing", duration: "10 mins - 1 hour", price: "₹449" }
    ],
    isOpen: true,
    openUntil: "8:00 PM",
    nextSlots: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"],
  },
  {
    id: 2,
    name: "The Mani Pedi Spa",
    image: "https://images.unsplash.com/photo-1760862652442-e8ff7ebdd2f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwbW9kZXJuJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzM3MDA0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 238,
    distance: "22.9 mi",
    location: "Sector 53, Gurugram",
    subtitle: "South Point Mall, DLF 5",
    lat: 28.52,
    lng: 77.1,
    services: [
      { name: "Waxing", duration: "10 mins - 1 hour", price: "₹449" }
    ],
    isOpen: true,
    openUntil: "9:00 PM",
    nextSlots: ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"],
  },
  {
    id: 3,
    name: "Luxe Beauty Studio",
    image: "https://images.unsplash.com/photo-1711517479380-9fa1735be261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwbW9kZXJuJTIwSW5kaWF8ZW58MXx8fHwxNzczNjgzMTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5.0,
    reviews: 234,
    distance: "18.5 mi",
    location: "Connaught Place, New Delhi",
    lat: 28.48,
    lng: 77.12,
    services: [
      { name: "Hair Removal", duration: "30 mins - 2 hours", price: "₹599" }
    ],
    isOpen: false,
    openUntil: "7:00 PM",
    nextSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"],
  },
  {
    id: 4,
    name: "Serenity Spa & Salon",
    image: "https://images.unsplash.com/photo-1758188753373-5b01a0fc6d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaGFpciUyMHNhbG9uJTIwaW50ZXJpb3IlMjBsdXh1cnl8ZW58MXx8fHwxNzczNzAwNDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 189,
    distance: "21.3 mi",
    location: "Vasant Kunj, New Delhi",
    lat: 28.51,
    lng: 77.06,
    services: [
      { name: "Full Body Waxing", duration: "1.5 hours", price: "₹999" }
    ],
    isOpen: true,
    openUntil: "8:30 PM",
    nextSlots: ["11:00 AM", "12:30 PM", "02:00 PM", "03:30 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"],
  },
  {
    id: 5,
    name: "Glow & Beauty Bar",
    image: "https://images.unsplash.com/photo-1769034260387-39fa07f0c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBuYWlsJTIwc2Fsb24lMjBpbnRlcmlvciUyMGNoaWN8ZW58MXx8fHwxNzczNzAwNDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5.0,
    reviews: 98,
    distance: "19.8 mi",
    location: "Saket, New Delhi",
    lat: 28.49,
    lng: 77.11,
    services: [
      { name: "Laser Hair Removal", duration: "45 mins", price: "₹1,299" }
    ],
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

export function MapView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "Hair removal";
  const [sortBy, setSortBy] = useState("Best match");
  const [sheetHeight, setSheetHeight] = useState(55); // percentage
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  // Handle drag start
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartY(clientY);
    setStartHeight(sheetHeight);
  };

  // Handle drag move
  const handleDragMove = (e: TouchEvent | MouseEvent) => {
    if (!isDragging) return;
    
    const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
    const deltaY = startY - clientY;
    const viewportHeight = window.innerHeight;
    const deltaPercent = (deltaY / viewportHeight) * 100;
    
    let newHeight = startHeight + deltaPercent;
    newHeight = Math.max(20, Math.min(90, newHeight)); // Clamp between 20% and 90%
    setSheetHeight(newHeight);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchend', handleDragEnd);
      window.addEventListener('mouseup', handleDragEnd);

      return () => {
        window.removeEventListener('touchmove', handleDragMove);
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('touchend', handleDragEnd);
        window.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging, startY, startHeight]);

  return (
    <div className="h-screen bg-gray-100 overflow-hidden max-w-[390px] mx-auto relative">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-gray-100">
        {/* Simulated map with markers */}
        <div className="relative w-full h-full">
          {/* Map placeholder with patterns to simulate roads */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="road" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 0 50 L 100 50" stroke="#999" strokeWidth="1" fill="none"/>
                <path d="M 50 0 L 50 100" stroke="#999" strokeWidth="1" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#road)" />
          </svg>

          {/* Location markers on map */}
          {salons.map((salon, idx) => (
            <div
              key={salon.id}
              className="absolute"
              style={{
                left: `${30 + idx * 15}%`,
                top: `${25 + (idx % 3) * 20}%`,
              }}
            >
              <div className="relative">
                {/* Pin with rating */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-900 text-white px-3 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center gap-1 mb-1">
                    {salon.rating}
                  </div>
                  <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12z"
                      fill="#1F2937"
                    />
                    <circle cx="12" cy="12" r="6" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Search Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="px-5 pt-12 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900" />
            </button>
            
            <div className="flex-1 bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-md border border-gray-200">
              <div className="flex-1">
                <p className="text-base font-bold text-gray-900">{category}</p>
                <p className="text-xs text-gray-500 mt-0.5">Current location</p>
              </div>
            </div>

            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200">
              <List className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="absolute left-0 right-0 bottom-0 z-30 bg-white rounded-t-[32px] shadow-2xl"
        style={{ height: `${sheetHeight}%`, transition: isDragging ? 'none' : 'height 0.3s ease' }}
      >
        {/* Drag Handle */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
          onTouchStart={handleDragStart}
          onMouseDown={handleDragStart}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Filter Buttons */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-full flex items-center gap-2 shadow-sm">
              <SlidersHorizontal className="w-4 h-4 text-gray-700" />
            </button>
            
            <button
              onClick={() => setSortBy(sortBy === "Best match" ? "Distance" : "Best match")}
              className="px-4 py-2 bg-white border border-gray-300 rounded-full flex items-center gap-2 shadow-sm"
            >
              <span className="text-sm font-semibold text-gray-900">{sortBy}</span>
              <ChevronDown className="w-4 h-4 text-gray-700" />
            </button>

            <button className="px-4 py-2 bg-white border border-gray-300 rounded-full flex items-center gap-2 shadow-sm">
              <span className="text-sm font-semibold text-gray-900">Amenities</span>
              <ChevronDown className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Venues count */}
        <div className="px-5 py-3 bg-gray-50">
          <p className="text-sm text-gray-600 font-medium text-center">11 venues nearby</p>
        </div>

        {/* Scrollable Salon List */}
        <div className="overflow-y-auto scrollbar-hide" style={{ height: 'calc(100% - 160px)' }}>
          <div className="px-5 pt-4 pb-24 space-y-4">
            {salons.map((salon) => (
              <div key={salon.id} className="cursor-pointer active:scale-[0.98] transition-transform">
                {/* Salon Image - Separate element with all rounded corners */}
                <div 
                  className="relative h-48 bg-gray-200 rounded-2xl overflow-hidden mb-3"
                  onClick={() => navigate(`/salon/${salon.id}`)}
                >
                  <ImageWithFallback
                    src={salon.image}
                    alt={salon.name}
                    className="w-full h-full object-cover"
                  />
                  {salon.id === 1 && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-900">
                      Ad
                    </div>
                  )}
                </div>

                {/* Salon Info - No card boundaries, just content */}
                <div onClick={() => navigate(`/salon/${salon.id}`)}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-black text-gray-900 text-xl mb-0.5">{salon.name}</h3>
                      {salon.subtitle && (
                        <p className="text-sm text-gray-600 font-medium">{salon.subtitle}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1.5 rounded-lg flex-shrink-0 ml-3">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-black text-gray-900 text-sm">{salon.rating}</span>
                      <span className="text-gray-500 text-xs">({salon.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-gray-600 text-sm mb-3">
                    <span>{salon.distance}</span>
                    <span>•</span>
                    <span>{salon.location}</span>
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
                      <span className="text-xs text-gray-500">
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
                                : '#E5E7EB',
                              color: salon.isOpen ? '#FFFFFF' : '#9CA3AF',
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
                            className="flex-shrink-0 text-[11px] font-bold text-rose-500"
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
                      {salon.services.map((service, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/salon/${salon.id}?service=${encodeURIComponent(service.name)}&tab=services`);
                          }}
                          className="w-full flex items-center justify-between hover:bg-gray-200 active:bg-gray-300 transition-colors rounded-lg p-3"
                        >
                          <div className="flex-1 text-left">
                            <p className="font-bold text-gray-900 text-base mb-0.5">{service.name}</p>
                            <p className="text-xs text-gray-500">{service.duration}</p>
                          </div>
                          <p className="text-gray-900 text-lg font-normal">
                            from {service.price}
                          </p>
                        </button>
                      ))}
                      
                      <button className="text-rose-500 text-sm font-bold mt-1">
                        See 1 service
                      </button>
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