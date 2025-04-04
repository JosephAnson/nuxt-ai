export default defineLazyEventHandler(async () => {
  // Expensive one-time setup
  const db = await initializeDatabase()
  const cache = await setupCache()

  // Return the actual handler
  return defineEventHandler(async (event: H3Event) => {
    const { id } = getQuery(event)

    // Check cache first
    const cached = await cache.get(id as string)
    if (cached)
      return cached

    // Query database if not in cache
    const result = await db.query(id as string)
    await cache.set(id as string, result)

    return result
  })
})
