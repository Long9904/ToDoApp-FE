import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    ...(isDev &&
    fs.existsSync(path.resolve(__dirname, "./certs/localhost+2-key.pem"))
      ? {
          https: {
            key: fs.readFileSync(
              path.resolve(__dirname, "./certs/localhost+2-key.pem")
            ),
            cert: fs.readFileSync(
              path.resolve(__dirname, "./certs/localhost+2.pem")
            ),
          },
        }
      : {}),
  },
});
