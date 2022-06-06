import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/text_game/',
  plugins: [svelte()],
  build: {
    outDir: './dist'
  }
})
