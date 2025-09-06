import { Theme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const SwitchThemeButton = () => {
  const { theme, toggleTheme } = Theme();

  const handleToggle = () => {
    toggleTheme();
  };
  return (
    <button
      onClick={handleToggle}
      className={
        "absolute z-10 top-4 right-4 inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-[var(--accent-color)] border border-[var(--border-color)]"
      }
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      style={{
        background: "var(--button-color)",
        color: "var(--button-text-color)",
      }}
    >
      <span
        className={`h-6 w-6 transform rounded-full transition-transform duration-300 ease-in-out flex items-center justify-center shadow-md
  ${
    theme === "dark"
      ? "translate-x-9 bg-slate-900 text-yellow-400"
      : "translate-x-1 bg-white text-slate-600"
  }
`}
      >
        {theme === "dark" ? (
          <Moon className="h-3 w-3" />
        ) : (
          <Sun className="h-3 w-3" />
        )}
      </span>
    </button>
  );
};

export default SwitchThemeButton;
