"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Star, User, Settings } from "lucide-react";
import Lottie from "lottie-react";

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  lottieData?: any;
  onClick: () => void;
}

interface FuturisticMenuProps {
  items?: MenuItem[];
  radius?: number;
  position?: "bottom-right" | "bottom-left" | "center";
}

export function FuturisticMenu({ items, radius = 90, position = "bottom-right" }: FuturisticMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  const defaultItems: MenuItem[] = [
    { id: "home", label: "Home", icon: <Home size={18} />, onClick: () => console.log("Home") },
    { id: "search", label: "Search", icon: <Search size={18} />, onClick: () => console.log("Search") },
    { id: "star", label: "Favorites", icon: <Star size={18} />, onClick: () => console.log("Favorites") },
    { id: "user", label: "Profile", icon: <User size={18} />, onClick: () => console.log("Profile") },
    { id: "settings", label: "Settings", icon: <Settings size={18} />, onClick: () => console.log("Settings") },
  ];

  const menuItems = items || defaultItems;
  
  // Distribute items in an arc or circle
  // If bottom-right, spread them in the top-left quadrant (-180 to -90 deg)
  const angleSpread = position === "bottom-right" ? 90 : 360;
  const startAngle = position === "bottom-right" ? -180 : -90;
  const angleStep = menuItems.length > 1 ? angleSpread / (menuItems.length - 1) : 0;

  const positionClasses = {
    "bottom-right": "fixed bottom-8 right-8",
    "bottom-left": "fixed bottom-8 left-8",
    "center": "relative",
  };

  return (
    <div className={`${positionClasses[position]} z-50 hidden lg:flex items-center justify-center w-20 h-20`}>
      {/* Background radial ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/5 bg-[#1a1b26]/50 backdrop-blur-xl shadow-2xl"
        animate={{
          scale: isOpen ? (radius * 2.5) / 80 : 1, // Expand background ring to encompass items
          opacity: isOpen ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        style={{ pointerEvents: 'none' }}
      />

      <AnimatePresence>
        {isOpen && menuItems.map((item, index) => {
          let angle;
          if (position === "bottom-right") {
             angle = startAngle + (index * angleStep);
          } else {
             // Full circle
             angle = startAngle + (index * (360 / menuItems.length));
          }
          
          const radians = (angle * Math.PI) / 180;
          const x = Math.cos(radians) * radius;
          const y = Math.sin(radians) * radius;

          const isActive = activeIndex === index;

          return (
            <motion.button
              key={item.id}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ x, y, opacity: 1, scale: 1 }}
              exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: index * 0.05 
              }}
              onClick={() => {
                setActiveIndex(index);
                item.onClick();
              }}
              className={`absolute flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 ${
                isActive ? "text-primary drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" : "text-white/40 hover:text-white/80"
              }`}
              title={item.label}
            >
              {item.lottieData ? (
                <div className="w-8 h-8">
                  <Lottie animationData={item.lottieData} loop={true} autoplay={isActive || isOpen} />
                </div>
              ) : (
                item.icon
              )}
            </motion.button>
          );
        })}
      </AnimatePresence>

      {/* Center Knob */}
      <motion.button
        className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-colors duration-300 ${
          isOpen ? "bg-[#242636] border-2 border-primary/30" : "bg-[#1f202e] border border-white/10"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* The rotating dash */}
        <motion.div
          animate={{ rotate: isOpen ? -90 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className={`w-1 h-5 rounded-full shadow-[0_0_10px_currentColor] transition-colors duration-300 ${
            isOpen ? "bg-primary text-primary" : "bg-white/70 text-white/70"
          }`} />
        </motion.div>
        
        {/* Subtle glow arc like in the picture */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-[-4px] rounded-full border-t-2 border-l-2 border-primary/50 blur-[2px]"
          />
        )}
      </motion.button>
    </div>
  );
}
