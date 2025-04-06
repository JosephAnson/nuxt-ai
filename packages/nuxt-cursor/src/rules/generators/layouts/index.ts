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

export function generateLayoutRules(generator: RuleGenerator): void {
  generator.createRuleFile({
    fileName: 'layouts',
    name: 'Nuxt Layouts',
    description: 'Follow best practices for creating and using layouts in Nuxt applications',
    globs: '**/layouts/**/*.vue',
    context: `Rules for implementing layouts in Nuxt applications.
- Use layouts for shared UI elements across pages
- Implement proper navigation and routing
- Handle authentication and authorization
- Manage layout-specific state and composables`,
    requirements: [
      'Use script setup and Composition API',
      'Implement semantic HTML structure',
      'Use proper navigation components (NuxtLink)',
      'Handle layout-specific state with composables',
      'Implement proper authentication flow',
      'Use CSS Grid/Flexbox for layout structure',
      'Handle responsive design',
      'Manage route transitions',
      'Implement proper error boundaries',
      'Use proper TypeScript types',
    ],
    goodExamples: Object.values(goodExamples),
    badExamples: Object.values(badExamples),
    criticalRules: [
      'ALWAYS use script setup and Composition API',
      'Use proper navigation components',
      'Implement proper authentication flow',
      'Use semantic HTML structure',
      'Handle layout-specific state with composables',
      'Implement proper error handling',
    ],
  })
}
