import type { RuleOptions } from '../../types'
/// <reference types="vite/client" />
import { readExamples } from '../../utils/readFiles'

export function generateLayoutRules(): RuleOptions {
  const examples = readExamples(__dirname, {
    extensions: ['.vue'],
  })

  return {
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
    goodExamples: Object.values(examples.good),
    badExamples: Object.values(examples.bad),
    criticalRules: [
      'ALWAYS use script setup and Composition API',
      'Use proper navigation components',
      'Implement proper authentication flow',
      'Use semantic HTML structure',
      'Handle layout-specific state with composables',
      'Implement proper error handling',
    ],
  }
}
