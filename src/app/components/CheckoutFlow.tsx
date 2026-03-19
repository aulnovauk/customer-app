import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  X,
  ChevronRight,
  ChevronLeft,
  MapPin,
  CreditCard,
  Smartphone,
  Wallet,
  Banknote,
  Building2,
  Check,
  ShoppingBag,
  User,
  Phone,
  Home,
  Lock,
  Calendar,
  Shield,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Product {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CheckoutFlowProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  cartTotal: number;
  onOrderSuccess: (orderId: string) => void;
}

type PaymentMethod = "card" | "upi" | "wallet" | "cod" | "netbanking";
type WalletType = "paytm" | "phonepe" | "gpay" | "amazon";

export function CheckoutFlow({
  isOpen,
  onClose,
  cartItems,
  cartTotal,
  onOrderSuccess,
}: CheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Step 1: Delivery Address
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Step 2: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [selectedWallet, setSelectedWallet] = useState<WalletType>("paytm");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

  const steps = [
    { number: 1, label: "Address", icon: MapPin },
    { number: 2, label: "Payment", icon: CreditCard },
    { number: 3, label: "Review", icon: ShoppingBag },
  ];

  const paymentMethods = [
    {
      id: "card" as PaymentMethod,
      label: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, Rupay",
    },
    {
      id: "upi" as PaymentMethod,
      label: "UPI",
      icon: Smartphone,
      description: "Pay via any UPI app",
    },
    {
      id: "wallet" as PaymentMethod,
      label: "Wallets",
      icon: Wallet,
      description: "Paytm, PhonePe, Google Pay",
    },
    {
      id: "netbanking" as PaymentMethod,
      label: "Net Banking",
      icon: Building2,
      description: "All major banks",
    },
    {
      id: "cod" as PaymentMethod,
      label: "Cash on Delivery",
      icon: Banknote,
      description: "Pay when you receive",
    },
  ];

  const wallets = [
    { id: "paytm" as WalletType, label: "Paytm", color: "#00BAF2" },
    { id: "phonepe" as WalletType, label: "PhonePe", color: "#5F259F" },
    { id: "gpay" as WalletType, label: "Google Pay", color: "#4285F4" },
    { id: "amazon" as WalletType, label: "Amazon Pay", color: "#FF9900" },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handlePlaceOrder();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const orderId = `ORD-${Date.now().toString().slice(-8)}`;
      setIsProcessing(false);
      onOrderSuccess(orderId);
    }, 2500);
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return (
        address.fullName &&
        address.phone &&
        address.addressLine1 &&
        address.city &&
        address.state &&
        address.pincode
      );
    }
    if (currentStep === 2) {
      if (paymentMethod === "card") {
        return (
          cardDetails.number &&
          cardDetails.name &&
          cardDetails.expiry &&
          cardDetails.cvv
        );
      }
      if (paymentMethod === "upi") {
        return upiId.length > 0;
      }
      return true; // For wallet, netbanking, and COD
    }
    return true;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center"
          >
            <div
              className="w-full max-w-[390px] mx-auto rounded-t-[32px] sm:rounded-[32px] overflow-hidden"
              style={{
                backgroundColor: "var(--background)",
                maxHeight: "95vh",
              }}
            >
              {/* Header */}
              <div
                className="sticky top-0 z-10 px-5 py-5 border-b"
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border-light)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {currentStep > 1 && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBack}
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border-light)",
                        }}
                      >
                        <ChevronLeft className="w-5 h-5" style={{ color: "var(--foreground)" }} strokeWidth={2} />
                      </motion.button>
                    )}
                    <div>
                      <h2 className="text-2xl font-black" style={{ color: "var(--foreground)" }}>
                        Checkout
                      </h2>
                      <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                        {steps[currentStep - 1].label}
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

                {/* Progress Steps */}
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => {
                    const StepIcon = step.icon;
                    const isActive = currentStep === step.number;
                    const isCompleted = currentStep > step.number;

                    return (
                      <div key={step.number} className="flex items-center flex-1">
                        <div className="flex flex-col items-center gap-2">
                          <motion.div
                            animate={{
                              scale: isActive ? 1.1 : 1,
                            }}
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{
                              background: isCompleted
                                ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                                : isActive
                                ? "linear-gradient(135deg, #E85A8B 0%, #F186AC 100%)"
                                : "var(--muted)",
                              boxShadow: isActive || isCompleted
                                ? `0 4px 12px ${isCompleted ? "rgba(16, 185, 129, 0.3)" : "rgba(232, 90, 139, 0.3)"}`
                                : "none",
                            }}
                          >
                            {isCompleted ? (
                              <Check className="w-6 h-6 text-white" strokeWidth={3} />
                            ) : (
                              <StepIcon
                                className="w-5 h-5"
                                style={{ color: isActive ? "#FFFFFF" : "var(--muted-foreground)" }}
                                strokeWidth={2.5}
                              />
                            )}
                          </motion.div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{
                              color: isActive || isCompleted ? "var(--foreground)" : "var(--muted-foreground)",
                            }}
                          >
                            {step.label}
                          </span>
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className="flex-1 h-1 mx-2 rounded-full"
                            style={{
                              backgroundColor: isCompleted ? "#10B981" : "var(--border-light)",
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="overflow-y-auto px-5 py-6" style={{ maxHeight: "calc(95vh - 280px)" }}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Delivery Address */}
                  {currentStep === 1 && (
                    <motion.div
                      key="address"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5" style={{ color: "var(--brand-primary)" }} strokeWidth={2.5} />
                        <h3 className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                          Delivery Address
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} strokeWidth={2} />
                            <input
                              type="text"
                              placeholder="Enter your full name"
                              value={address.fullName}
                              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                              style={{
                                backgroundColor: "var(--card)",
                                border: "1px solid var(--border-light)",
                                color: "var(--foreground)",
                              }}
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} strokeWidth={2} />
                            <input
                              type="tel"
                              placeholder="10-digit mobile number"
                              value={address.phone}
                              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                              style={{
                                backgroundColor: "var(--card)",
                                border: "1px solid var(--border-light)",
                                color: "var(--foreground)",
                              }}
                            />
                          </div>
                        </div>

                        {/* Address Line 1 */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
                            Address Line 1 *
                          </label>
                          <div className="relative">
                            <Home className="absolute left-4 top-4 w-4 h-4" style={{ color: "var(--muted-foreground)" }} strokeWidth={2} />
                            <textarea
                              placeholder="House No., Building Name, Street"
                              value={address.addressLine1}
                              onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                              rows={2}
                              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all resize-none"
                              style={{
                                backgroundColor: "var(--card)",
                                border: "1px solid var(--border-light)",
                                color: "var(--foreground)",
                              }}
                            />
                          </div>
                        </div>

                        {/* Address Line 2 */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
                            Address Line 2 (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="Area, Landmark"
                            value={address.addressLine2}
                            onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                            style={{
                              backgroundColor: "var(--card)",
                              border: "1px solid var(--border-light)",
                              color: "var(--foreground)",
                            }}
                          />
                        </div>

                        {/* City, State, Pincode */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
                              City *
                            </label>
                            <input
                              type="text"
                              placeholder="City"
                              value={address.city}
                              onChange={(e) => setAddress({ ...address, city: e.target.value })}
                              className="w-full px-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                              style={{
                                backgroundColor: "var(--card)",
                                border: "1px solid var(--border-light)",
                                color: "var(--foreground)",
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
                              State *
                            </label>
                            <input
                              type="text"
                              placeholder="State"
                              value={address.state}
                              onChange={(e) => setAddress({ ...address, state: e.target.value })}
                              className="w-full px-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                              style={{
                                backgroundColor: "var(--card)",
                                border: "1px solid var(--border-light)",
                                color: "var(--foreground)",
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
                              Pincode *
                            </label>
                            <input
                              type="text"
                              placeholder="6-digit PIN"
                              value={address.pincode}
                              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                              className="w-full px-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                              style={{
                                backgroundColor: "var(--card)",
                                border: "1px solid var(--border-light)",
                                color: "var(--foreground)",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Payment Method */}
                  {currentStep === 2 && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <CreditCard className="w-5 h-5" style={{ color: "var(--brand-primary)" }} strokeWidth={2.5} />
                        <h3 className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                          Payment Method
                        </h3>
                      </div>

                      {/* Payment Method Selection */}
                      <div className="space-y-3">
                        {paymentMethods.map((method) => {
                          const MethodIcon = method.icon;
                          const isSelected = paymentMethod === method.id;

                          return (
                            <motion.button
                              key={method.id}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setPaymentMethod(method.id)}
                              className="w-full p-4 rounded-2xl text-left transition-all"
                              style={{
                                backgroundColor: isSelected ? "rgba(232, 90, 139, 0.1)" : "var(--card)",
                                border: `2px solid ${isSelected ? "var(--brand-primary)" : "var(--border-light)"}`,
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                  style={{
                                    background: isSelected
                                      ? "linear-gradient(135deg, #E85A8B 0%, #F186AC 100%)"
                                      : "var(--background)",
                                    border: isSelected ? "none" : "1px solid var(--border-light)",
                                  }}
                                >
                                  <MethodIcon
                                    className="w-6 h-6"
                                    strokeWidth={2.5}
                                    style={{ color: isSelected ? "#FFFFFF" : "var(--brand-primary)" }}
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-black mb-0.5" style={{ color: "var(--foreground)" }}>
                                    {method.label}
                                  </h4>
                                  <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                                    {method.description}
                                  </p>
                                </div>
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-6 h-6 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: "var(--brand-primary)" }}
                                  >
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                  </motion.div>
                                )}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Payment Details Based on Selected Method */}
                      <AnimatePresence mode="wait">
                        {paymentMethod === "card" && (
                          <motion.div
                            key="card-details"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 mt-4"
                          >
                            <div className="flex items-center gap-2 p-3 rounded-xl" style={{ backgroundColor: "rgba(99, 102, 241, 0.1)", border: "1px solid rgba(99, 102, 241, 0.2)" }}>
                              <Shield className="w-4 h-4 text-indigo-600" strokeWidth={2} />
                              <p className="text-xs font-semibold text-indigo-600">
                                Your card details are secure & encrypted
                              </p>
                            </div>

                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
                                Card Number
                              </label>
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                value={cardDetails.number}
                                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                maxLength={19}
                                className="w-full px-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                                style={{
                                  backgroundColor: "var(--card)",
                                  border: "1px solid var(--border-light)",
                                  color: "var(--foreground)",
                                }}
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
                                Cardholder Name
                              </label>
                              <input
                                type="text"
                                placeholder="Name on card"
                                value={cardDetails.name}
                                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                className="w-full px-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                                style={{
                                  backgroundColor: "var(--card)",
                                  border: "1px solid var(--border-light)",
                                  color: "var(--foreground)",
                                }}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
                                  Expiry Date
                                </label>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  value={cardDetails.expiry}
                                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                  maxLength={5}
                                  className="w-full px-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                                  style={{
                                    backgroundColor: "var(--card)",
                                    border: "1px solid var(--border-light)",
                                    color: "var(--foreground)",
                                  }}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
                                  CVV
                                </label>
                                <input
                                  type="password"
                                  placeholder="123"
                                  value={cardDetails.cvv}
                                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                  maxLength={3}
                                  className="w-full px-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                                  style={{
                                    backgroundColor: "var(--card)",
                                    border: "1px solid var(--border-light)",
                                    color: "var(--foreground)",
                                  }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {paymentMethod === "upi" && (
                          <motion.div
                            key="upi-details"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 mt-4"
                          >
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
                                UPI ID
                              </label>
                              <input
                                type="text"
                                placeholder="username@upi"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                className="w-full px-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all"
                                style={{
                                  backgroundColor: "var(--card)",
                                  border: "1px solid var(--border-light)",
                                  color: "var(--foreground)",
                                }}
                              />
                            </div>
                          </motion.div>
                        )}

                        {paymentMethod === "wallet" && (
                          <motion.div
                            key="wallet-details"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3 mt-4"
                          >
                            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                              Select Wallet
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                              {wallets.map((wallet) => {
                                const isSelected = selectedWallet === wallet.id;
                                return (
                                  <motion.button
                                    key={wallet.id}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedWallet(wallet.id)}
                                    className="p-4 rounded-xl text-center transition-all"
                                    style={{
                                      backgroundColor: isSelected ? "rgba(232, 90, 139, 0.1)" : "var(--card)",
                                      border: `2px solid ${isSelected ? "var(--brand-primary)" : "var(--border-light)"}`,
                                    }}
                                  >
                                    <div
                                      className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                                      style={{ backgroundColor: wallet.color }}
                                    >
                                      <Wallet className="w-6 h-6 text-white" strokeWidth={2} />
                                    </div>
                                    <p className="text-xs font-bold" style={{ color: "var(--foreground)" }}>
                                      {wallet.label}
                                    </p>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}

                        {paymentMethod === "cod" && (
                          <motion.div
                            key="cod-details"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                          >
                            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                              <Banknote className="w-12 h-12 mx-auto mb-3 text-green-600" strokeWidth={1.5} />
                              <h4 className="text-sm font-black mb-2" style={{ color: "var(--foreground)" }}>
                                Pay on Delivery
                              </h4>
                              <p className="text-xs font-medium text-green-600">
                                Pay with cash when you receive your order
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* Step 3: Order Review */}
                  {currentStep === 3 && (
                    <motion.div
                      key="review"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      {/* Delivery Address */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="w-5 h-5" style={{ color: "var(--brand-primary)" }} strokeWidth={2.5} />
                          <h3 className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                            Delivery Address
                          </h3>
                        </div>
                        <div
                          className="p-4 rounded-2xl"
                          style={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border-light)",
                          }}
                        >
                          <p className="text-sm font-black mb-1" style={{ color: "var(--foreground)" }}>
                            {address.fullName}
                          </p>
                          <p className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                            {address.phone}
                          </p>
                          <p className="text-xs font-medium leading-relaxed" style={{ color: "var(--foreground)" }}>
                            {address.addressLine1}
                            {address.addressLine2 && `, ${address.addressLine2}`}
                            <br />
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CreditCard className="w-5 h-5" style={{ color: "var(--brand-primary)" }} strokeWidth={2.5} />
                          <h3 className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                            Payment Method
                          </h3>
                        </div>
                        <div
                          className="p-4 rounded-2xl"
                          style={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border-light)",
                          }}
                        >
                          <p className="text-sm font-black" style={{ color: "var(--foreground)" }}>
                            {paymentMethods.find((m) => m.id === paymentMethod)?.label}
                          </p>
                          <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                            {paymentMethod === "card" && cardDetails.number && `•••• ${cardDetails.number.slice(-4)}`}
                            {paymentMethod === "upi" && upiId}
                            {paymentMethod === "wallet" && wallets.find((w) => w.id === selectedWallet)?.label}
                            {paymentMethod === "cod" && "Pay on delivery"}
                            {paymentMethod === "netbanking" && "Via Internet Banking"}
                          </p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <ShoppingBag className="w-5 h-5" style={{ color: "var(--brand-primary)" }} strokeWidth={2.5} />
                          <h3 className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                            Order Summary
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {cartItems.map((item) => (
                            <div
                              key={item.product.id}
                              className="flex gap-3 p-3 rounded-xl"
                              style={{
                                backgroundColor: "var(--card)",
                                border: "1px solid var(--border-light)",
                              }}
                            >
                              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100">
                                <ImageWithFallback
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-black mb-1 truncate" style={{ color: "var(--foreground)" }}>
                                  {item.product.name}
                                </p>
                                <p className="text-[10px] font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>
                                  {item.product.brand} · Qty: {item.quantity}
                                </p>
                                <p className="text-sm font-black" style={{ color: "var(--foreground)" }}>
                                  ₹{item.product.price * item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price Breakdown */}
                      <div
                        className="p-4 rounded-2xl space-y-2"
                        style={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border-light)",
                        }}
                      >
                        <div className="flex justify-between text-sm">
                          <span style={{ color: "var(--muted-foreground)" }}>Subtotal</span>
                          <span className="font-bold" style={{ color: "var(--foreground)" }}>₹{cartTotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: "var(--muted-foreground)" }}>Shipping</span>
                          <span className="font-bold text-green-600">FREE</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: "var(--muted-foreground)" }}>Tax</span>
                          <span className="font-bold" style={{ color: "var(--foreground)" }}>₹{Math.round(cartTotal * 0.18)}</span>
                        </div>
                        <div className="h-px" style={{ backgroundColor: "var(--border-light)" }} />
                        <div className="flex justify-between pt-1">
                          <span className="text-lg font-black" style={{ color: "var(--foreground)" }}>Total</span>
                          <span className="text-2xl font-black" style={{ color: "var(--foreground)" }}>₹{cartTotal + Math.round(cartTotal * 0.18)}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer - Action Button */}
              <div
                className="sticky bottom-0 px-5 py-5 border-t"
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border-light)",
                }}
              >
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  disabled={!isStepValid() || isProcessing}
                  className="w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: isStepValid() && !isProcessing
                      ? "linear-gradient(135deg, #E85A8B 0%, #F186AC 100%)"
                      : "var(--muted)",
                    color: isStepValid() && !isProcessing ? "#FFFFFF" : "var(--muted-foreground)",
                    boxShadow: isStepValid() && !isProcessing ? "0 4px 16px rgba(232, 90, 139, 0.35)" : "none",
                    opacity: isStepValid() && !isProcessing ? 1 : 0.6,
                    cursor: isStepValid() && !isProcessing ? "pointer" : "not-allowed",
                  }}
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Processing Payment...
                    </>
                  ) : currentStep === 3 ? (
                    <>
                      <Lock className="w-5 h-5" strokeWidth={2.5} />
                      Place Order - ₹{cartTotal + Math.round(cartTotal * 0.18)}
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="w-5 h-5" strokeWidth={3} />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}