"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Clock, CloudSun, Calendar, Wind } from "lucide-react";
import { Button } from "./ui/button";
import { LanguageSelector } from "./LanguageSelector";


const Navbar = () => {
  const [time, setTime] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [weather, setWeather] = useState<{ temp: number | null; wind: number | null }>({ temp: null, wind: null });
  const pathname = usePathname();

  useEffect(() => {
    const updateClockAndDate = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("uz-UZ", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setDateStr(now.toLocaleDateString("en-GB", options)); // standard formatted date
    };
    updateClockAndDate();
    const interval = setInterval(updateClockAndDate, 1000);

    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`);
        const data = await res.json();
        if (data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            wind: data.current.wind_speed_10m
          });
        }
      } catch (err) {
        console.error("Failed to fetch weather", err);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(41.2995, 69.2401) // Tashkent fallback
      );
    } else {
      fetchWeather(41.2995, 69.2401);
    }

    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Me", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Certificates", href: "/certificates" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Top Bar (Clock, Date, Weather, Wind) */}
      <div className="bg-[#050505] text-primary w-full py-2 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center text-sm border-b border-primary/20">
        <div className="flex items-center gap-6 font-medium">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="text-white text-base tracking-wide font-bold">{time || "00:00:00"}</span>
          </div>
          <div className="flex items-center gap-2 hidden md:flex text-gray-300">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>{dateStr}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6 font-medium mt-2 sm:mt-0">
          <div className="flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-yellow-400" />
            <span className="text-white text-base font-bold">
              {weather.temp !== null ? `${weather.temp}°C` : "Loading..."}
            </span>
            <span className="text-white/80 hidden lg:inline">Clear/Sunny</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Wind className="w-4 h-4 text-blue-300" />
            <span className="text-sm">
              {weather.wind !== null ? `${weather.wind} km/h` : "--"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-background/80 backdrop-blur-md border-b border-white/5 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-1 bg-black rounded-lg border border-primary/20 transition-all duration-300">
              <img src="/brand-logo.png" alt="JBN Logo" className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white hidden sm:block tracking-tight group-hover:text-cyan-400 transition-colors">
              Jovliyev Bobur Nuriddin o'g'li
            </h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-bold transition-all duration-300 py-2 px-3 rounded-[10px] ${
                    isActive
                      ? "text-white bg-white/10 shadow-[0_4px_10px_-2px_rgba(168,85,247,0.3)] border-b-2 border-purple-500"
                      : "text-muted-foreground border-transparent hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a href="https://t.me/Jovliyev_Bobur" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="hidden md:flex border-primary/30 text-white hover:bg-primary/20 hover:text-white rounded-full px-5 font-semibold text-sm h-10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-500 bg-transparent"
              >
                Download CV
              </Button>
            </a>
            <a href="https://t.me/Jovliyev_Bobur" target="_blank" rel="noopener noreferrer">
              <Button
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full px-6 font-semibold text-sm h-10 border-0 shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]"
              >
                Hire Me
              </Button>
            </a>
            <div className="ml-2 pl-4 border-l border-white/10">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
