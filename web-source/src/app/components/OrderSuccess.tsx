import { motion } from "motion/react";
import { CheckCircle, Package, Home, X } from "lucide-react";

interface OrderSuccessProps {
  isOpen?: boolean;
  onClose: () => void;
  orderId: string;
}

export function OrderSuccess({ isOpen = true, onClose, orderId }: OrderSuccessProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80] flex items-center justify-center p-5"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-full max-w-[350px] rounded-3xl overflow-hidden"
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* Success Animation */}
        <div className="relative pt-12 pb-8 px-8 text-center">
          {/* Confetti Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, opacity: 1 }}
                animate={{
                  y: 300,
                  opacity: 0,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ["var(--brand-primary-500)", "var(--brand-primary-400)", "var(--color-success)", "var(--color-warning)", "var(--icon-indigo)"][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            ))}
          </div>

          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 12, stiffness: 200 }}
            className="relative z-10 w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{
              background: "var(--gradient-success-cta)",
              boxShadow: "0 8px 32px rgba(16, 185, 129, 0.4)",
            }}
          >
            <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} fill="currentColor" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-black mb-2" style={{ color: "var(--foreground)" }}>
              Order Placed!
            </h2>
            <p className="text-sm font-medium mb-6" style={{ color: "var(--muted-foreground)" }}>
              Your order has been successfully placed
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-5 rounded-2xl mb-6"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border-light)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                Order ID
              </span>
              <span className="text-sm font-black" style={{ color: "var(--foreground)" }}>
                {orderId}
              </span>
            </div>
          </motion.div>

          {/* Delivery Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-4 rounded-2xl mb-6"
            style={{
              backgroundColor: "rgba(232, 90, 139, 0.1)",
              border: "1px solid rgba(232, 90, 139, 0.2)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "var(--gradient-brand-button)",
                }}
              >
                <Package className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-black mb-0.5" style={{ color: "var(--foreground)" }}>
                  Estimated Delivery
                </p>
                <p className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                  3-5 business days
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="space-y-3"
          >
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-4 rounded-2xl font-black text-base transition-all"
              style={{
                background: "var(--gradient-brand-button)",
                color: "var(--text-inverse)",
                boxShadow: "0 4px 16px rgba(232, 90, 139, 0.35)",
              }}
            >
              Continue Shopping
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border-light)",
                color: "var(--foreground)",
              }}
            >
              <Package className="w-5 h-5" strokeWidth={2.5} />
              Track Order
            </motion.button>
          </motion.div>
        </div>

        {/* Close Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border-light)",
          }}
        >
          <X className="w-5 h-5" style={{ color: "var(--foreground)" }} strokeWidth={2} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}