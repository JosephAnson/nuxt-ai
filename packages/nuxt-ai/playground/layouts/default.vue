<template>
  <div>
    <header style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
      <nav>
        <NuxtLink to="/" style="margin-right: 15px;">Home</NuxtLink>
        <NuxtLink to="/chat">Chat</NuxtLink>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
// No specific layout logic needed for now
</script>

<style>
/* Basic styling for active link */
.router-link-active {
  font-weight: bold;
}
</style> 