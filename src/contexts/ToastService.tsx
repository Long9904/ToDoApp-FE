// ToastService.tsx
import { toast } from "sonner";
import { Theme } from "./ThemeContext";

export function useThemedToast() {
  const { theme } = Theme();

  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    const baseStyle = {
      className: `border px-4 py-2 rounded-lg font-medium shadow-md`,
      style: {
        background:
          theme === "light"
            ? "var(--card-background-color)"
            : "var(--notification-color)",
        color:
          theme === "light"
            ? "var(--text-primary-color)"
            : "var(--text-primary-color)",
      },
    };

    switch (type) {
      case "success":
        toast.success(message, { ...baseStyle, duration: 2000 }); // 2s
        break;
      case "error":
        toast.error(message, { ...baseStyle, duration: 3000 }); // 3s
        break;
      case "warning":
        toast.warning(message, { ...baseStyle, duration: 3000 }); // 3s
        break;
      default:
        toast(message, { ...baseStyle, duration: 2000 }); // 2s
    }
  };

  return { showToast };
}
