// Example of poor error handling in middleware
export default `
// ❌ Wrong: Poor error handling
export default defineNuxtRouteMiddleware(() => {
  try {
    // Implementation
  } catch (e) {
    // Wrong: Generic error
    console.error(e)
    return navigateTo('/error')
  }
})
`
