"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import es from "./translations/es";
import en from "./translations/en";

const STORAGE_KEY = "space-explorer-language";
const DEFAULT_LANGUAGE = "es";
const dictionaries = { es, en };

const LanguageContext = createContext(null);

function getTranslation(dictionary, key) {
  return key.split(".").reduce((value, part) => value?.[part], dictionary);
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    try {
      const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
      if (savedLanguage === "es" || savedLanguage === "en") {
        setLanguageState(savedLanguage);
      }
    } catch {
      // Space Explorer sigue funcionando aunque el navegador bloquee localStorage.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // La preferencia simplemente no se persistirá si localStorage no está disponible.
    }
  }, [language]);

  const setLanguage = (nextLanguage) => {
    if (nextLanguage === "es" || nextLanguage === "en") {
      setLanguageState(nextLanguage);
    }
  };

  const t = (key, fallback = key) => {
    const value = getTranslation(dictionaries[language], key);
    return typeof value === "string" ? value : fallback;
  };

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
