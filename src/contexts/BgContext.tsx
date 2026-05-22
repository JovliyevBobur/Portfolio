"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { bgAnimations } from "../components/AnimatedBackgrounds";

export const bgCount = bgAnimations.length;

interface BgContextType {
  activeBgIndex: number;
  setActiveBgIndex: (index: number) => void;
}

const BgContext = createContext<BgContextType | undefined>(undefined);

export const BgProvider = ({ children }: { children: ReactNode }) => {
  const [activeBgIndex, setActiveBgIndexState] = useState<number>(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("activeBgIndex");
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < bgAnimations.length) {
          setActiveBgIndexState(parsed);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Bright backgrounds based on new indices: Abstrakt To'lqin (2), Raqamli Oqim (4), Kosmos Oqimi (7)
    const isBrightBg = activeBgIndex === 2 || activeBgIndex === 4 || activeBgIndex === 7;
    if (isBrightBg) {
      document.documentElement.classList.add("theme-bright-bg");
    } else {
      document.documentElement.classList.remove("theme-bright-bg");
    }
  }, [activeBgIndex]);

  const setActiveBgIndex = (index: number) => {
    setActiveBgIndexState(index);
    try { localStorage.setItem("activeBgIndex", String(index)); } catch {}
  };

  return (
    <BgContext.Provider value={{ activeBgIndex, setActiveBgIndex }}>
      {children}
    </BgContext.Provider>
  );
};

export const useBg = () => {
  const context = useContext(BgContext);
  if (context === undefined) {
    throw new Error("useBg must be used within a BgProvider");
  }
  return context;
};
