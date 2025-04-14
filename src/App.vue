<script setup lang="ts">
import { RouterView } from 'vue-router'
import AuthProvider from './providers/AuthProvider.vue'
</script>

<template>
  <AuthProvider>
    <UApp
      :tooltip="{
        delayDuration: 150,
      }"
    >
      <div class="fixed inset-0 bg-gray-50 -z-10" />

      <RouterView />
    </UApp>
  </AuthProvider>
</template>
<style>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  animation: gradient 15s ease infinite;
  background: linear-gradient(to right, #fffbeb, #fffbdb);
}
</style>
