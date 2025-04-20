import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import ui from '@nuxt/ui/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    ui({
      colorMode: false,
      prefix: 'U',
      ui: {
        colors: {
          primary: 'orange',
          neutral: 'zinc',
        },
        button: {
          base: 'cursor-pointer',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  preview: {
    allowedHosts: ['nometech-frontend-ps45ou-b4a51f-185-177-219-168.traefik.me'],
  },
})
