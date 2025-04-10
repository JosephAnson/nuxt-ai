/// <reference types="vite/client" />
import type { RuleOptions } from '../../types'
import examplesData from '../../../generated/examples.json' assert { type: 'json' }

export function generateStoreRules(): RuleOptions {
  const examples = examplesData.stores ?? { good: [], bad: [] }

  return {
    fileName: 'stores',
    name: 'Nuxt Store Management',
    description: 'Follow best practices for state management using Pinia in Nuxt applications',
    globs: '**/stores/**/*.{ts,js}',
    context: `Rules for implementing stores in Nuxt applications.
- Use Pinia for state management
- Implement proper TypeScript types
- Handle async operations properly
- Maintain proper store structure`,
    requirements: [
      'Use Pinia for state management',
      'Implement proper TypeScript types',
      'Use proper store structure (state, getters, actions)',
      'Handle async operations properly',
      'Implement proper error handling',
      'Use proper naming conventions',
      'Avoid direct state mutations',
      'Implement proper store modules',
      'Use composables when appropriate',
      'Handle SSR properly',
    ],
    goodExamples: examples.good,
    badExamples: examples.bad,
    criticalRules: [
      'ALWAYS use Pinia for state management',
      'Use proper TypeScript types',
      'Handle async operations properly',
      'Avoid direct state mutations',
      'Implement proper error handling',
      'Handle SSR properly',
    ],
  }
}
