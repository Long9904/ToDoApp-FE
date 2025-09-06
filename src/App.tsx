import { RouterProvider } from "react-router-dom";
import browserRouter from "./routes";
import SwitchThemeButton from "./components/common/SwitchThemeButton";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider>
      <SwitchThemeButton />
      <Toaster />
      <RouterProvider router={browserRouter} />
    </ThemeProvider>
  );
}

export default App;
