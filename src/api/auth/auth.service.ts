import { API } from '../config'
import { publicApi } from '../interceptors'
import { removeTokenFromStorage, saveToStorage, type IAuthData } from './auth.helpers'

export const AuthService = {
  async login(email: string, password: string) {
    const response = await publicApi.post<IAuthData>(API.AUTH.LOGIN, {
      email,
      password,
    })
    if (response.data.accessToken) saveToStorage(response.data)

    return response.data
  },

  logout() {
    removeTokenFromStorage()
    localStorage.removeItem('user')
  },
}
