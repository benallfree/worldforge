import { svelte } from '@sveltejs/vite-plugin-svelte'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, PluginOption } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  plugins: [
    svelte(),
    visualizer({
      // template: 'sunburst',
      template: 'treemap',
      // template: 'network'
      // open: true,
      // gzipSize: true,
      // brotliSize: true,
      filename: 'analyse.html' // will be saved in project's root
    }) as PluginOption
  ]
})
