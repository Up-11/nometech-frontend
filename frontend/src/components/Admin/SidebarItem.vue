<script setup lang="ts">
import { ROUTES } from '@/router/config'
import type { IRateType } from '@/types'

defineProps<{ isActive?: boolean; type: IRateType }>()
</script>

<template>
  <div class="flex gap-1 w-full items-center">
    <UButton
      :to="ROUTES.ADMIN.ID.GET(type.id)"
      variant="ghost"
      class="w-full flex-1"
      :class="[!isActive && 'text-black']"
      >{{ type.title }}
    </UButton>
    <RateTypeModal :item="type">
      <UButton variant="ghost" :class="[!isActive && 'text-black']" trailing-icon="lucide:menu" />
    </RateTypeModal>
  </div>
</template>

<style scoped></style>
