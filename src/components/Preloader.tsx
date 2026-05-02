import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalTime = 20; // update every 20ms
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // Wait a bit at 100% before fading out
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center text-white"
        >
          <div className="flex flex-col items-center w-full max-w-md px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center justify-center gap-4 md:gap-6 mb-16"
            >
              <img 
                src="/brand-logo.png" 
                alt="Logo" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
              />
              <div className="flex flex-col text-left font-heading">
                <span className="text-3xl md:text-5xl font-bold text-white tracking-wide leading-tight">
                  Jovliyev
                </span>
                <span className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wide leading-tight" style={{ filter: 'drop-shadow(0 0 10px rgba(6,182,212,0.4))' }}>
                  Bobur
                </span>
              </div>
            </motion.div>

            <div className="w-full relative flex flex-col items-center px-4 md:px-12">
              <span className="text-xl md:text-2xl font-bold mb-4 tabular-nums tracking-widest text-white drop-shadow-md">
                {progress}%
              </span>
              
              <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                  style={{ width: `${progress}%` }}
                  layout
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
