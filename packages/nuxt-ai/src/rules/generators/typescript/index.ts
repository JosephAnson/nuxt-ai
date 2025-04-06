import type { RuleOptions } from '../../types'
import { readExamples } from '../../utils/readFiles'

export function generateTypescriptRules(): RuleOptions {
  const examples = readExamples(__dirname, {
    extensions: ['.ts', '.vue'],
  })

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
    goodExamples: Object.values(examples.good),
    badExamples: Object.values(examples.bad),
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
