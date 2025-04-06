<script setup lang="ts">
const props = defineProps<{
  fetchUrl: string
}>()

// Handle async data fetching with error states
const { data, error, pending, refresh } = await useFetch(
  props.fetchUrl,
  {
    // Handle errors
    onRequestError: ({ error }) => {
      console.error('Request failed:', error)
    },
    // Retry failed requests
    retry: 3,
    retryDelay: 1000
  }
)

// Show error toast on failure
watch(error, (newError) => {
  if (newError) {
    useToast().error({
      title: 'Error',
      message: newError.message
    })
  }
})
</script>

<template>
  <div>
    <!-- Loading state -->
    <LoadingSpinner v-if="pending" />
    
    <!-- Error state with retry -->
    <div v-else-if="error" class="error-state">
      <p>{{ error.message }}</p>
      <button @click="refresh">
        Try Again
      </button>
    </div>
    
    <!-- Success state -->
    <div v-else>
      <slot :data="data" />
    </div>
  </div>
</template> 