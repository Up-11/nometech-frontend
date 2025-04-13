<script setup lang="ts">
import type { IRateType } from '@/types'

import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive } from 'vue'

const props = defineProps<{ item: IRateType }>()

const schema = z.object({
  title: z.string().nonempty(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: props.item.title,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
}
</script>

<template>
  <UModal :title="`Настройки категории '${item.title}'`">
    <slot />
    <template #body>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Название" class="w-full" name="title">
          <UInput v-model="state.title" class="w-full" />
        </UFormField>
        <div class="flex w-full justify-between">
          <UTooltip text="Нельзя удалить категорию в которой есть тарифы">
            <UButton type="submit" color="error"> Удалить </UButton>
          </UTooltip>

          <UButton type="submit"> Сохранить </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<style scoped></style>
