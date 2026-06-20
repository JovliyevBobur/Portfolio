"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface LiquidButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  active?: boolean;
}

export function LiquidButton({ children, icon, active = false, className = "", ...props }: LiquidButtonProps) {
  return (
    <motion.button
      className={`relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 backdrop-blur-xl px-8 py-4 flex items-center justify-center gap-3 text-white transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:border-white/40 hover:bg-white/10 group ${
        active ? "border-primary/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]" : ""
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props as any}
    >
      {/* Liquid overlay effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12" />
      
      {/* Glow effect underneath */}
      <div className={`absolute inset-0 z-0 bg-primary/20 blur-xl transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
      
      <span className={`relative z-10 transition-colors duration-300 ${active ? "text-primary" : "text-white/80 group-hover:text-white"}`}>
        {icon}
      </span>
      
      <span className="relative z-10 font-semibold tracking-wide text-lg">
        {children}
      </span>
      
      {/* Optional: Add a subtle inner shadow or highlight for more 3D depth */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/10 mix-blend-overlay pointer-events-none" />
    </motion.button>
  );
}
