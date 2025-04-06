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

export function generateDataFetchingRules(generator: RuleGenerator): void {
  generator.createRuleFile({
    fileName: 'data-fetching',
    name: 'Nuxt Data Fetching',
    description: 'Apply Nuxt data fetching patterns in components and pages',
    globs: '**/*.vue',
    context: `Rules for data fetching in Nuxt components and pages.
Note: useFetch is a wrapper around useAsyncData and $fetch, providing a more convenient API.
Payload Limitations: Be aware that response data must be serializable for SSR hydration.`,
    requirements: [
      'Use useFetch/useAsyncData at top level of script setup',
      'Never fetch inside functions or lifecycle hooks',
      'Always destructure and use status property',
      'Handle all data states in templates',
      'Use lazy: true for client-side only fetching',
      'Implement proper error boundaries',
      'Handle payload serialization limitations',
      'Use $fetch for imperative API calls',
      'Implement retry logic for critical requests',
      'Cache responses when appropriate using key option',
    ],
    goodExamples: Object.values(goodExamples),
    badExamples: Object.values(badExamples),
    criticalRules: [
      'NEVER fetch data inside lifecycle hooks',
      'ALWAYS handle all data states in templates',
      'Use useFetch/useAsyncData at top level of script setup',
      'Implement proper error handling and retry logic',
      'Be aware of payload serialization limitations in SSR',
      'Use lazy option for client-side only fetching when appropriate',
    ],
  })
}
