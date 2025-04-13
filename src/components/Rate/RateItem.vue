<script setup lang="ts">
import type { IRate } from '@/types'

defineProps<{ item: IRate }>()
</script>

<template>
  <ApplicationModal :item="item">
    <div
      class="bg-orange-50 text-orange-500 p-3 flex rounded-xl h-35 justify-between hover:bg-orange-500 hover:text-white transition-colors cursor-pointer flex-col"
    >
      <h3 class="font-bold text-xl">{{ item.title }}</h3>
      <p class="font-bold text-2xl">
        {{ item.price }} <span class="text-sm font-medium">₽/мес</span>
      </p>
    </div>
  </ApplicationModal>
</template>

<style scoped></style>
