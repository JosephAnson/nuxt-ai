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

export function generateRuntimeRules(generator: RuleGenerator): void {
  generator.createRuleFile({
    fileName: 'runtime',
    name: 'Nuxt Runtime Configuration',
    description: 'Follow best practices for runtime configuration in Nuxt applications',
    globs: '**/*.{ts,js}',
    context: `Rules for implementing runtime configuration in Nuxt applications.
- Use runtimeConfig for environment variables
- Separate public and private keys
- Handle server-side configuration properly
- Implement proper type safety`,
    requirements: [
      'Use runtimeConfig for environment variables',
      'Keep sensitive data server-side only',
      'Use proper TypeScript types',
      'Implement proper error handling',
      'Use environment variables for configuration',
      'Handle both development and production environments',
      'Implement proper security measures',
      'Use proper naming conventions',
      'Document configuration options',
      'Validate configuration values',
    ],
    goodExamples: Object.values(goodExamples),
    badExamples: Object.values(badExamples),
    criticalRules: [
      'NEVER expose sensitive data client-side',
      'Use runtimeConfig for environment variables',
      'Keep sensitive data server-side only',
      'Use proper TypeScript types',
      'Implement proper security measures',
      'Validate configuration values',
    ],
  })
}
