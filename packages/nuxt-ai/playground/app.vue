<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup>
const { messages, input, handleSubmit } = useChat({
  api: '/api/chat'
})
</script>
