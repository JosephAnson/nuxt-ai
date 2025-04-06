<script>
// ❌ Wrong: Not using script setup
export default {
  data() {
    return {
      // ❌ Wrong: Using options API instead of composition API
      isMenuOpen: false,
      user: null
    }
  },
  // ❌ Wrong: Using mounted hook for auth check
  mounted() {
    this.checkAuth()
  },
  methods: {
    // ❌ Wrong: Not using composables for auth
    async checkAuth() {
      try {
        const response = await fetch('/api/auth')
        this.user = await response.json()
      } catch (error) {
        console.error(error)
      }
    },
    // ❌ Wrong: Direct DOM manipulation
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : ''
    }
  }
}
</script>

<template>
  <!-- ❌ Wrong: No semantic HTML structure -->
  <div>
    <!-- ❌ Wrong: Inline styles -->
    <div style="background: #fff; padding: 20px;">
      <button @click="toggleMenu">Menu</button>
    </div>

    <!-- ❌ Wrong: No proper navigation structure -->
    <div v-if="isMenuOpen">
      <a href="/">Home</a>
      <a href="/about">About</a>
    </div>

    <!-- ❌ Wrong: No proper content structure -->
    <div style="padding: 20px;">
      <slot />
    </div>
  </div>
</template> 