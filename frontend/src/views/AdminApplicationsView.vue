<script setup lang="ts">
import { h, ref, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import type { IApplicationTable } from '@/types'
import AdminNavPanel from '@/components/Admin/AdminNavPanel.vue'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()

const data = ref<IApplicationTable[]>([
  {
    id: '1',
    rate: {
      id: 'rate-1',
      title: 'Базовый интернет',
      description: 'Базовый тариф для дома с умеренным использованием',
      price: 499,
      type: {
        id: 'type-1',
        title: 'Internet',
        description: 'Тарифы для домашнего интернета',
      },
    },
    userData: {
      name: 'Иван Иванов',
      address: 'Москва, ул. Ленинская, д. 1',
      phone: '89231234567',
    },
    createdAt: '2024-03-11T15:30:00',
  },
  {
    id: '2',
    rate: {
      id: 'rate-2',
      title: 'Семейный интернет',
      description: 'Тариф для большой семьи с высоким использованием',
      price: 899,
      type: {
        id: 'type-1',
        title: 'Internet',
        description: 'Тарифы для домашнего интернета',
      },
    },
    userData: {
      name: 'Петр Петров',
      address: 'Санкт-Петербург, ул. Невская, д. 2',
      phone: '89231234568',
    },
    createdAt: '2024-03-11T10:10:00',
  },
])
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
    accessorKey: 'userData.name',
    header: 'Имя',
  },
  {
    accessorKey: 'userData.address',
    header: 'Адрес',
  },
  {
    accessorKey: 'userData.phone',
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

        toast.add({
          title: 'ID заявки скопирована в буфер обмена',
          color: 'success',
          icon: 'i-lucide-circle-check',
        })
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Удалить заявку',
      onSelect() {
        data.value = data.value.filter((item) => item.id !== row.original.id)

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
          <UTable :data="data" :columns="columns" class="flex-1" />
        </div>
      </section>
    </section>
  </div>
</template>
