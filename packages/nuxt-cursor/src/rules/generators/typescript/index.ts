/// <reference types="vite/client" />
import type { RuleGenerator } from '../../utils/base'
import { join } from 'pathe'
import { readFiles } from '../../utils/readFiles'

// Read examples from directories
const badExamples = readFiles(join(__dirname, 'bad-examples'), {
  extensions: ['.ts', '.vue'],
})
const goodExamples = readFiles(join(__dirname, 'good-examples'), {
  extensions: ['.ts', '.vue'],
})

export function generateTypeScriptRules(generator: RuleGenerator): void {
  generator.createRuleFile({
    fileName: 'typescript',
    name: 'Nuxt TypeScript',
    description: 'Follow TypeScript best practices in Nuxt applications',
    globs: '**/*.{ts,vue}',
    context: `Rules for using TypeScript in Nuxt applications.
- Use proper type annotations
- Implement proper interfaces and types
- Use type inference when possible
- Handle type safety in components`,
    requirements: [
      'Use proper type annotations',
      'Define proper interfaces and types',
      'Use type inference when possible',
      'Implement proper type guards',
      'Use proper generics',
      'Handle null and undefined properly',
      'Use proper type assertions',
      'Implement proper error types',
      'Use proper component types',
      'Handle async types properly',
    ],
    goodExamples: Object.values(goodExamples),
    badExamples: Object.values(badExamples),
    criticalRules: [
      'NEVER use any type unless absolutely necessary',
      'Use proper type annotations',
      'Define proper interfaces and types',
      'Handle null and undefined properly',
      'Use proper component types',
      'Handle async types properly',
    ],
  })
}
