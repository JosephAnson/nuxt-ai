import type { RuleOptions } from '../../types'
import examplesData from '../../../generated/examples.json' assert { type: 'json' }

export function generateComponentRules(): RuleOptions {
  const examples = examplesData.components ?? { good: [], bad: [] }

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
    goodExamples: examples.good,
    badExamples: examples.bad,
    criticalRules: [
      'ALWAYS use TypeScript interfaces for props/emits',
      'Keep components small and focused',
      'Use proper component structure (script → template → style)',
    ],
  }
}
