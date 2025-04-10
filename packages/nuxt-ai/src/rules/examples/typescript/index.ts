import type { RuleOptions } from '../../types'
import examplesData from '../../../generated/examples.json' assert { type: 'json' }

export function generateTypescriptRules(): RuleOptions {
  const examples = examplesData.typescript ?? { good: [], bad: [] }

  return {
    fileName: 'typescript',
    name: 'Nuxt TypeScript',
    description: 'Follow TypeScript best practices in Nuxt applications',
    globs: '**/*.{ts,vue}',
    context: `Rules for using TypeScript in Nuxt applications.
- Use proper type annotations
- Implement proper interfaces and types
- Use type inference when possible
- Handle type safety in components`,
    requirements: [
      'Use proper type annotations',
      'Define proper interfaces and types',
      'Use type inference when possible',
      'Implement proper type guards',
      'Use proper generics',
      'Handle null and undefined properly',
      'Use proper type assertions',
      'Implement proper error types',
      'Use proper component types',
      'Handle async types properly',
    ],
    goodExamples: examples.good,
    badExamples: examples.bad,
    criticalRules: [
      'NEVER use any type unless absolutely necessary',
      'Use proper type annotations',
      'Define proper interfaces and types',
      'Handle null and undefined properly',
      'Use proper component types',
      'Handle async types properly',
    ],
  }
}
