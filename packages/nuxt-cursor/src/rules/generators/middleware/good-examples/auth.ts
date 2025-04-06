// Example of proper authentication middleware
export default `
export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()
  
  // Handle auth requirements
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // Redirect to login with return URL
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
  
  // Handle guest-only pages
  if (to.meta.guest && isAuthenticated.value) {
    return navigateTo('/')
  }
})
`
