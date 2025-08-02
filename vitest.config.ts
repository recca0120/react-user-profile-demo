import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockServiceWorker.js',
        'src/main.tsx',
        'src/mocks/**',
      ],
      thresholds: {
        lines: 70,
        functions: 60,
        branches: 70,
        statements: 70,
      },
    },
  },
})