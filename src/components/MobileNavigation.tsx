"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  BarChart3,
  Award,
  Grid2X2,
  Phone,
  Menu,
  X,
  Download,
  Sparkles,
  Clock,
  CloudSun,
  Wind,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: User, label: "About", href: "/about" },
  { icon: BarChart3, label: "Skills", href: "/skills" },
  { icon: Award, label: "Awards", href: "/certificates" },
  { icon: Grid2X2, label: "Projects", href: "/projects" },
  { icon: Phone, label: "Contact", href: "/contact" },
];

// ─────────── Bottom Navigation ───────────
const BottomNavigation = ({
  onMenuOpen,
}: {
  onMenuOpen: () => void;
}) => {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-[90] lg:hidden"
    >
      {/* Glassmorphism background */}
      <div
        className="relative mx-2 mb-2 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(0, 0, 30, 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(6, 182, 212, 0.15)",
          boxShadow:
            "0 -4px 30px rgba(0, 0, 30, 0.8), 0 0 40px rgba(6, 182, 212, 0.08)",
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-[10%] right-[10%] h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), rgba(168, 85, 247, 0.5), transparent)",
          }}
        />

        <div className="flex items-center justify-around px-1 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center justify-center py-1 px-2 group"
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -top-1 w-8 h-1 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #06b6d4, #a855f7)",
                      boxShadow: "0 0 12px rgba(6, 182, 212, 0.6)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Icon container */}
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  className="relative flex items-center justify-center"
                >
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute inset-0 w-9 h-9 -m-1 rounded-xl"
                      style={{
                        background: "rgba(6, 182, 212, 0.12)",
                        boxShadow: "0 0 20px rgba(6, 182, 212, 0.15)",
                      }}
                    />
                  )}
                  <item.icon
                    className={`w-[22px] h-[22px] transition-all duration-300 relative z-10 ${
                      isActive
                        ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                        : "text-gray-500 group-hover:text-gray-300"
                    }`}
                  />
                </motion.div>

                {/* Label */}
                <span
                  className={`text-[10px] mt-1 font-semibold tracking-wide transition-colors duration-300 ${
                    isActive ? "text-cyan-400" : "text-gray-500"
                  }`}
                  style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

