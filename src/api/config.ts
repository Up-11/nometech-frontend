export const API = {
  BASE_URL: 'http://localhost:4200',
  AUTH: {
    LOGIN: 'authorization/sign-in',
  },
  RATE: {
    INDEX: 'rate',
    GET_BY_TYPE: (id: string) => `rate/by-type/${id}`,
    GET_ALL_TYPES: 'rate/all-types',
    GET_RATES_AND_TYPES: 'rate/rates-and-types',
    UPDATE_TYPE: (id: string) => `rate/update-type/${id}`,
    UPDATE_RATE: (id: string) => `rate/update-rate/${id}`,
    CREATE_RATE: 'rate/create-rate',
    CREATE_TYPE: 'rate/create-type',
    DELETE_RATE: (id: string) => `rate/delete-rate/${id}`,
    DELETE_TYPE: (id: string) => `rate/delete-type/${id}`,
  },
  APPLICATION: {
    INDEX: 'application',
    CREATE: 'application/create',
    DELETE: (id: string) => `application/${id}`,
  },
} as const
