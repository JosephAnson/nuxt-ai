// Example of incorrect routing approach not using Nuxt's file-based routing
export default `
<script>
export default {
  // Wrong: Using Vue Router directly
  router: {
    routes: [
      { path: '/users/:id', component: UserPage }
    ]
  }
}
</script>
`
