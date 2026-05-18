"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationUZ from './locales/uz/translation.json';
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

const resources = {
  uz: { translation: translationUZ },
  en: { translation: translationEN },
  ru: { translation: translationRU }
};

const i18nInstance = i18n;

if (typeof window !== 'undefined') {
  i18nInstance.use(LanguageDetector);
}

i18nInstance
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
