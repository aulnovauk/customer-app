import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Bell, ChevronRight, Star, Clock, Flame, MessagesSquare, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { VenueCard, CategoryCard, IconButton } from "../components/AnimatedCard";
import { VenueCardSkeleton, CategorySkeleton } from "../components/LoadingSkeleton";
import { LuxuryRating, GoldAccent, LuxuryHeading, PremiumBadge, SilkOverlay } from "../components/LuxuryEffects";
import { useTheme } from "../context/ThemeContext";

// Data arrays for Home screen
const categories = [
  { name: "Hair & styling", image: "https://images.unsplash.com/photo-1723879371709-17908244d70a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGhhaXIlMjBzdHlsaW5nJTIwc2Fsb258ZW58MXx8fHwxNzczNjgzNTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Nails", image: "https://images.unsplash.com/photo-1651512186979-737021ace442?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMG1hbmljdXJlJTIwbmFpbHMlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzM2ODM1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Brows & lashes", image: "https://images.unsplash.com/photo-1622207691293-5cd80466dab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGV5ZWJyb3dzJTIwbGFzaGVzJTIwYmVhdXR5fGVufDF8fHx8MTc3MzY4MzUxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Hair removal", image: "https://images.unsplash.com/photo-1771091054411-22c8e6538f74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGZhY2lhbCUyMHdheGluZyUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NzM2ODM1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Massage", image: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMG1hc3NhZ2UlMjB0aGVyYXB5JTIwc3BhfGVufDF8fHx8MTc3MzY4MzUxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Facials", image: "https://images.unsplash.com/photo-1771091054411-22c8e6538f74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGZhY2lhbCUyMHNraW5jYXJlJTIwZ2xvd2luZ3xlbnwxfHx8fDE3NzM2ODM1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Spa & sauna", image: "https://images.unsplash.com/photo-1740025940333-daf61dc22ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMHNwYSUyMHNhdW5hJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzczNjgzNTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Barbering", image: "https://images.unsplash.com/photo-1671450960874-0903baf942c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBtYW4lMjBiYXJiZXIlMjBncm9vbWluZyUyMGJlYXJkfGVufDF8fHx8MTc3MzY4MzUxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Body", image: "https://images.unsplash.com/photo-1670955090890-705a45f0e810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGJvZHklMjB0cmVhdG1lbnQlMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NzM2ODM1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Aesthetics", image: "https://images.unsplash.com/photo-1697347815359-ee09122395a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGJlYXV0eSUyMHBvcnRyYWl0JTIwZ2xvd2luZ3xlbnwxfHx8fDE3NzM2ODM1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Makeup", image: "https://images.unsplash.com/photo-1693362029321-eb86dc114bc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMG1ha2V1cCUyMGFydGlzdCUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MzY4MzUxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Tattoos & ...", image: "https://images.unsplash.com/photo-1651480342823-ccdb635003d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB0YXR0b28lMjBhcnRpc3QlMjBjcmVhdGl2ZSUyMGlua3xlbnwxfHx8fDE3NzM2ODM1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

const nearbyVenues = [
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
    services: ["Haircut", "Styling", "Makeup"],
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
    services: ["Massage", "Facial", "Spa"],
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
    services: ["Facial", "Cleanup", "Glow Treatment"],
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
    services: ["Manicure", "Pedicure", "Nail Art"],
  },
];

const recentlyViewed = [
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
    services: ["Haircut", "Color", "Styling"],
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
    services: ["Aromatherapy", "Spa", "Massage"],
  },
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
    services: ["Haircut", "Styling", "Makeup"],
  },
];

