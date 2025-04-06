import type { McpToolContext } from '../../types'
import type { BaseRuleClient } from '../clients/base'
import type { ClientType } from '../types'
import { join } from 'pathe'
import { searchForWorkspaceRoot } from 'vite'
import { ClaudeRuleClient } from '../clients/claude'
import { CursorRuleClient } from '../clients/cursor'

/**
 * Create a rule client for a specific AI platform
 */
export function createRuleGenerator(context: McpToolContext, clientType: ClientType): BaseRuleClient {
  const projectRoot = searchForWorkspaceRoot(context.nuxt.options.rootDir)

  switch (clientType) {
    case 'claude':
      return new ClaudeRuleClient(projectRoot)
    case 'cursor':
    default:
      return new CursorRuleClient(join(projectRoot, '.cursor', 'rules'))
  }
}
