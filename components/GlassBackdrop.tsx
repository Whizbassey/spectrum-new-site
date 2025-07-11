"use client";
import { usePathname } from "next/navigation";

export default function GlassBackdrop() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <div className="fixed inset-0 z-10 pointer-events-none glass-card bg-black/60 border border-white/10 backdrop-blur-lg" />
  );
} 