<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const config = useRuntimeConfig().public
const links = useNavLinks()

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const linksWithoutIcon = computed(() => links.value.map(({ icon, ...link }) => link))
</script>

<template>
  <UHeader
    :ui="{ left: 'min-w-0' }"
    mode="drawer"
  >
    <template #left>
      <NuxtLink
        to="/"
        class="flex items-center gap-4 font-bold text-xl text-(--ui-text-highlighted) min-w-0"
        aria-label="Nuxt AI"
      >
        Nuxt AI

        <UButton
          :label="`v${config.version}`"
          variant="subtle"
          size="xs"
          class="font-semibold rounded-full truncate hidden sm:flex"
        />

        <UButton
          label="Alpha"
          variant="subtle"
          color="error"
          trailing-icon="i-lucide-triangle-alert"
          size="xs"
          class="font-semibold rounded-full truncate hidden sm:flex"
        />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="linksWithoutIcon"
      class="justify-center"
    />

    <template #right>
      <UColorModeButton class="hidden sm:inline-flex" />

      <UTooltip
        text="Search"
        :kbds="['meta', 'K']"
      >
        <UContentSearchButton />
      </UTooltip>

      <UTooltip text="Open on GitHub">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/content"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>

      <UButton
        label="Open Studio"
        to="https://nuxt.studio"
        size="sm"
        class="hidden sm:inline-flex"
      />
    </template>

    <template #body>
      <UNavigationMenu
        orientation="vertical"
        :items="links"
        class="-mx-2.5"
      />

      <USeparator
        type="dashed"
        class="my-4"
      />

      <UContentNavigation
        highlight
        :navigation="navigation"
      />
    </template>
  </UHeader>
</template>
