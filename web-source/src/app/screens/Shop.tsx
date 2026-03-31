import { useState, useCallback } from "react";
import type { Address } from "../../types";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  SlidersHorizontal,
  Heart,
  ShoppingCart,
  Star,
  TrendingUp,
  Sparkles,
  Award,
  Package,
  ChevronRight,
  Plus,
  Minus,
  X,
  Filter,
  DollarSign,
  CheckCircle2,
  Tag,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ShopFilters } from "../components/ShopFilters";
import { CartDrawer } from "../components/CartDrawer";
import { AddressSelection } from "../components/AddressSelection";
import { CheckoutFlow } from "../components/CheckoutFlow";
import { OrderSuccess } from "../components/OrderSuccess";

type ProductCategory = "all" | "skincare" | "makeup" | "haircare" | "tools";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: ProductCategory;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  isBestseller: boolean;
  isNew: boolean;
  inStock: boolean;
  discount?: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Radiant Glow Serum",
    brand: "LuxeSkin",
    category: "skincare",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    price: 2499,
    originalPrice: 3499,
    rating: 4.8,
    reviews: 324,
    isBestseller: true,
    isNew: false,
    inStock: true,
    discount: 29,
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    brand: "Glamour Co.",
    category: "makeup",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    price: 899,
    rating: 4.9,
    reviews: 567,
    isBestseller: true,
    isNew: false,
    inStock: true,
  },
  {
    id: 3,
    name: "Hydrating Hair Mask",
    brand: "Silk & Shine",
    category: "haircare",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    price: 1599,
    originalPrice: 1999,
    rating: 4.7,
    reviews: 198,
    isBestseller: false,
    isNew: true,
    inStock: true,
    discount: 20,
  },
  {
    id: 4,
    name: "Pro Makeup Brush Set",
    brand: "Beauty Tools",
    category: "tools",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    price: 3499,
    rating: 5.0,
    reviews: 421,
    isBestseller: true,
    isNew: false,
    inStock: true,
  },
  {
    id: 5,
    name: "Vitamin C Face Cream",
    brand: "GlowPure",
    category: "skincare",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    price: 1899,
    originalPrice: 2499,
    rating: 4.6,
    reviews: 289,
    isBestseller: false,
    isNew: true,
    inStock: true,
    discount: 24,
  },
  {
    id: 6,
    name: "Waterproof Eyeliner",
    brand: "Perfect Line",
    category: "makeup",
    image: "https://images.unsplash.com/photo-1583241800698-c57eef6e9e48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    price: 649,
    rating: 4.5,
    reviews: 512,
    isBestseller: false,
    isNew: false,
    inStock: true,
  },
  {
    id: 7,
    name: "Argan Oil Hair Serum",
    brand: "NatureLux",
    category: "haircare",
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    price: 1299,
    rating: 4.8,
    reviews: 356,
    isBestseller: true,
    isNew: false,
    inStock: false,
  },
  {
    id: 8,
    name: "LED Facial Cleansing Brush",
    brand: "TechGlow",
    category: "tools",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    price: 4999,
    originalPrice: 6999,
    rating: 4.9,
    reviews: 178,
    isBestseller: false,
    isNew: true,
    inStock: true,
    discount: 29,
  },
];

const categoryFilters = [
  { id: "all" as ProductCategory, label: "All Products", icon: Package },
  { id: "skincare" as ProductCategory, label: "Skincare", icon: Sparkles },
  { id: "makeup" as ProductCategory, label: "Makeup", icon: Star },
  { id: "haircare" as ProductCategory, label: "Hair Care", icon: Award },
  { id: "tools" as ProductCategory, label: "Tools", icon: TrendingUp },
];

