import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Render/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react'
          }
          if (
            id.includes('react-markdown') ||
            id.includes('remark-gfm') ||
            id.includes('rehype-highlight') ||
            id.includes('rehype-sanitize') ||
            id.includes('highlight.js')
          ) {
            return 'markdown'
          }
        },
      },
    },
  },
})
