<script setup lang="ts">
import type { IRate } from '@/types'

import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { ref, watch } from 'vue'

const schema = z.object({
  title: z.string().nonempty('Название должно быть заполнено'),
  price: z.number().min(0, 'Цена не может быть отрицательной'),
  typeId: z.string().nonempty('Идентификатор типа должен быть заполнен'),
  includes: z.object({
    speedInMbs: z
      .number()
      .min(1, 'Скорость должна быть больше или равна 1')
      .max(2000, 'Скорость должна быть меньше или равна 2000'),
    mobile: z
      .object({
        amountGb: z
          .number()
          .min(1, 'Объем трафика должен быть больше или равен 1')
          .max(1000, 'Объем трафика должен быть меньше или равен 1000'),
        sms: z
          .number()
          .min(1, 'Количество SMS должно быть больше или равно 1')
          .max(2000, 'Количество SMS должно быть меньше или равно 2000'),
        minutes: z
          .number()
          .min(1, 'Количество минут должно быть больше или равно 1')
          .max(5000, 'Количество минут должно быть меньше или равно 5000'),
      })
      .optional(),
  }),
})

const props = defineProps<{ item: IRate }>()
const items = ref([
  {
    label: 'Backlog',
    value: 'backlog',
  },
  {
    label: 'Todo',
    value: 'todo',
  },
  {
    label: 'In Progress',
    value: 'in_progress',
  },
  {
    label: 'Done',
    value: 'done',
  },
])

const mobileIncludes = ref<boolean>(
  !!props.item.includes.mobile?.amountGb ||
    !!props.item.includes.mobile?.sms ||
    !!props.item.includes.mobile?.minutes,
)

type Schema = z.output<typeof schema>

const state = ref<Partial<Schema>>({
  title: props.item.title,
  price: props.item.price,
  typeId: props.item.type.id,
  includes: {
    speedInMbs: props.item.includes.speedInMbs,
    mobile: props.item.includes.mobile
      ? {
          amountGb: props.item.includes.mobile.amountGb ?? 1,
          sms: props.item.includes.mobile.sms ?? 1,
          minutes: props.item.includes.mobile.minutes ?? 1,
        }
      : undefined,
  },
})

watch(
  () => mobileIncludes.value,
  (newValue) => {
    state.value.includes!.mobile = newValue
      ? {
          amountGb: props.item.includes.mobile?.amountGb ?? 1,
          sms: props.item.includes.mobile?.sms ?? 1,
          minutes: props.item?.includes?.mobile?.minutes ?? 1,
        }
      : undefined
  },
  { deep: true },
)
const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
}
</script>

<template>
  <UModal :title="`Настройки тарифа '${item.title}'`">
    <slot />
    <template #body>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Название" class="w-full" name="title">
          <UInput v-model="state.title" class="w-full" />
        </UFormField>
        <div class="flex gap-2">
          <UFormField label="Цена" class="w-full" name="price">
            <UInputNumber :min="1" v-model="state.price" class="w-full" />
          </UFormField>
          <UFormField label="Категория" class="w-full" name="typeId">
            <USelect v-model="state.typeId" :items="items" class="w-full" />
          </UFormField>
        </div>
        <UFormField label="Скорость в Мб/с" class="w-full" name="includes.speedInMbs">
          <UInputNumber :min="1" v-model="state.includes!.speedInMbs" class="w-full" />
        </UFormField>
        <UCheckbox
          v-model="mobileIncludes"
          :label="mobileIncludes ? 'Мобильный интернет включен' : 'Включить мобильный интернет'"
        />
        <div v-if="mobileIncludes" class="flex gap-1">
          <UFormField label="Количество Гб" class="w-full" name="includes.mobile.amountGb">
            <UInputNumber :min="1" v-model="state.includes!.mobile!.amountGb" class="w-full" />
          </UFormField>
          <UFormField label="Количество СМС" class="w-full" name="includes.mobile.sms">
            <UInputNumber :min="1" v-model="state.includes!.mobile!.sms" class="w-full" />
          </UFormField>
          <UFormField label="Количество минут" class="w-full" name="includes.mobile.minutes">
            <UInputNumber :min="1" v-model="state.includes!.mobile!.minutes" class="w-full" />
          </UFormField>
        </div>
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
