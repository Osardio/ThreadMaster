import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT !== undefined ? Number(process.env.PORT) : 7001
  },
  plugins: [vue()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, './src') },
      { find: "#", replacement: resolve(__dirname, '../../../types') }
    ]
  },
  build: {
    target: "esnext"
  }
})
