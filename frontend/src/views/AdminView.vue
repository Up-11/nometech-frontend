<script setup lang="ts">
import { rates } from '@/data'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <AppHeader />

    <section class="container mx-auto">
      <AdminNavPanel />
      <div class="grid grid-cols-[20%_1fr] gap-4">
        <RatesSidebar />
        <div
          v-if="route.params.id === undefined"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          <AdminRateCard v-for="item in rates" :key="item.id" :item="item" />
        </div>
        <RouterView name="content" />
      </div>
    </section>
  </div>
</template>
