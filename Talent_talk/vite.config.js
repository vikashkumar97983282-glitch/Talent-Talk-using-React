import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }

          if (id.includes('ag-charts-community') || id.includes('ag-charts-react')) {
            return 'charts'
          }

          if (id.includes('lucide-react') || id.includes('react-icons')) {
            return 'icons'
          }

          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor'
          }
        },
      },
    },
  },
})
