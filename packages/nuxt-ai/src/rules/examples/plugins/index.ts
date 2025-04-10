import type { RuleOptions } from '../../types'
import examplesData from '../../../generated/examples.json' assert { type: 'json' }

export function generatePluginRules(): RuleOptions {
  const examples = examplesData.plugins ?? { good: [], bad: [] }

  return {
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
    goodExamples: examples.good,
    badExamples: examples.bad,
    criticalRules: [
      'ALWAYS use defineNuxtPlugin',
      'Use proper TypeScript types',
      'Implement proper error handling',
      'Use provide/inject pattern',
      'Handle SSR properly',
      'Avoid global state mutations',
    ],
  }
}
