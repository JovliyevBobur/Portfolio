import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import { useBg, bgImages } from "../contexts/BgContext";
import { motion } from "framer-motion";

export default function Layout({ children }: { children: ReactNode }) {
  const { activeBgIndex } = useBg();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-hidden pt-[116px]">
      {activeBgIndex !== null && (
        <motion.div
          key={activeBgIndex}
          className="fixed inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={bgImages[activeBgIndex]} alt="animated background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </motion.div>
      )}
      
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow w-full relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
