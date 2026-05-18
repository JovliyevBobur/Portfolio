"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "uz", flag: "https://img.icons8.com/color/48/uzbekistan-circular.png" },
    { code: "en", flag: "https://img.icons8.com/color/48/great-britain-circular.png" },
    { code: "ru", flag: "https://img.icons8.com/color/48/russian-federation-circular.png" },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const toggleLanguage = () => {
    const currentIndex = languages.findIndex(l => l.code === i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    i18n.changeLanguage(languages[nextIndex].code);
  };

  return (
    <div className="flex items-center">
      <motion.button
        onClick={toggleLanguage}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-full overflow-hidden border border-primary/30 shadow-lg shadow-primary/10 flex items-center justify-center bg-black/20"
      >
        <img src={currentLang.flag} alt={currentLang.code} className="w-full h-full object-cover" />
      </motion.button>
    </div>
  );
};


