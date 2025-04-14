import type { IApplication } from '@/lib/types'
import { privateApi, publicApi } from './interceptors'
import { API } from './config'

export interface CreateApplicationDto {
  name: string
  phone: string
  address: string
  rateId: string
}

export const applicationService = {
  async getApplications() {
    return privateApi.get<IApplication[]>(API.APPLICATION.INDEX)
  },
  async createApplication(dto: CreateApplicationDto) {
    return publicApi.post(API.APPLICATION.CREATE, dto)
  },
  async deleteApplication(id: string) {
    return privateApi.delete(API.APPLICATION.DELETE(id))
  },
}
