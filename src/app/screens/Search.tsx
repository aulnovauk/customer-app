import { useState } from "react";
import { Search as SearchIcon, MapPin, X, Calendar, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const recentSearches = [
  "Hair removal",
  "Spa & wellness",
  "Massage",
  "Pets",
  "Hair & styling",
];

const topCategories = [
  { name: "Hair & styling", image: "https://images.unsplash.com/photo-1723879371709-17908244d70a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGhhaXIlMjBzdHlsaW5nJTIwc2Fsb258ZW58MXx8fHwxNzczNjgzNTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Nails", image: "https://images.unsplash.com/photo-1651512186979-737021ace442?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMG1hbmljdXJlJTIwbmFpbHMlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzM2ODM1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Brows & lashes", image: "https://images.unsplash.com/photo-1622207691293-5cd80466dab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGV5ZWJyb3dzJTIwbGFzaGVzJTIwYmVhdXR5fGVufDF8fHx8MTc3MzY4MzUxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Facials", image: "https://images.unsplash.com/photo-1771091054411-22c8e6538f74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGZhY2lhbCUyMHNraW5jYXJlJTIwZ2xvd2luZ3xlbnwxfHx8fDE3NzM2ODM1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Massage", image: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMG1hc3NhZ2UlMjB0aGVyYXB5JTIwc3BhfGVufDF8fHx8MTc3MzY4MzUxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Spa & sauna", image: "https://images.unsplash.com/photo-1740025940333-daf61dc22ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMHNwYSUyMHNhdW5hJTIwd2VsbmVzc3N8ZW58MXx8fHwxNzczNjgzNTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

const exploreSalons = [
  {
    id: 1,
    name: "Luxe Beauty Studio",
    image: "https://images.unsplash.com/photo-1759134155377-4207d89b39ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBpbnRlcmlvciUyMGx1eHVyeSUyMG1vZGVybnxlbnwxfHx8fDE3NzM2NzU0MjN8MA&ixlib=rb-4.1.0&q=80&w=600",
    rating: 4.9,
    reviews: 234,
    distance: "0.8 km",
    category: "Hair & Makeup",
    price: "From ₹1,200",
    isOpen: true,
    openUntil: "8:00 PM",
    nextSlots: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"],
  },
  {
    id: 2,
    name: "Serenity Spa & Salon",
    image: "https://images.unsplash.com/photo-1760862652442-e8ff7ebdd2f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwbW9kZXJuJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzM3MDA0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 189,
    distance: "1.2 km",
    category: "Spa & Wellness",
    price: "From ₹1,800",
    isOpen: true,
    openUntil: "9:00 PM",
    nextSlots: ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"],
  },
  {
    id: 3,
    name: "Glow & Beauty Bar",
    image: "https://images.unsplash.com/photo-1758188753373-5b01a0fc6d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaGFpciUyMHNhbG9uJTIwaW50ZXJpb3IlMjBsdXh1cnl8ZW58MXx8fHwxNzczNzAwNDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5.0,
    reviews: 98,
    distance: "1.8 km",
    category: "Skincare & Facials",
    price: "From ₹1,500",
    isOpen: false,
    openUntil: "7:00 PM",
    nextSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"],
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

export function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentList, setRecentList] = useState(recentSearches);

  const handleClearRecent = () => {
    setRecentList([]);
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setRecentList([]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">Search</h1>
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {/* Filter Buttons */}
        <div className="px-5 pt-5 pb-4 space-y-3">
          {/* All treatments filter */}
          <button className="w-full flex items-center gap-3 px-4 py-3.5 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-200 transition-colors">
            <SearchIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="All treatments and venues"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-500 text-[15px]"
            />
          </button>

          {/* Location filter */}
          <button className="w-full flex items-center gap-3 px-4 py-3.5 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-200 transition-colors">
            <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="flex-1 text-left text-gray-500 text-[15px]">Current location</span>
          </button>

          {/* Anytime filter */}
          <button className="w-full flex items-center gap-3 px-4 py-3.5 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-200 transition-colors">
            <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="flex-1 text-left text-gray-500 text-[15px]">Anytime</span>
          </button>
        </div>

        {/* Recent Section */}
        {recentList.length > 0 && (
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent</h2>
              <button
                onClick={handleClearRecent}
                className="text-[15px] font-semibold text-rose-500"
              >
                Clear
              </button>
            </div>

            <div className="space-y-1">
              {recentList.map((search, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSearchQuery(search)}
                  className="w-full flex items-center gap-3 px-3 py-3.5 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="w-9 h-9 flex items-center justify-center bg-violet-50 rounded-full flex-shrink-0">
                    <SearchIcon className="w-4 h-4 text-violet-500" />
                  </div>
                  <span className="flex-1 text-left text-gray-900 text-[15px]">{search}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Top Category Section */}
        <div className="px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Top category</h2>

          <div className="grid grid-cols-3 gap-3">
            {topCategories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/map?category=${encodeURIComponent(category.name)}`)}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-gray-700 font-medium text-center leading-tight px-1 line-clamp-2">
                  {category.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Explore Section */}
        <div className="px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Explore</h2>

          <div className="space-y-4">
            {exploreSalons.map((salon, index) => (
              <motion.div
                key={salon.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/salon/${salon.id}`)}
                className="w-full cursor-pointer"
              >
                <div className="flex gap-3 mb-2">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                    <ImageWithFallback
                      src={salon.image}
                      alt={salon.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-center gap-1">
                    <h3 className="font-bold text-gray-900 text-[15px] line-clamp-1">
                      {salon.name}
                    </h3>
                    <p className="text-gray-500 text-xs">{salon.category}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-gray-900">★ {salon.rating}</span>
                        <span className="text-xs text-gray-400">({salon.reviews})</span>
                      </div>
                      <span className="text-xs text-gray-400">• {salon.distance}</span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium mt-0.5">{salon.price}</p>
                  </div>
                </div>

                {/* Availability Section */}
                <div className="ml-0">
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
                              : '#F3F4F6',
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4 shadow-lg">
        <div className="flex gap-3 max-w-md mx-auto">
          <button
            onClick={handleClearAll}
            className="flex-1 py-4 rounded-full border-2 border-gray-200 text-gray-900 font-bold text-[15px] hover:bg-gray-50 transition-colors"
          >
            Clear all
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-4 rounded-full bg-gray-900 text-white font-bold text-[15px] hover:bg-gray-800 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}