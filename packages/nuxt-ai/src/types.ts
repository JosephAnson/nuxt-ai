import type { Nuxt } from '@nuxt/schema'
import type { Nitro } from 'nitropack'
import type { Unimport } from 'unimport'
import type { ViteDevServer } from 'vite'
import type { McpServer } from 'vite-plugin-mcp'

export interface McpToolContext {
  nuxt: Nuxt
  mcp: McpServer
  vite: ViteDevServer
  nitro: Promise<Nitro>
  unimport: Promise<Unimport>
}

export type Documentation = Record<string, {
  url: string
}>

export interface ModuleOptions {
  /**
   * The client to use for the project
   *
   * @default 'cursor'
   */
  client?: 'cursor' | 'claude'

  options?: {
    /**
     * Whether to generate rules for the project
     *
     * @default true
     */
    rules?: boolean

    mcp?: {
      /**
       * Whether to run mcp server to help with creating documentation
       *
       * @default true
       */
      documentation?: {
        enabled: boolean
        path: string
      }
    }
  }

  // Module options (e.g., Vercel AI provider config)
  keys: {
    openaiApiKey: string
  }

  /**
   * Allows you to enable MCP servers from the plugin
   */
  mcpServers: string[] // Enabling tools from the plugin
}
