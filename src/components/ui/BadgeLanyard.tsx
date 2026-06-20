"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function BadgeLanyard() {
  const badgeRef = useRef<HTMLDivElement>(null);
  
  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for physics-like feeling
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  // Transform mouse position into 3D rotations
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // A subtle swing for the whole group based on X
  const swing = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    
    // Normalized coordinates between -0.5 and 0.5
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Return to center
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-start w-full h-[600px] perspective-[1000px] z-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={badgeRef}
    >
      {/* The entire assembly swings left/right */}
      <motion.div 
        className="flex flex-col items-center cursor-grab active:cursor-grabbing"
        initial={{ y: -800, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 5, type: "spring", stiffness: 60, damping: 12 }}
        drag
        dragConstraints={{ top: 0, left: -300, right: 300, bottom: 200 }}
        dragElastic={0.2}
        style={{ 
          rotateZ: swing, 
          transformOrigin: "top center" 
        }}
      >
        {/* Lanyard String */}
        <div className="w-4 h-48 bg-[#0a0a0a] border-l border-r border-white/10 flex flex-col items-center shadow-lg relative z-0 pointer-events-none">
        </div>

        {/* Metal Clip */}
        <div className="w-8 h-12 -mt-2 bg-gradient-to-b from-gray-400 to-gray-600 rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.5)] border-2 border-gray-400 z-10 relative flex justify-center">
            {/* Inner hole */}
            <div className="w-4 h-4 rounded-full bg-black/80 mt-2 shadow-inner"></div>
        </div>

        {/* The Card */}
        <motion.div 
          className="w-64 h-[380px] -mt-4 bg-[#1a1b26] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/10 relative overflow-hidden group cursor-pointer z-20"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Card hole punch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-black/60 shadow-inner z-30"></div>
          
          {/* Portrait Image & Content */}
          <div className="absolute inset-0 w-full h-full p-1.5">
            <div className="w-full h-full rounded-[14px] overflow-hidden relative border border-white/5 bg-black/40">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-[#1a1b26] z-0"></div>
              
              {/* Actual Portrait */}
              <img 
                src="/My Portret.png" 
                alt="Portrait" 
                className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: 'center top' }}
              />

              {/* Glassmorphism overlay for info */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 z-20 transform translate-z-[30px] shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-0.5">Bobur Jovliyev</h3>
                <p className="text-primary text-sm font-semibold tracking-wider">Software Engineer</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs text-white/70">Open to work</span>
                </div>
              </div>
            </div>
          </div>

          {/* Glare effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none z-30 mix-blend-overlay"
            style={{
              x: useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]),
              y: useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "100%"]),
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
