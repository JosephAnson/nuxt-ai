import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['**/node_modules', '**/good-examples/**', '**/bad-examples/**'],
    server: {
      deps: {
        inline: ['vitest-package-exports'],
      },
    },
  },
})
