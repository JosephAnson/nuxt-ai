/// <reference types="vite/client" />
import type { NuxtOptions } from '@nuxt/schema'
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

export function generateRenderingRules(nuxt: NuxtOptions, generator: RuleGenerator): void {
  if (nuxt.ssr) {
    generator.createRuleFile({
      fileName: 'nuxt-ssr',
      name: 'Nuxt SSR Compatibility',
      description: 'Ensure components work correctly in SSR environment',
      globs: '**/*.{vue,ts,js}',
      context: `Rules for implementing SSR in Nuxt applications.
- Components must be isomorphic (server+client compatible)
- Handle environment-specific code properly
- Use proper data fetching patterns
- Handle hydration correctly`,
      requirements: [
        'Make components isomorphic (server+client compatible)',
        'Use import.meta.client/server for environment branching',
        'Never directly access browser APIs without environment checks',
        'Use useAsyncData/useFetch for data fetching',
        'Handle hydration properly',
        'Use ClientOnly for client-only components',
        'Implement proper error boundaries',
        'Use proper lifecycle hooks',
        'Handle loading states',
        'Use proper TypeScript types',
      ],
      goodExamples: Object.values(goodExamples),
      badExamples: Object.values(badExamples),
      criticalRules: [
        'NEVER access browser APIs without environment checks',
        'Use proper data fetching with useAsyncData/useFetch',
        'Handle hydration properly',
        'Use ClientOnly for client-only components',
        'Make components isomorphic',
        'Handle all rendering states',
      ],
    })
  }
  else {
    generator.createRuleFile({
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
      goodExamples: Object.values(goodExamples),
      badExamples: Object.values(badExamples),
      criticalRules: [
        'ALWAYS clean up event listeners and subscriptions',
        'Use proper lifecycle hooks for browser APIs',
        'Handle async operations properly',
        'Implement proper error handling',
        'Clean up resources properly',
        'Handle all rendering states',
      ],
    })
  }
}
