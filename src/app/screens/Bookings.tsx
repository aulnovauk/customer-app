import { Calendar, Clock, User, ChevronRight, Star, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useNavigate } from "react-router";

const upcomingBookings = [
  {
    id: 1,
    service: "Women's Haircut",
    salon: "Luxe Beauty Studio",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    stylist: "Sarah Johnson",
    date: "March 20",
    time: "2:00 PM",
    price: "$65",
    status: "confirmed",
    ref: "BK-42837",
  },
  {
    id: 2,
    service: "Facial Treatment",
    salon: "Radiant Skin Studio",
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    stylist: "Emma",
    date: "March 25",
    time: "4:30 PM",
    price: "$85",
    status: "confirmed",
    ref: "BK-42901",
  },
  {
    id: 3,
    service: "Hair Coloring",
    salon: "Color Studio",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    stylist: "Lisa",
    date: "March 28",
    time: "11:00 AM",
    price: "$120",
    status: "pending",
    ref: "BK-42945",
  },
];

const pastBookings = [
  {
    id: 4,
    service: "Manicure & Pedicure",
    salon: "Nail Art Haven",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    stylist: "Jessica Lee",
    date: "March 10",
    time: "11:00 AM",
    price: "$55",
    status: "completed",
    rating: 5,
    ref: "BK-42789",
  },
  {
    id: 5,
    service: "Deep Tissue Massage",
    salon: "Serenity Spa & Salon",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    stylist: "Michael Chen",
    date: "March 5",
    time: "3:00 PM",
    price: "$95",
    status: "completed",
    rating: 4,
    ref: "BK-42701",
  },
];

