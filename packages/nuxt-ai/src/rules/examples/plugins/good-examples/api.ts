// Define API client types
interface ApiClient {
  get: <T>(url: string, config?: RequestConfig) => Promise<T>
  post: <T>(url: string, data?: unknown, config?: RequestConfig) => Promise<T>
  put: <T>(url: string, data?: unknown, config?: RequestConfig) => Promise<T>
  delete: <T>(url: string, config?: RequestConfig) => Promise<T>
}

// Define plugin
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const token = useCookie('auth_token')

  // Create base client
  const client = $fetch.create({
    baseURL: config.public.apiBase,
    headers: {
      'Content-Type': 'application/json',
    },
    // Add request interceptor
    onRequest({ options }) {
      // Add auth token if available
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`,
        }
      }
    },
    // Add response interceptor
    async onResponse({ response }) {
      if (!response.ok) {
        // Handle common errors
        switch (response.status) {
          case 401:
            navigateTo('/login')
            break
          case 403:
            throw createError({
              statusCode: 403,
              message: 'Forbidden',
            })
            break
          default:
            throw createError({
              statusCode: response.status,
              message: response._data?.message || 'API Error',
            })
        }
      }
    },
  })

  // Create typed methods
  const api: ApiClient = {
    get: (url, config) => client(url, { ...config, method: 'GET' }),
    post: (url, data, config) => client(url, { ...config, method: 'POST', body: data }),
    put: (url, data, config) => client(url, { ...config, method: 'PUT', body: data }),
    delete: (url, config) => client(url, { ...config, method: 'DELETE' }),
  }

  return {
    provide: {
      api,
    },
  }
})
