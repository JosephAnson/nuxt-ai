import { defineNuxtConfig } from 'nuxt/config'
import pkg from '../package.json'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'nuxt-llms',
  ],

  app: {
    rootAttrs: {
      // @ts-expect-error - vaul-drawer-wrapper is not typed
      'vaul-drawer-wrapper': '',
      'class': 'bg-(--ui-bg)',
    },
  },

  css: [
    '~/assets/css/main.css',
  ],

  site: {
    url: 'https://nuxt-ai.josephanson.com',
  },

  content: {
    experimental: {
      nativeSqlite: true,
    },
    build: {
      markdown: {
        toc: {
          depth: 4,
          searchDepth: 4,
        },
        highlight: {
          langs: ['docker'],
        },
      },
    },
  },

  mdc: {
    highlight: {
      noApiRoute: false,
    },
  },

  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-07-09',

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },

  hub: {
    database: true,
    cache: true,
  },

  icon: {
    clientBundle: {
      scan: true,
    },
    serverBundle: 'local',
  },

  image: {
    provider: 'ipx',
  },

  llms: {
    domain: 'https://nuxt-ai.josephanson.com',
    title: 'Nuxt AI',
    description: 'Nuxt AI is a Git-based headless CMS for Nuxt',
    notes: [
      'The documentation only includes Nuxt AI v3 docs.',
      'The content is automatically generated from the same source as the official documentation.',
    ],
    full: {
      title: 'Complete Documentation',
      description: 'The complete documentation including all content',
    },
  },

  ogImage: {
    zeroRuntime: true,
  },
})
