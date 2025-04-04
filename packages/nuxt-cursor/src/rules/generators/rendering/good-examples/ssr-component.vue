<script setup lang="ts">
// Isomorphic state
const count = ref(0)
const message = ref('Hello')

// Environment-specific code
if (import.meta.server) {
  // Server-only code
  const headers = useRequestHeaders()
  const userAgent = headers['user-agent']
  console.log('Server-side render for:', userAgent)
}

// Safe to access window here
const handleResize = () => {
    console.log('Window resized:', window.innerWidth)
  }

// Client-only code in lifecycle hooks
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

 // Cleanup
onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})

// Async data fetching
const { data: posts } = await useAsyncData('posts', () => 
  $fetch('/api/posts')
)

// Computed properties work on both client and server
const reversedMessage = computed(() => 
  message.value.split('').reverse().join('')
)
</script>

<template>
  <div>
    <!-- Static content renders on server -->
    <h1>{{ message }}</h1>
    <p>{{ reversedMessage }}</p>
    
    <!-- Dynamic content hydrates on client -->
    <div>
      <button @click="count++">
        Count: {{ count }}
      </button>
    </div>
    
    <!-- Conditional client-only component -->
    <ClientOnly>
      <ThirdPartyWidget />
      <template #fallback>
        <div>Loading widget...</div>
      </template>
    </ClientOnly>
    
    <!-- Server-fetched data -->
    <div v-if="posts">
      <article v-for="post in posts" :key="post.id">
        {{ post.title }}
      </article>
    </div>
  </div>
</template> 