import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, Trash2, ShoppingBag, ChevronRight, Tag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect } from "react";

interface Product {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  inStock: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (productId: number, delta: number) => void;
  removeItem: (productId: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeItem,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const savings = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.product.originalPrice
        ? (item.product.originalPrice - item.product.price) * item.quantity
        : 0),
    0
  );
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when drawer is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer - Flex Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling to backdrop
            className="fixed left-0 right-0 z-50 max-w-[390px] mx-auto rounded-t-[32px] overflow-hidden flex flex-col"
            style={{
              backgroundColor: "var(--background)",
              bottom: "88px", // Increased offset for full button visibility
              maxHeight: "calc(90vh - 88px)", // Adjust max height accordingly
            }}
          >
            {/* Header - Fixed */}
            <div
              className="flex-shrink-0 px-5 py-5 border-b"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border-light)",
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "var(--gradient-brand-button)",
                      boxShadow: "0 4px 16px rgba(232, 90, 139, 0.3)",
                    }}
                  >
                    <ShoppingBag className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black" style={{ color: "var(--foreground)" }}>
                      Your Cart
                    </h2>
                    <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                      {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <X className="w-5 h-5" style={{ color: "var(--foreground)" }} strokeWidth={2} />
                </motion.button>
              </div>
            </div>

            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "var(--muted)" }}
                  >
                    <ShoppingBag className="w-10 h-10" style={{ color: "var(--muted-foreground)" }} />
                  </div>
                  <h3 className="text-lg font-black mb-2" style={{ color: "var(--foreground)" }}>
                    Your cart is empty
                  </h3>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                    Add some products to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ 
                          opacity: 0, 
                          scale: 0.9, 
                          x: -100,
                          transition: { duration: 0.3, ease: "easeInOut" }
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative p-5 rounded-[20px]"
                        style={{
                          backgroundColor: "var(--card)",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
                        }}
                      >
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div
                            className="w-20 h-20 rounded-[16px] overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100"
                            style={{ 
                              border: "1px solid var(--border-light)",
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                            }}
                          >
                            <ImageWithFallback
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            {/* Brand */}
                            <p
                              className="text-[10px] font-bold uppercase tracking-[0.8px] mb-1"
                              style={{ color: "var(--muted-foreground)" }}
                            >
                              {item.product.brand}
                            </p>
                            
                            {/* Product Name */}
                            <h3
                              className="text-[15px] font-black mb-2 line-clamp-2 leading-snug"
                              style={{ color: "var(--foreground)" }}
                            >
                              {item.product.name}
                            </h3>

                            {/* Price & Quantity Controls Row */}
                            <div className="flex items-center justify-between gap-3">
                              {/* Price */}
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl font-black" style={{ color: "var(--foreground)" }}>
                                  ₹{item.product.price}
                                </span>
                                {item.product.originalPrice && (
                                  <span
                                    className="text-xs font-semibold line-through"
                                    style={{ color: "var(--muted-foreground)", opacity: 0.4 }}
                                  >
                                    ₹{item.product.originalPrice}
                                  </span>
                                )}
                              </div>

                              {/* Quantity Controls - Compact Pill Design */}
                              <div
                                className="inline-flex items-center gap-2 px-2 py-1.5 rounded-full"
                                style={{
                                  backgroundColor: "var(--background)",
                                  border: "1.5px solid var(--border-light)",
                                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                                }}
                              >
                                <motion.button
                                  whileTap={{ scale: 0.8 }}
                                  onClick={() => updateQuantity(item.product.id, -1)}
                                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all"
                                  style={{
                                    backgroundColor: "var(--card)",
                                    border: "1px solid var(--border-light)",
                                    color: "var(--foreground)",
                                  }}
                                >
                                  <Minus className="w-3 h-3" strokeWidth={2.5} />
                                </motion.button>
                                
                                <motion.span 
                                  key={item.quantity}
                                  initial={{ scale: 1.3, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ 
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 25
                                  }}
                                  className="text-sm font-black min-w-[20px] text-center" 
                                  style={{ color: "var(--foreground)" }}
                                >
                                  {item.quantity}
                                </motion.span>
                                
                                <motion.button
                                  whileTap={{ scale: 0.8 }}
                                  onClick={() => updateQuantity(item.product.id, 1)}
                                  className="w-6 h-6 rounded-full flex items-center justify-center"
                                  style={{
                                    background: "var(--gradient-brand-button)",
                                    color: "var(--text-inverse)",
                                    boxShadow: "0 2px 8px rgba(232, 90, 139, 0.3)",
                                  }}
                                >
                                  <Plus className="w-3 h-3" strokeWidth={2.5} />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Delete Button - Subtle Circular Design (Top Right) */}
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: "rgba(239, 68, 68, 0.15)",
                          }}
                          onClick={() => removeItem(item.product.id)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                          style={{
                            backgroundColor: "rgba(239, 68, 68, 0.08)",
                            border: "1px solid rgba(239, 68, 68, 0.15)",
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" style={{ color: "var(--color-error)" }} strokeWidth={2} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer - Price Summary & Checkout - Fixed */}
            {cartItems.length > 0 && (
              <div
                className="flex-shrink-0 px-5 pt-4 pb-8 border-t"
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border-light)",
                }}
              >
                {/* Free Shipping Banner */}
                {subtotal > 0 && subtotal < 1000 && (
                  <div
                    className="mb-3 px-3 py-2.5 rounded-xl text-center"
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.12)",
                      border: "1px solid rgba(16, 185, 129, 0.25)",
                    }}
                  >
                    <p className="text-xs font-bold text-green-600">
                      Add ₹{1000 - subtotal} more for FREE shipping! 🎉
                    </p>
                  </div>
                )}

                {/* Compact Price Breakdown */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium" style={{ color: "var(--muted-foreground)" }}>
                      Subtotal
                    </span>
                    <span className="font-bold" style={{ color: "var(--foreground)" }}>
                      ₹{subtotal}
                    </span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-green-600" strokeWidth={2} />
                        <span className="font-semibold text-green-600">Savings</span>
                      </div>
                      <span className="font-bold text-green-600">-₹{savings}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium" style={{ color: "var(--muted-foreground)" }}>
                      Shipping + Tax
                    </span>
                    <span className="font-bold" style={{ color: "var(--foreground)" }}>
                      ₹{shipping + tax}
                    </span>
                  </div>
                </div>

                {/* Prominent Total */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={onCheckout}
                  className="w-full flex items-center justify-between mb-4 px-4 py-3 rounded-2xl cursor-pointer transition-all"
                  style={{
                    background: "linear-gradient(135deg, rgba(232, 90, 139, 0.08) 0%, rgba(241, 134, 172, 0.08) 100%)",
                    border: "1.5px solid rgba(232, 90, 139, 0.2)",
                  }}
                >
                  <span className="text-base font-black" style={{ color: "var(--foreground)" }}>
                    Total Amount
                  </span>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-3xl font-black"
                      style={{ 
                        background: "var(--gradient-brand-button)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      ₹{total}
                    </span>
                    <ChevronRight 
                      className="w-5 h-5" 
                      style={{ color: "var(--brand-primary-500)" }} 
                      strokeWidth={2.5} 
                    />
                  </div>
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}