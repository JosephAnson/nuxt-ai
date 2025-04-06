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

export function generateTestingRules(generator: RuleGenerator): void {
  generator.createRuleFile({
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
    goodExamples: Object.values(goodExamples),
    badExamples: Object.values(badExamples),
    criticalRules: [
      'ALWAYS use proper test organization',
      'Handle async operations properly',
      'Implement proper mocking',
      'Clean up after tests',
      'Use meaningful assertions',
      'Test component contracts',
    ],
  })
}
