<script setup lang="ts">
import { ROUTES } from '@/router/config'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isApplicationPage = computed(
  () => router.currentRoute.value.path === ROUTES.ADMIN.APPLICATIONS,
)
</script>

<template>
  <nav class="flex justify-start gap-2">
    <UButton
      variant="link"
      :class="{ ' text-orange-500': !isApplicationPage }"
      color="neutral"
      :to="ROUTES.ADMIN.INDEX"
      >Управление тарифами</UButton
    >
    <UButton
      variant="link"
      color="neutral"
      :to="ROUTES.ADMIN.APPLICATIONS"
      :class="{ 'text-orange-500 ': isApplicationPage }"
      >Отправленные заявки</UButton
    >
  </nav>
</template>

<style scoped></style>
