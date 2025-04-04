// Example of proper image handling with Nuxt Image
export default `
<script setup lang="ts">
// Define image props with proper types
interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  format?: 'webp' | 'jpeg' | 'png'
}

const props = withDefaults(defineProps<Props>(), {
  width: 800,
  height: 600,
  format: 'webp'
})

// Use computed for dynamic sources
const optimizedSrc = computed(() => {
  const base = props.src.startsWith('http')
    ? props.src // Remote image
    : \`/assets/images/\${props.src}\` // Local image

  return {
    src: base,
    width: props.width,
    height: props.height,
    format: props.format,
    quality: 80
  }
})
</script>

<template>
  <figure>
    <!-- Use Nuxt Image component for optimized images -->
    <nuxt-img
      v-bind="optimizedSrc"
      :alt="alt"
      loading="lazy"
      sizes="sm:100vw md:50vw lg:800px"
      placeholder
    />
    <figcaption>
      <slot />
    </figcaption>
  </figure>
</template>

<style scoped>
figure {
  margin: 0;
  position: relative;
}

img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
`
