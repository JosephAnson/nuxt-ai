/// <reference types="vite/client" />
import type { RuleGenerator } from '../../utils/base'
import { join } from 'pathe'
import { readFiles } from '../../utils/readFiles'

// Read examples from directories
const badExamples = readFiles(join(__dirname, 'bad-examples'), {
  extensions: ['.ts'],
})
const goodExamples = readFiles(join(__dirname, 'good-examples'), {
  extensions: ['.ts'],
})

export function generatePluginRules(generator: RuleGenerator): void {
  generator.createRuleFile({
    fileName: 'plugins',
    name: 'Nuxt Plugins',
    description: 'Follow best practices for creating and using plugins in Nuxt applications',
    globs: '**/plugins/**/*.{ts,js}',
    context: `Rules for implementing plugins in Nuxt applications.
- Use defineNuxtPlugin for type safety
- Implement proper dependency injection
- Handle client/server contexts properly
- Use TypeScript for better maintainability`,
    requirements: [
      'Use defineNuxtPlugin for plugin creation',
      'Implement proper TypeScript types',
      'Use provide/inject pattern for sharing functionality',
      'Handle both client and server contexts',
      'Implement proper error handling',
      'Use runtime config for environment variables',
      'Follow proper naming conventions',
      'Avoid global state mutations',
      'Implement proper cleanup in plugins',
      'Use composables when appropriate',
    ],
    goodExamples: Object.values(goodExamples),
    badExamples: Object.values(badExamples),
    criticalRules: [
      'ALWAYS use defineNuxtPlugin',
      'Use proper TypeScript types',
      'Implement proper error handling',
      'Use provide/inject pattern',
      'Handle SSR properly',
      'Avoid global state mutations',
    ],
  })
}
