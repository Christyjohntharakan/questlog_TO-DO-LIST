import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Dev server runs on port 3000 so it matches the backend's CORS origin.
export default defineConfig({
  plugins: [react()],
  server: { port: 3000, strictPort: true },
})
