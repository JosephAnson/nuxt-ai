<script setup lang="ts">
// State management
const count = ref(0)
const isLoading = ref(true)

// Initialize browser features
const theme = window.matchMedia('(prefers-color-scheme: dark)')
const isDark = ref(theme.matches)

// Lifecycle hooks for browser APIs
onMounted(async () => {
  // Event listeners
  const handleThemeChange = (e: MediaQueryListEvent) => {
    isDark.value = e.matches
  }
  
  theme.addEventListener('change', handleThemeChange)
  
  // Load data
  try {
    const { data } = await $fetch('/api/data')
    count.value = data.count
  } catch (error) {
    console.error('Failed to load data:', error)
  } finally {
    isLoading.value = false
  }
})

 // Cleanup
onUnmounted(() => {
  theme.removeEventListener('change', handleThemeChange)
})

// Computed properties
const doubleCount = computed(() => count.value * 2)

// Methods
function increment() {
  count.value++
}

// Watch for changes
watch(count, (newCount) => {
  // Save to localStorage
  localStorage.setItem('count', String(newCount))
})
</script>

<template>
  <div>
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else>
      <h1>Counter: {{ count }}</h1>
      <p>Double: {{ doubleCount }}</p>
      <button @click="increment">
        Increment
      </button>
    </div>
  </div>
</template> 