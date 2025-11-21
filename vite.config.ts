import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Update this base path to match your GitHub repository name
  // For example, if your repo is "arc-raiders-solo-planner", use "/arc-raiders-solo-planner/"
  base: '/arc-raiders/',
})

