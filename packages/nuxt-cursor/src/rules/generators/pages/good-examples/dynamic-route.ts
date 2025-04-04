// Example of proper dynamic route handling with validation and error handling
export default `
<script setup lang="ts">
// Get route params
const route = useRoute()
const id = route.params.id

// Validate route params
if (!id || Array.isArray(id)) {
  throw createError({
    statusCode: 400,
    message: 'Invalid user ID'
  })
}

// Define page meta
definePageMeta({
  validate: async (route) => {
    // Validate user exists
    const user = await fetchUser(route.params.id)
    return !!user
  }
})

// Fetch user data
const { data: user } = await useFetch(\`/api/users/\${id}\`, {
  // Handle 404
  error: (error) => {
    if (error.statusCode === 404) {
      throw createError({
        statusCode: 404,
        message: \`User \${id} not found\`
      })
    }
  }
})
</script>

<template>
  <div>
    <h1>User Profile</h1>
    <UserProfile :user="user" />
  </div>
</template>
`
