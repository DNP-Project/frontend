import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        ns: ['translation', 'errors.common'],
        defaultNS: 'translation',
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

/**
 * Marker function for auto generation of translation keys
 * @param key - translation key
 */
export function __(key: string): string {
    return key;
}