import React, { createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { __ } from "../libs/i18n.ts";
import useStorage from "./StorageContext.tsx";

export type Lang = "en" | "ru";

export type LangStr = { [key in Lang]: string };
export type LangStrApi = { [key: string]: string };

export const DEFAULT_LANG: Lang = "en";

export interface Language {
  key: Lang;
  name: string;
  translation: string;
  default?: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const LANGUAGES: { [key in Lang]: Language } = {
  en: { key: "en", name: "English", translation: __("common.lang.en") },
  ru: { key: "ru", name: "Russian", translation: __("common.lang.ru") },
} as const;

interface IAutoTranslationContext {
  _: (key?: string | LangStr | LangStrApi | null, lang?: Lang) => string;
  locale: Lang;
  setLocale: (lang: Lang) => void;
}

const defaultAutoTranslationContext: IAutoTranslationContext = {
  _: (key?: string | LangStr | LangStrApi | null) =>
    typeof key == "string" ? (key ?? "") : "LangStr",
  locale: DEFAULT_LANG,
  setLocale: () => {},
};

const AutoTranslationContext = createContext(defaultAutoTranslationContext);

export function AutoTranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, i18n } = useTranslation();
  const { lang: locale, setLang: setLocale } = useStorage();

  useEffect(() => {
    i18n.changeLanguage(locale).then();
  }, [locale]);

  function _(key?: string | LangStr | LangStrApi | null, lang?: Lang) {
    if (key === null || key === undefined) {
      return "";
    }

    if (typeof key === "string") {
      return t(key || "");
    }

    key = key as LangStr;

    const allLanguages = (Object.keys(key) as Lang[]).filter(
      (l) => !!emptyAsUndefined(key[l]),
    );

    return (
      emptyAsUndefined(key[lang ?? (i18n.language as Lang)]) ??
      emptyAsUndefined(key[DEFAULT_LANG]) ??
      (allLanguages.length > 0 ? key[allLanguages[0]] : "")
    );
  }

  return (
    <AutoTranslationContext.Provider value={{ _, locale, setLocale }}>
      {children}
    </AutoTranslationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default function useT() {
  return useContext(AutoTranslationContext);
}

function emptyAsUndefined(str?: string | null) {
  return !str?.trim() ? undefined : str;
}
