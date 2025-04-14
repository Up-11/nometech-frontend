<script setup lang="ts">
import type { RateIncludes } from '@/lib/types'

defineProps<{ includes: RateIncludes }>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2 items-center">
      <UIcon name="lucide:globe" class="size-8 self-start" />
      <div class="flex flex-col">
        <span class="font-bold text-lg">{{ includes.speedInMbs }} Мбит/с</span>
        <span class="font-medium text-gray-500">Безлимитный интернет</span>
      </div>
    </div>
    <div v-if="includes.mobile" class="flex gap-2 items-center">
      <UIcon name="lucide:smartphone" class="size-8 self-start" />
      <div class="flex flex-col">
        <span class="font-bold text-lg"
          >{{ includes.mobile?.amountGb }} Гб, {{ includes.mobile?.minutes }} минут,
          {{ includes.mobile?.sms }} СМС
        </span>
        <span class="font-medium text-gray-500">Мобильная связь</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
