import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // base is '/' locally (npm run dev) and the repo path when building for GitHub Pages
  base: command === 'build' ? '/frost-production-studio/' : '/',
}))
