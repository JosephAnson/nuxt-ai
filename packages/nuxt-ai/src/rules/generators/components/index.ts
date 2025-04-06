import type { RuleOptions } from '../../types'
import { readExamples } from '../../utils/readFiles'

export function generateComponentRules(): RuleOptions {
  // Read examples from directories
  const examples = readExamples(__dirname, {
    extensions: ['.vue'],
  })

  return {
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
    goodExamples: Object.values(examples.good),
    badExamples: Object.values(examples.bad),
    criticalRules: [
      'ALWAYS use TypeScript interfaces for props/emits',
      'Keep components small and focused',
      'Use proper component structure (script → template → style)',
    ],
  }
}
