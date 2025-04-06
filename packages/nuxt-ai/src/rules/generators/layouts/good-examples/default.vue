<script setup lang="ts">
// Define layout-level state
const { isMenuOpen } = useMenu()
const { user } = useAuth()

// Handle layout-level navigation
const router = useRouter()
const route = useRoute()

// Watch route changes for analytics
watch(
  () => route.path,
  (path) => {
    trackPageView(path)
  }
)
</script>

<template>
  <div class="layout">
    <!-- Header with navigation -->
    <header>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <template v-if="user">
          <NuxtLink to="/dashboard">Dashboard</NuxtLink>
          <button @click="logout">Logout</button>
        </template>
        <NuxtLink v-else to="/login">Login</NuxtLink>
      </nav>
    </header>

    <!-- Main content area -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer>
      <p>&copy; {{ new Date().getFullYear() }} My App</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
}
</style> 