const trendingSalons = [
  {
    id: 7,
    name: "Radiance Beauty Studio",
    image: "https://images.unsplash.com/photo-1760862652442-e8ff7ebdd2f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3BhJTIwc2Fsb24lMjBpbnRlcmlvciUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzczNzAwNDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5.0,
    reviews: 421,
    distance: "1.3 km",
    category: "Premium Salon",
    openUntil: "10:00 PM",
    price: "From ₹1,600",
    trending: true,
    services: ["Premium Hair", "Styling", "Color"],
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
    trending: true,
    services: ["Massage", "Facial", "Spa"],
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
    trending: true,
    services: ["Facial", "Cleanup", "Glow Treatment"],
  },
];

const featuredOffers = [
  {
    id: 1,
    title: "New Year Glow",
    discount: "25% OFF",
    description: "All facial treatments this week",
    color: "from-violet-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1760488029475-41ff1eaa904b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjBza2luY2FyZSUyMHRyZWF0bWVudCUyMHdvbWFuJTIwZ2xvd2luZ3xlbnwxfHx8fDE3NzM2NzU0MTd8MA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: 2,
    title: "Spring Special",
    discount: "20% OFF",
    description: "Hair color & highlights",
    color: "from-rose-500 to-pink-600",
    image: "https://images.unsplash.com/photo-1638474368314-59198edde028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhhaXIlMjBzdHlsaW5nJTIwc2Fsb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM2NzU0MTd8MA&ixlib=rb-4.1.0&q=80&w=400",
  },
];

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const { theme } = useTheme();

  return (
    <div className="min-h-screen pb-24 transition-colors duration-300" style={{ backgroundColor: 'var(--background-base)' }}>
      {/* Header */}
      <div
        className="px-5 pt-14 pb-6 transition-colors duration-300"
        style={{ backgroundColor: 'var(--background-base)' }}
      >
        {/* Location - MOVED TO TOP */}
        <button className="flex items-center gap-1.5 mb-4">
          <MapPin className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>San Francisco, CA</span>
          <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </button>

        <div className="flex items-center justify-between mb-6">
          {/* Left Side - Profile */}
          <button
            onClick={() => navigate("/app/profile")}
            className="flex items-center gap-3"
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
              style={{ 
                background: 'var(--gradient-primary)',
                boxShadow: 'var(--elevation-2)',
              }}
            >
              JS
            </div>
            <div className="text-left">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Good morning 👋</p>
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Jessica</h1>
            </div>
          </button>

          {/* Right Side - Icons */}
          <div className="flex items-center gap-2">
            {/* Bell Icon */}
            <motion.button 
              onClick={() => navigate("/notifications")}
              className="relative w-11 h-11 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: 'var(--background-elevated)',
                boxShadow: 'var(--elevation-2)',
              }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: 'var(--elevation-3)',
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <Bell className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
              <span 
                className="absolute top-2 right-2 w-2 h-2 rounded-full" 
                style={{ backgroundColor: 'var(--brand-primary)' }}
              />
            </motion.button>
          </div>
        </div>

        {/* Search */}
        <motion.button
          onClick={() => navigate("/search")}
          className="flex items-center gap-3 px-4 py-3.5 w-full text-left transition-all duration-300"
          style={{ 
            backgroundColor: 'var(--background-elevated)',
            boxShadow: 'var(--elevation-2)',
            borderRadius: 'var(--radius-xl)',
          }}
          whileTap={{ scale: 0.98 }}
          whileHover={{ 
            boxShadow: 'var(--elevation-3)',
            y: -1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          <Search className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />
          <span className="flex-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>Search salons, services...</span>
        </motion.button>
      </div>

      {/* Special Offers Banner */}
      <div className="px-5 mb-7 mt-5">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {featuredOffers.map((offer) => (
            <motion.div
              key={offer.id}
              whileTap={{ scale: 0.97 }}
              className={`relative flex-shrink-0 w-[280px] h-[130px] rounded-3xl overflow-hidden cursor-pointer bg-gradient-to-r ${offer.color}`}
            >
              <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                <div>
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                    {offer.discount}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-tight">{offer.title}</h3>
                  <p className="text-white/80 text-xs mt-1">{offer.description}</p>
                </div>
                <span className="text-white text-xs font-medium">Book now →</span>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20 z-[5]" />
                <ImageWithFallback
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top Categories */}
      <div className="px-5 mb-9">
        <div className="flex items-center justify-between mb-5">
          <h2 
            className="text-xl font-bold tracking-tight" 
            style={{ 
              color: 'var(--foreground)',
              letterSpacing: '-0.02em',
            }}
          >
            Top categories
          </h2>
          <motion.button 
            className="flex items-center gap-1"
            whileTap={{ scale: 0.95 }}
          >
            <GoldAccent>
              See all <ChevronRight className="w-4 h-4" />
            </GoldAccent>
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-x-3 gap-y-6">{categories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => navigate(`/map?category=${encodeURIComponent(category.name)}`)}
              className="flex flex-col items-center gap-3"
            >
              <motion.div 
                className="relative w-[95px] h-[95px] rounded-full overflow-hidden"
                style={{ boxShadow: 'var(--elevation-2)' }}
                whileHover={{ boxShadow: 'var(--elevation-3)' }}
              >
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <SilkOverlay />
              </motion.div>
              <span 
                className="text-xs font-semibold text-center leading-tight px-1" 
                style={{ 
                  color: 'var(--foreground)',
                  letterSpacing: '-0.01em',
                }}
              >
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="mb-7">
        <div className="flex items-center justify-between px-5 mb-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>Recently viewed</h2>
          <button 
            onClick={() => navigate("/salons?type=recently-viewed")}
            className="text-sm font-semibold flex items-center gap-1"
            style={{ color: 'var(--luxury-gold-500)' }}
          >
            See all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-2">
          {recentlyViewed.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/salon/${venue.id}`)}
              className="flex-shrink-0 w-[280px] cursor-pointer"
            >
              {/* Salon Image */}
              <div 
                className="relative w-full h-[220px] overflow-hidden mb-3"
                style={{ 
                  borderRadius: '20px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
              >
                <ImageWithFallback
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: 'var(--gradient-overlay)',
                  }}
                />
                {/* Rating badge */}
                <div 
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-2"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: 'var(--elevation-1)',
                  }}
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{venue.rating}</span>
                </div>
                
                {/* Distance & Price */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span 
                    className="text-white text-xs font-medium px-3 py-1.5"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    📍 {venue.distance}
                  </span>
                  <span 
                    className="text-white text-xs font-bold px-3 py-1.5"
                    style={{
                      background: 'var(--gradient-primary)',
                      borderRadius: 'var(--radius-full)',
                      boxShadow: 'var(--shadow-brand-sm)',
                    }}
                  >
                    {venue.price}
                  </span>
                </div>
              </div>

              {/* Salon Info */}
              <div className="px-1">
                <h3 className="font-black text-base mb-1.5 truncate" style={{ color: 'var(--text-primary)' }}>{venue.name}</h3>
                <p className="text-xs mb-2.5 truncate" style={{ color: 'var(--muted-foreground)' }}>{venue.category}</p>
                
                {/* Services */}
                {venue.services && venue.services.length > 0 && (
                  <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto no-scrollbar">
                    {venue.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-1 rounded-md flex-shrink-0"
                        style={{
                          backgroundColor: 'var(--background-elevated)',
                          color: 'var(--muted-foreground)',
                          border: '1px solid var(--border-light)',
                        }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" style={{ color: 'var(--accent-gold)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Open until {venue.openUntil}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                    {venue.reviews} reviews
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Near You */}
      <div className="mb-7">
        <div className="flex items-center justify-between px-5 mb-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>Near you</h2>
          <button 
            onClick={() => navigate("/salons?type=nearby")}
            className="text-sm font-semibold flex items-center gap-1"
            style={{ color: 'var(--accent-gold)' }}
          >
            See all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-2">
          {nearbyVenues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/salon/${venue.id}`)}
              className="flex-shrink-0 w-[280px] cursor-pointer"
            >
              {/* Salon Image */}
              <div 
                className="relative w-full h-[220px] overflow-hidden mb-3"
                style={{ 
                  borderRadius: '20px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
              >
                <ImageWithFallback
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: 'var(--gradient-overlay)',
                  }}
                />
                {/* Rating badge */}
                <div 
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-2"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: 'var(--elevation-1)',
                  }}
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{venue.rating}</span>
                </div>
                
                {/* Distance & Price */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span 
                    className="text-white text-xs font-medium px-3 py-1.5"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    📍 {venue.distance}
                  </span>
                  <span 
                    className="text-white text-xs font-bold px-3 py-1.5"
                    style={{
                      background: 'var(--gradient-primary)',
                      borderRadius: 'var(--radius-full)',
                      boxShadow: 'var(--shadow-brand-sm)',
                    }}
                  >
                    {venue.price}
                  </span>
                </div>
              </div>

              {/* Salon Info */}
              <div className="px-1">
                <h3 className="font-black text-base mb-1.5 truncate" style={{ color: 'var(--text-primary)' }}>{venue.name}</h3>
                <p className="text-xs mb-2.5 truncate" style={{ color: 'var(--muted-foreground)' }}>{venue.category}</p>
                
                {/* Services */}
                {venue.services && venue.services.length > 0 && (
                  <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto no-scrollbar">
                    {venue.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-1 rounded-md flex-shrink-0"
                        style={{
                          backgroundColor: 'var(--background-elevated)',
                          color: 'var(--muted-foreground)',
                          border: '1px solid var(--border-light)',
                        }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" style={{ color: 'var(--accent-gold)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Open until {venue.openUntil}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                    {venue.reviews} reviews
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="mb-7">
        <div className="flex items-center justify-between px-5 mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>Trending</h2>
          </div>
          <button 
            onClick={() => navigate("/salons?type=trending")}
            className="text-sm font-semibold flex items-center gap-1"
            style={{ color: 'var(--accent-gold)' }}
          >
            See all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-2">
          {trendingSalons.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/salon/${venue.id}`)}
              className="flex-shrink-0 w-[280px] cursor-pointer"
            >
              {/* Salon Image */}
              <div 
                className="relative w-full h-[220px] overflow-hidden mb-3"
                style={{ 
                  borderRadius: '20px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
              >
                <ImageWithFallback
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: 'var(--gradient-overlay)',
                  }}
                />
                {/* Rating badge */}
                <div 
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-2"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: 'var(--elevation-1)',
                  }}
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{venue.rating}</span>
                </div>
                
                {/* Distance & Price */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span 
                    className="text-white text-xs font-medium px-3 py-1.5"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    📍 {venue.distance}
                  </span>
                  <span 
                    className="text-white text-xs font-bold px-3 py-1.5"
                    style={{
                      background: 'var(--gradient-primary)',
                      borderRadius: 'var(--radius-full)',
                      boxShadow: 'var(--shadow-brand-sm)',
                    }}
                  >
                    {venue.price}
                  </span>
                </div>
              </div>

              {/* Salon Info */}
              <div className="px-1">
                <h3 className="font-black text-base mb-1.5 truncate" style={{ color: 'var(--text-primary)' }}>{venue.name}</h3>
                <p className="text-xs mb-2.5 truncate" style={{ color: 'var(--muted-foreground)' }}>{venue.category}</p>
                
                {/* Services */}
                {venue.services && venue.services.length > 0 && (
                  <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto no-scrollbar">
                    {venue.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-1 rounded-md flex-shrink-0"
                        style={{
                          backgroundColor: 'var(--background-elevated)',
                          color: 'var(--muted-foreground)',
                          border: '1px solid var(--border-light)',
                        }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" style={{ color: 'var(--accent-gold)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Open until {venue.openUntil}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                    {venue.reviews} reviews
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}