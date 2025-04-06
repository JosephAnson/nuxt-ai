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

export function generatePagesRules(generator: RuleGenerator): void {
  generator.createRuleFile({
    fileName: 'pages',
    name: 'Nuxt Pages and Routing',
    description: 'Follow best practices for pages, routing, and navigation in Nuxt',
    globs: '**/pages/**/*.{vue,ts}',
    context: `Rules for creating pages and handling routing in Nuxt.
- Pages are auto-registered from pages/ directory
- Dynamic routes use [param] syntax
- Nested routes follow directory structure
- Index pages render at directory root
- Catch-all routes use [...slug] syntax`,
    requirements: [
      'Use proper file-based routing structure',
      'Implement proper page meta with definePageMeta',
      'Handle dynamic route parameters properly',
      'Use proper navigation guards',
      'Implement proper SEO meta tags',
      'Handle page transitions',
      'Implement proper loading states',
      'Use proper error handling',
      'Handle route validation',
      'Implement middleware when needed',
    ],
    goodExamples: Object.values(goodExamples),
    badExamples: Object.values(badExamples),
    criticalRules: [
      'ALWAYS use file-based routing structure',
      'Implement proper page meta and SEO tags',
      'Handle route parameters safely',
      'Use proper navigation and middleware',
      'Implement proper error handling',
      'Handle loading states properly',
    ],
  })
}
