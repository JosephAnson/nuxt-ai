export type Documentation = Record<string, {
  url: string
}>

export interface ModuleOptions {
  /**
   * Development-only options that are used during development
   */
  dev?: {
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
       * Additional documentation to add to the MCP server, we use the package 'giget' to download the documentation
       *
       * @example
       */
      additionalDocs?: Documentation

      /**
       * Allows you to enable MCP servers from the plugin
       */
      servers?: string[]
    }
  }
}
