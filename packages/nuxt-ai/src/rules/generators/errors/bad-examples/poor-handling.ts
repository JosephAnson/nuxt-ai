// ❌ Wrong: Poor error handling
async function fetchData() {
  // Wrong: No error handling
  const data = await $fetch('/api/data')
  return data
}

// ❌ Wrong: Generic error messages
export default defineEventHandler(() => {
  try {
    // Implementation
  }
  catch (e) {
    // Wrong: Generic error
    throw createError({
      statusCode: 500,
      message: 'Something went wrong',
    })
  }
})

// ❌ Wrong: Not handling all error states
// <template>
//   <div>
//     <!-- Wrong: Missing error state -->
//     <div v-if="loading">Loading...</div>
//     <div v-else>{{ data }}</div>
//   </div>
// </template>
