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
          className="fixed inset-0 z-0 pointer-events-none mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={bgImages[activeBgIndex]} alt="animated background" className="w-full h-full object-cover" />
        </motion.div>
      )}
      
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow w-full relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
