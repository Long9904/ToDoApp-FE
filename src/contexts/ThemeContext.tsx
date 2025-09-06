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
  background: "#F7F9FB",
  textPrimary: "#1C1C1C",
  textSecondary: "#6C6C6C",
  accent: "#6C63FF",
  button: "#6C63FF",
  buttonText: "#1C1C1C",
  fontFamily: "'Poppins', sans-serif",
  border: "#696969",
  cardBackground: "#FFFFFF",
  gradient: "linear-gradient(135deg, #F7F9FB 0%, #E9F0FF 50%, #F7F9FB 100%)",
  shadow: "rgba(0, 0, 0, 0.05)",
  notification: "#E0E0E0",
};

const DARK_THEME_COLORS = {
  background: "#121212",
  textPrimary: "#EDEDED",
  textSecondary: "#B3B3B3",
  accent: "#A78BFA",
  button: "#A78BFA",
  buttonText: "#EDEDED",
  fontFamily: "'Poppins', sans-serif",
  border: "#616161",
  cardBackground: "#1E1E1E",
  gradient: "linear-gradient(135deg, #121212 0%, #1F1B2E 50%, #121212 100%)",
  shadow: "rgba(0, 0, 0, 0.4)",
  notification: "#2C2C2C",
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
