// Example of a well-structured index page with proper meta, SEO, and data fetching
export default `
<script setup lang="ts">
// Define page metadata
definePageMeta({
  title: 'Home',
  description: 'Welcome to our app',
  middleware: ['auth']
})

// Handle page-specific SEO
useSeoMeta({
  title: 'Home - My App',
  description: 'Welcome to my awesome app',
  ogImage: '/images/home-og.jpg'
})

// Fetch page data
const { data, pending } = await useFetch('/api/featured')
</script>

<template>
  <div>
    <h1>Welcome</h1>
    
    <!-- Loading state -->
    <LoadingSpinner v-if="pending" />
    
    <!-- Content -->
    <FeaturedContent v-else :items="data" />
  </div>
</template>
`
