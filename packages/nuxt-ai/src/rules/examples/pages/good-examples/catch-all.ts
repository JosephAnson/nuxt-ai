// Example of proper catch-all route handling with meta tags
export default `
<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug

// Handle catch-all route
const path = Array.isArray(slug) ? slug.join('/') : slug

// Fetch blog post
const { data: post } = await useFetch(\`/api/blog/\${path}\`)

// Update meta tags
useHead({
  title: post.value?.title,
  meta: [
    {
      name: 'description',
      content: post.value?.description
    }
  ]
})
</script>

<template>
  <article>
    <BlogPost :post="post" />
  </article>
</template>
`
