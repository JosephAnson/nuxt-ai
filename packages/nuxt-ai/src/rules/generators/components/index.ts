/// <reference types="vite/client" />
import type { RuleGenerator } from '../../utils/base'
import { join } from 'pathe'
import { readFiles } from '../../utils/readFiles'

// Read examples from directories
const badExamples = readFiles(join(__dirname, 'bad-examples'), {
  extensions: ['.vue'],
})
const goodExamples = readFiles(join(__dirname, 'good-examples'), {
  extensions: ['.vue'],
})

export function generateComponentRules(generator: RuleGenerator): void {
  generator.createRuleFile({
    fileName: 'vue-components',
    name: 'Vue Component Best Practices',
    description: 'Follow Vue component best practices in Nuxt application',
    globs: '**/components/**/*.vue',
    context: 'Rules for Vue components in a Nuxt application.',
    requirements: [
      'Create small, focused components',
      'Use defineModel for two-way binding',
      'Use props for data down, emits for events up',
      'Use composables for shared state/logic',
      'Structure: script → template → style',
      'Use TypeScript interfaces for props/emits',
      'Define complex types in /types directory',
      'Mark optional props with ? symbol',
    ],
    goodExamples: Object.values(goodExamples),
    badExamples: Object.values(badExamples),
    criticalRules: [
      'ALWAYS use TypeScript interfaces for props/emits',
      'Keep components small and focused',
      'Use proper component structure (script → template → style)',
    ],
  })
}
