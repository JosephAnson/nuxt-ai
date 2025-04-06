import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  name: string
  preferences: UserPreferences
}

interface UserPreferences {
  theme: 'light' | 'dark'
  notifications: boolean
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as Error | null,
  }),

  getters: {
    isAuthenticated: state => !!state.user,
    userPreferences: state => state.user?.preferences,
    userName: state => state.user?.name,
  },

  actions: {
    async fetchUser() {
      this.loading = true
      this.error = null

      try {
        const { data } = await useFetch<User>('/api/user')
        this.user = data.value
      }
      catch (err) {
        this.error = err as Error
        throw err
      }
      finally {
        this.loading = false
      }
    },

    async updatePreferences(preferences: Partial<UserPreferences>) {
      if (!this.user)
        return

      try {
        const { data } = await useFetch<User>('/api/user/preferences', {
          method: 'PATCH',
          body: preferences,
        })

        this.user = {
          ...this.user,
          preferences: {
            ...this.user.preferences,
            ...preferences,
          },
        }
      }
      catch (err) {
        throw createError({
          statusCode: 400,
          message: 'Failed to update preferences',
        })
      }
    },

    clearUser() {
      this.user = null
      this.error = null
    },
  },
})
