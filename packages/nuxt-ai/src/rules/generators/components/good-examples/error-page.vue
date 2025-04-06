<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

// Handle error page head
useHead({
  title: `Error ${props.error.statusCode}`
})

// Clear error and return to homepage
function handleError() {
  clearError()
  navigateTo('/')
}
</script>

<template>
  <div class="error-page">
    <h1>{{ error.statusCode }}</h1>
    <div class="error-details">
      <p>{{ error.statusMessage || error.message }}</p>
      <button @click="handleError">
        Return Home
      </button>
    </div>
  </div>
</template> 