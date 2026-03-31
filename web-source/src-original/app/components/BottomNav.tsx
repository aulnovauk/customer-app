import { Home, Search, Calendar, Heart, User, CalendarDays, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react";

const navItems = [
  { path: "/app", icon: Home, label: "Home" },
  { path: "/app/explore", icon: Search, label: "Explore" },
  { path: "/app/bookings", icon: Calendar, label: "Bookings" },
  { path: "/app/events", icon: CalendarDays, label: "Events" },
  { path: "/app/shop", icon: ShoppingBag, label: "Shop" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 max-w-[390px] mx-auto">
      {/* Safe area spacer */}
      <div 
        className="backdrop-blur-xl border-t shadow-2xl"
        style={{
          backgroundColor: 'var(--surface-overlay)',
          borderColor: 'var(--border-light)',
        }}
      >
        <div className="flex items-center justify-around px-2 py-2 pb-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center gap-1 px-3 py-1.5 min-w-[56px]"
              >
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -top-0.5 w-8 h-0.5 rounded-full"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="transition-colors"
                  style={{ 
                    color: isActive ? 'var(--brand-primary)' : 'var(--muted-foreground)'
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    strokeWidth={isActive ? 2.5 : 1.8}
                    fill={isActive && item.path === "/app/favorites" ? "currentColor" : "none"}
                  />
                </motion.div>
                <span
                  className="text-[10px] font-medium transition-colors"
                  style={{ 
                    color: isActive ? 'var(--brand-primary)' : 'var(--muted-foreground)'
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}