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

export type { Nuxt }

export type Documentation = Record<string, {
  url: string
}>

export interface ModuleOptions {
  /**
   * Module options for AI provider configuration
   * These will be added to your Nuxt runtime config
   *
   * @example
   * ```ts
   * {
   *   openaiApiKey: process.env.OPENAI_API_KEY,
   *   anthropicApiKey: process.env.ANTHROPIC_API_KEY,
   *   // Add any other provider API keys as needed
   * }
   * ```
   */
  apiKeys?: Record<string, string>

  /**
   * Development-only options that are used during development
   */
  devOptions?: {
    /**
     * The client to use for the project
     *
     * @default 'cursor'
     */
    client?: 'cursor' | 'claude'

    /**
     * Whether to enable the MCP server for rules
     */
    rules?: {
      enabled?: boolean
    }

    mcp?: {
      /**
       * Whether to enable the MCP server
       *
       * @default true
       */
      enabled?: boolean

      /**
       * Whether to run mcp server to help with creating documentation
       */
      documentation?: {
        enabled?: boolean
        path?: string
      }

      /**
       * Additional documentation to add to the MCP server
       */
      additionalDocs?: Documentation

      /**
       * Allows you to enable MCP servers from the plugin
       */
      servers?: string[]
    }
  }
}
