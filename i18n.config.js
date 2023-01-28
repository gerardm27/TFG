import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, es, ca } from "./src/i18n";
const { languageDetector } = require("./utils/languageDetector.js");

const resources = {
    en: {
        translation: en,
    },
    es: {
        translation: es,
    },
    ca: {
        translation: ca,
    },
};

i18n
.use(initReactI18next)
.use(languageDetector)
.init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;