import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['../dist/module.mjs'],
  devtools: { enabled: true },
  compatibilityDate: '2025-03-11',
  debug: false,
})
