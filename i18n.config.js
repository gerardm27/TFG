import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, es, cat } from "./src/i18n";
//empty for now
const resources = {
    en: {
        translation: en,
    },
    es: {
        translation: es,
    },
    cat: {
        translation: cat,
    },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;