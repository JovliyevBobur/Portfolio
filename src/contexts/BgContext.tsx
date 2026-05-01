import React, { createContext, useContext, useState, ReactNode } from "react";

export const bgImages = [
  "/bg/9043487.jpg",
  "/bg/images.jfif",
  "/bg/Без названия (1).jfif",
  "/bg/Без названия (2).jfif",
  "/bg/Без названия (3).jfif",
  "/bg/Без названия (4).jfif",
  "/bg/Без названия (5).jfif",
  "/bg/Без названия (6).jfif",
  "/bg/Без названия.jfif",
];

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
