/// <reference types="vite/client" />
import type { RuleOptions } from '../../types'
import examplesData from '../../../generated/examples.json' assert { type: 'json' }

export function generateClientSideRenderingRules(): RuleOptions {
  const examples = examplesData['csr-examples'] ?? { good: [], bad: [] }

  return {
    fileName: 'nuxt-csr',
    name: 'Nuxt CSR Patterns',
    description: 'Follow client-side rendering best practices in Nuxt',
    globs: '**/*.{vue,ts,js}',
    context: `Rules for implementing CSR in Nuxt applications.
- Handle browser APIs properly
- Implement proper lifecycle hooks
- Clean up resources and event listeners
- Handle async operations correctly`,
    requirements: [
      'Use proper lifecycle hooks for browser APIs',
      'Clean up event listeners and subscriptions',
      'Handle async operations properly',
      'Implement proper error handling',
      'Use proper state management',
      'Handle loading states',
      'Use proper TypeScript types',
      'Implement proper error boundaries',
      'Use proper event handling',
      'Clean up resources properly',
    ],
    goodExamples: examples.good,
    badExamples: examples.bad,
    criticalRules: [
      'ALWAYS clean up event listeners and subscriptions',
      'Use proper lifecycle hooks for browser APIs',
      'Handle async operations properly',
      'Implement proper error handling',
      'Clean up resources properly',
      'Handle all rendering states',
    ],
  }
}
