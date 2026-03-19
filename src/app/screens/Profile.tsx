import {
  Settings,
  ChevronRight,
  Award,
  Heart,
  History,
  LogOut,
  Bell,
  Shield,
  HelpCircle,
  CreditCard,
  Camera,
  Image as ImageIcon,
  X,
  Palette,
  Check,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import type { ThemeMode } from "../context/ThemeContext";

const themesList: {
  id: ThemeMode;
  name: string;
  gradient: string;
  emoji: string;
}[] = [
  { id: "light", name: "Light", gradient: "linear-gradient(135deg, #FF1B8D 0%, #FF6B9D 25%, #FFA8C5 50%, #FFD700 100%)", emoji: "✨" },
  { id: "dark", name: "Dark", gradient: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 20%, #FF1B8D 60%, #00F0FF 100%)", emoji: "🌙" },
  { id: "warm", name: "Warm", gradient: "linear-gradient(135deg, #FF9A76 0%, #FFD700 100%)", emoji: "🌅" },
  { id: "masculine", name: "Electric Blue", gradient: "linear-gradient(135deg, #001F3F 0%, #0047FF 30%, #0088FF 70%, #00F0FF 100%)", emoji: "⚡" },
  { id: "unisex", name: "Tropical", gradient: "linear-gradient(135deg, #00CFC1 0%, #20E3B2 33%, #FF9A76 66%, #FF6B6B 100%)", emoji: "🌴" },
  { id: "genz", name: "Neon Dreams", gradient: "linear-gradient(135deg, #B026FF 0%, #FF006E 25%, #FF1B8D 50%, #00F0FF 75%, #00FFFF 100%)", emoji: "🎮" },
  { id: "luxe", name: "Black Gold", gradient: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 25%, #8B7500 75%, #FFD700 100%)", emoji: "👑" },
  { id: "sunset", name: "Sunset Blaze", gradient: "linear-gradient(135deg, #FF4500 0%, #FF6B35 20%, #FF006E 40%, #B026FF 70%, #7B2CBF 100%)", emoji: "🔥" },
  { id: "ocean", name: "Ocean Depths", gradient: "linear-gradient(135deg, #001529 0%, #003B73 25%, #0074D9 50%, #00D4FF 75%, #00FFF5 100%)", emoji: "🌊" },
  { id: "royal", name: "Royal", gradient: "linear-gradient(135deg, #4A0072 0%, #6B0FB8 30%, #9B30FF 60%, #E6A4B4 85%, #FFD700 100%)", emoji: "💜" },
  { id: "mint", name: "Mint Fresh", gradient: "linear-gradient(135deg, #00C9A7 0%, #00FF9F 40%, #7FFF00 70%, #CCFF00 100%)", emoji: "🍃" },
  { id: "sakura", name: "Sakura", gradient: "linear-gradient(135deg, #FF1493 0%, #FF69B4 30%, #FFB6C1 60%, #FFAB91 85%, #FFE4B5 100%)", emoji: "🌸" },
  { id: "cyber", name: "Cyberpunk", gradient: "linear-gradient(135deg, #0D1117 0%, #39FF14 35%, #00FFFF 50%, #FF00FF 75%, #FF1493 100%)", emoji: "🤖" },
];

const stats = [
  { label: "Bookings", value: "12" },
  { label: "Saved", value: "5" },
  { label: "Points", value: "250" },
];

const menuSections = [
  {
    title: "Account",
    items: [
      { icon: History, label: "Booking history", color: "#6366F1", path: "/app/bookings" },
      { icon: Heart, label: "Saved venues", color: "#F43F5E", path: "/app/favorites" },
      { icon: Award, label: "Loyalty rewards", color: "#F59E0B", badge: "250 pts", path: null },
      { icon: CreditCard, label: "Payment methods", color: "#10B981", path: null },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Palette, label: "Theme Gallery", color: "#EC4899", badge: "NEW", path: "/themes" },
      { icon: Bell, label: "Notifications", color: "#8B5CF6", path: null },
      { icon: Shield, label: "Privacy & Security", color: "#3B82F6", path: null },
      { icon: Settings, label: "App settings", color: "#6B7280", path: null },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help & Support", color: "#14B8A6", path: null },
      { icon: RotateCcw, label: "Reset Onboarding", color: "#F97316", path: null, action: "reset-onboarding" },
    ],
  },
];

export function Profile() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    setShowUploadOptions(true);
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
    setShowUploadOptions(false);
  };

  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
    setShowUploadOptions(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleMenuItemClick = (item: any) => {
    if (item.action === "reset-onboarding") {
      // Clear all onboarding-related localStorage
      localStorage.removeItem("onboarding_completed");
      localStorage.removeItem("geolocation_permission");
      localStorage.removeItem("notification_permission");
      localStorage.removeItem("brand_intro_shown");
      
      // Navigate to splash/onboarding
      navigate("/");
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28 transition-colors duration-300">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Header */}
      <div
        className="px-5 pt-14 pb-8 transition-colors duration-300"
        style={{ background: 'var(--gradient-background-pastel)' }}
      >
        {/* Profile info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            {profilePicture ? (
              <div className="w-20 h-20 rounded-3xl overflow-hidden relative" style={{ boxShadow: 'var(--elevation-3)' }}>
                <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div 
                className="w-20 h-20 rounded-3xl flex items-center justify-center text-white text-2xl font-black"
                style={{ 
                  background: 'var(--gradient-primary)',
                  boxShadow: 'var(--elevation-3)'
                }}
              >
                JS
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-2 border-card rounded-full" style={{ backgroundColor: '#10B981' }} />
            {/* Camera button overlay */}
            <button
              onClick={handleUploadClick}
              className="absolute bottom-0 right-0 w-8 h-8 bg-card rounded-full flex items-center justify-center shadow-md border-2 border-card hover:bg-muted transition-colors"
            >
              <Camera className="w-4 h-4 text-foreground" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-black text-foreground">Jessica Smith</h2>
            <p className="text-muted-foreground text-sm">jessica@example.com</p>
            <div className="flex items-center gap-1 mt-1">
              <Award className="w-3.5 h-3.5" style={{ color: 'var(--accent-gold)' }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--accent-gold)' }}>Gold Member</span>
            </div>
          </div>
          <button className="w-10 h-10 bg-card rounded-2xl flex items-center justify-center shadow-sm border border-border">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex bg-card rounded-3xl shadow-sm overflow-hidden border border-border">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex-1 py-4 text-center ${
                i < stats.length - 1 ? "border-r border-border" : ""
              }`}
            >
              <p className="text-2xl font-black text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu sections */}
      <div className="px-5 space-y-5 mt-2">
        {menuSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.07 }}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 px-1" style={{ color: 'var(--muted-foreground)' }}>
              {section.title}
            </h3>

            {/* Theme Mode Selector - Only show in Preferences section */}
            {section.title === "Preferences" && (
              <div className="bg-card rounded-3xl shadow-sm border border-border p-5 mb-3 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-foreground text-sm">Appearance Mode</h4>
                    <p className="text-xs text-muted-foreground">Choose your visual style</p>
                  </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-5 px-5 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {themesList.map((option) => {
                    const isActive = theme === option.id;

                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => setTheme(option.id)}
                        whileTap={{ scale: 0.95 }}
                        className="relative flex flex-col items-center gap-2 snap-center flex-shrink-0"
                      >
                        {/* Circle Preview */}
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-md transition-all ${
                            isActive
                              ? "ring-4 ring-offset-2 ring-offset-card ring-primary scale-110"
                              : "border border-border hover:scale-105"
                          }`}
                          style={{ background: option.gradient }}
                        >
                          <span className="drop-shadow-md">{option.emoji}</span>
                        </div>
                        <span className={`text-xs font-bold w-20 text-center whitespace-nowrap overflow-hidden text-ellipsis ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                          {option.name}
                        </span>

                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-card"
                          >
                            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Theme Description */}
                <div 
                  className="mt-2 p-3 rounded-2xl transition-colors duration-300 flex items-center justify-center text-center"
                  style={{ 
                    backgroundColor: 'var(--muted)'
                  }}
                >
                  <p className="text-xs font-semibold leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    Active Theme: <span className="text-primary">{themesList.find(t => t.id === theme)?.name || 'Custom'}</span>
                  </p>
                </div>
              </div>
            )}

            <div className="bg-card rounded-3xl shadow-sm overflow-hidden border border-border transition-colors duration-300">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleMenuItemClick(item)}
                    className={`w-full flex items-center gap-4 px-4 py-4 active:bg-muted transition-colors ${
                      itemIndex < section.items.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div
                      className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${item.color}18` }}
                    >
                      <Icon className="w-4.5 h-4.5" style={{ color: item.color }} strokeWidth={2} />
                    </div>
                    <span className="flex-1 text-left font-semibold text-foreground text-sm">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full mr-1">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }} />
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-3xl shadow-sm border active:bg-red-50 transition-colors"
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="w-9 h-9 rounded-2xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <LogOut className="w-4.5 h-4.5 text-red-500" strokeWidth={2} />
          </div>
          <span className="flex-1 text-left font-semibold text-red-600 text-sm">Log out</span>
        </motion.button>

        {/* App version */}
        <p className="text-center text-xs pb-2" style={{ color: 'var(--muted-foreground)' }}>GlowBook v2.1.0</p>
      </div>

      {/* File input for profile picture */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {/* Upload options modal */}
      <AnimatePresence>
        {showUploadOptions && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUploadOptions(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Update profile photo</h3>
                <button
                  onClick={() => setShowUploadOptions(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              {/* Options */}
              <div className="p-4 space-y-2">
                {/* Take Photo */}
                <button
                  onClick={handleCameraClick}
                  className="w-full flex items-center gap-4 px-4 py-4 bg-gradient-to-r from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 rounded-2xl transition-colors"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-gray-900 text-sm">Take Photo</p>
                    <p className="text-xs text-gray-500">Use your camera</p>
                  </div>
                </button>
                
                {/* Choose from Gallery */}
                <button
                  onClick={handleGalleryClick}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-colors"
                  style={{ background: 'var(--primary-subtle)' }}
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <ImageIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-gray-900 text-sm">Choose from Gallery</p>
                    <p className="text-xs text-gray-500">Select existing photo</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}