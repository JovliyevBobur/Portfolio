import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import { useBg } from "../contexts/BgContext";
import { AnimatedBg } from "./AnimatedBackgrounds";

export default function Layout({ children }: { children: ReactNode }) {
  const { activeBgIndex } = useBg();
  const hasBg = activeBgIndex !== null;

  return (
    <div
      className="min-h-screen text-foreground flex flex-col relative overflow-x-hidden pt-[116px]"
      style={{ backgroundColor: hasBg ? 'transparent' : 'hsl(220,25%,8%)' }}
    >
      {hasBg && <AnimatedBg index={activeBgIndex} />}
      
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow w-full relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
