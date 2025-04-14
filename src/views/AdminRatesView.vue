<script setup lang="ts">
import { rateService } from '@/api/rate.service'
import { useQuery } from '@/composables/useQuery'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { data, fetch } = useQuery({
  queryFn: () => rateService.getByType(route.params.id as string),
  onSuccess: (data) => console.log(data),
})
watch(
  route,
  () => {
    fetch()
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <AdminRateCard
        @refresh="fetch"
        v-for="item in data?.data.rates"
        :key="item.id"
        :item="item"
      />
      <RateCreateModal @refresh="fetch" :type="$route.params.id[0]">
        <div
          class="flex size-15 rounded-full bg-orange-200 cursor-pointer hover:bg-orange-400 transition-colors self-center items-center justify-center"
        >
          <UIcon name="lucide:plus" class="size-7" />
        </div>
      </RateCreateModal>
    </div>
  </div>
</template>

<style scoped></style>
