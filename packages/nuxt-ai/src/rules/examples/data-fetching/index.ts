import type { RuleOptions } from '../../types'
import examplesData from '../../../generated/examples.json' assert { type: 'json' }

export function generateDataFetchingRules(): RuleOptions {
  const examples = examplesData['data-fetching'] ?? { good: [], bad: [] }

  return {
    fileName: 'data-fetching',
    name: 'Nuxt Data Fetching',
    description: 'Follow best practices for data fetching in Nuxt applications',
    globs: '**/*.{vue,ts}',
    context: `Rules for implementing data fetching in Nuxt applications.
- Use useFetch, useAsyncData, or $fetch
- Avoid fetch in lifecycle hooks
- Handle loading states
- Implement proper error handling
- Cache responses when appropriate`,
    requirements: [
      'Use useFetch for external API calls',
      'Use useAsyncData for internal server functions',
      'Use $fetch for direct API calls',
      'Handle loading states properly',
      'Implement proper error handling',
      'Cache responses when appropriate using key option',
    ],
    goodExamples: examples.good,
    badExamples: examples.bad,
    criticalRules: [
      'NEVER fetch data inside lifecycle hooks',
      'ALWAYS implement proper error handling',
      'Handle loading states properly',
      'Use appropriate Nuxt data fetching composables',
    ],
  }
}
