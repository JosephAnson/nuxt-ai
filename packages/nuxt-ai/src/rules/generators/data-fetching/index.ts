import type { RuleOptions } from '../../types'
import { readExamples } from '../../utils/readFiles'

export function generateDataFetchingRules(): RuleOptions {
  const examples = readExamples(__dirname, {
    extensions: ['.vue'],
  })

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
    goodExamples: Object.values(examples.good),
    badExamples: Object.values(examples.bad),
    criticalRules: [
      'NEVER fetch data inside lifecycle hooks',
      'ALWAYS implement proper error handling',
      'Handle loading states properly',
      'Use appropriate Nuxt data fetching composables',
    ],
  }
}
