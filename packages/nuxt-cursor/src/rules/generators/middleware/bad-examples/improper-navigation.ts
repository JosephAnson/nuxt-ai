// Example of improper navigation in middleware
export default `
// ❌ Wrong: Improper navigation
export default defineNuxtRouteMiddleware(() => {
  // Wrong: Using window.location
  window.location.href = '/login'
})
`