export function Shop() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [cart, setCart] = useState<Map<number, number>>(new Map());
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddressSelection, setShowAddressSelection] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  // Advanced filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 7000]);
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [minRating, setMinRating] = useState(0);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand = selectedBrands.size === 0 || selectedBrands.has(product.brand);
    const matchesRating = product.rating >= minRating;
    const matchesStock = !showOnlyInStock || product.inStock;
    const matchesDiscount = !showOnlyDiscounted || !!product.discount;
    return matchesCategory && matchesSearch && matchesPrice && matchesBrand && matchesRating && matchesStock && matchesDiscount;
  });

  const bestsellers = filteredProducts.filter((p) => p.isBestseller);
  const newProducts = filteredProducts.filter((p) => p.isNew);

  const toggleLike = useCallback((productId: number) => {
    setLikedProducts((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      return newLiked;
    });
  }, []);

  const addToCart = useCallback((productId: number) => {
    setCart((prev) => {
      const newCart = new Map(prev);
      newCart.set(productId, (newCart.get(productId) || 0) + 1);
      return newCart;
    });
  }, []);

  const updateCartQty = useCallback((productId: number, delta: number) => {
    setCart((prev) => {
      const newCart = new Map(prev);
      const newQty = (newCart.get(productId) || 0) + delta;
      if (newQty <= 0) {
        newCart.delete(productId);
      } else {
        newCart.set(productId, newQty);
      }
      return newCart;
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setCart((prev) => {
      const newCart = new Map(prev);
      newCart.delete(productId);
      return newCart;
    });
  }, []);

  const handleCategoryChange = useCallback((categoryId: ProductCategory) => {
    setActiveCategory(categoryId);
  }, []);

  const handleOpenFilters = useCallback(() => setShowFilters(true), []);
  const handleOpenCart = useCallback(() => setShowCart(true), []);

  const handleLikeClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(e.currentTarget.dataset.productId ?? "0", 10);
    toggleLike(id);
  }, [toggleLike]);

  const handleAddToCartClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(e.currentTarget.dataset.productId ?? "0", 10);
    addToCart(id);
  }, [addToCart]);

  const handleCategoryClickData = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.filterId as ProductCategory;
    if (id) setActiveCategory(id);
  }, []);

  const handleCheckout = () => {
    setShowCart(false);
    setShowAddressSelection(true);
  };

  const handleAddressSelected = (_address: Address) => {
    setShowAddressSelection(false);
    setShowCheckout(true);
  };

  const handleOrderSuccess = (newOrderId: string) => {
    setOrderId(newOrderId);
    setShowCheckout(false);
    setShowCart(false);
    setShowSuccess(true);
    setCart(new Map()); // Clear cart
  };

  const cartItems = Array.from(cart.entries()).map(([id, qty]) => ({
    product: products.find((p) => p.id === id)!,
    quantity: qty,
  }));

  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = Array.from(cart.values()).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="min-h-screen pb-32 transition-colors duration-300" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-[390px] mx-auto">
        {/* Header */}
        <div className="px-5 pt-14 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black mb-1" style={{ color: "var(--foreground)" }}>
                Shop
              </h1>
              <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                Premium beauty products & tools
              </p>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenFilters}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border-light)",
                  color: "var(--foreground)",
                }}
              >
                <SlidersHorizontal className="w-5 h-5" strokeWidth={2} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenCart}
                className="relative w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border-light)",
                  color: "var(--foreground)",
                }}
              >
                <ShoppingCart className="w-5 h-5" strokeWidth={2} />
                {cartCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <span className="text-white text-[10px] font-black">{cartCount}</span>
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 pointer-events-none"
              style={{ color: "var(--muted-foreground)" }}
              strokeWidth={2}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm font-medium transition-all outline-none"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border-light)",
                color: "var(--foreground)",
              }}
            />
          </div>
        </div>

        {/* Bestsellers Section */}
        {bestsellers.length > 0 && (
          <div className="mb-6">
            <div className="px-5 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full" style={{ background: 'var(--gradient-gold)' }} />
                <h2 className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                  Bestsellers
                </h2>
              </div>
              <button className="text-sm font-bold text-rose-600 flex items-center gap-1">
                See all
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex overflow-x-auto scrollbar-hide gap-4 px-5 pb-2">
              {bestsellers.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="flex-shrink-0 w-[220px] cursor-pointer"
                >
                  {/* Product Image */}
                  <div
                    className="relative w-full h-[260px] mb-4 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
                    style={{
                      borderRadius: "20px",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />

                    {/* Gradient Overlay at Bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Discount Badge */}
                    {product.discount && (
                      <motion.div
                        initial={{ scale: 0, rotate: -12 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                        className="absolute top-3 left-3 px-3 py-1.5 rounded-xl shadow-lg"
                        style={{ background: 'var(--accent-error)' }}
                      >
                        <span className="text-white text-xs font-black">{product.discount}% OFF</span>
                      </motion.div>
                    )}

                    {/* Bestseller Badge */}
                    <div 
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5"
                      style={{ background: 'var(--gradient-gold)' }}
                    >
                      <Award className="w-3.5 h-3.5 text-white fill-white" strokeWidth={2} />
                      <span className="text-white text-xs font-black uppercase tracking-wide">Best</span>
                    </div>

                    {/* Heart Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      data-product-id={product.id} onClick={handleLikeClick}
                      className="absolute bottom-3 right-3 w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center transition-all shadow-lg"
                      style={{
                        backgroundColor: likedProducts.has(product.id)
                          ? "rgba(251, 113, 133, 0.95)"
                          : "rgba(255, 255, 255, 0.95)",
                        border: likedProducts.has(product.id)
                          ? "1px solid rgba(251, 113, 133, 1)"
                          : "1px solid rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedProducts.has(product.id) ? "fill-white text-white" : "text-gray-600"
                        }`}
                        strokeWidth={2}
                      />
                    </motion.button>

                    {/* Rating Badge - Bottom Left */}
                    <div className="absolute bottom-3 left-3 px-3 py-2 rounded-xl backdrop-blur-xl bg-white/95 border border-white/50 shadow-lg">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" strokeWidth={2} />
                        <span className="text-sm font-black" style={{ color: "var(--foreground)" }}>
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="px-1">
                    {/* Brand - Small & Subtle */}
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
                      {product.brand}
                    </p>

                    {/* Product Name - Bold & Prominent */}
                    <h3 className="text-base font-black mb-4 line-clamp-2 leading-tight" style={{ color: "var(--foreground)" }}>
                      {product.name}
                    </h3>

                    {/* Price Section - Strong Hierarchy */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-black" style={{ color: "var(--foreground)" }}>
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm font-semibold opacity-50" style={{
                            color: "var(--muted-foreground)",
                            textDecoration: "line-through",
                            textDecorationColor: "var(--muted-foreground)",
                          }}>
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      {product.discount && (
                        <p className="text-xs font-bold text-green-600">
                          Save ₹{product.originalPrice! - product.price}
                        </p>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      data-product-id={product.id} onClick={handleAddToCartClick}
                      disabled={!product.inStock}
                      className="w-full py-3 rounded-2xl text-sm font-black transition-all flex items-center justify-center gap-2"
                      style={{
                        background: product.inStock
                          ? "var(--gradient-brand-button)"
                          : "var(--muted)",
                        color: "var(--text-inverse)",
                        boxShadow: product.inStock ? "var(--shadow-brand-button)" : "none",
                        opacity: product.inStock ? 1 : 0.5,
                      }}
                    >
                      {product.inStock ? (
                        <>
                          <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
                          Add to Cart
                        </>
                      ) : (
                        "Out of Stock"
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="px-5 mb-5">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
            {categoryFilters.map((filter) => {
              const isActive = activeCategory === filter.id;
              const Icon = filter.icon;
              return (
                <motion.button
                  key={filter.id}
                  data-filter-id={filter.id} onClick={handleCategoryClickData}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full flex-shrink-0 text-sm font-bold transition-all"
                  style={
                    isActive
                      ? {
                          background: "var(--gradient-brand-button)",
                          color: "var(--text-inverse)",
                          boxShadow: "var(--shadow-brand-button)",
                        }
                      : {
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border-light)",
                          color: "var(--muted-foreground)",
                        }
                  }
                >
                  <Icon className="w-4 h-4" strokeWidth={2.5} />
                  {filter.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-5 pb-8">
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -3 }}
                  className="cursor-pointer"
                >
                  {/* Product Image */}
                  <div 
                    className="relative h-[200px] mb-3 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
                    style={{
                      borderRadius: '20px',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                      {product.discount && (
                        <motion.div
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.05 + 0.15, type: "spring" }}
                          className="px-2.5 py-1 rounded-lg shadow-md"
                          style={{ background: 'var(--accent-error)' }}
                        >
                          <span className="text-white text-[10px] font-black">{product.discount}%</span>
                        </motion.div>
                      )}
                      {product.isNew && (
                        <motion.div
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
                          className="px-2.5 py-1 rounded-lg shadow-md"
                          style={{ background: 'var(--accent-success)' }}
                        >
                          <span className="text-white text-[10px] font-black uppercase tracking-wide">New</span>
                        </motion.div>
                      )}
                      {product.isBestseller && (
                        <motion.div
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.05 + 0.25, type: "spring" }}
                          className="px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1"
                          style={{ background: 'var(--gradient-gold)' }}
                        >
                          <Award className="w-2.5 h-2.5 text-white fill-white" strokeWidth={2.5} />
                          <span className="text-white text-[10px] font-black uppercase tracking-wide">Best</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Heart */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      data-product-id={product.id} onClick={handleLikeClick}
                      className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full backdrop-blur-xl flex items-center justify-center shadow-md transition-all"
                      style={{
                        backgroundColor: likedProducts.has(product.id)
                          ? "rgba(251, 113, 133, 0.95)"
                          : "rgba(255, 255, 255, 0.95)",
                        border: likedProducts.has(product.id)
                          ? "1px solid rgba(251, 113, 133, 1)"
                          : "1px solid rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Heart
                        className={`w-4.5 h-4.5 ${likedProducts.has(product.id) ? "fill-white text-white" : "text-gray-600"}`}
                        strokeWidth={2}
                      />
                    </motion.button>
                    
                    {/* Rating Badge - Bottom Left */}
                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1.5 rounded-lg backdrop-blur-xl bg-white/95 border border-white/50 shadow-md">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" strokeWidth={2} />
                        <span className="text-xs font-black" style={{ color: "var(--foreground)" }}>
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="px-1">
                    {/* Brand - Small & Subtle */}
                    <p className="text-[9px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted-foreground)" }}>
                      {product.brand}
                    </p>
                    
                    {/* Product Name - Bold & Prominent */}
                    <h3 className="text-sm font-black mb-3 line-clamp-2 leading-tight" style={{ color: "var(--foreground)" }}>
                      {product.name}
                    </h3>

                    {/* Price Section - Strong Hierarchy */}
                    <div className="mb-3">
                      <div className="flex items-baseline gap-1.5 mb-0.5">
                        <span className="text-lg font-black" style={{ color: "var(--foreground)" }}>
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] font-semibold opacity-50" style={{ 
                            color: "var(--muted-foreground)",
                            textDecoration: "line-through",
                            textDecorationColor: "var(--muted-foreground)",
                          }}>
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      {product.discount && (
                        <p className="text-[10px] font-bold text-green-600">
                          Save ₹{product.originalPrice! - product.price}
                        </p>
                      )}
                    </div>

                    {/* Add to Cart */}
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      data-product-id={product.id} onClick={handleAddToCartClick}
                      disabled={!product.inStock}
                      className="w-full py-2.5 rounded-xl text-xs font-black transition-all"
                      style={{
                        background: product.inStock
                          ? "var(--gradient-brand-button)"
                          : "var(--muted)",
                        color: "var(--text-inverse)",
                        boxShadow: product.inStock ? "var(--shadow-brand-button)" : "none",
                        opacity: product.inStock ? 1 : 0.5,
                      }}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cartItems}
        updateQuantity={updateCartQty}
        removeItem={removeItem}
        onCheckout={handleCheckout}
      />

      {/* Filters Drawer */}
      <AnimatePresence>
        {showFilters && (
          <ShopFilters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            minRating={minRating}
            setMinRating={setMinRating}
            showOnlyInStock={showOnlyInStock}
            setShowOnlyInStock={setShowOnlyInStock}
            showOnlyDiscounted={showOnlyDiscounted}
            setShowOnlyDiscounted={setShowOnlyDiscounted}
            onClose={() => setShowFilters(false)}
            filteredProductsCount={filteredProducts.length}
          />
        )}
      </AnimatePresence>

      {/* Address Selection */}
      <AddressSelection
        isOpen={showAddressSelection}
        onClose={() => setShowAddressSelection(false)}
        onContinue={handleAddressSelected}
      />

      {/* Checkout Flow */}
      <AnimatePresence>
        {showCheckout && (
          <CheckoutFlow
            isOpen={showCheckout}
            cartItems={cartItems}
            cartTotal={cartTotal}
            onClose={() => setShowCheckout(false)}
            onOrderSuccess={handleOrderSuccess}
          />
        )}
      </AnimatePresence>

      {/* Order Success */}
      <AnimatePresence>
        {showSuccess && (
          <OrderSuccess
            orderId={orderId}
            onClose={() => setShowSuccess(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}