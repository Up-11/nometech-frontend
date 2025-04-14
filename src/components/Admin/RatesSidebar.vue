<script setup lang="ts">
import { rateService } from '@/api/rate.service'
import { useQuery } from '@/composables/useQuery'
import { ROUTES } from '@/router/config'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isMainPage = computed(() => !route.params.id)
const isActiveRoute = computed(() => (id: string) => id === route.params.id)

const { data: sidebarItems, fetch } = useQuery({
  queryFn: () => rateService.getAllTypes(),
  enabled: true,
})
</script>

<template>
  <aside class="overflow-auto border-r border-r-black/50 p-2">
    <h2 class="text-xl font-bold">Категории</h2>
    <UButton
      :to="ROUTES.ADMIN.INDEX"
      variant="ghost"
      class="w-full"
      :class="[isMainPage ? '' : 'text-black']"
      >Все тарифы</UButton
    >
    <div class="mt-2 flex flex-col gap-2">
      <SidebarItem
        v-for="item in sidebarItems?.data"
        :key="item.id"
        :type="item"
        :is-active="isActiveRoute(item.id)"
        @refresh="fetch"
      />
      <CreateRateTypeModal @refresh="fetch">
        <UButton variant="ghost" trailing-icon="lucide:plus" class="w-full"
          >Добавить категорию
        </UButton>
      </CreateRateTypeModal>
    </div>
  </aside>
</template>

<style scoped></style>
