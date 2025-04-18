<script setup lang="ts">
import { rateService } from '@/api/rate.service'
import AppHeader from '@/components/App/AppHeader.vue'
import TabButton from '@/components/App/TabButton.vue'
import RateItem from '@/components/Rate/RateItem.vue'
import { useQuery } from '@/composables/useQuery'
import type { IRate, IRateType } from '@/lib/types'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const rates = ref<IRate[]>([])
const rateTypes = ref<IRateType[]>([])
const pickedType = ref<IRateType | null>(null)

useQuery({
  queryFn: () => rateService.getRatesAndTypes(),
  onSuccess: (data) => {
    rates.value = data.data.rates
    rateTypes.value = data.data.filteredTypes
  },
  enabled: true,
})

watch(
  () => rateTypes.value,
  (newRateTypes) => {
    if (newRateTypes && newRateTypes.length > 0) {
      pickedType.value = newRateTypes[0]
    }
  },
  { immediate: true },
)

onMounted(() => {
  const queryType = router.currentRoute.value.query.type as string
  if (queryType && rateTypes.value.length > 0) {
    const foundType = rateTypes.value.find((type) => type.id === queryType)
    if (foundType) {
      pickedType.value = foundType
    }
  }
})

const currentRates = computed(() => {
  if (!pickedType.value) return []
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  router.push({ query: { type: pickedType.value.id } })
  return rates.value.filter((rate) => rate.typeId === pickedType!.value!.id)
})
</script>

<template>
  <main class="flex flex-col h-screen">
    <AppHeader />
    <div class="container mx-auto">
      <section>
        <div class="m-4 bg-white p-4 rounded-2xl">
          <div class="flex flex-col md:flex-row-reverse gap-8 items-center">
            <img src="/347050613332122.jpeg" class="rounded-xl w-full md:w-1/2" alt="Нометек" />
            <div class="flex flex-col gap-8 md:w-1/2">
              <h1 class="text-3xl font-bold">Интернет провайдер Нометек</h1>
              <h2 class="text-xl">Подключить интернет последнего поколения</h2>
              <a href="#rates">
                <UButton label="Подключить" class="self-start rounded-lg" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="m-4 bg-white p-4 rounded-2xl flex gap-5">
          <div class="m-5 grid grid-cols-1 sm:grid-cols-3 items-start gap-2">
            <div
              class="flex bg-white h-full p-2 rounded-2xl flex-col gap-2 items-center text-center"
            >
              <UIcon name="lucide:radio" class="text-orange-500 size-15" />
              <p class="text-lg font-bold">Надежный интернет-провайдер</p>
              <p class="text-xs">
                Надежный провайдер обеспечит высокоскоростной бесперебойный интернет для вас на
                основе современных технологий.
              </p>
            </div>
            <div
              class="flex bg-white h-full p-2 rounded-2xl flex-col gap-2 items-center text-center"
            >
              <UIcon name="lucide:navigation" class="text-orange-500 size-15" />
              <p class="text-lg font-bold">Адресное подключение</p>
              <p class="text-xs">
                Техническую возможность подключения к услугам Нометек по вашему адресу можно узнать
                после отправки заявки.
              </p>
            </div>
            <div
              class="flex flex-col h-full bg-white p-2 rounded-2xl gap-2 items-center text-center"
            >
              <UIcon name="lucide:shield-check" class="text-orange-500 size-15" />
              <p class="text-lg font-bold">Безопасность</p>
              <p class="text-xs">
                Надежная защита ваших данных и конфиденциальности. Мы используем современные
                технологии шифрования и меры предосторожности, чтобы гарантировать безопасность
                вашего интернет-соединения.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="rates" class="flex flex-col gap-4 mt-4">
        <h2 class="text-3xl font-extrabold">Наши тарифы</h2>
        <div class="flex flex-wrap items-center gap-2">
          <TabButton
            v-for="type in rateTypes"
            :key="type.id"
            :text="type.title"
            :is-active="type.id === pickedType?.id"
            @click="() => (pickedType = type)"
          />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <RateItem v-for="item in currentRates" :key="item.id" :item="item" />
        </div>
      </section>
    </div>
    <AppFooter class="mt-auto" />
  </main>
</template>
