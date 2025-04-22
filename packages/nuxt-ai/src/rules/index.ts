/**
 * Nuxt AI Rules System
 *
 * This module provides tools for generating AI assistant rules for different platforms.
 */

import type { Nuxt } from '@nuxt/schema'
import type { ModuleOptions } from '../types'

import { createClientRuleGenerator } from './createClientRuleGenerator'
import { generateAssetsRules } from './examples/assets'
import { generateComponentRules } from './examples/components'
import { generateComposablesRules } from './examples/composables'
import { generateClientSideRenderingRules } from './examples/csr-examples'
import { generateDataFetchingRules } from './examples/data-fetching'
import { generateErrorRules } from './examples/errors'
import { generateHydrationRules } from './examples/hydration-examples'
import { generateLayoutRules } from './examples/layouts'
import { generateMiddlewareRules } from './examples/middleware'
import { generatePagesRules } from './examples/pages'
import { generatePluginRules } from './examples/plugins'
import { generateRuntimeRules } from './examples/runtime'
import { generateServerRules } from './examples/server'
import { generateServerSideRenderingRules } from './examples/ssr-examples'
import { generateStoreRules } from './examples/stores'
import { generateTestingRules } from './examples/testing'
import { generateTypescriptRules } from './examples/typescript'

export async function generateRules(
  nuxt: Nuxt,
  options: ModuleOptions,
): Promise<void> {
  const generator = createClientRuleGenerator(nuxt, options?.dev?.client || 'cursor')

  await generator.ensureDirectory()

  await generator.cleanup()

  // Core standards
  await generator.createRule(generateTypescriptRules())

  // Testing rules
  await generator.createRule(generateTestingRules())

  // Framework rules
  await generator.createRule(generateAssetsRules())
  await generator.createRule(generateComponentRules())
  await generator.createRule(generatePagesRules())
  await generator.createRule(generateComposablesRules())
  await generator.createRule(generateDataFetchingRules())
  await generator.createRule(generatePluginRules())
  await generator.createRule(generateHydrationRules())
  await generator.createRule(generateMiddlewareRules())
  await generator.createRule(generateServerRules())
  await generator.createRule(generateStoreRules())
  await generator.createRule(generateRuntimeRules())
  await generator.createRule(generateLayoutRules())
  await generator.createRule(generateErrorRules())

  // SSR rules
  if (nuxt.options.ssr) {
    await generator.createRule(generateServerSideRenderingRules())
  }
  else {
    await generator.createRule(generateClientSideRenderingRules())
  }

  // Finalize the rule generation
  await generator.finalize()
}
