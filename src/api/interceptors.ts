import axios from 'axios'
import Cookies from 'js-cookie'
import { API } from './config'

export const JSON_HEADERS = () => ({
  'Content-Type': 'application/json',
})

export const publicApi = axios.create({
  baseURL: API.BASE_URL,
  headers: JSON_HEADERS(),
})

export const privateApi = axios.create({
  baseURL: API.BASE_URL,
  headers: JSON_HEADERS(),
})

privateApi.interceptors.request.use((config) => {
  const accessToken = Cookies.get('accessToken')

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})
