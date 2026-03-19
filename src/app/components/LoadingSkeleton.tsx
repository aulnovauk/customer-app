import { motion } from "motion/react";

// Base skeleton shimmer animation
const shimmer = {
  initial: { backgroundPosition: "-1000px 0" },
  animate: {
    backgroundPosition: "1000px 0",
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Card Skeleton for venue cards
export function VenueCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-[220px]">
      <motion.div
        className="w-full h-[200px] rounded-2xl mb-3"
        style={{
          background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
          backgroundSize: "1000px 100%",
        }}
        variants={shimmer}
        initial="initial"
        animate="animate"
      />
      <div className="space-y-2">
        <motion.div
          className="h-4 rounded-lg"
          style={{
            background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
            backgroundSize: "1000px 100%",
            width: "70%",
          }}
          variants={shimmer}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="h-3 rounded-lg"
          style={{
            background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
            backgroundSize: "1000px 100%",
            width: "50%",
          }}
          variants={shimmer}
          initial="initial"
          animate="animate"
        />
      </div>
    </div>
  );
}

// Category Skeleton for category circles
export function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className="w-[90px] h-[90px] rounded-full"
        style={{
          background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
          backgroundSize: "1000px 100%",
        }}
        variants={shimmer}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="h-3 rounded-lg w-16"
        style={{
          background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
          backgroundSize: "1000px 100%",
        }}
        variants={shimmer}
        initial="initial"
        animate="animate"
      />
    </div>
  );
}

// List Item Skeleton for bookings/favorites
export function ListItemSkeleton() {
  return (
    <motion.div
      className="rounded-3xl p-4 mb-3"
      style={{ backgroundColor: "var(--card)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-4">
        <motion.div
          className="w-24 h-24 rounded-2xl flex-shrink-0"
          style={{
            background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
            backgroundSize: "1000px 100%",
          }}
          variants={shimmer}
          initial="initial"
          animate="animate"
        />
        <div className="flex-1 space-y-3">
          <motion.div
            className="h-4 rounded-lg"
            style={{
              background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
              backgroundSize: "1000px 100%",
              width: "80%",
            }}
            variants={shimmer}
            initial="initial"
            animate="animate"
          />
          <motion.div
            className="h-3 rounded-lg"
            style={{
              background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
              backgroundSize: "1000px 100%",
              width: "60%",
            }}
            variants={shimmer}
            initial="initial"
            animate="animate"
          />
          <div className="flex gap-2">
            <motion.div
              className="h-8 rounded-full flex-1"
              style={{
                background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
                backgroundSize: "1000px 100%",
              }}
              variants={shimmer}
              initial="initial"
              animate="animate"
            />
            <motion.div
              className="h-8 rounded-full flex-1"
              style={{
                background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
                backgroundSize: "1000px 100%",
              }}
              variants={shimmer}
              initial="initial"
              animate="animate"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Service Item Skeleton for salon details
export function ServiceItemSkeleton() {
  return (
    <motion.div
      className="rounded-3xl p-5 mb-3"
      style={{ backgroundColor: "var(--card)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <motion.div
          className="h-5 rounded-lg"
          style={{
            background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
            backgroundSize: "1000px 100%",
            width: "40%",
          }}
          variants={shimmer}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="h-6 w-16 rounded-lg"
          style={{
            background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
            backgroundSize: "1000px 100%",
          }}
          variants={shimmer}
          initial="initial"
          animate="animate"
        />
      </div>
      <motion.div
        className="h-3 rounded-lg mb-3"
        style={{
          background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
          backgroundSize: "1000px 100%",
          width: "70%",
        }}
        variants={shimmer}
        initial="initial"
        animate="animate"
      />
      <div className="flex gap-2">
        <motion.div
          className="h-3 w-12 rounded-lg"
          style={{
            background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
            backgroundSize: "1000px 100%",
          }}
          variants={shimmer}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="h-3 w-16 rounded-lg"
          style={{
            background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
            backgroundSize: "1000px 100%",
          }}
          variants={shimmer}
          initial="initial"
          animate="animate"
        />
      </div>
    </motion.div>
  );
}

// Review Skeleton
export function ReviewSkeleton() {
  return (
    <motion.div
      className="p-4 rounded-2xl mb-3"
      style={{ backgroundColor: "var(--card)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3 mb-3">
        <motion.div
          className="w-10 h-10 rounded-full flex-shrink-0"
          style={{
            background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
            backgroundSize: "1000px 100%",
          }}
          variants={shimmer}
          initial="initial"
          animate="animate"
        />
        <div className="flex-1 space-y-2">
          <motion.div
            className="h-4 rounded-lg"
            style={{
              background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
              backgroundSize: "1000px 100%",
              width: "30%",
            }}
            variants={shimmer}
            initial="initial"
            animate="animate"
          />
          <motion.div
            className="h-3 rounded-lg"
            style={{
              background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
              backgroundSize: "1000px 100%",
              width: "20%",
            }}
            variants={shimmer}
            initial="initial"
            animate="animate"
          />
        </div>
      </div>
      <motion.div
        className="h-3 rounded-lg mb-2"
        style={{
          background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
          backgroundSize: "1000px 100%",
          width: "100%",
        }}
        variants={shimmer}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="h-3 rounded-lg"
        style={{
          background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
          backgroundSize: "1000px 100%",
          width: "80%",
        }}
        variants={shimmer}
        initial="initial"
        animate="animate"
      />
    </motion.div>
  );
}

// Full Page Skeleton for initial load
export function PageSkeleton() {
  return (
    <div className="min-h-screen pb-24 px-5 pt-14" style={{ backgroundColor: "var(--background)" }}>
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
                backgroundSize: "1000px 100%",
              }}
              variants={shimmer}
              initial="initial"
              animate="animate"
            />
            <div className="space-y-2">
              <motion.div
                className="h-4 w-24 rounded-lg"
                style={{
                  background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
                  backgroundSize: "1000px 100%",
                }}
                variants={shimmer}
                initial="initial"
                animate="animate"
              />
              <motion.div
                className="h-3 w-16 rounded-lg"
                style={{
                  background: "linear-gradient(90deg, var(--muted) 0%, var(--card) 50%, var(--muted) 100%)",
                  backgroundSize: "1000px 100%",
                }}
                variants={shimmer}
                initial="initial"
                animate="animate"
              />
            </div>
          </div>
        </div>

        {/* Content skeletons */}
        {[1, 2, 3].map((i) => (
          <ListItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
