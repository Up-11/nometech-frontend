<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive, ref } from 'vue'
import { useMutation } from '@/composables/useMutation'
import { rateService, type CreateRateTypeDto } from '@/api/rate.service'

const schema = z.object({
  title: z.string().nonempty(),
})

const emit = defineEmits<{
  refresh: []
}>()

type Schema = z.output<typeof schema>
const isOpen = ref(false)

const state = reactive<Partial<Schema>>({
  title: '',
})

const { mutate } = useMutation({
  mutationFn: (dto: CreateRateTypeDto) => rateService.createRateType(dto),
  onSuccess: () => {
    toast.add({ title: 'Успех', description: 'Категория успешно создана.', color: 'success' })
    emit('refresh')
    state.title = ''
    isOpen.value = false
  },
  onError: (error) => {
    toast.add({ title: 'Ошибка', description: error.message, color: 'error' })
  },
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  mutate(event.data)
}
</script>

<template>
  <UModal v-model:open="isOpen" :title="`Создание категории`">
    <slot />
    <template #body>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Название" class="w-full" name="title">
          <UInput v-model="state.title" class="w-full" placeholder="Введите название категории" />
        </UFormField>
        <div class="flex w-full justify-end">
          <UButton type="submit"> Сохранить </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<style scoped></style>
