// Example of proper analytics middleware with client-side only execution
export default `
export default defineNuxtRouteMiddleware((to) => {
  // Skip on server
  if (process.server) return
  
  // Track page view
  const analytics = useAnalytics()
  analytics.trackPageView({
    path: to.fullPath,
    title: to.meta.title
  })
})
`
