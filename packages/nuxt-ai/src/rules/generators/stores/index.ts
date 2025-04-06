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

export function generateStoreRules(generator: RuleGenerator): void {
  generator.createRuleFile({
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
    goodExamples: Object.values(goodExamples),
    badExamples: Object.values(badExamples),
    criticalRules: [
      'ALWAYS use Pinia for state management',
      'Use proper TypeScript types',
      'Handle async operations properly',
      'Avoid direct state mutations',
      'Implement proper error handling',
      'Handle SSR properly',
    ],
  })
}
