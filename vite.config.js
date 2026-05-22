import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detect which platform we're building for
// Set VITE_TARGET=hostinger in Hostinger's build environment variables
// GitHub Pages build uses the default (no env var set)
const isHostinger = process.env.VITE_TARGET === 'hostinger'

export default defineConfig({
  plugins: [react()],
  base: isHostinger ? '/' : '/frost-production-studio/',
})
