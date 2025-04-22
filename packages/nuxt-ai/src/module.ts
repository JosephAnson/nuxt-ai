import type { ModuleOptions } from '@nuxt/schema'
import type { McpServer } from 'vite-plugin-mcp'
import { addImports, defineNuxtModule, installModule } from '@nuxt/kit'
import { generateRules } from './rules'
import { toolsDocs } from './tools/docs'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-ai',
    configKey: 'ai',
  },
  defaults: {
    dev: {
      client: 'cursor',
      rules: {
        enabled: true,
      },
      mcp: {
        enabled: true,
      },
    },
  },
  async setup(options, nuxt) {
    await installModule('nuxt-mcp', {
      exposeConfig: true,
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

    if (options.dev?.rules?.enabled) {
      generateRules(nuxt, options)
    }

    if (options.dev?.mcp?.enabled) {
      nuxt.hook('mcp:setup' as any, ({ mcp }: { mcp: McpServer }) => {
        toolsDocs({ mcp }, options)
      })
    }
  },
})
