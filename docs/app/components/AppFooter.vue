<script setup lang="ts">
const route = useRoute()

// const items = [{
//   label: 'Figma Kit',
//   to: 'https://www.figma.com/community/file/1288455405058138934',
//   target: '_blank'
// }, {
//   label: 'Playground',
//   to: 'https://stackblitz.com/edit/nuxt-ui',
//   target: '_blank'
// }, {
//   label: 'Roadmap',
//   to: '/roadmap'
// }, {
//   label: 'Releases',
//   to: '/releases'
// }]
</script>

<template>
  <USeparator
    icon="i-simple-icons-nuxtdotjs"
    class="h-px"
  />

  <UFooter>
    <template #left>
      <NuxtLink
        to="https://github.com/@josephanson/nuxt-ai"
        target="_blank"
        class="text-sm text-(--ui-text-muted)"
      >
        Published under <span class="text-(--ui-text-highlighted)">MIT License</span>
      </NuxtLink>
    </template>

    <!-- <UNavigationMenu :items="items" variant="link" color="neutral" /> -->

    <template #right>
      <UButton
        aria-label="Nuxt AI on GitHub"
        icon="i-simple-icons-github"
        to="https://github.com/@josephanson/nuxt-ai"
        target="_blank"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
