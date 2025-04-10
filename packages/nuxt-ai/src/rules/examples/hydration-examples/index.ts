/// <reference types="vite/client" />
import type { RuleOptions } from '../../types'
import examplesData from '../../../generated/examples.json' assert { type: 'json' }

export function generateHydrationRules(): RuleOptions {
  const examples = examplesData['hydration-examples'] ?? { good: [], bad: [] }

  return {
    fileName: 'nuxt-hydration',
    name: 'Nuxt Hydration Best Practices',
    description: 'Follow best practices to ensure smooth hydration in Nuxt applications',
    globs: '**/*.vue',
    context: `Hydration is the process of making the server-rendered HTML interactive on the client.
- Mismatches between server and client output can cause issues.
- Ensure consistent state and DOM structure.
- Debug hydration errors using browser devtools.`,
    requirements: [
      'Ensure consistent state between server and client',
      'Avoid direct DOM manipulation before hydration',
      'Use keys for list rendering consistency',
      'Debug hydration mismatch warnings carefully',
      'Use <ClientOnly> sparingly for non-critical UI',
    ],
    goodExamples: examples.good,
    badExamples: examples.bad,
    criticalRules: [
      'Ensure consistent state between server and client',
      'Avoid direct DOM manipulation before hydration',
      'Use keys for list rendering consistency',
      'Debug hydration mismatch warnings carefully',
      'Use <ClientOnly> sparingly for non-critical UI',
    ],
  }
}
