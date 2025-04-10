<script setup lang="ts">
// Basic usage with error handling and lazy loading
const { data, status, error, refresh } = await useFetch('/api/users', {
  // Client-side only fetching
  lazy: true,
  // Cache key for response
  key: 'users-list',
  // Transform response before caching
  transform: (users) => users.map(u => ({
    ...u,
    fullName: `${u.firstName} ${u.lastName}`
  })),
  // Error handling
  onRequestError: ({ error }) => {
    console.error('Failed to fetch users:', error)
  },
  // Response validation
  pick: ['id', 'name', 'email'] // Only keep needed fields
})

// Retry logic for critical requests
const { data: critical } = await useFetch('/api/critical', {
  retry: 3,
  retryDelay: 1000,
  timeout: 5000
})

// Refresh strategy
const refreshData = () => {
  refresh()
}
</script>

<template>
  <div>
    <!-- Complete state handling -->
    <div v-if="status === 'pending'" class="loading">
      <LoadingSpinner />
    </div>
    <div v-else-if="status === 'error'" class="error">
      <ErrorDisplay :error="error" @retry="refreshData" />
    </div>
    <div v-else-if="!data?.length" class="empty">
      No users found
    </div>
    <div v-else class="success">
      <ul>
        <li v-for="item in data" :key="item.id">
          {{ item.fullName }}
        </li>
      </ul>
      <button @click="refreshData">Refresh</button>
    </div>
  </div>
</template> 