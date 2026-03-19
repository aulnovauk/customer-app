import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function Layout() {
  return (
    <div className="min-h-screen">
      <Outlet />
      <BottomNav />
    </div>
  );
}