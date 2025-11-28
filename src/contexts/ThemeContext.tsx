import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useContext,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const LIGHT_THEME_COLORS = {
  background: "#FAF9F7",
  cardBackground: "#FFFFFF",
  textPrimary: "#1A1A1A",
  textSecondary: "#595959",
  accent: "#7C5DFA",
  accentSoft: "#E9E4FF",
  button: "#7C5DFA",
  buttonText: "#FFFFFF",
  border: "#E5E2DC",
  shadow: "rgba(0, 0, 0, 0.04)",
  gradient: "linear-gradient(135deg, #FFFFFF 0%, #F4F2EF 100%)",
  notification: "#F0F0F0",
  fontFamily: "'Source Serif Pro', serif",
};

const DARK_THEME_COLORS = {
  background: "#0E0D0F",
  cardBackground: "#18171A",
  textPrimary: "#EDEDED",
  textSecondary: "#A8A8A8",
  accent: "#A78BFA",
  accentSoft: "#2F2A45",
  button: "#A78BFA",
  buttonText: "#FFFFFF",
  border: "#2C2B30",
  shadow: "rgba(0, 0, 0, 0.5)",
  gradient: "linear-gradient(135deg, #0E0D0F 0%, #1C1A22 100%)",
  notification: "#25232A",
  fontFamily: "'Source Serif Pro', serif",
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("moon-theme") as Theme | null;
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setTheme(savedTheme);
    } else {
      setTheme("light");
      localStorage.setItem("moon-theme", "light");
    }
  }, []);

  // Apply CSS variables khi theme thay đổi
  useEffect(() => {
    const root = document.documentElement;
    const colors = theme === "light" ? LIGHT_THEME_COLORS : DARK_THEME_COLORS;

    root.style.setProperty("--background-color", colors.background);
    root.style.setProperty("--text-primary-color", colors.textPrimary);
    root.style.setProperty("--text-secondary-color", colors.textSecondary);
    root.style.setProperty("--accent-color", colors.accent);
    root.style.setProperty("--button-color", colors.button);
    root.style.setProperty("--button-text-color", colors.buttonText);
    root.style.setProperty("--font-family", colors.fontFamily);
    root.style.setProperty("--border-color", colors.border);
    root.style.setProperty("--card-background-color", colors.cardBackground);
    root.style.setProperty("--gradient", colors.gradient);
    root.style.setProperty("--shadow", colors.shadow);
    root.style.setProperty("--notification-color", colors.notification);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    localStorage.setItem("moon-theme", theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const Theme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
