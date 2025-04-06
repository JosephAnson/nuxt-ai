import type { McpToolContext } from '../types'
import { join } from 'pathe'
import { searchForWorkspaceRoot } from 'vite'

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
import { generateTypeScriptRules } from './generators/typescript'
import { RuleGenerator } from './utils/base'

export function generateRules(context: McpToolContext): void {
  const projectRoot = searchForWorkspaceRoot(context.nuxt.options.rootDir)
  const rulesDir = join(projectRoot, '.cursor/rules')

  const generator = new RuleGenerator(rulesDir)

  generator.cleanupOldRules()

  // Core standards
  generateTypeScriptRules(generator)

  // Framework rules
  generateAssetsRules(generator)
  generateComponentRules(generator)
  generatePagesRules(generator)
  generateComposablesRules(generator)
  generateDataFetchingRules(generator)
  generatePluginRules(generator)
  generateRenderingRules(context.nuxt.options, generator)
  generateMiddlewareRules(generator)
  generateServerRules(generator)
  generateStoreRules(generator)
  generateRuntimeRules(generator)
  generateLayoutRules(generator)
  generateErrorRules(generator)

  // Testing rules
  generateTestingRules(generator)
}
