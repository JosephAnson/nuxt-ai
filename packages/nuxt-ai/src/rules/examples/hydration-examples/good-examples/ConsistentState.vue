<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="isPending">Loading...</div>
    <div v-else-if="user">
      <p>Welcome, {{ user.name }}</p>
      <p>Member since: {{ formatDate(user.joinDate) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '#app'

// Using Nuxt's useFetch ensures consistent state between server and client
const { data: user, pending: isPending } = useFetch('/api/user')

// Shared utility function used on both server and client
function formatDate(date) {
  return new Date(date).toLocaleDateString()
}
</script> 