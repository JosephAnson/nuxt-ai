/**
 * Nuxt AI Rules System
 *
 * This module provides tools for generating AI assistant rules for different platforms.
 */

import type { McpToolContext, ModuleOptions } from '../types'

import { createRuleGenerator } from './generators'
import { generateAssetsRules } from './generators/assets'
import { generateComponentRules } from './generators/components'
import { generateComposablesRules } from './generators/composables'
import { generateDataFetchingRules } from './generators/data-fetching'
import { generateErrorRules } from './generators/errors'
import { generateLayoutRules } from './generators/layouts'
import { generateMiddlewareRules } from './generators/middleware'
import { generatePagesRules } from './generators/pages'
import { generatePluginRules } from './generators/plugins'
import { generateRenderingRules } from './generators/rendering/index'
import { generateRuntimeRules } from './generators/runtime'
import { generateServerRules } from './generators/server'
import { generateStoreRules } from './generators/stores'
import { generateTestingRules } from './generators/testing'
import { generateTypescriptRules } from './generators/typescript'

export async function generateRules(context: McpToolContext, options: ModuleOptions): Promise<void> {
  // Create the new generator
  const generator = createRuleGenerator(context, options?.client || 'cursor')

  // Initialize rule directories
  await generator.ensureDirectory()

  // Clean up old rules
  await generator.cleanup()

  // Core standards
  await generator.createRule(generateTypescriptRules())

  // Framework rules
  await generator.createRule(generateAssetsRules())
  await generator.createRule(generateComponentRules())
  await generator.createRule(generatePagesRules())
  await generator.createRule(generateComposablesRules())
  await generator.createRule(generateDataFetchingRules())
  await generator.createRule(generatePluginRules())
  await generator.createRule(generateRenderingRules(context.nuxt.options))
  await generator.createRule(generateMiddlewareRules())
  await generator.createRule(generateServerRules())
  await generator.createRule(generateStoreRules())
  await generator.createRule(generateRuntimeRules())
  await generator.createRule(generateLayoutRules())
  await generator.createRule(generateErrorRules())

  // Testing rules
  await generateTestingRules(generator)

  // Finalize the rule generation
  await generator.finalize()
}
