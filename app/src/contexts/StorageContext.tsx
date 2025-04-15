import React, { createContext, useContext, useMemo, useState } from "react";
import { Theme } from "./ThemeContext.tsx";
import { Lang } from "./AutoTranslationContext.tsx";

export interface IStorage {
  get: (key: string) => string | null;
  set: (key: string, value: string) => void;
  remove: (key: string) => void;
}

class LocalStorage implements IStorage {
  get(key: string) {
    return localStorage.getItem(key);
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}

interface IStorageContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const defaultStorageContext: IStorageContext = {
  theme: "light",
  setTheme: () => {},
  lang: "en",
  setLang: () => {},
};

const StorageContext = createContext(defaultStorageContext);

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const storage: IStorage = useMemo(() => new LocalStorage(), []);

  const [theme, _setTheme] = useState<Theme>(
    (storage.get("theme") as Theme) ?? "light",
  );
  const setTheme = (theme: Theme) => {
    storage.set("theme", theme);
    _setTheme(theme);
  };

  const [lang, _setLang] = useState<Lang>(
    (storage.get("lang") as Lang) ?? "en",
  );

  const setLang = (lang: Lang) => {
    storage.set("lang", lang);
    _setLang(lang);
  };

  return (
    <StorageContext.Provider
      value={{
        theme,
        setTheme,
        lang,
        setLang,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default function useStorage() {
  return useContext(StorageContext);
}
