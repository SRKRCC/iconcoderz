import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  base: '/',

  build: {
    outDir: 'build',

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/src/admin/')) {
            return 'admin'
          }

          if (id.includes('node_modules/katex')) {
            return 'katex'
          }

          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/@react-three')
          ) {
            return 'three'
          }

          if (id.includes('node_modules/framer-motion')) {
            return 'animation'
          }

          if (
            id.includes('node_modules/@tanstack') ||
            id.includes('node_modules/zustand')
          ) {
            return 'state'
          }

        },
      },
    },
  },
})
