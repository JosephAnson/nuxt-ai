import type { Nuxt } from '@nuxt/schema'
import type { BaseRuleClient } from './clients/base'
import type { ClientType } from './types'
import { join } from 'pathe'
import { searchForWorkspaceRoot } from 'vite'
import { ClaudeRuleClient } from './clients/claude'
import { CursorRuleClient } from './clients/cursor'
import { WindsurfRuleClient } from './clients/windsurf'

/**
 * Create a rule client for a specific AI platform
 */
export function createClientRuleGenerator(nuxt: Nuxt, clientType: ClientType): BaseRuleClient {
  const projectRoot = searchForWorkspaceRoot(nuxt.options.rootDir)

  switch (clientType) {
    case 'claude':
      return new ClaudeRuleClient(projectRoot)
    case 'windsurf':
      return new WindsurfRuleClient(projectRoot)
    case 'cursor':
    default:
      return new CursorRuleClient(join(projectRoot, '.cursor', 'rules'))
  }
}
