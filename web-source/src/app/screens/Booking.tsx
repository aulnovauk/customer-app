import { ArrowLeft, Check, Star, MapPin, ChevronRight, Calendar, Clock, User, Sparkles, Scissors, Users, CheckCircle, Heart, Tag } from "lucide-react";
import { useNavigate, useParams, useSearchParams, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const services = [
  { id: 1, name: "Women's Haircut", price: 65, duration: "45 min", popular: true },
  { id: 2, name: "Hair Coloring", price: 120, duration: "2 hrs", popular: false },
  { id: 3, name: "Facial Treatment", price: 85, duration: "60 min", popular: true },
  { id: 4, name: "Manicure & Pedicure", price: 55, duration: "60 min", popular: false },
  { id: 5, name: "Blowout & Style", price: 55, duration: "45 min", popular: false },
];

const stylists = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Hair Color Expert",
    image: "https://images.unsplash.com/photo-1638474368314-59198edde028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYWlyc3R5bGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzU2OTUzNHww&ixlib=rb-4.1.0&q=80&w=400",
    rating: 5.0,
    available: true,
  },
  {
    id: 2,
    name: "Emma Davis",
    role: "Makeup Artist",
    image: "https://images.unsplash.com/photo-1677808566825-e8064b7c85c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBhcnRpc3QlMjB3b21hbiUyMGNvbG9yZnVsJTIwYm9sZHxlbnwxfHx8fDE3NzM2NzU0MjF8MA&ixlib=rb-4.1.0&q=80&w=400",
    rating: 4.9,
    available: true,
  },
  {
    id: 3,
    name: "Any Available",
    role: "First free slot",
    image: "",
    rating: null,
    available: true,
  },
];

const dates = [
  { day: "Mon", date: 17, available: true },
  { day: "Tue", date: 18, available: true },
  { day: "Wed", date: 19, available: false },
  { day: "Thu", date: 20, available: true },
  { day: "Fri", date: 21, available: true },
  { day: "Sat", date: 22, available: true },
  { day: "Sun", date: 23, available: true },
];

const timeSlots = [
  // Morning (9:00 AM - 11:30 AM)
  { time: "9:00 AM", slots: 3, period: "morning" },
  { time: "9:30 AM", slots: 2, period: "morning" },
  { time: "10:00 AM", slots: 1, period: "morning" },
  { time: "10:30 AM", slots: 4, period: "morning" },
  { time: "11:00 AM", slots: 0, period: "morning" },
  { time: "11:30 AM", slots: 2, period: "morning" },
  
  // Afternoon (12:00 PM - 4:30 PM)
  { time: "12:00 PM", slots: 2, period: "afternoon" },
  { time: "12:30 PM", slots: 3, period: "afternoon" },
  { time: "1:00 PM", slots: 2, period: "afternoon" },
  { time: "1:30 PM", slots: 1, period: "afternoon" },
  { time: "2:00 PM", slots: 4, period: "afternoon" },
  { time: "2:30 PM", slots: 3, period: "afternoon" },
  { time: "3:00 PM", slots: 2, period: "afternoon" },
  { time: "3:30 PM", slots: 0, period: "afternoon" },
  { time: "4:00 PM", slots: 1, period: "afternoon" },
  { time: "4:30 PM", slots: 2, period: "afternoon" },
  
  // Evening (5:00 PM - 8:30 PM)
  { time: "5:00 PM", slots: 3, period: "evening" },
  { time: "5:30 PM", slots: 2, period: "evening" },
  { time: "6:00 PM", slots: 2, period: "evening" },
  { time: "6:30 PM", slots: 4, period: "evening" },
  { time: "7:00 PM", slots: 1, period: "evening" },
  { time: "7:30 PM", slots: 3, period: "evening" },
  { time: "8:00 PM", slots: 2, period: "evening" },
  { time: "8:30 PM", slots: 1, period: "evening" },
];

const stepLabels = ["Professional", "Schedule", "Review"];

