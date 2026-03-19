import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Clock, 
  Users, 
  ChevronRight,
  Calendar,
  Star,
  Sparkles,
  Heart,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  Rocket,
  ShoppingBag,
  Gift,
  PartyPopper,
  Flame,
  Timer,
  BadgeCheck,
  X,
  DollarSign,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type EventCategory = "all" | "workshops" | "product-launch" | "seasonal-sales" | "group-events" | "celebrity-events";
type EventTab = "discover" | "myevents";
type EventBadge = "new" | "limited" | "popular" | "trending" | "selling-fast";

interface Event {
  id: number;
  title: string;
  studio: string;
  category: EventCategory;
  image: string;
  date: string;
  time: string;
  price: number;
  spotsLeft: number;
  location: string;
  isFeatured: boolean;
  isVerified: boolean;
  attendees: number;
  rating: number;
  badge?: EventBadge;
}

const events: Event[] = [
  {
    id: 1,
    title: "Bridal Makeup Masterclass",
    studio: "Glow Studio",
    category: "workshops",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    date: "Dec 15, 2024",
    time: "2:00 PM",
    price: 960,
    spotsLeft: 8,
    location: "Sector 18, Noida",
    isFeatured: true,
    isVerified: true,
    attendees: 45,
    rating: 4.9,
    badge: "popular"
  },
  {
    id: 2,
    title: "Holiday Glam Workshop",
    studio: "Radiance Beauty",
    category: "workshops",
    image: "https://images.unsplash.com/photo-1560869713-bf165a13ad49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    date: "Dec 18, 2024",
    time: "4:00 PM",
    price: 750,
    spotsLeft: 12,
    location: "Sector 22, Noida",
    isFeatured: true,
    isVerified: true,
    attendees: 38,
    rating: 4.8,
    badge: "limited"
  },
  {
    id: 3,
    title: "LuxeLash Pro Launch Event",
    studio: "Luxe Beauty Studio",
    category: "product-launch",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    date: "Dec 20, 2024",
    time: "6:00 PM",
    price: 1200,
    spotsLeft: 5,
    location: "Connaught Place",
    isFeatured: false,
    isVerified: true,
    attendees: 52,
    rating: 5.0,
    badge: "new"
  },
  {
    id: 4,
    title: "Skincare & Glow Session",
    studio: "Serenity Spa",
    category: "workshops",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    date: "Dec 22, 2024",
    time: "11:00 AM",
    price: 850,
    spotsLeft: 15,
    location: "Hauz Khas",
    isFeatured: false,
    isVerified: true,
    attendees: 29,
    rating: 4.7,
    badge: "trending"
  },
  {
    id: 5,
    title: "Celebrity Stylist Meetup",
    studio: "Elite Salon Academy",
    category: "celebrity-events",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    date: "Dec 25, 2024",
    time: "10:00 AM",
    price: 1500,
    spotsLeft: 6,
    location: "Greater Kailash",
    isFeatured: false,
    isVerified: true,
    attendees: 67,
    rating: 4.9,
    badge: "selling-fast"
  },
  {
    id: 6,
    title: "Festive Beauty Sale",
    studio: "Glamour Lounge",
    category: "seasonal-sales",
    image: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    date: "Dec 27, 2024",
    time: "3:00 PM",
    price: 650,
    spotsLeft: 20,
    location: "Saket",
    isFeatured: true,
    isVerified: false,
    attendees: 41,
    rating: 4.6,
    badge: "limited"
  },
  {
    id: 7,
    title: "GlamGlow Launch Party",
    studio: "Beauty Hub",
    category: "product-launch",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    date: "Dec 28, 2024",
    time: "7:00 PM",
    price: 800,
    spotsLeft: 25,
    location: "Cyber City",
    isFeatured: false,
    isVerified: true,
    attendees: 88,
    rating: 4.8,
    badge: "new"
  },
  {
    id: 8,
    title: "Friends & Beauty Night",
    studio: "Radiance Spa",
    category: "group-events",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    date: "Dec 30, 2024",
    time: "5:00 PM",
    price: 2500,
    spotsLeft: 8,
    location: "Nehru Place",
    isFeatured: true,
    isVerified: true,
    attendees: 34,
    rating: 4.9,
    badge: "popular"
  },
  {
    id: 9,
    title: "New Year Mega Sale",
    studio: "StyleMate Studio",
    category: "seasonal-sales",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    date: "Jan 1, 2025",
    time: "12:00 PM",
    price: 499,
    spotsLeft: 50,
    location: "Lajpat Nagar",
    isFeatured: false,
    isVerified: true,
    attendees: 120,
    rating: 4.7,
    badge: "limited"
  },
  {
    id: 10,
    title: "Bollywood Makeup Artist Live",
    studio: "Glam Academy",
    category: "celebrity-events",
    image: "https://images.unsplash.com/photo-1583241800698-c57eef6e9e48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    date: "Jan 3, 2025",
    time: "4:00 PM",
    price: 2999,
    spotsLeft: 3,
    location: "Khan Market",
    isFeatured: true,
    isVerified: true,
    attendees: 97,
    rating: 5.0,
    badge: "selling-fast"
  },
];

