<script setup>
const data = ref(null)
const error = ref(null)
const loading = ref(true)

// ❌ Wrong: Fetching in lifecycle hook
onMounted(async () => {
  try {
    data.value = await $fetch('/api/data')
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
})

// ❌ Wrong: No error handling or state management
const fetchData = async () => {
  const result = await $fetch('/api/data')
  data.value = result
}

// ❌ Wrong: Not handling serialization
const processData = (rawData) => {
  return {
    ...rawData,
    // This will fail in SSR
    date: new Date(rawData.timestamp),
    // This will fail in SSR
    handler: () => console.log('click')
  }
}
</script>

<template>
  <div>
    <!-- ❌ Wrong: Incomplete state handling -->
    <div v-if="loading">Loading...</div>
    <div v-else>{{ data }}</div>
  </div>
</template> 