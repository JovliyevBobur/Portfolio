"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import { useBg } from "../contexts/BgContext";
import { AnimatedBg } from "./AnimatedBackgrounds";

export default function Layout({ children }: { children: ReactNode }) {
  const { activeBgIndex } = useBg();

  return (
    <div
      className="min-h-screen text-foreground flex flex-col relative overflow-x-hidden pt-[116px]"
      style={{ backgroundColor: 'transparent' }}
    >
      <AnimatedBg index={activeBgIndex} />
      
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow w-full relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
