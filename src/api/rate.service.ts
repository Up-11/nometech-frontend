import type { IRate, IRateType, RateIncludes } from '@/lib/types'
import { privateApi, publicApi } from './interceptors'
import { API } from './config'

export interface IRateTypeWithItems extends IRateType {
  rates: IRate[]
}
export interface CreateRateDto {
  title: string
  price: number
  typeId: string
  includes: RateIncludes
}

export type UpdateRateDto = Partial<CreateRateDto>

export interface CreateRateTypeDto {
  title: string
}

export type UpdateRateTypeDto = Partial<CreateRateTypeDto>

export type RatesAndTypes = {
  rates: IRate[]
  filteredTypes: IRateType[]
}

export const rateService = {
  async getAllRates() {
    return publicApi.get<IRate[]>(API.RATE.INDEX)
  },
  async getRatesAndTypes() {
    return publicApi.get<RatesAndTypes>(API.RATE.GET_RATES_AND_TYPES)
  },
  async getByType(id: string) {
    return privateApi.get<IRateTypeWithItems>(API.RATE.GET_BY_TYPE(id))
  },
  async getAllTypes() {
    return privateApi.get<IRateType[]>(API.RATE.GET_ALL_TYPES)
  },

  async createRate(dto: CreateRateDto) {
    return privateApi.post<IRate>(API.RATE.CREATE_RATE, dto)
  },
  async updateRate(id: string, dto: UpdateRateDto) {
    return privateApi.patch<IRate>(API.RATE.UPDATE_RATE(id), dto)
  },
  async deleteRate(id: string) {
    return privateApi.delete<IRate>(API.RATE.DELETE_RATE(id))
  },
  async createRateType(dto: CreateRateTypeDto) {
    return privateApi.post<IRateType>(API.RATE.CREATE_TYPE, dto)
  },
  async updateRateType(id: string, dto: UpdateRateTypeDto) {
    return privateApi.patch<IRateType>(API.RATE.UPDATE_TYPE(id), dto)
  },
  async deleteRateType(id: string) {
    return privateApi.delete(API.RATE.DELETE_TYPE(id))
  },
}
