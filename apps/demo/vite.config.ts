import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env['PORT'] ? parseInt(process.env['PORT']) : 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@dock/buttons': resolve(__dirname, '../../packages/core/src/index.ts'),
      '@dock/shadcn': resolve(__dirname, '../../packages/shadcn/src'),
      '@/lib/utils': resolve(__dirname, './src/lib/utils.ts'),
    },
  },
})
