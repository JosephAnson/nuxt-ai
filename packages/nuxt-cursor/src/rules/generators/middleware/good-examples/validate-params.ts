// Example of proper route parameter validation middleware
export default defineNuxtRouteMiddleware(async (to) => {
  // Skip validation for routes without params
  if (!to.params.id)
    return

  try {
    // Validate route params
    const isValid = await validateRouteParams(to.params)
    if (!isValid) {
      throw createError({
        statusCode: 400,
        message: 'Invalid route parameters',
      })
    }
  }
  catch (error) {
    // Handle validation errors
    return navigateTo({
      name: 'error',
      query: {
        statusCode: error.statusCode,
        message: error.message,
      },
    })
  }
})
