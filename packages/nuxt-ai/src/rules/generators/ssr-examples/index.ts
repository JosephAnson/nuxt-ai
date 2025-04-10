/// <reference types="vite/client" />
import type { RuleOptions } from '../../types'
import { readExamples } from '../../utils/readFiles'

export function generateServerSideRenderingRules(): RuleOptions {
  const examples = readExamples(__dirname, {
    extensions: ['.ts', '.vue'],
  })

  return {
    fileName: 'nuxt-ssr',
    name: 'Nuxt SSR Compatibility',
    description: 'Ensure components work correctly in SSR environment',
    globs: '**/*.vue',
    context: `Nuxt renders components on both server and client.
- Code should be isomorphic (runnable in both environments).
- Access window/document only within client-side hooks or checks.
- Be mindful of state hydration.`,
    requirements: [
      'Ensure code is isomorphic (runs on server and client)',
      'Access window/document only in client-side checks/hooks',
      'Use onMounted for client-side only logic',
      'Be mindful of state hydration mismatches',
      'Use <ClientOnly> for components incompatible with SSR',
    ],
    goodExamples: examples.good,
    badExamples: examples.bad,
    criticalRules: [
      'NEVER access browser APIs without environment checks',
      'Use proper data fetching with useAsyncData/useFetch',
      'Handle hydration properly',
      'Use ClientOnly for client-only components',
      'Make components isomorphic',
      'Handle all rendering states',
    ],
  }
}
