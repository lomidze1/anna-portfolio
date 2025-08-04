import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import ruTranslation from './locales/ru/translation.json';
import kaTranslation from './locales/ka/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: { translation: enTranslation },
      ru: { translation: ruTranslation },
      ka: { translation: kaTranslation } 
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
