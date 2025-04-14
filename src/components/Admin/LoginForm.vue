<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { computed, inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authKey } from '@/lib/keys'
import { useMutation } from '@/composables/useMutation'
import { AuthService } from '@/api/auth/auth.service'
import { ROUTES } from '@/router/config'

const schema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: '',
  password: '',
})

const toast = useToast()
const router = useRouter()
const auth = inject(authKey)

const { mutate: login, isLoading } = useMutation({
  mutationFn: (data: Schema) => {
    return AuthService.login(data.email, data.password)
  },
  onSuccess: (data) => {
    toast.add({
      title: 'Успех',
      description: 'Вы успешно авторизовались',
      color: 'success',
    })
    auth!.setAuthData(data.user, data.accessToken)
    router.replace(ROUTES.ADMIN.INDEX)
  },
  onError: (err) => {
    toast.add({
      title: 'Ошибка',
      description: err.message,
      color: 'error',
    })
  },
})
async function onSubmit(event: FormSubmitEvent<Schema>) {
  login(event.data)
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

    <UButton :disabled="!canSendData" :loading="isLoading" size="xl" class="self-end" type="submit">
      Войти
    </UButton>
  </UForm>
</template>
