"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Instagram, Send, X } from "lucide-react";

export const PersistentPortrait = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactLinks = [
    { icon: Mail, label: "Email", value: "jbobur005@gmail.com", href: "mailto:jbobur005@gmail.com", color: "bg-red-500" },
    { icon: Phone, label: "Telefon", value: "+998 93 005 42 87", href: "tel:+998930054287", color: "bg-green-500" },
    { icon: Send, label: "Telegram", value: "@Jovliyev_Bobur", href: "https://t.me/Jovliyev_Bobur", color: "bg-blue-400" },
    { icon: Github, label: "GitHub", value: "JBoburHacker005", href: "https://github.com/JBoburHacker005", color: "bg-gray-800" },
    { icon: Linkedin, label: "LinkedIn", value: "Bobur005", href: "https://linkedin.com/in/Bobur005", color: "bg-blue-600" },
    { icon: Instagram, label: "Instagram", value: "@j.bobur005", href: "https://instagram.com/j.bobur005", color: "bg-pink-600" },
  ];

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            className="absolute bottom-24 right-0 flex flex-col gap-3"
          >
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${link.color} p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-3 text-white group relative`}
              >
                <link.icon className="w-6 h-6" />
                <span className="absolute right-full mr-4 bg-black/80 px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all duration-500"></div>
        <motion.div
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 cursor-pointer"
        >
          <motion.img
            src="/My Portret.png"
            alt="Bobur"
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-tr-[30px] rounded-bl-[30px] border-2 border-primary/50 shadow-2xl"
            whileHover={{ scale: 1.05 }}
            animate={isOpen ? { rotate: [0, -5, 5, 0] } : {}}
          />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-black rounded-full z-20 flex items-center justify-center">
            {isOpen ? <X className="w-3 h-3 text-white" /> : <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

