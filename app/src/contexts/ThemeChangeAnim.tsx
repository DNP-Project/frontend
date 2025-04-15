import { cn } from "@/lib/utils.ts";
import useTheme from "./ThemeContext.tsx";

export type ThemeChangeAnimStage = "fadeIn" | "fadeOut" | "none";

// eslint-disable-next-line react-refresh/only-export-components
export function themeChangeAnim(
  theme: "light" | "dark",
  setAnimStage: (stage: ThemeChangeAnimStage) => void,
) {
  const speed = 50;
  const fullSize = Math.max(window.outerHeight * 2, window.outerWidth * 2);
  const toggleBtn = (document.getElementById("toggle-btn") as HTMLDivElement)!;
  const themeCircle = (document.getElementById(
    "theme-circle",
  ) as HTMLDivElement)!;
  const { top, left, width, height } = toggleBtn.getBoundingClientRect();
  let cur = 0;
  let curAfter = 0;
  setAnimStage("fadeIn");
  themeCircle.style.setProperty(
    "--after-color",
    theme === "dark" ? "#F4F4F4" : "#1E1E1E",
  );
  const interval = setInterval(() => {
    if (curAfter >= fullSize) {
      setAnimStage("none");
      themeCircle.style.setProperty("--after-width", "0px");
      themeCircle.style.setProperty("--after-height", "0px");
      themeCircle.style.height = "0px";
      themeCircle.style.width = "0px";
      themeCircle.style.top = `${top + height / 2}px`;
      themeCircle.style.left = `${left + width / 2}px`;
      clearInterval(interval);
      return;
    }
    if (cur >= fullSize) {
      setAnimStage("fadeOut");
      curAfter += speed - 5;
      themeCircle.style.setProperty("--after-width", `${curAfter}px`);
      themeCircle.style.setProperty("--after-height", `${curAfter}px`);
      return;
    }
    cur += speed;
    themeCircle.style.height = `${cur}px`;
    themeCircle.style.width = `${cur}px`;
    themeCircle.style.top = `${top + height / 2 - cur / 2}px`;
    themeCircle.style.left = `${left + width / 2 - cur / 2}px`;
  }, 1);
}

export function ThemeChangeAnimElements(props: {
  animStage: ThemeChangeAnimStage;
}) {
  const { theme } = useTheme();

  return (
    <div
      aria-disabled={props.animStage === "none"}
      className="absolute left-0 top-0 z-50 h-dvh w-screen overflow-hidden aria-disabled:hidden"
    >
      <div
        id="theme-circle"
        aria-disabled={props.animStage === "fadeIn"}
        className={cn(
          "absolute float-left flex items-center justify-center rounded-full transition-all duration-0 aria-disabled:after:hidden",
          theme === "dark" ? "light" : "dark",
          props.animStage === "fadeOut" ? "" : "bg-#background-primary",
        )}
      />
    </div>
  );
}