export function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState<Array<{name: string, duration: string, price: string}>>([]);
  const [selectedStylist, setSelectedStylist] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"morning" | "afternoon" | "evening">("morning");
  const [notes, setNotes] = useState("");
  const [salonName, setSalonName] = useState("Luxe Beauty Studio");

  // Get pre-selected services from navigation state
  useEffect(() => {
    if (location.state?.selectedServiceDetails) {
      setSelectedServiceDetails(location.state.selectedServiceDetails);
    }
    if (location.state?.salonName) {
      setSalonName(location.state.salonName);
    }
  }, [location.state]);

  // Helper function to parse price string and calculate total
  const calculateTotalPrice = () => {
    return selectedServiceDetails.reduce((total, service) => {
      const priceNum = parseInt(service.price.replace(/[₹,]/g, ''));
      return total + priceNum;
    }, 0);
  };

  // Helper function to calculate total duration
  const calculateTotalDuration = () => {
    let totalMinutes = 0;
    selectedServiceDetails.forEach(service => {
      const duration = service.duration.toLowerCase();
      if (duration.includes('hr')) {
        const hours = parseFloat(duration);
        totalMinutes += hours * 60;
      } else if (duration.includes('min')) {
        totalMinutes += parseInt(duration);
      }
    });
    
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    }
    return `${totalMinutes}min`;
  };

  const handleContinue = () => {
    if (step < 3) setStep(step + 1);
    else navigate("/payment");
  };

  const canContinue = () => {
    if (step === 1) return selectedStylist !== null;
    if (step === 2) return selectedDate !== null && selectedTime !== null;
    return true;
  };

  const currentStylist = stylists.find((s) => s.id === selectedStylist);

  // Filter time slots by selected period
  const filteredTimeSlots = timeSlots.filter((slot) => slot.period === selectedPeriod);

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--muted)' }}>
      <div className="max-w-[390px] mx-auto pb-32">
        {/* Header */}
        <div
          className="px-5 pt-12 pb-5 border-b transition-colors duration-300"
          style={{ 
            background: "var(--gradient-background-pastel)",
            borderColor: 'var(--border-light)' 
          }}
        >
          <div className="flex items-center gap-4 mb-5">
            <button
              onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors duration-300"
              style={{ 
                backgroundColor: 'var(--card)',
                backdropFilter: 'blur(8px)' 
              }}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
            </button>
            <div>
              <h1 className="text-lg font-black" style={{ color: 'var(--foreground)' }}>Book Appointment</h1>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{salonName}</p>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-between gap-2">
            {stepLabels.map((label, i) => {
              const s = i + 1;
              const isDone = s < step;
              const isActive = s === step;
              
              // Icon for each step
              const StepIcon = s === 1 ? User : s === 2 ? Clock : CheckCircle;
              
              return (
                <div key={s} className="flex items-center flex-1">
                  {/* Connector line */}
                  {i > 0 && (
                    <div className="flex-1 h-1 mx-2 rounded-full overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--border-light)' }}>
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: isDone ? "100%" : "0%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="h-full bg-brand-gradient"
                      />
                    </div>
                  )}
                  
                  {/* Step circle with icon */}
                  <div className="flex flex-col items-center gap-2 relative">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isActive ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: isActive ? Infinity : 0,
                        repeatDelay: 2,
                      }}
                      className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isDone || isActive
                          ? "shadow-brand-md"
                          : "shadow-sm"
                      }`}
                      style={{
                        background: isDone || isActive
                          ? "var(--gradient-primary)"
                          : "var(--card)",
                        border: isDone || isActive ? "none" : "2px solid var(--border-medium)",
                      }}
                    >
                      {/* Pulse ring for active step */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: "var(--gradient-primary)",
                            opacity: 0.2,
                          }}
                          animate={{
                            scale: [1, 1.4, 1.4],
                            opacity: [0.4, 0, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      )}
                      
                      {/* Icon */}
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isDone ? [0, 1.2, 1] : 1,
                          rotate: isDone ? [0, 10, 0] : 0,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {isDone ? (
                          <Check className="w-6 h-6 text-white" strokeWidth={3} />
                        ) : (
                          <StepIcon 
                            className="w-6 h-6" 
                            strokeWidth={2.5}
                            style={{ color: isActive ? "white" : "var(--muted-foreground)" }}
                          />
                        )}
                      </motion.div>

                      {/* Sparkle effect for completed steps */}
                      {isDone && (
                        <motion.div
                          className="absolute -top-1 -right-1"
                          initial={{ scale: 0, rotate: 0 }}
                          animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                        </motion.div>
                      )}
                    </motion.div>
                    
                    {/* Label */}
                    <motion.span
                      initial={false}
                      animate={{
                        scale: isActive ? 1.05 : 1,
                      }}
                      className={`text-[11px] font-bold whitespace-nowrap transition-colors duration-300 ${
                        isActive ? "text-gradient-primary" : ""
                      }`}
                      style={{
                        color: isActive 
                          ? "var(--color-primary)" 
                          : isDone 
                          ? "var(--foreground)" 
                          : "var(--muted-foreground)"
                      }}
                    >
                      {label}
                    </motion.span>

                    {/* Progress indicator under active step */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 rounded-full bg-brand-gradient"
                        initial={{ width: 0 }}
                        animate={{ width: "80%" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="px-5 pt-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {/* Step 1: Select Service */}
              {step === 1 && (
                <div>
                  <h2 
                    className="text-xl font-black mb-2" 
                    style={{ 
                      color: 'var(--foreground)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Choose your stylist
                  </h2>
                  <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                    Select your preferred beauty expert
                  </p>
                  <div className="space-y-4">
                    {stylists.map((stylist) => (
                      <motion.div
                        key={stylist.id}
                        whileTap={{ scale: 0.98 }}
                        animate={{
                          scale: selectedStylist === stylist.id ? 1.02 : 1,
                          opacity: selectedStylist === null || selectedStylist === stylist.id ? 1 : 0.5,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0.0, 0.2, 1],
                        }}
                        onClick={() => setSelectedStylist(stylist.id)}
                        className="relative cursor-pointer"
                        style={{
                          background: selectedStylist === stylist.id
                            ? 'linear-gradient(135deg, rgba(232, 90, 139, 0.08), rgba(232, 90, 139, 0.04))'
                            : 'var(--background-elevated)',
                          borderRadius: '16px',
                          padding: '24px',
                          border: selectedStylist === stylist.id 
                            ? '2px solid var(--brand-primary)'
                            : '2px solid transparent',
                          boxShadow: selectedStylist === stylist.id
                            ? '0 12px 32px -4px rgba(232, 90, 139, 0.3), 0 0 0 4px rgba(232, 90, 139, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            : '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
                        }}
                      >
                        <div className="flex items-center gap-4">
                          {/* Stylist Image */}
                          <div className="relative flex-shrink-0">
                            {stylist.image ? (
                              <div 
                                className="relative overflow-hidden"
                                style={{
                                  width: '88px',
                                  height: '88px',
                                  borderRadius: '16px',
                                  border: selectedStylist === stylist.id 
                                    ? '3px solid rgba(232, 90, 139, 0.2)'
                                    : '3px solid rgba(0, 0, 0, 0.04)',
                                  boxShadow: selectedStylist === stylist.id
                                    ? '0 4px 16px rgba(232, 90, 139, 0.2)'
                                    : '0 2px 8px rgba(0, 0, 0, 0.06)',
                                }}
                              >
                                <ImageWithFallback
                                  src={stylist.image}
                                  alt={stylist.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div 
                                className="flex items-center justify-center text-3xl"
                                style={{
                                  width: '88px',
                                  height: '88px',
                                  borderRadius: '16px',
                                  background: 'var(--surface-elevated)',
                                  border: '3px solid rgba(0, 0, 0, 0.04)',
                                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                                }}
                              >
                                👤
                              </div>
                            )}
                          </div>

                          {/* Stylist Info */}
                          <div className="flex-1 min-w-0">
                            <h3 
                              className="font-black text-lg mb-1 truncate" 
                              style={{ 
                                color: 'var(--foreground)',
                                letterSpacing: '-0.01em',
                              }}
                            >
                              {stylist.name}
                            </h3>
                            <p 
                              className="text-sm mb-3 truncate" 
                              style={{ 
                                color: 'var(--text-secondary)',
                                fontWeight: 500,
                              }}
                            >
                              {stylist.role}
                            </p>
                            {stylist.rating && (
                              <div 
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.12), rgba(245, 158, 11, 0.08))',
                                  borderRadius: '8px',
                                  border: '1px solid rgba(251, 191, 36, 0.15)',
                                }}
                              >
                                <Star 
                                  className="w-3.5 h-3.5 fill-amber-500 text-amber-500" 
                                  strokeWidth={0}
                                />
                                <span 
                                  className="text-xs font-bold"
                                  style={{ color: 'var(--foreground)' }}
                                >
                                  {stylist.rating}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Selection Indicator */}
                          <motion.div
                            className="flex-shrink-0"
                            initial={false}
                            animate={selectedStylist === stylist.id ? {
                              scale: [1, 1.1, 1],
                            } : {}}
                            transition={{
                              duration: 0.3,
                              ease: 'easeOut',
                            }}
                          >
                            {selectedStylist === stylist.id ? (
                              <div
                                className="flex items-center justify-center"
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '50%',
                                  background: 'var(--gradient-primary)',
                                  boxShadow: '0 2px 8px rgba(232, 90, 139, 0.3)',
                                }}
                              >
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ 
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 25,
                                  }}
                                >
                                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </motion.div>
                              </div>
                            ) : (
                              <div
                                className="flex items-center justify-center"
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '50%',
                                  border: '2px solid var(--border-medium)',
                                  background: 'transparent',
                                }}
                              />
                            )}
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-black mb-2" style={{ color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
                    Pick date & time
                  </h2>
                  <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                    Choose your preferred date and time slot
                  </p>

                  {/* Date picker */}
                  <div className="mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>
                      March 2026
                    </p>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 px-1 -mx-1" style={{ scrollBehavior: 'smooth' }}>
                      {dates.map((date, index) => {
                        const isToday = index === 0; // First date is today (March 17)
                        const isSelected = selectedDate === date.date;
                        
                        return (
                          <motion.button
                            key={date.date}
                            disabled={!date.available}
                            onClick={() => date.available && setSelectedDate(date.date)}
                            whileTap={date.available ? { scale: 0.95 } : {}}
                            animate={{
                              scale: isSelected ? 1.05 : 1,
                            }}
                            transition={{
                              duration: 0.2,
                              ease: [0.4, 0.0, 0.2, 1],
                            }}
                            className="relative flex-shrink-0 flex flex-col items-center gap-2 transition-all duration-300"
                            style={{
                              width: '72px',
                              padding: '16px 12px',
                              borderRadius: '16px',
                              background: !date.available
                                ? 'var(--muted)'
                                : isSelected
                                ? 'var(--gradient-primary)'
                                : 'var(--background-elevated)',
                              border: isSelected ? 'none' : '2px solid var(--border-light)',
                              boxShadow: !date.available
                                ? 'none'
                                : isSelected
                                ? '0 8px 24px -4px rgba(232, 90, 139, 0.4), 0 4px 12px -4px rgba(217, 70, 160, 0.2)'
                                : '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02)',
                              cursor: date.available ? 'pointer' : 'not-allowed',
                              opacity: !date.available ? 0.4 : 1,
                            }}
                          >
                            {/* Today indicator dot */}
                            {isToday && (
                              <motion.div
                                className="absolute -top-1 -right-1"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  background: 'var(--gradient-success-cta)',
                                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)',
                                  border: '2px solid var(--background-elevated)',
                                }}
                              />
                            )}

                            {/* Day label */}
                            <span
                              className="text-xs font-semibold uppercase"
                              style={{
                                color: isSelected 
                                  ? 'var(--text-inverse)' 
                                  : 'var(--text-secondary)',
                              }}
                            >
                              {date.day}
                            </span>

                            {/* Date number */}
                            <span
                              className="text-2xl font-black"
                              style={{
                                color: isSelected 
                                  ? 'var(--text-inverse)' 
                                  : 'var(--foreground)',
                                letterSpacing: '-0.02em',
                              }}
                            >
                              {date.date}
                            </span>

                            {/* Selection indicator line */}
                            {isSelected && (
                              <motion.div
                                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                                initial={{ width: 0 }}
                                animate={{ width: '40%' }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                style={{
                                  height: '3px',
                                  borderRadius: '999px',
                                  background: 'rgba(255, 255, 255, 0.6)',
                                }}
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>
                      Available times
                    </p>
                    
                    {/* Period tabs - Morning/Afternoon/Evening */}
                    <div className="flex gap-2 mb-5">
                      {(["morning", "afternoon", "evening"] as const).map((period) => {
                        const isSelected = selectedPeriod === period;
                        
                        return (
                          <motion.button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1 capitalize text-sm font-bold transition-all duration-300"
                            style={{
                              padding: '12px 16px',
                              borderRadius: '999px',
                              background: isSelected
                                ? 'var(--gradient-slide-gold)'
                                : 'var(--background-elevated)',
                              border: isSelected ? 'none' : '2px solid var(--border-light)',
                              color: isSelected ? 'var(--text-inverse)' : 'var(--foreground)',
                              boxShadow: isSelected
                                ? '0 6px 20px -4px rgba(200, 169, 106, 0.4), 0 2px 8px -2px rgba(230, 211, 163, 0.3)'
                                : '0 2px 6px rgba(0, 0, 0, 0.04)',
                            }}
                          >
                            {period}
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {filteredTimeSlots.map((slot) => {
                        const isSelected = selectedTime === slot.time;
                        const isDisabled = slot.slots === 0;
                        
                        return (
                          <motion.button
                            key={slot.time}
                            disabled={isDisabled}
                            onClick={() => !isDisabled && setSelectedTime(slot.time)}
                            whileTap={!isDisabled ? { scale: 0.95 } : {}}
                            whileHover={!isDisabled ? { scale: 1.03 } : {}}
                            animate={{
                              scale: isSelected && !isDisabled ? 1.05 : 1,
                            }}
                            transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
                            className="relative font-bold text-sm transition-all duration-300"
                            style={{
                              padding: '14px 12px',
                              borderRadius: '999px',
                              background: isDisabled
                                ? 'var(--muted)'
                                : isSelected
                                ? 'var(--gradient-primary)'
                                : 'var(--background-elevated)',
                              border: isSelected || isDisabled ? 'none' : '2px solid var(--border-light)',
                              color: isDisabled
                                ? 'var(--muted-foreground)'
                                : isSelected
                                ? 'var(--text-inverse)'
                                : 'var(--foreground)',
                              boxShadow: isDisabled
                                ? 'none'
                                : isSelected
                                ? '0 6px 20px -4px rgba(232, 90, 139, 0.4), 0 2px 8px -2px rgba(217, 70, 160, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                                : '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02)',
                              cursor: isDisabled ? 'not-allowed' : 'pointer',
                              opacity: isDisabled ? 0.4 : 1,
                              textDecoration: isDisabled ? 'line-through' : 'none',
                            }}
                          >
                            {/* Shimmer effect on selected */}
                            {isSelected && !isDisabled && (
                              <motion.div
                                className="absolute inset-0 rounded-full opacity-30"
                                style={{
                                  background: 'linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.4) 50%, transparent 75%)',
                                  backgroundSize: '200% 100%',
                                }}
                                animate={{
                                  backgroundPosition: ['200% 0', '-200% 0'],
                                }}
                                transition={{
                                  duration: 2.5,
                                  repeat: Infinity,
                                  ease: 'linear',
                                }}
                              />
                            )}

                            <span className="relative z-10">{slot.time}</span>

                            {/* Available slots indicator */}
                            {!isDisabled && !isSelected && slot.slots <= 2 && (
                              <motion.div
                                className="absolute -top-1 -right-1"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  background: slot.slots === 1 ? 'var(--color-warning)' : 'var(--color-success)',
                                  border: '2px solid var(--background-elevated)',
                                  boxShadow: `0 2px 6px ${slot.slots === 1 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
                                }}
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Notes */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-black mb-2" style={{ color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
                    Review & confirm
                  </h2>
                  <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                    Check your booking details before payment
                  </p>

                  {/* Summary card */}
                  <div 
                    className="rounded-3xl p-6 mb-6 transition-colors duration-300 relative overflow-hidden"
                    style={{ 
                      background: 'var(--gradient-dark-surface)',
                      boxShadow: '0 8px 32px -4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {/* Gradient accent line */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{
                        background: 'var(--gradient-primary)',
                      }}
                    />

                    <div className="flex items-center justify-between mb-5">
                      <span 
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                      >
                        Booking summary
                      </span>
                      <div 
                        className="px-3 py-1.5 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.15))',
                          border: '1px solid rgba(251, 191, 36, 0.3)',
                        }}
                      >
                        <span className="text-sm font-black" style={{ color: 'var(--color-warning-light)' }}>
                          {currentStylist?.rating} ★
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-semibold" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          Stylist
                        </span>
                        <span className="font-bold text-base text-right max-w-[60%]" style={{ color: 'var(--text-inverse)' }}>
                          {currentStylist?.name}
                        </span>
                      </div>

                      <div className="flex justify-between items-start">
                        <span className="text-sm font-semibold" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          Service{selectedServiceDetails.length > 1 ? 's' : ''}
                        </span>
                        <div className="text-right max-w-[60%]">
                          {selectedServiceDetails.map((service, idx) => (
                            <div key={idx} className="font-bold text-sm mb-1" style={{ color: 'var(--text-inverse)' }}>
                              {service.name}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm font-semibold" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          Date & Time
                        </span>
                        <span className="font-bold text-base" style={{ color: 'var(--text-inverse)' }}>
                          Mar {selectedDate}, {selectedTime}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm font-semibold" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          Duration
                        </span>
                        <span className="font-bold text-base" style={{ color: 'var(--text-inverse)' }}>
                          {calculateTotalDuration()}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="h-px" style={{ background: 'rgba(255, 255, 255, 0.1)' }} />

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-base font-black" style={{ color: 'var(--text-inverse)' }}>
                          Total Price
                        </span>
                        <span className="text-2xl font-black" style={{ 
                          background: 'var(--gradient-primary)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>
                          ₹{calculateTotalPrice().toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                      Special requests (optional)
                    </p>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special requests or preferences for your stylist..."
                      rows={4}
                      className="w-full rounded-2xl px-4 py-3.5 outline-none text-sm resize-none border-2 transition-all duration-300 focus:border-rose-300"
                      style={{
                        backgroundColor: 'var(--background-elevated)',
                        color: 'var(--foreground)',
                        borderColor: 'var(--border-light)',
                      }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div 
          className="fixed bottom-0 left-0 right-0 z-40 max-w-[390px] mx-auto border-t transition-colors duration-300"
          style={{ 
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {selectedServiceDetails.length > 0 && (
            <div className="px-5 pt-4 pb-2">
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                <Tag className="w-3.5 h-3.5" />
                <span>{selectedServiceDetails.length} {selectedServiceDetails.length === 1 ? 'service' : 'services'} • {calculateTotalDuration()}</span>
              </div>
            </div>
          )}
          
          <div className="px-5 pb-8 pt-2">
            <motion.button
              onClick={handleContinue}
              disabled={!canContinue()}
              whileTap={canContinue() ? { scale: 0.97 } : {}}
              whileHover={canContinue() ? { scale: 1.01 } : {}}
              transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
              className="w-full flex items-center justify-center gap-2 font-black text-base relative overflow-hidden"
              style={{
                height: '52px',
                borderRadius: '999px',
                background: canContinue()
                  ? 'var(--gradient-brand-shimmer)'
                  : 'var(--muted)',
                color: canContinue() ? 'var(--text-inverse)' : 'var(--muted-foreground)',
                boxShadow: canContinue()
                  ? '0 12px 32px -8px rgba(232, 90, 139, 0.5), 0 4px 12px -4px rgba(217, 70, 160, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  : '0 2px 8px rgba(0, 0, 0, 0.04)',
                cursor: canContinue() ? 'pointer' : 'not-allowed',
                opacity: canContinue() ? 1 : 0.5,
                letterSpacing: '-0.01em',
              }}
            >
              {/* Animated gradient overlay for active state */}
              {canContinue() && (
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.15) 50%, transparent 75%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['200% 0', '-200% 0'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              )}

              {/* Button content */}
              <span className="relative z-10">
                {step === 3 ? `Pay ₹${calculateTotalPrice().toLocaleString('en-IN')}` : "Continue"}
              </span>
              {canContinue() && (
                <motion.div
                  className="relative z-10"
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}