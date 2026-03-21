import { useState } from "react";
import { FloatingOrbs } from "./FloatingOrbs";
import { BackgroundPattern } from "./BackgroundPattern";
import { SparkleEffect } from "./SparkleEffect";
import { HolographicOverlay } from "./HolographicOverlay";
import { motion } from "motion/react";
import { DEFAULT_ORB_COLORS, DEFAULT_SPARKLE_COLOR } from "../constants/animationColors";

export function BackgroundShowcase() {
  const [showOrbs, setShowOrbs] = useState(true);
  const [showPattern, setShowPattern] = useState(true);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showHolographic, setShowHolographic] = useState(false);
  const [pattern, setPattern] = useState<"dots" | "grid" | "waves" | "circles">("dots");

  return (
    <div className="min-h-screen p-6">
      {/* Demo Controls */}
      <motion.div
        className="glass-heavy rounded-3xl p-6 mb-6 max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-bold mb-4">Background Effects Demo</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Floating Orbs</span>
            <button
              onClick={() => setShowOrbs(!showOrbs)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={
                showOrbs
                  ? { background: 'var(--gradient-primary)', color: 'white' }
                  : { backgroundColor: 'rgba(255, 255, 255, 0.5)', color: 'var(--muted-foreground)' }
              }
            >
              Floating Orbs
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Background Pattern</span>
            <button
              onClick={() => setShowPattern(!showPattern)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={
                showPattern
                  ? { background: 'var(--gradient-primary)', color: 'white' }
                  : { backgroundColor: 'rgba(255, 255, 255, 0.5)', color: 'var(--muted-foreground)' }
              }
            >
              Pattern
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Sparkle Effect</span>
            <button
              onClick={() => setShowSparkles(!showSparkles)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={
                showSparkles
                  ? { background: 'var(--gradient-primary)', color: 'white' }
                  : { backgroundColor: 'rgba(255, 255, 255, 0.5)', color: 'var(--muted-foreground)' }
              }
            >
              Sparkles
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Holographic</span>
            <button
              onClick={() => setShowHolographic(!showHolographic)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={
                showHolographic
                  ? { background: 'var(--gradient-primary)', color: 'white' }
                  : { backgroundColor: 'rgba(255, 255, 255, 0.5)', color: 'var(--muted-foreground)' }
              }
            >
              Holographic
            </button>
          </div>

          <div className="pt-4 border-t border-white/30">
            <span className="text-sm block mb-2">Pattern Style</span>
            <div className="grid grid-cols-4 gap-2">
              {(["dots", "grid", "waves", "circles"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPattern(p)}
                  className="px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all"
                  style={
                    pattern === p
                      ? { background: 'var(--gradient-primary)', color: 'white' }
                      : { backgroundColor: 'rgba(255, 255, 255, 0.4)', color: 'var(--muted-foreground)' }
                  }
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sample Cards */}
      <div className="grid gap-4 max-w-md mx-auto">
        <motion.div
          className="glass-light rounded-3xl p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="font-bold mb-2">Glass Light</h3>
          <p className="text-sm text-gray-600">
            Subtle transparency with light blur
          </p>
        </motion.div>

        <motion.div
          className="glass-card rounded-3xl p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="font-bold mb-2">Glass Card</h3>
          <p className="text-sm text-gray-600">
            Perfect balance with shadow
          </p>
        </motion.div>

        <motion.div
          className="glass-heavy rounded-3xl p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="font-bold mb-2">Glass Heavy</h3>
          <p className="text-sm text-gray-600">
            Maximum clarity with strong blur
          </p>
        </motion.div>
      </div>

      {/* Active Effects */}
      {showOrbs && (
        <FloatingOrbs
          colors={DEFAULT_ORB_COLORS}
          intensity="medium"
        />
      )}
      {showPattern && <BackgroundPattern pattern={pattern} />}
      {showSparkles && <SparkleEffect count={20} color={DEFAULT_SPARKLE_COLOR} />}
      {showHolographic && <HolographicOverlay enabled intensity={0.08} />}
    </div>
  );
}