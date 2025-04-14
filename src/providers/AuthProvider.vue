<script setup lang="ts">
import { onMounted, provide } from 'vue'
import { authKey } from '@/lib/keys'
import { useAuth } from '@/composables/useAuth'

const {
  user,
  userId,
  setAuthData,
  mutateAuthData,
  logout,
  isLoading,
  isLoggedIn,
  initializeAuth,
  accessToken,
} = useAuth()

onMounted(() => {
  initializeAuth()
})

provide(authKey, {
  user,
  accessToken,
  isLoading,
  isLoggedIn,
  userId,
  setAuthData,
  mutateAuthData,
  logout,
  initializeAuth,
})
</script>

<template>
  <slot />
</template>
