import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rolldownOptions: {
      output: {
        // Vendor code goes into its own files so no single file passes the 500 kB warning
        // limit, and it stays cached across releases that only change the app code.
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/,
            },
            {
              name: 'datepicker-vendor',
              test: /node_modules[\\/](react-datepicker|date-fns|@floating-ui|clsx)[\\/]/,
            },
          ],
        },
      },
    },
  },
})
