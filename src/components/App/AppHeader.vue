<script setup lang="ts">
import { ROUTES } from '@/router/config'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <header
    class="flex items-center justify-between p-8 border-b border-b-orange-300 mx-4 select-none"
  >
    <h2 class="text-3xl font-semibold">Нометек</h2>

    <div class="flex items-center gap-2">
      <UButton
        v-if="!router.currentRoute.value.path.includes(ROUTES.ADMIN.INDEX)"
        class="text-orange-500"
        color="neutral"
        :to="ROUTES.ADMIN.INDEX"
        variant="link"
        >Админ-панель</UButton
      >
      <UButton
        v-if="router.currentRoute.value.path !== ROUTES.INDEX"
        color="neutral"
        :to="ROUTES.INDEX"
        variant="link"
        >Перейти на сайт</UButton
      >
    </div>
  </header>
</template>
