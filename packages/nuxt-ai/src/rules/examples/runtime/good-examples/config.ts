// Define runtime config
export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys only available server-side
    apiSecret: '',
    stripe: {
      secretKey: '',
      webhookSecret: '',
    },
    // Public keys available client-side
    public: {
      apiBase: 'https://api.example.com',
      websocketUrl: 'wss://ws.example.com',
      stripe: {
        publishableKey: '',
      },
    },
  },
})

// Usage in component
export default defineComponent({
  setup() {
    // Access runtime config
    const config = useRuntimeConfig()

    // Use in composable
    const { initializeStripe } = useStripe(config.public.stripe.publishableKey)

    // Use in API call
    const { data } = useFetch('/api/data', {
      baseURL: config.public.apiBase,
    })

    return {
      data,
      initializeStripe,
    }
  },
})