const categoryFilters = [
  { id: "all" as EventCategory, label: "All", icon: Zap },
  { id: "workshops" as EventCategory, label: "Workshops", icon: Users },
  { id: "product-launch" as EventCategory, label: "Product Launch", icon: Rocket },
  { id: "seasonal-sales" as EventCategory, label: "Seasonal Sales", icon: ShoppingBag },
  { id: "group-events" as EventCategory, label: "Group Events", icon: Gift },
  { id: "celebrity-events" as EventCategory, label: "Celebrity Events", icon: PartyPopper },
];

export function Events() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<EventTab>("discover");
  const [activeCategory, setActiveCategory] = useState<EventCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedEvents, setLikedEvents] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  
  // Advanced filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedDate, setSelectedDate] = useState<string>("all");
  const [spotsFilter, setSpotsFilter] = useState<string>("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredEvents = events.filter((event) => {
    const matchesCategory = activeCategory === "all" || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.studio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1];
    const matchesDate = selectedDate === "all" || event.date === selectedDate;
    const matchesSpots = spotsFilter === "all" || (spotsFilter === "few" && event.spotsLeft <= 10) || (spotsFilter === "many" && event.spotsLeft > 10);
    const matchesVerified = !verifiedOnly || event.isVerified;
    return matchesCategory && matchesSearch && matchesPrice && matchesDate && matchesSpots && matchesVerified;
  });

  const featuredEvents = filteredEvents.filter((e) => e.isFeatured);
  const regularEvents = filteredEvents.filter((e) => !e.isFeatured);

  const toggleLike = (eventId: number) => {
    const newLiked = new Set(likedEvents);
    if (newLiked.has(eventId)) {
      newLiked.delete(eventId);
    } else {
      newLiked.add(eventId);
    }
    setLikedEvents(newLiked);
  };

  const getBadgeConfig = (badge?: EventBadge) => {
    if (!badge) return null;
    
    const configs = {
      new: {
        label: "New",
        icon: Sparkles,
        gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
        shadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
      },
      limited: {
        label: "Limited",
        icon: Timer,
        gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
        shadow: "0 2px 8px rgba(245, 158, 11, 0.3)",
      },
      popular: {
        label: "Popular",
        icon: Flame,
        gradient: "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
        shadow: "0 2px 8px rgba(239, 68, 68, 0.3)",
      },
      trending: {
        label: "Trending",
        icon: TrendingUp,
        gradient: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
        shadow: "0 2px 8px rgba(139, 92, 246, 0.3)",
      },
      "selling-fast": {
        label: "Selling Fast",
        icon: Zap,
        gradient: "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)",
        shadow: "0 2px 8px rgba(236, 72, 153, 0.3)",
      },
    };
    
    return configs[badge];
  };

  const getCategoryIcon = (category: EventCategory) => {
    const icons = {
      all: Zap,
      workshops: Users,
      "product-launch": Rocket,
      "seasonal-sales": ShoppingBag,
      "group-events": Gift,
      "celebrity-events": PartyPopper,
    };
    return icons[category];
  };

  return (
    <div className="min-h-screen pb-32 transition-colors duration-300" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-[390px] mx-auto">
        {/* Header */}
        <div className="px-5 pt-14 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black mb-1" style={{ color: 'var(--foreground)' }}>
                Events
              </h1>
              <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                Discover beauty workshops & masterclasses
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(true)}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border-light)',
                color: 'var(--foreground)',
              }}
            >
              <SlidersHorizontal className="w-5 h-5" strokeWidth={2} />
            </motion.button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-5">
            {[
              { id: "discover" as EventTab, label: "Discover", icon: Sparkles },
              { id: "myevents" as EventTab, label: "My Events (1)", icon: Calendar },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all"
                  style={
                    isActive
                      ? {
                          background: 'linear-gradient(135deg, #E85A8B 0%, #F186AC 100%)',
                          color: '#FFFFFF',
                          boxShadow: '0 4px 16px rgba(232, 90, 139, 0.3)',
                        }
                      : {
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border-light)',
                          color: 'var(--muted-foreground)',
                        }
                  }
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon className="w-4 h-4" strokeWidth={2.5} />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 pointer-events-none"
              style={{ color: 'var(--muted-foreground)' }}
              strokeWidth={2}
            />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm font-medium transition-all outline-none"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border-light)',
                color: 'var(--foreground)',
              }}
            />
          </div>
        </div>

        {/* Featured Events Carousel */}
        {featuredEvents.length > 0 && (
          <div className="mb-6">
            <div className="px-5 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full" style={{ background: 'var(--gradient-primary)' }} />
                <h2 className="text-lg font-black" style={{ color: 'var(--foreground)' }}>
                  Featured
                </h2>
              </div>
            </div>
            <div className="flex overflow-x-auto scrollbar-hide gap-4 px-5 pb-2">
              {featuredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative rounded-3xl overflow-hidden flex-shrink-0 w-[280px] h-[360px] group"
                  style={{
                    boxShadow: 'var(--elevation-3)',
                  }}
                >
                  {/* Background Image */}
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Featured Badge */}
                  <div 
                    className="absolute top-4 left-4 px-3 py-1.5 rounded-full flex items-center gap-1.5"
                    style={{ background: 'var(--gradient-gold)' }}
                  >
                    <Star className="w-3.5 h-3.5 text-white fill-white" strokeWidth={2} />
                    <span className="text-white text-xs font-black uppercase tracking-wide">Featured</span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full backdrop-blur-xl bg-white/20 border border-white/30">
                    <span className="text-white text-xs font-bold capitalize">{event.category}</span>
                  </div>

                  {/* Heart Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleLike(event.id)}
                    className="absolute top-16 right-4 w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: likedEvents.has(event.id) ? 'rgba(251, 113, 133, 0.9)' : 'rgba(255, 255, 255, 0.2)',
                      border: likedEvents.has(event.id) ? '1px solid rgba(251, 113, 133, 1)' : '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    <Heart
                      className={`w-5 h-5 ${likedEvents.has(event.id) ? "fill-white text-white" : "text-white"}`}
                      strokeWidth={2}
                    />
                  </motion.button>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white text-xl font-black mb-2 leading-tight">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-1.5 mb-3">
                          <MapPin className="w-3.5 h-3.5 text-white/80" strokeWidth={2} />
                          <span className="text-white/90 text-xs font-semibold">{event.studio}</span>
                          {event.isVerified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400" strokeWidth={2} />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4 text-white/90">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" strokeWidth={2} />
                        <span className="text-xs font-semibold">{event.date}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/50" />
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" strokeWidth={2} />
                        <span className="text-xs font-semibold">{event.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="px-3 py-1.5 rounded-full"
                          style={{ background: 'var(--gradient-primary)' }}
                        >
                          <span className="text-white text-sm font-black">From ₹{event.price}</span>
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-red-500/90">
                          <span className="text-white text-xs font-bold">{event.spotsLeft} spots left</span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-4 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
                        color: '#0F0F10',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      Register Now
                      <ChevronRight className="w-4 h-4" strokeWidth={3} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="px-5 mb-5">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
            {categoryFilters.map((filter) => {
              const isActive = activeCategory === filter.id;
              const Icon = filter.icon;
              return (
                <motion.button
                  key={filter.id}
                  onClick={() => setActiveCategory(filter.id)}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full flex-shrink-0 text-sm font-bold transition-all"
                  style={
                    isActive
                      ? {
                          background: 'linear-gradient(135deg, #E85A8B 0%, #F186AC 100%)',
                          color: '#FFFFFF',
                          boxShadow: '0 4px 12px rgba(232, 90, 139, 0.3)',
                        }
                      : {
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border-light)',
                          color: 'var(--muted-foreground)',
                        }
                  }
                >
                  <Icon className="w-4 h-4" strokeWidth={2.5} />
                  {filter.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="px-5 mb-4">
          <p className="text-sm font-bold" style={{ color: 'var(--muted-foreground)' }}>
            {filteredEvents.length} Events Found
          </p>
        </div>

        {/* Regular Events Grid */}
        <div className="px-5 pb-8 space-y-4">
          <AnimatePresence mode="popLayout">
            {regularEvents.map((event, index) => {
              const badgeConfig = getBadgeConfig(event.badge);
              const CategoryIcon = getCategoryIcon(event.category);
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="cursor-pointer"
                >
                  {/* Event Image */}
                  <div 
                    className="relative w-full h-48 mb-4 overflow-hidden"
                    style={{
                      borderRadius: '20px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Badge - Top Left */}
                    {badgeConfig && (
                      <motion.div
                        initial={{ scale: 0, rotate: -12 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
                        className="absolute top-3 left-3 px-3 py-1.5 rounded-full flex items-center gap-1.5"
                        style={{
                          background: badgeConfig.gradient,
                          boxShadow: badgeConfig.shadow,
                        }}
                      >
                        <badgeConfig.icon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                        <span className="text-white text-xs font-black uppercase tracking-wide">
                          {badgeConfig.label}
                        </span>
                      </motion.div>
                    )}
                    
                    {/* Category Tag - Top Right */}
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 flex items-center gap-1.5">
                      <CategoryIcon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                      <span className="text-white text-xs font-bold capitalize">
                        {event.category.replace('-', ' ')}
                      </span>
                    </div>
                    
                    {/* Heart Button - Bottom Right of Image */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(event.id)}
                      className="absolute bottom-3 right-3 w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: likedEvents.has(event.id) 
                          ? 'rgba(251, 113, 133, 0.95)' 
                          : 'rgba(255, 255, 255, 0.9)',
                        border: likedEvents.has(event.id) 
                          ? '1px solid rgba(251, 113, 133, 1)' 
                          : '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedEvents.has(event.id) 
                            ? "fill-white text-white" 
                            : "text-gray-700"
                        }`}
                        strokeWidth={2}
                      />
                    </motion.button>
                    
                    {/* Price Tag - Bottom Left of Image */}
                    <div className="absolute bottom-3 left-3 px-3 py-2 rounded-xl backdrop-blur-xl bg-white/95 border border-white/50 shadow-lg">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                          From
                        </span>
                        <span className="text-lg font-black" style={{ color: 'var(--foreground)' }}>
                          ₹{event.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Event Details */}
                  <div className="px-1">
                    {/* Title & Studio */}
                    <div className="mb-3">
                      <h3 className="text-lg font-black leading-tight mb-2" style={{ color: 'var(--foreground)' }}>
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
                        <span className="text-sm font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                          {event.studio}
                        </span>
                        {event.isVerified && (
                          <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500" strokeWidth={2} />
                        )}
                      </div>
                    </div>
                    
                    {/* Date & Time Row */}
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b" style={{ borderColor: 'var(--border-light)' }}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: 'var(--background)',
                            border: '1px solid var(--border-light)',
                          }}
                        >
                          <Calendar className="w-5 h-5" style={{ color: 'var(--foreground)' }} strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: 'var(--muted-foreground)' }}>
                            Date
                          </p>
                          <p className="text-xs font-black" style={{ color: 'var(--foreground)' }}>
                            {event.date}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: 'var(--background)',
                            border: '1px solid var(--border-light)',
                          }}
                        >
                          <Clock className="w-5 h-5" style={{ color: 'var(--foreground)' }} strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: 'var(--muted-foreground)' }}>
                            Time
                          </p>
                          <p className="text-xs font-black" style={{ color: 'var(--foreground)' }}>
                            {event.time}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Rating & Spots Left */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {/* Rating */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'var(--background)' }}>
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" strokeWidth={2} />
                          <span className="text-sm font-black" style={{ color: 'var(--foreground)' }}>
                            {event.rating}
                          </span>
                          <span className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
                            ({event.attendees})
                          </span>
                        </div>
                        
                        {/* Spots Left */}
                        {event.spotsLeft <= 10 && (
                          <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-rose-500">
                            <span className="text-white text-xs font-black">
                              {event.spotsLeft} spots left
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #E85A8B 0%, #F186AC 100%)',
                        color: '#FFFFFF',
                        boxShadow: '0 4px 16px rgba(232, 90, 139, 0.35)',
                      }}
                    >
                      Register Now
                      <ChevronRight className="w-4.5 h-4.5" strokeWidth={3} />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-5 py-16 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-rose-500" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-black mb-2" style={{ color: 'var(--foreground)' }}>
              No events found
            </h3>
            <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
              Try adjusting your filters or search query
            </p>
          </motion.div>
        )}
      </div>

      {/* Advanced Filter Modal */}
      <AnimatePresence>
        {showFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-w-[390px] mx-auto rounded-t-[32px] overflow-hidden"
              style={{
                backgroundColor: 'var(--background)',
                maxHeight: '90vh',
              }}
            >
              {/* Header */}
              <div 
                className="sticky top-0 z-10 px-5 py-5 border-b"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border-light)',
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #E85A8B 0%, #F186AC 100%)',
                        boxShadow: '0 4px 12px rgba(232, 90, 139, 0.3)',
                      }}
                    >
                      <Filter className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>
                      Filters
                    </h2>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFilters(false)}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    <X className="w-5 h-5" style={{ color: 'var(--foreground)' }} strokeWidth={2} />
                  </motion.button>
                </div>
                <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                  Refine your event search
                </p>
              </div>

              {/* Content - Scrollable */}
              <div className="overflow-y-auto px-5 py-6 space-y-8" style={{ maxHeight: 'calc(90vh - 180px)' }}>
                
                {/* Price Range Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} strokeWidth={2.5} />
                    <h3 className="text-lg font-black" style={{ color: 'var(--foreground)' }}>
                      Price Range
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Price Display */}
                    <div className="flex items-center justify-between">
                      <div 
                        className="px-4 py-2.5 rounded-xl"
                        style={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border-light)',
                        }}
                      >
                        <span className="text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>Min</span>
                        <p className="text-lg font-black" style={{ color: 'var(--foreground)' }}>₹{priceRange[0]}</p>
                      </div>
                      <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: 'var(--border-light)' }} />
                      <div 
                        className="px-4 py-2.5 rounded-xl"
                        style={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border-light)',
                        }}
                      >
                        <span className="text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>Max</span>
                        <p className="text-lg font-black" style={{ color: 'var(--foreground)' }}>₹{priceRange[1]}</p>
                      </div>
                    </div>

                    {/* Price Range Sliders */}
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="3000"
                        step="100"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #E85A8B 0%, #E85A8B ${(priceRange[0] / 3000) * 100}%, #E5E7EB ${(priceRange[0] / 3000) * 100}%, #E5E7EB 100%)`,
                        }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="3000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #E5E7EB 0%, #E5E7EB ${(priceRange[1] / 3000) * 100}%, #E85A8B ${(priceRange[1] / 3000) * 100}%, #E85A8B 100%)`,
                        }}
                      />
                    </div>

                    {/* Quick Price Presets */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "Budget", range: [0, 800] },
                        { label: "Mid-Range", range: [800, 1500] },
                        { label: "Premium", range: [1500, 3000] },
                        { label: "All Prices", range: [0, 3000] },
                      ].map((preset) => (
                        <motion.button
                          key={preset.label}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setPriceRange(preset.range as [number, number])}
                          className="px-4 py-2 rounded-full text-xs font-bold transition-all"
                          style={{
                            backgroundColor: priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1]
                              ? 'var(--brand-primary)'
                              : 'var(--card)',
                            color: priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1]
                              ? '#FFFFFF'
                              : 'var(--muted-foreground)',
                            border: `1px solid ${priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1] ? 'transparent' : 'var(--border-light)'}`,
                          }}
                        >
                          {preset.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Available Spots Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} strokeWidth={2.5} />
                    <h3 className="text-lg font-black" style={{ color: 'var(--foreground)' }}>
                      Available Spots
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "all", label: "All Events", icon: Zap },
                      { id: "few", label: "Limited (<10)", icon: Timer },
                      { id: "many", label: "Available (10+)", icon: CheckCircle2 },
                    ].map((option) => {
                      const isActive = spotsFilter === option.id;
                      const Icon = option.icon;
                      return (
                        <motion.button
                          key={option.id}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSpotsFilter(option.id)}
                          className="p-4 rounded-2xl text-center transition-all"
                          style={{
                            backgroundColor: isActive ? 'var(--brand-primary)' : 'var(--card)',
                            color: isActive ? '#FFFFFF' : 'var(--foreground)',
                            border: `1px solid ${isActive ? 'transparent' : 'var(--border-light)'}`,
                            boxShadow: isActive ? '0 4px 12px rgba(232, 90, 139, 0.3)' : 'none',
                          }}
                        >
                          <Icon className={`w-6 h-6 mx-auto mb-2 ${isActive ? 'text-white' : ''}`} strokeWidth={2.5} style={{ color: isActive ? '#FFFFFF' : 'var(--brand-primary)' }} />
                          <p className="text-xs font-bold leading-tight">{option.label}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Verified Only Toggle */}
                <div>
                  <div 
                    className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all"
                    style={{
                      backgroundColor: verifiedOnly ? 'rgba(232, 90, 139, 0.1)' : 'var(--card)',
                      border: `1px solid ${verifiedOnly ? 'var(--brand-primary)' : 'var(--border-light)'}`,
                    }}
                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: verifiedOnly 
                            ? 'linear-gradient(135deg, #E85A8B 0%, #F186AC 100%)'
                            : 'var(--background)',
                          border: verifiedOnly ? 'none' : '1px solid var(--border-light)',
                        }}
                      >
                        <BadgeCheck 
                          className="w-6 h-6" 
                          strokeWidth={2.5} 
                          style={{ color: verifiedOnly ? '#FFFFFF' : 'var(--brand-primary)' }}
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-black mb-0.5" style={{ color: 'var(--foreground)' }}>
                          Verified Studios Only
                        </h3>
                        <p className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
                          Show only verified and trusted venues
                        </p>
                      </div>
                    </div>
                    
                    {/* Toggle Switch */}
                    <div 
                      className="relative w-12 h-7 rounded-full transition-all"
                      style={{
                        backgroundColor: verifiedOnly ? 'var(--brand-primary)' : '#E5E7EB',
                      }}
                    >
                      <motion.div
                        className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg"
                        animate={{
                          left: verifiedOnly ? '24px' : '4px',
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Date Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} strokeWidth={2.5} />
                    <h3 className="text-lg font-black" style={{ color: 'var(--foreground)' }}>
                      Event Date
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { id: "all", label: "All Dates" },
                      { id: "Dec 15, 2024", label: "Dec 15, 2024" },
                      { id: "Dec 18, 2024", label: "Dec 18, 2024" },
                      { id: "Dec 20, 2024", label: "Dec 20, 2024" },
                      { id: "Dec 22, 2024", label: "Dec 22, 2024" },
                    ].map((date) => {
                      const isActive = selectedDate === date.id;
                      return (
                        <motion.button
                          key={date.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedDate(date.id)}
                          className="w-full px-5 py-4 rounded-2xl text-left flex items-center justify-between transition-all"
                          style={{
                            backgroundColor: isActive ? 'var(--brand-primary)' : 'var(--card)',
                            color: isActive ? '#FFFFFF' : 'var(--foreground)',
                            border: `1px solid ${isActive ? 'transparent' : 'var(--border-light)'}`,
                            boxShadow: isActive ? '0 4px 12px rgba(232, 90, 139, 0.3)' : 'none',
                          }}
                        >
                          <span className="font-bold">{date.label}</span>
                          {isActive && (
                            <CheckCircle2 className="w-5 h-5 text-white fill-white" strokeWidth={2.5} />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div 
                className="sticky bottom-0 px-5 py-5 border-t flex gap-3"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border-light)',
                }}
              >
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setPriceRange([0, 2000]);
                    setSelectedDate("all");
                    setSpotsFilter("all");
                    setVerifiedOnly(false);
                  }}
                  className="flex-1 py-4 rounded-2xl font-bold text-sm transition-all"
                  style={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--foreground)',
                  }}
                >
                  Reset All
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowFilters(false)}
                  className="flex-[2] py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #E85A8B 0%, #F186AC 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 16px rgba(232, 90, 139, 0.35)',
                  }}
                >
                  Show {filteredEvents.length} Events
                  <ChevronRight className="w-4.5 h-4.5" strokeWidth={3} />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}