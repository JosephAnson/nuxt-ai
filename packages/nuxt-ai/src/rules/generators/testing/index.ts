import type { RuleOptions } from '../../types'
import { readExamples } from '../../utils/readFiles'

export function generateTestingRules(): RuleOptions {
  const examples = readExamples(__dirname, {
    extensions: ['.ts'],
  })

  return {
    fileName: 'testing',
    name: 'Nuxt Testing',
    description: 'Follow best practices for testing Nuxt applications using Vitest and Vue Test Utils',
    globs: '**/*.{spec,test}.{ts,js}',
    context: `Rules for implementing tests in Nuxt applications.
- Use Vitest for unit and integration testing
- Use Vue Test Utils for component testing
- Implement proper test organization
- Handle async operations properly`,
    requirements: [
      'Use proper test organization with describe/it blocks',
      'Implement proper component mounting',
      'Use data-test attributes for selectors',
      'Handle async operations properly',
      'Implement proper mocking',
      'Use proper assertions',
      'Clean up after tests',
      'Test component contracts',
      'Handle edge cases',
      'Write meaningful test descriptions',
    ],
    goodExamples: Object.values(examples.good),
    badExamples: Object.values(examples.bad),
    criticalRules: [
      'ALWAYS use proper test organization',
      'Handle async operations properly',
      'Implement proper mocking',
      'Clean up after tests',
      'Use meaningful assertions',
      'Test component contracts',
    ],
  }
}
