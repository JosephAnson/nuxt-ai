<script setup lang="ts">
import type { PropType } from 'vue'

// Define interfaces
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  preferences: UserPreferences
}

interface UserPreferences {
  theme: 'light' | 'dark'
  notifications: boolean
}

// Define props with proper types
const props = defineProps<{
  user: User
  isEditable?: boolean
  onSave?: (user: User) => Promise<void>
}>()

// Define emits with type checking
const emit = defineEmits<{
  'update:user': [user: User]
  'save': [user: User]
  'cancel': []
}>()

// Define refs with types
const isEditing = ref(false)
const editedUser = ref<User>({ ...props.user })

// Computed properties with type inference
const userRole = computed(() => props.user.role.toUpperCase())

// Methods with proper typing
async function handleSave() {
  try {
    if (props.onSave) {
      await props.onSave(editedUser.value)
    }
    emit('save', editedUser.value)
    isEditing.value = false
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to save:', error.message)
    }
  }
}

// Type-safe composable usage
const { t } = useI18n()
const toast = useToast()

// Watchers with type inference
watch(() => props.user, (newUser) => {
  editedUser.value = { ...newUser }
})
</script>

<template>
  <div class="user-profile">
    <div v-if="isEditing">
      <input
        v-model="editedUser.name"
        :placeholder="t('user.name')"
        type="text"
      />
      <input
        v-model="editedUser.email"
        :placeholder="t('user.email')"
        type="email"
      />
      <select v-model="editedUser.preferences.theme">
        <option value="light">{{ t('theme.light') }}</option>
        <option value="dark">{{ t('theme.dark') }}</option>
      </select>
      <div class="actions">
        <button @click="handleSave">{{ t('actions.save') }}</button>
        <button @click="isEditing = false">{{ t('actions.cancel') }}</button>
      </div>
    </div>
    <div v-else>
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <p>{{ userRole }}</p>
      <button
        v-if="isEditable"
        @click="isEditing = true"
      >
        {{ t('actions.edit') }}
      </button>
    </div>
  </div>
</template> 