"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, Language, DictionaryKey } from "./dictionaries";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: DictionaryKey) => any;
  formatCompactNumber: (num: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("id");

  useEffect(() => {
    // Check local storage for saved language preference on mount
    const savedLang = localStorage.getItem("app-language") as Language;
    if (savedLang && (savedLang === "id" || savedLang === "en")) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "id" ? "en" : "id";
    setLanguage(newLang);
    localStorage.setItem("app-language", newLang);
  };

  const t = (key: DictionaryKey) => {
    return dictionaries[language][key] || key;
  };

  const formatCompactNumber = (num: number) => {
    if (num < 1000) return num.toString();
    
    if (language === 'id') {
      if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'mlr';
      if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'jt';
      if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'rb';
    } else {
      if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
      if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
      if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, formatCompactNumber }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
