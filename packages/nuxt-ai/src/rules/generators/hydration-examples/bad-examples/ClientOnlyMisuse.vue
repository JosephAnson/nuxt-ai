<template>
  <div>
    <!-- BAD: Wrapping the entire app in ClientOnly -->
    <ClientOnly>
      <h1>Welcome to Our App</h1>
      
      <header>
        <NavBar :user="user" />
      </header>
      
      <main>
        <p>This critical content doesn't need ClientOnly</p>
        <ProductList :products="products" />
      </main>
      
      <footer>
        <p>© 2023 Our Company</p>
      </footer>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// BAD: Not using Nuxt's data fetching utilities
const user = ref(null)
const products = ref([])

// Fetching data only on client side
onMounted(async () => {
  // This approach loses the benefits of SSR
  const userResponse = await fetch('/api/user')
  user.value = await userResponse.json()
  
  const productsResponse = await fetch('/api/products')
  products.value = await productsResponse.json()
})
</script> 