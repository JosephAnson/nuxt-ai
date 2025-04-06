// Define types
interface UseAuthOptions {
  redirect?: string
  cookie?: {
    name: string
    maxAge: number
  }
}

interface AuthUser {
  id: string
  email: string
  role: 'admin' | 'user'
  permissions: string[]
}

interface LoginCredentials {
  email: string
  password: string
}

interface AuthError extends Error {
  code: 'INVALID_CREDENTIALS' | 'NETWORK_ERROR' | 'UNAUTHORIZED'
}

// Type-safe composable
export function useAuth(options: UseAuthOptions = {}) {
  // Type-safe refs and state
  const user = useState<AuthUser | null>('auth_user', () => null)
  const loading = ref(false)
  const error = ref<AuthError | null>(null)

  // Type-safe cookie
  const token = useCookie<string | null>(
    options.cookie?.name ?? 'auth_token',
    {
      maxAge: options.cookie?.maxAge ?? 60 * 60 * 24 * 7,
    },
  )

  // Type-safe computed properties
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const hasPermission = (permission: string) => {
    return user.value?.permissions.includes(permission) ?? false
  }

  // Type-safe methods
  async function login(credentials: LoginCredentials): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const { data } = await useFetch<{ user: AuthUser, token: string }>('/api/auth/login', {
        method: 'POST',
        body: credentials,
      })

      if (data.value) {
        user.value = data.value.user
        token.value = data.value.token
      }

      if (options.redirect) {
        navigateTo(options.redirect)
      }
    }
    catch (err) {
      error.value = err as AuthError
      throw error.value
    }
    finally {
      loading.value = false
    }
  }

  async function logout(): Promise<void> {
    try {
      await useFetch('/api/auth/logout', {
        method: 'POST',
      })
    }
    finally {
      user.value = null
      token.value = null
      navigateTo('/login')
    }
  }

  // Return typed object
  return {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    isAuthenticated,
    isAdmin,
    hasPermission,
    login,
    logout,
  }
}
