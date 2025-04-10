// Example of proper role-based guard middleware
export default `
export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth()
  const requiredRole = to.meta.requiredRole
  
  // Skip if no role required
  if (!requiredRole) return
  
  // Check user role
  if (!user.value?.roles.includes(requiredRole)) {
    throw createError({
      statusCode: 403,
      message: 'Access denied'
    })
  }
})
`
