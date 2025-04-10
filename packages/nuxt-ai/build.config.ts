import { execSync } from 'node:child_process'
import { createConsola } from 'consola'
import { defineBuildConfig } from 'unbuild'

const consola = createConsola()

export default defineBuildConfig({
  entries: [
    'src/module',
  ],
  hooks: {
    'build:before': (ctx) => {
      consola.info('[nuxt-ai] Running bundle-examples script...')
      try {
        execSync('node ./scripts/bundle-examples.js', {
          stdio: 'inherit',
          cwd: ctx.options.rootDir,
        })
        consola.success('[nuxt-ai] bundle-examples script finished successfully.')
      }
      catch (error) {
        consola.error('[nuxt-ai] bundle-examples script failed:', error)
      }
    },
  },
  externals: [
    'vite',
  ],
})
