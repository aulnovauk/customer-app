import { motion } from "motion/react";
import {
  X,
  Filter,
  DollarSign,
  Star,
  CheckCircle2,
  Tag,
  Package,
  ChevronRight,
} from "lucide-react";

interface ShopFiltersProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedBrands: Set<string>;
  setSelectedBrands: (brands: Set<string>) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  showOnlyInStock: boolean;
  setShowOnlyInStock: (show: boolean) => void;
  showOnlyDiscounted: boolean;
  setShowOnlyDiscounted: (show: boolean) => void;
  onClose: () => void;
  filteredProductsCount: number;
}

const availableBrands = [
  "LuxeSkin",
  "Glamour Co.",
  "Silk & Shine",
  "Beauty Tools",
  "GlowPure",
  "Perfect Line",
  "NatureLux",
  "TechGlow",
];

export function ShopFilters({
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  minRating,
  setMinRating,
  showOnlyInStock,
  setShowOnlyInStock,
  showOnlyDiscounted,
  setShowOnlyDiscounted,
  onClose,
  filteredProductsCount,
}: ShopFiltersProps) {
  const toggleBrand = (brand: string) => {
    const newBrands = new Set(selectedBrands);
    if (newBrands.has(brand)) {
      newBrands.delete(brand);
    } else {
      newBrands.add(brand);
    }
    setSelectedBrands(newBrands);
  };

  const resetFilters = () => {
    setPriceRange([0, 7000]);
    setSelectedBrands(new Set());
    setMinRating(0);
    setShowOnlyInStock(false);
    setShowOnlyDiscounted(false);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 max-w-[390px] mx-auto rounded-t-[32px] overflow-hidden"
        style={{
          backgroundColor: "var(--background)",
          maxHeight: "90vh",
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
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--brand-primary-500) 0%, var(--brand-primary-400) 100%)",
                  boxShadow: "0 4px 12px rgba(232, 90, 139, 0.3)",
                }}
              >
                <Filter className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-black" style={{ color: "var(--foreground)" }}>
                Filters
              </h2>
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
          <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
            Refine your product search
          </p>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto px-5 py-6 space-y-8" style={{ maxHeight: "calc(90vh - 180px)" }}>
          {/* Price Range Filter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5" style={{ color: "var(--brand-primary)" }} strokeWidth={2.5} />
              <h3 className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                Price Range
              </h3>
            </div>

            <div className="space-y-4">
              {/* Price Display */}
              <div className="flex items-center justify-between">
                <div
                  className="px-4 py-2.5 rounded-xl"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <span className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                    Min
                  </span>
                  <p className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                    ₹{priceRange[0]}
                  </p>
                </div>
                <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: "var(--border-light)" }} />
                <div
                  className="px-4 py-2.5 rounded-xl"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <span className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                    Max
                  </span>
                  <p className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                    ₹{priceRange[1]}
                  </p>
                </div>
              </div>

              {/* Price Range Slider */}
              <input
                type="range"
                min="0"
                max="7000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--brand-primary-500) 0%, var(--brand-primary-500) ${(priceRange[1] / 7000) * 100}%, var(--color-neutral-border) ${(priceRange[1] / 7000) * 100}%, var(--color-neutral-border) 100%)`,
                }}
              />

              {/* Quick Price Presets */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Under ₹1000", range: [0, 1000] },
                  { label: "₹1000-₹3000", range: [1000, 3000] },
                  { label: "₹3000-₹5000", range: [3000, 5000] },
                  { label: "All Prices", range: [0, 7000] },
                ].map((preset) => (
                  <motion.button
                    key={preset.label}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPriceRange(preset.range as [number, number])}
                    className="px-4 py-2 rounded-full text-xs font-bold transition-all"
                    style={{
                      backgroundColor:
                        priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1]
                          ? "var(--brand-primary)"
                          : "var(--card)",
                      color:
                        priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1]
                          ? "var(--text-inverse)"
                          : "var(--muted-foreground)",
                      border: `1px solid ${
                        priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1]
                          ? "transparent"
                          : "var(--border-light)"
                      }`,
                    }}
                  >
                    {preset.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5" style={{ color: "var(--brand-primary)" }} strokeWidth={2.5} />
              <h3 className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                Brands
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {availableBrands.map((brand) => {
                const isSelected = selectedBrands.has(brand);
                return (
                  <motion.button
                    key={brand}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleBrand(brand)}
                    className="px-4 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2"
                    style={{
                      backgroundColor: isSelected ? "var(--brand-primary)" : "var(--card)",
                      color: isSelected ? "var(--text-inverse)" : "var(--foreground)",
                      border: `1px solid ${isSelected ? "transparent" : "var(--border-light)"}`,
                      boxShadow: isSelected ? "0 4px 12px rgba(232, 90, 139, 0.3)" : "none",
                    }}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />}
                    {brand}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5" style={{ color: "var(--brand-primary)" }} strokeWidth={2.5} />
              <h3 className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                Minimum Rating
              </h3>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[0, 3.5, 4.0, 4.5, 4.8].map((rating) => {
                const isActive = minRating === rating;
                return (
                  <motion.button
                    key={rating}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMinRating(rating)}
                    className="p-4 rounded-2xl text-center transition-all"
                    style={{
                      backgroundColor: isActive ? "var(--brand-primary)" : "var(--card)",
                      color: isActive ? "var(--text-inverse)" : "var(--foreground)",
                      border: `1px solid ${isActive ? "transparent" : "var(--border-light)"}`,
                      boxShadow: isActive ? "0 4px 12px rgba(232, 90, 139, 0.3)" : "none",
                    }}
                  >
                    <Star
                      className={`w-6 h-6 mx-auto mb-1 ${isActive ? "fill-white text-white" : "fill-amber-400 text-amber-400"}`}
                      strokeWidth={2}
                    />
                    <p className="text-xs font-bold">{rating === 0 ? "All" : rating}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Toggle Filters */}
          <div className="space-y-3">
            {/* In Stock Only */}
            <div
              className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all"
              style={{
                backgroundColor: showOnlyInStock ? "rgba(232, 90, 139, 0.1)" : "var(--card)",
                border: `1px solid ${showOnlyInStock ? "var(--brand-primary)" : "var(--border-light)"}`,
              }}
              onClick={() => setShowOnlyInStock(!showOnlyInStock)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: showOnlyInStock
                      ? "linear-gradient(135deg, var(--brand-primary-500) 0%, var(--brand-primary-400) 100%)"
                      : "var(--background)",
                    border: showOnlyInStock ? "none" : "1px solid var(--border-light)",
                  }}
                >
                  <Package
                    className="w-6 h-6"
                    strokeWidth={2.5}
                    style={{ color: showOnlyInStock ? "var(--text-inverse)" : "var(--brand-primary)" }}
                  />
                </div>
                <div>
                  <h3 className="text-base font-black mb-0.5" style={{ color: "var(--foreground)" }}>
                    In Stock Only
                  </h3>
                  <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                    Show available products only
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <div
                className="relative w-12 h-7 rounded-full transition-all"
                style={{
                  backgroundColor: showOnlyInStock ? "var(--brand-primary)" : "var(--color-neutral-border)",
                }}
              >
                <motion.div
                  className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg"
                  animate={{
                    left: showOnlyInStock ? "24px" : "4px",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </div>

            {/* On Sale Only */}
            <div
              className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all"
              style={{
                backgroundColor: showOnlyDiscounted ? "rgba(232, 90, 139, 0.1)" : "var(--card)",
                border: `1px solid ${showOnlyDiscounted ? "var(--brand-primary)" : "var(--border-light)"}`,
              }}
              onClick={() => setShowOnlyDiscounted(!showOnlyDiscounted)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: showOnlyDiscounted
                      ? "linear-gradient(135deg, var(--brand-primary-500) 0%, var(--brand-primary-400) 100%)"
                      : "var(--background)",
                    border: showOnlyDiscounted ? "none" : "1px solid var(--border-light)",
                  }}
                >
                  <Tag
                    className="w-6 h-6"
                    strokeWidth={2.5}
                    style={{ color: showOnlyDiscounted ? "var(--text-inverse)" : "var(--brand-primary)" }}
                  />
                </div>
                <div>
                  <h3 className="text-base font-black mb-0.5" style={{ color: "var(--foreground)" }}>
                    On Sale Only
                  </h3>
                  <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                    Show discounted products only
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <div
                className="relative w-12 h-7 rounded-full transition-all"
                style={{
                  backgroundColor: showOnlyDiscounted ? "var(--brand-primary)" : "var(--color-neutral-border)",
                }}
              >
                <motion.div
                  className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg"
                  animate={{
                    left: showOnlyDiscounted ? "24px" : "4px",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="sticky bottom-0 px-5 py-5 border-t flex gap-3"
          style={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border-light)",
          }}
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={resetFilters}
            className="flex-1 py-4 rounded-2xl font-bold text-sm transition-all"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border-light)",
              color: "var(--foreground)",
            }}
          >
            Reset All
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="flex-[2] py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all"
            style={{
              background: "linear-gradient(135deg, var(--brand-primary-500) 0%, var(--brand-primary-400) 100%)",
              color: "var(--text-inverse)",
              boxShadow: "0 4px 16px rgba(232, 90, 139, 0.35)",
            }}
          >
            Show {filteredProductsCount} Products
            <ChevronRight className="w-4.5 h-4.5" strokeWidth={3} />
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
