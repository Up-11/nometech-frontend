<script setup lang="ts">
import type { IRate } from '@/types'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive } from 'vue'

defineProps<{ item: IRate }>()
const schema = z.object({
  address: z.string().nonempty({
    message: 'Адрес не может быть пустым',
  }),
  name: z.string().nonempty({
    message: 'Имя не может быть пустым',
  }),
  phone: z
    .string()
    .nonempty({
      message: 'Телефон не может быть пустым',
    })
    .regex(/^\d{11}$/, {
      message: 'Неверный формат номера телефона',
    }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  address: '',
  name: '',
  phone: '',
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <div class="w-full flex flex-col gap-5 pl-4">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <div>
        <h2 class="text-3xl font-bold">Отправьте заявку</h2>
        <p class="text-md mt-1 text-gray-500 font-bold">
          Наш специалист свяжется с Вами в ближайшее время
        </p>
      </div>
      <div class="flex flex-col gap-4">
        <UFormField name="address">
          <AppInput
            v-model:model-value="state.address"
            placeholder="Город, улица, дом, квартира"
            label="Адрес"
          />
        </UFormField>
        <UFormField name="name">
          <AppInput v-model:model-value="state.name" placeholder="Как вас зовут " label="Имя" />
        </UFormField>
        <UFormField name="phone">
          <AppInput
            v-model:model-value="state.phone"
            placeholder="Мобильный телефон"
            label="Номер телефона"
          />
        </UFormField>
      </div>
      <div class="flex justify-start gap-6 items-center">
        <div>
          <p class="font-bold text-5xl">
            {{ item.price }} <span class="text-xl font-medium">₽/мес</span>
          </p>
        </div>
        <UButton type="submit" label="Подключить" size="xl" class="rounded-xl px-6 py-4 text-xl" />
      </div>
    </UForm>
  </div>
</template>

<style scoped></style>
