<script lang="ts" setup>
import LoginForm from '@/components/Admin/LoginForm.vue'
</script>

<template>
  <section class="w-full h-screen flex flex-col justify-center items-center mx-auto">
    <div class="bg-slate-100 flex flex-col items-center justify-center rounded-lg p-10 gap-3">
      <h2 class="text-3xl font-semibold">Нометек</h2>
      <h1 class="text-2xl font-semibold">Вход в админ панель</h1>
      <LoginForm />
    </div>
  </section>
</template>

<style scoped></style>
