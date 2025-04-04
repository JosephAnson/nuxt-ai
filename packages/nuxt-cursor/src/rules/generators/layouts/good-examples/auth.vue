<script setup lang="ts">
// Auth middleware
definePageMeta({
  middleware: ['auth']
})

// Handle auth state
const { user, isAuthenticated } = useAuth()

// Redirect if not authenticated
onMounted(() => {
  if (!isAuthenticated) {
    navigateTo('/login')
  }
})

// Handle auth-specific navigation
const { currentWorkspace } = useWorkspace()
</script>

<template>
  <div class="auth-layout">
    <!-- Auth-specific header -->
    <header>
      <div class="user-info">
        <img :src="user.avatar" :alt="user.name" />
        <span>{{ user.name }}</span>
      </div>
      <div class="workspace">
        <span>{{ currentWorkspace.name }}</span>
      </div>
    </header>

    <!-- Sidebar navigation -->
    <div class="layout-content">
      <nav class="sidebar">
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        <NuxtLink to="/settings">Settings</NuxtLink>
        <NuxtLink to="/profile">Profile</NuxtLink>
      </nav>

      <!-- Main content -->
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

.layout-content {
  display: grid;
  grid-template-columns: 250px 1fr;
}
</style> 