// ─────────── Navigation Drawer ───────────
const NavigationDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();
  const { i18n } = useTranslation();

  // Close drawer when path changes
  useEffect(() => {
    onClose();
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const drawerVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    closed: { x: 40, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 z-[95] lg:hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,30,0.5))",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] z-[100] lg:hidden flex flex-col overflow-y-auto"
            style={{
              background: "rgb(0, 0, 30)",
              borderLeft: "1px solid rgba(6, 182, 212, 0.15)",
              boxShadow:
                "-4px 0 40px rgba(0, 0, 30, 0.9), 0 0 60px rgba(6, 182, 212, 0.05)",
              fontFamily: "'Outfit', 'Inter', sans-serif",
            }}
          >
            {/* Decorative glow */}
            <div
              className="absolute top-0 left-0 w-40 h-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
              }}
            />

            {/* Header area */}
            <motion.div variants={itemVariants} className="relative px-6 pt-10 pb-6 flex flex-col items-center text-center">
              {/* Close button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 left-4 p-2 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <X className="w-5 h-5 text-gray-400" />
              </motion.button>

              {/* Logo */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                className="mb-4"
              >
                <img
                  src="/brand-logo.png"
                  alt="JBN Logo"
                  className="w-24 h-24 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                />
              </motion.div>

              {/* Name and subtitle */}
              <h2
                className="text-2xl font-bold text-white tracking-tight mt-1"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Bobur Jovliyev
              </h2>
              <p
                className="text-sm mt-2 text-gray-400"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Har bir detalga mukammal yondashuv
              </p>

              {/* Separator */}
              <div
                className="mt-6 w-full h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.4), rgba(168, 85, 247, 0.3), transparent)",
                }}
              />
            </motion.div>

            {/* Navigation links */}
            <nav className="flex-1 px-4 py-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl mb-1 transition-all duration-300 group relative ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                      style={
                        isActive
                          ? {
                              background: "rgba(6, 182, 212, 0.1)",
                              boxShadow:
                                "inset 0 0 20px rgba(6, 182, 212, 0.05)",
                            }
                          : {}
                      }
                    >
                      {/* Active side indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="drawerActiveIndicator"
                          className="absolute right-0 top-2 bottom-2 w-[3px] rounded-full"
                          style={{
                            background:
                              "linear-gradient(180deg, #06b6d4, #a855f7)",
                            boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      <item.icon
                        className={`w-5 h-5 transition-all duration-300 ${
                          isActive
                            ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                            : "text-gray-500 group-hover:text-cyan-400"
                        }`}
                      />
                      <span
                        className="text-[15px] font-medium tracking-wide"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom section: Download CV, Hire Me, Language */}
            <motion.div variants={itemVariants} className="px-4 pb-8 pt-2 mt-auto">
              {/* Separator */}
              <div
                className="mb-5 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)",
                }}
              />

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                {/* Download CV */}
                <a
                  href="https://t.me/Jovliyev_Bobur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-sm font-semibold text-white transition-all duration-300"
                    style={{
                      background: "transparent",
                      border: "1.5px solid rgba(6, 182, 212, 0.5)",
                      boxShadow: "0 0 15px rgba(6, 182, 212, 0.1)",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Download CV</span>
                  </motion.button>
                </a>

                {/* Hire Me */}
                <a
                  href="https://t.me/Jovliyev_Bobur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-sm font-bold text-white transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, #6366f1, #a855f7, #8b5cf6)",
                      boxShadow: "0 4px 20px rgba(168, 85, 247, 0.3)",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Hire Me</span>
                  </motion.button>
                </a>

                {/* Language/Flag */}
                <div className="flex-shrink-0">
                  <LanguageSelector />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─────────── Mobile Header with Hamburger ───────────
const MobileHeader = ({
  onMenuOpen,
  time,
  weather,
}: {
  onMenuOpen: () => void;
  time: string;
  weather: { temp: number | null; wind: number | null };
}) => {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-[80]">
      {/* Top info bar - clock, weather, wind in ONE row */}
      <div
        className="flex items-center justify-center gap-4 py-1.5 px-4 text-xs"
        style={{
          background: "rgba(0, 0, 30, 0.95)",
          borderBottom: "1px solid rgba(6, 182, 212, 0.12)",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-white font-bold text-sm tracking-wide">
            {time || "00:00:00"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <CloudSun className="w-4 h-4 text-yellow-400" />
          <span className="text-cyan-300 font-bold text-sm">
            {weather.temp !== null ? `${weather.temp}°C` : "--"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wind className="w-4 h-4 text-blue-300" />
          <span className="text-gray-300 font-medium text-sm">
            {weather.wind !== null ? `${weather.wind} km/h` : "--"}
          </span>
        </div>
      </div>

      {/* Main header with name and hamburger */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          background: "rgba(0, 0, 30, 0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(6, 182, 212, 0.1)",
        }}
      >
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/brand-logo.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <h1
            className="text-lg font-bold text-white tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Bobur Jovliyev
          </h1>
        </Link>

        <motion.button
          onClick={onMenuOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Menu className="w-6 h-6 text-gray-300" />
        </motion.button>
      </div>
    </div>
  );
};

// ─────────── Main Export ───────────
export const MobileNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState<{
    temp: number | null;
    wind: number | null;
  }>({ temp: null, wind: null });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("uz-UZ", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`
        );
        const data = await res.json();
        if (data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            wind: data.current.wind_speed_10m,
          });
        }
      } catch (err) {
        console.error("Weather fetch failed", err);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(41.2995, 69.2401)
      );
    } else {
      fetchWeather(41.2995, 69.2401);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <MobileHeader
        onMenuOpen={() => setIsDrawerOpen(true)}
        time={time}
        weather={weather}
      />
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      <BottomNavigation onMenuOpen={() => setIsDrawerOpen(true)} />
    </>
  );
};

export default MobileNavigation;
