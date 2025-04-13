<script setup lang="ts">
defineProps<{ isActive?: boolean; text: string }>()
defineEmits<{ click: () => void }>()
</script>

<template>
  <UButton
    @click="$emit('click')"
    :class="[
      'text-xl rounded-3xl px-4 py-2 font-bold',
      !isActive && 'bg-transparent not-hover:text-primary-600 border-primary-600 border',
    ]"
    >{{ text }}</UButton
  >
</template>

<style scoped></style>
