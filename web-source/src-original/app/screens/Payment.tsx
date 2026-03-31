import { useState } from "react";
import { ArrowLeft, CreditCard, Smartphone, Tag, Check, ChevronRight, Lock } from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, Amex" },
  { id: "apple", label: "Apple Pay", icon: Smartphone, desc: "Touch or Face ID" },
  { id: "google", label: "Google Pay", icon: Smartphone, desc: "Pay with Google" },
];

export function Payment() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = 65;
  const discount = promoApplied ? 10 : 0;
  const total = subtotal - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "GLOW10") {
      setPromoApplied(true);
    }
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate("/confirmation");
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-surface-base">
      <div className="max-w-[390px] mx-auto pb-32">
        {/* Header */}
        <div 
          className="px-5 pt-12 pb-5 border-b border-glass"
          style={{ background: "var(--gradient-background-pastel)" }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-surface-glass hover:bg-surface-elevated rounded-full flex items-center justify-center shadow-sm transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900" />
            </button>
            <div>
              <h1 className="text-lg font-black text-gray-900">Checkout</h1>
              <p className="text-gray-500 text-xs">Secure payment</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-gray-400">
              <Lock className="w-4 h-4" />
              <span className="text-xs">SSL secured</span>
            </div>
          </div>
        </div>

        <div className="px-5 pt-5 space-y-5">
          {/* Booking Summary */}
          <div className="bg-gray-900 rounded-3xl p-5 text-white">
            <p className="text-white/50 text-xs font-bold uppercase tracking-wide mb-3">Order summary</p>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-base">Women's Haircut</p>
                <p className="text-white/50 text-sm mt-0.5">Luxe Beauty Studio · Sarah Johnson</p>
                <p className="text-white/50 text-sm">Mar 20, 2026 at 2:00 PM</p>
              </div>
              <span className="text-2xl font-black">${subtotal}</span>
            </div>
          </div>

          {/* Promo Code */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Promo code</p>
            <div className="flex gap-2">
              <div className={`flex-1 flex items-center gap-2 rounded-2xl px-4 py-3 border transition-all ${
                promoApplied ? "border-green-400 bg-green-50" : "border-white bg-white/60 backdrop-blur-sm shadow-sm"
              }`}>
                <Tag className={`w-4 h-4 flex-shrink-0 ${promoApplied ? "text-green-500" : "text-gray-400"}`} />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Enter promo code (try GLOW10)"
                  disabled={promoApplied}
                  className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400 disabled:opacity-50"
                />
                {promoApplied && <Check className="w-4 h-4 text-green-500 flex-shrink-0" />}
              </div>
              {!promoApplied && (
                <button
                  onClick={handleApplyPromo}
                  disabled={!promoCode}
                  className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all ${ 
                    promoCode ? "btn-brand shadow-brand-md" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Apply
                </button>
              )}
            </div>
            <AnimatePresence>
              {promoApplied && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 text-xs font-semibold mt-2"
                >
                  🎉 GLOW10 applied — you saved $10!
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Payment Methods */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Payment method</p>
            <div className="space-y-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-3xl border transition-all text-left ${
                      selectedMethod === method.id
                        ? "card-brand-selected"
                        : "card-glass"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      selectedMethod === method.id ? "bg-white/20" : "bg-brand-subtle"
                    }`}>
                      <Icon className={`w-5 h-5 ${selectedMethod === method.id ? "text-white" : "text-brand"}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold text-sm ${selectedMethod === method.id ? "text-white" : "text-gray-900"}`}>
                        {method.label}
                      </p>
                      <p className={`text-xs ${selectedMethod === method.id ? "text-white/80" : "text-gray-500"}`}>
                        {method.desc}
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedMethod === method.id ? "border-white bg-white" : "border-gray-300"
                    }`}>
                      {selectedMethod === method.id && (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--color-primary)" }} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card Details */}
          <AnimatePresence>
            {selectedMethod === "card" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-50 rounded-3xl p-4 space-y-3 border border-gray-100">
                  <div>
                    <label className="text-xs font-bold text-gray-500 mb-1.5 block">Card number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none border border-gray-200 focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 mb-1.5 block">Cardholder name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Jessica Smith"
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none border border-gray-200 focus:border-gray-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1.5 block">Expiry</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none border border-gray-200 focus:border-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1.5 block">CVV</label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="•••"
                        maxLength={3}
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none border border-gray-200 focus:border-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Total */}
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Service fee</span>
              <span className="text-gray-900">${subtotal}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Promo discount</span>
                <span className="text-green-600 font-semibold">-${discount}</span>
              </div>
            )}
            <div className="h-px bg-gray-200 my-1" />
            <div className="flex justify-between">
              <span className="font-black text-gray-900">Total</span>
              <span className="font-black text-gray-900 text-lg">${total}</span>
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <div className="fixed bottom-0 left-0 right-0 z-40 max-w-[390px] mx-auto bg-white border-t border-gray-100 px-5 py-4 pb-8">
          <motion.button
            onClick={handlePay}
            disabled={isProcessing}
            whileTap={{ scale: 0.97 }}
            className="w-full btn-brand py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-brand-lg disabled:opacity-70"
          >
            {isProcessing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Pay ${total}
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}