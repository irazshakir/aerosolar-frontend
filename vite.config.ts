import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    ...(mode === 'analyze'
      ? [visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true })]
      : []),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    // Ant Design is isolated in its own long-lived chunk, so its size is expected.
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const moduleId = id.replace(/\\/g, '/')
          if (!moduleId.includes('node_modules')) {
            return undefined
          }
          if (moduleId.includes('node_modules/antd') || moduleId.includes('node_modules/@ant-design')) {
            return 'antd'
          }
          if (moduleId.includes('node_modules/@tanstack')) {
            return 'query'
          }
          if (moduleId.includes('node_modules/zustand')) {
            return 'state'
          }
          if (moduleId.includes('node_modules/axios')) {
            return 'http'
          }
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(moduleId)) {
            return 'react'
          }
          return undefined
        },
      },
    },
  },
}))
