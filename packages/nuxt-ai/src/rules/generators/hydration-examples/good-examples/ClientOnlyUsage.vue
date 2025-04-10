<template>
  <div>
    <h1>Welcome to Our App</h1>
    
    <!-- Main content works with SSR -->
    <main>
      <p>This critical content is server-rendered and hydrated normally</p>
      <ProductList :products="products" />
    </main>
    
    <!-- Only wrapping third-party component that doesn't support SSR -->
    <ClientOnly>
      <ThirdPartyChart :data="chartData" />
      <template #fallback>
        <div class="chart-placeholder">Chart loading...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAsyncData } from '#app'

const { data: products } = useAsyncData('products', () => 
  $fetch('/api/products')
)

const chartData = ref([10, 25, 45, 30, 65, 40])
</script> 