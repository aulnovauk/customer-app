import { motion } from "motion/react";
import { Check, Calendar, Share2, ChevronRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router";

export function Confirmation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-base flex flex-col">
      <div className="max-w-[390px] mx-auto w-full flex-1 flex flex-col px-5 pt-16 pb-10">
        {/* Success animation */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative mb-6"
          >
            {/* Outer glow ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 bg-brand rounded-full"
            />
            <div className="w-24 h-24 bg-brand-gradient rounded-full flex items-center justify-center shadow-brand-lg">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h1 className="text-3xl font-black text-gray-900 mb-2">You're booked!</h1>
            <p className="text-gray-500">Your appointment is confirmed</p>
          </motion.div>
        </div>

        {/* Booking card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 rounded-3xl p-5 text-white mb-5"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-wide">Booking ref</p>
              <p className="text-2xl font-black tracking-wider mt-1">BK-42837</p>
            </div>
            <div className="bg-brand-gradient rounded-2xl px-3 py-1.5">
              <p className="text-white text-xs font-bold">Confirmed</p>
            </div>
          </div>

          <div className="h-px bg-white/10 mb-4" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/50 text-sm">Service</span>
              <span className="text-white font-bold text-sm">Women's Haircut</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50 text-sm">Stylist</span>
              <span className="text-white font-bold text-sm">Sarah Johnson</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50 text-sm">Date & time</span>
              <span className="text-white font-bold text-sm">Mar 20, 2:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50 text-sm">Total paid</span>
              <span className="text-white font-black text-lg">$65</span>
            </div>
          </div>
        </motion.div>

        {/* Venue info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50 rounded-3xl p-4 mb-5 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-brand-subtle rounded-2xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-brand" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-sm">Luxe Beauty Studio</p>
            <p className="text-gray-500 text-xs">123 Market Street, San Francisco</p>
          </div>
          <button className="text-brand text-xs font-bold">Directions</button>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="grid grid-cols-2 gap-3 mb-5"
        >
          <button className="flex items-center justify-center gap-2 bg-gray-100 rounded-2xl py-3.5 text-gray-800 text-sm font-semibold active:bg-gray-200 transition-colors">
            <Calendar className="w-4 h-4" />
            Add to calendar
          </button>
          <button className="flex items-center justify-center gap-2 bg-gray-100 rounded-2xl py-3.5 text-gray-800 text-sm font-semibold active:bg-gray-200 transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </motion.div>

        {/* Tip message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6"
        >
          <p className="text-amber-800 text-xs leading-relaxed">
            💡 <span className="font-bold">Tip:</span> Show the booking reference <strong>BK-42837</strong> at reception. Arrive 5 minutes early to settle in comfortably.
          </p>
        </motion.div>

        <div className="mt-auto">
          <button
            onClick={() => navigate("/app")}
            className="w-full btn-brand py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-brand-lg"
          >
            Back to Home
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}