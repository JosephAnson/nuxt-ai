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
    devOptions: {
      client: 'cursor',
      rules: {
        enabled: true,
      },
      mcp: {
        enabled: true,
        documentation: {
          enabled: true,
          path: '/docs',
        },
      },
    },
  },
  async setup(options, nuxt) {
    const unimport = promiseWithResolve<Unimport>()
    const nitro = promiseWithResolve<Nitro>()

    nuxt.hook('imports:context', (_unimport) => {
      unimport.resolve(_unimport)
    })
    nuxt.hook('nitro:init', (_nitro) => {
      nitro.resolve(_nitro)
    })

    addImports([
      // Core AI SDK composables
      { name: 'useChat', from: '@ai-sdk/vue' },
      { name: 'useCompletion', from: '@ai-sdk/vue' },
      { name: 'useObjectGeneration', from: '@ai-sdk/vue' },
      { name: 'useAssistant', from: '@ai-sdk/vue' },

      // UI components
      { name: 'Message', from: '@ai-sdk/vue' },
      { name: 'ChatMessages', from: '@ai-sdk/vue' },
      { name: 'Textarea', from: '@ai-sdk/vue' },

      // Helper utilities
      { name: 'streamText', from: 'ai' },
      { name: 'streamObject', from: 'ai' },
      { name: 'generateObject', from: 'ai' },
      { name: 'generateText', from: 'ai' },
      { name: 'tool', from: 'ai' },

      // Tool utilities
      { name: 'zodToJsonSchema', from: 'ai' },

    ])

    if (options.apiKeys) {
      nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || {}
      if (!nuxt.options.runtimeConfig.ai) {
        nuxt.options.runtimeConfig.ai = {}
      }

      Object.entries(options.apiKeys).forEach(([key, value]) => {
        // @ts-expect-error - we know this is safe
        nuxt.options.runtimeConfig.ai[key] = value
      })
    }

    if (options.devOptions?.rules?.enabled) {
      generateRules(nuxt, options)
    }

    if (options.devOptions?.mcp?.enabled) {
      addVitePlugin(ViteMcp({
        port: nuxt.options.devServer.port,
        updateCursorMcpJson: {
          enabled: options?.devOptions?.client === 'cursor',
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

          toolsDocs(context, options)
          toolsNuxtRuntime(context)
          toolsNuxtDotComInfo(context)
          toolsScaffold(context)
        },
      }), { client: true })
    }
  },
})

function promiseWithResolve<T>(): { promise: Promise<T>, resolve: (value: T) => void } {
  let resolve: (value: T) => void = undefined!
  const promise = new Promise<T>((_resolve) => {
    resolve = _resolve
  })
  return { promise, resolve }
}
