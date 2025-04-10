<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="!user">Loading...</div>
    <div v-else>
      <p>Welcome, {{ user.name }}</p>
      <p>Member since: {{ formattedDate }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// BAD: Different state on server vs client
const user = ref(null)

// BAD: This computed prop will have different values on server vs client
const formattedDate = computed(() => {
  if (!user.value?.joinDate) return ''
  // This will produce different results on server and client
  return new Date(user.value.joinDate).toLocaleDateString()
})

// BAD: Only fetching data on client side causes hydration mismatch
onMounted(async () => {
  const response = await fetch('/api/user')
  user.value = await response.json()
})
</script> 