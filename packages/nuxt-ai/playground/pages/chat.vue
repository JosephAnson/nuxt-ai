<script setup lang="ts">
const { messages, input, handleSubmit } = useChat({
  api: '/api/chat'
})
</script>  

<template>
  <div>
    <h1>Nuxt AI Chat Playground</h1>

    <div>
    <div
      v-for="m in messages"
      :key="m.id ? m.id : index"
    >
      {{ m.role === 'user' ? 'User: ' : 'AI: ' }}
      <div v-for="part in m.parts" :key="part.id">
        <div v-if="part.type === 'text'">{{ part.text }}</div>
      </div>
    </div>

    <form @submit="handleSubmit">
      <input
        v-model="input"
        placeholder="Say something..."
      />

      <button type="submit">Send</button>
    </form>
  </div>
  </div>  
</template>

