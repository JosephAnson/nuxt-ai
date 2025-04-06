// Define plugin types
interface AuthPlugin {
  user: Ref<User | null>
  login: (credentials: Credentials) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: ComputedRef<boolean>
}

// Define plugin
export default defineNuxtPlugin(() => {
  // State
  const user = useState<User | null>('user', () => null)
  const token = useCookie('auth_token')

  // Computed
  const isAuthenticated = computed(() => !!user.value)

  // Methods
  async function login(credentials: Credentials) {
    const { data, error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: credentials,
    })

    if (error.value) {
      throw createError({
        statusCode: 401,
        message: 'Authentication failed',
      })
    }

    user.value = data.value.user
    token.value = data.value.token
  }

  async function logout() {
    await useFetch('/api/auth/logout', {
      method: 'POST',
    })

    user.value = null
    token.value = null
    navigateTo('/login')
  }

  return {
    provide: {
      auth: {
        user,
        login,
        logout,
        isAuthenticated,
      },
    },
  }
})
