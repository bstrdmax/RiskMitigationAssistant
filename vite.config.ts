import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // These modules are provided by the import map in index.html and should not be bundled.
      external: ['react', 'react-dom/client', 'react/jsx-runtime'],
    },
  },
})
