import type { Nitro } from 'nitropack'
import type { Unimport } from 'unimport'
import type { McpToolContext, ModuleOptions } from './types'
import { addImports, addVitePlugin, defineNuxtModule } from '@nuxt/kit'
import { ViteMcp } from 'vite-plugin-mcp'
import { version } from '../package.json'
import { generateRules } from './rules'
import { toolsDocs } from './tools/docs'
import { toolsNuxtDotComInfo } from './tools/nuxt-dot-com'
import { toolsNuxtRuntime } from './tools/runtime'
import { toolsScaffold } from './tools/scaffold'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-ai',
    configKey: 'ai',
  },
  defaults: {
    client: 'cursor',
  },
  async setup(options, nuxt) {
    const unimport = promiseWithResolve<Unimport>()
    const nitro = promiseWithResolve<Nitro>()

    nuxt.hook('imports:context', (_unimport) => {
      unimport.resolve(_unimport as any)
    })
    nuxt.hook('nitro:init', (_nitro) => {
      nitro.resolve(_nitro)
    })

    // Add auto-imports for Vercel AI SDK
    addImports([
      // Core AI SDK composables
      { name: 'useChat', from: '@ai-sdk/vue' },
      { name: 'useCompletion', from: '@ai-sdk/vue' },
      { name: 'useObjectGeneration', from: '@ai-sdk/vue' },

      // Helper utilities
      { name: 'useAssistant', from: '@ai-sdk/vue' },
      { name: 'streamText', from: 'ai' },
      { name: 'streamObject', from: 'ai' },
      { name: 'generateObject', from: 'ai' },
      { name: 'generateText', from: 'ai' },
      { name: 'tool', from: 'ai' },

      // Tool utilities
      { name: 'zodToJsonSchema', from: 'ai' },

      // UI components
      { name: 'Message', from: '@ai-sdk/vue' },
      { name: 'ChatMessages', from: '@ai-sdk/vue' },
      { name: 'Textarea', from: '@ai-sdk/vue' },
    ])

    // Add runtime configuration for API keys if provided
    if (options.keys) {
      nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || {}
      // Make sure ai namespace exists
      if (!nuxt.options.runtimeConfig.ai) {
        nuxt.options.runtimeConfig.ai = {}
      }

      // Copy the keys to the runtime config
      Object.entries(options.keys).forEach(([key, value]) => {
        // @ts-expect-error - we know this is safe
        nuxt.options.runtimeConfig.ai[key] = value
      })
    }

    addVitePlugin(ViteMcp({
      port: nuxt.options.devServer.port,
      updateCursorMcpJson: {
        enabled: options?.client === 'cursor',
        serverName: 'nuxt',
      },
      mcpServerInfo: {
        name: 'nuxt',
        version,
      },
      mcpServerSetup(mcp, vite) {
        const context: McpToolContext = {
          unimport: unimport.promise,
          nitro: nitro.promise,
          nuxt,
          vite,
          mcp,
        }

        generateRules(context, options)

        toolsNuxtRuntime(context)
        toolsNuxtDotComInfo(context)
        toolsScaffold(context)
        toolsDocs(context, options)
      },
    }), { client: true })
  },
})

function promiseWithResolve<T>(): { promise: Promise<T>, resolve: (value: T) => void } {
  let resolve: (value: T) => void = undefined!
  const promise = new Promise<T>((_resolve) => {
    resolve = _resolve
  })
  return { promise, resolve }
}
