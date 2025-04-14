<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import type { IApplicationTable } from '@/lib/types'
import AdminNavPanel from '@/components/Admin/AdminNavPanel.vue'
import { useQuery } from '@/composables/useQuery'
import { applicationService } from '@/api/application.service'
import { useMutation } from '@/composables/useMutation'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()

const { data, isLoading, fetch } = useQuery({
  queryFn: () => applicationService.getApplications(),
  enabled: true,
})

const { mutate } = useMutation({
  mutationFn: (id: string) => applicationService.deleteApplication(id),
  onSuccess: () => {
    toast.add({
      title: 'ID заявки скопирована в буфер обмена',
      color: 'success',
      icon: 'i-lucide-circle-check',
    })
    fetch()
  },
  onError: (error) => {
    toast.add({
      title: 'Ошибка',
      description: error.message,
    })
  },
})

const columns: TableColumn<IApplicationTable>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    cell: ({ row }) => `#${row.getValue('id')}`,
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата',
    cell: ({ row }) => {
      return new Date(row.getValue('createdAt')).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    },
  },
  {
    accessorKey: 'rate.title',
    header: 'Тариф',
  },

  {
    accessorKey: 'name',
    header: 'Имя',
  },
  {
    accessorKey: 'address',
    header: 'Адрес',
  },
  {
    accessorKey: 'phone',
    header: 'Телефон',
  },
  {
    accessorKey: 'rate.price',
    header: 'Цена',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end',
            },
            items: getRowItems(row),
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown',
            }),
        ),
      )
    },
  },
]

function getRowItems(row: Row<IApplicationTable>) {
  return [
    {
      type: 'label',
      label: 'Действия',
    },
    {
      label: 'Скопировать ID заявки',
      onSelect() {
        navigator.clipboard.writeText(row.original.id)
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Удалить заявку',
      async onSelect() {
        const curr = data.value?.data.find((item) => item.id === row.original.id)
        await mutate(curr!.id)

        toast.add({
          title: 'Заявка удалена',
          color: 'error',
          icon: 'i-lucide-circle-x',
        })
      },
    },
  ]
}
</script>
<template>
  <div>
    <AppHeader />
    <section class="container mx-auto">
      <AdminNavPanel />
      <section class="mt-4">
        <h2 class="text-2xl font-bold">Отправленные заявки</h2>
        <div>
          <UTable :data="data?.data" :loading="isLoading" :columns="columns" class="flex-1">
            <template #empty> <h1>Нет данных</h1></template>
          </UTable>
        </div>
      </section>
    </section>
  </div>
</template>
