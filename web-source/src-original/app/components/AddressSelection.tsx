import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { X, ChevronRight, MapPin, Home, Briefcase, Plus, Check, Pencil, Save } from "lucide-react";
import { useState } from "react";
import type { Address } from "../../types";

interface AddressSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (selectedAddress: Address) => void;
}

// Sample saved addresses
const savedAddresses: Address[] = [
  {
    id: 1,
    type: "home",
    name: "Priya Sharma",
    phone: "9876543210",
    address: "123 MG Road, Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560034",
    isDefault: true,
  },
  {
    id: 2,
    type: "work",
    name: "Priya Sharma",
    phone: "9876543210",
    address: "456 Indiranagar, 100 Feet Road",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560038",
  },
  {
    id: 3,
    type: "other",
    name: "Priya Sharma",
    phone: "9876543210",
    address: "789 Whitefield, ITPL Main Road",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560066",
  },
];

export function AddressSelection({ isOpen, onClose, onContinue }: AddressSelectionProps) {
  const [selectedAddressId, setSelectedAddressId] = useState<number>(
    savedAddresses.find((a) => a.isDefault)?.id || savedAddresses[0].id
  );
  const [sheetHeight, setSheetHeight] = useState<"60vh" | "90vh">("90vh");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [addresses, setAddresses] = useState<Address[]>(savedAddresses);
  const [editForm, setEditForm] = useState<Address | null>(null);
  const y = useMotionValue(0);

  const handleContinue = () => {
    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
    if (selectedAddress) {
      onContinue(selectedAddress);
    }
  };

  const handleEdit = (address: Address, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(address.id);
    setEditForm({ ...address });
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editForm) {
      setAddresses(addresses.map((a) => (a.id === editForm.id ? editForm : a)));
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
    setEditForm(null);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.y;
    const velocity = info.velocity.y;

    // If dragged down significantly, close the sheet
    if (offset > 150 || velocity > 500) {
      onClose();
      return;
    }

    // Snap to 60% or 90% based on drag position
    const windowHeight = window.innerHeight;
    const currentHeight = sheetHeight === "90vh" ? windowHeight * 0.9 : windowHeight * 0.6;
    const newPosition = currentHeight + offset;

    // Calculate distances to snap points
    const distanceTo90 = Math.abs(newPosition - windowHeight * 0.9);
    const distanceTo60 = Math.abs(newPosition - windowHeight * 0.6);

    // Snap to nearest point
    if (distanceTo90 < distanceTo60) {
      setSheetHeight("90vh");
    } else {
      setSheetHeight("60vh");
    }
  };

  const getAddressIcon = (type: Address["type"]) => {
    switch (type) {
      case "home":
        return <Home className="w-4 h-4" strokeWidth={2} />;
      case "work":
        return <Briefcase className="w-4 h-4" strokeWidth={2} />;
      default:
        return <MapPin className="w-4 h-4" strokeWidth={2} />;
    }
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal - Draggable Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0, height: sheetHeight }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed left-0 right-0 z-50 max-w-[390px] mx-auto rounded-t-[24px] overflow-hidden flex flex-col"
            style={{
              backgroundColor: "var(--background)",
              bottom: 0,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
          >
            {/* Drag Handle Indicator */}
            <div className="w-full pt-3 pb-2 flex items-center justify-center" style={{ backgroundColor: "var(--background)" }}>
              <motion.div
                className="w-12 h-1.5 rounded-full"
                style={{
                  backgroundColor: "var(--muted-foreground)",
                  opacity: 0.3,
                }}
                whileTap={{ scale: 1.2 }}
              />
            </div>

            {/* Header - Fixed */}
            <div
              className="sticky top-0 z-10 px-6 py-5 border-b"
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
                      background: `var(--gradient-brand-button)`,
                      boxShadow: `var(--shadow-brand-button)`,
                    }}
                  >
                    <MapPin className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black" style={{ color: "var(--foreground)" }}>
                      Select Address
                    </h2>
                    <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                      Choose delivery location
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

            {/* Addresses List - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-4">
                {addresses.map((address) => (
                  <motion.div
                    key={address.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedAddressId(address.id)}
                    className="relative p-5 rounded-[20px] cursor-pointer transition-all"
                    style={{
                      backgroundColor: "var(--card)",
                      border: `2px solid ${
                        selectedAddressId === address.id
                          ? "var(--brand-primary-500)"
                          : "var(--border-light)"
                      }`,
                      boxShadow:
                        selectedAddressId === address.id
                          ? "0 4px 16px rgba(232, 90, 139, 0.2)"
                          : "0 2px 8px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    {/* Selected Indicator */}
                    <AnimatePresence>
                      {selectedAddressId === address.id && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center"
                          style={{
                            background: `var(--gradient-brand-button)`,
                            boxShadow: `var(--shadow-brand-button)`,
                          }}
                        >
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Address Type Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="px-3 py-1.5 rounded-full flex items-center gap-1.5"
                        style={{
                          backgroundColor:
                            selectedAddressId === address.id
                              ? "rgba(232, 90, 139, 0.15)"
                              : "var(--background)",
                          color:
                            selectedAddressId === address.id
                              ? "var(--brand-primary-500)"
                              : "var(--muted-foreground)",
                        }}
                      >
                        {getAddressIcon(address.type)}
                        <span className="text-xs font-black uppercase tracking-wide">
                          {address.type}
                        </span>
                      </div>
                      {address.isDefault && (
                        <div
                          className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
                          style={{
                            backgroundColor: "rgba(16, 185, 129, 0.15)",
                            color: "var(--color-success)",
                          }}
                        >
                          Default
                        </div>
                      )}
                    </div>

                    {/* Edit Mode */}
                    {editingId === address.id && editForm ? (
                      <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-sm font-semibold"
                          placeholder="Name"
                          style={{
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border-light)",
                            color: "var(--foreground)",
                          }}
                        />
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-sm font-semibold"
                          placeholder="Phone"
                          style={{
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border-light)",
                            color: "var(--foreground)",
                          }}
                        />
                        <input
                          type="text"
                          value={editForm.address}
                          onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-sm font-semibold"
                          placeholder="Address"
                          style={{
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border-light)",
                            color: "var(--foreground)",
                          }}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={editForm.city}
                            onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                            className="px-3 py-2 rounded-xl text-sm font-semibold"
                            placeholder="City"
                            style={{
                              backgroundColor: "var(--background)",
                              border: "1px solid var(--border-light)",
                              color: "var(--foreground)",
                            }}
                          />
                          <input
                            type="text"
                            value={editForm.state}
                            onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                            className="px-3 py-2 rounded-xl text-sm font-semibold"
                            placeholder="State"
                            style={{
                              backgroundColor: "var(--background)",
                              border: "1px solid var(--border-light)",
                              color: "var(--foreground)",
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          value={editForm.pincode}
                          onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-sm font-semibold"
                          placeholder="Pincode"
                          style={{
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border-light)",
                            color: "var(--foreground)",
                          }}
                        />
                        
                        {/* Save & Cancel Buttons */}
                        <div className="flex gap-2 mt-4">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            className="flex-1 py-2.5 rounded-xl font-black text-sm flex items-center justify-center gap-2"
                            style={{
                              background: `var(--gradient-brand-button)`,
                              color: "var(--text-inverse)",
                              boxShadow: `var(--shadow-brand-button)`,
                            }}
                          >
                            <Save className="w-4 h-4" strokeWidth={2.5} />
                            Save
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCancelEdit}
                            className="px-5 py-2.5 rounded-xl font-black text-sm"
                            style={{
                              backgroundColor: "var(--background)",
                              border: "1px solid var(--border-light)",
                              color: "var(--muted-foreground)",
                            }}
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Name & Phone */}
                        <h3
                          className="text-base font-black mb-1"
                          style={{ color: "var(--foreground)" }}
                        >
                          {address.name}
                        </h3>
                        <p
                          className="text-sm font-semibold mb-3"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {address.phone}
                        </p>

                        {/* Address */}
                        <p
                          className="text-sm font-medium leading-relaxed mb-2"
                          style={{ color: "var(--foreground)" }}
                        >
                          {address.address}
                        </p>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                      </>
                    )}

                    {/* Edit Button - Show only when not editing */}
                    {editingId !== address.id && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleEdit(address, e)}
                        className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--border-light)",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                        }}
                      >
                        <Pencil className="w-3.5 h-3.5" style={{ color: "var(--foreground)" }} strokeWidth={2.5} />
                      </motion.button>
                    )}
                  </motion.div>
                ))}

                {/* Add New Address Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-5 rounded-[20px] flex items-center justify-center gap-3 border-2 border-dashed transition-all"
                  style={{
                    borderColor: "var(--border-light)",
                    backgroundColor: "var(--card)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: `var(--gradient-brand-button)`,
                      boxShadow: `var(--shadow-brand-button)`,
                    }}
                  >
                    <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-base font-black" style={{ color: "var(--foreground)" }}>
                    Add New Address
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Footer - Sticky CTA with Safe Area */}
            <div
              className="sticky bottom-0 px-6 pt-5 pb-8 border-t"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border-light)",
                boxShadow: "0 -8px 24px rgba(0, 0, 0, 0.08), 0 -2px 8px rgba(0, 0, 0, 0.04)",
              }}
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
                onClick={handleContinue}
                className="w-full py-4 rounded-[18px] font-black text-base flex items-center justify-center gap-2 relative overflow-hidden"
                style={{
                  background: `var(--gradient-brand-button)`,
                  color: "var(--text-inverse)",
                  boxShadow: `var(--shadow-brand-button-lg)`,
                }}
              >
                <span className="relative z-10">Continue to Payment</span>
                <ChevronRight className="w-5 h-5 relative z-10" strokeWidth={3} />

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  }}
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                />
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}