import { ArrowLeft, Star, MapPin, Clock, Heart, Share2, Check, ChevronRight, Phone, Crown, Sparkles, Users, MessageCircle, Award, Zap, Gift, Shield, BadgeCheck, Scissors, Palette } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const salonData = {
  name: "Luxe Beauty Studio",
  tagline: "Premium Hair & Spa Services",
  images: [
    "https://images.unsplash.com/photo-1711517479380-9fa1735be261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwbW9kZXJuJTIwSW5kaWF8ZW58MXx8fHwxNzczNjgzMTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1638964327749-53436bcccdca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGx1eHVyeSUyMHNhbG9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczNjgzMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1641699862936-be9f49b1c38d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBicmlkZSUyMG1ha2V1cCUyMGJlYXV0eXxlbnwxfHx8fDE3NzM2ODMxODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ],
  rating: 4.9,
  reviews: 234,
  address: "123 Market Street, San Francisco, CA",
  hours: "9:00 AM – 8:00 PM",
  openNow: true,
  about:
    "Premium beauty salon offering exceptional hair, makeup, and spa services. Our expert stylists are dedicated to making you look and feel your absolute best.",
};

const stylists = [
  {
    id: 1,
    name: "Priya Sharma",
    image: "https://images.unsplash.com/photo-1625144099162-99d373d7f876?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBoYWlyc3R5bGlzdCUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzY4MzE4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    speciality: "Hair Color Expert",
    experience: "8 yrs",
    rating: 5.0,
    verified: true,
  },
  {
    id: 2,
    name: "Ananya Patel",
    image: "https://images.unsplash.com/photo-1737652422597-b809b4068b94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBtYWtldXAlMjBhcnRpc3QlMjBiZWF1dHklMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczNjgzMTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    speciality: "Makeup Artist",
    experience: "6 yrs",
    rating: 4.9,
    verified: true,
  },
  {
    id: 3,
    name: "Meera Kapoor",
    image: "https://images.unsplash.com/photo-1663352633732-473ac30b69e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMHNraW5jYXJlJTIwc3BlY2lhbGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzY4MzE4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    speciality: "Skincare Specialist",
    experience: "5 yrs",
    rating: 4.8,
    verified: true,
  },
];

const services = [
  {
    id: 1,
    category: "Hair Services",
    icon: Scissors,
    color: "var(--gradient-primary)",
    items: [
      { name: "Women's Haircut", duration: "45 min", price: "₹1,200" },
      { name: "Men's Haircut", duration: "30 min", price: "₹800" },
      { name: "Hair Coloring", duration: "2 hrs", price: "₹3,500" },
      { name: "Highlights", duration: "2.5 hrs", price: "₹4,500" },
      { name: "Blow Dry & Style", duration: "30 min", price: "₹600" },
      { name: "Hair Treatment", duration: "1 hr", price: "₹2,000" },
    ],
  },
  {
    id: 2,
    category: "Skin & Facial",
    icon: Sparkles,
    color: "var(--gradient-accent)",
    items: [
      { name: "Classic Facial", duration: "60 min", price: "₹1,800" },
      { name: "Deep Cleansing Facial", duration: "75 min", price: "₹2,500" },
      { name: "Anti-Aging Facial", duration: "90 min", price: "₹3,500" },
      { name: "Hydrafacial", duration: "60 min", price: "₹4,000" },
      { name: "Gold Facial", duration: "90 min", price: "₹5,500" },
    ],
  },
  {
    id: 3,
    category: "Makeup & Beauty",
    icon: Palette,
    color: "var(--gradient-gold)",
    items: [
      { name: "Party Makeup", duration: "60 min", price: "₹2,500" },
      { name: "Bridal Makeup", duration: "2 hrs", price: "₹8,000" },
      { name: "Bridal Package (with trial)", duration: "varies", price: "₹15,000" },
      { name: "Airbrush Makeup", duration: "90 min", price: "₹4,500" },
      { name: "HD Makeup", duration: "90 min", price: "₹3,500" },
    ],
  },
  {
    id: 4,
    category: "Nail Services",
    icon: Sparkles,
    color: "var(--gradient-primary)",
    items: [
      { name: "Classic Manicure", duration: "45 min", price: "₹800" },
      { name: "Gel Manicure", duration: "60 min", price: "₹1,200" },
      { name: "Classic Pedicure", duration: "60 min", price: "₹1,000" },
      { name: "Gel Pedicure", duration: "75 min", price: "₹1,500" },
      { name: "Nail Art (per nail)", duration: "10 min", price: "₹150" },
    ],
  },
  {
    id: 5,
    category: "Spa & Massage",
    icon: Sparkles,
    color: "var(--gradient-cool)",
    items: [
      { name: "Swedish Massage", duration: "60 min", price: "₹2,500" },
      { name: "Deep Tissue Massage", duration: "75 min", price: "₹3,000" },
      { name: "Aromatherapy", duration: "90 min", price: "₹3,500" },
      { name: "Hot Stone Massage", duration: "90 min", price: "₹4,000" },
      { name: "Body Scrub", duration: "45 min", price: "₹2,000" },
    ],
  },
];

const packages = [
  {
    id: 1,
    name: "Glow Up Essentials",
    description: "Perfect for regular beauty maintenance",
    price: "₹4,999",
    originalPrice: "₹6,500",
    services: ["Haircut & Style", "Facial Treatment", "Manicure"],
    popular: false,
    savings: "Save ₹1,501",
    icon: Sparkles,
  },
  {
    id: 2,
    name: "Premium Transformation",
    description: "Complete beauty makeover experience",
    price: "₹9,999",
    originalPrice: "₹13,000",
    services: ["Hair Color + Cut", "Deluxe Facial", "Makeup Session", "Mani + Pedi"],
    popular: true,
    savings: "Save ₹3,001",
    icon: Crown,
  },
  {
    id: 3,
    name: "Bridal Luxury Package",
    description: "Everything you need for your special day",
    price: "₹19,999",
    originalPrice: "₹26,500",
    services: ["Bridal Hair", "Bridal Makeup", "Trial Session", "Spa Treatment", "Nail Art"],
    popular: false,
    savings: "Save ₹6,501",
    icon: Gift,
  },
];

const memberships = [
  {
    id: 1,
    name: "Beauty Basics",
    price: "₹2,299",
    period: "/month",
    benefits: ["10% off all services", "Priority booking", "1 free blowout monthly", "Birthday gift"],
    color: "var(--gradient-primary)",
    icon: Sparkles,
  },
  {
    id: 2,
    name: "Luxe Member",
    price: "₹3,799",
    period: "/month",
    benefits: ["20% off all services", "VIP priority access", "2 free services monthly", "Exclusive events", "Free product samples"],
    color: "var(--gradient-accent)",
    popular: true,
    icon: Crown,
  },
  {
    id: 3,
    name: "Elite Platinum",
    price: "₹6,299",
    period: "/month",
    benefits: ["30% off all services", "Concierge booking", "4 free services monthly", "Private stylist access", "Premium gift box quarterly"],
    color: "from-amber-400 via-amber-500 to-orange-500",
    icon: Shield,
  },
];

const reviews = [
  {
    id: 1,
    name: "Kavya Reddy",
    avatar: "https://images.unsplash.com/photo-1757351122506-3c6a394e9cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGVsZWdhbnQlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzM2ODMxODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    date: "2 days ago",
    text: "Absolutely amazing experience! Priya did an incredible job with my hair color. The salon is beautiful and the staff is so professional.",
    service: "Hair Coloring",
    verified: true,
    images: ["https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400"],
  },
  {
    id: 2,
    name: "Riya Malhotra",
    avatar: "https://images.unsplash.com/photo-1667382137969-a11fd256717d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGJlYXV0aWZ1bCUyMHNtaWxlJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NzM2ODMxODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    date: "1 week ago",
    text: "Best facial I've ever had! My skin is glowing. The ambiance is so relaxing and luxurious. Highly recommend!",
    service: "Facial Treatment",
    verified: true,
    images: [],
  },
  {
    id: 3,
    name: "Aadhya Shah",
    avatar: "https://images.unsplash.com/photo-1638964327749-53436bcccdca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMGx1eHVyeSUyMHNhbG9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczNjgzMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    date: "2 weeks ago",
    text: "Ananya is a makeup goddess! She made me look absolutely stunning for my wedding. Can't thank her enough!",
    service: "Bridal Makeup",
    verified: true,
    images: ["https://images.unsplash.com/photo-1641699862936-be9f49b1c38d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBicmlkZSUyMG1ha2V1cCUyMGJlYXV0eXxlbnwxfHx8fDE3NzM2ODMxODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400"],
  },
];

type TabType = "services" | "packages" | "membership" | "team" | "reviews" | "about";

export function SalonDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"services" | "packages" | "membership" | "team" | "reviews" | "about">("services");
  const [activeServiceCategory, setActiveServiceCategory] = useState(1);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [selectedServiceDetails, setSelectedServiceDetails] = useState<Array<{name: string, duration: string, price: string}>>([]);

  const toggleServiceSelection = (serviceName: string) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(serviceName)) {
      newSelected.delete(serviceName);
      setSelectedServiceDetails(prev => prev.filter(s => s.name !== serviceName));
    } else {
      newSelected.add(serviceName);
      // Find the service details
      const serviceDetail = services.flatMap(s => s.items).find(item => item.name === serviceName);
      if (serviceDetail) {
        setSelectedServiceDetails(prev => [...prev, serviceDetail]);
      }
    }
    setSelectedServices(newSelected);
  };

  // Handle URL params for pre-selected service
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const tabParam = searchParams.get("tab");
    
    if (tabParam === "services") {
      setActiveTab("services");
    }
    
    if (serviceParam) {
      // Find which category contains this service
      const categoryWithService = services.find((category) =>
        category.items.some((item) => item.name === serviceParam)
      );
      
      if (categoryWithService) {
        setActiveServiceCategory(categoryWithService.id);
        setSelectedServices(new Set([serviceParam]));
        // Find the service details
        const serviceDetail = categoryWithService.items.find(item => item.name === serviceParam);
        if (serviceDetail) {
          setSelectedServiceDetails([serviceDetail]);
        }
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen pb-32 transition-colors duration-300" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-[390px] mx-auto">
        {/* Hero Image Gallery */}
        <div className="relative h-80 bg-gray-900 overflow-hidden">
          {/* Image with zoom effect */}
          <motion.div
            key={activePhotoIndex}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={salonData.images[activePhotoIndex]}
              alt={salonData.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Dark gradient overlay at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Header buttons - Glassmorphism */}
          <div className="absolute top-12 left-0 right-0 px-5 flex items-center justify-between z-10">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              }}
            >
              <ArrowLeft className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={2.5} />
            </motion.button>
            
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xl"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                }}
              >
                <Share2 className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={2.5} />
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xl relative overflow-hidden"
                style={{
                  backgroundColor: isFavorite 
                    ? 'rgba(251, 113, 133, 0.9)' 
                    : 'rgba(255, 255, 255, 0.25)',
                  border: isFavorite 
                    ? '1px solid rgba(251, 113, 133, 1)' 
                    : '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: isFavorite
                    ? '0 8px 32px rgba(251, 113, 133, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                    : '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                }}
              >
                <motion.div
                  animate={isFavorite ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <Heart
                    className={`w-5 h-5 drop-shadow-lg transition-all ${
                      isFavorite ? "fill-white text-white" : "text-white"
                    }`}
                    strokeWidth={2.5}
                  />
                </motion.div>
                
                {/* Heart particles effect when favorited */}
                {isFavorite && (
                  <>
                    <motion.div
                      className="absolute"
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{ scale: [0, 1, 1], x: -15, y: -15, opacity: [1, 1, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      <Heart className="w-3 h-3 fill-white text-white" />
                    </motion.div>
                    <motion.div
                      className="absolute"
                      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                      animate={{ scale: [0, 1, 1], x: 15, y: -15, opacity: [1, 1, 0] }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <Heart className="w-2 h-2 fill-white text-white" />
                    </motion.div>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Modern image indicator - Pill with blur background */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-xl flex items-center gap-2"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Dots indicator */}
            <div className="flex gap-1.5">
              {salonData.images.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActivePhotoIndex(index)}
                  className="rounded-full transition-all"
                  style={{
                    width: index === activePhotoIndex ? '24px' : '6px',
                    height: '6px',
                    backgroundColor: index === activePhotoIndex 
                      ? 'rgba(255, 255, 255, 0.95)' 
                      : 'rgba(255, 255, 255, 0.4)',
                  }}
                  animate={{
                    width: index === activePhotoIndex ? '24px' : '6px',
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            
            {/* Counter text */}
            <div className="h-4 w-px bg-white/30 mx-1" />
            <span className="text-white text-xs font-bold tracking-wide drop-shadow-lg">
              {activePhotoIndex + 1}/{salonData.images.length}
            </span>
          </motion.div>

          {/* Swipe hint on first image */}
          {activePhotoIndex === 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: 1, repeat: 2 }}
              className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-xl"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <span className="text-white text-xs font-semibold drop-shadow-lg">Swipe</span>
              <ChevronRight className="w-4 h-4 text-white drop-shadow-lg" />
            </motion.div>
          )}
        </div>

        {/* Salon Info Section - Below Image */}
        <div 
          className="px-6 pt-7 pb-6 transition-colors duration-300"
          style={{ 
            backgroundColor: 'var(--background)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
          }}
        >
          {/* Title */}
          <h1 className="text-3xl font-black mb-3 leading-tight" style={{ color: 'var(--foreground)' }}>
            {salonData.name}
          </h1>
          
          {/* Rating Badge */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-1.5">
                <Star className="w-4.5 h-4.5 fill-amber-500 text-amber-500" strokeWidth={2} />
                <span className="font-black text-base text-amber-900">{salonData.rating}</span>
              </div>
              <div className="w-px h-4 bg-amber-300" />
              <span className="text-sm font-bold text-amber-800">
                {salonData.reviews} reviews
              </span>
            </motion.div>

            {/* Open Status Chip */}
            <motion.div 
              className="px-3.5 py-2 rounded-full shadow-sm flex items-center gap-2"
              style={{
                background: salonData.openNow 
                  ? 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)'
                  : 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
                border: salonData.openNow 
                  ? '1px solid rgba(16, 185, 129, 0.3)'
                  : '1px solid rgba(239, 68, 68, 0.3)',
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: salonData.openNow ? '#10B981' : '#EF4444',
                }}
                animate={{
                  scale: salonData.openNow ? [1, 1.2, 1] : 1,
                  opacity: salonData.openNow ? [1, 0.6, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span 
                className="text-xs font-black tracking-wide"
                style={{
                  color: salonData.openNow ? '#065F46' : '#991B1B'
                }}
              >
                {salonData.openNow ? 'OPEN NOW' : 'CLOSED'}
              </span>
            </motion.div>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
            <span className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
              {salonData.hours}
            </span>
          </div>

          {/* Location and Distance */}
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
            <div className="flex-1">
              <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {salonData.address}
              </p>
              <p className="text-xs font-bold mt-1" style={{ color: 'var(--color-primary)' }}>
                12.2 mi away
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div 
          className="sticky top-0 z-30 backdrop-blur-xl transition-colors duration-300"
          style={{ 
            backgroundColor: 'var(--background-glass)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="px-5 py-4">
            {/* Segmented Control Container */}
            <div 
              className="relative rounded-2xl p-1.5 shadow-inner transition-colors duration-300"
              style={{
                backgroundColor: 'var(--muted)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div className="flex overflow-x-auto scrollbar-hide gap-1 relative">
                {([
                  { id: "services", label: "Services", icon: Scissors },
                  { id: "packages", label: "Packages", icon: Sparkles },
                  { id: "membership", label: "Membership", icon: Crown },
                  { id: "team", label: "Team", icon: Users },
                  { id: "reviews", label: "Reviews", icon: MessageCircle },
                  { id: "about", label: "About", icon: MapPin },
                ] as const).map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="relative px-4 py-2.5 rounded-xl flex-shrink-0 flex items-center gap-2 transition-all duration-300 z-10"
                      style={{
                        color: isActive ? 'white' : 'var(--muted-foreground)',
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* Active Background */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-xl shadow-lg"
                          style={{
                            background: 'var(--gradient-primary)',
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Icon */}
                      <motion.div
                        className="relative z-10"
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          rotate: isActive ? [0, -5, 5, 0] : 0,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon 
                          className="w-4 h-4" 
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                      </motion.div>

                      {/* Label */}
                      <motion.span
                        className="text-sm font-bold whitespace-nowrap relative z-10"
                        animate={{
                          scale: isActive ? 1.02 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {tab.label}
                      </motion.span>

                      {/* Active indicator glow */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background: 'var(--gradient-primary)',
                            opacity: 0.3,
                          }}
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.3, 0.15, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-5 pt-6">
          {/* Services Tab */}
          {activeTab === "services" && (
            <div>
              {/* Category Filter */}
              <div className="mb-5">
                <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-1">
                  {services.map((service) => {
                    const isActive = activeServiceCategory === service.id;
                    return (
                      <button
                        key={service.id}
                        onClick={() => setActiveServiceCategory(service.id)}
                        className={`px-5 py-2.5 rounded-full border-2 flex-shrink-0 transition-all text-sm font-bold shadow-md`}
                        style={
                          isActive
                            ? {
                                borderColor: 'var(--primary)',
                                backgroundColor: 'var(--primary-subtle)',
                                color: 'var(--primary)',
                              }
                            : {
                                backgroundColor: 'var(--card)',
                                borderColor: 'var(--border)',
                                color: 'var(--foreground)',
                              }
                        }
                      >
                        {service.category}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Service Items List */}
              <div className="space-y-3 pb-6">
                {services
                  .find((s) => s.id === activeServiceCategory)
                  ?.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-4 px-5 rounded-2xl border shadow-sm transition-colors duration-300"
                      style={{ 
                        backgroundColor: 'var(--card)',
                        borderColor: 'var(--border-light)' 
                      }}
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-base mb-1" style={{ color: 'var(--foreground)' }}>{item.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{item.duration}</span>
                        </div>
                        <p className="font-black text-lg mt-2" style={{ color: 'var(--foreground)' }}>{item.price}</p>
                      </div>
                      <button
                        onClick={() => toggleServiceSelection(item.name)}
                        className={`flex-shrink-0 text-sm font-bold px-6 py-2.5 rounded-full border-2 transition-all shadow-sm`}
                        style={
                          selectedServices.has(item.name)
                            ? {
                                borderColor: 'var(--primary)',
                                backgroundColor: 'var(--primary-subtle)',
                                color: 'var(--primary)',
                              }
                            : { backgroundColor: 'var(--card)', color: 'var(--foreground)', borderColor: 'var(--foreground)' }
                        }
                      >
                        {selectedServices.has(item.name) ? "Added" : "Add"}
                      </button>
                    </div>
                  ))}

                {/* See All Button */}
                <button 
                  className="w-full py-4 rounded-2xl border-2 font-bold text-sm transition-colors duration-300"
                  style={{ 
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)' 
                  }}
                >
                  See all
                </button>
              </div>
            </div>
          )}

          {/* Packages Tab */}
          {activeTab === "packages" && (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>Service Packages</h2>
                </div>
                <p className="text-sm ml-12" style={{ color: 'var(--text-secondary)' }}>Bundle & save on premium services</p>
              </div>

              <div className="space-y-4 pb-6">
                {packages.map((pkg) => {
                  const Icon = pkg.icon;
                  return (
                    <div
                      key={pkg.id}
                      className="relative p-6 rounded-3xl overflow-hidden"
                      style={{
                        background: pkg.popular
                          ? 'linear-gradient(to bottom right, rgba(244, 114, 182, 0.1), rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))'
                          : 'var(--background-elevated)',
                        border: pkg.popular ? '2px solid rgba(244, 114, 182, 0.3)' : '2px solid var(--border-light)',
                        boxShadow: 'var(--elevation-2)',
                      }}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-2 -right-2">
                          <div 
                            className="text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1"
                            style={{ 
                              background: 'var(--gradient-primary)',
                              boxShadow: 'var(--elevation-3)'
                            }}
                          >
                            <Zap className="w-3 h-3 fill-white" />
                            MOST POPULAR
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                          style={{ 
                            background: pkg.popular ? 'var(--gradient-primary)' : 'var(--foreground)'
                          }}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-lg mb-1" style={{ color: 'var(--foreground)' }}>{pkg.name}</h3>
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{pkg.description}</p>
                        </div>
                      </div>

                      <div className="flex items-end gap-2 mb-5">
                        <span
                          className="text-4xl font-black"
                          style={{ 
                            color: pkg.popular ? 'var(--primary)' : 'var(--foreground)'
                          }}
                        >
                          {pkg.price}
                        </span>
                        <span className="text-base line-through pb-1.5" style={{ color: 'var(--text-tertiary)' }}>{pkg.originalPrice}</span>
                        <div className="flex-1" />
                        <div 
                          className="text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg"
                          style={{ background: 'var(--accent-success)' }}
                        >
                          {pkg.savings}
                        </div>
                      </div>

                      <div className="space-y-2.5 mb-5">
                        {pkg.services.map((service, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ 
                                background: pkg.popular ? 'var(--gradient-primary)' : 'var(--foreground)'
                              }}
                            >
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{service}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => navigate(`/booking/${id}`)}
                        className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 text-white"
                        style={{ 
                          background: pkg.popular ? 'var(--gradient-primary)' : 'var(--foreground)',
                          boxShadow: 'var(--elevation-2)'
                        }}
                      >
                        Book Package
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Membership Tab */}
          {activeTab === "membership" && (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: 'var(--gradient-accent)' }}
                  >
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>Membership Plans</h2>
                </div>
                <p className="text-sm ml-12" style={{ color: 'var(--text-secondary)' }}>Exclusive perks & VIP treatment</p>
              </div>

              <div className="space-y-4 pb-6">
                {memberships.map((membership) => {
                  const Icon = membership.icon;
                  return (
                    <div
                      key={membership.id}
                      className="relative p-6 rounded-3xl overflow-hidden"
                      style={{
                        background: 'var(--background-elevated)',
                        border: '2px solid var(--border-light)',
                        boxShadow: 'var(--elevation-2)',
                      }}
                    >
                      <div 
                        className="absolute inset-0 opacity-5"
                        style={{ background: membership.color }}
                      />

                      {membership.popular && (
                        <div 
                          className="absolute top-0 left-0 right-0 h-1"
                          style={{ background: membership.color }}
                        />
                      )}

                      <div className="relative">
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex-1">
                            <h3 className="font-black text-lg mb-2" style={{ color: 'var(--foreground)' }}>{membership.name}</h3>
                            <div className="flex items-baseline gap-1">
                              <span
                                className="text-4xl font-black"
                                style={{ color: 'var(--primary)' }}
                              >
                                {membership.price}
                              </span>
                              <span className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>{membership.period}</span>
                            </div>
                            {membership.popular && (
                              <div 
                                className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full mt-2"
                                style={{ 
                                  backgroundColor: 'var(--primary-subtle)',
                                  color: 'var(--primary)'
                                }}
                              >
                                <Zap className="w-3 h-3" style={{ fill: 'var(--primary)' }} />
                                BEST VALUE
                              </div>
                            )}
                          </div>
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                            style={{ background: membership.color }}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>

                        <div className="space-y-2.5 mb-5">
                          {membership.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2.5">
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
                                style={{ background: membership.color }}
                              >
                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                              </div>
                              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{benefit}</span>
                            </div>
                          ))}
                        </div>

                        <button
                          className="w-full text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2"
                          style={{ background: membership.color }}
                        >
                          Join Now
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === "team" && (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: 'var(--gradient-cool)' }}
                  >
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>Our Team</h2>
                </div>
                <p className="text-sm ml-12" style={{ color: 'var(--text-secondary)' }}>Award-winning beauty professionals</p>
              </div>

              <div className="space-y-4 pb-6">
                {stylists.map((stylist) => (
                  <div
                    key={stylist.id}
                    className="flex items-center gap-4 p-4 rounded-3xl"
                    style={{
                      background: 'var(--background-elevated)',
                      border: '1px solid var(--border-light)',
                      boxShadow: 'var(--elevation-2)',
                    }}
                  >
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                      <ImageWithFallback
                        src={stylist.image}
                        alt={stylist.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-inset ring-white/50" />
                      <div 
                        className="absolute top-2 right-2 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-lg"
                        style={{ background: 'var(--gradient-gold)' }}
                      >
                        <Star className="w-3 h-3 fill-white text-white" />
                        <span className="text-[11px] font-black text-white">{stylist.rating}</span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-black text-base" style={{ color: 'var(--foreground)' }}>{stylist.name}</h3>
                        {stylist.verified && <BadgeCheck className="w-4 h-4" style={{ color: 'var(--accent-info)', fill: 'var(--accent-info-subtle)' }} />}
                      </div>
                      <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>{stylist.speciality}</p>
                      <div className="flex items-center gap-2">
                        <div 
                          className="flex items-center gap-1 px-2 py-1 rounded-lg"
                          style={{ 
                            backgroundColor: 'var(--primary-subtle)',
                            color: 'var(--primary)'
                          }}
                        >
                          <Award className="w-3 h-3" />
                          <span className="text-xs font-bold">{stylist.experience}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/booking/${id}`)}
                      className="flex-shrink-0 text-white text-xs font-bold px-6 py-3 rounded-full shadow-lg"
                      style={{ background: 'var(--foreground)' }}
                    >
                      Book
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ background: 'var(--gradient-cool)' }}
                    >
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>Reviews</h2>
                  </div>
                  <div className="flex items-center gap-2 ml-12">
                    <div className="flex items-center gap-1.5 bg-amber-100 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span className="font-black text-sm" style={{ color: 'var(--foreground)' }}>{salonData.rating}</span>
                    </div>
                    <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>•</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{salonData.reviews} reviews</span>
                  </div>
                </div>
                <button className="text-rose-500 text-sm font-bold">See all</button>
              </div>

              <div className="space-y-4 pb-6">
                {reviews.map((review) => (
                  <div key={review.id} className="p-5 rounded-3xl" style={{ background: 'var(--background-elevated)', border: '1px solid var(--border-light)', boxShadow: 'var(--elevation-2)' }}>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
                        <ImageWithFallback src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <h4 className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>{review.name}</h4>
                          {review.verified && <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-100" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>•</span>
                          <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{review.date}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-primary)' }}>{review.text}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold">{review.service}</span>
                      </div>
                    </div>

                    {review.images.length > 0 && (
                      <div className="flex gap-2">
                        {review.images.map((img, idx) => (
                          <div key={idx} className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg ring-2 ring-gray-100">
                            <ImageWithFallback src={img} alt="Review" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: 'var(--accent-success)' }}
                  >
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>About</h2>
                </div>
              </div>

              <div className="space-y-4 pb-6">
                <div 
                  className="p-6 rounded-3xl shadow-lg"
                  style={{ 
                    background: 'var(--background-elevated)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <h3 className="font-black text-lg mb-3" style={{ color: 'var(--foreground)' }}>Our Story</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{salonData.about}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    With over 10 years of excellence in beauty services, we've helped thousands of clients look and feel
                    their best. Our team stays ahead of the latest trends and techniques to bring you world-class
                    treatments in a luxurious, welcoming environment.
                  </p>
                </div>

                <div 
                  className="p-6 rounded-3xl space-y-5 shadow-lg"
                  style={{ 
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black tracking-wider mb-1.5" style={{ color: 'var(--muted-foreground)' }}>ADDRESS</p>
                      <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--foreground)' }}>{salonData.address}</p>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                  <div className="flex items-start gap-4">
                    <div 
                      className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--gradient-cool)' }}
                    >
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-gray-400 tracking-wider mb-1.5">HOURS</p>
                      <p className="text-sm text-gray-900 font-medium">{salonData.hours}</p>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                  <div className="flex items-start gap-4">
                    <div 
                      className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--accent-success)' }}
                    >
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-gray-400 tracking-wider mb-1.5">CONTACT</p>
                      <p className="text-sm text-gray-900 font-medium">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-40 max-w-[390px] mx-auto">
          <div className="relative">
            {/* Gradient glow effect */}
            <div 
              className="absolute inset-0 blur-3xl opacity-60"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(244, 63, 94, 0.4) 0%, transparent 70%)',
              }}
            />

            <div 
              className="relative backdrop-blur-3xl border-t px-6 pt-4 pb-8 transition-colors duration-300"
              style={{ 
                backgroundColor: 'var(--card-glass)',
                borderColor: 'var(--border-light)',
                boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.08)',
              }}
            >
              {/* Service counter and total */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--muted-foreground)' }}>
                    {selectedServices.size > 0 
                      ? `${selectedServices.size} ${selectedServices.size === 1 ? 'service' : 'services'} selected` 
                      : 'Select services to book'}
                  </p>
                  {selectedServices.size > 0 && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-lg font-black"
                      style={{ color: 'var(--foreground)' }}
                    >
                      ₹{selectedServiceDetails.reduce((total, service) => {
                        const priceNum = parseInt(service.price.replace(/[₹,]/g, ''));
                        return total + priceNum;
                      }, 0).toLocaleString()}
                    </motion.p>
                  )}
                </div>

                {/* Enhanced Book Now Button */}
                <motion.button
                  onClick={() => navigate(`/booking/${id}`, { 
                    state: { 
                      selectedServiceDetails: selectedServiceDetails,
                      salonName: salonData.name 
                    } 
                  })}
                  className="relative text-white font-black px-7 py-3.5 rounded-full overflow-hidden flex items-center gap-2 shrink-0"
                  style={{ 
                    background: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 50%, #FB923C 100%)',
                    boxShadow: '0 8px 32px rgba(236, 72, 153, 0.4), 0 4px 16px rgba(244, 63, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                  }}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />

                  {/* Button content */}
                  <span className="relative z-10 text-[15px] font-black drop-shadow-lg whitespace-nowrap">
                    Book Now
                  </span>
                  
                  <motion.div
                    className="relative z-10"
                    animate={{
                      x: [0, 3, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ChevronRight className="w-5 h-5 drop-shadow-lg" strokeWidth={3} />
                  </motion.div>

                  {/* Glow pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)',
                    }}
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.button>
              </div>

              {/* Quick info */}
              {selectedServices.size === 0 && (
                <div className="flex items-center justify-center gap-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-medium">Tap services above to start booking</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}