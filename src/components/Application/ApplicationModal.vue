<script setup lang="ts">
import type { IRate } from '@/lib/types'
import RateIncludes from '../Rate/RateIncludes.vue'

defineProps<{ item: IRate }>()
</script>

<template>
  <UModal
    :ui="{
      content: 'md:min-w-9/12 min-w-12/12 rounded-2xl p-4',
    }"
    :close="false"
  >
    <slot />

    <template #body>
      <div class="grid grid-cols-1 sm:grid-cols-[40%_60%] h-full">
        <div class="flex flex-col h-full gap-4 sm:border-r sm:border-r-neutral-200">
          <h2 class="text-2xl font-extrabold">{{ item.title }}</h2>
          <p class="text-xl">В тариф включены:</p>
          <RateIncludes :includes="item.includes" />
        </div>
        <div class="w-full">
          <ApplicationForm :item="item" />
        </div>
      </div>
    </template>
  </UModal>
</template>
<style scoped></style>
