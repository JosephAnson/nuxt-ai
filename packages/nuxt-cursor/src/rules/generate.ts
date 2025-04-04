import type { McpToolContext } from '../types'
import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { join } from 'pathe'
import { searchForWorkspaceRoot } from 'vite'

export function generateNuxtRules({ nuxt }: McpToolContext): void {
  // Use Vite's searchForWorkspaceRoot to find the project root
  // This works even in monorepo setups
  const projectRoot = searchForWorkspaceRoot(nuxt.options.rootDir)
  const rulesDir = join(projectRoot, '.cursor/rules')

  if (!existsSync(rulesDir)) {
    mkdirSync(rulesDir, { recursive: true })
  }

  // Clean up old rule files
  function cleanupOldRules(): void {
    if (existsSync(rulesDir)) {
      const files = readdirSync(rulesDir)
      for (const file of files) {
        if (file.endsWith('.nuxt-cursor.mdc')) {
          unlinkSync(join(rulesDir, file))
        }
      }
    }
  }

  // Clean up old rules before generating new ones
  cleanupOldRules()

  async function generateRuleFile(prefix: string, name: string, content: string): Promise<void> {
    const filePath = join(rulesDir, `${prefix}-${name}.nuxt-cursor.mdc`)
    await writeFile(filePath, content)
  }

  // Factory function to create rule files with consistent format
  function createRuleFile(options: {
    prefix: string
    fileName: string
    name: string
    description: string
    globs: string
    context: string
    requirements: string[]
    goodExamples: string[]
    badExamples?: string[]
    criticalRules?: string[]
    alwaysApply?: boolean
  }): void {
    const {
      prefix,
      fileName,
      name,
      description,
      globs,
      context,
      requirements,
      goodExamples,
      badExamples = [],
      criticalRules = [],
      alwaysApply = false,
    } = options

    let content = `---
description: ${description}
globs: ${globs}
alwaysApply: ${alwaysApply}
---

# ${name}

## Context
${context}

## Requirements
${requirements.map(req => `- ${req}`).join('\n')}

## Examples
`

    // Add good examples
    if (goodExamples.length > 0) {
      goodExamples.forEach((example) => {
        content += `<example>\n${example}\n</example>\n\n`
      })
    }

    // Add bad examples
    if (badExamples.length > 0) {
      badExamples.forEach((example) => {
        content += `<example type="invalid">\n${example}\n</example>\n\n`
      })
    }

    // Add critical rules if provided
    if (criticalRules.length > 0) {
      content += `## Critical Rules\n`
      criticalRules.forEach((rule) => {
        content += `- ${rule}\n`
      })
    }

    generateRuleFile(prefix, fileName, content)
  }

  // Generate project structure rule
  createRuleFile({
    prefix: '200',
    fileName: 'nuxt-structure',
    name: 'Nuxt Project Structure',
    description: 'Follow Nuxt project structure conventions when organizing files',
    globs: 'src/**/*.{vue,js,ts}',
    context: `Project structure:
- Root: ${nuxt.options.rootDir}
- App: ${nuxt.options.appDir}
- Source: ${nuxt.options.srcDir}
- Server: ${nuxt.options.serverDir}`,
    requirements: [
      'Place components in components/ directory',
      'Place pages in pages/ directory',
      'Place layouts in layouts/ directory',
      'Place composables in composables/ directory',
      'Place server endpoints in server/api/ directory',
      'Place middleware in middleware/ directory',
      'Place plugins in plugins/ directory',
    ],
    goodExamples: [
      `// File: components/UserCard.vue
<script setup>
const props = defineProps(['user'])
</script>

<template>
  <div class="user-card">
    <h3>{{ user.name }}</h3>
  </div>
</template>`,
    ],
    badExamples: [
      `// File: src/UserCard.vue (wrong location)
<script setup>
const props = defineProps(['user'])
</script>

<template>
  <div class="user-card">
    <h3>{{ user.name }}</h3>
  </div>
</template>`,
    ],
    criticalRules: [
      'ALWAYS place files in their designated directories',
      'NEVER mix file types across directories',
      'Follow Nuxt directory structure conventions',
    ],
    alwaysApply: true,
  })

  // Generate TypeScript rules if TypeScript is enabled
  if (nuxt.options.typescript?.strict) {
    createRuleFile({
      prefix: '100',
      fileName: 'typescript',
      name: 'TypeScript Best Practices',
      description: 'Apply TypeScript best practices in Nuxt components and utilities',
      globs: 'src/**/*.{ts,vue}',
      context: 'This project uses strict TypeScript settings.',
      requirements: [
        'Create type files in /types directory by domain',
        'Use barrel exports (index.ts) for related types',
        'Define API response types matching backend contracts',
        'Use readonly for immutable properties',
        'Use Record<K, V> instead of {[key: string]: T}',
        'Avoid type assertions when possible',
        'Never use "as any"',
        'Use type guards and narrowing over assertions',
        'Use type predicates for custom guards',
      ],
      goodExamples: [
        `// types/user.ts
export interface User {
  readonly id: string;
  name: string;
  email: string;
}

// Usage
import type { User } from '~/types/user'
const user = ref<User | null>(null)

// Type guard
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' && 
    value !== null && 
    'id' in value
  )
}`,
      ],
      badExamples: [
        `// Inline types
const user = ref<{
  id: string;
  name: string;
} | null>(null)

// Using any
const data = await $fetch('/api/users') as any

// Unsafe assertion
const user = someValue as User`,
      ],
      criticalRules: [
        'NEVER use "as any" in TypeScript code',
        'ALWAYS define API response types',
        'Use type guards instead of type assertions',
      ],
      alwaysApply: true,
    })
  }

  // Generate SSR rule if SSR is enabled
  if (nuxt.options.ssr) {
    createRuleFile({
      prefix: '2000',
      fileName: 'nuxt-ssr',
      name: 'Nuxt SSR Compatibility',
      description: 'Ensure components work correctly in SSR environment',
      globs: 'src/**/*.{vue,js,ts}',
      context: 'This Nuxt project uses Server-Side Rendering (SSR).',
      requirements: [
        'Make components isomorphic (server+client compatible)',
        'Use `import.meta.client` and `import.meta.server` for environment branching',
        'Never directly access browser APIs without environment checks',
        'Use dynamic imports for code splitting when needed',
        'Use onMounted for client-only code',
      ],
      goodExamples: [
        `<script setup>
// Isomorphic code
const count = ref(0)

// Environment branching
if (import.meta.server) {
  console.log('Server side')
}
if (import.meta.client) {
  onMounted(() => console.log('Client side'))
}
</script>`,
      ],
      badExamples: [
        `<script setup>
// Direct window usage fails on server
const width = window.innerWidth

// Document usage fails on server
onServerPrefetch(() => {
  document.title = 'Page Title'
})
</script>`,
      ],
      criticalRules: [
        'NEVER access browser APIs without environment checks',
        'ALWAYS use import.meta.client/server for environment branching',
        'Use onMounted for client-only code',
      ],
      alwaysApply: true,
    })
  }
  else {
    // Generate CSR rule if SSR is disabled
    createRuleFile({
      prefix: '2000',
      fileName: 'nuxt-csr',
      name: 'Nuxt CSR Patterns',
      description: 'Follow client-side rendering best practices in Nuxt',
      globs: 'src/**/*.{vue,js,ts}',
      context: 'This Nuxt project uses Client-Side Rendering (CSR) only.',
      requirements: [
        'Components render client-side only',
        'Maintain isomorphic patterns for future compatibility',
        'Use lifecycle hooks for browser API interactions',
        'Clean up event listeners and subscriptions',
      ],
      goodExamples: [
        `<script setup>
// Client-side code with isomorphic patterns
const count = ref(0)

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>`,
      ],
      criticalRules: [
        'ALWAYS clean up event listeners in onUnmounted',
        'Use lifecycle hooks for browser API interactions',
        'Maintain isomorphic patterns for future compatibility',
      ],
      alwaysApply: true,
    })
  }

  // Generate auto-imports rule if enabled
  if (nuxt.options.imports.autoImport) {
    createRuleFile({
      prefix: '2000',
      fileName: 'nuxt-auto-imports',
      name: 'Nuxt Auto-Imports',
      description: 'Leverage Nuxt auto-imports to reduce boilerplate code',
      globs: 'src/**/*.{vue,js,ts}',
      context: 'This Nuxt project has auto-imports enabled.',
      requirements: [
        'Vue APIs (ref, computed, watch) are auto-imported',
        'No explicit import statements needed for Vue core',
        'Check available imports with `list-nuxt-auto-imports-items` tool',
        'Components in components/ directory are auto-imported',
        'Composables in composables/ directory are auto-imported',
      ],
      goodExamples: [
        `<script setup>
// Auto-imported APIs
const count = ref(0)
const doubled = computed(() => count.value * 2)
watch(count, (newVal) => console.log(newVal))
</script>`,
      ],
      badExamples: [
        `<script setup>
import { ref, computed, watch } from 'vue' // Unnecessary

const count = ref(0)
const doubled = computed(() => count.value * 2)
watch(count, (newVal) => console.log(newVal))
</script>`,
      ],
      criticalRules: [
        'NEVER import Vue APIs that are auto-imported',
        'Use auto-imported components without explicit imports',
        'Check available auto-imports before adding manual imports',
      ],
      alwaysApply: true,
    })
  }
  else {
    // Generate manual imports rule if auto-imports disabled
    createRuleFile({
      prefix: '2000',
      fileName: 'nuxt-manual-imports',
      name: 'Nuxt Manual Imports',
      description: 'Use explicit imports for all dependencies in Nuxt components',
      globs: 'src/**/*.{vue,js,ts}',
      context: 'This Nuxt project has auto-imports disabled.',
      requirements: [
        'Auto-imports disabled',
        'Manually import all dependencies',
        'Use `import { xxx } from \'vue\'` for Vue APIs',
        'Use `import { xxx } from \'#imports\'` for registry items',
        'Import components explicitly',
      ],
      goodExamples: [
        `<script setup>
import { ref, computed } from 'vue' // Required
import { useRouter } from 'vue-router'
import UserCard from '~/components/UserCard.vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
const router = useRouter()
</script>`,
      ],
      badExamples: [
        `<script setup>
// Missing imports
const count = ref(0) // Error: ref not defined
const router = useRouter() // Error: useRouter not defined
</script>`,
      ],
      criticalRules: [
        'ALWAYS import all dependencies explicitly',
        'Use correct import paths for Vue APIs and components',
        'NEVER use APIs without importing them first',
      ],
      alwaysApply: true,
    })
  }

  // Generate component rules
  createRuleFile({
    prefix: '2000',
    fileName: 'vue-components',
    name: 'Vue Component Best Practices',
    description: 'Follow Vue component best practices in Nuxt application',
    globs: 'src/components/**/*.vue',
    context: 'Rules for Vue components in a Nuxt application.',
    requirements: [
      'Create small, focused components',
      'Use defineModel for two-way binding',
      'Use props for data down, emits for events up',
      'Use composables for shared state/logic',
      'Structure: script → template → style',
      'Use TypeScript interfaces for props/emits',
      'Define complex types in /types directory',
      'Mark optional props with ? symbol',
    ],
    goodExamples: [
      `<script setup>
interface CardProps {
  title: string;
  description: string;
  image?: string;
}

const props = defineProps<CardProps>()
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <div @click="handleClick">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <img v-if="image" :src="image" alt="Card image">
  </div>
</template>`,
    ],
    badExamples: [
      `<template>
  <div @click="$emit('click', $event)">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: ['title', 'description'], // No types
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>`,
    ],
    criticalRules: [
      'ALWAYS use TypeScript interfaces for props/emits',
      'Keep components small and focused',
      'Use proper component structure (script → template → style)',
    ],
    alwaysApply: true,
  })

  // Generate data fetching rules
  createRuleFile({
    prefix: '2000',
    fileName: 'data-fetching',
    name: 'Nuxt Data Fetching',
    description: 'Apply Nuxt data fetching patterns in components and pages',
    globs: 'src/**/*.vue',
    context: 'Rules for data fetching in Nuxt components and pages.',
    requirements: [
      'Use useFetch/useAsyncData at top level of script setup',
      'Never fetch inside functions or lifecycle hooks',
      'Always destructure and use status property',
      'Handle all data states in templates',
      'Use $fetch for imperative API calls',
    ],
    goodExamples: [
      `<script setup>
const { data, status, error, refresh } = await useAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains')
)

function handleRefresh() {
  refresh()
}
</script>

<template>
  <div>
    <div v-if="status === 'pending'">Loading...</div>
    <div v-else-if="status === 'error'">Error: {{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="item in data" :key="item.id">{{ item.name }}</li>
      </ul>
      <button @click="handleRefresh">Refresh</button>
    </div>
  </div>
</template>`,
    ],
    badExamples: [
      `<script setup>
const data = ref(null)
const error = ref(null)
const loading = ref(true)

// Wrong: Fetching in lifecycle hook
onMounted(async () => {
  try {
    data.value = await $fetch('/api/data')
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
})
</script>`,
    ],
    criticalRules: [
      'NEVER fetch data inside lifecycle hooks',
      'ALWAYS handle all data states in templates',
      'Use useFetch/useAsyncData at top level of script setup',
    ],
    alwaysApply: true,
  })
}
