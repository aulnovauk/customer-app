import { Star, MapPin, Heart, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const initialFavorites = [
  {
    id: 1,
    name: "Luxe Beauty Studio",
    image: "https://images.unsplash.com/photo-1759134155377-4207d89b39ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBpbnRlcmlvciUyMGx1eHVyeSUyMG1vZGVybnxlbnwxfHx8fDE3NzM2NzU0MjN8MA&ixlib=rb-4.1.0&q=80&w=600",
    rating: 4.9,
    reviews: 234,
    distance: "0.8 km",
    category: "Hair & Makeup",
    price: "From $45",
    openNow: true,
  },
  {
    id: 2,
    name: "Serenity Spa & Salon",
    image: "https://images.unsplash.com/photo-1773333643165-2cadaf6d1bcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwcmVsYXhhdGlvbiUyMHNlcmVuZSUyMHBvb2x8ZW58MXx8fHwxNzczNjc2MDQ2fDA&ixlib=rb-4.1.0&q=80&w=600",
    rating: 4.8,
    reviews: 189,
    distance: "1.2 km",
    category: "Spa & Wellness",
    price: "From $65",
    openNow: true,
  },
  {
    id: 3,
    name: "Radiant Skin Studio",
    image: "https://images.unsplash.com/photo-1760488029475-41ff1eaa904b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjBza2luY2FyZSUyMHRyZWF0bWVudCUyMHdvbWFuJTIwZ2xvd2luZ3xlbnwxfHx8fDE3NzM2NzU0MTd8MA&ixlib=rb-4.1.0&q=80&w=600",
    rating: 5.0,
    reviews: 98,
    distance: "2.0 km",
    category: "Skincare",
    price: "From $80",
    openNow: false,
  },
];

export function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleRemove = (id: number) => {
    setFavorites((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen pb-28 transition-colors duration-300" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>Saved</h1>
          <span 
            className="text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: 'var(--gradient-primary)' }}
          >
            {favorites.length}
          </span>
        </div>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Your favourite venues</p>
      </div>

      {favorites.length > 0 ? (
        <div className="px-5 space-y-4">
          <AnimatePresence>
            {favorites.map((salon, index) => (
              <motion.div
                key={salon.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100, scale: 0.9 }}
                transition={{ delay: index * 0.07, duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden shadow-sm"
                style={{ 
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)'
                }}
              >
                {/* Remove button */}
                <button
                  onClick={() => handleRemove(salon.id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: 'var(--card-elevated)' }}
                >
                  <X className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                </button>

                {/* Image */}
                <div
                  className="relative h-44 cursor-pointer"
                  onClick={() => navigate(`/salon/${salon.id}`)}
                >
                  <ImageWithFallback
                    src={salon.image}
                    alt={salon.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Open/closed badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        salon.openNow
                          ? "bg-green-500 text-white"
                          : "bg-gray-800/70 text-white"
                      }`}
                    >
                      {salon.openNow ? "Open now" : "Closed"}
                    </span>
                  </div>

                  {/* Bottom info on image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-white font-black text-lg leading-tight">{salon.name}</h3>
                    <p className="text-white/70 text-xs">{salon.category}</p>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-4 pt-3 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-gray-800">{salon.rating}</span>
                        <span className="text-xs text-gray-400">({salon.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs">{salon.distance}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-900">{salon.price}</span>
                  </div>

                  <button
                    onClick={() => navigate(`/salon/${salon.id}`)}
                    className="w-full text-white py-3 rounded-2xl text-sm font-bold active:scale-[0.98] transition-transform"
                    style={{ background: 'var(--foreground)' }}
                  >
                    Book now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-8 py-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--primary-subtle)' }}
          >
            <Heart className="w-12 h-12" style={{ color: 'var(--primary)' }} />
          </motion.div>
          <h3 className="text-xl font-black mb-2 text-center" style={{ color: 'var(--foreground)' }}>No saved venues yet</h3>
          <p className="text-sm text-center mb-8 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            Tap the ♡ icon on any venue to save it for later
          </p>
          <button
            onClick={() => navigate("/app/explore")}
            className="text-white px-8 py-4 rounded-2xl font-bold text-sm"
            style={{ background: 'var(--foreground)' }}
          >
            Explore venues
          </button>
        </div>
      )}
    </div>
  );
}