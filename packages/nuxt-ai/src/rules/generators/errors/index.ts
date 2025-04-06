import type { RuleOptions } from '../../types'
import { readExamples } from '../../utils/readFiles'

export function generateErrorRules(): RuleOptions {
  const examples = readExamples(__dirname, {
    extensions: ['.ts', '.vue'],
  })

  return {
    fileName: 'error-handling',
    name: 'Nuxt Error Handling',
    description: 'Follow best practices for error handling and logging in Nuxt applications',
    globs: '**/server/**/*.{ts,js}',
    context: `Rules for handling errors in Nuxt applications.
- Use error.vue for global error handling
- Use createError for server-side errors
- Use try/catch for async operations
- Implement proper error boundaries`,
    requirements: [
      'Implement proper error pages',
      'Use createError for server errors',
      'Handle async errors properly',
      'Implement error boundaries',
      'Use proper error logging',
      'Handle network errors',
      'Implement retry mechanisms',
      'Show user-friendly error messages',
      'Handle validation errors properly',
      'Implement proper error recovery',
    ],
    goodExamples: Object.values(examples.good),
    badExamples: Object.values(examples.bad),
    criticalRules: [
      'ALWAYS implement proper error pages',
      'Use createError for server-side errors',
      'Handle async errors properly',
      'Show user-friendly error messages',
      'Implement proper error logging',
      'Handle all error states in UI',
    ],
  }
}
