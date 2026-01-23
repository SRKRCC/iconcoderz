import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router-dom/')) {
            return 'react-vendor';
          }
          
          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'react-query';
          }
          
          if (id.includes('node_modules/framer-motion')) {
            return 'animation';
          }
          
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          
          if (id.includes('/src/admin/')) {
            return 'admin';
          }
        },
      },
    },
  },
})
