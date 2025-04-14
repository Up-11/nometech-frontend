<script setup lang="ts">
import { rateService } from '@/api/rate.service'
import { useQuery } from '@/composables/useQuery'
import { typesKey } from '@/lib/keys'
import type { IRateType } from '@/lib/types'
import { provide, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { data: rates, fetch } = useQuery({
  queryFn: () => rateService.getAllRates(),
  enabled: true,
})

const types = ref<IRateType[]>([])

const {} = useQuery({
  queryFn: () => rateService.getAllTypes(),
  onSuccess: (data) => {
    types.value = data.data
  },
  enabled: true,
})
provide(typesKey, types)
</script>

<template>
  <div>
    <AppHeader />

    <section class="container mx-auto">
      <AdminNavPanel />
      <div class="grid grid-cols-1 sm:grid-cols-[20%_1fr] gap-4">
        <RatesSidebar />
        <div class="flex flex-col flex-1">
          <div
            v-if="route.params.id === undefined"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            <AdminRateCard
              @refresh="fetch"
              v-for="item in rates?.data"
              :key="item.id"
              :item="item"
            />
            <div class="flex justify-center items-center">
              <RateCreateModal @refresh="fetch">
                <div
                  class="flex size-15 rounded-full bg-orange-200 cursor-pointer hover:bg-orange-400 transition-colors p-4"
                >
                  <UIcon name="lucide:plus" class="size-7" />
                </div>
              </RateCreateModal>
            </div>
          </div>
          <RouterView name="content" />
        </div>
      </div>
    </section>
  </div>
</template>
