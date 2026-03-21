import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Search, MapPin, Bell, ChevronRight, Star, Clock, Flame, MessagesSquare, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { VenueCard, CategoryCard } from "../components/AnimatedCard";
import { VenueCardSkeleton, CategorySkeleton } from "../components/LoadingSkeleton";
import { LuxuryRating, GoldAccent, LuxuryHeading, PremiumBadge, SilkOverlay } from "../components/LuxuryEffects";
import { useTheme } from "../context/ThemeContext";
import womenHaircut from "../../assets/categories/women/haircut.png";
import womenFacial from "../../assets/categories/women/facial.png";
import womenManicure from "../../assets/categories/women/manicure.png";
import womenPedicure from "../../assets/categories/women/pedicure.png";
import womenNailArt from "../../assets/categories/women/nail-art.png";
import womenHairColoring from "../../assets/categories/women/hair-coloring.png";
import womenCleanup from "../../assets/categories/women/cleanup.png";
import womenMassage from "../../assets/categories/women/massage.png";
import womenMakeup from "../../assets/categories/women/makeup.png";
import menHaircut from "../../assets/categories/men/haircut.png";
import menFacial from "../../assets/categories/men/facial.png";
import menManicure from "../../assets/categories/men/manicure.png";
import menPedicure from "../../assets/categories/men/pedicure.png";
import menNailArt from "../../assets/categories/men/nail-art.png";
import menHairColoring from "../../assets/categories/men/hair-coloring.png";
import menBeardGrooming from "../../assets/categories/men/beard-grooming.png";
import menCleanup from "../../assets/categories/men/cleanup.png";
import menMassage from "../../assets/categories/men/massage.png";

type GenderType = "women" | "men";

interface CategoryItem {
  name: string;
  image: string;
}

const genderCategories: Record<GenderType, CategoryItem[]> = {
  women: [
    { name: "Haircut", image: womenHaircut },
    { name: "Facial", image: womenFacial },
    { name: "Manicure", image: womenManicure },
    { name: "Pedicure", image: womenPedicure },
    { name: "Nail Art", image: womenNailArt },
    { name: "Hair Coloring", image: womenHairColoring },
    { name: "Cleanup", image: womenCleanup },
    { name: "Massage", image: womenMassage },
    { name: "Makeup", image: womenMakeup },
  ],
  men: [
    { name: "Haircut", image: menHaircut },
    { name: "Facial", image: menFacial },
    { name: "Manicure", image: menManicure },
    { name: "Pedicure", image: menPedicure },
    { name: "Nail Art", image: menNailArt },
    { name: "Hair Coloring", image: menHairColoring },
    { name: "Beard Grooming", image: menBeardGrooming },
    { name: "Cleanup", image: menCleanup },
    { name: "Massage", image: menMassage },
  ],
};

type SalonGender = "women" | "men" | "unisex";

interface SalonData {
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
}

