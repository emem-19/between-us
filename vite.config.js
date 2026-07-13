import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 如果你的 GitHub repo 名稱不是 "between-us"，
// 這裡的 base 要改成 "/你的repo名稱/"（前後都要有斜線）
export default defineConfig({
  plugins: [react()],
  base: "/between-us/",
});
