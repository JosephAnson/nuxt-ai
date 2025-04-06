<script setup>
// ❌ Wrong: Direct browser API usage
const width = window.innerWidth
const height = window.innerHeight

// ❌ Wrong: Accessing document in setup
const title = document.title

// ❌ Wrong: Not using proper lifecycle hooks
const element = document.getElementById('app')

// ❌ Wrong: Direct localStorage access
const theme = localStorage.getItem('theme')

// ❌ Wrong: Not handling SSR properly
if (theme === 'dark') {
  document.body.classList.add('dark')
}

// ❌ Wrong: Not using useAsyncData/useFetch
async function fetchData() {
  const response = await fetch('/api/data')
  return response.json()
}

// ❌ Wrong: Not handling hydration properly
const data = ref(await fetchData())

// ❌ Wrong: Not using proper environment checks
const isBrowser = typeof window !== 'undefined'
if (isBrowser) {
  // Browser-specific code
}
</script>

<template>
  <div>
    <!-- ❌ Wrong: Not handling SSR states -->
    <div v-if="width > 768">
      Desktop View
    </div>
    <div v-else>
      Mobile View
    </div>
    
    <!-- ❌ Wrong: Not using ClientOnly -->
    <ThirdPartyComponent />
    
    <!-- ❌ Wrong: Not handling undefined data -->
    <div>{{ data.value.title }}</div>
  </div>
</template> 