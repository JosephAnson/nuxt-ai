export async function useAsyncResource<T>(
  key: string,
  fetcher: () => Promise<T>,
) {
  // Use built-in composables
  const nuxtApp = useNuxtApp()

  // Use useAsyncData for data fetching
  const { data, error, refresh } = await useAsyncData(
    key,
    () => fetcher(),
    {
      // Handle errors
      onRequestError: ({ error }) => {
        console.error(`Failed to fetch ${key}:`, error)
      },
      // Transform data if needed
      transform: response => response,
      // Cache management
      watch: false,
      // SSR options
      server: true,
      lazy: false,
    },
  )

  // Provide refresh method
  async function refetchData() {
    await refresh()
  }

  return {
    data: readonly(data),
    error: readonly(error),
    refresh: refetchData,
  }
}