export function Bookings() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const configs = {
      confirmed: {
        label: "Confirmed",
        icon: CheckCircle,
        bg: "#10B981",
        shadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
      },
      pending: {
        label: "Pending",
        icon: AlertCircle,
        bg: "#F59E0B",
        shadow: "0 2px 8px rgba(245, 158, 11, 0.3)",
      },
      cancelled: {
        label: "Cancelled",
        icon: XCircle,
        bg: "#EF4444",
        shadow: "0 2px 8px rgba(239, 68, 68, 0.3)",
      },
      completed: {
        label: "Completed",
        icon: CheckCircle,
        bg: "#6366F1",
        shadow: "0 2px 8px rgba(99, 102, 241, 0.3)",
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  return (
    <div className="min-h-screen pb-32 transition-colors duration-300" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-[390px] mx-auto">
        {/* Header */}
        <div className="px-5 pt-14 pb-6">
          <h1 className="text-3xl font-black mb-1" style={{ color: 'var(--foreground)' }}>
            My Bookings
          </h1>
          <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
            Manage your appointments & history
          </p>
        </div>

        {/* Tabs */}
        <div className="px-5 mb-6">
          <div className="flex p-1 rounded-2xl transition-colors duration-300" style={{ backgroundColor: 'var(--muted)' }}>
            {([
              { id: "upcoming" as const, label: `Upcoming (${upcomingBookings.length})` },
              { id: "past" as const, label: `Past (${pastBookings.length})` },
            ]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex-1 py-3 text-sm font-bold rounded-xl transition-all"
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tabBg"
                    className="absolute inset-0 rounded-xl shadow-sm transition-colors duration-300"
                    style={{ backgroundColor: 'var(--card)' }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span 
                  className="relative z-10"
                  style={{ color: activeTab === tab.id ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Booking Cards */}
        <div className="px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {activeTab === "upcoming" ? (
                upcomingBookings.map((booking, index) => {
                  const statusConfig = getStatusBadge(booking.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-3xl overflow-hidden shadow-lg"
                      style={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border-light)',
                      }}
                    >
                      {/* Image Card */}
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={booking.image}
                          alt={booking.service}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        
                        {/* Status Badge */}
                        <motion.div
                          initial={{ scale: 0, rotate: -12 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                          className="absolute top-4 right-4 px-3 py-2 rounded-full backdrop-blur-xl flex items-center gap-1.5"
                          style={{
                            backgroundColor: statusConfig.bg,
                            boxShadow: statusConfig.shadow,
                          }}
                        >
                          <StatusIcon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                          <span className="text-white text-xs font-black">
                            {statusConfig.label}
                          </span>
                        </motion.div>

                        {/* Service Info Overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white text-xl font-black mb-1 leading-tight">
                            {booking.service}
                          </h3>
                          <p className="text-white/80 text-sm font-semibold">
                            {booking.salon}
                          </p>
                        </div>
                      </div>

                      {/* Booking Information Card */}
                      <div className="p-5">
                        {/* Date, Time, With Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-5">
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <Calendar className="w-4 h-4" style={{ color: 'var(--brand-primary)' }} strokeWidth={2.5} />
                              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                                Date
                              </span>
                            </div>
                            <p className="text-sm font-black leading-tight" style={{ color: 'var(--foreground)' }}>
                              {booking.date}
                            </p>
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <Clock className="w-4 h-4" style={{ color: 'var(--brand-primary)' }} strokeWidth={2.5} />
                              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                                Time
                              </span>
                            </div>
                            <p className="text-sm font-black" style={{ color: 'var(--foreground)' }}>
                              {booking.time}
                            </p>
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <User className="w-4 h-4" style={{ color: 'var(--brand-primary)' }} strokeWidth={2.5} />
                              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                                With
                              </span>
                            </div>
                            <p className="text-sm font-black truncate" style={{ color: 'var(--foreground)' }}>
                              {booking.stylist}
                            </p>
                          </div>
                        </div>

                        {/* Footer Actions */}
                        <div 
                          className="flex items-center justify-between pt-4 border-t"
                          style={{ borderColor: 'var(--border-light)' }}
                        >
                          <div>
                            <p className="text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>
                              Ref: {booking.ref}
                            </p>
                            <p className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>
                              {booking.price}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                              style={{
                                backgroundColor: 'var(--muted)',
                                color: 'var(--foreground)',
                              }}
                            >
                              Reschedule
                            </motion.button>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 transition-all"
                              style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                              }}
                            >
                              Cancel
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                pastBookings.map((booking, index) => {
                  return (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-3xl overflow-hidden shadow-lg"
                      style={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border-light)',
                      }}
                    >
                      {/* Image Card */}
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={booking.image}
                          alt={booking.service}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        
                        {/* Rating Badge */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                          className="absolute top-4 right-4 px-3 py-2 rounded-xl backdrop-blur-xl"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" strokeWidth={2} />
                            <span className="text-sm font-black" style={{ color: 'var(--foreground)' }}>
                              {booking.rating}.0
                            </span>
                          </div>
                        </motion.div>

                        {/* Service Info Overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white text-xl font-black mb-1 leading-tight">
                            {booking.service}
                          </h3>
                          <p className="text-white/80 text-sm font-semibold">
                            {booking.salon}
                          </p>
                        </div>
                      </div>

                      {/* Booking Information Card */}
                      <div className="p-5">
                        {/* Date, Time, With Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-5">
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <Calendar className="w-4 h-4" style={{ color: 'var(--brand-primary)' }} strokeWidth={2.5} />
                              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                                Date
                              </span>
                            </div>
                            <p className="text-sm font-black leading-tight" style={{ color: 'var(--foreground)' }}>
                              {booking.date}
                            </p>
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <Clock className="w-4 h-4" style={{ color: 'var(--brand-primary)' }} strokeWidth={2.5} />
                              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                                Time
                              </span>
                            </div>
                            <p className="text-sm font-black" style={{ color: 'var(--foreground)' }}>
                              {booking.time}
                            </p>
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <User className="w-4 h-4" style={{ color: 'var(--brand-primary)' }} strokeWidth={2.5} />
                              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                                With
                              </span>
                            </div>
                            <p className="text-sm font-black truncate" style={{ color: 'var(--foreground)' }}>
                              {booking.stylist}
                            </p>
                          </div>
                        </div>

                        {/* Footer Actions */}
                        <div 
                          className="flex items-center justify-between pt-4 border-t"
                          style={{ borderColor: 'var(--border-light)' }}
                        >
                          <div>
                            <p className="text-xs font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>
                              Ref: {booking.ref}
                            </p>
                            <p className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>
                              {booking.price}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => navigate("/salon/1")}
                              className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                              style={{
                                backgroundColor: 'var(--muted)',
                                color: 'var(--foreground)',
                              }}
                            >
                              Book Again
                            </motion.button>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all"
                              style={{
                                background: 'linear-gradient(135deg, #E85A8B 0%, #F186AC 100%)',
                                boxShadow: '0 4px 12px rgba(232, 90, 139, 0.3)',
                              }}
                            >
                              Review
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
