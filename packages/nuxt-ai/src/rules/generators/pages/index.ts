import type { RuleOptions } from '../../types'
import { readExamples } from '../../utils/readFiles'

export function generatePagesRules(): RuleOptions {
  const examples = readExamples(__dirname, {
    extensions: ['.vue'],
  })

  return {
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
    goodExamples: Object.values(examples.good),
    badExamples: Object.values(examples.bad),
    criticalRules: [
      'ALWAYS use file-based routing structure',
      'Implement proper page meta and SEO tags',
      'Handle route parameters safely',
      'Use proper navigation and middleware',
      'Implement proper error handling',
      'Handle loading states properly',
    ],
  }
}
