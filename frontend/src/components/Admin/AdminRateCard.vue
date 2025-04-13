<script setup lang="ts">
import type { IRate } from '@/types'

defineProps<{ item: IRate }>()
</script>

<template>
  <div
    class="bg-orange-50 text-orange-500 p-3 flex rounded-xl h-35 justify-between transition-colors flex-col"
  >
    <h3 class="font-bold text-xl">{{ item.title }}</h3>
    <div class="flex justify-between items-end">
      <p class="font-bold text-2xl">
        {{ item.price }} <span class="text-sm font-medium">₽/мес</span>
      </p>
      <div class="flex items-center gap-1">
        <RateSettingsModal :item="item">
          <UButton size="xs" color="neutral" icon="lucide:settings" />
        </RateSettingsModal>
        <ApproveModal
          title="Удалить тариф"
          description="Это не повлияет на уже отправленные заявки"
          :buttons-text="['Отмена', 'Удалить']"
        >
          <UButton size="xs" color="error" icon="lucide:trash" />
        </ApproveModal>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
