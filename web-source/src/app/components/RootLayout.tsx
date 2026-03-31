import { Outlet } from "react-router";
import { AnimatedBackground } from "./AnimatedBackground";

export function RootLayout() {
  return (
    <div 
      className="max-w-[390px] mx-auto min-h-screen overflow-hidden relative shadow-2xl"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <AnimatedBackground />
      <Outlet />
    </div>
  );
}