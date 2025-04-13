import type { IRate, IRateType } from './types'

export const rateTypes: IRateType[] = [
  {
    id: 'type-1',
    title: 'Internet',
    description: 'Тарифы для домашнего интернета',
  },
  {
    id: 'type-2',
    title: 'Business',
    description: 'Тарифы для малого и среднего бизнеса',
  },
  {
    id: 'type-3',
    title: 'Premium',
    description: 'Тарифы для пользователей с высокими требованиями',
  },
]

export const rates: IRate[] = [
  {
    id: 'rate-1',
    title: 'Базовый интернет',
    description: 'Базовый тариф для дома с умеренным использованием',
    price: 499,
    includes: {
      speedInMbs: 100,
    },
    notice: ['Скорость до 100 Мбит/с', '5 ГБ мобильного интернета'],
    type: rateTypes[0],
  },
  {
    id: 'rate-2',
    title: 'Семейный интернет',
    description: 'Тариф для большой семьи с высоким использованием',
    price: 899,
    includes: {
      speedInMbs: 300,
      mobile: {
        amountGb: 20,
        sms: 50,
        minutes: 100,
      },
    },
    notice: ['Скорость до 300 Мбит/с', '20 ГБ мобильного интернета', '50 SMS', '100 минут'],
    type: rateTypes[0],
  },
  {
    id: 'rate-3',
    title: 'Бизнес интернет',
    description: 'Тариф для малого и среднего бизнеса',
    price: 1499,
    includes: {
      speedInMbs: 500,
      mobile: {
        amountGb: 50,
        sms: 100,
        minutes: 200,
      },
    },
    notice: ['Скорость до 500 Мбит/с', '50 ГБ мобильного интернета', '100 SMS', '200 минут'],
    type: rateTypes[1],
  },
  {
    id: 'rate-4',
    title: 'Премиум интернет',
    description: 'Тариф для пользователей, которым нужна максимальная скорость',
    price: 2499,
    includes: {
      speedInMbs: 1000,
      mobile: {
        amountGb: 100,
        sms: 200,
        minutes: 500,
      },
    },
    notice: ['Скорость до 1000 Мбит/с', '100 ГБ мобильного интернета', '200 SMS', '500 минут'],
    type: rateTypes[2],
  },
]
