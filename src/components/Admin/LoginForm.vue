<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

const schema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: '',
  password: '',
})

const router = useRouter()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
}

const canSendData = computed(() => {
  return state.email && state.password
})
</script>
<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4 flex flex-col w-full max-w-70 self-center mx-auto items-center justify-center"
    @submit="onSubmit"
  >
    <UFormField class="w-full" label="Электронная почта" name="email">
      <UInput
        v-model="state.email"
        placeholder="Введите электронную почту"
        color="primary"
        class="w-full max-w-70"
        size="xl"
      />
    </UFormField>

    <UFormField class="w-full" :ui="{ error: 'max-w-[247px]' }" label="Пароль" name="password">
      <UInput
        v-model="state.password"
        color="primary"
        type="password"
        class="w-full max-w-70"
        size="xl"
        placeholder="Введите пароль"
      />
    </UFormField>

    <UButton :disabled="!canSendData" size="xl" class="self-end" type="submit"> Войти </UButton>
  </UForm>
</template>
