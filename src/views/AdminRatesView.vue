<script setup lang="ts"></script>

<template>
  <div>
    <RateCreateModal :type="$route.params.id[0]">
      <div
        class="flex size-15 rounded-full bg-orange-200 cursor-pointer hover:bg-orange-400 transition-colors self-center items-center justify-center"
      >
        <UIcon name="lucide:plus" class="size-7" />
      </div>
    </RateCreateModal>
  </div>
</template>

<style scoped></style>
