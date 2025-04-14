<script setup lang="ts">
import { authKey } from '@/lib/keys'
import { ROUTES } from '@/router/config'
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const auth = inject(authKey)
</script>

<template>
  <header
    class="flex items-center justify-between p-8 border-b border-b-orange-300 mx-4 select-none"
  >
    <h2 class="text-3xl font-semibold">Нометек</h2>

    <div v-if="auth?.isLoggedIn.value" class="flex items-center gap-2">
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
      <ApproveModal
        @approve="
          () =>
            auth!.logout(() => {
              router.push(ROUTES.INDEX)
            })
        "
      >
        <UButton color="neutral" variant="link">Выйти из аккаунта</UButton>
      </ApproveModal>
    </div>
  </header>
</template>