const allSalons: SalonData[] = [
  { id: 1, name: "Luxe Beauty Studio", image: "https://images.unsplash.com/photo-1759134155377-4207d89b39ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 4.9, reviews: 234, distanceKm: 0.8, category: "Hair & Makeup", genderType: "women", openUntil: "8:00 PM", price: "From ₹1,200", services: ["Haircut", "Makeup", "Hair Coloring"] },
  { id: 2, name: "Serenity Spa & Salon", image: "https://images.unsplash.com/photo-1760862652442-e8ff7ebdd2f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 4.8, reviews: 189, distanceKm: 1.2, category: "Spa & Wellness", genderType: "unisex", openUntil: "9:00 PM", price: "From ₹1,800", services: ["Massage", "Facial", "Cleanup"] },
  { id: 3, name: "Glow & Beauty Bar", image: "https://images.unsplash.com/photo-1758188753373-5b01a0fc6d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 5.0, reviews: 98, distanceKm: 1.8, category: "Skincare & Facials", genderType: "women", openUntil: "7:00 PM", price: "From ₹1,500", services: ["Facial", "Cleanup", "Manicure"] },
  { id: 4, name: "Glamour Nails Studio", image: "https://images.unsplash.com/photo-1769034260387-39fa07f0c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 4.7, reviews: 156, distanceKm: 2.1, category: "Nails & Beauty", genderType: "unisex", openUntil: "8:30 PM", price: "From ₹800", services: ["Manicure", "Pedicure", "Nail Art"] },
  { id: 5, name: "Divine Hair Lounge", image: "https://images.unsplash.com/photo-1763612812693-9b021dfa016b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 4.9, reviews: 312, distanceKm: 1.5, category: "Hair Styling", genderType: "unisex", openUntil: "8:00 PM", price: "From ₹1,100", services: ["Haircut", "Hair Coloring", "Beard Grooming"] },
  { id: 6, name: "Bliss Wellness Spa", image: "https://images.unsplash.com/photo-1762631203805-88841687ab4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 4.8, reviews: 267, distanceKm: 0.9, category: "Spa & Massage", genderType: "unisex", openUntil: "9:30 PM", price: "From ₹2,000", services: ["Massage", "Facial", "Cleanup"] },
  { id: 7, name: "Radiance Beauty Studio", image: "https://images.unsplash.com/photo-1760862652442-e8ff7ebdd2f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 5.0, reviews: 421, distanceKm: 1.3, category: "Premium Salon", genderType: "women", openUntil: "10:00 PM", price: "From ₹1,600", trending: true, services: ["Haircut", "Hair Coloring", "Makeup"] },
  { id: 8, name: "King's Barbershop", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 4.9, reviews: 345, distanceKm: 0.5, category: "Barbershop", genderType: "men", openUntil: "9:00 PM", price: "From ₹500", trending: true, services: ["Haircut", "Beard Grooming", "Cleanup"] },
  { id: 9, name: "Urban Groom Lounge", image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 4.7, reviews: 198, distanceKm: 2.5, category: "Men's Grooming", genderType: "men", openUntil: "8:30 PM", price: "From ₹700", services: ["Haircut", "Facial", "Beard Grooming"] },
  { id: 10, name: "Royal Men's Salon", image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 4.6, reviews: 142, distanceKm: 0.3, category: "Men's Salon", genderType: "men", openUntil: "9:00 PM", price: "From ₹400", services: ["Haircut", "Cleanup", "Hair Coloring"] },
  { id: 11, name: "Bella Nail Art Studio", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 4.8, reviews: 176, distanceKm: 0.7, category: "Nail Art", genderType: "women", openUntil: "7:30 PM", price: "From ₹600", services: ["Nail Art", "Manicure", "Pedicure"] },
  { id: 12, name: "Aura Wellness Center", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 4.9, reviews: 289, distanceKm: 1.0, category: "Wellness", genderType: "unisex", openUntil: "10:00 PM", price: "From ₹1,500", services: ["Massage", "Facial", "Cleanup"] },
  { id: 13, name: "Gentleman's Corner", image: "https://images.unsplash.com/photo-1585747860019-8e8ef5e724c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 4.5, reviews: 87, distanceKm: 2.8, category: "Barbershop", genderType: "men", openUntil: "8:00 PM", price: "From ₹350", services: ["Haircut", "Beard Grooming", "Massage"] },
  { id: 14, name: "Priya's Beauty Parlour", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 4.4, reviews: 65, distanceKm: 0.2, category: "Beauty Parlour", genderType: "women", openUntil: "7:00 PM", price: "From ₹300", services: ["Facial", "Cleanup", "Hair Coloring"] },
  { id: 15, name: "Elite Unisex Salon", image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 4.8, reviews: 410, distanceKm: 1.6, category: "Unisex Salon", genderType: "unisex", openUntil: "9:30 PM", price: "From ₹900", trending: true, services: ["Haircut", "Facial", "Manicure", "Pedicure"] },
  { id: 16, name: "Zen Men's Spa", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", rating: 4.7, reviews: 134, distanceKm: 0.6, category: "Men's Spa", genderType: "men", openUntil: "10:00 PM", price: "From ₹1,200", services: ["Massage", "Facial", "Cleanup"] },
];

const RADIUS_OPTIONS = [
  { label: "100m", value: 0.1 },
  { label: "300m", value: 0.3 },
  { label: "500m", value: 0.5 },
  { label: "1km", value: 1 },
  { label: "3km", value: 3 },
];

const recentlyViewed = allSalons.filter(s => [5, 6, 1].includes(s.id));
const trendingSalons = allSalons.filter(s => s.trending);

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
  const [categoryGender, setCategoryGender] = useState<GenderType>("women");
  const [searchRadius, setSearchRadius] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const navigate = useNavigate();

  const activeCategories = useMemo(() => genderCategories[categoryGender], [categoryGender]);

  const filteredSalons = useMemo(() => {
    return allSalons
      .filter(salon => {
        if (salon.distanceKm > searchRadius) return false;
        if (categoryGender === "women" && salon.genderType === "men") return false;
        if (categoryGender === "men" && salon.genderType === "women") return false;
        if (selectedCategory) {
          const hasService = salon.services.some(
            s => s.toLowerCase() === selectedCategory.toLowerCase()
          );
          if (!hasService) return false;
        }
        return true;
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [searchRadius, categoryGender, selectedCategory]);

  const handleCategorySelect = useCallback((categoryName: string) => {
    setShowCategoryDropdown(false);
    navigate(`/map?category=${encodeURIComponent(categoryName)}`);
  }, [navigate]);

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
        {/* Location + Bell Icon */}
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>San Francisco, CA</span>
            <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          </button>
          <motion.button
            onClick={() => navigate("/notifications")}
            className="relative w-11 h-11 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: 'var(--background-elevated)',
              boxShadow: 'var(--elevation-2)',
            }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05, boxShadow: 'var(--elevation-3)' }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Bell className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
            <span
              className="absolute top-2 right-2 w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            />
          </motion.button>
        </div>

        {/* Profile + Gender Toggle */}
        <div className="flex items-center justify-between mb-6">
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

          {/* Women | Unisex | Men Toggle */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div
              className="relative flex rounded-full p-px"
              style={{
                backgroundColor: 'var(--muted)',
                border: '1px solid var(--border-light)',
              }}
            >
              <motion.div
                className="absolute top-px bottom-px rounded-full"
                style={{
                  width: 'calc(66.666% - 2px)',
                }}
                animate={{
                  left: categoryGender === "women" ? '1px' : 'calc(33.333%)',
                  background: categoryGender === "women"
                    ? 'linear-gradient(135deg, #ec4899, #d946ef)'
                    : 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              {(["women", "unisex", "men"] as const).map((g) => {
                const isActive = g === "unisex"
                  || (categoryGender === "women" && g === "women")
                  || (categoryGender === "men" && g === "men");
                return (
                  <button
                    key={g}
                    onClick={() => {
                      if (g === "women") setCategoryGender("women");
                      else if (g === "men") setCategoryGender("men");
                    }}
                    className="relative z-10 px-2 py-1 text-[9px] font-bold capitalize transition-colors duration-200"
                    style={{
                      color: isActive ? 'white' : 'var(--muted-foreground)',
                    }}
                  >
                    {g === "women" ? "Women" : g === "unisex" ? "Unisex" : "Men"}
                  </button>
                );
              })}
            </div>
            <span className="text-[8px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>select salon type</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <motion.button
            onClick={() => setShowCategoryDropdown(prev => !prev)}
            className="flex items-center gap-3 px-4 py-3.5 w-full text-left transition-all duration-300"
            style={{
              backgroundColor: 'var(--background-elevated)',
              boxShadow: 'var(--elevation-2)',
              borderRadius: 'var(--radius-xl)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Search className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />
            <span className="flex-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>
              {selectedCategory ? selectedCategory : "Nearby Salons & Services"}
            </span>
            {selectedCategory && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={(e) => { e.stopPropagation(); setSelectedCategory(null); }}
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--muted)' }}
              >
                <X className="w-3.5 h-3.5" style={{ color: 'var(--text-secondary)' }} />
              </motion.span>
            )}
          </motion.button>

          {showCategoryDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full mt-2 z-50 p-3 overflow-hidden"
              style={{
                backgroundColor: 'var(--background-elevated)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                border: '1px solid var(--border-light)',
              }}
            >
              <div className="flex flex-wrap gap-2">
                {activeCategories.map((cat) => (
                  <motion.button
                    key={cat.name}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategorySelect(cat.name)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold transition-colors"
                    style={{
                      backgroundColor: selectedCategory === cat.name
                        ? (categoryGender === "women" ? '#ec4899' : '#3b82f6')
                        : 'var(--muted)',
                      color: selectedCategory === cat.name ? 'white' : 'var(--text-primary)',
                      border: `1px solid ${selectedCategory === cat.name ? 'transparent' : 'var(--border-light)'}`,
                    }}
                  >
                    <img src={cat.image} alt="" className="w-5 h-5 rounded-full object-cover" />
                    {cat.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Search Radius */}
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs font-semibold flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>
            Search radius:
          </span>
          <div
            className="flex items-center gap-1 flex-1 p-1 rounded-full"
            style={{
              backgroundColor: 'var(--muted)',
              border: '1px solid var(--border-light)',
            }}
          >
            {RADIUS_OPTIONS.map((opt) => (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchRadius(opt.value)}
                className="flex-1 py-1.5 rounded-full text-xs font-bold text-center transition-colors duration-200"
                style={{
                  background: searchRadius === opt.value
                    ? (categoryGender === "women"
                      ? 'linear-gradient(135deg, #ec4899, #a855f7)'
                      : 'linear-gradient(135deg, #3b82f6, #8b5cf6)')
                    : 'transparent',
                  color: searchRadius === opt.value ? 'white' : 'var(--muted-foreground)',
                }}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>
        </div>
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
        <div className="flex items-center gap-3 mb-4">
          <h2
            className="text-xl font-bold tracking-tight"
            style={{
              color: 'var(--foreground)',
              letterSpacing: '-0.02em',
            }}
          >
            Top categories
          </h2>
        </div>

        <motion.div
          key={categoryGender}
          className="grid grid-cols-4 gap-x-2 gap-y-4"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {activeCategories.map((category, index) => (
            <motion.button
              key={`${categoryGender}-${category.name}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => navigate(`/map?category=${encodeURIComponent(category.name)}`)}
              className="flex flex-col items-center gap-2"
            >
              <motion.div
                className="relative w-[78px] h-[78px] rounded-full overflow-hidden"
                style={{
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08), 0 0 0 1.5px rgba(212,175,55,0.25)',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  style={{ filter: 'contrast(1.05) saturate(1.1)' }}
                />
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: 'linear-gradient(160deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)',
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -2px 6px rgba(0,0,0,0.15)',
                  }}
                />
              </motion.div>
              <span
                className="text-[11px] font-semibold text-center leading-tight px-0.5 line-clamp-2"
                style={{
                  color: 'var(--foreground)',
                  letterSpacing: '-0.01em',
                }}
              >
                {category.name}
              </span>
            </motion.button>
          ))}
        </motion.div>
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
                    📍 {venue.distanceKm < 1 ? `${(venue.distanceKm * 1000).toFixed(0)}m` : `${venue.distanceKm.toFixed(1)} km`}
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

      {/* Filtered Salons - Near You */}
      <div className="mb-7">
        <div className="flex items-center justify-between px-5 mb-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
            {selectedCategory ? `${selectedCategory} — Near you` : "Near you"}
          </h2>
          <button
            onClick={() => navigate("/map")}
            className="text-sm font-semibold flex items-center gap-1"
            style={{ color: 'var(--luxury-gold-500)' }}
          >
            See all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {filteredSalons.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <Search className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--text-tertiary)' }} />
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>No salons found</p>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Try increasing the search radius or changing filters</p>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-2">
            {filteredSalons.map((venue, index) => (
              <motion.div
                key={`${categoryGender}-${searchRadius}-${selectedCategory}-${venue.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/salon/${venue.id}`)}
                className="flex-shrink-0 w-[280px] cursor-pointer"
              >
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
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'var(--gradient-overlay)' }}
                  />
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
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
                    style={{
                      background: venue.genderType === "unisex"
                        ? 'linear-gradient(135deg, #ec4899, #3b82f6)'
                        : venue.genderType === "women"
                          ? 'linear-gradient(135deg, #ec4899, #f472b6)'
                          : 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                    }}
                  >
                    {venue.genderType === "unisex" ? "Unisex" : venue.genderType === "women" ? "Women" : "Men"}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span
                      className="text-white text-xs font-medium px-3 py-1.5"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      📍 {venue.distanceKm < 1 ? `${(venue.distanceKm * 1000).toFixed(0)}m` : `${venue.distanceKm.toFixed(1)} km`}
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

                <div className="px-1">
                  <h3 className="font-black text-base mb-1.5 truncate" style={{ color: 'var(--text-primary)' }}>{venue.name}</h3>
                  <p className="text-xs mb-2.5 truncate" style={{ color: 'var(--muted-foreground)' }}>{venue.category}</p>
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
        )}
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
                    📍 {venue.distanceKm < 1 ? `${(venue.distanceKm * 1000).toFixed(0)}m` : `${venue.distanceKm.toFixed(1)} km`}
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