import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className = "", onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`backdrop-blur-xl rounded-3xl p-4 shadow-lg border ${className}`}
      style={{
        backgroundColor: 'var(--surface-glass-medium)',
        borderColor: 'var(--border-glass)',
      }}
    >
      {children}
    </div>
  );
}