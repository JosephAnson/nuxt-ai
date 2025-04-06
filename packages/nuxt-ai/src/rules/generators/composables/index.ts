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

export function generateComposablesRules(generator: RuleGenerator): void {
  generator.createRuleFile({
    fileName: 'composables',
    name: 'Nuxt Composables Best Practices',
    description: 'Follow best practices for creating and using composables in Nuxt',
    globs: '**/composables/**/*.{ts,js}',
    context: 'Rules for creating and using composables in Nuxt applications. Composables are auto-imported from the composables/ directory.',
    requirements: [
      'Name composables with "use" prefix (e.g., useCounter)',
      'Return reactive values using ref/reactive',
      'Handle SSR compatibility in composables',
      'Implement proper cleanup in onUnmounted when needed',
      'Use TypeScript for better type inference',
      'Document composable parameters and return values',
      'Handle error states within composables',
      'Use useState for shared state management',
      'Implement proper disposal of resources',
      'Consider using async composables with useAsyncData',
    ],
    goodExamples: Object.values(goodExamples),
    badExamples: Object.values(badExamples),
    criticalRules: [
      'ALWAYS use "use" prefix for composable names',
      'Use useState for SSR-compatible shared state',
      'Implement proper cleanup in onUnmounted',
      'Handle SSR compatibility (no direct window/document access)',
      'Return readonly refs when state should be immutable',
      'Document composable parameters and return types',
    ],
  })
}
