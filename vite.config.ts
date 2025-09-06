import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, "./certs/localhost+2-key.pem")
      ),
      cert: fs.readFileSync(path.resolve(__dirname, "./certs/localhost+2.pem")),
    },
    port: 5173,
  },
});
