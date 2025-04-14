<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive, ref } from 'vue'
import { useMutation } from '@/composables/useMutation'
import { rateService, type CreateRateTypeDto } from '@/api/rate.service'
import type { IRateType } from '@/lib/types'

const schema = z.object({
  title: z.string().nonempty(),
})

const emit = defineEmits<{
  refresh: []
}>()

type Schema = z.output<typeof schema>
const isOpen = ref(false)

const props = defineProps<{
  item: IRateType
}>()

const state = reactive<Partial<Schema>>({
  title: props.item.title,
})

const { mutate } = useMutation({
  mutationFn: (dto: CreateRateTypeDto) => rateService.updateRateType(props.item.id, dto),
  onSuccess: () => {
    toast.add({ title: 'Успех', description: 'Категория успешно обновлена.', color: 'success' })
    emit('refresh')
    state.title = ''
    isOpen.value = false
  },
  onError: (error) => {
    toast.add({ title: 'Ошибка', description: error.message, color: 'error' })
  },
})

const { mutate: deleteType } = useMutation({
  mutationFn: () => rateService.deleteRateType(props.item.id),
  onSuccess: () => {
    toast.add({ title: 'Успех', description: 'Категория успешно удалена.', color: 'success' })
    emit('refresh')
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
  <UModal v-model:open="isOpen" :title="`Настройки категории '${item.title}'`">
    <slot />
    <template #body>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Название" class="w-full" name="title">
          <UInput v-model="state.title" class="w-full" />
        </UFormField>
        <div class="flex w-full justify-between">
          <UTooltip
            :disabled="item._count.rates === 0"
            text="Нельзя удалить категорию в которой есть тарифы"
          >
            <UButton @click="deleteType" :disabled="item._count.rates > 0" color="error">
              Удалить
            </UButton>
          </UTooltip>

          <UButton type="submit"> Сохранить </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<style scoped></style>
