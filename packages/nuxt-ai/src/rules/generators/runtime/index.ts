import type { RuleOptions } from '../../types'
import { readExamples } from '../../utils/readFiles'

export function generateRuntimeRules(): RuleOptions {
  const examples = readExamples(__dirname, {
    extensions: ['.ts'],
  })

  return {
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
    goodExamples: Object.values(examples.good),
    badExamples: Object.values(examples.bad),
    criticalRules: [
      'NEVER expose sensitive data client-side',
      'Use runtimeConfig for environment variables',
      'Keep sensitive data server-side only',
      'Use proper TypeScript types',
      'Implement proper security measures',
      'Validate configuration values',
    ],
  }
}
