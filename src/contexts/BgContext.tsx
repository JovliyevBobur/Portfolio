import React, { createContext, useContext, useState, ReactNode } from "react";
import { bgAnimations } from "../components/AnimatedBackgrounds";

export const bgCount = bgAnimations.length;

interface BgContextType {
  activeBgIndex: number | null;
  setActiveBgIndex: (index: number | null) => void;
}

const BgContext = createContext<BgContextType | undefined>(undefined);

export const BgProvider = ({ children }: { children: ReactNode }) => {
  const [activeBgIndex, setActiveBgIndex] = useState<number | null>(null);

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
