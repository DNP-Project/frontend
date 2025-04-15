import React, { createContext, useContext, useEffect } from "react";
import { themeChangeAnim, ThemeChangeAnimStage } from "./ThemeChangeAnim.tsx";
import useStorage from "./StorageContext.tsx";

const useAnimation = false;

export type Theme = "light" | "dark";

interface IThemeContext {
  theme: Theme;
  animStage: ThemeChangeAnimStage;
  toggleTheme: () => void;
}

const defaultThemeContext: IThemeContext = {
  theme: "light",
  animStage: "none",
  toggleTheme: () => {},
};

const ThemeContext = createContext(defaultThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useStorage();

  const [animStage, setAnimStage] =
    React.useState<ThemeChangeAnimStage>("none");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    if (useAnimation) {
      themeChangeAnim(theme, (stage) => {
        setAnimStage(stage);
        if (stage === "fadeOut") {
          setTheme(newTheme);
        }
      });
    } else {
      setTheme(newTheme);
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      if (!document.body.classList.contains("dark"))
        document.body.classList.add("dark");
    } else {
      if (document.body.classList.contains("dark"))
        document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, animStage }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default function useTheme() {
  return useContext(ThemeContext);
}
