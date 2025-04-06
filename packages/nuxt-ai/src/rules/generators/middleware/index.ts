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

export function generateMiddlewareRules(generator: RuleGenerator): void {
  generator.createRuleFile({
    fileName: 'middleware',
    name: 'Nuxt Route Middleware',
    description: 'Follow best practices for route middleware and navigation guards in Nuxt',
    globs: '**/middleware/**/*.{ts,js}',
    context: `Rules for creating route middleware in Nuxt.
- Middleware runs before route changes
- Global middleware runs on every route
- Named middleware can be applied selectively
- Server middleware runs on server only
- Can be used for auth, validation, redirection`,
    requirements: [
      'Use defineNuxtRouteMiddleware for type safety',
      'Handle async operations properly',
      'Implement proper error handling',
      'Use proper navigation guards',
      'Handle authentication/authorization',
      'Validate route parameters',
      'Handle redirects properly',
      'Implement proper loading states',
      'Use proper TypeScript types',
      'Handle server/client state properly',
    ],
    goodExamples: Object.values(goodExamples),
    badExamples: Object.values(badExamples),
    criticalRules: [
      'ALWAYS use defineNuxtRouteMiddleware',
      'Handle async operations properly',
      'Implement proper error handling',
      'Use navigateTo for redirects',
      'Handle server/client state properly',
      'Validate route parameters properly',
    ],
  })
}
